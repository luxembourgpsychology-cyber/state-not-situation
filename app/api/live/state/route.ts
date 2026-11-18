import { NextRequest } from "next/server";
import { participantView, roomSummary } from "@/lib/live/engine";
import { experienceGuestView, experienceTypingAllowed } from "@/lib/live/experience";
import { isTyping, readRoom } from "@/lib/live/store";
import { fail, guest, invitation, json, roomCode } from "@/lib/live/http";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  try {
    const room = await readRoom(roomCode(request.nextUrl.searchParams.get("room")));
    let participant;
    try { participant = guest(request, room); }
    catch (error) {
      if (!room.experience || request.nextUrl.searchParams.get("entry") !== "1") throw error;
      invitation(room, request.nextUrl.searchParams.get("invite"));
      return json({ room: roomSummary(room), experience: experienceGuestView(room, room.experience) });
    }
    const view = participantView(room, participant.id);
    const pair = room.pairs.find(p => p.a === participant.id || p.b === participant.id);
    const partner = pair ? pair.a === participant.id ? pair.b : pair.a : undefined;
    const canType = partner && (room.experience
      ? experienceTypingAllowed(room, partner)
      : room.step === "reply" && !room.paused && !room.lookUp && !room.answers[partner]?.reply);
    const typingKey = room.experience ? `${partner}:${room.experience.moment}` : partner;
    view.partnerTyping = Boolean(canType && typingKey && await isTyping(room.code, typingKey));
    return json(view);
  } catch (error) { return fail(error); }
}
