import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { LiveError, rateLimit } from "./store";
import type { Room, Participant } from "./types";

export const PUBLIC_OPENING = Date.parse("2026-12-03T17:00:00Z");
export const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export const token = () => randomBytes(24).toString("base64url");
export const guestCookie = (code: string) => `book_live_${code}`;
export const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/api/live", maxAge: 24 * 60 * 60 };

export function json(value: unknown, status = 200) {
  return NextResponse.json(value, { status, headers: { "Cache-Control": "no-store, private, max-age=0", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer" } });
}

export function fail(error: unknown) {
  const e = error as { status?: number; message?: string; code?: string };
  const status = e.status && e.status >= 400 && e.status < 500 ? e.status : e instanceof LiveError ? e.status : 500;
  // Never send database errors, connection URLs, SQL or message data to clients.
  const message = status < 500 || e instanceof LiveError ? e.message : "Something went wrong. Please try again.";
  return json({ error: message, code: e.code }, status);
}

export async function body(request: NextRequest) {
  const origin = request.headers.get("origin");
  // Next's internal request URL may use localhost behind a proxy. Compare the
  // browser Origin with the destination Host, not the internal server URL.
  if (origin) {
    let source: URL;
    try { source = new URL(origin); } catch { throw new LiveError("Please use the event page to continue.", 403); }
    if (!["http:", "https:"].includes(source.protocol) || source.host !== request.headers.get("host")) throw new LiveError("Please use the event page to continue.", 403);
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") throw new LiveError("Please use the event page to continue.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) throw new LiveError("Please send a valid request.", 415);
  const text = await request.text();
  if (text.length > 10000) throw new LiveError("That response is too long.", 413);
  try { return JSON.parse(text) as Record<string, unknown>; }
  catch { throw new LiveError("Please send a valid request."); }
}

export function roomCode(value: unknown) {
  if (typeof value !== "string" || !/^[A-Z0-9]{8,16}$/i.test(value)) throw new LiveError("Enter a valid room code.");
  return value.toUpperCase();
}

export function guest(request: NextRequest, room: Room): Participant {
  const value = request.cookies.get(guestCookie(room.code))?.value ?? "";
  const [id, secret] = value.split(".");
  const participant = room.participants.find(p => p.id === id && secret && p.tokenHash === hash(secret));
  if (!participant) throw new LiveError("Please join this room first.", 401);
  return participant;
}

export function invitation(room: Room, invite: unknown) {
  if (room.mode === "rehearsal") {
    if (typeof invite !== "string" || hash(invite) !== hash(room.inviteToken)) throw new LiveError("Use the private link from the host to join this test room.", 403);
  } else if (Date.now() < PUBLIC_OPENING) {
    throw new LiveError("This event opens on 3 December 2026 at 18:00 Luxembourg time.", 423);
  }
}

function sessionSignature(payload: string) {
  const secret = process.env.LIVE_SESSION_SECRET;
  if (!secret) throw new LiveError("Host access is not set up.", 503);
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function hostSession() {
  const payload = Buffer.from(JSON.stringify({ id: token(), exp: Date.now() + 12 * 60 * 60 * 1000 })).toString("base64url");
  return `${payload}.${sessionSignature(payload)}`;
}

export function requireHost(request: NextRequest) {
  const value = request.cookies.get("book_live_host")?.value;
  if (!value) throw new LiveError("Enter your host key.", 401);
  const [payload, signature] = value.split(".");
  if (!payload || !signature) throw new LiveError("Please sign in again.", 401);
  const expected = sessionSignature(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new LiveError("Please sign in again.", 401);
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now()) throw new Error();
  } catch { throw new LiveError("Please sign in again.", 401); }
}

export async function checkPassword(request: NextRequest, value: unknown) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  await rateLimit(`host:${hash(ip)}`, 8, 600);
  const expected = process.env.LIVE_HOST_PASSWORD;
  if (!expected) throw new LiveError("Host access is not set up.", 503);
  if (typeof value !== "string" || !timingSafeEqual(Buffer.from(hash(value)), Buffer.from(hash(expected)))) throw new LiveError("The host key is not correct.", 401);
}
