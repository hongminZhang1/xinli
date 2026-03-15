"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SkipForward, CheckCircle2 } from "lucide-react";

const QUOTES = [
  "一切都会好起来的",
  "深呼吸，慢慢来",
  "你已经做得很好了",
  "此刻的宁静属于你",
  "温柔地对待自己",
  "每一天都是新的开始",
  "接纳不完美的自己",
  "放下焦虑，拥抱当下",
  "你值得被温柔以待",
  "心若向阳，无畏悲伤",
  "生活不止眼前的苟且",
  "慢慢来，比较快",
  "允许自己休息一下",
  "你比想象中更强大",
  "静下心来，聆听内心",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ZenTyping() {
  const [order] = useState(() => shuffle(QUOTES));
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const composingRef = useRef(false);
  const quoteRef = useRef(QUOTES[0]);

  const quote = order[quoteIndex % order.length];
  quoteRef.current = quote;
  const isQuoteComplete = input === quote;
  const progress = quote.length > 0 ? (input.length / quote.length) * 100 : 0;

  useEffect(() => {
    if (isQuoteComplete) {
      const timer = setTimeout(() => {
        setCompleted((c) => c + 1);
        setQuoteIndex((qi) => (qi + 1) % order.length);
        setInput("");
        if (inputRef.current) inputRef.current.value = "";
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isQuoteComplete, order.length]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const syncInput = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    const val = el.value.slice(0, quoteRef.current.length);
    el.value = val;
    setInput(val);
  }, []);

  const handleChange = () => {
    if (composingRef.current) return;
    syncInput();
  };

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = () => {
    composingRef.current = false;
    syncInput();
  };

  const handleSkip = () => {
    setInput("");
    if (inputRef.current) inputRef.current.value = "";
    setQuoteIndex((qi) => (qi + 1) % order.length);
    focusInput();
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* 统计行 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/30">
          <CheckCircle2 className="h-4 w-4 text-amber-500" />
          <span className="text-xs text-amber-600 dark:text-amber-400">已完成</span>
          <span className="font-bold text-amber-700 dark:text-amber-300 tabular-nums">{completed}</span>
          <span className="text-xs text-amber-600 dark:text-amber-400">句</span>
        </div>
        <div className="text-xs text-muted-foreground">
          第 {quoteIndex + 1}/{order.length} 句
        </div>
      </div>

      {/* 非受控隐藏输入框，兼容中文 IME */}
      <input
        ref={inputRef}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="absolute opacity-0 pointer-events-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      {/* 显示区 */}
      <div
        onClick={focusInput}
        className={`relative w-full max-w-lg min-h-[140px] flex flex-col items-center justify-center px-8 py-10 rounded-2xl border-2 cursor-text transition-all duration-300 ${
          isQuoteComplete
            ? "border-green-300 dark:border-green-700 bg-green-50/60 dark:bg-green-900/20 shadow-lg shadow-green-500/10"
            : isFocused
            ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/5"
            : "border-border bg-card"
        }`}
      >
        {/* 进度条 */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden bg-muted/50">
          <div
            className={`h-full transition-all duration-300 ${
              isQuoteComplete ? "bg-green-400" : "bg-gradient-to-r from-amber-400 to-orange-400"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-2xl sm:text-3xl font-medium tracking-widest text-center leading-relaxed">
          {quote.split("").map((char, i) => {
            let cls = "text-muted-foreground/30";
            if (i < input.length) {
              cls = input[i] === char
                ? "text-primary"
                : "text-red-500 bg-red-50 dark:bg-red-900/30 rounded px-0.5";
            } else if (i === input.length) {
              cls = "text-foreground underline decoration-primary decoration-2 underline-offset-8";
            }
            return (
              <span key={i} className={`${cls} transition-colors duration-150`}>
                {char}
              </span>
            );
          })}
        </div>

        {!isFocused && !isQuoteComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/90 rounded-2xl backdrop-blur-sm">
            <span className="text-sm text-muted-foreground px-4 py-2 rounded-full bg-muted/80">点击此处继续输入</span>
          </div>
        )}
        {isQuoteComplete && (
          <div className="absolute -top-3 right-4 flex items-center gap-1.5 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg shadow-green-500/30">
            <CheckCircle2 className="h-3.5 w-3.5" />
            完美！
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <button
        onClick={handleSkip}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <SkipForward className="h-3.5 w-3.5" />
        跳过本句
      </button>

      <p className="text-xs text-muted-foreground text-center">
        不必追求速度，专注于每一个字的输入，感受文字带来的宁静
      </p>
    </div>
  );
}
