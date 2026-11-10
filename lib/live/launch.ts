// The address printed on the launch sign must never contain a test-room token.
export const LAUNCH_ROOM_CODE = "LAUNCH2026";
export const LAUNCH_PATH = "/live/launch";
export const LAUNCH_URL = "https://statenotsituation.com/live/launch";
export const LAUNCH_OPENS = Date.parse("2026-12-03T17:00:00Z");
export const LAUNCH_ENDS = Date.parse("2026-12-04T17:00:00Z");

export function launchStatus(now: number): "before" | "open" | "ended" {
  return now < LAUNCH_OPENS ? "before" : now < LAUNCH_ENDS ? "open" : "ended";
}
