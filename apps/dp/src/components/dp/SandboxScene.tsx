"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Terminal, Zap, Clock } from "lucide-react";

export default function SandboxScene() {
  const [n, setN] = useState<number>(10);
  const [dpArray, setDpArray] = useState<number[]>([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  const [dpOps, setDpOps] = useState<number>(10);
  const [naiveOps, setNaiveOps] = useState<number>(177);
  const [logs, setLogs] = useState<string[]>([
    "DP Sandbox initialized for N = 10.",
    "Calculated fib(10) = 55 in 10 operations.",
    "Naive recursive fib(10) required 177 recursive calls."
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-7), msg]);
  };

  const calculate = (val: number) => {
    const target = Math.min(Math.max(val, 1), 30);
    setN(target);

    const arr = [0, 1];
    for (let i = 2; i <= target; i++) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
    setDpArray(arr);
    setDpOps(target);

    const approxNaive = Math.round(Math.pow(1.618, target));
    setNaiveOps(approxNaive);

    addLog(`Computed fib(${target}) = ${arr[target]}.`);
    addLog(`Linear DP: ${target} ops. Naive recursion: ~${approxNaive.toLocaleString()} calls.`);
  };

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-purple-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 04 &middot; Interactive Sandbox
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Complexity Showdown
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Witness the collapse of exponential complexity into linear time as N grows from 5 to 30.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col items-center p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/50">Target N:</span>
                {[5, 10, 15, 20, 25, 30].map((v) => (
                  <button
                    key={v}
                    onClick={() => calculate(v)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors ${
                      n === v
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-purple-300 font-bold">
                fib({n}) = {dpArray[n]?.toLocaleString()}
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
                  <Zap size={14} /> DP Memoized (O(N))
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {dpOps.toLocaleString()}
                </div>
                <span className="text-[10px] text-white/40 font-mono mt-1">operations executed</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest mb-1">
                  <Clock size={14} /> Naive Recursive (O(2ᴺ))
                </div>
                <div className="text-2xl font-bold font-mono text-rose-300 mt-1">
                  ~{naiveOps.toLocaleString()}
                </div>
                <span className="text-[10px] text-white/40 font-mono mt-1">function call frames</span>
              </div>
            </div>

            <div className="w-full">
              <span className="text-xs font-mono text-white/40 block mb-3 uppercase tracking-wider">
                Tabulated Memory Vector dp[0..{n}]
              </span>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 rounded-2xl bg-white/[0.02] border border-white/5">
                {dpArray.map((val, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-white/80"
                  >
                    <span className="text-purple-400">[{idx}]:</span> {val.toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full">
            <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest mb-4">
              <Terminal className="w-4 h-4 text-purple-400" />
              Execution Output
            </div>
            <div className="font-mono text-xs text-white/60 space-y-2 flex-1">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-white/5 pb-1">
                  <span className="text-purple-400/80">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
