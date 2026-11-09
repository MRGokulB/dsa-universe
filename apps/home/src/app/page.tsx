"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  LayoutList,
  Network,
  Cpu,
  Database,
  Binary,
  Sparkles,
  Code2,
  RotateCcw,
  Grip,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Play,
  Boxes
} from "lucide-react";
import { OnboardingTour } from "../components/OnboardingTour";

interface AlgorithmModule {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  url: string;
  icon: typeof Layers;
  accent: string;
  borderAccent: string;
  bgAccent: string;
  complexity: string;
  memoryModel: string;
  keyTopics: string[];
  schematic: string;
}

const MODULES: AlgorithmModule[] = [
  {
    id: "arrays",
    num: "01",
    name: "Arrays",
    subtitle: "Contiguous Memory & Two Pointers",
    tagline: "Silicon-level contiguous allocations & cache lines",
    description: "Explore L1/L2 cache line locality, static vs dynamic buffer expansion, two-pointer convergence, and sliding window optimization.",
    url: "https://arrays-rho.vercel.app",
    icon: Layers,
    accent: "#06b6d4",
    borderAccent: "rgba(6,182,212,0.4)",
    bgAccent: "rgba(6,182,212,0.08)",
    complexity: "Access O(1) · Search O(N)",
    memoryModel: "Flat Contiguous RAM Buffer",
    keyTopics: ["L1/L2 Locality", "Two-Pointers", "Sliding Window", "Amortized O(1)"],
    schematic: "0x7FFE [ 12 | 24 | 36 | 48 | 60 ]"
  },
  {
    id: "linked-lists",
    num: "02",
    name: "Linked Lists",
    subtitle: "Heap Chains & Pointer Rewiring",
    tagline: "Dispersed heap allocation & cycle detection",
    description: "Trace non-contiguous heap node references, pointer mutations, in-place node reversal, and Floyd's fast/slow cycle isolation.",
    url: "https://linked-lists-xi.vercel.app/",
    icon: LayoutList,
    accent: "#a855f7",
    borderAccent: "rgba(168,85,247,0.4)",
    bgAccent: "rgba(168,85,247,0.08)",
    complexity: "Insert O(1) · Traversal O(N)",
    memoryModel: "Dispersed Heap Node References",
    keyTopics: ["Pointer Rewiring", "Floyd's Tortoise-Hare", "In-Place Reversal"],
    schematic: "[ Node A ] → [ Node B ] → [ Node C ]"
  },
  {
    id: "stacks-queues",
    num: "03",
    name: "Stacks & Queues",
    subtitle: "Call Frames & Ring Buffers",
    tagline: "LIFO execution frames & FIFO pipelines",
    description: "Simulate thread execution call stacks, stack overflow thresholds, circular ring buffers, and monotonic search techniques.",
    url: "https://stacks-queues.vercel.app",
    icon: Database,
    accent: "#10b981",
    borderAccent: "rgba(16,185,129,0.4)",
    bgAccent: "rgba(16,185,129,0.08)",
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memoryModel: "Sequential Call Stack / Ring Buffer",
    keyTopics: ["Execution Frames", "Circular Ring Buffer", "Monotonic Invariant"],
    schematic: "Top → [ Frame_3 ] | [ Frame_2 ] | [ Base ]"
  },
  {
    id: "trees",
    num: "04",
    name: "Trees",
    subtitle: "Hierarchies & Recursive Depths",
    tagline: "BST invariants & lowest common ancestors",
    description: "Inspect binary tree balance properties, recursive preorder/inorder/postorder call mechanics, BFS levels, and Euler tour LCA resolution.",
    url: "https://trees-eight-omega.vercel.app",
    icon: Binary,
    accent: "#f59e0b",
    borderAccent: "rgba(245,158,11,0.4)",
    bgAccent: "rgba(245,158,11,0.08)",
    complexity: "Search O(log N) · Traversal O(N)",
    memoryModel: "Recursive Pointer Hierarchy",
    keyTopics: ["BST Balancing", "DFS/BFS Traversal", "Euler LCA Resolution"],
    schematic: "Root(50) ↙ L(25) ↘ R(75)"
  },
  {
    id: "graphs",
    num: "05",
    name: "Graphs",
    subtitle: "Topology & Shortest Paths",
    tagline: "Adjacency matrices & topological ordering",
    description: "Visualize sparse and dense adjacency matrices, graph coloring cycle detection, strongly connected components, and min-heap Dijkstra paths.",
    url: "https://graphs-steel.vercel.app",
    icon: Network,
    accent: "#f43f5e",
    borderAccent: "rgba(244,63,94,0.4)",
    bgAccent: "rgba(244,63,94,0.08)",
    complexity: "BFS/DFS O(V + E) · Dijkstra O((V+E)logV)",
    memoryModel: "Sparse Adjacency Heap List",
    keyTopics: ["Adjacency Matrix", "Dijkstra Priority Queue", "Topological Sort"],
    schematic: "V=6, E=9 | Shortest Path Computed"
  },
  {
    id: "dp",
    num: "06",
    name: "Dynamic Prog.",
    subtitle: "Memoization & Tabulation",
    tagline: "Overlapping subproblems & DAG states",
    description: "Map overlapping subproblems into directed acyclic dependency graphs, comparing top-down recursive memoization to iterative 2D tabulation.",
    url: "https://dp-sigma-one.vercel.app",
    icon: Cpu,
    accent: "#3b82f6",
    borderAccent: "rgba(59,130,246,0.4)",
    bgAccent: "rgba(59,130,246,0.08)",
    complexity: "Time: O(N * W) · Space: O(W)",
    memoryModel: "2D Tabulation Grid / Rolling Array",
    keyTopics: ["Memoization Cache", "State Compression", "0/1 Knapsack Solver"],
    schematic: "Table[i][w] = max(take, leave)"
  }
];

const RADIUS = 280;

export default function Home() {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const reduced = useReducedMotion();

  const yaw = useMotionValue(0);
  const pitch = useMotionValue(8);
  const springYaw = useSpring(yaw, { stiffness: 140, damping: 26 });
  const springPitch = useSpring(pitch, { stiffness: 140, damping: 26 });

  const pointerRef = useRef<{
    startX: number;
    startY: number;
    startYaw: number;
    startPitch: number;
    moved: boolean;
  } | null>(null);

  const activeModule = MODULES[active];

  // Rotate to specific module
  const selectModule = (index: number) => {
    setActive(index);
    setAutoRotate(false);
    // Angle to bring module to front (facing angle = 0)
    const targetAngle = -index * 60;
    yaw.set(targetAngle);
    pitch.set(8);
  };

  const handleNext = () => {
    selectModule((active + 1) % MODULES.length);
  };

  const handlePrev = () => {
    selectModule((active - 1 + MODULES.length) % MODULES.length);
  };

  // Pointer drag for 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    if (reduced || e.button !== 0) return;
    pointerRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startYaw: yaw.get(),
      startPitch: pitch.get(),
      moved: false
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerRef.current) return;
    const dx = e.clientX - pointerRef.current.startX;
    const dy = e.clientY - pointerRef.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      pointerRef.current.moved = true;
    }
    yaw.set(pointerRef.current.startYaw + dx * 0.4);
    pitch.set(Math.max(-20, Math.min(25, pointerRef.current.startPitch - dy * 0.25)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerRef.current) return;
    setIsDragging(false);
    if (!pointerRef.current.moved) {
      // Click without drag
    } else {
      // Find nearest module index to current yaw
      const currentYaw = yaw.get();
      const rawIndex = Math.round(-currentYaw / 60);
      const normalizedIndex = ((rawIndex % MODULES.length) + MODULES.length) % MODULES.length;
      setActive(normalizedIndex);
    }
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    pointerRef.current = null;
  };

  // Gentle idle rotation effect
  useEffect(() => {
    if (!autoRotate || reduced || isDragging) return;
    const interval = setInterval(() => {
      yaw.set(yaw.get() - 0.4);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, reduced, isDragging, yaw]);

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f4f5f8] font-sans antialiased relative selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      <OnboardingTour />

      {/* Structural Engineering Blueprint Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(6,182,212,0.07),transparent_70%)]" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07080b]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Boxes size={18} strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold tracking-wider text-white">DSA UNIVERSE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                  SPATIAL 3D
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 hidden sm:block">Hardware-Level Algorithm Visualizer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>Interactive Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main 3D Experience */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Top Hero Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/[0.06] text-cyan-300 text-[11px] font-mono mb-4">
            <Terminal size={12} />
            <span>INTERACTIVE 3D ALGORITHM UNIVERSE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            Algorithm Mechanics <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              In Spatial 3D Dimensions.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-normal">
            Drag the 3D core to rotate algorithms in space. Select any module to inspect contiguous memory allocations, cache locality, and runtime mechanics.
          </p>
        </div>

        {/* 3D Core Stage & HUD Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Active Module Frosted Glass HUD */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-white/[0.12] bg-[#0c0d14]/90 backdrop-blur-xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden"
              >
                {/* Accent glow corner */}
                <div
                  className="absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-25"
                  style={{ background: activeModule.accent }}
                />

                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        background: activeModule.bgAccent,
                        borderColor: activeModule.borderAccent,
                        color: activeModule.accent
                      }}
                    >
                      <activeModule.icon size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                        MODULE {activeModule.num}
                      </span>
                      <span className="font-mono text-xs font-semibold text-zinc-300">
                        {activeModule.name}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                  {activeModule.subtitle}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                  {activeModule.description}
                </p>

                {/* Algorithmic Blueprint Box */}
                <div className="p-3 rounded-xl border border-white/[0.08] bg-[#07080c] font-mono text-xs text-zinc-300 mb-6">
                  <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Schematic Preview</div>
                  <div className="text-cyan-300 truncate font-semibold">{activeModule.schematic}</div>
                </div>

                {/* Specs Pill List */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-1.5 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Complexity</span>
                    <span className="text-zinc-200">{activeModule.complexity}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-1.5 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Memory</span>
                    <span className="text-zinc-200 truncate max-w-[180px]">{activeModule.memoryModel}</span>
                  </div>
                </div>

                {/* CTA Action Button */}
                <Link
                  href={activeModule.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-md group"
                >
                  <span>Launch Visualizer</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                {/* Traversal Controls */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] transition-colors"
                      aria-label="Previous Module"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] transition-colors"
                      aria-label="Next Module"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => selectModule(0)}
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <RotateCcw size={12} />
                    <span>Reset Angle</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: 3D Algorithm Ring Stage */}
          <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-center">
            <div
              className={`w-full max-w-2xl h-[420px] sm:h-[480px] flex items-center justify-center perspective-stage relative select-none touch-none cursor-grab ${
                isDragging ? "cursor-grabbing" : ""
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Subtle Ground Radial Glow */}
              <div
                className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ background: activeModule.accent }}
              />

              {/* 3D Ring Container */}
              <motion.div
                className="preserve-3d relative w-[210px] h-[270px] flex items-center justify-center"
                style={{
                  rotateY: reduced ? 0 : springYaw,
                  rotateX: reduced ? 0 : springPitch
                }}
              >
                {MODULES.map((mod, idx) => {
                  const Icon = mod.icon;
                  const angle = idx * 60;
                  const isCurrent = active === idx;

                  return (
                    <motion.div
                      key={mod.id}
                      className={`absolute inset-0 rounded-2xl preserve-3d border backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#11121c]/95 border-white/[0.3] shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                          : "bg-[#0c0d14]/75 border-white/[0.08] hover:border-white/[0.2] opacity-80"
                      }`}
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) ${
                          isCurrent ? "scale3d(1.08, 1.08, 1.08)" : ""
                        }`,
                        boxShadow: isCurrent ? `0 0 30px ${mod.bgAccent}` : undefined
                      }}
                      onClick={() => selectModule(idx)}
                    >
                      {/* Card Content Header */}
                      <div className="flex items-center justify-between">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center border text-sm"
                          style={{
                            background: mod.bgAccent,
                            borderColor: mod.borderAccent,
                            color: mod.accent
                          }}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                        </div>
                        <span className="font-mono text-[10px] text-zinc-500 font-bold">
                          {mod.num}
                        </span>
                      </div>

                      {/* Card Center Info */}
                      <div className="my-auto">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                          ALGORITHM
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {mod.name}
                        </h3>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-snug">
                          {mod.tagline}
                        </p>
                      </div>

                      {/* Card Mini Footprint */}
                      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-zinc-500">
                        <span>{mod.keyTopics[0]}</span>
                        <span
                          className="font-bold"
                          style={{ color: mod.accent }}
                        >
                          EXPLORE ↗
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Interaction Bar & Quick Selectors */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 px-2 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Grip size={14} />
                <span>Drag in 3D to spin algorithms</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all flex items-center gap-1.5 ${
                    autoRotate
                      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                      : "border-white/[0.08] hover:bg-white/[0.04] text-zinc-400"
                  }`}
                >
                  <Play size={11} className={autoRotate ? "animate-spin" : ""} />
                  <span>Auto-Orbit</span>
                </button>
              </div>
            </div>

            {/* Quick Algorithm Chip Navigator */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-6">
              {MODULES.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => selectModule(idx)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                    active === idx
                      ? "bg-white text-black font-semibold border-white shadow-sm"
                      : "bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: mod.accent }}
                  />
                  <span>{mod.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Section Below 3D Hero */}
        <section className="pt-16 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-mono font-semibold tracking-wider text-white uppercase">
                All 6 Algorithm Systems
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Decoupled micro-frontend architecture for computer science mastery
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">6 MODULES DEPLOYED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    selectModule(idx);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="group p-5 rounded-2xl border border-white/[0.06] bg-[#0a0b10] hover:bg-[#0e0f16] hover:border-white/[0.14] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border text-xs"
                        style={{
                          background: mod.bgAccent,
                          borderColor: mod.borderAccent,
                          color: mod.accent
                        }}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold">{mod.num}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                      {mod.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {mod.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>{mod.complexity.split("·")[0]}</span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      View in 3D →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050608] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>DSA UNIVERSE PLATFORM &middot; SPATIAL 3D ARCHITECTURE</span>
          </div>
          <div>Interactive Hardware-Level Computer Science</div>
        </div>
      </footer>
    </div>
  );
}
