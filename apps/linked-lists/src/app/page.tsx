"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Map, HardDrive, Wrench, Repeat, TerminalSquare, CheckCircle2, ArrowRight } from "lucide-react";

export default function LinkedListsCurriculum() {
  const modules = [
    {
      title: "The Analogy",
      desc: "Understand linked lists through a scavenger hunt — scattered clues connected by directions.",
      href: "/analogy",
      icon: Map,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
      hoverBg: "group-hover:bg-purple-500/10",
      hoverBorder: "group-hover:border-purple-500/50",
      glow: "from-purple-500/20 to-transparent"
    },
    {
      title: "Memory & Pointers",
      desc: "See how nodes scatter across RAM and connect via memory addresses.",
      href: "/memory",
      icon: HardDrive,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      border: "border-pink-400/20",
      hoverBg: "group-hover:bg-pink-500/10",
      hoverBorder: "group-hover:border-pink-500/50",
      glow: "from-pink-500/20 to-transparent"
    },
    {
      title: "Operations",
      desc: "Insert, delete, and traverse — watch pointer rewiring step by step.",
      href: "/operations",
      icon: Wrench,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
      hoverBg: "group-hover:bg-blue-500/10",
      hoverBorder: "group-hover:border-blue-500/50",
      glow: "from-blue-500/20 to-transparent"
    },
    {
      title: "Patterns",
      desc: "Master list reversal and Floyd's cycle detection with animated pointers.",
      href: "/patterns",
      icon: Repeat,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
      hoverBg: "group-hover:bg-green-500/10",
      hoverBorder: "group-hover:border-green-500/50",
      glow: "from-green-500/20 to-transparent"
    },
    {
      title: "Sandbox",
      desc: "Build your own linked list — prepend, append, insert, and delete nodes live.",
      href: "/sandbox",
      icon: TerminalSquare,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
      hoverBg: "group-hover:bg-yellow-500/10",
      hoverBorder: "group-hover:border-yellow-500/50",
      glow: "from-yellow-500/20 to-transparent"
    },
    {
      title: "Knowledge Check",
      desc: "Test your understanding with tricky pointer-tracing and conceptual questions.",
      href: "/quiz",
      icon: CheckCircle2,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20",
      hoverBg: "group-hover:bg-orange-500/10",
      hoverBorder: "group-hover:border-orange-500/50",
      glow: "from-orange-500/20 to-transparent"
    }
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-mono text-sm tracking-[0.2em] text-white/40 mb-6 uppercase">Module 02</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Linked Lists
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Dynamic, scattered, and flexible. Nodes connected by pointers — no contiguous memory needed.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <Link key={mod.title} href={mod.href} className="block outline-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className={`group relative h-full flex flex-col p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 overflow-hidden ${mod.hoverBorder} ${mod.hoverBg}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mod.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${mod.color} group-hover:scale-110 transition-transform duration-500`}>
                      <mod.icon strokeWidth={1.5} size={24} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/30 font-mono">
                      Step 0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{mod.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-8 flex-grow">
                    {mod.desc}
                  </p>
                  <div className="mt-auto">
                    <div className={`inline-flex items-center gap-2 text-sm font-medium ${mod.color}`}>
                      Enter <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
