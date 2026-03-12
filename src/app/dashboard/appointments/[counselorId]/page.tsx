import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db-adapter";
import { notFound, redirect } from "next/navigation";
import CounselorChatClient from "@/components/dashboard/CounselorChatClient";

export default async function CounselorChatPage({
  params,
}: {
  params: { counselorId: string };
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 咨询师不能和自己聊天
  if (session.user.id === params.counselorId) {
    redirect("/dashboard/appointments");
  }

  const counselor = await db.user.findUnique({
    id: params.counselorId,
  });

  if (!counselor || counselor.role !== "COUNSELOR") {
    notFound();
  }

  // 格式化输出保证 Client 组件兼容
  const formattedCounselor = {
    id: counselor.id,
    name: counselor.name || counselor.username, // 优先显示名字
    avatar: counselor.avatar,
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100svh-120px)] md:h-[calc(100svh-100px)] flex flex-col">
      <CounselorChatClient
        counselor={formattedCounselor}
        userId={session.user.id}
      />
    </div>
  );
}
