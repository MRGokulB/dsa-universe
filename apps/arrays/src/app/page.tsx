"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Cpu, BarChart, TerminalSquare, SearchCode, CheckCircle2 } from "lucide-react";

export default function ArraysCurriculum() {
  const modules = [
    {
      title: "1. The Analogy",
      desc: "Understand the core concept through a real-world bookshelf metaphor.",
      href: "/analogy",
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      title: "2. Memory & Hardware",
      desc: "Dive into the silicon. See how RAM slots map to array indices.",
      href: "/memory",
      icon: Cpu,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20"
    },
    {
      title: "3. Big O Complexity",
      desc: "The theory behind the speed. Why inserting is O(n) but accessing is O(1).",
      href: "/big-o",
      icon: BarChart,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20"
    },
    {
      title: "4. Interactive Sandbox",
      desc: "Push, pop, shift, and unshift elements yourself to see the cascading effects.",
      href: "/sandbox",
      icon: TerminalSquare,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20"
    },
    {
      title: "5. Algorithmic Patterns",
      desc: "Master Two Pointers & Sliding Window through step-by-step visualizations.",
      href: "/patterns",
      icon: SearchCode,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20"
    },
    {
      title: "6. Knowledge Check",
      desc: "Test your understanding with a quick interactive quiz.",
      href: "/quiz",
      icon: CheckCircle2,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      border: "border-pink-400/20"
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-24 px-8 bg-[#09090b] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl w-full z-10">
        <div className="mb-16">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Arrays</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            The fundamental building block of all data structures. Contiguous, rigid, and lightning fast if used correctly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <Link key={mod.title} href={mod.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`h-full p-6 rounded-2xl border ${mod.border} bg-white/[0.02] hover:bg-white/[0.04] transition-colors group relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${mod.bg} blur-[50px] -mr-16 -mt-16 group-hover:bg-opacity-20 transition-all`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${mod.bg} border ${mod.border} flex items-center justify-center mb-6`}>
                    <mod.icon className={mod.color} size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
