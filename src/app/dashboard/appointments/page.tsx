import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppointmentsWidget from "@/components/dashboard/AppointmentsWidget";
import CounselorInboxWidget from "@/components/dashboard/CounselorInboxWidget";

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">咨询预约</h2>
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
          <p className="text-4xl mb-3">🔒</p>
          <p className="font-semibold text-gray-700">请先登录</p>
          <p className="text-sm text-gray-400 mt-1">登录后即可预约心理咨询</p>
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
