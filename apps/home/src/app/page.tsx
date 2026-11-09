"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence
} from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  RotateCcw,
  Grip,
  Code2,
  Activity,
  Terminal,
  Compass
} from "lucide-react";
import { OnboardingTour } from "../components/OnboardingTour";

interface AlgorithmSystem {
  id: string;
  index: string;
  name: string;
  category: "linear" | "hierarchical" | "topological";
  shortTag: string;
  subtitle: string;
  description: string;
  url: string;
  icon: typeof Layers;
  accent: string;
  complexityTime: string;
  complexitySpace: string;
  memoryModel: string;
  hardwareInvariant: string;
  // Position on the 3D silicon substrate (x, y offsets in px)
  gridX: number;
  gridY: number;
  schematic: {
    label: string;
    items: string[];
    highlightIndex?: number;
  };
}

const SYSTEMS: AlgorithmSystem[] = [
  {
    id: "arrays",
    index: "01",
    name: "Arrays & Contiguous RAM",
    category: "linear",
    shortTag: "Contiguous RAM",
    subtitle: "L1/L2 Cache Locality & Two-Pointer Narrowing",
    description: "Hardware memory is flat and sequential. Arrays leverage CPU cache lines for O(1) random memory access, two-pointer convergence, and sliding window optimization.",
    url: "https://arrays-rho.vercel.app",
    icon: Layers,
    accent: "#38bdf8", // Sky
    complexityTime: "Access O(1) · Search O(N)",
    complexitySpace: "O(1) Auxiliary",
    memoryModel: "Sequential Contiguous RAM Buffer",
    hardwareInvariant: "Cache line spatial locality (64 bytes/line)",
    gridX: -130,
    gridY: -80,
    schematic: {
      label: "RAM_ADDR: 0x7FFE00",
      items: ["0x00: 12", "0x04: 24", "0x08: 36*", "0x0C: 48", "0x10: 60*"],
      highlightIndex: 2
    }
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Node Pointers",
    category: "linear",
    shortTag: "Pointer Chains",
    subtitle: "Heap Allocation & Floyd Cycle Detection",
    description: "Heap-allocated dynamic nodes linked via memory pointers. Explores fast/slow runner pointers, in-place node rewiring, and non-contiguous memory traversal.",
    url: "https://linked-lists-xi.vercel.app/",
    icon: LayoutList,
    accent: "#c084fc", // Purple
    complexityTime: "Prepend O(1) · Search O(N)",
    complexitySpace: "O(N) Pointer Overhead",
    memoryModel: "Dispersed Heap Node Allocations",
    hardwareInvariant: "Non-contiguous cache miss traversal",
    gridX: 0,
    gridY: -80,
    schematic: {
      label: "HEAP_NODES",
      items: ["Node_A", "→", "Node_B (slow)", "→", "Node_C (fast)"],
      highlightIndex: 2
    }
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Ring Buffers",
    category: "linear",
    shortTag: "LIFO / FIFO",
    subtitle: "Execution Frames & Ring Buffer Queues",
    description: "Simulates thread call stack overflow thresholds, circular ring buffers with modulo arithmetic, and monotonic stack boundary invariants.",
    url: "https://stacks-queues.vercel.app",
    icon: Database,
    accent: "#34d399", // Emerald
    complexityTime: "Push/Pop O(1) · Shift O(1)",
    complexitySpace: "O(N) Fixed Capacity Buffer",
    memoryModel: "Sequential Stack Pointer Frame / Ring",
    hardwareInvariant: "Stack pointer register (RSP) bounded increment",
    gridX: 130,
    gridY: -80,
    schematic: {
      label: "STACK_POINTER: RSP",
      items: ["RSP+0x18: Frame_Recurse", "RSP+0x08: Frame_Main", "RSP+0x00: Base"],
      highlightIndex: 0
    }
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    category: "hierarchical",
    shortTag: "Tree Hierarchy",
    subtitle: "Recursive Depth & Lowest Common Ancestors",
    description: "Hierarchical branching invariants. Trace balanced BST lookups, preorder/inorder/postorder recursive stack frames, and Euler tour LCA resolutions.",
    url: "https://trees-eight-omega.vercel.app",
    icon: Binary,
    accent: "#fbbf24", // Amber
    complexityTime: "Balanced O(log N) · Worst O(N)",
    complexitySpace: "O(H) Call Stack Depth",
    memoryModel: "Hierarchical Recursive Pointer Nodes",
    hardwareInvariant: "Recursive call stack branch prediction",
    gridX: -130,
    gridY: 80,
    schematic: {
      label: "BST_INVARIANT: Left < Root < Right",
      items: ["Root (50)", "↙ Left: 25", "↘ Right: 75", "↙ 12", "↘ 35"],
      highlightIndex: 0
    }
  },
  {
    id: "graphs",
    index: "05",
    name: "Graphs & Topological Paths",
    category: "topological",
    shortTag: "Topology",
    subtitle: "Adjacency Matrices & Dijkstra Priority Queues",
    description: "Models complex sparse and dense network topologies. Demonstrates BFS/DFS state coloring, topological ordering, and Dijkstra shortest path computation.",
    url: "https://graphs-steel.vercel.app",
    icon: Network,
    accent: "#fb7185", // Rose
    complexityTime: "BFS O(V + E) · Dijkstra O(E log V)",
    complexitySpace: "O(V + E) Adjacency List",
    memoryModel: "Sparse Adjacency Matrix / Heap Pointers",
    hardwareInvariant: "Sparse matrix index lookup locality",
    gridX: 0,
    gridY: 80,
    schematic: {
      label: "ADJACENCY_LIST: |V|=6, |E|=9",
      items: ["Node_1 → [2, 3]", "Node_2 → [4, 5]", "Min-Heap: Dist=4"],
      highlightIndex: 2
    }
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming & DAGs",
    category: "topological",
    shortTag: "DP & Tabulation",
    subtitle: "Memoization Matrices & State Compression",
    description: "Transforms overlapping subproblems into directed acyclic dependency graphs, comparing recursive memoization overhead against iterative 2D tabular arrays.",
    url: "https://dp-sigma-one.vercel.app",
    icon: Cpu,
    accent: "#818cf8", // Indigo
    complexityTime: "Pseudo-polynomial O(N * W)",
    complexitySpace: "O(W) Rolling Array",
    memoryModel: "Contiguous DP Cache / Rolling Array",
    hardwareInvariant: "Cache-conscious inner loop tabulation",
    gridX: 130,
    gridY: 80,
    schematic: {
      label: "TABULATION_CACHE: DP[i][w]",
      items: ["DP[i-1][w]", "vs", "DP[i-1][w-wt] + val", "Rolling: 1D"],
      highlightIndex: 2
    }
  }
];

export default function Home() {
  const [activeId, setActiveId] = useState<string>("arrays");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const reduced = useReducedMotion();

  // Resting isometric angle for the 3D silicon substrate
  const RESTING_PITCH = 48;
  const RESTING_YAW = -22;

  const pitch = useMotionValue(RESTING_PITCH);
  const yaw = useMotionValue(RESTING_YAW);
  const springPitch = useSpring(pitch, { stiffness: 150, damping: 28 });
  const springYaw = useSpring(yaw, { stiffness: 150, damping: 28 });

  const pointerRef = useRef<{
    startX: number;
    startY: number;
    startPitch: number;
    startYaw: number;
    moved: boolean;
  } | null>(null);

  const activeSystem = SYSTEMS.find((s) => s.id === activeId) || SYSTEMS[0];

  const handleSelectSystem = (id: string) => {
    setActiveId(id);
    const target = SYSTEMS.find((s) => s.id === id);
    if (!target) return;

    // Subtly pivot 3D die towards the selected tile
    const deltaX = (target.gridX / 130) * 12;
    const deltaY = (target.gridY / 80) * 8;
    yaw.set(RESTING_YAW - deltaX);
    pitch.set(RESTING_PITCH + deltaY);
  };

  const handleResetAngle = () => {
    yaw.set(RESTING_YAW);
    pitch.set(RESTING_PITCH);
    setActiveId("arrays");
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced || e.button !== 0) return;
    pointerRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPitch: pitch.get(),
      startYaw: yaw.get(),
      moved: false
    };
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerRef.current) return;
    const dx = e.clientX - pointerRef.current.startX;
    const dy = e.clientY - pointerRef.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      pointerRef.current.moved = true;
    }
    // Bounded drag bounds
    const newYaw = Math.max(-50, Math.min(10, pointerRef.current.startYaw + dx * 0.25));
    const newPitch = Math.max(25, Math.min(68, pointerRef.current.startPitch - dy * 0.2));
    yaw.set(newYaw);
    pitch.set(newPitch);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointerRef.current) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    pointerRef.current = null;
  };

  const filteredSystems = SYSTEMS.filter(
    (item) => selectedFilter === "all" || item.category === selectedFilter
  );

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f0f2f7] font-cabinet selection:bg-sky-500/30 selection:text-white relative overflow-x-hidden">
      <OnboardingTour />

      {/* Subtle Hardware Die Trace Watermark */}
      <div
        aria-hidden="true"
        className="fixed top-28 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 text-white/[0.025] font-clash font-bold tracking-[-0.04em] leading-[0.8] text-center whitespace-nowrap"
        style={{ fontSize: "clamp(90px, 18vw, 290px)" }}
      >
        SILICON
      </div>

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07080b]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold shadow-sm">
              DS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-clash font-semibold text-sm tracking-tight text-white">
                  DSA UNIVERSE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
                  v2.5 · TURBOPACK
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono hidden sm:block">Hardware Memory &amp; Algorithm Substrate</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
            >
              <Sparkles size={13} className="text-sky-400" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero & 3D Interactive Architecture Substrate */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10">
        {/* Top Hero Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/[0.06] text-sky-300 text-xs font-mono mb-4">
            <Terminal size={12} />
            <span>HARDWARE-LEVEL ALGORITHM SUBSTRATE</span>
          </div>

          <h1 className="font-clash font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-4">
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-zinc-300">
              Interactive at execution level.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Manipulate the 3D algorithmic die below. Tap any silicon tile to focus its cache lines, pointer structures, and algorithmic invariants.
          </p>
        </div>

        {/* 3-Column Architecture Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Diagnostics Telemetry HUD */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSystem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="silicon-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden"
              >
                {/* Accent Corner Glow */}
                <div
                  className="absolute -top-16 -left-16 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20"
                  style={{ background: activeSystem.accent }}
                />

                {/* Subsystem Identifier */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border font-mono font-bold text-sm shadow-sm"
                      style={{
                        background: `${activeSystem.accent}15`,
                        borderColor: `${activeSystem.accent}35`,
                        color: activeSystem.accent
                      }}
                    >
                      {activeSystem.index}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                        ARCHITECTURE UNIT
                      </span>
                      <span className="text-xs font-mono font-semibold text-zinc-300 capitalize">
                        {activeSystem.category}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                <h2 className="font-clash font-bold text-xl sm:text-2xl text-white mb-1.5 tracking-tight">
                  {activeSystem.name}
                </h2>
                <div className="text-xs font-mono text-sky-400 mb-3">
                  {activeSystem.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                  {activeSystem.description}
                </p>

                {/* Live Micro-Schematic Telemetry Box */}
                <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#07080b] font-mono text-xs mb-6">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 border-b border-white/[0.06] pb-1.5">
                    <span>{activeSystem.schematic.label}</span>
                    <span className="text-emerald-400">HARDWARE VERIFIED</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSystem.schematic.items.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-[11px] border ${
                          idx === activeSystem.schematic.highlightIndex
                            ? "bg-sky-500/15 border-sky-500/40 text-sky-300 font-bold"
                            : "bg-white/[0.02] border-white/[0.06] text-zinc-400"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hardware Invariants */}
                <div className="space-y-2 mb-6 text-xs font-mono">
                  <div className="flex items-center justify-between text-zinc-400 pb-1.5 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Complexity</span>
                    <span className="text-zinc-200">{activeSystem.complexityTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400 pb-1.5 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Hardware Cache</span>
                    <span className="text-zinc-200 truncate max-w-[190px]">{activeSystem.hardwareInvariant}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <Link
                  href={activeSystem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full tactile-button-primary text-xs gap-2"
                >
                  <span>Launch Visualizer</span>
                  <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Middle Column: The 3D Silicon Substrate Die */}
          <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-center">
            <div
              className={`w-full max-w-2xl h-[440px] sm:h-[500px] perspective-stage flex items-center justify-center relative touch-none select-none cursor-grab ${
                isDragging ? "cursor-grabbing" : ""
              }`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* Soft Ground Elliptical Ambient Shadow */}
              <div
                className="absolute w-[440px] h-[300px] rounded-[50%] bg-black/60 blur-2xl pointer-events-none"
                style={{ transform: "rotateX(70deg) translateZ(-60px)" }}
              />

              {/* 3D Silicon Die Substrate */}
              <motion.div
                className="preserve-3d relative w-[360px] sm:w-[420px] h-[260px] sm:h-[280px] rounded-3xl"
                style={{
                  rotateX: reduced ? RESTING_PITCH : springPitch,
                  rotateY: reduced ? RESTING_YAW : springYaw
                }}
              >
                {/* Layered Die Base Slabs (Real Physical Thickness) */}
                <div
                  className="absolute inset-0 rounded-3xl bg-[#0d0f17] border border-white/[0.12] shadow-[0_24px_50px_rgba(0,0,0,0.8)] preserve-3d"
                  style={{ transform: "translateZ(0px)" }}
                >
                  {/* Subtle Printed Circuit Traces */}
                  <div
                    className="absolute inset-4 rounded-2xl opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 10px 10px, #38bdf8 1px, transparent 1px)`,
                      backgroundSize: "24px 24px"
                    }}
                  />
                  <div className="absolute top-3 left-4 font-mono text-[9px] text-zinc-600 tracking-wider">
                    SILICON_SUBSTRATE // CORE_DIE_v2
                  </div>
                </div>

                {/* Layer Contour Rim */}
                <div
                  className="absolute inset-0 rounded-3xl bg-[#090a10] border border-black preserve-3d pointer-events-none"
                  style={{ transform: "translateZ(-8px)" }}
                />
                <div
                  className="absolute inset-0 rounded-3xl bg-[#06070a] border border-black preserve-3d pointer-events-none"
                  style={{ transform: "translateZ(-16px)" }}
                />

                {/* 6 Interactive Algorithm Silicon Tiles laid out on the 3D Die */}
                {SYSTEMS.map((sys) => {
                  const isSelected = activeId === sys.id;
                  const Icon = sys.icon;

                  return (
                    <motion.div
                      key={sys.id}
                      className="absolute preserve-3d cursor-pointer"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: "115px",
                        height: "105px",
                        marginLeft: `${sys.gridX - 57}px`,
                        marginTop: `${sys.gridY - 52}px`
                      }}
                      animate={{
                        z: isSelected ? 38 : 6
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectSystem(sys.id);
                      }}
                    >
                      {/* Tile Face with Tactile Specular Highlight */}
                      <div
                        className={`w-full h-full rounded-2xl p-3 flex flex-col justify-between border transition-all duration-200 select-none ${
                          isSelected
                            ? "bg-[#161a26] border-sky-400 shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
                            : "bg-[#0f1118] border-white/[0.08] hover:border-white/[0.22] hover:bg-[#131620]"
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? `0 0 25px ${sys.accent}30, inset 0 1px 0 rgba(255,255,255,0.2)`
                            : "inset 0 1px 0 rgba(255,255,255,0.06)"
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center border text-xs"
                            style={{
                              background: `${sys.accent}15`,
                              borderColor: `${sys.accent}35`,
                              color: sys.accent
                            }}
                          >
                            <Icon size={14} strokeWidth={1.8} />
                          </div>
                          <span className="font-mono text-[9px] text-zinc-500 font-bold">
                            {sys.index}
                          </span>
                        </div>

                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                            {sys.category}
                          </span>
                          <span className="font-clash font-semibold text-xs text-white block truncate">
                            {sys.name.split("&")[0]}
                          </span>
                        </div>

                        <div className="pt-1 border-t border-white/[0.06] flex items-center justify-between text-[8px] font-mono">
                          <span className="text-zinc-500 truncate max-w-[65px]">{sys.shortTag}</span>
                          <span style={{ color: sys.accent }} className="font-bold">
                            {isSelected ? "ACTIVE" : "VIEW"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Interaction Bar & Quick Switcher */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 px-2 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Grip size={14} />
                <span>Drag in 3D to tilt &middot; Tap tile to focus</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetAngle}
                  className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                >
                  <RotateCcw size={11} />
                  <span>Reset Angle</span>
                </button>
              </div>
            </div>

            {/* Skeuomorphic Category Segmented Filter */}
            <div className="flex items-center gap-1 p-1 rounded-2xl border border-white/[0.08] bg-white/[0.02] mt-6">
              {[
                { id: "all", label: "All Systems" },
                { id: "linear", label: "Sequential RAM" },
                { id: "hierarchical", label: "Hierarchies" },
                { id: "topological", label: "Graphs & DP" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                    selectedFilter === tab.id
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Structural Index Below the Fold */}
        <section className="pt-16 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-clash font-bold text-xl text-white tracking-tight">
                Decoupled Micro-Frontend Architecture
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Independently bundled, hardware-verified algorithm execution apps
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">6 STANDALONE APPS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSystems.map((sys) => {
              const Icon = sys.icon;
              return (
                <a
                  key={sys.id}
                  href={sys.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group silicon-panel rounded-2xl p-6 transition-all hover:border-white/[0.2] flex flex-col justify-between hover:translate-y-[-2px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border font-mono font-bold text-xs"
                        style={{
                          background: `${sys.accent}15`,
                          borderColor: `${sys.accent}35`,
                          color: sys.accent
                        }}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        {sys.category}
                      </span>
                    </div>

                    <h3 className="font-clash font-semibold text-lg text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                      {sys.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-4">
                      {sys.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>{sys.complexityTime.split("·")[0]}</span>
                    <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 font-semibold">
                      Launch App ↗
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050609] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="font-clash font-semibold text-white">DSA UNIVERSE &middot; SILICON ARCHITECTURE</span>
          </div>
          <div>Bespoke Micro-Frontend Ecosystem &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
