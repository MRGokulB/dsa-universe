"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw
} from "lucide-react";

export interface AlgorithmModuleMeta {
  id: string;
  index: string;
  name: string;
  shortTitle: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  chipColor: string;
  complexity: string;
  memory: string;
  glyph: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    shortTitle: "ARRAYS",
    category: "Linear",
    tagline: "Sequential cache lines and two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    chipColor: "#bfdbfe",
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous 64-bit Cache Lines",
    glyph: "[ 0x00 | 0x08 | 0x10 | 0x18 ]"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    shortTitle: "LISTS",
    category: "Linear",
    tagline: "Dispersed heap nodes and Floyd cycle isolation",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    chipColor: "#e9d5ff",
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Allocated Pointer Chain",
    glyph: "[ Node* ] -> [ Node* ] -> ∅"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    shortTitle: "STACKS",
    category: "Linear",
    tagline: "LIFO execution frames and circular ring queues",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    chipColor: "#bbf7d0",
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register & Ring Buffer",
    glyph: "RSP -> [ Frame 3 ] [ Frame 2 ]"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    shortTitle: "TREES",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive traversals",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    chipColor: "#fef08a",
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Node Hierarchy",
    glyph: "( Root ) -> [ L ] / [ R ]"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    shortTitle: "GRAPHS",
    category: "Topological",
    tagline: "Adjacency matrix traversal and priority queue shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    chipColor: "#fecdd3",
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Sparse Adjacency Matrix & Heap",
    glyph: "( A ) === ( B ) --- ( C )"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    shortTitle: "DP",
    category: "Topological",
    tagline: "DAG state lattices and 1D rolling tabulation",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    chipColor: "#c7d2fe",
    complexity: "Subproblems O(N) · Space O(1)",
    memory: "Contiguous DP Memoization Cache",
    glyph: "memo[i] = min(cost + memo[i-1])"
  }
];

function ArraysMemoryWidget() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(4);

  const cells = [
    { addr: "0x00", val: 12 },
    { addr: "0x08", val: 24 },
    { addr: "0x10", val: 36 },
    { addr: "0x18", val: 48 },
    { addr: "0x20", val: 60 }
  ];

  const advancePointers = () => {
    if (left < right) {
      setLeft((l) => l + 1);
    } else {
      setLeft(0);
      setRight(4);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
            CONTIGUOUS 64-BIT CACHE LINE MEMORY
          </span>
          <span className="text-[10px] text-sky-600 font-semibold">Stride: 8 Bytes</span>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-3">
          {cells.map((cell, idx) => {
            const isLeft = left === idx;
            const isRight = right === idx;
            return (
              <div
                key={idx}
                className={`p-2 rounded-xl text-center border transition-all ${
                  isLeft || isRight
                    ? "bg-sky-100/70 border-sky-400 shadow-xs"
                    : "bg-[#f8f9fc] border-black/[0.04]"
                }`}
              >
                <div className="text-[9px] text-[#94a3b8]">{cell.addr}</div>
                <div className="font-bold text-sm text-[#0f172a] my-0.5">{cell.val}</div>
                <div className="text-[8px] font-bold">
                  {isLeft && isRight ? (
                    <span className="text-amber-600">Match!</span>
                  ) : isLeft ? (
                    <span className="text-sky-600">&larr; Left (i)</span>
                  ) : isRight ? (
                    <span className="text-indigo-600">Right (j) &rarr;</span>
                  ) : (
                    <span className="text-transparent">-</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
          <span className="text-[10px] text-[#64748b]">
            Direct pointer arithmetic: base + (index &times; 8) &rarr; O(1) Cache Hit
          </span>
          <button
            onClick={advancePointers}
            className="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-semibold text-[11px] hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Advance Pointers
          </button>
        </div>
      </div>
    </div>
  );
}

function LinkedListWidget() {
  const [fastPos, setFastPos] = useState(1);

  const nodes = [
    { addr: "0x3F", val: "A" },
    { addr: "0x8A", val: "B" },
    { addr: "0xC2", val: "C" },
    { addr: "0xFA", val: "D" }
  ];

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
            HEAP POINTER CHAIN &middot; FLOYD CYCLE DETECTION
          </span>
          <span className="text-[10px] text-purple-600 font-semibold">Torque: Slow (1x) vs Fast (2x)</span>
        </div>

        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-2">
          {nodes.map((node, idx) => (
            <div key={idx} className="flex items-center gap-1 shrink-0">
              <div
                className={`p-2 rounded-xl border text-center min-w-[70px] ${
                  fastPos === idx ? "bg-purple-100/70 border-purple-400" : "bg-[#f8f9fc] border-black/[0.04]"
                }`}
              >
                <div className="text-[8px] text-[#94a3b8]">{node.addr}</div>
                <div className="font-bold text-sm text-[#0f172a]">{node.val}</div>
                <div className="text-[8px] text-purple-600">
                  {fastPos === idx ? "Fast &bull;" : "next &rarr;"}
                </div>
              </div>
              {idx < nodes.length - 1 && <ArrowRight size={12} className="text-purple-400 shrink-0" />}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
          <span className="text-[10px] text-[#64748b]">Heap allocated nodes connected via 64-bit pointers</span>
          <button
            onClick={() => setFastPos((p) => (p < nodes.length - 1 ? p + 1 : 0))}
            className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-semibold text-[11px] hover:bg-purple-700 transition-colors cursor-pointer"
          >
            Step Fast Pointer
          </button>
        </div>
      </div>
    </div>
  );
}

function StacksQueuesWidget() {
  const [frames, setFrames] = useState(["solve()", "dfs(node)", "main()"]);

  const pushFrame = () => {
    if (frames.length < 5) {
      setFrames(["helper(" + frames.length + ")", ...frames]);
    }
  };

  const popFrame = () => {
    if (frames.length > 1) {
      setFrames(frames.slice(1));
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            LIFO CALL STACK &middot; RSP REGISTER
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={pushFrame}
              className="px-2 py-0.5 rounded bg-emerald-600 text-white font-semibold text-[10px] hover:bg-emerald-700 cursor-pointer"
            >
              + Push
            </button>
            <button
              onClick={popFrame}
              className="px-2 py-0.5 rounded bg-[#0f172a] text-white font-semibold text-[10px] hover:bg-black cursor-pointer"
            >
              - Pop
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {frames.map((frame, idx) => (
            <div
              key={idx}
              className={`p-1.5 rounded-lg border flex items-center justify-between ${
                idx === 0 ? "bg-emerald-100/70 border-emerald-400 font-bold" : "bg-[#f8f9fc] border-black/[0.04]"
              }`}
            >
              <span className="text-[11px] text-[#0f172a]">{frame}</span>
              <span className="text-[9px] text-emerald-700">
                {idx === 0 ? "RSP &rarr; Top of Stack" : `Frame -${idx * 16}`}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-[#64748b] bg-[#f8f9fc] p-2 rounded-xl mt-2 flex items-center justify-between">
          <span>Stack frames allocate O(1) by decrementing the stack pointer (RSP)</span>
          <span className="font-semibold text-emerald-600">Frames: {frames.length}</span>
        </div>
      </div>
    </div>
  );
}

function TreesWidget() {
  const [traversal, setTraversal] = useState("IN-ORDER");

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
            BINARY SEARCH TREE TOPOLOGY
          </span>
          <span className="text-[10px] text-amber-700 font-bold">{traversal}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#f8f9fc] border border-black/[0.04] flex flex-col items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center text-xs shadow-xs">
            50
          </div>
          <div className="flex items-center gap-12 sm:gap-20">
            <div className="w-8 h-8 rounded-full bg-amber-200 text-black font-bold flex items-center justify-center text-xs">
              25
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-200 text-black font-bold flex items-center justify-center text-xs">
              75
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="w-7 h-7 rounded-full bg-amber-100 text-[#0f172a] font-semibold flex items-center justify-center text-[10px]">
              12
            </div>
            <div className="w-7 h-7 rounded-full bg-amber-100 text-[#0f172a] font-semibold flex items-center justify-center text-[10px]">
              35
            </div>
            <div className="w-7 h-7 rounded-full bg-amber-100 text-[#0f172a] font-semibold flex items-center justify-center text-[10px]">
              65
            </div>
            <div className="w-7 h-7 rounded-full bg-amber-100 text-[#0f172a] font-semibold flex items-center justify-center text-[10px]">
              90
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
          <span className="text-[10px] text-[#64748b]">Balanced search invariant: Left &lt; Root &lt; Right</span>
          <div className="flex gap-1">
            {["IN-ORDER", "PRE-ORDER", "LEVEL"].map((m) => (
              <button
                key={m}
                onClick={() => setTraversal(m)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                  traversal === m ? "bg-amber-500 text-white shadow-xs" : "bg-slate-100 text-[#475569]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GraphsWidget() {
  const [visitedCount, setVisitedCount] = useState(2);

  const graphNodes = [
    { id: "A", dist: "0" },
    { id: "B", dist: "4" },
    { id: "C", dist: "2" },
    { id: "D", dist: "5" }
  ];

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
            DIJKSTRA SHORTEST PATH PRIORITY QUEUE
          </span>
          <span className="text-[10px] text-rose-600 font-semibold">Min-Heap Greedy</span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-2">
          {graphNodes.map((node, idx) => {
            const isVisited = idx < visitedCount;
            return (
              <div
                key={node.id}
                className={`p-2 rounded-xl text-center border transition-all ${
                  isVisited ? "bg-rose-100/70 border-rose-400" : "bg-[#f8f9fc] border-black/[0.04]"
                }`}
              >
                <div className="font-bold text-sm text-[#0f172a]">Node {node.id}</div>
                <div className="text-[10px] text-rose-700">dist = {node.dist}</div>
                <div className="text-[8px] text-[#64748b]">{isVisited ? "Settled" : "Queue"}</div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
          <span className="text-[10px] text-[#64748b]">Time: O(E log V) using Fibonacci / Binary Min-Heap</span>
          <button
            onClick={() => setVisitedCount((c) => (c < graphNodes.length ? c + 1 : 1))}
            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-semibold text-[11px] hover:bg-rose-700 transition-colors cursor-pointer"
          >
            Relax Next Node
          </button>
        </div>
      </div>
    </div>
  );
}

function DynamicProgrammingWidget() {
  const [step, setStep] = useState(4);

  const dpArray = [0, 1, 1, 2, 3, 5, 8, 13];

  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
            1D ROLLING TABULATION MEMOIZATION
          </span>
          <span className="text-[10px] text-indigo-600 font-semibold">dp[i] = dp[i-1] + dp[i-2]</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-2">
          {dpArray.map((val, idx) => {
            const isComputed = idx <= step;
            const isCurrent = idx === step;
            return (
              <div
                key={idx}
                className={`p-1.5 rounded-lg text-center border transition-all ${
                  isCurrent
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : isComputed
                    ? "bg-indigo-100/60 border-indigo-300 text-[#0f172a]"
                    : "bg-[#f8f9fc] border-black/[0.04] text-[#94a3b8]"
                }`}
              >
                <div className="text-[8px] opacity-75">i={idx}</div>
                <div className="font-bold text-xs">{isComputed ? val : "?"}</div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
          <span className="text-[10px] text-[#64748b]">Transforms exponential recursion O(2^N) into linear O(N)</span>
          <button
            onClick={() => setStep((s) => (s < dpArray.length - 1 ? s + 1 : 2))}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-[11px] hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Tabulate Next
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function SiliconCrucible3D({ activeId, onSelectModule }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeModule = MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 8), y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[520px] sm:min-h-[580px] flex flex-col justify-between p-4 sm:p-6 rounded-[28px] bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_20px_48px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out select-none"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
            style={{ backgroundColor: activeModule.accent }}
          />
          <span className="text-[11px] font-mono tracking-widest text-[#0f172a] uppercase font-bold">
            ALGORITHM SILICON WORKBENCH // SYSTEM {activeModule.index}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fc] border border-black/[0.06] text-[10px] font-mono text-[#64748b]">
          <Sparkles size={11} className="text-sky-500" />
          <span>Interactive Memory Sandbox</span>
        </div>
      </div>

      <div className="relative z-10 py-4 flex-1 flex flex-col justify-center">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold"
              style={{ backgroundColor: activeModule.chipColor, color: activeModule.accent }}
            >
              {activeModule.category}
            </span>
            <span className="text-xs font-mono text-[#64748b]">{activeModule.memory}</span>
          </div>
          <h2 className="font-clash font-bold text-2xl text-[#0f172a]">
            {activeModule.name}
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            {activeModule.tagline}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeModule.id === "arrays" && <ArraysMemoryWidget />}
            {activeModule.id === "linked-lists" && <LinkedListWidget />}
            {activeModule.id === "stacks-queues" && <StacksQueuesWidget />}
            {activeModule.id === "trees" && <TreesWidget />}
            {activeModule.id === "graphs" && <GraphsWidget />}
            {activeModule.id === "dp" && <DynamicProgrammingWidget />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#64748b]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          <span>Contiguous 64-bit Memory Topology Online</span>
        </div>
        <span>Hover &amp; interact with the memory simulation above</span>
      </div>
    </div>
  );
}