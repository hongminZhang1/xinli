"use client";

import React, { useState } from "react";
import { BarChart3, LineChart } from "lucide-react";

export default function GrowthTrendChart({ weekTrend }: { weekTrend: number[] }) {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const validWeekTrend = weekTrend && weekTrend.length > 0 ? weekTrend : [0,0,0,0,0,0,0];
  const maxScore = Math.max(100, ...validWeekTrend.map(v => v || 0));

  return (
    <div className="pt-6 border-t border-border/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <h3 className="font-heading text-base text-foreground">本周成长趋势</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg border border-border/30">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span>极佳 (75+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>良好 (40+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
              <span>一般 (&lt;40)</span>
            </div>
          </div>
          
          <div className="flex items-center bg-muted/50 p-1 rounded-lg border border-border/50">
            <button
              onClick={() => setChartType("bar")}
              className={`p-1.5 rounded-md transition-all ${chartType === "bar" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
              title="柱状图"
            >
              <BarChart3 size={14} />
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`p-1.5 rounded-md transition-all ${chartType === "line" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
              title="折线图"
            >
              <LineChart size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-40">
        {/* 背景网格线 */}
        <div className="absolute inset-x-0 inset-y-4 flex flex-col justify-between text-xs text-muted-foreground/30 pointer-events-none z-0">
          <div className="border-b border-dashed border-border/40 w-full h-full"></div>
          <div className="border-b border-dashed border-border/40 w-full h-full"></div>
          <div className="border-b border-dashed border-border/40 w-full h-full"></div>
        </div>

        {chartType === "bar" ? (
          <div className="absolute inset-0 flex items-end justify-between px-2 pt-4">
            {days.map((day, i) => {
              const height = validWeekTrend[i] || 0;
              let bgColor = "bg-primary/80";
              if (height === 0) bgColor = "bg-muted";
              else if (height < 40) bgColor = "bg-orange-400";
              else if (height > 75) bgColor = "bg-green-500";
              else bgColor = "bg-blue-500";

              return (
                <div key={day} className="flex flex-col items-center gap-2 group w-full relative z-10 h-full justify-end">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-popover text-popover-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded shadow-lg border border-border pointer-events-none whitespace-nowrap z-30">
                    综合 {height}分
                  </div>

                  <div className="relative w-2.5 sm:w-3 md:w-3.5 h-[80%] bg-muted/20 rounded-full overflow-hidden flex items-end">
                    <div
                      className={`w-full rounded-full transition-all duration-500 ease-out group-hover:opacity-90 ${bgColor}`}
                      style={{ height: `${(height / maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{day.replace('周', '')}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="absolute inset-x-2 inset-y-0 pt-4 z-10 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {/* SVG 绘制折线和区域 */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-[80%] overflow-visible pointer-events-none" style={{ bottom: '24px', top: 'auto' }} preserveAspectRatio="none">
                {(() => {
                const points = validWeekTrend.map((val, i) => {
                  const score = val || 0;
                  // 这里确保能够正常计算出数值，避免出现 NaN
                  const safeMax = maxScore || 100;
                  const x = ((i + 0.5) / days.length) * 100;
                  const y = 100 - (score / safeMax) * 100;
                  return `${x},${y}`;
                });
                
                // 为了渐变填充，需要添加底部两个垂直下落的点形成闭合曲线
                const lastX = ((days.length - 1 + 0.5) / days.length) * 100;
                const firstX = (0.5 / days.length) * 100;
                const polygonPoints = `${points.join(' ')} ${lastX},100 ${firstX},100`;

                return (
                    <g className="text-primary z-0">
                      <defs>
                        <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <polygon points={polygonPoints} fill="url(#line-gradient)" />
                      <polyline points={points.join(' ')} fill="none" stroke="#0ea5e9" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                );
              })()}
            </svg>

            {/* 折线图数据点和标签 */}
            {days.map((day, i) => {
              const height = validWeekTrend[i] || 0;
              const safeMax = maxScore || 100;
              let dotColor = "text-primary border-primary";
              // 根据需要调整圆点颜色可以继续扩展
              if (height > 0 && height < 40) dotColor = "text-orange-400 border-orange-400";
              else if (height > 75) dotColor = "text-green-500 border-green-500";
              else if (height > 0) dotColor = "text-blue-500 border-blue-500";

              return (
                <div key={day} className="absolute top-0 bottom-0 flex flex-col items-center group justify-end" style={{ left: `${((i + 0.5) / days.length) * 100}%`, transform: 'translateX(-50%)', width: `${100 / days.length}%` }}>
                  {/* Tooltip */}
                  <div 
                    className="opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 transition-all duration-300 transform group-hover:-translate-y-1 bg-popover text-popover-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded shadow-lg border border-border pointer-events-none whitespace-nowrap z-30"
                    style={{ bottom: `calc(${Math.max(0, (height / safeMax) * 80)}% + 32px)` }}
                  >
                    综合 {height}分
                  </div>
                  
                  {/* 数据点 */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-[2.5px] bg-background shadow-sm ${dotColor} transition-transform group-hover:scale-125 z-10`}
                    style={{ bottom: `calc(${Math.max(0, (height / safeMax) * 80)}% + 24px - 6px)` }}
                  />

                  <span className="text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-auto">{day.replace('周', '')}</span>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>

      {/* 底部计分规则简述 */}
      <div className="mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-muted-foreground bg-muted/20 px-3 py-3 rounded-lg border border-border/40">
        <span className="font-semibold text-foreground/80 flex items-center gap-1"><span className="text-primary text-sm">✨</span> 计分规则</span>
        <span className="bg-background px-2 py-1 rounded shadow-sm border border-border/50">基础 10分</span>
        <span className="bg-background px-2 py-1 rounded shadow-sm border border-border/50">记情绪 +15分(≤30)</span>
        <span className="bg-background px-2 py-1 rounded shadow-sm border border-border/50">AI对话 +25分(≤40)</span>
        <span className="bg-background px-2 py-1 rounded shadow-sm border border-border/50">写日记 +30分(≤50)</span>
        <span className="bg-background px-2 py-1 rounded shadow-sm border border-border/50">记录开心情绪 +5分</span>
      </div>
    </div>
  );
}