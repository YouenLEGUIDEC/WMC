import { members } from "@/lib/demo/data";
import { MemberDetail } from "@/components/wmc/members";
import { notFound } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const member = members.find((m) => m.id === username);
  if (!member) notFound();
  return <MemberDetail member={member} />;
}
