import LivePreview from "@/components/live/LivePreview";

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ moment?: string }> }) {
  const params = await searchParams;
  const value = Number(params.moment);
  return <LivePreview initialMoment={Number.isInteger(value) && value >= 1 && value <= 4 ? value : 1} startAtArrival={!params.moment} />;
}
