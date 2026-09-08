import { rides } from "@/lib/demo/data";
import { RideDetail } from "@/components/wmc/rides";
import { notFound } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ride = rides.find((r) => r.id === id);
  if (!ride) notFound();
  return <RideDetail ride={ride} />;
}
