"use client";

import EmotionsWidget from "@/components/dashboard/EmotionsWidget";
import { useEmotions } from "@/hooks/useEmotions";
import { EmotionEntry, getEmotionEmoji } from "@/types/emotions";

export default function EmotionsPage() {
  const emotions = useEmotions();
  const { entries, isAuthenticated } = emotions;
  
  const getEmotionStats = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const thisWeekEntries = entries.filter((entry: EmotionEntry) => 
      new Date(entry.createdAt) >= startOfWeek
    );

    const emotionCounts = entries.reduce((acc: Record<string, number>, entry: EmotionEntry) => {
      acc[entry.emoji] = (acc[entry.emoji] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostFrequentEmotion = Object.entries(emotionCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))[0] as [string, number] | undefined;

    return {
      totalEntries: entries.length,
      thisWeekEntries: thisWeekEntries.length,
      mostFrequentEmotion: mostFrequentEmotion || ["😊", 0],
    };
  };

  const stats = isAuthenticated ? getEmotionStats() : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">情绪追踪</h2>
        <p className="text-gray-600">记录你的心情，了解情绪变化趋势</p>
      </div>

      {/* 统计数据 */}
      {isAuthenticated && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-sm font-medium text-gray-500">总记录数</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              {stats.totalEntries}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-sm font-medium text-gray-500">本周记录</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              {stats.thisWeekEntries}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-sm font-medium text-gray-500">常见情绪</div>
            <div className="text-2xl font-bold text-gray-900 mt-2 flex items-center gap-2">
              <span>{getEmotionEmoji(stats.mostFrequentEmotion[0])}</span>
              <span className="text-sm text-gray-500">
                ({stats.mostFrequentEmotion[1]}次)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 主要组件 */}
      <EmotionsWidget emotionsData={emotions} />
      
      {/* 提示信息 */}
      {isAuthenticated && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 小贴士</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 尝试每天记录2-3次情绪变化，更好地了解自己</li>
            <li>• 记录具体的感受和触发原因，有助于情绪管理</li>
            <li>• 定期回顾情绪记录，发现情绪规律和改善方向</li>
          </ul>
        </div>
      )}
    </div>
  );
}
  