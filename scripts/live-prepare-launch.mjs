import { randomBytes, randomUUID } from 'node:crypto';
import { neon } from '@neondatabase/serverless';
import { createRoom } from '../lib/live/engine.ts';
import { LAUNCH_ENDS, LAUNCH_ROOM_CODE, LAUNCH_URL } from '../lib/live/launch.ts';
try { process.loadEnvFile('.env.local'); } catch { /* environment supplied directly */ }
if (Date.now() >= LAUNCH_ENDS) throw new Error('The launch date has passed. Do not replace its room.');
const sql = neon(process.env.DATABASE_URL);
const room = createRoom({ id:randomUUID(), code:LAUNCH_ROOM_CODE, inviteToken:randomBytes(24).toString('base64url'), mode:'live', now:Date.now() });
room.expiresAt = LAUNCH_ENDS;
await sql`INSERT INTO book_live_rooms (code,body,revision,expires_at) VALUES (${room.code},${JSON.stringify(room)}::jsonb,0,${new Date(LAUNCH_ENDS).toISOString()}) ON CONFLICT (code) DO NOTHING`;
console.log('Fixed launch room prepared. Existing answers were not changed.');
console.log('Print address: '+LAUNCH_URL);
