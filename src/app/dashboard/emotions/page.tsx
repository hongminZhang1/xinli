"use client";

import EmotionsWidget from "@/components/dashboard/EmotionsWidget";
import { useEmotions } from "@/hooks/useEmotions";
import { EmotionEntry, EMOJI_OPTIONS, getEmotionEmoji } from "@/types/emotions";

// ─── 情绪颜色映射 ────────────────────────────────────────────────
const EMOTION_COLORS: Record<string, { bg: string; text: string }> = {
  "😊": { bg: "bg-amber-50",  text: "text-amber-600"  },
  "😔": { bg: "bg-blue-50",   text: "text-blue-500"   },
  "😡": { bg: "bg-red-50",    text: "text-red-500"    },
  "😴": { bg: "bg-indigo-50", text: "text-indigo-500" },
  "😰": { bg: "bg-orange-50", text: "text-orange-500" },
};

// ─── 统计卡片 ─────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  accent,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-800 leading-tight mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── 最近7天情绪日历条 ────────────────────────────────────────────
function WeekStreak({ entries }: { entries: EmotionEntry[] }) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });
  const DAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <p className="text-sm font-semibold text-gray-600 mb-4">最近 7 天打卡</p>
      <div className="flex gap-2 justify-between">
        {days.map((d, idx) => {
          const dateStr = d.toDateString();
          const dayEntries = entries.filter(
            (e) => new Date(e.createdAt).toDateString() === dateStr
          );
          const lastEntry = dayEntries[dayEntries.length - 1];
          const emoji = lastEntry ? getEmotionEmoji(lastEntry.emoji) : null;
          const isToday = d.toDateString() === today.toDateString();
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-xs text-gray-400 font-medium">{DAY_LABELS[d.getDay()]}</span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all
                  ${isToday ? "ring-2 ring-violet-400 ring-offset-1" : ""}
                  ${emoji ? "bg-violet-50" : "bg-gray-50 border border-dashed border-gray-200"}
                `}
              >
                {emoji ?? <span className="w-2 h-2 rounded-full bg-gray-200 block" />}
              </div>
              <span className={`text-xs font-medium ${isToday ? "text-violet-600" : "text-gray-400"}`}>
                {d.getMonth() + 1}/{d.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 情绪分布条形 ─────────────────────────────────────────────────
function EmotionDistribution({ entries }: { entries: EmotionEntry[] }) {
  if (entries.length === 0) return null;
  const counts = entries.reduce((acc: Record<string, number>, e) => {
    const k = getEmotionEmoji(e.emoji);
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
  const total = entries.length;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <p className="text-sm font-semibold text-gray-600 mb-4">情绪分布</p>
      <div className="space-y-3">
        {sorted.map(([emoji, count]) => {
          const pct = Math.round((count / total) * 100);
          return (
            <div key={emoji} className="flex items-center gap-3">
              <span className="text-xl w-7 text-center">{emoji}</span>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-violet-400 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-500 w-8 text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 主页面 ───────────────────────────────────────────────────────
export default function EmotionsPage() {
  const emotions = useEmotions();
  const { entries, isAuthenticated } = emotions;

  // 统计数据
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const thisWeekEntries = entries.filter(
    (e: EmotionEntry) => new Date(e.createdAt) >= startOfWeek
  );

  const consecutive = (() => {
    let streak = 0;
    const d = new Date();
    while (true) {
      const ds = d.toDateString();
      if (entries.some((e: EmotionEntry) => new Date(e.createdAt).toDateString() === ds)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else break;
    }
    return streak;
  })();

  const emotionCounts = entries.reduce((acc: Record<string, number>, e: EmotionEntry) => {
    const k = getEmotionEmoji(e.emoji);
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const mostFrequent = Object.entries(emotionCounts).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0];

  return (
    <div className="space-y-8">

        {/* ── Stats Row ── */}
        {isAuthenticated && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="累计打卡" value={entries.length}      sub="次情绪记录"     accent="bg-violet-50" icon="📋" />
            <StatCard label="本周打卡" value={thisWeekEntries.length} sub="本周记录次数"  accent="bg-teal-50"   icon="📅" />
            <StatCard label="连续打卡" value={`${consecutive} 天`} sub="保持坚持！"      accent="bg-amber-50"  icon="🔥" />
            <StatCard
              label="最常见情绪"
              value={mostFrequent ? mostFrequent[0] : "—"}
              sub={mostFrequent ? `共 ${mostFrequent[1] as number} 次` : "暂无数据"}
              accent="bg-pink-50"
              icon="💡"
            />
          </div>
        )}

        {/* ── Main Content: 2/3 + 1/3 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧主区域 */}
          <div className="lg:col-span-2 space-y-6">
            <EmotionsWidget emotionsData={emotions} />
          </div>

          {/* 右侧洞察区 */}
          <div className="space-y-5">
            {isAuthenticated && (
              <>
                <WeekStreak entries={entries} />
                <EmotionDistribution entries={entries} />
              </>
            )}

            {/* 情绪小贴士 */}
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-5 border border-violet-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💡</span>
                <p className="text-sm font-semibold text-violet-800">情绪小贴士</p>
              </div>
              <ul className="space-y-2.5">
                {[
                  "每天记录 2–3 次，更准确掌握情绪节奏",
                  "写下具体感受和触发点，有助于情绪管理",
                  "定期回顾，发现情绪规律与改善方向",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-violet-700">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* 情绪指南 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-gray-600 mb-3">情绪指南</p>
              <div className="space-y-2">
                {EMOJI_OPTIONS.map((opt) => {
                  const colors = EMOTION_COLORS[opt.value] || { bg: "bg-gray-50", text: "text-gray-500" };
                  return (
                    <div key={opt.value} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${colors.bg}`}>
                      <span className="text-lg">{opt.value}</span>
                      <p className={`text-xs font-semibold ${colors.text}`}>{opt.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
