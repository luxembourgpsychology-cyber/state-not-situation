import LivePreview from "@/components/live/LivePreview";

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ moment?: string; chat?: string }> }) {
  const params = await searchParams;
  const value = Number(params.moment);
  const moment = Number.isInteger(value) && value >= 1 && value <= 4 ? value : 1;
  return <LivePreview initialMoment={moment} directChat={params.chat === "1" || moment > 1} />;
}
