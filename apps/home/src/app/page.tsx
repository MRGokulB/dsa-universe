"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const topics = [
  {
    id: "arrays",
    title: "Arrays",
    status: "live",
    url: "https://arrays-oo2gwqfix-gokul-boddawars-projects.vercel.app",
    description: "Contiguous memory, O(1) access, Two Pointers, Sliding Window.",
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    badge: "bg-green-500",
    number: "01"
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    status: "coming",
    url: "#",
    description: "Dynamic nodes, pointer traversal, reversal, and cycle detection.",
    color: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/20",
    badge: "bg-yellow-500",
    number: "02"
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    status: "coming",
    url: "#",
    description: "LIFO, FIFO, monotonic stacks, BFS patterns.",
    color: "from-pink-500/20 to-pink-600/5",
    border: "border-pink-500/20",
    badge: "bg-yellow-500",
    number: "03"
  },
  {
    id: "trees",
    title: "Trees",
    status: "coming",
    url: "#",
    description: "BST, DFS, BFS, level-order, height, and path problems.",
    color: "from-green-500/20 to-green-600/5",
    border: "border-green-500/20",
    badge: "bg-yellow-500",
    number: "04"
  },
  {
    id: "graphs",
    title: "Graphs",
    status: "coming",
    url: "#",
    description: "Adjacency lists, BFS, DFS, Dijkstra, and Union-Find.",
    color: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/20",
    badge: "bg-yellow-500",
    number: "05"
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    status: "coming",
    url: "#",
    description: "Memoization, tabulation, knapsack, LCS, LIS.",
    color: "from-red-500/20 to-red-600/5",
    border: "border-red-500/20",
    badge: "bg-yellow-500",
    number: "06"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-24 max-w-3xl"
        >
          <span className="text-sm font-mono text-white/30 mb-4 block tracking-widest uppercase">Data Structures & Algorithms</span>
          <h1 className="text-6xl font-bold tracking-tighter mb-6 leading-none">
            Learn DSA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Visually.
            </span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed max-w-xl">
            Each topic is a dedicated interactive experience. No walls of text. Step-by-step animations, real code, real explanations.
          </p>
        </motion.div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic, i) => {
            const isLive = topic.status === "live";
            const Card = (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={isLive ? { scale: 1.02 } : {}}
                className={`group relative p-6 rounded-2xl border bg-gradient-to-br ${topic.color} ${topic.border} ${isLive ? "cursor-pointer" : "cursor-default opacity-60"} overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-4xl font-bold text-white/5">{topic.number}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${isLive ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-400" : "bg-white/30"}`} />
                    {isLive ? "Live" : "Coming Soon"}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
                <p className="text-sm text-white/50 leading-relaxed">{topic.description}</p>

                {isLive && (
                  <div className="mt-6 flex items-center gap-2 text-sm text-blue-400 font-medium group-hover:gap-3 transition-all">
                    Start Learning <span>→</span>
                  </div>
                )}
              </motion.div>
            );

            return isLive ? (
              <Link key={topic.id} href={topic.url} target="_blank" rel="noopener noreferrer">
                {Card}
              </Link>
            ) : (
              <div key={topic.id}>{Card}</div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
