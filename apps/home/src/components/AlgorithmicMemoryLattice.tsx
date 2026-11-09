"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu
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
  memory: string;
  addressSpace: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    category: "Linear",
    tagline: "Sequential cache lines and two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous 64-bit Buffer",
    addressSpace: "0x7FFE4A10 - 0x7FFE4A38"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    category: "Linear",
    tagline: "Dispersed heap nodes and Floyd cycle isolation",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Dispersed Heap Node Chain",
    addressSpace: "0x1A408F00 - 0x1A40B920"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    category: "Linear",
    tagline: "LIFO execution frames and circular ring queues",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register & Ring Buffer",
    addressSpace: "0x7FFF0000 - 0x7FFF0800"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive traversals",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Pointer Hierarchy",
    addressSpace: "0x2B800100 - 0x2B800840"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    category: "Topological",
    tagline: "Adjacency matrix traversal and min-heap shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Adjacency Matrix & Min-Heap",
    addressSpace: "0x3C100000 - 0x3C104000"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    category: "Topological",
    tagline: "DAG state lattices and 1D rolling tabulation",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    complexity: "Pseudo-polynomial O(N * W)",
    memory: "Contiguous DP Memoization Cache",
    addressSpace: "0x4D200000 - 0x4D208000"
  }
];

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function AlgorithmicMemoryLattice({ activeId }: Props) {
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setStep(0);
    setIsPlaying(false);
  }, [activeId]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeModule = MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];

  return (
    <div className="w-full rounded-[28px] bg-white border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
      {/* Top Architecture Telemetry Header */}
      <div className="px-6 py-4 border-b border-black/[0.06] bg-[#fafafb] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: activeModule.accent }}
          />
          <span className="font-clash font-semibold text-[#0f172a] uppercase tracking-wide">
            {activeModule.name}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/[0.04] text-[#52525b] border border-black/[0.04]">
            {activeModule.addressSpace}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <Play size={11} className={isPlaying ? "text-amber-500 fill-amber-500" : ""} />
            <span>{isPlaying ? "Pause Trace" : "Auto Trace"}</span>
          </button>

          <button
            onClick={() => setStep((prev) => (prev + 1) % 4)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <span>Step {step + 1}/4</span>
            <ArrowRight size={12} />
          </button>

          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
            title="Reset simulation step"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Central Visual Lattice Viewport */}
      <div className="p-8 min-h-[380px] sm:min-h-[420px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#fafafb]">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#000000 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px"
          }}
        />

        <AnimatePresence mode="wait">
          {activeId === "arrays" && (
            <motion.div
              key="arrays"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-6"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>CACHE LINE #0 [64-BYTE ALIGNED]</span>
                <span>STRIDE: +8 BYTES &middot; O(1) INDEXING</span>
              </div>

              {/* Contiguous slots */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {[
                  { idx: 0, val: 12, addr: "0x1000" },
                  { idx: 1, val: 24, addr: "0x1008" },
                  { idx: 2, val: 36, addr: "0x1010" },
                  { idx: 3, val: 48, addr: "0x1018" },
                  { idx: 4, val: 60, addr: "0x1020" },
                  { idx: 5, val: 72, addr: "0x1028" }
                ].map((slot) => {
                  const isRead = step === slot.idx || (step === 3 && slot.idx === 4);
                  const isWrite = step + 2 === slot.idx;

                  return (
                    <motion.div
                      key={slot.idx}
                      animate={{
                        scale: isRead ? 1.05 : 1,
                        borderColor: isRead ? "#2563eb" : "rgba(0,0,0,0.08)",
                        backgroundColor: isRead ? "#eff6ff" : "#ffffff"
                      }}
                      className="p-3.5 rounded-2xl border flex flex-col items-center justify-between min-h-[110px] transition-all shadow-xs relative"
                    >
                      <span className="text-[10px] font-mono text-[#71717a]">
                        [{slot.idx}]
                      </span>
                      <span className="font-clash font-bold text-xl text-[#0f172a]">
                        {slot.val}
                      </span>
                      <span className="text-[9px] font-mono text-[#71717a]">
                        {slot.addr}
                      </span>

                      {isRead && (
                        <motion.span
                          layoutId="read-pointer"
                          className="absolute -top-3 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-600 text-white shadow-sm"
                        >
                          i: READ
                        </motion.span>
                      )}

                      {isWrite && (
                        <motion.span
                          layoutId="write-pointer"
                          className="absolute -bottom-3 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500 text-white shadow-sm"
                        >
                          j: WRITE
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">CURRENT FORMULA</span>
                  <span className="text-[#0f172a] font-semibold">
                    Address = Base(0x1000) + (Index × 8) = 0x{((0x1000) + step * 8).toString(16).toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">CACHE HIT PROBABILITY</span>
                  <span className="text-emerald-600 font-semibold">99.4% (L1 Data Cache)</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "linked-lists" && (
            <motion.div
              key="linked-lists"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-6"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>HEAP ALLOCATED POINTER NODES</span>
                <span>NON-CONTIGUOUS &middot; O(1) MUTATION</span>
              </div>

              {/* 3 Linked Nodes with SVG Arrows */}
              <div className="flex items-center justify-between gap-3 relative py-4">
                {[
                  { name: "Node A", val: "0x4F", addr: "0x8A10", next: "0x8A40" },
                  { name: "Node B", val: "0x9C", addr: "0x8A40", next: "0x8B00" },
                  { name: "Node C", val: "0xE2", addr: "0x8B00", next: "nullptr" }
                ].map((node, i) => {
                  const isTraversed = step >= i;

                  return (
                    <div key={node.name} className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          borderColor: isTraversed ? "#7c3aed" : "rgba(0,0,0,0.08)",
                          backgroundColor: isTraversed ? "#f5f3ff" : "#ffffff",
                          scale: isTraversed ? 1.03 : 1
                        }}
                        className="w-36 p-4 rounded-2xl border shadow-xs flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#71717a]">
                            {node.name}
                          </span>
                          <span className="text-[9px] font-mono text-[#71717a]">
                            {node.addr}
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-black/[0.04] text-center font-clash font-bold text-lg text-[#0f172a]">
                          {node.val}
                        </div>
                        <div className="text-[10px] font-mono text-[#71717a] flex items-center justify-between pt-1 border-t border-black/[0.05]">
                          <span>*next:</span>
                          <span className="font-semibold text-purple-700">{node.next}</span>
                        </div>
                      </motion.div>

                      {i < 2 && (
                        <div className="text-purple-600 font-mono text-sm font-bold animate-pulse">
                          ➔
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">POINTER DEREFERENCE</span>
                  <span className="text-[#0f172a] font-semibold">
                    curr = curr-&gt;next (Cycle Detection: Floyd Tortoise &amp; Hare)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">REALLOCATION OVERHEAD</span>
                  <span className="text-purple-700 font-semibold">0 bytes (Zero Array Copy)</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "stacks-queues" && (
            <motion.div
              key="stacks-queues"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>LIFO CALL STACK &middot; REGISTER: RSP</span>
                <span>PUSH / POP: O(1) STRICT ACCESS</span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="w-64 flex flex-col-reverse gap-2">
                  {[
                    { fn: "main()", depth: "Base Frame", color: "#f4f5f8" },
                    { fn: "evalExpression()", depth: "Frame +1", color: "#f4f5f8" },
                    { fn: "tokenizeSymbol()", depth: "Frame +2", color: "#f4f5f8" },
                    { fn: "matchParen()", depth: "Active Top", color: "#ecfdf5" }
                  ].map((frame, idx) => {
                    const isVisible = step >= idx;
                    return (
                      <motion.div
                        key={frame.fn}
                        animate={{
                          opacity: isVisible ? 1 : 0.25,
                          y: isVisible ? 0 : 8
                        }}
                        className={`p-3 rounded-xl border border-black/[0.08] shadow-xs flex items-center justify-between ${
                          idx === step ? "bg-emerald-50 border-emerald-500" : "bg-white"
                        }`}
                      >
                        <div>
                          <span className="font-mono text-xs font-bold text-[#0f172a] block">
                            {frame.fn}
                          </span>
                          <span className="text-[10px] font-mono text-[#71717a]">
                            {frame.depth}
                          </span>
                        </div>
                        {idx === step && (
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                            RSP POINTER
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">STACK DISCIPLINE</span>
                  <span className="text-[#0f172a] font-semibold">
                    Push = [RSP - 8], Pop = [RSP + 8] (Zero Garbage Collection)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">STACK OVERFLOW GUARD</span>
                  <span className="text-emerald-700 font-semibold">Safe (Depth {step + 1} of 1024)</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "trees" && (
            <motion.div
              key="trees"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>BALANCED BINARY SEARCH TREE</span>
                <span>INVARIANT: LEFT &lt; ROOT &lt; RIGHT</span>
              </div>

              {/* Tree Topology Diagram */}
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="p-3 w-16 h-16 rounded-2xl bg-amber-500 text-white flex flex-col items-center justify-center font-clash font-bold text-lg shadow-sm">
                  <span>50</span>
                  <span className="text-[9px] font-mono opacity-80">ROOT</span>
                </div>

                <div className="w-48 h-0.5 bg-black/[0.1] relative">
                  <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-amber-500" />
                  <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-amber-500" />
                </div>

                <div className="flex items-center justify-between w-64">
                  <div className="p-2.5 w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex flex-col items-center justify-center font-clash font-bold text-base shadow-xs">
                    <span>25</span>
                    <span className="text-[8px] font-mono">LEFT</span>
                  </div>
                  <div className="p-2.5 w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex flex-col items-center justify-center font-clash font-bold text-base shadow-xs">
                    <span>75</span>
                    <span className="text-[8px] font-mono">RIGHT</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">TREE RECURSION</span>
                  <span className="text-[#0f172a] font-semibold">
                    Depth: O(log N) &middot; Search Target: 75 ➔ Traversed Right Branch
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">BALANCE FACTOR</span>
                  <span className="text-amber-700 font-semibold">AVL Height Diff: 0</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "graphs" && (
            <motion.div
              key="graphs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>WEIGHTED TOPOLOGICAL NETWORK</span>
                <span>DIJKSTRA MIN-HEAP PRIORITY QUEUE</span>
              </div>

              <div className="flex items-center justify-around py-4">
                {[
                  { id: "A", cost: "0", status: "Origin" },
                  { id: "B", cost: "4", status: "Relaxed" },
                  { id: "C", cost: "2", status: "Optimal" },
                  { id: "D", cost: "6", status: "Target" }
                ].map((node, i) => (
                  <div key={node.id} className="flex flex-col items-center gap-1.5">
                    <motion.div
                      animate={{
                        scale: step >= i ? 1.08 : 1,
                        backgroundColor: step >= i ? "#e11d48" : "#ffffff",
                        color: step >= i ? "#ffffff" : "#0f172a"
                      }}
                      className="w-14 h-14 rounded-2xl border border-black/[0.1] shadow-xs flex flex-col items-center justify-center font-clash font-bold text-base"
                    >
                      <span>{node.id}</span>
                      <span className="text-[9px] font-mono opacity-80">{node.cost}</span>
                    </motion.div>
                    <span className="text-[10px] font-mono text-[#71717a]">
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">EDGE RELAXATION</span>
                  <span className="text-[#0f172a] font-semibold">
                    dist[v] &gt; dist[u] + w(u, v) ➔ Updated dist[C] = 2
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">GREEDY INVARIANT</span>
                  <span className="text-rose-700 font-semibold">Min-Heap Extracted</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeId === "dp" && (
            <motion.div
              key="dp"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full max-w-xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>2D TABULATION STATE MATRIX</span>
                <span>OVERLAPPING SUBPROBLEMS &middot; MEMOIZATION</span>
              </div>

              {/* DP Matrix Table */}
              <div className="grid grid-cols-5 gap-2 p-3 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
                {["w=0", "w=1", "w=2", "w=3", "w=4"].map((h) => (
                  <span key={h} className="text-[10px] font-mono font-bold text-center text-[#71717a]">
                    {h}
                  </span>
                ))}
                {[0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 3, 4, 7, 7].map((val, cellIdx) => {
                  const isActiveCell = cellIdx === 13;
                  return (
                    <div
                      key={cellIdx}
                      className={`py-2 text-center rounded-xl font-mono text-xs ${
                        isActiveCell
                          ? "bg-indigo-600 text-white font-bold shadow-xs"
                          : "bg-[#f8f9fa] text-[#0f172a]"
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f5f8] border border-black/[0.04] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">BELLMAN RECURRENCE</span>
                  <span className="text-[#0f172a] font-semibold">
                    dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]]) = 7
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717a] block text-[10px]">TIME REDUCTION</span>
                  <span className="text-indigo-700 font-semibold">2^N ➔ O(N × W)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-6 py-3.5 border-t border-black/[0.06] bg-[#fafafb] flex items-center justify-between text-[11px] font-mono text-[#71717a]">
        <span>INTERACTIVE ALGORITHM LATTICE &middot; REAL MEMORY TOPOLOGY</span>
        <span>CLICK STEP OR AUTO-TRACE TO OBSERVE MUTATIONS</span>
      </div>
    </div>
  );
}
