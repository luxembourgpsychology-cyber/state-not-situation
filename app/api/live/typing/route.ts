import { NextRequest } from "next/server";
import { LiveError, readRoom, saveTyping } from "@/lib/live/store";
import { body, fail, guest, json, roomCode } from "@/lib/live/http";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const data = await body(request);
    const room = await readRoom(roomCode(data.room));
    const participant = guest(request, room);
    const paired = room.pairs.some(p => p.a === participant.id || p.b === participant.id);
    if (typeof data.active !== "boolean") throw new LiveError("Invalid typing update.");
    const active = data.active && paired && room.step === "reply" && !room.paused && !room.lookUp && !room.answers[participant.id]?.reply;
    await saveTyping(room.code, participant.id, !!active);
    return json({ ok: true });
  } catch (error) { return fail(error); }
}
