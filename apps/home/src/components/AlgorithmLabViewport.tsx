"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  ArrowUpRight,
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  CheckCircle2,
  Terminal,
  Activity
} from "lucide-react";

export interface AlgorithmModuleMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  complexity: string;
  spaceComplexity: string;
  memory: string;
  hardwareLocality: string;
  invariant: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    category: "Linear Memory",
    tagline: "Sequential 64-bit cache lines and two-pointer binary convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    complexity: "Access O(1) · Search O(log N)",
    spaceComplexity: "O(1) Auxiliary",
    memory: "Contiguous 64-Byte Cache Lines",
    hardwareLocality: "100% L1 Data Cache Hit Rate",
    invariant: "Indexed address offset: Addr(i) = Base + (i * sizeof(Type))"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    category: "Heap Pointers",
    tagline: "Dispersed heap nodes and Floyd cycle isolation algorithm",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    complexity: "Insert O(1) · Traversal O(N)",
    spaceComplexity: "O(N) Pointer Overhead",
    memory: "Heap Allocated Pointer Chain",
    hardwareLocality: "Pointer Chasing / Frequent Cache Misses",
    invariant: "Node.next strictly references valid memory address or NULL"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    category: "Execution Registers",
    tagline: "LIFO activation records and circular ring queue buffers",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    complexity: "Push O(1) · Pop O(1)",
    spaceComplexity: "O(K) Frame Depth",
    memory: "RSP Stack Register & Circular Ring Buffer",
    hardwareLocality: "Hot Stack Top cached in CPU L1/Registers",
    invariant: "LIFO: Last In First Out · Activation frame boundaries enforced"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive logarithmic pathfinding",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    complexity: "Search O(log N) · Insert O(log N)",
    spaceComplexity: "O(H) Recursion Stack",
    memory: "Recursive 3-Word Node (Left, Key, Right)",
    hardwareLocality: "Branch Predictor Dependent Path Selection",
    invariant: "All keys in Left Subtree < Node < All keys in Right Subtree"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    category: "Topological",
    tagline: "Adjacency matrix traversal and min-heap shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    complexity: "Dijkstra O((V + E) log V)",
    spaceComplexity: "O(V + E) Adjacency Storage",
    memory: "Sparse Matrix & Priority Min-Heap",
    hardwareLocality: "Non-contiguous dynamic edge traversals",
    invariant: "Greedy choice property: Shortest known edge relaxation is optimal"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    category: "State Matrix",
    tagline: "DAG state lattices and 1D rolling tabulation memoization",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    complexity: "Pseudo-polynomial O(N * W)",
    spaceComplexity: "O(W) Rolling State Buffer",
    memory: "Contiguous DP Memoization Cache Table",
    hardwareLocality: "Optimal Spatial & Temporal Cache Locality",
    invariant: "Optimal Substructure: Global optimum composed of sub-optima"
  }
];

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function AlgorithmLabViewport({ activeId, onSelectModule }: Props) {
  const activeModule = MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];

  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Reset step whenever active module changes
  useEffect(() => {
    setStep(0);
    setIsPlaying(false);
  }, [activeId]);

  // Step auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 1400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full rounded-[28px] bg-white border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
      {/* Viewport Header Bar */}
      <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#fafafb]/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: activeModule.accent }}
            />
            <span className="font-mono text-xs font-semibold text-[#0f172a] uppercase tracking-wider">
              {activeModule.category} WORKBENCH
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#71717a] border-l border-black/[0.08] pl-3 hidden sm:inline">
            SYSTEM {activeModule.index} / 06
          </span>
        </div>

        {/* Live Step Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStep((prev) => (prev > 0 ? prev - 1 : 4))}
            className="p-1.5 rounded-lg border border-black/[0.08] bg-white text-[#18181b] hover:bg-black hover:text-white transition-colors cursor-pointer text-xs"
            title="Previous Step"
            aria-label="Previous Step"
          >
            ◄
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0f172a] text-white hover:bg-black transition-colors cursor-pointer text-xs font-mono font-medium shadow-xs"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "Pause" : "Run Cycle"}</span>
          </button>

          <button
            onClick={() => setStep((prev) => (prev + 1) % 5)}
            className="p-1.5 rounded-lg border border-black/[0.08] bg-white text-[#18181b] hover:bg-black hover:text-white transition-colors cursor-pointer text-xs"
            title="Next Step"
            aria-label="Next Step"
          >
            ►
          </button>

          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg border border-black/[0.08] bg-white text-[#71717a] hover:text-black transition-colors cursor-pointer ml-1"
            title="Reset"
            aria-label="Reset simulation"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="p-6 sm:p-8 min-h-[340px] flex flex-col justify-center relative bg-gradient-to-b from-white via-[#fafafb] to-white">
        {activeId === "arrays" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Contiguous Physical Memory Bus (64-byte Cache Line)</span>
              <span className="font-semibold text-blue-600">
                Binary Search: Target = 58
              </span>
            </div>

            {/* Array Cells */}
            <div className="grid grid-cols-8 gap-2 sm:gap-3">
              {[
                { val: 12, addr: "0x00" },
                { val: 24, addr: "0x08" },
                { val: 35, addr: "0x10" },
                { val: 42, addr: "0x18" },
                { val: 58, addr: "0x20" },
                { val: 67, addr: "0x28" },
                { val: 81, addr: "0x30" },
                { val: 95, addr: "0x38" }
              ].map((cell, idx) => {
                const low = step === 0 ? 0 : step === 1 ? 4 : step >= 2 ? 4 : 0;
                const high = step === 0 ? 7 : step === 1 ? 7 : step >= 2 ? 5 : 7;
                const mid = step === 0 ? 3 : step === 1 ? 5 : step >= 2 ? 4 : 3;

                const isMid = idx === mid;
                const isTarget = idx === 4 && step >= 2;
                const inRange = idx >= low && idx <= high;

                return (
                  <div key={cell.addr} className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-[#71717a] mb-1">
                      {cell.addr}
                    </span>
                    <div
                      className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center font-clash font-bold text-base sm:text-lg transition-all duration-300 border ${
                        isTarget
                          ? "bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md"
                          : isMid
                          ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                          : inRange
                          ? "bg-white text-[#0f172a] border-black/[0.15] shadow-xs"
                          : "bg-slate-100 text-slate-400 border-black/[0.04] opacity-50"
                      }`}
                    >
                      {cell.val}
                    </div>
                    <span className="text-[10px] font-mono mt-1 font-semibold text-[#0f172a]">
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Pointer Calipers Status */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                  Step {step + 1}/5
                </span>
                <span className="text-[#18181b]">
                  {step === 0 && "Initial Range: Low=0, High=7. Probing Mid=3 (Value 42 < 58). Moving Low to Mid+1."}
                  {step === 1 && "Narrowed Range: Low=4, High=7. Probing Mid=5 (Value 67 > 58). Moving High to Mid-1."}
                  {step >= 2 && "Exact Match Found: Mid=4 (Value 58 == Target). Terminating in O(log N) operations!"}
                </span>
              </div>
              <span className="text-emerald-600 font-bold shrink-0">
                L1 Cache Hit: 100%
              </span>
            </div>
          </div>
        )}

        {activeId === "linked-lists" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Heap-Dispersed Nodes & Pointer Reference Vectors</span>
              <span className="font-semibold text-purple-600">Floyd Cycle Isolation</span>
            </div>

            {/* Linked Nodes Row */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
              {[
                { id: "A", val: "Node(10)", addr: "0x7F01", next: "0x8A14" },
                { id: "B", val: "Node(25)", addr: "0x8A14", next: "0x4C90" },
                { id: "C", val: "Node(40)", addr: "0x4C90", next: "0x9D20" },
                { id: "D", val: "Node(65)", addr: "0x9D20", next: "0x8A14" }
              ].map((node, idx) => {
                const isSlow = step % 4 === idx;
                const isFast = (step * 2) % 4 === idx;

                return (
                  <div key={node.id} className="flex items-center gap-2 shrink-0">
                    <div
                      className={`p-4 rounded-2xl border transition-all duration-300 min-w-[125px] ${
                        isFast && isSlow && step > 0
                          ? "bg-rose-50 border-rose-400 shadow-sm"
                          : isFast
                          ? "bg-purple-50 border-purple-400 shadow-sm"
                          : isSlow
                          ? "bg-blue-50 border-blue-400 shadow-sm"
                          : "bg-white border-black/[0.08]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#71717a]">{node.addr}</span>
                        <div className="flex gap-1">
                          {isSlow && (
                            <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[9px] font-mono font-bold">
                              SLOW
                            </span>
                          )}
                          {isFast && (
                            <span className="px-1.5 py-0.2 rounded bg-purple-600 text-white text-[9px] font-mono font-bold">
                              FAST
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-clash font-bold text-sm block text-[#0f172a]">{node.val}</span>
                      <span className="text-[10px] font-mono text-purple-600 block mt-1">
                        ptr -&gt; {node.next}
                      </span>
                    </div>

                    {idx < 3 && (
                      <div className="text-black/30 font-mono text-lg font-bold px-1">
                        -&gt;
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>
                Tortoise & Hare Cycle Test: Fast runner traverses 2x node hops per cycle. Collision detected at Node(25).
              </span>
              <span className="font-bold text-purple-600">Cycle Trapped in O(N)</span>
            </div>
          </div>
        )}

        {activeId === "stacks-queues" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>CPU Execution Frame Stack &amp; RSP Register</span>
              <span className="font-semibold text-emerald-600">LIFO Order Principle</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Stack Frame Silo */}
              <div className="sm:col-span-2 border-2 border-dashed border-black/[0.12] rounded-2xl p-3 flex flex-col-reverse gap-2 bg-slate-50/50 min-h-[170px] justify-start">
                {[
                  { name: "main()", addr: "0x7FFF00", depth: "0" },
                  { name: "parsePayload()", addr: "0x7FFF20", depth: "1" },
                  { name: "executeTransaction()", addr: "0x7FFF40", depth: "2" },
                  { name: "validateSignature()", addr: "0x7FFF60", depth: "3" }
                ]
                  .slice(0, (step % 4) + 1)
                  .map((frame, idx, arr) => {
                    const isTop = idx === arr.length - 1;
                    return (
                      <div
                        key={frame.name}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                          isTop
                            ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                            : "bg-white text-[#0f172a] border-black/[0.08]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono opacity-80">RSP+{idx * 32}</span>
                          <span className="font-clash font-semibold text-xs">{frame.name}</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                          {isTop ? "ACTIVE TOP [RSP]" : "SAVED FRAME"}
                        </span>
                      </div>
                    );
                  })}
              </div>

              {/* Stack Telemetry */}
              <div className="space-y-3 p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase block">Stack Pointer</span>
                  <span className="font-mono text-xs font-bold text-emerald-600">RSP = 0x7FFF{(step % 4) * 20}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase block">Frame Depth</span>
                  <span className="font-mono text-xs font-bold text-[#0f172a]">{(step % 4) + 1} Activation Records</span>
                </div>
                <div className="pt-2 border-t border-black/[0.06]">
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold block">Push/Pop: O(1) Constant</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeId === "trees" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Binary Search Tree Invariants &amp; Logarithmic Path</span>
              <span className="font-semibold text-amber-600">Query: Find Key 65</span>
            </div>

            {/* Tree Diagram SVG */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="flex flex-col items-center gap-4 w-full max-w-md">
                {/* Level 0: Root 50 */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-clash font-bold text-sm border transition-all duration-300 ${
                    step === 0
                      ? "bg-amber-500 text-white border-amber-600 shadow-md scale-110"
                      : "bg-white text-[#0f172a] border-black/[0.12]"
                  }`}
                >
                  50
                </div>

                {/* Level 1: Left 30, Right 70 */}
                <div className="flex items-center justify-between w-full px-12">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center font-clash font-bold text-xs bg-slate-100 text-slate-400 border border-black/[0.06]">
                    30
                  </div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-clash font-bold text-xs border transition-all duration-300 ${
                      step === 1
                        ? "bg-amber-500 text-white border-amber-600 shadow-md scale-110"
                        : "bg-white text-[#0f172a] border-black/[0.12]"
                    }`}
                  >
                    70
                  </div>
                </div>

                {/* Level 2: Left 65, Right 85 */}
                <div className="flex items-center justify-end w-full pr-4 gap-8">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-clash font-bold text-xs border transition-all duration-300 ${
                      step >= 2
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md scale-110"
                        : "bg-white text-[#0f172a] border-black/[0.12]"
                    }`}
                  >
                    65
                  </div>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center font-clash font-bold text-xs bg-slate-100 text-slate-400 border border-black/[0.06]">
                    85
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>
                {step === 0 && "Root 50: Target 65 > 50. Discarding left subtree (30). Branching Right."}
                {step === 1 && "Node 70: Target 65 < 70. Discarding right subtree (85). Branching Left."}
                {step >= 2 && "Node 65: Match found at depth 2! Logarithmic traversal complete in O(log N)."}
              </span>
              <span className="font-bold text-amber-600">Depth: {Math.min(step + 1, 3)} hops</span>
            </div>
          </div>
        )}

        {activeId === "graphs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Topological Graph &amp; Dijkstra Min-Heap Relaxation</span>
              <span className="font-semibold text-rose-600">Shortest Path: A -&gt; E</span>
            </div>

            {/* Graph Node Constellation */}
            <div className="flex items-center justify-between py-2 max-w-lg mx-auto">
              {[
                { name: "A", dist: "0" },
                { name: "B", dist: step >= 1 ? "4" : "inf" },
                { name: "C", dist: step >= 1 ? "2" : "inf" },
                { name: "D", dist: step >= 2 ? "3" : "inf" },
                { name: "E", dist: step >= 3 ? "6" : "inf" }
              ].map((node, idx) => {
                const isFinal = idx === 4 && step >= 3;
                const isRelaxed = step >= idx;

                return (
                  <div key={node.name} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-clash font-bold text-sm border transition-all duration-300 ${
                        isFinal
                          ? "bg-emerald-500 text-white border-emerald-600 shadow-md scale-110"
                          : isRelaxed
                          ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                          : "bg-white text-[#0f172a] border-black/[0.12]"
                      }`}
                    >
                      <span>{node.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#0f172a] mt-1">
                      d={node.dist}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>
                Min-Heap Priority Queue: Relaxing edges (A,C, weight 2), then (C,D, weight 1). Optimal path A-&gt;C-&gt;D-&gt;E.
              </span>
              <span className="font-bold text-rose-600">Cost: 6 units</span>
            </div>
          </div>
        )}

        {activeId === "dp" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Dynamic Programming 2D State Tabulation Matrix</span>
              <span className="font-semibold text-indigo-600">Optimal Substructure</span>
            </div>

            {/* DP Matrix Table */}
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto text-center font-mono text-xs">
              {["dp[i][w]", "w=0", "w=1", "w=2", "w=3"].map((h) => (
                <div key={h} className="font-bold text-[#71717a] p-1">
                  {h}
                </div>
              ))}
              {[
                { label: "Item 1", vals: [0, 6, 6, 6] },
                { label: "Item 2", vals: [0, 6, 10, 16] },
                { label: "Item 3", vals: [0, 6, 10, 18] }
              ].map((row, rIdx) => (
                <div key={row.label} className="contents">
                  <div className="font-semibold text-[#0f172a] p-2 bg-slate-50 rounded-lg">{row.label}</div>
                  {row.vals.map((v, cIdx) => {
                    const isOptimal = rIdx === 2 && cIdx === 3 && step >= 2;
                    const isActive = rIdx <= step && cIdx <= step + 1;

                    return (
                      <div
                        key={cIdx}
                        className={`p-2 rounded-lg border font-bold transition-all duration-300 ${
                          isOptimal
                            ? "bg-emerald-500 text-white border-emerald-600 shadow-sm scale-105"
                            : isActive
                            ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                            : "bg-white border-black/[0.06] text-slate-400"
                        }`}
                      >
                        {v}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono flex items-center justify-between">
              <span>
                Recurrence: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]]). Sub-problem results cached.
              </span>
              <span className="font-bold text-indigo-600">Max Value: 18</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technical Telemetry Dock */}
      <div className="px-6 py-4 bg-[#fafafb] border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-[10px] text-[#71717a] uppercase block mb-0.5">Time Complexity</span>
          <span className="font-bold text-[#0f172a]">{activeModule.complexity}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#71717a] uppercase block mb-0.5">Space Complexity</span>
          <span className="font-bold text-[#0f172a]">{activeModule.spaceComplexity}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#71717a] uppercase block mb-0.5">Hardware Locality</span>
          <span className="font-bold text-[#0f172a]">{activeModule.hardwareLocality}</span>
        </div>
        <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-start sm:items-end">
          <a
            href={activeModule.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-white hover:bg-zinc-800 transition-colors text-xs font-clash font-semibold shadow-xs"
          >
            <span>Launch Deep-Dive App</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
