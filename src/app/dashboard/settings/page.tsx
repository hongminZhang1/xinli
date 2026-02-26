"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import AvatarUpload from "@/components/ui/AvatarUpload";

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-tight">{title}</h2>
        <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  desc,
  actionLabel,
  actionVariant = "default",
}: {
  icon: string;
  title: string;
  desc: string;
  actionLabel: string;
  actionVariant?: "default" | "danger";
}) {
  const btnCls =
    actionVariant === "danger"
      ? "px-4 py-2 text-sm font-medium rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
      : "px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors";
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-base font-medium text-slate-700 dark:text-slate-200 leading-tight">{title}</p>
          <p className="text-sm text-slate-400 mt-0.5">{desc}</p>
        </div>
      </div>
      <button className={btnCls + " ml-4 shrink-0"}>{actionLabel}</button>
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const themeOptions = [
    { value: "light", label: "白天", icon: Sun, desc: "浅色清爽界面" },
    { value: "dark", label: "夜晚", icon: Moon, desc: "深色护眼界面" },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto py-2 space-y-5">
      {/* 页头 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">账户设置</h1>
          <p className="text-sm text-slate-400 mt-0.5">管理你的个人信息与偏好配置</p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          返回
        </button>
      </div>

      {/* 个人信息 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">

        <div className="space-y-5">
          <AvatarUpload username={session?.user?.username} />

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1.5">用户名</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={session?.user?.username || ""}
                disabled
                className="flex-1 px-3.5 py-2.5 text-base border border-slate-200 rounded-xl bg-slate-50 text-slate-400 cursor-not-allowed"
              />
              <span className="text-sm text-slate-400 shrink-0">暂不支持修改</span>
            </div>
          </div>
        </div>
      </div>

      {/* 安全设置 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
        <SectionHeader icon="🔒" title="账户安全" subtitle="密码与登录方式管理" />
        <div>
          <SettingRow
            icon="🔑"
            title="修改密码"
            desc="定期更新密码有助于保护账户安全"
            actionLabel="去修改"
          />
          <SettingRow
            icon="📱"
            title="两步验证"
            desc="开启后登录时需要额外验证码"
            actionLabel="配置"
          />
        </div>
      </div>

      {/* 偏好设置 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
        <SectionHeader icon="⚙️" title="偏好设置" subtitle="通知、隐私等个性化配置" />
        <div>
          <SettingRow
            icon="🔔"
            title="通知设置"
            desc="管理你接收的消息提醒类型"
            actionLabel="配置"
          />
          <SettingRow
            icon="🛡️"
            title="隐私设置"
            desc="控制个人信息的可见范围"
            actionLabel="配置"
          />

          {/* 主题外观 - 真实交互 */}
          <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl shrink-0">🎨</span>
              <div className="min-w-0">
                <p className="text-base font-medium text-slate-700 dark:text-slate-200 leading-tight">主题外观</p>
                <p className="text-sm text-slate-400 mt-0.5">切换浅色 / 深色显示模式</p>
              </div>
            </div>
            {mounted && (
              <div className="flex items-center gap-2 ml-4 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      theme === value
                        ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 危险区域 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/40 p-5">
        <SectionHeader icon="⚠️" title="危险操作" subtitle="以下操作不可撤销，请谨慎" />
        <div>
          <SettingRow
            icon="🗑️"
            title="注销账户"
            desc="永久删除账户及所有数据"
            actionLabel="注销"
            actionVariant="danger"
          />
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end pb-4">
        <button className="px-6 py-3 text-base font-semibold bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors shadow-sm">
          保存设置
        </button>
      </div>
    </div>
  );
}