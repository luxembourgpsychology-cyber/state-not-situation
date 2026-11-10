import { NextRequest } from "next/server";
import { participantView, submitAnswer } from "@/lib/live/engine";
import { changeRoom, readRoom, saveTyping } from "@/lib/live/store";
import { body, fail, guest, json, roomCode } from "@/lib/live/http";
import type { Step } from "@/lib/live/types";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const data = await body(request);
    const code = roomCode(data.room);
    const participant = guest(request, await readRoom(code));
    const room = await changeRoom(code, current => { submitAnswer(current, participant.id, data.step as Step, data.data); });
    await saveTyping(code, participant.id, false);
    return json(participantView(room, participant.id));
  } catch (error) { return fail(error); }
}
