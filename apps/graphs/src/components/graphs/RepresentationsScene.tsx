"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Table, ListFilter, Cpu, HardDrive } from "lucide-react";

const VERTICES = ["A", "B", "C", "D"];

const MATRIX = [
  [0, 1, 1, 0],
  [1, 0, 1, 1],
  [1, 1, 0, 0],
  [0, 1, 0, 0]
];

const ADJ_LIST = {
  A: ["B", "C"],
  B: ["A", "C", "D"],
  C: ["A", "B"],
  D: ["B"]
};

export default function RepresentationsScene() {
  const [view, setView] = useState<"list" | "matrix">("list");
  const [selectedVertex, setSelectedVertex] = useState<string | null>("B");

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 02 &middot; Memory Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Adjacency Matrix vs List
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            How your machine represents connections determines whether edge lookups take O(1) time or waste gigabytes of sparse memory.
          </p>
        </div>

        <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs transition-all ${
              view === "list"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <ListFilter className="w-4 h-4" />
            Adjacency List (Standard)
          </button>
          <button
            onClick={() => setView("matrix")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs transition-all ${
              view === "matrix"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Table className="w-4 h-4" />
            Adjacency Matrix (Dense)
          </button>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                {view === "list" ? "Hash Map / Pointer Array" : "V x V 2D Coordinate Grid"}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {view === "list" ? "Space: O(V + E)" : "Space: O(V²)"}
              </span>
            </div>

            {view === "list" ? (
              <div className="w-full space-y-3 font-mono text-xs">
                {VERTICES.map((v) => {
                  const isSelected = selectedVertex === v;
                  return (
                    <div
                      key={v}
                      onClick={() => setSelectedVertex(v)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white">
                        {v}
                      </div>
                      <span className="text-white/40">&rarr;</span>
                      <div className="flex gap-2">
                        {ADJ_LIST[v as keyof typeof ADJ_LIST].map((neighbor) => (
                          <div
                            key={neighbor}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold"
                          >
                            {neighbor}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center overflow-x-auto p-4">
                <div className="grid grid-cols-5 gap-2 font-mono text-xs text-center">
                  <div className="w-10 h-10 flex items-center justify-center text-white/40 font-bold">/</div>
                  {VERTICES.map((col) => (
                    <div key={col} className="w-10 h-10 flex items-center justify-center text-emerald-400 font-bold">
                      {col}
                    </div>
                  ))}

                  {VERTICES.map((row, rIdx) => (
                    <div key={row} className="contents">
                      <div className="w-10 h-10 flex items-center justify-center text-emerald-400 font-bold">
                        {row}
                      </div>
                      {MATRIX[rIdx].map((val, cIdx) => (
                        <div
                          key={cIdx}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-all ${
                            val === 1
                              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                              : "bg-white/[0.02] border-white/5 text-white/20"
                          }`}
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-4">
              Complexity Comparison
            </span>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 text-white font-bold mb-2">
                  <HardDrive className="w-4 h-4 text-emerald-400" /> Memory Footprint
                </div>
                <p className="text-white/60 leading-relaxed font-sans text-xs">
                  Adjacency lists only allocate pointers for existing edges. An Adjacency Matrix must allocate a full V x V matrix regardless of sparsity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 text-white font-bold mb-2">
                  <Cpu className="w-4 h-4 text-cyan-400" /> Edge Verification Time
                </div>
                <p className="text-white/60 leading-relaxed font-sans text-xs">
                  Checking if edge (u, v) exists: Matrix takes <span className="text-cyan-300 font-mono">O(1)</span> via direct index <code className="text-cyan-300">matrix[u][v]</code>. List requires <span className="text-emerald-300 font-mono">O(deg(u))</span> iteration through neighbors.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-white/80 font-bold mb-1">When to Use Which:</div>
                <p className="text-white/50 leading-relaxed font-sans text-xs">
                  Use <strong className="text-emerald-300">Adjacency List</strong> for 95% of real-world graphs (sparse networks, maps). Use <strong className="text-cyan-300">Adjacency Matrix</strong> for small, dense graphs where edge lookups dominate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
