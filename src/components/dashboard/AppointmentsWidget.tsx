"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { MessageSquare, UserCheck } from "lucide-react";
type Counselor = {
  id: string;
  name: string;
  avatar: string | null;
  specialties: string[] | any;
  bio: string | null;
};

export default function AppointmentsWidget() {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        // 调用同域 Next.js API 中转，避免跨域 CORS 延迟
        const res = await fetch("/api/counselors");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Counselor[] = await res.json();
        setCounselors(data);
      } catch (error) {
        console.error("获取咨询师失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounselors();
  }, []);

  const handleStartChat = (id: string) => {
    router.push(`/dashboard/appointments/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-48 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="flex gap-1.5">
                  <div className="h-5 w-14 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                  <div className="h-5 w-14 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                </div>
              </div>
              <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {counselors.length === 0 ? (
        <Card className="p-8 text-center text-gray-500">
          <UserCheck className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>当前暂无可预约的咨询师，请稍后刷新重试</p>
        </Card>
      ) : (
        counselors.map((counselor) => {
          let parsedSpecialties: string[] = [];
          if (Array.isArray(counselor.specialties)) {
            parsedSpecialties = counselor.specialties;
          } else if (typeof counselor.specialties === "string") {
            try {
              parsedSpecialties = JSON.parse(counselor.specialties);
            } catch (e) {
              parsedSpecialties = [];
            }
          }

          return (
            <Card key={counselor.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <Avatar
                  username={counselor.name}
                  avatar={counselor.avatar}
                  size="large"
                  className="shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {counselor.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                    {counselor.bio || "该咨询师暂时没有留下个人简介。"}
                  </p>
                  {parsedSpecialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {parsedSpecialties.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleStartChat(counselor.id)}
                  className="shrink-0 flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  开始咨询
                </button>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}
