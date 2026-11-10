import LiveGuest from "@/components/live/LiveGuest";
import LaunchHolding from "@/components/live/LaunchHolding";
import { LAUNCH_ROOM_CODE, launchStatus } from "@/lib/live/launch";

export const dynamic = "force-dynamic";

export default function LaunchPage() {
  // eslint-disable-next-line react-hooks/purity -- This dynamic server-only entrance deliberately reads the request-time clock.
  const status = launchStatus(Date.now());
  return status === "open" ? <LiveGuest roomCode={LAUNCH_ROOM_CODE} /> : <LaunchHolding ended={status === "ended"} />;
}
