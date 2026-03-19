import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";
import Card from "@/components/ui/Card";
import JournalList from "@/components/dashboard/JournalList";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchUserJournals(userId: string): Promise<any[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(
      `${baseUrl}/journals?type=private&userId=${userId}`,
      { cache: "no-store" }
    );
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function JournalPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 h-full flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">我的日记</h2>
        <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-100 to-purple-50 dark:from-indigo-900/40 dark:to-purple-800/40 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white dark:ring-gray-800">
            <span className="text-5xl">🔒</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">需要登录</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
            您当前处于游客模式。登录后即可记录您的私人专属日记，您的数据将被安全加密保存。
          </p>
          <a
            href="/"
            className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            前往 登录 / 注册
          </a>
        </div>
      </div>
    );
  }

  const initialJournals = await fetchUserJournals(session.user.id);

  return <JournalList initialJournals={initialJournals} userId={session.user.id} />;
}
