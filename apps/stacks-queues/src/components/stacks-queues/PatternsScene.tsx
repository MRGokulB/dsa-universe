"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Play, RotateCcw } from "lucide-react";

const PARENTHESES_STEPS = [
  { char: "{", action: "push", stack: ["{"], desc: "Opening bracket '{' encountered. Push to stack." },
  { char: "[", action: "push", stack: ["{", "["], desc: "Opening bracket '[' encountered. Push to stack." },
  { char: "]", action: "match", stack: ["{"], desc: "Closing bracket ']' matches top of stack '['. Pop and discard." },
  { char: "}", action: "match", stack: [], desc: "Closing bracket '}' matches top of stack '{'. Pop and discard." },
  { char: "Done", action: "valid", stack: [], desc: "End of string reached and stack is empty. String is valid!" }
];

const BFS_STEPS = [
  { node: "A", queue: ["A"], visited: ["A"], desc: "Enqueue root node A." },
  { node: "B, C", queue: ["B", "C"], visited: ["A"], desc: "Dequeue A. Enqueue children B and C." },
  { node: "D, E", queue: ["C", "D", "E"], visited: ["A", "B"], desc: "Dequeue B. Enqueue children D and E." },
  { node: "F", queue: ["D", "E", "F"], visited: ["A", "B", "C"], desc: "Dequeue C. Enqueue child F." },
  { node: "Done", queue: [], visited: ["A", "B", "C", "D", "E", "F"], desc: "Queue empty. Level-order traversal complete." }
];

export default function PatternsScene() {
  const [activeTab, setActiveTab] = useState<"parentheses" | "bfs">("parentheses");
  const [pIndex, setPIndex] = useState(0);
  const [bIndex, setBIndex] = useState(0);

  const curP = PARENTHESES_STEPS[pIndex];
  const curB = BFS_STEPS[bIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-24 px-4 md:px-12 bg-transparent">
      <div className="max-w-4xl w-full text-center mb-12">
        <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">Chapter 04 &middot; Essential Patterns</span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Algorithmic Problem Solvers</h2>
        <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
          Explore the two most common interview patterns using Stacks and Queues.
        </p>
      </div>

      <div className="flex gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 mb-8">
        <button
          onClick={() => setActiveTab("parentheses")}
          className={`px-5 py-2 rounded-xl text-xs font-mono transition-all ${
            activeTab === "parentheses"
              ? "bg-emerald-500 text-black font-bold shadow-lg"
              : "text-white/60 hover:text-white"
          }`}
        >
          Pattern 1: Valid Parentheses (Stack)
        </button>
        <button
          onClick={() => setActiveTab("bfs")}
          className={`px-5 py-2 rounded-xl text-xs font-mono transition-all ${
            activeTab === "bfs"
              ? "bg-cyan-500 text-black font-bold shadow-lg"
              : "text-white/60 hover:text-white"
          }`}
        >
          Pattern 2: Breadth-First Search (Queue)
        </button>
      </div>

      <div className="w-full max-w-4xl p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
        {activeTab === "parentheses" ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 block mb-1">Input Sequence: &#123; [ ] &#125;</span>
                <h4 className="text-xl font-bold">Step {pIndex + 1} of {PARENTHESES_STEPS.length}</h4>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPIndex(0)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setPIndex((prev) => Math.min(prev + 1, PARENTHESES_STEPS.length - 1))}
                  disabled={pIndex === PARENTHESES_STEPS.length - 1}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 disabled:opacity-40 transition-colors"
                >
                  Next Step <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <p className="text-sm text-white/80 bg-white/5 p-4 rounded-xl border border-white/10 font-mono">
              {curP.desc}
            </p>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-6 bg-white/[0.02] rounded-2xl border border-white/5">
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono text-white/40 mb-3">Runtime Stack (LIFO)</span>
                <div className="w-40 h-48 border-b-4 border-l-2 border-r-2 border-emerald-500/30 rounded-b-xl flex flex-col-reverse p-3 gap-2 bg-black/50">
                  {curP.stack.length === 0 ? (
                    <span className="text-[11px] font-mono text-white/20 text-center m-auto">Empty Stack</span>
                  ) : (
                    curP.stack.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-center font-bold text-sm"
                      >
                        {item}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 block mb-1">Tree Level Traversal</span>
                <h4 className="text-xl font-bold">Step {bIndex + 1} of {BFS_STEPS.length}</h4>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setBIndex(0)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setBIndex((prev) => Math.min(prev + 1, BFS_STEPS.length - 1))}
                  disabled={bIndex === BFS_STEPS.length - 1}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 disabled:opacity-40 transition-colors"
                >
                  Next Step <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <p className="text-sm text-white/80 bg-white/5 p-4 rounded-xl border border-white/10 font-mono">
              {curB.desc}
            </p>

            <div className="flex flex-col gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-cyan-400">Queue State (Front &rarr; Rear):</span>
                <div className="flex gap-2 min-h-[48px] items-center p-2 rounded-xl bg-black/50 border border-white/10">
                  {curB.queue.length === 0 ? (
                    <span className="text-xs font-mono text-white/30">Queue is empty</span>
                  ) : (
                    curB.queue.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-white/40">Visited Order:</span>
                <div className="flex gap-2 items-center text-xs font-mono text-white/80">
                  {curB.visited.join(" &rarr; ")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
