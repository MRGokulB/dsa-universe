"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, LayoutList, Network, Cpu, Database, Binary } from "lucide-react";

export default function Home() {
  const modules = [
    {
      id: "arrays",
      title: "Arrays",
      status: "live",
      url: "https://arrays-rho.vercel.app",
      description: "Contiguous memory, O(1) access, Two Pointers, Sliding Window.",
      color: "blue",
      icon: Layers,
    },
    {
      id: "linked-lists",
      title: "Linked Lists",
      status: "coming",
      url: "#",
      description: "Dynamic nodes, pointer traversal, reversal, and cycle detection.",
      color: "purple",
      icon: LayoutList,
    },
    {
      id: "stacks-queues",
      title: "Stacks & Queues",
      status: "coming",
      url: "#",
      description: "LIFO, FIFO, monotonic stacks, BFS patterns.",
      color: "pink",
      icon: Database,
    },
    {
      id: "trees",
      title: "Trees",
      status: "coming",
      url: "#",
      description: "BST, DFS, BFS, level-order, height, and path problems.",
      color: "green",
      icon: Binary,
    },
    {
      id: "graphs",
      title: "Graphs",
      status: "coming",
      url: "#",
      description: "Adjacency lists, BFS, DFS, Dijkstra, and Union-Find.",
      color: "orange",
      icon: Network,
    },
    {
      id: "dp",
      title: "Dynamic Programming",
      status: "coming",
      url: "#",
      description: "Memoization, tabulation, knapsack, LCS, LIS.",
      color: "red",
      icon: Cpu,
    },
  ];

  const getColorStyles = (color: string) => {
    const styles: Record<string, { bg: string, border: string, text: string, glow: string }> = {
      blue: { bg: "group-hover:bg-blue-500/10", border: "group-hover:border-blue-500/50", text: "text-blue-400", glow: "from-blue-500/20 to-transparent" },
      purple: { bg: "group-hover:bg-purple-500/10", border: "group-hover:border-purple-500/50", text: "text-purple-400", glow: "from-purple-500/20 to-transparent" },
      pink: { bg: "group-hover:bg-pink-500/10", border: "group-hover:border-pink-500/50", text: "text-pink-400", glow: "from-pink-500/20 to-transparent" },
      green: { bg: "group-hover:bg-green-500/10", border: "group-hover:border-green-500/50", text: "text-green-400", glow: "from-green-500/20 to-transparent" },
      orange: { bg: "group-hover:bg-orange-500/10", border: "group-hover:border-orange-500/50", text: "text-orange-400", glow: "from-orange-500/20 to-transparent" },
      red: { bg: "group-hover:bg-red-500/10", border: "group-hover:border-red-500/50", text: "text-red-400", glow: "from-red-500/20 to-transparent" }
    };
    return styles[color];
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-mono text-sm tracking-[0.2em] text-white/40 mb-6 uppercase">Data Structures & Algorithms</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Learn DSA <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Visually.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Every topic is a dedicated, interactive experience. No walls of text. <br className="hidden md:block" />
              Just step-by-step animations, real code, and crystal clear explanations.
            </p>
          </motion.div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => {
            const isLive = mod.status === "live";
            const styles = getColorStyles(mod.color);

            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className={`group relative h-full flex flex-col p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 overflow-hidden ${isLive ? styles.border + " " + styles.bg : "opacity-60 grayscale hover:grayscale-0"}`}
              >
                {/* Glow effect on hover */}
                {isLive && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${isLive ? styles.text : "text-white/40"} group-hover:scale-110 transition-transform duration-500`}>
                      <mod.icon strokeWidth={1.5} size={24} />
                    </div>
                    {isLive ? (
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]`}>
                        Live
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/30">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{mod.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-8 flex-grow">
                    {mod.description}
                  </p>

                  <div className="mt-auto">
                    {isLive ? (
                      <div className={`inline-flex items-center gap-2 text-sm font-medium ${styles.text}`}>
                        Start Learning <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-white/20">
                        In Development
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return isLive ? (
              <Link key={mod.id} href={mod.url} className="block outline-none">
                {CardContent}
              </Link>
            ) : (
              <div key={mod.id} className="cursor-not-allowed">
                {CardContent}
              </div>
            );
          })}
        </div>
        
      </main>
    </div>
  );
}
