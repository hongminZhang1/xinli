import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppointmentsWidget from "@/components/dashboard/AppointmentsWidget";
import CounselorInboxWidget from "@/components/dashboard/CounselorInboxWidget";

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 h-full flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">咨询预约</h2>
        <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-teal-50 dark:from-blue-900/40 dark:to-teal-800/40 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white dark:ring-gray-800">
            <span className="text-5xl">🔒</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">需要登录</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
            您当前处于游客模式。登录后即可预约专业心理咨询师，开启您的专属心灵对话。
          </p>
          <a
            href="/"
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            前往 登录 / 注册
          </a>
        </div>
      </div>
    );
  }

  const isCounselor = session?.user?.role === "COUNSELOR";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        {isCounselor ? "情绪开导" : "咨询预约"}
      </h2>
      {isCounselor ? (
        <CounselorInboxWidget counselorId={session!.user.id} />
      ) : (
        <AppointmentsWidget />
      )}
    </div>
  );
}
