import { createHmac, timingSafeEqual } from "node:crypto";

/** A private owner link, kept out of public pages and the guest QR. */
export function hostAccessKey(secret: string): string {
  if (!secret) throw new Error("Host access is not set up.");
  return `host_${createHmac("sha256", secret).update("state-not-situation:host-entry:v1").digest("base64url")}`;
}

export function validHostAccessKey(value: unknown, secret: string): boolean {
  if (typeof value !== "string" || !secret) return false;
  const expected = hostAccessKey(secret);
  const received = Buffer.from(value);
  const wanted = Buffer.from(expected);
  return received.length === wanted.length && timingSafeEqual(received, wanted);
}
