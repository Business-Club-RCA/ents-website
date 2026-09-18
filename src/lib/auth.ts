import { cookies } from 'next/headers';

export const SESSION_COOKIE_NAME = 'ents_admin_session';
const SESSION_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecretKey(): string {
  const key = process.env.ADMIN_SECRET_KEY?.trim();
  if (key) return key;

  const password = process.env.ADMIN_PASSWORD?.trim();
  if (password) {
    return `ents-derived-session-secret-${password}`;
  }

  throw new Error('Server configuration error: ADMIN_PASSWORD or ADMIN_SECRET_KEY must be set in .env.local.');
}

// In-memory revoked session set (persisted across hot reloads in globalThis)
declare global {
  // eslint-disable-next-line no-var
  var __entsRevokedSessions: Set<string> | undefined;
  // eslint-disable-next-line no-var
  var __entsLoginAttempts: Map<string, { count: number; lockedUntil?: number; lastAttempt: number }> | undefined;
}

const revokedSessions: Set<string> =
  globalThis.__entsRevokedSessions || (globalThis.__entsRevokedSessions = new Set());

const loginAttempts: Map<string, { count: number; lockedUntil?: number; lastAttempt: number }> =
  globalThis.__entsLoginAttempts || (globalThis.__entsLoginAttempts = new Map());

// Rate limiting parameters
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function isSessionRevoked(sid: string): boolean {
  return revokedSessions.has(sid);
}

export function revokeSession(sid: string): void {
  revokedSessions.add(sid);
}

// Rate-limiting check helper
export function checkRateLimit(ipKey: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ipKey);

  if (!record) {
    return { allowed: true };
  }

  // Check if currently locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  // If lockout expired, reset
  if (record.lockedUntil && record.lockedUntil <= now) {
    loginAttempts.delete(ipKey);
    return { allowed: true };
  }

  // Expire attempts older than the window
  if (now - record.lastAttempt > LOCKOUT_WINDOW_MS) {
    loginAttempts.delete(ipKey);
    return { allowed: true };
  }

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS;
    const remainingSeconds = Math.ceil(LOCKOUT_WINDOW_MS / 1000);
    return { allowed: false, remainingSeconds };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ipKey: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ipKey) || { count: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS;
  }

  loginAttempts.set(ipKey, record);
}

export function clearFailedAttempts(ipKey: string): void {
  loginAttempts.delete(ipKey);
}

// Derive HMAC CryptoKey from secret
async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Generates an HMAC-signed session token containing sid, iat, exp
export async function generateSessionToken(): Promise<string> {
  const sid = crypto.randomUUID();
  const iat = Date.now();
  const exp = iat + SESSION_EXPIRY_MS;
  const payload = `${sid}.${iat}.${exp}`;

  const key = await getHmacKey(getSecretKey());
  const enc = new TextEncoder();
  const sigBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const sigHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `${payload}.${sigHex}`;
}

// Verifies token integrity, expiration, and revocation status
export async function verifySessionToken(token: string | undefined): Promise<{ valid: boolean; sid?: string }> {
  if (!token || typeof token !== 'string') return { valid: false };

  const parts = token.split('.');
  if (parts.length !== 4) return { valid: false };

  const [sid, iatStr, expStr, sigHex] = parts;
  const exp = parseInt(expStr, 10);
  if (isNaN(exp) || Date.now() > exp) return { valid: false };

  if (isSessionRevoked(sid)) return { valid: false };

  const payload = `${sid}.${iatStr}.${expStr}`;
  const key = await getHmacKey(getSecretKey());
  const enc = new TextEncoder();

  const match = sigHex.match(/.{1,2}/g);
  if (!match) return { valid: false };
  const sigBytes = new Uint8Array(match.map((byte) => parseInt(byte, 16)));

  try {
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(payload));
    if (!valid) return { valid: false };
    return { valid: true, sid };
  } catch {
    return { valid: false };
  }
}

// Constant-time password verification via SHA-256 XOR reduction to prevent timing attacks
export async function verifyPassword(password: string): Promise<boolean> {
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!expectedPassword) {
    console.error('[SECURITY ERROR] ADMIN_PASSWORD is not configured in .env.local! Access denied.');
    return false;
  }

  const enc = new TextEncoder();

  const hash1 = await crypto.subtle.digest('SHA-256', enc.encode(password));
  const hash2 = await crypto.subtle.digest('SHA-256', enc.encode(expectedPassword));

  const b1 = new Uint8Array(hash1);
  const b2 = new Uint8Array(hash2);

  let diff = 0;
  for (let i = 0; i < b1.length; i++) {
    diff |= b1[i] ^ b2[i];
  }
  return diff === 0;
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return false;
    const result = await verifySessionToken(sessionCookie.value);
    return result.valid;
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<string> {
  const token = await generateSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: Math.floor(SESSION_EXPIRY_MS / 1000), // 8 hours in seconds
  });
  return token;
}

export async function clearAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (sessionCookie?.value) {
      const parts = sessionCookie.value.split('.');
      if (parts[0]) {
        revokeSession(parts[0]);
      }
    }
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // ignore
  }
}
