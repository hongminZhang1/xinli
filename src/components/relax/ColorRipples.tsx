"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { Trash2 } from "lucide-react";

const COLORS = [
  "#8EC5FC", "#E0C3FC", "#F5B7B1", "#A8E6CF",
  "#FFD3B6", "#C4E0E5", "#D4A5FF", "#B5EAD7",
  "#FFDEE9", "#B5FFFC", "#FBC2EB", "#A6C1EE",
];

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  opacity: number;
}

export default function ColorRipples() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number>(0);
  const colorIndexRef = useRef(0);
  const isDarkRef = useRef(false);
  const [count, setCount] = useState(0);

  const addRipple = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const color = COLORS[colorIndexRef.current % COLORS.length];
    colorIndexRef.current++;
    setCount((c) => c + 1);

    ripplesRef.current.push({
      x, y, radius: 0,
      maxRadius: 220 + Math.random() * 100,
      color, opacity: 1,
    });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    addRipple(e.clientX, e.clientY);
  }, [addRipple]);

  const handleTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const t = e.touches[0];
    if (t) addRipple(t.clientX, t.clientY);
  }, [addRipple]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // 检测当前是否暗色模式
      isDarkRef.current = document.documentElement.classList.contains("dark");
      const boost = isDarkRef.current ? 1.4 : 1;

      const dpr = window.devicePixelRatio || 1;
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.2;
        const progress = r.radius / r.maxRadius;
        // 前30%保持高透明度，之后缓慢衰减
        r.opacity = progress < 0.3 ? 1 : Math.max(0, 1 - (progress - 0.3) / 0.7);

        if (r.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const cx = r.x / dpr;
        const cy = r.y / dpr;
        const boostedOpacity = Math.min(1, r.opacity * boost);

        // 中心亮点
        if (progress < 0.5) {
          const dotAlpha = boostedOpacity * (1 - progress * 2);
          const dotRadius = 8 + progress * 15;
          const dotGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotRadius);
          dotGrd.addColorStop(0, r.color + Math.round(dotAlpha * 200).toString(16).padStart(2, "0"));
          dotGrd.addColorStop(1, r.color + "00");
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = dotGrd;
          ctx.fill();
        }

        // 主体填充渐变圆
        const grd = ctx.createRadialGradient(cx, cy, r.radius * 0.3, cx, cy, r.radius);
        grd.addColorStop(0, r.color + Math.round(boostedOpacity * 100).toString(16).padStart(2, "0"));
        grd.addColorStop(0.7, r.color + Math.round(boostedOpacity * 50).toString(16).padStart(2, "0"));
        grd.addColorStop(1, r.color + "00");
        ctx.beginPath();
        ctx.arc(cx, cy, r.radius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // 主圆环（更粗更亮）
        ctx.beginPath();
        ctx.arc(cx, cy, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color + Math.round(boostedOpacity * 220).toString(16).padStart(2, "0");
        ctx.lineWidth = 3;
        ctx.stroke();

        // 外层光晕圆环
        for (let j = 1; j <= 2; j++) {
          const rad = r.radius + j * 12;
          const alpha = boostedOpacity * (1 - j * 0.4);
          if (alpha <= 0) continue;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.strokeStyle = r.color + Math.round(alpha * 160).toString(16).padStart(2, "0");
          ctx.lineWidth = 2 - j * 0.5;
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, []);

  const clear = () => {
    ripplesRef.current = [];
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-muted-foreground">
          点击或触摸画布，创造属于你的色彩涟漪
        </p>
        {count > 0 && (
          <span className="text-xs text-muted-foreground tabular-nums">{count} 个涟漪</span>
        )}
      </div>
      <div className="relative w-full rounded-2xl overflow-hidden shadow-inner border border-border dark:border-border/60 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          onTouchStart={handleTouch}
          className="relative w-full cursor-crosshair"
          style={{ height: 420, touchAction: "none", background: "transparent" }}
        />
        {count === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/20 dark:border-muted-foreground/15 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <span className="text-sm">点击此处开始创作</span>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={clear}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Trash2 className="h-3.5 w-3.5" />
        清空画布
      </button>
    </div>
  );
}
