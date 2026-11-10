import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { addParticipant, participantView } from "@/lib/live/engine";
import { readRoom, changeRoom, LiveError, rateLimit } from "@/lib/live/store";
import { body, cookieOptions, fail, guest, guestCookie, hash, invitation, json, roomCode, token } from "@/lib/live/http";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const data = await body(request);
    const code = roomCode(data.room);
    let room = await readRoom(code);
    try { const existing = guest(request, room); return json(participantView(room, existing.id)); } catch { /* join below */ }
    invitation(room, data.invite);
    if (data.consent !== true) throw new LiveError("Please agree to the game sharing rules before joining.");
    await rateLimit(`join:${code}:${hash(request.headers.get("x-forwarded-for") ?? "local")}`, 150, 600);
    const name = typeof data.name === "string" ? data.name.trim().slice(0, 40) : "";
    if (room.participants.length >= 120) throw new LiveError("This room is full. Please ask the host for help.");
    const secret = token();
    const participant = { id: randomUUID(), tokenHash: hash(secret), name: name || "Guest", joinedAt: Date.now(), context: (room.participants.length % 2 ? "b" : "a") as "a" | "b" };
    room = await changeRoom(code, current => {
      if (current.participants.length >= 120) throw new LiveError("This room is full.");
      addParticipant(current, participant);
    });
    const response = json(participantView(room, participant.id));
    response.cookies.set(guestCookie(code), `${participant.id}.${secret}`, cookieOptions);
    return response;
  } catch (error) { return fail(error); }
}
