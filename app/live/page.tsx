import LiveGuest from "@/components/live/LiveGuest";

export default async function LivePage({ searchParams }: { searchParams: Promise<{ room?: string; invite?: string }> }) {
  const params = await searchParams;
  return <LiveGuest roomCode={typeof params.room === "string" ? params.room : undefined} invite={typeof params.invite === "string" ? params.invite : undefined} />;
}
