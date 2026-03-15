"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Square } from "lucide-react";

const PHASES = [
  { name: "inhale", label: "吸气", duration: 4, scale: 1 },
  { name: "hold", label: "屏息", duration: 4, scale: 1 },
  { name: "exhale", label: "呼气", duration: 4, scale: 0 },
] as const;

export default function BreathingExercise() {
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(PHASES[0].duration);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phase = PHASES[phaseIndex];

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      cleanup();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((pi) => {
            const next = (pi + 1) % PHASES.length;
            if (next === 0) setCycles((c) => c + 1);
            setSecondsLeft(PHASES[next].duration);
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return cleanup;
  }, [isRunning, cleanup]);

  const handleToggle = () => {
    if (isRunning) {
      setIsRunning(false);
      setPhaseIndex(0);
      setSecondsLeft(PHASES[0].duration);
    } else {
      setCycles(0);
      setPhaseIndex(0);
      setSecondsLeft(PHASES[0].duration);
      setIsRunning(true);
    }
  };

  const isExpanded = isRunning && phase.scale === 1;
  const circleSize = isExpanded ? 180 : 100;
  const outerSize = isExpanded ? 220 : 120;

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* 阶段指示器 */}
      <div className="flex items-center gap-3">
        {PHASES.map((p, i) => (
          <div key={p.name} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  isRunning && i === phaseIndex
                    ? "bg-gradient-to-br from-teal-400 to-cyan-500 text-white scale-110 shadow-lg shadow-teal-500/30"
                    : isRunning && i < phaseIndex
                    ? "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs font-medium transition-colors ${
                isRunning && i === phaseIndex ? "text-teal-600 dark:text-teal-400" : "text-muted-foreground"
              }`}>
                {p.label}
              </span>
            </div>
            {i < PHASES.length - 1 && (
              <div className={`w-8 h-0.5 rounded-full mb-5 transition-colors ${
                isRunning && i < phaseIndex ? "bg-teal-300 dark:bg-teal-700" : "bg-muted"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* 呼吸圆圈 */}
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
        {/* 最外层光晕 */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-teal-400/10 to-cyan-400/10 dark:from-teal-400/15 dark:to-cyan-400/15 transition-all ease-in-out"
          style={{
            width: outerSize + 40,
            height: outerSize + 40,
            transitionDuration: `${phase.duration}s`,
          }}
        />
        {/* 外层脉动圈 */}
        <div
          className="absolute rounded-full border-2 border-teal-300/30 dark:border-teal-500/20 transition-all ease-in-out"
          style={{
            width: outerSize,
            height: outerSize,
            transitionDuration: `${phase.duration}s`,
          }}
        />
        {/* 主圆 */}
        <div
          className="relative rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-2xl shadow-teal-500/30 dark:shadow-teal-500/20 flex flex-col items-center justify-center text-white transition-all ease-in-out"
          style={{
            width: circleSize,
            height: circleSize,
            transitionDuration: `${phase.duration}s`,
          }}
        >
          <span className="text-4xl font-bold tabular-nums">
            {isRunning ? secondsLeft : "—"}
          </span>
          <span className="text-sm mt-1 font-medium opacity-90">
            {isRunning ? phase.label : "准备好了吗"}
          </span>
        </div>
      </div>

      {/* 控制按钮 & 统计 */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium text-white transition-all duration-300 shadow-lg ${
            isRunning
              ? "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 shadow-red-500/25"
              : "bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 shadow-teal-500/25"
          }`}
        >
          {isRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? "停止" : "开始呼吸"}
        </button>
        {cycles > 0 && (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-sm">
            <span className="text-teal-600 dark:text-teal-400">已完成</span>
            <span className="font-bold text-teal-700 dark:text-teal-300">{cycles}</span>
            <span className="text-teal-600 dark:text-teal-400">个循环</span>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center max-w-xs">
        吸气 4 秒 → 屏息 4 秒 → 呼气 4 秒，每个循环 12 秒，建议练习 3-5 分钟
      </p>
    </div>
  );
}
