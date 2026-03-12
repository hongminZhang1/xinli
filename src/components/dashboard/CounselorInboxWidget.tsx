"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { MessageSquare, Inbox } from "lucide-react";

type InboxItem = {
  userId: string;
  userName: string;
  userAvatar: string | null;
  lastMessage: string | null;
  lastMessageAt: string;
};

export default function CounselorInboxWidget({ counselorId }: { counselorId: string }) {
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await fetch(`/api/counselors/${counselorId}/sessions`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: InboxItem[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("获取收件箱失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, [counselorId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-48 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="p-10 text-center text-gray-500">
        <Inbox className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="font-medium">暂时没有人向你发起咨询</p>
        <p className="text-sm mt-1 text-gray-400">当有用户向你发送消息时，会显示在这里</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Card
          key={item.userId}
          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() =>
            router.push(`/dashboard/appointments/inbox/${item.userId}?counselorId=${counselorId}`)
          }
        >
          <div className="flex items-center gap-4">
            <Avatar
              username={item.userName}
              avatar={item.userAvatar}
              size="large"
              className="shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                {item.userName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {item.lastMessage ?? "暂无消息记录"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(item.lastMessageAt).toLocaleString("zh-CN", {
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <button className="shrink-0 flex items-center gap-1.5 text-primary text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              回复
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
