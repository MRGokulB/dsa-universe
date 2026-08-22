"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TP_ARRAY = [2, 7, 11, 15, 19, 23, 28];
const TP_TARGET = 26;

function generateTwoPointerSteps() {
  const steps = [];
  let l = 0;
  let r = TP_ARRAY.length - 1;

  steps.push({
    left: l,
    right: r,
    sum: TP_ARRAY[l] + TP_ARRAY[r],
    action: "init",
    narration: `We need two numbers that add up to ${TP_TARGET}. Place LEFT at the start (index 0) and RIGHT at the end (index ${r}).`,
    codeLine: 0
  });

  while (l < r) {
    const sum = TP_ARRAY[l] + TP_ARRAY[r];
    if (sum === TP_TARGET) {
      steps.push({
        left: l,
        right: r,
        sum,
        action: "found",
        narration: `${TP_ARRAY[l]} + ${TP_ARRAY[r]} = ${sum}. That equals our target ${TP_TARGET}! Found the pair.`,
        codeLine: 3
      });
      break;
    } else if (sum < TP_TARGET) {
      steps.push({
        left: l,
        right: r,
        sum,
        action: "too_small",
        narration: `${TP_ARRAY[l]} + ${TP_ARRAY[r]} = ${sum}. That's less than ${TP_TARGET}, so we need a bigger number. Move LEFT one step right.`,
        codeLine: 4
      });
      l++;
    } else {
      steps.push({
        left: l,
        right: r,
        sum,
        action: "too_big",
        narration: `${TP_ARRAY[l]} + ${TP_ARRAY[r]} = ${sum}. That's more than ${TP_TARGET}, so we need a smaller number. Move RIGHT one step left.`,
        codeLine: 5
      });
      r--;
    }
  }
  return steps;
}

const SW_ARRAY = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0];
const SW_K = 3;

function generateSlidingWindowSteps() {
  const steps = [];
  let maxSum = -Infinity;
  let currentSum = 0;

  for (let i = 0; i < SW_K; i++) {
    currentSum += SW_ARRAY[i];
  }
  maxSum = currentSum;
  steps.push({
    windowStart: 0,
    windowEnd: SW_K - 1,
    currentSum,
    maxSum,
    narration: `Build initial window of size ${SW_K}: [${SW_ARRAY.slice(0, SW_K).join(" + ")}] = ${currentSum}. This is our starting max.`,
    codeLine: 1
  });

  for (let i = SW_K; i < SW_ARRAY.length; i++) {
    const removed = SW_ARRAY[i - SW_K];
    const added = SW_ARRAY[i];
    currentSum = currentSum - removed + added;
    const windowStart = i - SW_K + 1;
    const isNewMax = currentSum > maxSum;
    if (isNewMax) {
      maxSum = currentSum;
    }
    steps.push({
      windowStart,
      windowEnd: i,
      currentSum,
      maxSum,
      narration: `Slide right: remove ${removed}, add ${added}. Window [${SW_ARRAY.slice(windowStart, i + 1).join(" + ")}] = ${currentSum}. ${isNewMax ? `New max! ${maxSum}` : `Max stays ${maxSum}.`}`,
      codeLine: 3
    });
  }
  return steps;
}

const TP_STEPS = generateTwoPointerSteps();
const SW_STEPS = generateSlidingWindowSteps();

const TP_CODE = [
  { text: "let left = 0, right = arr.length - 1;", indent: 0 },
  { text: "while (left < right) {", indent: 0 },
  { text: "  const sum = arr[left] + arr[right];", indent: 1 },
  { text: "  if (sum === target) return [left, right];", indent: 1 },
  { text: "  else if (sum < target) left++;", indent: 1 },
  { text: "  else right--;", indent: 1 },
  { text: "}", indent: 0 },
];

const SW_CODE = [
  { text: "let sum = 0;", indent: 0 },
  { text: "for (let i = 0; i < k; i++) sum += arr[i];", indent: 0 },
  { text: "let maxSum = sum;", indent: 0 },
  { text: "for (let i = k; i < arr.length; i++) {", indent: 0 },
  { text: "  sum = sum - arr[i - k] + arr[i];", indent: 1 },
  { text: "  maxSum = Math.max(maxSum, sum);", indent: 1 },
  { text: "}", indent: 0 },
];

export function PatternsScene() {
  const [mode, setMode] = useState<"twopointers" | "slidingwindow">("twopointers");
  const [stepIdx, setStepIdx] = useState(0);

  const steps = mode === "twopointers" ? TP_STEPS : SW_STEPS;
  const code = mode === "twopointers" ? TP_CODE : SW_CODE;
  const arr = mode === "twopointers" ? TP_ARRAY : SW_ARRAY;
  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  const switchMode = (m: "twopointers" | "slidingwindow") => {
    setMode(m);
    setStepIdx(0);
  };

  const getCellState = (i: number) => {
    if (mode === "twopointers") {
      const s = step as (typeof TP_STEPS)[0];
      if (s.action === "found" && (i === s.left || i === s.right)) return "found";
      if (i === s.left) return "left";
      if (i === s.right) return "right";
      if (i > s.left && i < s.right) return "between";
      return "outside";
    } else {
      const s = step as (typeof SW_STEPS)[0];
      if (i >= s.windowStart && i <= s.windowEnd) return "inWindow";
      return "outside";
    }
  };

  const cellColor: Record<string, string> = {
    left: "border-blue-400 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    right: "border-pink-400 bg-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.4)]",
    found: "border-green-400 bg-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.5)]",
    between: "border-white/20 bg-white/5",
    outside: "border-white/5 bg-white/[0.02] opacity-40",
    inWindow: "border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-16 px-4 bg-transparent relative">

      <div className="max-w-5xl w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Algorithmic Patterns</h2>
            <p className="text-white/50">Click through each iteration to see exactly what the algorithm does.</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => switchMode("twopointers")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${mode === "twopointers" ? "bg-blue-500 text-white" : "text-white/40 hover:text-white"}`}
            >
              Two Pointers
            </button>
            <button
              onClick={() => switchMode("slidingwindow")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${mode === "slidingwindow" ? "bg-purple-500 text-white" : "text-white/40 hover:text-white"}`}
            >
              Sliding Window
            </button>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-5">
          {mode === "twopointers" ? (
            <p className="text-white/80"><span className="text-blue-400 font-bold">Problem:</span> Find two numbers in the sorted array [{TP_ARRAY.join(", ")}] that add up to <span className="text-yellow-400 font-bold">{TP_TARGET}</span>.</p>
          ) : (
            <p className="text-white/80"><span className="text-purple-400 font-bold">Problem:</span> Find the maximum sum of any <span className="text-yellow-400 font-bold">{SW_K}</span> consecutive elements in [{SW_ARRAY.join(", ")}].</p>
          )}
        </div>

        {/* Main Content: Code + Visual side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

          {/* Code Panel - 5 cols */}
          <div className="lg:col-span-5 bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              </div>
              <span className="font-mono text-xs text-white/40">{mode === "twopointers" ? "two-pointers.ts" : "sliding-window.ts"}</span>
              <div className="w-12" /> {/* Spacer */}
            </div>
            <div className="font-mono text-[13px] md:text-sm leading-8 relative p-4 overflow-x-auto">
              {code.map((line, i) => (
                <div
                  key={i}
                  className={`px-3 rounded transition-all duration-300 relative whitespace-nowrap ${step.codeLine === i
                    ? "text-white bg-white/5"
                    : "text-white/40"
                    }`}
                  style={{ paddingLeft: `${line.indent * 1.5 + 1}rem` }}
                >
                  {step.codeLine === i && (
                    <motion.div 
                      layoutId="code-highlight"
                      className={`absolute left-0 top-0 bottom-0 w-1 ${mode === "twopointers" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"}`}
                    />
                  )}
                  {line.text}
                </div>
              ))}
            </div>
          </div>

          {/* Visual Panel - 7 cols */}
          <div className="lg:col-span-7 relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
            
            {/* Background glowing orb */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-700 ${mode === "twopointers" ? "bg-blue-500" : "bg-purple-500"}`} />

            {/* Array visualization */}
            <div className="flex gap-2 md:gap-4 flex-wrap justify-center mb-16 relative z-10 w-full">
              {arr.map((val, i) => {
                const state = getCellState(i);
                return (
                  <motion.div
                    key={`${mode}-${i}`}
                    layout
                    className={`relative w-12 h-14 md:w-16 md:h-20 rounded-xl border flex flex-col items-center justify-center transition-all duration-500 ${cellColor[state]} backdrop-blur-md`}
                  >
                    <span className="text-[9px] md:text-[10px] text-white/40 absolute top-1.5 left-1.5 md:left-2 font-mono">{i}</span>
                    <span className="font-mono font-bold text-base md:text-xl text-white shadow-black drop-shadow-md">{val}</span>
                    
                    {/* Pointer Labels */}
                    {mode === "twopointers" && i === (step as (typeof TP_STEPS)[0]).left && (
                      <motion.div
                        layoutId="ptr-left"
                        className="absolute -bottom-10 flex flex-col items-center pointer-events-none"
                      >
                        <div className="w-0.5 h-3 bg-blue-400 mb-1" />
                        <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-[0_0_15px_rgba(59,130,246,0.6)]">LEFT</div>
                      </motion.div>
                    )}
                    {mode === "twopointers" && i === (step as (typeof TP_STEPS)[0]).right && (
                      <motion.div
                        layoutId="ptr-right"
                        className="absolute -bottom-10 flex flex-col items-center pointer-events-none"
                      >
                        <div className="w-0.5 h-3 bg-pink-400 mb-1" />
                        <div className="bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-[0_0_15px_rgba(236,72,153,0.6)]">RIGHT</div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Sliding window bracket */}
            {mode === "slidingwindow" && (
              <div className="text-sm font-mono text-purple-300 mb-4">
                Window: [{SW_ARRAY.slice((step as (typeof SW_STEPS)[0]).windowStart, (step as (typeof SW_STEPS)[0]).windowEnd + 1).join(", ")}]
              </div>
            )}

            {/* Computation Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                {mode === "twopointers" && (
                  <div className="flex items-center gap-3 justify-center text-2xl font-mono mb-2">
                    <span className="text-blue-400">{TP_ARRAY[(step as (typeof TP_STEPS)[0]).left]}</span>
                    <span className="text-white/30">+</span>
                    <span className="text-pink-400">{TP_ARRAY[(step as (typeof TP_STEPS)[0]).right]}</span>
                    <span className="text-white/30">=</span>
                    <span className={`font-bold ${(step as (typeof TP_STEPS)[0]).action === "found" ? "text-green-400" : (step as (typeof TP_STEPS)[0]).action === "too_small" ? "text-orange-400" : "text-red-400"}`}>
                      {(step as (typeof TP_STEPS)[0]).sum}
                    </span>
                    <span className="text-white/20 text-lg ml-2">
                      {(step as (typeof TP_STEPS)[0]).action === "found" ? `= ${TP_TARGET} ✓` : (step as (typeof TP_STEPS)[0]).action === "too_small" ? `< ${TP_TARGET}` : `> ${TP_TARGET}`}
                    </span>
                  </div>
                )}
                {mode === "slidingwindow" && (
                  <div className="flex items-center gap-4 justify-center text-lg font-mono mb-2">
                    <span>Sum: <span className="text-purple-400 font-bold">{(step as (typeof SW_STEPS)[0]).currentSum}</span></span>
                    <span className="text-white/20">|</span>
                    <span>Max: <span className="text-green-400 font-bold">{(step as (typeof SW_STEPS)[0]).maxSum}</span></span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Narration Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${stepIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mb-8 p-5 rounded-xl border ${mode === "twopointers"
              ? "bg-blue-500/5 border-blue-500/20"
              : "bg-purple-500/5 border-purple-500/20"
              }`}
          >
            <div className="flex items-start gap-3">
              <span className={`text-xs font-bold px-2 py-1 rounded mt-0.5 ${mode === "twopointers" ? "bg-blue-500/20 text-blue-300" : "bg-purple-500/20 text-purple-300"}`}>
                Step {stepIdx + 1}/{steps.length}
              </span>
              <p className="text-white/80 leading-relaxed">{step.narration}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={stepIdx === 0}
            onClick={() => setStepIdx(s => s - 1)}
            className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all font-medium"
          >
            ← Previous
          </button>
          <button
            onClick={() => setStepIdx(0)}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            Reset
          </button>
          <button
            disabled={isLast}
            onClick={() => setStepIdx(s => s + 1)}
            className={`px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-20 disabled:cursor-not-allowed ${mode === "twopointers"
              ? "bg-blue-500 hover:bg-blue-400 text-white"
              : "bg-purple-500 hover:bg-purple-400 text-white"
              }`}
          >
            Next Step →
          </button>
        </div>

      </div>
    </div>
  );
}
