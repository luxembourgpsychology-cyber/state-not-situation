import { NextRequest } from "next/server";
import { participantView } from "@/lib/live/engine";
import { isTyping, readRoom } from "@/lib/live/store";
import { fail, guest, json, roomCode } from "@/lib/live/http";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  try {
    const room = await readRoom(roomCode(request.nextUrl.searchParams.get("room")));
    const participant = guest(request, room);
    const view = participantView(room, participant.id);
    const pair = room.pairs.find(p => p.a === participant.id || p.b === participant.id);
    const partner = pair ? pair.a === participant.id ? pair.b : pair.a : undefined;
    view.partnerTyping = !!(partner && room.step === "reply" && !room.paused && !room.lookUp && !room.answers[partner]?.reply && await isTyping(room.code, partner));
    return json(view);
  } catch (error) { return fail(error); }
}
