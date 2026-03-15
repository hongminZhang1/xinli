"use client";

import { useState, useCallback } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const SIZE = 4;
const TOTAL = SIZE * SIZE;

function getAdjacentIndices(index: number): number[] {
  const row = Math.floor(index / SIZE);
  const col = index % SIZE;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(index - SIZE);
  if (row < SIZE - 1) neighbors.push(index + SIZE);
  if (col > 0) neighbors.push(index - 1);
  if (col < SIZE - 1) neighbors.push(index + 1);
  return neighbors;
}

function isSolved(tiles: number[]): boolean {
  for (let i = 0; i < TOTAL - 1; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[TOTAL - 1] === 0;
}

function createPuzzle(): number[] {
  const tiles = Array.from({ length: TOTAL }, (_, i) => (i + 1) % TOTAL);
  let emptyIdx = TOTAL - 1;
  for (let i = 0; i < 200; i++) {
    const neighbors = getAdjacentIndices(emptyIdx);
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    [tiles[emptyIdx], tiles[pick]] = [tiles[pick], tiles[emptyIdx]];
    emptyIdx = pick;
  }
  return tiles;
}

const TILE_COLORS = [
  "from-blue-400 to-blue-500",
  "from-sky-400 to-sky-500",
  "from-cyan-400 to-cyan-500",
  "from-teal-400 to-teal-500",
  "from-emerald-400 to-emerald-500",
  "from-green-400 to-green-500",
  "from-violet-400 to-violet-500",
  "from-purple-400 to-purple-500",
  "from-fuchsia-400 to-fuchsia-500",
  "from-pink-400 to-pink-500",
  "from-rose-400 to-rose-500",
  "from-orange-400 to-orange-500",
  "from-amber-400 to-amber-500",
  "from-indigo-400 to-indigo-500",
  "from-lime-400 to-lime-500",
];

export default function SlidingPuzzle() {
  const [tiles, setTiles] = useState<number[]>(createPuzzle);
  const [moves, setMoves] = useState(0);

  const solved = isSolved(tiles);
  const emptyIdx = tiles.indexOf(0);
  const movableSet = new Set(getAdjacentIndices(emptyIdx));

  const handleClick = useCallback(
    (index: number) => {
      if (solved) return;
      const neighbors = getAdjacentIndices(emptyIdx);
      if (!neighbors.includes(index)) return;

      setTiles((prev) => {
        const next = [...prev];
        [next[emptyIdx], next[index]] = [next[index], next[emptyIdx]];
        return next;
      });
      setMoves((m) => m + 1);
    },
    [emptyIdx, solved]
  );

  const reset = () => {
    setTiles(createPuzzle());
    setMoves(0);
  };

  const correctCount = tiles.filter((t, i) => t !== 0 && t === i + 1).length;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 统计栏 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
          <span className="text-xs text-blue-600 dark:text-blue-400">步数</span>
          <span className="font-bold text-blue-700 dark:text-blue-300 tabular-nums">{moves}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/30">
          <span className="text-xs text-green-600 dark:text-green-400">归位</span>
          <span className="font-bold text-green-700 dark:text-green-300 tabular-nums">{correctCount}/{TOTAL - 1}</span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="w-full max-w-xs">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
            style={{ width: `${(correctCount / (TOTAL - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* 棋盘 */}
      <div className="p-3 rounded-2xl bg-muted/50 dark:bg-muted/30 shadow-inner">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {tiles.map((tile, i) => {
            const isMovable = tile !== 0 && movableSet.has(i);
            const isCorrect = tile !== 0 && tile === i + 1;
            return (
              <button
                key={i}
                onClick={() => handleClick(i)}
                disabled={tile === 0}
                className={`w-[4.2rem] h-[4.2rem] sm:w-[5rem] sm:h-[5rem] rounded-xl text-xl sm:text-2xl font-bold transition-all duration-150 ${
                  tile === 0
                    ? "bg-transparent"
                    : `bg-gradient-to-br ${TILE_COLORS[(tile - 1) % TILE_COLORS.length]} text-white shadow-md dark:shadow-lg ${
                        isMovable
                          ? "hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/30 dark:ring-white/20"
                          : "cursor-default"
                      } ${isCorrect ? "ring-2 ring-green-300/50 dark:ring-green-400/40" : ""}`
                }`}
              >
                {tile || ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* 完成 / 重置 */}
      {solved ? (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="flex items-center gap-2 text-lg font-bold text-primary">
            <Trophy className="h-5 w-5 text-amber-500" />
            恭喜完成！用了 {moves} 步
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/25 transition-all"
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
          重新打乱
        </button>
      )}
    </div>
  );
}
