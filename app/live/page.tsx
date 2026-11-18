import LiveGuest from "@/components/live/LiveGuest";
import ExperienceGuest from "@/components/live/ExperienceGuest";

export default async function LivePage({ searchParams }: { searchParams: Promise<{ room?: string; invite?: string; experience?: string }> }) {
  const params = await searchParams;
  const room = typeof params.room === "string" ? params.room : undefined;
  const invite = typeof params.invite === "string" ? params.invite : undefined;
  if (params.experience === "1" && room) return <ExperienceGuest roomCode={room} invite={invite} />;
  return <LiveGuest roomCode={room} invite={invite} />;
}
