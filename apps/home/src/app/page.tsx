"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, LayoutList, Network, Cpu, Database, Binary, Sparkles, Code2, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- Ambient Background --- */}
      {/* Deep background mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none mix-blend-screen" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center">
        
        {/* --- Hero Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full max-w-4xl mx-auto mb-20 md:mb-32 mt-16 md:mt-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono font-medium text-white/70 uppercase tracking-widest">Next-Gen Learning</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
            Master DSA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_40px_rgba(96,165,250,0.4)]">
              Visually.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            Stop staring at walls of text. Understand data structures through cinematic, step-by-step interactive animations and real code execution.
          </p>
        </motion.div>

        {/* --- Bento Grid Modules --- */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* FEATURED: Arrays (Spans 2 cols, 2 rows on large screens) */}
          <Link href="https://arrays-rho.vercel.app" className="group block md:col-span-2 lg:col-span-2 md:row-span-2 outline-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full min-h-[400px] flex flex-col justify-between p-8 md:p-10 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-blue-400/50 hover:shadow-[0_0_80px_rgba(59,130,246,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
              {/* Internal glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Header */}
              <div className="relative z-10 flex justify-between items-start mb-12">
                <div className="p-4 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Layers strokeWidth={1.5} size={32} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider">Live Now</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">Arrays</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
                  Master contiguous memory, pointer arithmetic, two-pointer techniques, and the sliding window pattern visually.
                </p>
                <div className="inline-flex items-center gap-3 text-sm font-bold text-black bg-white px-6 py-3 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Start Learning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative Code bg */}
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rotate-[-5deg]">
                <Code2 size={250} strokeWidth={0.5} />
              </div>
            </motion.div>
          </Link>

          {/* Linked Lists (Live Card) */}
          <Link href="https://linked-lists.vercel.app" className="block outline-none">
            <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <LayoutList strokeWidth={1.5} size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Live</span>
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Linked Lists</h3>
                <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  Dynamic nodes, pointer reversal, and Floyd's cycle detection.
                </p>
              </div>
            </div>
          </Link>

          {/* Stacks & Queues (Standard Card) */}
          <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md opacity-70 grayscale cursor-not-allowed overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50">
                <Database strokeWidth={1.5} size={24} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-white/10 text-white/40">Upcoming</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Stacks & Queues</h3>
              <p className="text-sm text-white/40 leading-relaxed">LIFO, FIFO, monotonic stacks, BFS traversal patterns.</p>
            </div>
          </div>

          {/* Trees (Standard Card) */}
          <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md opacity-70 grayscale cursor-not-allowed overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50">
                <Binary strokeWidth={1.5} size={24} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-white/10 text-white/40">Upcoming</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Trees</h3>
              <p className="text-sm text-white/40 leading-relaxed">BSTs, DFS/BFS, height, and complex path problems.</p>
            </div>
          </div>

          {/* Graphs (Standard Card) */}
          <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md opacity-70 grayscale cursor-not-allowed overflow-hidden md:col-span-2 lg:col-span-2">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50">
                <Network strokeWidth={1.5} size={24} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-white/10 text-white/40">Upcoming</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Graphs</h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-sm">Adjacency lists, Dijkstra's algorithm, topological sorts, and Union-Find visualizers.</p>
            </div>
          </div>

          {/* Dynamic Programming (Standard Card) */}
          <div className="group relative p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md opacity-70 grayscale cursor-not-allowed overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50">
                <Cpu strokeWidth={1.5} size={24} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-white/10 text-white/40">Upcoming</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Dynamic Prog.</h3>
              <p className="text-sm text-white/40 leading-relaxed">Memoization, tabulation, knapsack, and sequence matching.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
