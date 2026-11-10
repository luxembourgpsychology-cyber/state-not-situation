import LiveScreen from "@/components/live/LiveScreen";
export default async function ScreenPage({ searchParams }: { searchParams: Promise<{ room?: string; invite?: string }> }) {
  const params = await searchParams;
  return <LiveScreen roomCode={typeof params.room === "string" ? params.room : undefined} invite={typeof params.invite === "string" ? params.invite : undefined} />;
}
