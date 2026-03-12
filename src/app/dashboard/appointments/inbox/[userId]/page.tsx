import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db-adapter";
import { notFound, redirect } from "next/navigation";
import CounselorReplyChatClient from "@/components/dashboard/CounselorReplyChatClient";

export default async function CounselorReplyPage({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { counselorId?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  // 只有咨询师可以访问此页面
  if (session.user.role !== "COUNSELOR") notFound();

  const counselorId = searchParams.counselorId ?? session.user.id;
  if (counselorId !== session.user.id) notFound();

  // 获取被咨询用户信息
  const targetUser = await db.user.findUnique({ id: params.userId });
  if (!targetUser) notFound();

  const formattedUser = {
    id: targetUser.id,
    name: targetUser.name || targetUser.username,
    avatar: targetUser.avatar,
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100svh-120px)] md:h-[calc(100svh-100px)] flex flex-col">
      <CounselorReplyChatClient
        counselorId={counselorId}
        targetUser={formattedUser}
        counselorName={(session.user as any).name || session.user.username}
        counselorAvatar={session.user.avatar ?? null}
      />
    </div>
  );
}
