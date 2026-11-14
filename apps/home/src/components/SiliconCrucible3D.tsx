"use client";

import { useState, useRef, useEffect } from "react";
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
  RotateCcw,
  Sliders,
  Activity,
  Gauge
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

function CrtOscilloscope({ modId, nScale }: { modId: string; nScale: number }) {
  const getWavePath = () => {
    if (modId === "arrays") {
      return "M 10 70 L 290 70";
    }
    if (modId === "trees") {
      return "M 10 90 Q 60 50, 140 38 T 290 28";
    }
    if (modId === "graphs") {
      return "M 10 90 L 80 75 L 140 50 L 210 32 L 290 15";
    }
    if (modId === "dp") {
      return "M 10 90 L 290 20";
    }
    return "M 10 90 L 290 35";
  };

  const getFormula = () => {
    if (modId === "arrays") return "T(N) = O(1) CONSTANT TIME";
    if (modId === "trees") return "T(N) = O(log₂ N) LOGARITHMIC";
    if (modId === "graphs") return "T(N) = O(E log V) DIJKSTRA";
    if (modId === "dp") return "T(N) = O(N) TABULATION MEMO";
    return "T(N) = O(N) LINEAR TRAVERSAL";
  };

  return (
    <div className="w-full crt-screen rounded-2xl p-4 flex flex-col justify-between h-[180px] relative select-none">
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-emerald-400">
        <span className="flex items-center gap-1.5 font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          OSCILLOSCOPE // PHOSPHOR CH-01
        </span>
        <span className="text-emerald-500/80">SCALE: {nScale}X</span>
      </div>

      <div className="relative z-10 w-full h-[90px] flex items-center justify-center">
        <svg viewBox="0 0 300 100" className="w-full h-full">
          <defs>
            <pattern id="crt-grid" width="30" height="20" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 20" fill="none" stroke="#064e3b" strokeWidth="0.5" strokeOpacity="0.6" />
            </pattern>
          </defs>
          <rect width="300" height="100" fill="url(#crt-grid)" />
          
          <path
            d={getWavePath()}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_8px_#22c55e]"
          />
          
          <motion.circle
            r="3.5"
            fill="#86efac"
            className="filter drop-shadow-[0_0_8px_#4ade80]"
            animate={{
              cx: [15, 285],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            cy={modId === "arrays" ? 70 : modId === "trees" ? 40 : modId === "graphs" ? 45 : 35}
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-emerald-300 font-bold">
        <span>{getFormula()}</span>
        <span className="text-[10px] text-emerald-500 font-normal">PHOSPHOR: P31 GREEN</span>
      </div>
    </div>
  );
}

function ArraysHardwareSim() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(4);
  const cells = [
    { addr: "0x00", val: 12 },
    { addr: "0x08", val: 24 },
    { addr: "0x10", val: 36 },
    { addr: "0x18", val: 48 },
    { addr: "0x20", val: 60 }
  ];

  const advance = () => {
    if (left < right) {
      setLeft((l) => l + 1);
    } else {
      setLeft(0);
      setRight(4);
    }
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-[#64748b]">
        <span>CACHE LINE MEMORY (STRIDE: 8 BYTES)</span>
        <span className="text-blue-600 font-bold">ADDR BUS: 64-BIT</span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {cells.map((c, i) => {
          const isLeft = i === left;
          const isRight = i === right;
          return (
            <div
              key={c.addr}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isLeft || isRight
                  ? "bg-blue-600 text-white border-blue-700 shadow-md scale-105"
                  : "bg-white text-[#0f172a] border-black/10"
              }`}
            >
              <div className="text-[9px] opacity-70 mb-1">{c.addr}</div>
              <div className="text-base font-bold">{c.val}</div>
              <div className="text-[8px] mt-1 font-semibold uppercase tracking-wider">
                {isLeft ? "PTR_i" : isRight ? "PTR_j" : "—"}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={advance}
        className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
      >
        <Play size={12} />
        <span>Step Pointers [ i={left}, j={right} ]</span>
      </button>
    </div>
  );
}

function ListsHardwareSim() {
  const [curr, setCurr] = useState(0);
  const nodes = [
    { id: "A", next: "0x20", val: 10 },
    { id: "B", next: "0x40", val: 25 },
    { id: "C", next: "0x60", val: 40 },
    { id: "D", next: "NIL", val: 85 }
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-[#64748b]">
        <span>HEAP POINTER CHAIN (DEREFERENCE)</span>
        <span className="text-purple-600 font-bold">DEREF: 0x{nodes[curr].next}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {nodes.map((n, i) => {
          const isSelected = i === curr;
          return (
            <div
              key={n.id}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isSelected
                  ? "bg-purple-600 text-white border-purple-700 shadow-md scale-105"
                  : "bg-white text-[#0f172a] border-black/10"
              }`}
            >
              <div className="text-[9px] opacity-70 mb-1">NODE {n.id}</div>
              <div className="text-base font-bold">{n.val}</div>
              <div className="text-[8px] mt-1 text-purple-300 font-bold">NEXT &rarr; {n.next}</div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setCurr((c) => (c + 1) % nodes.length)}
        className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
      >
        <Play size={12} />
        <span>Dereference Next Pointer &rarr; Node {nodes[(curr + 1) % nodes.length].id}</span>
      </button>
    </div>
  );
}

function StacksHardwareSim() {
  const [frames, setFrames] = useState(["main()", "renderFrame()", "alloc()"]);

  const pushFrame = () => {
    if (frames.length < 5) {
      setFrames([...frames, `call_0x${frames.length + 1}()`]);
    } else {
      setFrames(["main()"]);
    }
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-[#64748b]">
        <span>LIFO CALL STACK (RSP REGISTER)</span>
        <span className="text-emerald-600 font-bold">DEPTH: {frames.length} FRAMES</span>
      </div>

      <div className="flex flex-col-reverse gap-1.5 bg-[#f8fafc] p-2.5 rounded-xl border border-black/10 min-h-[90px] justify-end">
        {frames.map((f, i) => (
          <div
            key={i}
            className={`p-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-between ${
              i === frames.length - 1
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-[#0f172a] border border-black/5"
            }`}
          >
            <span>RSP - 0x{i * 8}: {f}</span>
            <span className="text-[9px] opacity-80">{i === frames.length - 1 ? "ACTIVE FRAME" : "CALLER"}</span>
          </div>
        ))}
      </div>

      <button
        onClick={pushFrame}
        className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
      >
        <Play size={12} />
        <span>{frames.length >= 5 ? "Purge Stack Frame (Return)" : "Push New Stack Frame"}</span>
      </button>
    </div>
  );
}

function TreesHardwareSim() {
  const [step, setStep] = useState(0);
  const steps = [
    { target: "Root 50", status: "Root node inspected" },
    { target: "Left Subtree 30", status: "Branch Left: Val < 50" },
    { target: "Right Child 40", status: "Branch Right: Val > 30 (Found)" }
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-[#64748b]">
        <span>BINARY SEARCH TREE INVARIANT</span>
        <span className="text-amber-600 font-bold">O(log N) PATH</span>
      </div>

      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-950 font-bold flex items-center justify-between">
        <span>Current Node: {steps[step % steps.length].target}</span>
        <span className="text-[10px] text-amber-700">{steps[step % steps.length].status}</span>
      </div>

      <button
        onClick={() => setStep((s) => s + 1)}
        className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
      >
        <Play size={12} />
        <span>Traverse BST Branch</span>
      </button>
    </div>
  );
}

function GraphsHardwareSim() {
  const [step, setStep] = useState(0);
  const path = ["A (Start, Dist=0)", "B (Relaxed, Dist=4)", "C (Relaxed, Dist=7)", "D (Target Reached)"];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-[#64748b]">
        <span>DIJKSTRA PRIORITY QUEUE RELAXATION</span>
        <span className="text-rose-600 font-bold">HEAP EXTRACT_MIN</span>
      </div>

      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-950 font-bold flex items-center justify-between">
        <span>Active Vertex: {path[step % path.length]}</span>
        <span className="text-[10px] text-rose-700">Cost: {(step % 4) * 3} units</span>
      </div>

      <button
        onClick={() => setStep((s) => s + 1)}
        className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
      >
        <Play size={12} />
        <span>Relax Next Adjacent Edge</span>
      </button>
    </div>
  );
}

function DpHardwareSim() {
  const [idx, setIdx] = useState(2);
  const dpTable = [0, 1, 1, 2, 3, 5, 8];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-[#64748b]">
        <span>1D TABULATION LATTICE (MEMOIZATION)</span>
        <span className="text-indigo-600 font-bold">dp[i] = dp[i-1] + dp[i-2]</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {dpTable.map((val, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg border text-center transition-all ${
              i === idx
                ? "bg-indigo-600 text-white border-indigo-700 shadow-sm font-bold scale-105"
                : i < idx
                ? "bg-indigo-50 text-indigo-900 border-indigo-200"
                : "bg-white text-gray-400 border-black/5"
            }`}
          >
            <div className="text-[8px] opacity-70">i={i}</div>
            <div className="text-sm font-bold">{i <= idx ? val : "?"}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIdx((i) => (i < 6 ? i + 1 : 2))}
        className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
      >
        <Play size={12} />
        <span>Calculate Tabulation dp[{idx < 6 ? idx + 1 : 2}]</span>
      </button>
    </div>
  );
}

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function SiliconCrucible3D({ activeId, onSelectModule }: Props) {
  const [nScale, setNScale] = useState(1);
  const activeModule = MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      <div className="w-full skeuo-rack-bezel rounded-[28px] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-4 left-4 skeuo-screw" />
        <div className="absolute top-4 right-4 skeuo-screw" />
        <div className="absolute bottom-4 left-4 skeuo-screw" />
        <div className="absolute bottom-4 right-4 skeuo-screw" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="led-diode-green" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
              SILICON BENCH // SYSTEM {activeModule.index}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700">
              {activeModule.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-zinc-400">SCALE:</span>
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setNScale(s)}
                className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-mono font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                  nScale === s
                    ? "bg-emerald-500 text-black shadow-[0_0_8px_#10b981]"
                    : "bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
                }`}
              >
                {s}X
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-2">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <CrtOscilloscope modId={activeId} nScale={nScale} />

            <div className="p-3.5 rounded-xl vfd-display text-emerald-400 font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 block">SCHEMATIC INVARIANT</span>
                <span className="text-xs font-bold text-emerald-300">{activeModule.glyph}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 block">MEMORY</span>
                <span className="text-[11px] text-zinc-300">{activeModule.memory.split(" ")[0]}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                  INTERACTIVE HARDWARE DIE
                </span>
                <span className="text-xs font-mono font-bold text-zinc-900">
                  {activeModule.name}
                </span>
              </div>

              {activeId === "arrays" && <ArraysHardwareSim />}
              {activeId === "linked-lists" && <ListsHardwareSim />}
              {activeId === "stacks-queues" && <StacksHardwareSim />}
              {activeId === "trees" && <TreesHardwareSim />}
              {activeId === "graphs" && <GraphsHardwareSim />}
              {activeId === "dp" && <DpHardwareSim />}
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-3">
              <span className="text-[11px] font-mono text-zinc-500">{activeModule.complexity}</span>
              <a
                href={activeModule.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 min-h-[40px] rounded-xl bg-zinc-900 hover:bg-black !text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none"
              >
                <span className="!text-white font-bold">Full Workbench ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
