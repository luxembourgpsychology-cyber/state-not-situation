import "server-only";
import { neon } from "@neondatabase/serverless";
import type { Room } from "./types";

export class LiveError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

function db() {
  if (!process.env.DATABASE_URL) throw new LiveError("The event database is not connected. Please contact the host.", 503);
  return neon(process.env.DATABASE_URL);
}

export async function readRoom(code: string): Promise<Room> {
  const rows = await db()`SELECT body FROM book_live_rooms WHERE code = ${code} AND expires_at > now()`;
  if (!rows[0]) throw new LiveError("Room not found or closed. Please check the link.", 404);
  return rows[0].body as Room;
}

export async function insertRoom(room: Room) {
  await db()`INSERT INTO book_live_rooms (code, body, revision, expires_at) VALUES (${room.code}, ${JSON.stringify(room)}::jsonb, ${room.revision}, ${new Date(room.expiresAt).toISOString()})`;
  return room;
}

// Compare-and-swap serializes pair creation and answer changes across Functions.
// A failed write reloads the current row; there is no process-local room state.
export async function changeRoom(code: string, change: (room: Room) => void): Promise<Room> {
  for (let attempt = 0; attempt < 30; attempt++) {
    const room = await readRoom(code);
    const before = JSON.stringify(room);
    const revision = room.revision;
    change(room);
    if (JSON.stringify(room) === before) return room;
    room.revision = revision + 1;
    const rows = await db()`UPDATE book_live_rooms SET body = ${JSON.stringify(room)}::jsonb, revision = ${room.revision} WHERE code = ${code} AND revision = ${revision} RETURNING code`;
    if (rows.length) return room;
    // Guests often scan or save together. Jitter prevents simultaneous retries
    // repeatedly competing for the same revision.
    await new Promise(resolve => setTimeout(resolve, 15 + Math.random() * Math.min(250, 25 * (attempt + 1))));
  }
  throw new LiveError("The room is busy. Please try again.", 409);
}

export async function listRooms() {
  return (await db()`SELECT code, body->>'mode' AS mode, body->>'step' AS step, (body->>'createdAt')::bigint AS "createdAt" FROM book_live_rooms WHERE expires_at > now() ORDER BY expires_at DESC LIMIT 30`);
}

export async function saveTyping(code: string, participantId: string, active: boolean) {
  if (!active) {
    await db()`DELETE FROM book_live_typing WHERE room_code = ${code} AND participant_id = ${participantId}`;
    return;
  }
  await db()`INSERT INTO book_live_typing (room_code, participant_id, expires_at) VALUES (${code}, ${participantId}, now() + interval '3 seconds') ON CONFLICT (room_code, participant_id) DO UPDATE SET expires_at = EXCLUDED.expires_at`;
}

export async function isTyping(code: string, participantId: string) {
  const rows = await db()`SELECT 1 FROM book_live_typing WHERE room_code = ${code} AND participant_id = ${participantId} AND expires_at > now()`;
  return rows.length > 0;
}

export async function clearRoomTyping(code: string) {
  await db()`DELETE FROM book_live_typing WHERE room_code = ${code}`;
}

export async function rateLimit(key: string, maximum: number, seconds: number) {
  const rows = await db()`INSERT INTO book_live_limits (key, hits, expires_at) VALUES (${key}, 1, now() + ${seconds} * interval '1 second') ON CONFLICT (key) DO UPDATE SET hits = CASE WHEN book_live_limits.expires_at < now() THEN 1 ELSE book_live_limits.hits + 1 END, expires_at = CASE WHEN book_live_limits.expires_at < now() THEN EXCLUDED.expires_at ELSE book_live_limits.expires_at END RETURNING hits`;
  if (Number(rows[0].hits) > maximum) throw new LiveError("Too many attempts. Please wait a few minutes.", 429);
}

export async function cleanupExpired() {
  const sql = db();
  const result = await sql.transaction([
    sql`DELETE FROM book_live_typing WHERE expires_at < now()`,
    sql`DELETE FROM book_live_limits WHERE expires_at < now()`,
    sql`DELETE FROM book_live_rooms WHERE expires_at < now() RETURNING code`,
  ]);
  return { deletedRooms: result[2].length };
}
