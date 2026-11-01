"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Layers, ArrowDownRight, Package } from "lucide-react";

const ITEMS = [
  { name: "Item 1", wt: 1, val: 1 },
  { name: "Item 2", wt: 2, val: 4 },
  { name: "Item 3", wt: 3, val: 5 }
];

const CAPACITIES = [0, 1, 2, 3, 4];

const DP_TABLE = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 1, 4, 5, 5],
  [0, 1, 4, 5, 6]
];

export default function TabulationScene() {
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 3, c: 4 });

  const r = selectedCell.r;
  const c = selectedCell.c;
  const currentVal = DP_TABLE[r][c];
  const item = r > 0 ? ITEMS[r - 1] : null;

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-purple-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 03 &middot; Bottom-Up Tabulation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            0/1 Knapsack Grid
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            No recursion, zero call-stack overhead. Systematically build solutions to larger subproblems from base cases up.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  dp[i][w] Table (Knapsack W = 4)
                </span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Click any cell
              </span>
            </div>

            <div className="w-full overflow-x-auto p-2">
              <div className="grid grid-cols-6 gap-2 font-mono text-xs text-center min-w-[340px]">
                <div className="w-12 h-10 flex items-center justify-center text-white/30 font-bold">Item \ W</div>
                {CAPACITIES.map((cap) => (
                  <div key={cap} className="w-12 h-10 flex items-center justify-center text-purple-400 font-bold">
                    w={cap}
                  </div>
                ))}

                {DP_TABLE.map((row, rowIdx) => (
                  <div key={rowIdx} className="contents">
                    <div className="w-12 h-10 flex items-center justify-center text-white/50 font-bold text-[10px]">
                      {rowIdx === 0 ? "None" : `i=${rowIdx}`}
                    </div>
                    {row.map((val, colIdx) => {
                      const isSelected = selectedCell.r === rowIdx && selectedCell.c === colIdx;
                      return (
                        <div
                          key={colIdx}
                          onClick={() => setSelectedCell({ r: rowIdx, c: colIdx })}
                          className={`w-12 h-10 rounded-xl border flex items-center justify-center font-bold cursor-pointer transition-all ${
                            isSelected
                              ? "bg-purple-500/30 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                              : val > 0
                              ? "bg-white/5 border-white/10 text-white/80 hover:border-white/30"
                              : "bg-white/[0.02] border-white/5 text-white/20 hover:border-white/20"
                          }`}
                        >
                          {val}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-4">
              Recurrence State Breakdown
            </span>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-white/40 block mb-1">Inspecting Cell:</span>
                <span className="text-purple-300 font-bold text-sm">
                  dp[{r}][{c}] = {currentVal}
                </span>
                {item && (
                  <span className="text-white/60 block mt-1">
                    Considering {item.name}: weight = {item.wt}, value = {item.val}
                  </span>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-white/80 font-bold mb-2">The Bellman Equation:</div>
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[11px] leading-relaxed">
                  dp[i][w] = Math.max(
                  <br />
                  &nbsp;&nbsp;dp[i - 1][w], // Exclude
                  <br />
                  &nbsp;&nbsp;val[i] + dp[i - 1][w - wt[i]] // Include
                  <br />
                  )
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-sans text-xs text-white/60 leading-relaxed">
                Bottom-up tabular execution eliminates recursion call stack frames, giving rock-solid $O(N \cdot W)$ time and space with zero risk of stack overflow errors.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
