import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'ents_admin_session';
const DEFAULT_PASSWORD = 'ents2026';
const SECRET_SALT = process.env.ADMIN_SECRET_KEY || 'ents-rca-nyabihu-secret-2026';

// Generates a verifiable session token using Web Crypto
async function generateToken(): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`ents-admin-auth-${SECRET_SALT}-${new Date().toISOString().slice(0, 10)}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string): Promise<boolean> {
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
  return password === expectedPassword;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await generateToken();
  return token === expected;
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return false;
    return await verifySessionToken(sessionCookie.value);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const token = await generateToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

