import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";
import JournalDetailClient from "@/components/dashboard/JournalDetailClient";

async function fetchJournalDetail(id: string, userId: string): Promise<any | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(
      `${baseUrl}/journal/${id}?userId=${userId}`,
      { cache: "no-store" }
    );
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function JournalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const initialJournal = session?.user?.id
    ? await fetchJournalDetail(params.id, session.user.id)
    : null;

  // 私密日记且当前用户不是作者：不向客户端传入任何内容，防止数据泄露
  const isPrivateAndNotAuthor =
    initialJournal?.isPrivate && initialJournal?.userId !== session?.user?.id;
  const safeJournal = isPrivateAndNotAuthor ? null : initialJournal;

  // 日记详情接口已包含 comments（服务端 include），直接复用，避免调用不存在的独立评论接口
  const initialComments: any[] = safeJournal?.comments ?? [];

  return (
    <JournalDetailClient
      journalId={params.id}
      initialJournal={safeJournal}
      initialComments={initialComments}
    />
  );
}