"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Layers,
  LayoutList,
  Network,
  Cpu,
  Database,
  Binary,
  Sparkles,
  Code2,
  Terminal,
  Activity,
  Compass,
  Boxes,
  Workflow
} from "lucide-react";
import { OnboardingTour } from "../components/OnboardingTour";

type Category = "all" | "linear" | "hierarchical" | "optimization";

interface ModuleData {
  id: string;
  moduleNumber: string;
  title: string;
  category: "linear" | "hierarchical" | "optimization";
  tagline: string;
  description: string;
  url: string;
  icon: typeof Layers;
  specs: string[];
  complexity: string;
  memoryModel: string;
  isFeatured?: boolean;
  schematicType: "array" | "list" | "stack" | "tree" | "graph" | "dp";
}

const MODULES: ModuleData[] = [
  {
    id: "arrays",
    moduleNumber: "MOD_01",
    title: "Contiguous Memory & Arrays",
    category: "linear",
    tagline: "Silicon-level contiguous allocations, pointer arithmetic, and window slices",
    description: "Explore L1/L2 cache locality, static versus dynamic buffer resizing, two-pointer convergence, and the sliding window optimization pattern with zero abstractions.",
    url: "https://arrays-rho.vercel.app",
    icon: Layers,
    specs: ["L1/L2 Cache Lines", "Two-Pointer O(N)", "Sliding Window", "Amortized O(1)"],
    complexity: "Time: O(1) Access / O(N) Insertion",
    memoryModel: "Flat Contiguous Buffer (RAM Offset)",
    isFeatured: true,
    schematicType: "array"
  },
  {
    id: "linked-lists",
    moduleNumber: "MOD_02",
    title: "Linked Lists & Node Pointers",
    category: "linear",
    tagline: "Heap-allocated node chains, pointer rewiring, and Floyd cycle detection",
    description: "Inspect non-contiguous pointer traversal, fast and slow runner mechanics, in-place node reversal, and memory cycle isolation in real time.",
    url: "https://linked-lists-xi.vercel.app/",
    icon: LayoutList,
    specs: ["Non-Contiguous Nodes", "Floyd's Tortoise-Hare", "In-Place Reversal"],
    complexity: "Time: O(N) Search / O(1) Insertion",
    memoryModel: "Dispersed Heap References",
    schematicType: "list"
  },
  {
    id: "stacks-queues",
    moduleNumber: "MOD_03",
    title: "Call Stacks & Buffers",
    category: "linear",
    tagline: "LIFO execution frames, FIFO queues, ring buffers, and monotonic sequences",
    description: "Simulate thread execution frames, hardware call stack overflows, circular ring-buffer boundary wraps, and monotonic stack search techniques.",
    url: "https://stacks-queues.vercel.app",
    icon: Database,
    specs: ["Execution Frames", "Circular Ring Buffer", "Monotonic Invariant"],
    complexity: "Time: O(1) Push/Pop / O(1) Shift",
    memoryModel: "Sequential Stack / Fixed Window Buffer",
    schematicType: "stack"
  },
  {
    id: "trees",
    moduleNumber: "MOD_04",
    title: "Binary Trees & Hierarchies",
    category: "hierarchical",
    tagline: "Recursive depth exploration, BST invariants, and lowest common ancestors",
    description: "Trace binary tree balancing, DFS preorder/inorder/postorder call mechanics, BFS level-order rings, and Euler tour ancestor resolutions.",
    url: "https://trees-eight-omega.vercel.app",
    icon: Binary,
    specs: ["BST Invariants", "LCA Euler Resolution", "DFS/BFS Traversal"],
    complexity: "Time: O(log N) Balanced / O(N) Degenerate",
    memoryModel: "Recursive Pointer Hierarchy",
    schematicType: "tree"
  },
  {
    id: "graphs",
    moduleNumber: "MOD_05",
    title: "Graph Networks & Topology",
    category: "optimization",
    tagline: "Adjacency matrices, topological ordering, and Dijkstra shortest paths",
    description: "Visualize sparse and dense adjacency lists, cycle detection via graph coloring, strongly connected components, and min-heap Dijkstra paths.",
    url: "https://graphs-steel.vercel.app",
    icon: Network,
    specs: ["Adjacency Matrix/List", "Dijkstra Priority Heap", "Topological Sort"],
    complexity: "Time: O(V + E) BFS / O((V+E) log V)",
    memoryModel: "Sparse Adjacency Heap Pointers",
    schematicType: "graph"
  },
  {
    id: "dp",
    moduleNumber: "MOD_06",
    title: "Dynamic Programming & DAGs",
    category: "optimization",
    tagline: "Optimal substructure, memoization caches, and bottom-up tabulation",
    description: "Map overlapping subproblems into directed acyclic dependency graphs, compare top-down memoization overhead to space-optimized iterative tabulation.",
    url: "https://dp-sigma-one.vercel.app",
    icon: Cpu,
    specs: ["2D Tabulation Grid", "State Compression", "0/1 Knapsack Solver"],
    complexity: "Time: O(N * W) Pseudo-polynomial",
    memoryModel: "Contiguous DP Cache / Circular Rolling Array",
    schematicType: "dp"
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredModules = MODULES.filter(
    (mod) => activeCategory === "all" || mod.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f2f4f8] selection:bg-indigo-500/30 selection:text-white font-sans antialiased relative">
      <OnboardingTour />

      {/* Structural Engineering Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.08),transparent_80%)]" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07080b]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-indigo-400">
              <Boxes size={18} strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold tracking-wider text-white">DSA UNIVERSE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 hidden sm:block">Hardware-Level Algorithm Mechanics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
            >
              <Sparkles size={13} className="text-indigo-400" />
              <span>System Tour</span>
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

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/[0.06] text-indigo-300 text-xs font-mono mb-8">
            <Terminal size={13} />
            <span>ALGORITHM ARCHITECTURE &middot; RUNTIME EXECUTOR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Understand Algorithms <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Down to Memory Silicon.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            Ditch generic pseudo-code animations. Inspect data structures through hardware-conscious execution: contiguous RAM layout, L1/L2 cache locality, pointer arithmetic, and algorithmic cycle detection.
          </p>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto p-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm text-left">
            <div className="p-3 border-r border-white/[0.06] last:border-r-0">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Monorepo Arch</span>
              <span className="font-mono text-sm font-semibold text-zinc-200">6 Micro-Frontends</span>
            </div>
            <div className="p-3 border-r border-white/[0.06] last:border-r-0">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Target Scope</span>
              <span className="font-mono text-sm font-semibold text-indigo-300">O(1) to O(V+E)</span>
            </div>
            <div className="p-3 border-r border-white/[0.06] last:border-r-0">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Memory Profiling</span>
              <span className="font-mono text-sm font-semibold text-emerald-400">Direct Heap &amp; Stack</span>
            </div>
            <div className="p-3">
              <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Execution Pipeline</span>
              <span className="font-mono text-sm font-semibold text-zinc-200">Turbopack / Next.js</span>
            </div>
          </div>
        </section>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-indigo-400" />
            <h2 className="text-sm font-mono font-semibold tracking-wider text-white uppercase">Execution Modules</h2>
            <span className="font-mono text-xs text-zinc-500">({filteredModules.length} Active)</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/[0.08] bg-white/[0.02]">
            {(
              [
                { id: "all", label: "All Modules" },
                { id: "linear", label: "Linear" },
                { id: "hierarchical", label: "Hierarchies" },
                { id: "optimization", label: "Graphs & DP" }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === tab.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredModules.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`group relative rounded-2xl border border-white/[0.08] bg-[#0c0d12] hover:bg-[#111218] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.35)] ${
                    item.isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-indigo-300 group-hover:scale-105 group-hover:border-indigo-500/30 transition-all">
                            <Icon size={20} strokeWidth={1.7} />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-zinc-500 tracking-wider block">{item.moduleNumber}</span>
                            <span className="font-mono text-xs text-zinc-300 capitalize">{item.category} Structure</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>ONLINE</span>
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Schematic Visualizer Preview */}
                      <div className="mb-6 p-3.5 rounded-xl border border-white/[0.06] bg-[#08090d] font-mono text-[11px] text-zinc-400">
                        {item.schematicType === "array" && (
                          <div>
                            <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 border-b border-white/[0.05] pb-1">
                              <span>0x7FFE00 · L1 CONTIGUOUS SLICE</span>
                              <span className="text-indigo-400">Pointers: i=2, j=4</span>
                            </div>
                            <div className="grid grid-cols-6 gap-1 text-center font-bold">
                              {["[12]", "[24]", "[36]*", "[48]", "[60]*", "[72]"].map((cell, idx) => (
                                <div
                                  key={idx}
                                  className={`py-1.5 rounded border ${
                                    idx === 2 || idx === 4
                                      ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-200"
                                      : "border-white/[0.08] bg-white/[0.02] text-zinc-400"
                                  }`}
                                >
                                  {cell}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.schematicType === "list" && (
                          <div className="flex items-center justify-between gap-1 text-center">
                            <div className="px-2 py-1.5 rounded border border-white/[0.08] bg-white/[0.02]">Head: Node_A</div>
                            <span className="text-zinc-600">→</span>
                            <div className="px-2 py-1.5 rounded border border-indigo-500/40 bg-indigo-500/15 text-indigo-200">Node_B (slow)</div>
                            <span className="text-zinc-600">→</span>
                            <div className="px-2 py-1.5 rounded border border-white/[0.08] bg-white/[0.02]">Node_C (fast)</div>
                          </div>
                        )}

                        {item.schematicType === "stack" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-zinc-500">
                              <span>Top of Stack</span>
                              <span className="text-emerald-400">LIFO Invariant</span>
                            </div>
                            <div className="p-1 rounded border border-indigo-500/30 bg-indigo-500/10 text-center text-indigo-300">
                              frame_recurse(depth: 3)
                            </div>
                            <div className="p-1 rounded border border-white/[0.06] bg-white/[0.02] text-center text-zinc-500">
                              frame_main(args: [])
                            </div>
                          </div>
                        )}

                        {item.schematicType === "tree" && (
                          <div className="text-center space-y-1">
                            <div className="inline-block px-2.5 py-0.5 rounded border border-indigo-500/40 bg-indigo-500/10 text-indigo-300">
                              Root: 50
                            </div>
                            <div className="flex justify-around text-zinc-500 text-[10px]">
                              <span>↙ L: 25</span>
                              <span>↘ R: 75</span>
                            </div>
                          </div>
                        )}

                        {item.schematicType === "graph" && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-500">Adj Matrix: V=6, E=9</span>
                            <span className="text-indigo-300">Dijkstra Min-Heap Verified</span>
                          </div>
                        )}

                        {item.schematicType === "dp" && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-500">Memo Tabulation [N][W]</span>
                            <span className="text-emerald-400">Space O(W) Optimized</span>
                          </div>
                        )}
                      </div>

                      {/* Technical Specs Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.specs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/[0.06] bg-white/[0.02] text-zinc-400"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500">{item.complexity}</div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate max-w-[200px] sm:max-w-xs">{item.memoryModel}</div>
                      </div>

                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shrink-0 shadow-sm"
                      >
                        <span>Launch</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Engineering Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050608] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>DSA UNIVERSE PLATFORM &middot; TURBOPACK MONOREPO</span>
          </div>
          <div>Crafted for Hardware-Conscious Computer Science</div>
        </div>
      </footer>
    </div>
  );
}
