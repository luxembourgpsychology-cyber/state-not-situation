import { neon } from '@neondatabase/serverless';
try { process.loadEnvFile('.env.local'); } catch { /* deployed scripts use environment */ }
if (!process.env.DATABASE_URL) throw new Error('Database is not connected.');
const sql = neon(process.env.DATABASE_URL);
await sql`CREATE TABLE IF NOT EXISTS book_live_rooms (code text PRIMARY KEY, body jsonb NOT NULL, revision integer NOT NULL DEFAULT 0, expires_at timestamptz NOT NULL)`;
await sql`CREATE INDEX IF NOT EXISTS book_live_rooms_expiry ON book_live_rooms(expires_at)`;
await sql`CREATE TABLE IF NOT EXISTS book_live_typing (room_code text NOT NULL REFERENCES book_live_rooms(code) ON DELETE CASCADE, participant_id text NOT NULL, expires_at timestamptz NOT NULL, PRIMARY KEY(room_code, participant_id))`;
await sql`CREATE TABLE IF NOT EXISTS book_live_limits (key text PRIMARY KEY, hits integer NOT NULL, expires_at timestamptz NOT NULL)`;
console.log('Book event tables are ready. No other project tables were changed.');
