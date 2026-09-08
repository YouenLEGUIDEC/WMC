import { bikes } from "@/lib/demo/data";
import { BikeDetail } from "@/components/wmc/garage";
import { notFound } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ bikeId: string }>;
}) {
  const { bikeId } = await params;
  const bike = bikes.find((b) => b.id === bikeId);
  if (!bike) notFound();
  return <BikeDetail bike={bike} />;
}
