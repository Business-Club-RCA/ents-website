import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

let pool: Pool | null = null;

function getPoolConfig() {
  const rawUrl = (process.env.DATABASE_URL || '').trim();
  try {
    const parsed = new URL(rawUrl);
    return {
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      host: parsed.hostname,
      port: parseInt(parsed.port || '5432', 10),
      database: parsed.pathname.slice(1) || 'defaultdb',
      ssl: {
        rejectUnauthorized: false, // Required for Aiven managed certificates
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 15000,
    };
  } catch {
    return {
      connectionString: rawUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 15000,
    };
  }
}

export function isPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

export function getPostgresPool(): Pool | null {
  if (!isPostgresConfigured()) return null;

  if (!pool) {
    const config = getPoolConfig();
    if (process.env.NODE_ENV === 'production') {
      pool = new Pool(config);
    } else {
      if (!globalThis.__pgPool) {
        globalThis.__pgPool = new Pool(config);
      }
      pool = globalThis.__pgPool;
    }
  }

  return pool;
}

let schemaInitialized = false;

export async function initPostgresSchema(): Promise<boolean> {
  if (schemaInitialized) return true;
  const p = getPostgresPool();
  if (!p) return false;

  try {
    const client = await p.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS ents_cms_store (
          key VARCHAR(64) PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
      `);
      schemaInitialized = true;
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('[PostgreSQL] Failed to initialize schema or connect to Aiven database:', (err as Error).message);
    return false;
  }
}

export async function testPostgresConnection(): Promise<{ connected: boolean; message: string; version?: string }> {
  if (!isPostgresConfigured()) {
    return { connected: false, message: 'DATABASE_URL environment variable is not defined.' };
  }

  const p = getPostgresPool();
  if (!p) {
    return { connected: false, message: 'Could not create PostgreSQL connection pool.' };
  }

  try {
    const client = await p.connect();
    try {
      const res = await client.query('SELECT version();');
      return {
        connected: true,
        message: 'Connected to Aiven PostgreSQL successfully.',
        version: res.rows[0]?.version,
      };
    } finally {
      client.release();
    }
  } catch (err) {
    return {
      connected: false,
      message: `Connection failed: ${(err as Error).message}`,
    };
  }
}

export async function getPostgresItem<T>(key: string): Promise<T | null> {
  const p = getPostgresPool();
  if (!p) return null;

  try {
    await initPostgresSchema();
    const res = await p.query('SELECT data FROM ents_cms_store WHERE key = $1 LIMIT 1', [key]);
    if (res.rows.length === 0) return null;
    return res.rows[0].data as T;
  } catch (err) {
    console.warn(`[PostgreSQL] Error fetching item key "${key}":`, (err as Error).message);
    return null;
  }
}

export async function setPostgresItem<T>(key: string, data: T): Promise<boolean> {
  const p = getPostgresPool();
  if (!p) return false;

  try {
    await initPostgresSchema();
    await p.query(
      `INSERT INTO ents_cms_store (key, data, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (key)
       DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP`,
      [key, JSON.stringify(data)]
    );
    return true;
  } catch (err) {
    console.warn(`[PostgreSQL] Error writing item key "${key}":`, (err as Error).message);
    return false;
  }
}

export async function loadEntireDBFromPostgres(): Promise<any | null> {
  const p = getPostgresPool();
  if (!p) return null;

  try {
    await initPostgresSchema();
    const res = await p.query('SELECT key, data FROM ents_cms_store');
    if (res.rows.length === 0) return null;

    const result: Record<string, any> = {};
    for (const row of res.rows) {
      result[row.key] = row.data;
    }
    return result;
  } catch (err) {
    console.warn('[PostgreSQL] Error loading entire DB from Aiven Postgres:', (err as Error).message);
    return null;
  }
}

export async function saveEntireDBToPostgres(db: Record<string, any>): Promise<boolean> {
  const p = getPostgresPool();
  if (!p) return false;

  try {
    await initPostgresSchema();
    const client = await p.connect();
    try {
      await client.query('BEGIN');
      for (const [key, val] of Object.entries(db)) {
        await client.query(
          `INSERT INTO ents_cms_store (key, data, updated_at)
           VALUES ($1, $2, CURRENT_TIMESTAMP)
           ON CONFLICT (key)
           DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP`,
          [key, JSON.stringify(val)]
        );
      }
      await client.query('COMMIT');
      return true;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('[PostgreSQL] Error saving entire DB to Aiven Postgres:', (err as Error).message);
    return false;
  }
}

