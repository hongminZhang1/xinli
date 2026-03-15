"use client";

import { useState } from "react";
import { Gamepad2, Wind, Grid3x3, Palette, Keyboard, Puzzle, Sparkles } from "lucide-react";
import GameModal from "@/components/relax/GameModal";
import BreathingExercise from "@/components/relax/BreathingExercise";
import MemoryCards from "@/components/relax/MemoryCards";
import ColorRipples from "@/components/relax/ColorRipples";
import ZenTyping from "@/components/relax/ZenTyping";
import SlidingPuzzle from "@/components/relax/SlidingPuzzle";

const games = [
  {
    id: "breathing",
    title: "呼吸练习",
    desc: "跟随圆圈的节奏，深呼吸放松身心",
    icon: Wind,
    gradient: "from-teal-400 to-cyan-500",
    shadow: "shadow-teal-500/20",
    emoji: "🌬️",
    component: BreathingExercise,
  },
  {
    id: "memory",
    title: "记忆翻牌",
    desc: "翻开卡片，找到匹配的自然图案",
    icon: Grid3x3,
    gradient: "from-violet-400 to-purple-500",
    shadow: "shadow-violet-500/20",
    emoji: "🦋",
    component: MemoryCards,
  },
  {
    id: "ripples",
    title: "色彩涟漪",
    desc: "点击屏幕，创造美丽的色彩波纹",
    icon: Palette,
    gradient: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/20",
    emoji: "🎨",
    component: ColorRipples,
  },
  {
    id: "typing",
    title: "打字禅",
    desc: "静心打字，感受文字的宁静力量",
    icon: Keyboard,
    gradient: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20",
    emoji: "✨",
    component: ZenTyping,
  },
  {
    id: "puzzle",
    title: "数字华容道",
    desc: "滑动数字方块，还原正确顺序",
    icon: Puzzle,
    gradient: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/20",
    emoji: "🧩",
    component: SlidingPuzzle,
  },
];

export default function RelaxPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const activeGameData = games.find((g) => g.id === activeGame);

  if (activeGameData) {
    const GameComponent = activeGameData.component;
    return (
      <GameModal
        title={activeGameData.title}
        gradient={activeGameData.gradient}
        icon={activeGameData.icon}
        onClose={() => setActiveGame(null)}
      >
        <GameComponent />
      </GameModal>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden modern-card p-6 md:p-8">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/5 dark:to-purple-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/10 to-cyan-500/10 dark:from-teal-500/5 dark:to-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-lg shadow-primary/25">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">轻松一刻</h1>
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">放下压力，享受片刻宁静与快乐</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`group relative overflow-hidden modern-card p-6 text-left hover:shadow-xl ${game.shadow} transition-all duration-300 hover:-translate-y-1.5`}
          >
            {/* 背景装饰 */}
            <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${game.gradient} opacity-10 dark:opacity-[0.06] group-hover:opacity-20 dark:group-hover:opacity-10 group-hover:scale-150 transition-all duration-500`} />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-white shadow-lg ${game.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <game.icon className="h-7 w-7" />
                </div>
                <span className="text-2xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300">
                  {game.emoji}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1.5">{game.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{game.desc}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <span>开始游戏</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tip */}
      <div className="modern-card p-5 flex items-center gap-4 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl shrink-0">
          🌿
        </div>
        <div>
          <div className="text-sm font-semibold mb-0.5">小提示</div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            这些小游戏旨在帮助你放松身心。如果你感到压力较大，也可以试试 <span className="text-primary font-medium">AI 倾诉</span>或呼吸练习。
          </div>
        </div>
      </div>
    </div>
  );
}
