import { NextRequest } from "next/server";
import { cleanupExpired } from "@/lib/live/store";
import { fail, json } from "@/lib/live/http";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  try {
    if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) return json({ error: "Not authorised." }, 401);
    return json(await cleanupExpired());
  } catch (error) { return fail(error); }
}
