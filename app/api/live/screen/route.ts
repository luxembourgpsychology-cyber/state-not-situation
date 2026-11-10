import { NextRequest } from "next/server";
import { hostView, participantView } from "@/lib/live/engine";
import { readRoom } from "@/lib/live/store";
import { fail, invitation, json, roomCode } from "@/lib/live/http";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  try {
    const room = await readRoom(roomCode(request.nextUrl.searchParams.get("room")));
    invitation(room, request.nextUrl.searchParams.get("invite"));
    const host = hostView(room);
    const result: Record<string, unknown> = { room: host.room, counts: host.counts };
    if (room.step.startsWith("reveal_") && room.participants[0]) {
      const reveal = participantView(room, room.participants[0].id).reveal;
      if (reveal) result.reveal = { explanation: reveal.explanation, scenarios: reveal.scenarios, forecast: reveal.forecast, counts: reveal.counts, responseCount: reveal.responseCount };
    }
    return json(result);
  } catch (error) { return fail(error); }
}
