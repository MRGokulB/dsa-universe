"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, RotateCcw, Route, Compass } from "lucide-react";

interface Step {
  current: string;
  distances: Record<string, number | string>;
  visited: string[];
  activeEdge?: string;
  desc: string;
  codeLine: number;
}

const STEPS: Step[] = [
  {
    current: "S",
    distances: { S: 0, A: "∞", B: "∞", C: "∞", D: "∞" },
    visited: [],
    desc: "Initialize distances: dist[S] = 0, all other nodes = ∞. Push S to priority queue.",
    codeLine: 1
  },
  {
    current: "S",
    distances: { S: 0, A: 4, B: 2, C: "∞", D: "∞" },
    visited: ["S"],
    activeEdge: "S-B",
    desc: "Extract S (cost 0). Relax neighbors: dist[A] = min(∞, 0+4) = 4, dist[B] = min(∞, 0+2) = 2. Min unvisited is B.",
    codeLine: 3
  },
  {
    current: "B",
    distances: { S: 0, A: 3, B: 2, C: 7, D: "∞" },
    visited: ["S", "B"],
    activeEdge: "B-A",
    desc: "Extract B (cost 2). Relax B->A: cost 2+1 = 3 < 4 (shorter path found! Updated dist[A]=3). Relax B->C: dist[C] = 7.",
    codeLine: 4
  },
  {
    current: "A",
    distances: { S: 0, A: 3, B: 2, C: 7, D: 6 },
    visited: ["S", "B", "A"],
    activeEdge: "A-D",
    desc: "Extract A (cost 3). Relax A->D: dist[D] = min(∞, 3+3) = 6.",
    codeLine: 4
  },
  {
    current: "D",
    distances: { S: 0, A: 3, B: 2, C: 7, D: 6 },
    visited: ["S", "B", "A", "D"],
    desc: "Extract D (cost 6). Destination reached! Optimal shortest path: S → B → A → D with total cost = 6.",
    codeLine: 5
  }
];

const CODE = [
  "function dijkstra(graph, start) {",
  "  const dist = { [start]: 0 }, pq = new MinPriorityQueue();",
  "  while (!pq.isEmpty()) {",
  "    const { node, cost } = pq.pop();",
  "    for (const [neighbor, weight] of graph[node]) {",
  "      if (cost + weight < dist[neighbor]) {",
  "        dist[neighbor] = cost + weight; pq.push(neighbor, dist[neighbor]);",
  "      }",
  "    }",
  "  }",
  "}"
];

export default function DijkstraScene() {
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
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 03 &middot; Pathfinding Engine
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Dijkstra's Shortest Path
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Greedy relaxation powered by a priority queue guarantees the shortest route on weighted graphs with non-negative edge costs.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col items-center gap-6 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  Graph Relaxation State
                </span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Step {stepIdx + 1} of {STEPS.length}
              </span>
            </div>

            <div className="relative w-full h-64 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 200">
                <line x1="60" y1="100" x2="150" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="60" y1="100" x2="150" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="150" y1="160" x2="150" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="150" y1="40" x2="280" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="150" y1="160" x2="240" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

                <text x="95" y="65" fill="#10b981" fontSize="11" fontFamily="monospace">4</text>
                <text x="95" y="145" fill="#10b981" fontSize="11" fontFamily="monospace">2</text>
                <text x="156" y="105" fill="#10b981" fontSize="11" fontFamily="monospace">1</text>
                <text x="215" y="65" fill="#10b981" fontSize="11" fontFamily="monospace">3</text>
                <text x="195" y="175" fill="#10b981" fontSize="11" fontFamily="monospace">5</text>
              </svg>

              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    curStep.current === "S"
                      ? "border-2 border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110"
                      : "border border-white/20 bg-white/5 text-white/80"
                  }`}
                >
                  S
                </div>
                <span className="text-[10px] font-mono text-emerald-400 mt-1">dist: {curStep.distances.S}</span>
              </div>

              <div className="absolute left-[135px] top-4 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    curStep.current === "A"
                      ? "border-2 border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110"
                      : "border border-white/20 bg-white/5 text-white/80"
                  }`}
                >
                  A
                </div>
                <span className="text-[10px] font-mono text-emerald-400 mt-1">dist: {curStep.distances.A}</span>
              </div>

              <div className="absolute left-[135px] bottom-4 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    curStep.current === "B"
                      ? "border-2 border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110"
                      : "border border-white/20 bg-white/5 text-white/80"
                  }`}
                >
                  B
                </div>
                <span className="text-[10px] font-mono text-emerald-400 mt-1">dist: {curStep.distances.B}</span>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    curStep.current === "D"
                      ? "border-2 border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-115"
                      : "border border-white/20 bg-white/5 text-white/80"
                  }`}
                >
                  D
                </div>
                <span className="text-[10px] font-mono text-cyan-400 mt-1">dist: {curStep.distances.D}</span>
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-4">
              Algorithm Execution
            </span>
            <div className="font-mono text-xs leading-relaxed space-y-1">
              {CODE.map((line, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    curStep.codeLine === idx
                      ? "bg-emerald-500/20 text-emerald-300 font-semibold border-l-2 border-emerald-400"
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
