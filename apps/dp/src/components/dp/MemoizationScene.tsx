"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, RotateCcw, Database, Zap } from "lucide-react";

interface Step {
  call: string;
  memo: Record<number, number>;
  isCacheHit: boolean;
  desc: string;
  codeLine: number;
}

const STEPS: Step[] = [
  {
    call: "fib(5)",
    memo: {},
    isCacheHit: false,
    desc: "Invoke fib(5). Check memo cache: not found. Recurse down to fib(4).",
    codeLine: 1
  },
  {
    call: "fib(4)",
    memo: {},
    isCacheHit: false,
    desc: "Invoke fib(4). Not in memo cache. Recurse to fib(3).",
    codeLine: 1
  },
  {
    call: "fib(3)",
    memo: {},
    isCacheHit: false,
    desc: "Invoke fib(3). Computes fib(2)=1 and fib(1)=1. Returns 2.",
    codeLine: 4
  },
  {
    call: "fib(3) Cache Save",
    memo: { 1: 1, 2: 1, 3: 2 },
    isCacheHit: false,
    desc: "Store result in cache: memo[3] = 2. Now fib(4) finishes with memo[4] = 3.",
    codeLine: 5
  },
  {
    call: "fib(3) Duplicate Call",
    memo: { 1: 1, 2: 1, 3: 2, 4: 3 },
    isCacheHit: true,
    desc: "Right subtree calls fib(3) again! CACHE HIT: memo[3] exists! Return 2 immediately in O(1) without recursion.",
    codeLine: 2
  },
  {
    call: "fib(5) Complete",
    memo: { 1: 1, 2: 1, 3: 2, 4: 3, 5: 5 },
    isCacheHit: false,
    desc: "fib(5) = memo[4] + memo[3] = 3 + 2 = 5. Time complexity pruned from O(2ⁿ) down to linear O(n)!",
    codeLine: 5
  }
];

const CODE = [
  "function fib(n, memo = {}) {",
  "  if (n in memo) return memo[n]; // O(1) Cache Hit",
  "  if (n <= 2) return 1;",
  "  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);",
  "  return memo[n];",
  "}"
];

export default function MemoizationScene() {
  const [stepIdx, setStepIdx] = useState(0);

  const curStep = STEPS[stepIdx];

  const handleNext = () => {
    if (stepIdx < STEPS.length - 1) setStepIdx(stepIdx + 1);
  };

  const handlePrev = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const handleReset = () => {
    setStepIdx(0);
  };

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-purple-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 02 &middot; Top-Down Recursion
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Memoization &amp; Pruning
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Turn exponential $O(2^n)$ call trees into linear $O(n)$ pipelines simply by memoizing function return values.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col items-center gap-6 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  Memo Cache State
                </span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Step {stepIdx + 1} of {STEPS.length}
              </span>
            </div>

            <div className="w-full min-h-[160px] flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/40">Current Evaluation:</span>
                <span
                  className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    curStep.isCacheHit
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                      : "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                  }`}
                >
                  {curStep.call}
                </span>
                {curStep.isCacheHit && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                    <Zap size={10} /> Instant Cache Hit!
                  </span>
                )}
              </div>

              <div className="w-full flex flex-wrap gap-2 items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-white/30 mr-2">memo:</span>
                {Object.keys(curStep.memo).length === 0 ? (
                  <span className="text-xs font-mono text-white/20 italic">Empty cache {}</span>
                ) : (
                  Object.entries(curStep.memo).map(([key, val]) => (
                    <div
                      key={key}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-white/80"
                    >
                      <span className="text-purple-400">n={key}:</span> {val}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-sm text-white/70 min-h-[4rem] flex items-center">
              {curStep.desc}
            </div>

            <div className="w-full flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title="Reset Stepper"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={stepIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={stepIdx === STEPS.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-4">
              Top-Down Recursion Code
            </span>
            <div className="font-mono text-xs leading-relaxed space-y-1">
              {CODE.map((line, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    curStep.codeLine === idx
                      ? "bg-purple-500/20 text-purple-300 font-semibold border-l-2 border-purple-400"
                      : "text-white/40"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
