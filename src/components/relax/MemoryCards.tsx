"use client";

import { useState, useCallback, useEffect } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const EMOJIS = ["🌸", "🌊", "🌿", "🦋", "🌙", "☁️", "🌈", "🍃"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createCards(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  return shuffle(pairs).map((emoji, i) => ({
    id: i,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
}

export default function MemoryCards() {
  const [cards, setCards] = useState<Card[]>(createCards);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const matchedCount = cards.filter((c) => c.isMatched).length;
  const isComplete = matchedCount === cards.length;

  const handleClick = useCallback(
    (index: number) => {
      if (isChecking) return;
      const card = cards[index];
      if (card.isFlipped || card.isMatched) return;
      if (selected.length >= 2) return;

      const newCards = [...cards];
      newCards[index] = { ...newCards[index], isFlipped: true };
      setCards(newCards);

      const newSelected = [...selected, index];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setMoves((m) => m + 1);
        setIsChecking(true);
      }
    },
    [cards, selected, isChecking]
  );

  useEffect(() => {
    if (selected.length !== 2 || !isChecking) return;

    const [a, b] = selected;
    const timer = setTimeout(() => {
      setCards((prev) => {
        const next = [...prev];
        if (prev[a].emoji === prev[b].emoji) {
          next[a] = { ...next[a], isMatched: true };
          next[b] = { ...next[b], isMatched: true };
        } else {
          next[a] = { ...next[a], isFlipped: false };
          next[b] = { ...next[b], isFlipped: false };
        }
        return next;
      });
      setSelected([]);
      setIsChecking(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [selected, isChecking]);

  const reset = () => {
    setCards(createCards());
    setSelected([]);
    setMoves(0);
    setIsChecking(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 统计栏 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-900/30">
          <span className="text-xs text-violet-600 dark:text-violet-400">步数</span>
          <span className="font-bold text-violet-700 dark:text-violet-300 tabular-nums">{moves}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/30">
          <span className="text-xs text-green-600 dark:text-green-400">配对</span>
          <span className="font-bold text-green-700 dark:text-green-300 tabular-nums">{matchedCount / 2}/{EMOJIS.length}</span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="w-full max-w-xs">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-500"
            style={{ width: `${(matchedCount / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 卡片网格 */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-fit mx-auto">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => handleClick(i)}
            className="relative w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem]"
            style={{ perspective: 600 }}
            disabled={card.isMatched}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* 背面 */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-300/80 to-purple-400/80 dark:from-violet-500/60 dark:to-purple-600/60 flex items-center justify-center shadow-md ${
                  card.isMatched ? "opacity-0" : "hover:shadow-lg hover:scale-[1.03] active:scale-95"
                } transition-all cursor-pointer`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-white/90 text-xl font-bold">?</span>
              </div>
              {/* 正面 */}
              <div
                className={`absolute inset-0 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                  card.isMatched
                    ? "bg-green-50 dark:bg-green-950/40 border-2 border-green-300 dark:border-green-700 shadow-green-500/15 dark:shadow-green-500/10"
                    : "bg-white dark:bg-gray-800/90 border-2 border-violet-200 dark:border-violet-700/60 shadow-violet-500/10 dark:shadow-violet-500/5"
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-3xl sm:text-4xl">{card.emoji}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 完成 / 重置 */}
      {isComplete ? (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="flex items-center gap-2 text-lg font-bold text-primary">
            <Trophy className="h-5 w-5 text-amber-500" />
            恭喜完成！用了 {moves} 步
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white font-medium shadow-lg shadow-violet-500/25 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            再来一局
          </button>
        </div>
      ) : (
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          重新开始
        </button>
      )}
    </div>
  );
}
