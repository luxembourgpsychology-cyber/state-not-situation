import LiveGuest from "@/components/live/LiveGuest";
import ExperienceGuest from "@/components/live/ExperienceGuest";
import LaunchHolding from "@/components/live/LaunchHolding";
import { LAUNCH_ROOM_CODE, launchStatus } from "@/lib/live/launch";
import { readRoom } from "@/lib/live/store";

export const dynamic = "force-dynamic";

export default async function LaunchPage() {
  // eslint-disable-next-line react-hooks/purity -- This dynamic server-only entrance deliberately reads the request-time clock.
  const status = launchStatus(Date.now());
  if (status !== "open") return <LaunchHolding ended={status === "ended"} />;
  const room = await readRoom(LAUNCH_ROOM_CODE).catch(() => null);
  if (room && !room.experience) return <LiveGuest roomCode={LAUNCH_ROOM_CODE} />;
  return <ExperienceGuest roomCode={LAUNCH_ROOM_CODE} />;
}
