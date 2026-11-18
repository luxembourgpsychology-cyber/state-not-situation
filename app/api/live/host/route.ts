import { randomBytes, randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { createRoom, hostCommand, hostView, setForecast } from "@/lib/live/engine";
import { createBookExperience } from "@/lib/live/experience";
import { experienceCheckpoint } from "@/lib/live/experience-copy";
import { changeRoom, clearRoomTyping, ensureLaunchRoom, insertRoom, listRooms, LiveError, readRoom } from "@/lib/live/store";
import { body, checkPassword, cookieOptions, fail, hostSession, json, PUBLIC_OPENING, requireHost, roomCode, token } from "@/lib/live/http";
import { LAUNCH_PATH, LAUNCH_ROOM_CODE } from "@/lib/live/launch";

export const runtime = "nodejs";
function view(room: Parameters<typeof hostView>[0]) {
  return {
    ...hostView(room),
    joinPath: room.code === LAUNCH_ROOM_CODE ? LAUNCH_PATH : `/live?room=${room.code}&invite=${encodeURIComponent(room.inviteToken)}${room.experience ? "&experience=1" : ""}`,
    screenPath: `/live/screen?room=${room.code}&invite=${encodeURIComponent(room.inviteToken)}`,
  };
}

export async function GET(request: NextRequest) {
  try {
    requireHost(request);
    const code = request.nextUrl.searchParams.get("room");
    return json(code ? view(await readRoom(roomCode(code))) : { rooms: await listRooms() });
  } catch (error) { return fail(error); }
}

export async function POST(request: NextRequest) {
  try {
    const data = await body(request);
    if (data.action === "login") {
      await checkPassword(request, data.password);
      const response = json({ ok: true });
      response.cookies.set("book_live_host", hostSession(), { ...cookieOptions, maxAge: 12 * 60 * 60 });
      return response;
    }
    requireHost(request);
    if (data.action === "launch") return json(view(await ensureLaunchRoom()));
    if (data.action === "logout") {
      const response = json({ ok: true }); response.cookies.set("book_live_host", "", { ...cookieOptions, maxAge: 0 }); return response;
    }
    if (data.action === "create") {
      if (data.mode !== "rehearsal" && data.mode !== "live") throw new LiveError("Choose a test room or event room.");
      const code = randomBytes(6).toString("hex").toUpperCase();
      const room = createRoom({ id: randomUUID(), code, inviteToken: token(), mode: data.mode, now: Date.now() });
      if (data.experience === true) room.experience = createBookExperience();
      if (data.mode === "live") room.expiresAt = Math.max(Date.now(), PUBLIC_OPENING) + 24 * 60 * 60 * 1000;
      await insertRoom(room);
      return json(view(room));
    }
    const code = roomCode(data.room);
    if (typeof data.expectedRevision !== "number" || typeof data.requestId !== "string" || data.requestId.length > 100) throw new LiveError("Please reload the host page and try again.");
    const room = await changeRoom(code, current => {
      if (data.action === "forecast") {
        if (current.experience) throw new LiveError("Jessika saves her prediction on paper for this vote.");
        if (current.revision !== data.expectedRevision) throw new LiveError("The room changed. Please try again.", 409);
        setForecast(current, data.forecast);
      } else {
        const allowed = ["pair", "next", "pause", "resume", "look_up", "return", "reveal", "skip", "restart_rehearsal"];
        if (!allowed.includes(String(data.action))) throw new LiveError("Unknown host action.");
        // A guest joining or voting should not cancel a host cue. A change
        // to what the audience is looking at still invalidates a stale tap.
        const checkpoint = experienceCheckpoint(current);
        const revision = checkpoint && data.checkpoint !== undefined
          ? data.checkpoint === checkpoint ? current.revision : -1
          : data.expectedRevision as number;
        hostCommand(current, data.action as Parameters<typeof hostCommand>[1], data.requestId as string, revision);
      }
    });
    if ((!room.experience && data.action !== "forecast" && data.action !== "pair") || data.action === "restart_rehearsal") await clearRoomTyping(code);
    return json(view(room));
  } catch (error) { return fail(error); }
}
