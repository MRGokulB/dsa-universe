"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Activity,
  Compass
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
    name: "Contiguous Arrays",
    shortTitle: "Arrays",
    category: "Linear Access",
    tagline: "Elements stored sequentially in memory for instant index access.",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    chipColor: "#dbeafe",
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous Memory Buffer",
    glyph: "[ 0, 1, 2, 3, 4 ]"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists",
    shortTitle: "Lists",
    category: "Pointer Chain",
    tagline: "Nodes scattered in heap memory connected by reference pointers.",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    chipColor: "#f3e8ff",
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Pointer Chain",
    glyph: "A -> B -> C -> null"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Stacks & Queues",
    shortTitle: "Stacks",
    category: "Buffer Order",
    tagline: "LIFO execution frames and FIFO buffer ordering.",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    chipColor: "#d1fae5",
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "LIFO Call Frame",
    glyph: "TOP -> [ Frame 3 ]"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Search Trees",
    shortTitle: "Trees",
    category: "Hierarchical",
    tagline: "Branching hierarchy dividing search space in half at every step.",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    chipColor: "#fef3c7",
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Branching Nodes",
    glyph: "Root -> Left / Right"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks",
    shortTitle: "Graphs",
    category: "Topological",
    tagline: "Connected vertices and weighted paths resolved via Dijkstra.",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    chipColor: "#ffe4e6",
    complexity: "Dijkstra O(E log V) · BFS O(V+E)",
    memory: "Adjacency Matrix",
    glyph: "(A) - (B) - (C)"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    shortTitle: "DP",
    category: "Tabulation",
    tagline: "Subproblems solved once and cached to eliminate redundant work.",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    chipColor: "#e0e7ff",
    complexity: "Time O(N) · Space O(1)",
    memory: "1D Memoization Cache",
    glyph: "dp[i] = dp[i-1] + dp[i-2]"
  }
];

function ArrayInteractiveStage() {
  const [step, setStep] = useState(0);
  const items = [12, 24, 36, 48, 60];
  const pointerStates = [
    { left: 0, right: 4, msg: "Initial boundary pointers at index 0 and 4." },
    { left: 1, right: 3, msg: "Pointers advance inward: inspecting index 1 and 3." },
    { left: 2, right: 2, msg: "Pointers converge at center index 2 (value: 36). Target found." }
  ];

  const current = pointerStates[step % pointerStates.length];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">
          Two-Pointer Convergence Pattern
        </span>
        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Step {(step % pointerStates.length) + 1} of {pointerStates.length}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3 py-2">
        {items.map((val, i) => {
          const isLeft = i === current.left;
          const isRight = i === current.right;
          const isConverged = isLeft && isRight;

          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="h-6 flex items-center justify-center">
                {isConverged ? (
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full animate-bounce">
                    Target
                  </span>
                ) : isLeft ? (
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    Left (i)
                  </span>
                ) : isRight ? (
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    Right (j)
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-300">[{i}]</span>
                )}
              </div>

              <div
                className={`w-full h-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 ${
                  isConverged
                    ? "bg-blue-600 text-white border-blue-700 shadow-md scale-105"
                    : isLeft || isRight
                    ? "bg-blue-500 text-white border-blue-600 shadow-sm scale-102"
                    : "bg-white text-slate-800 border-slate-200/80 shadow-xs"
                }`}
              >
                <span className="text-base sm:text-xl font-bold">{val}</span>
                <span className={`text-[10px] ${isLeft || isRight ? "text-blue-100" : "text-slate-400"}`}>
                  idx {i}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-center justify-between">
        <span>{current.msg}</span>
        <button
          onClick={() => setStep((s) => s + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <Play size={12} className="fill-current" />
          <span>Next Step</span>
        </button>
      </div>
    </div>
  );
}

function ListInteractiveStage() {
  const [curr, setCurr] = useState(0);
  const nodes = [
    { id: "A", val: 10, next: "Node B" },
    { id: "B", val: 25, next: "Node C" },
    { id: "C", val: 40, next: "Node D" },
    { id: "D", val: 85, next: "null" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">
          Sequential Pointer Dereference
        </span>
        <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
          Node {nodes[curr].id} Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
        {nodes.map((n, i) => {
          const isActive = i === curr;
          return (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-24 ${
                isActive
                  ? "bg-purple-600 text-white border-purple-700 shadow-md scale-102"
                  : "bg-white text-slate-800 border-slate-200/80 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-purple-200" : "text-slate-400"}`}>
                  Node {n.id}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </div>
              <div className="text-xl font-bold">{n.val}</div>
              <div className={`text-[10px] ${isActive ? "text-purple-200" : "text-purple-600 font-semibold"}`}>
                &rarr; {n.next}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-center justify-between">
        <span>
          Following pointer reference from Node {nodes[curr].id} to {nodes[curr].next}.
        </span>
        <button
          onClick={() => setCurr((c) => (c + 1) % nodes.length)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <Play size={12} className="fill-current" />
          <span>Traverse Next</span>
        </button>
      </div>
    </div>
  );
}

function StackInteractiveStage() {
  const [frames, setFrames] = useState(["main()", "render()", "calculate()"]);

  const pushFrame = () => {
    if (frames.length < 4) {
      const names = ["format()", "save()", "dispatch()"];
      setFrames([...frames, names[frames.length - 1] || "step()"]);
    } else {
      setFrames(["main()"]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">
          Last-In, First-Out (LIFO) Call Stack
        </span>
        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          Depth: {frames.length} Frame{frames.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col-reverse gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 min-h-[140px] justify-end">
        {frames.map((frame, i) => {
          const isTop = i === frames.length - 1;
          return (
            <div
              key={i}
              className={`p-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                isTop
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200/80"
              }`}
            >
              <span className="font-mono">{frame}</span>
              <span className={`text-[10px] ${isTop ? "text-emerald-100" : "text-slate-400"}`}>
                {isTop ? "Top of Stack (Executing)" : `Frame #${i + 1}`}
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-center justify-between">
        <span>
          {frames.length >= 4
            ? "Stack limit reached. Click to unwind execution frames."
            : "Function called: new execution context pushed to top of stack."}
        </span>
        <button
          onClick={pushFrame}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <Play size={12} className="fill-current" />
          <span>{frames.length >= 4 ? "Pop Frame" : "Push Frame"}</span>
        </button>
      </div>
    </div>
  );
}

function TreeInteractiveStage() {
  const [step, setStep] = useState(0);
  const path = [
    { node: "50", desc: "Start at Root (50). Searching for 40: since 40 < 50, go left." },
    { node: "30", desc: "Arrived at Node (30). Since 40 > 30, branch right." },
    { node: "40", desc: "Target 40 found in 2 comparisons! O(log N) efficiency." }
  ];

  const current = path[step % path.length];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">
          Binary Search Tree: Looking for Value 40
        </span>
        <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
          Step {(step % path.length) + 1} of 3
        </span>
      </div>

      <div className="py-2 flex items-center justify-center">
        <svg viewBox="0 0 320 120" className="w-full max-w-[340px] h-28">
          <line x1="160" y1="24" x2="80" y2="76" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="160" y1="24" x2="240" y2="76" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="80" y1="76" x2="120" y2="108" stroke="#e2e8f0" strokeWidth="2" />

          <circle
            cx="160"
            cy="24"
            r="18"
            className={`transition-all duration-300 ${
              current.node === "50" ? "fill-amber-500 stroke-amber-600" : "fill-white stroke-slate-200"
            }`}
            strokeWidth="2"
          />
          <text
            x="160"
            y="29"
            textAnchor="middle"
            className={`text-xs font-bold font-mono ${current.node === "50" ? "fill-white" : "fill-slate-700"}`}
          >
            50
          </text>

          <circle
            cx="80"
            cy="76"
            r="18"
            className={`transition-all duration-300 ${
              current.node === "30" ? "fill-amber-500 stroke-amber-600" : "fill-white stroke-slate-200"
            }`}
            strokeWidth="2"
          />
          <text
            x="80"
            y="81"
            textAnchor="middle"
            className={`text-xs font-bold font-mono ${current.node === "30" ? "fill-white" : "fill-slate-700"}`}
          >
            30
          </text>

          <circle
            cx="240"
            cy="76"
            r="18"
            className="fill-white stroke-slate-200"
            strokeWidth="2"
          />
          <text x="240" y="81" textAnchor="middle" className="text-xs font-bold font-mono fill-slate-700">
            70
          </text>

          <circle
            cx="120"
            cy="108"
            r="16"
            className={`transition-all duration-300 ${
              current.node === "40" ? "fill-amber-500 stroke-amber-600" : "fill-white stroke-slate-200"
            }`}
            strokeWidth="2"
          />
          <text
            x="120"
            y="113"
            textAnchor="middle"
            className={`text-xs font-bold font-mono ${current.node === "40" ? "fill-white" : "fill-slate-700"}`}
          >
            40
          </text>
        </svg>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-center justify-between">
        <span>{current.desc}</span>
        <button
          onClick={() => setStep((s) => s + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <Play size={12} className="fill-current" />
          <span>Next Search Step</span>
        </button>
      </div>
    </div>
  );
}

function GraphInteractiveStage() {
  const [step, setStep] = useState(0);
  const steps = [
    { active: "A", cost: 0, text: "Origin vertex A settled with initial distance 0." },
    { active: "B", cost: 4, text: "Edge (A -> B) explored with cost 4." },
    { active: "C", cost: 7, text: "Edge (B -> C) relaxed with cumulative cost 7." },
    { active: "D", cost: 9, text: "Destination vertex D reached via shortest path (total cost: 9)." }
  ];

  const current = steps[step % steps.length];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">
          Dijkstra Shortest Path Exploration
        </span>
        <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
          Vertex {current.active} (Cost: {current.cost})
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 py-2">
        {["A", "B", "C", "D"].map((vertex, i) => {
          const isActive = current.active === vertex;
          const isVisited = i <= (step % steps.length);

          return (
            <div
              key={vertex}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                isActive
                  ? "bg-rose-600 text-white border-rose-700 shadow-md scale-102"
                  : isVisited
                  ? "bg-rose-50 text-rose-900 border-rose-200 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200/80 shadow-xs"
              }`}
            >
              <div className="text-xl font-bold font-mono">{vertex}</div>
              <div className={`text-[10px] mt-1 ${isActive ? "text-rose-100" : "text-slate-400"}`}>
                {i === 0 ? "Start" : i === 3 ? "Target" : `Node ${i}`}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-center justify-between">
        <span>{current.text}</span>
        <button
          onClick={() => setStep((s) => s + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <Play size={12} className="fill-current" />
          <span>Relax Next Vertex</span>
        </button>
      </div>
    </div>
  );
}

function DpInteractiveStage() {
  const [idx, setIdx] = useState(2);
  const dpTable = [0, 1, 1, 2, 3, 5, 8];

  const advance = () => {
    setIdx((i) => (i < 6 ? i + 1 : 2));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">
          Fibonacci 1D Tabulation Memoization
        </span>
        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          dp[{idx}] = {dpTable[idx - 1]} + {dpTable[idx - 2]} = {dpTable[idx]}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 py-2">
        {dpTable.map((val, i) => {
          const isCurrent = i === idx;
          const isComputed = i < idx;

          return (
            <div
              key={i}
              className={`p-3 rounded-2xl border text-center transition-all duration-300 ${
                isCurrent
                  ? "bg-indigo-600 text-white border-indigo-700 shadow-md scale-105"
                  : isComputed
                  ? "bg-indigo-50 text-indigo-900 border-indigo-200 shadow-xs"
                  : "bg-white text-slate-300 border-slate-200/60 shadow-xs"
              }`}
            >
              <div className={`text-[10px] font-mono ${isCurrent ? "text-indigo-200" : "text-slate-400"}`}>
                i={i}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono">
                {i <= idx ? val : "—"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-center justify-between">
        <span>
          Computing dp[{idx}] by adding previous two cached subproblems. Zero redundant calls.
        </span>
        <button
          onClick={advance}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <Play size={12} className="fill-current" />
          <span>Compute Next dp[{idx < 6 ? idx + 1 : 2}]</span>
        </button>
      </div>
    </div>
  );
}

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function SiliconCrucible3D({ activeId, onSelectModule }: Props) {
  const activeModule = useMemo(() => {
    return MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];
  }, [activeId]);

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6 sm:p-8 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeModule.accent }}
            />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Module {activeModule.index} &middot; {activeModule.category}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeModule.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {activeModule.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono font-medium text-slate-600">
            {activeModule.complexity}
          </div>

          <a
            href={activeModule.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 !text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:shadow cursor-pointer"
          >
            <span className="!text-white">Launch Visualizer</span>
            <ArrowUpRight size={14} className="!text-white" />
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        {activeId === "arrays" && <ArrayInteractiveStage />}
        {activeId === "linked-lists" && <ListInteractiveStage />}
        {activeId === "stacks-queues" && <StackInteractiveStage />}
        {activeId === "trees" && <TreeInteractiveStage />}
        {activeId === "graphs" && <GraphInteractiveStage />}
        {activeId === "dp" && <DpInteractiveStage />}
      </div>
    </div>
  );
}
