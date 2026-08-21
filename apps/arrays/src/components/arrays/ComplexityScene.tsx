"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTATION_EXPLAINERS = [
  {
    symbol: "O",
    title: "What does the \"O\" mean?",
    explanation: "The \"O\" stands for \"Order of\". It comes from mathematics — specifically a concept called asymptotic analysis. When we write O(something), we're saying \"in the worst case, the number of steps this operation takes grows in the ORDER OF something\". It's a shorthand invented by the German mathematician Paul Bachmann in 1894.",
    analogy: "Think of it like describing a road trip. You don't say \"the drive takes exactly 3 hours, 17 minutes, and 42 seconds\". You say \"it's about a 3-hour drive\". Big O is the same idea — we care about the general growth pattern, not the exact count."
  },
  {
    symbol: "n",
    title: "What does \"n\" mean?",
    explanation: "\"n\" simply represents the number of items you're working with. If your array has 5 elements, n = 5. If it has 1,000,000 elements, n = 1,000,000. It's a variable — a placeholder for \"however many things there are\".",
    analogy: "If you have a bookshelf with n books, and someone asks you to find a specific book, n tells you how many books you might have to look through."
  },
  {
    symbol: "O(1)",
    title: "O(1) — Constant Time",
    explanation: "O(1) means the operation takes the same amount of time regardless of how many items exist. Whether your array has 5 elements or 5 billion, this operation takes exactly 1 step. The \"1\" doesn't literally mean one CPU instruction — it means the time doesn't grow with n.",
    analogy: "Opening your front door. Whether your house has 1 room or 100 rooms, opening the front door takes the same effort. You don't need to visit every room first.",
    example: "arr[3] — Accessing index 3. The CPU calculates the exact memory address with simple math: base + (3 × 4 bytes). Done in one jump, no matter how long the array is."
  },
  {
    symbol: "O(n)",
    title: "O(n) — Linear Time",
    explanation: "O(n) means the time grows proportionally with the number of items. Double the items → double the time. If you have 100 items, you might need up to 100 steps. If you have 1,000,000, up to 1,000,000 steps.",
    analogy: "Reading every page of a book to find a specific quote. A 100-page book takes ~100 checks. A 1000-page book takes ~1000 checks. The time scales linearly with the size.",
    example: "arr.indexOf(42) — Searching for 42. In the worst case, 42 is the last element (or not there at all), so you check every single element one by one."
  }
];

const OPERATIONS = [
  { op: "Access [index]", time: "O(1)", desc: "Direct memory addressing. CPU calculates the exact byte position with math: base_address + index × element_size. No scanning needed.", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { op: "Push (append)", time: "O(1)", desc: "Adds to the end of allocated memory. The array already knows where the end is, so it just writes there.", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { op: "Pop (remove last)", time: "O(1)", desc: "Removes the last element. No other elements need to move.", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { op: "Unshift (insert front)", time: "O(n)", desc: "Every single existing element must shift one position to the right to make room at index 0.", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  { op: "Shift (remove front)", time: "O(n)", desc: "After removing index 0, every remaining element must slide left to fill the gap.", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  { op: "Search (unsorted)", time: "O(n)", desc: "No shortcut exists. You must check elements one by one until you find it or reach the end.", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
];

export function ComplexityScene() {
  const [activeTab, setActiveTab] = useState(0);
  const active = NOTATION_EXPLAINERS[activeTab];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-20 px-4 md:px-12 bg-transparent">
      <div className="max-w-5xl w-full">

        {/* Section 1: What does Big O even mean? */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Big O Notation</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">Before memorizing which operation is fast or slow, you need to understand what these symbols actually mean.</p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {NOTATION_EXPLAINERS.map((item, i) => (
            <button
              key={item.symbol}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-lg font-mono font-bold text-sm transition-all border ${activeTab === i
                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white/5 text-white/40 border-white/10 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.symbol}
            </button>
          ))}
        </div>

        {/* Explainer Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-2xl font-bold mb-4">{active.title}</h3>
            <p className="text-white/70 leading-relaxed mb-6">{active.explanation}</p>
            
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5 mb-4">
              <span className="text-yellow-400 text-sm font-bold block mb-2">Real-World Analogy</span>
              <p className="text-white/70 leading-relaxed">{active.analogy}</p>
            </div>

            {active.example && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
                <span className="text-blue-400 text-sm font-bold block mb-2">Code Example</span>
                <p className="text-white/70 font-mono text-sm leading-relaxed">{active.example}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Section 2: Visual Comparison */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-2">The Difference Visually</h3>
          <p className="text-white/50 mb-8">Watch how O(1) stays flat while O(n) grows with data size.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* O(1) Bar Chart */}
            <div className="bg-white/[0.03] border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono font-bold text-green-400 text-lg">O(1)</span>
                <span className="text-white/40 text-sm">Steps taken as array grows</span>
              </div>
              <div className="flex items-end gap-3 h-40">
                {[10, 100, 1000, 10000, 100000].map((n, i) => (
                  <div key={n} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 24 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full bg-green-500/40 rounded-t border border-green-500/30"
                    />
                    <span className="text-[10px] text-white/30 font-mono">{n >= 1000 ? `${n / 1000}k` : n}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-green-400/60 mt-4">Same height = same time. Always 1 step.</p>
            </div>

            {/* O(n) Bar Chart */}
            <div className="bg-white/[0.03] border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono font-bold text-red-400 text-lg">O(n)</span>
                <span className="text-white/40 text-sm">Steps taken as array grows</span>
              </div>
              <div className="flex items-end gap-3 h-40">
                {[10, 100, 1000, 10000, 100000].map((n, i) => (
                  <div key={n} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(i + 1) * 28}px` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full bg-red-500/40 rounded-t border border-red-500/30"
                    />
                    <span className="text-[10px] text-white/30 font-mono">{n >= 1000 ? `${n / 1000}k` : n}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-red-400/60 mt-4">Bars grow taller. More data = more steps.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Array Operations Reference */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Array Operations Cheat Sheet</h3>
          <p className="text-white/50 mb-8">Now that you know what O(1) and O(n) mean, here&apos;s every array operation classified.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPERATIONS.map((item, i) => (
              <motion.div
                key={item.op}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
                className={`${item.bg} border ${item.border} rounded-xl p-5 group hover:scale-[1.02] transition-transform`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">{item.op}</h4>
                  <span className={`font-mono font-bold text-sm px-3 py-1 rounded-full bg-black/30 ${item.color}`}>{item.time}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
