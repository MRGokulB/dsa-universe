"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  Code2,
  RotateCcw
} from "lucide-react";
import SiliconCrucible3D, { MODULE_SYSTEMS, AlgorithmModuleMeta } from "../components/SiliconCrucible3D";
import { OnboardingTour } from "../components/OnboardingTour";

const SYSTEM_ICONS = {
  arrays: Layers,
  "linked-lists": LayoutList,
  "stacks-queues": Database,
  trees: Binary,
  graphs: Network,
  dp: Cpu
};

const DSA_TAG_CHIPS = [
  { label: "O(1)", modId: "arrays" },
  { label: "CacheLines", modId: "arrays" },
  { label: "Pointers", modId: "linked-lists" },
  { label: "FloydCycle", modId: "linked-lists" },
  { label: "RSPStack", modId: "stacks-queues" },
  { label: "RingBuffer", modId: "stacks-queues" },
  { label: "BST", modId: "trees" },
  { label: "Dijkstra", modId: "graphs" },
  { label: "Lattice", modId: "dp" },
  { label: "Tabulation", modId: "dp" }
];

function SpotlightBentoCard({ item, IconComp }: { item: AlgorithmModuleMeta; IconComp: any }) {
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 rounded-[24px] bg-white border border-black/[0.08] hover:border-black/[0.22] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[24px]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.08), transparent 75%)`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-clash font-semibold text-sm transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}` }}
          >
            <IconComp size={18} />
          </div>
          <span className="text-[10px] font-mono uppercase text-[#64748b] tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04]">
            MODULE {item.index}
          </span>
        </div>

        <h3 className="font-clash font-semibold text-base text-[#0f172a] mb-1.5 group-hover:text-black transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-[#475569] leading-relaxed mb-4">
          {item.tagline}
        </p>

        <div className="py-2 px-3 rounded-lg bg-[#f8f9fa] border border-black/[0.04] text-[11px] font-mono text-[#475569] mb-4 flex items-center justify-between">
          <span className="truncate">{item.complexity.split("·")[0].trim()}</span>
          <span className="text-[10px] text-[#94a3b8]">{item.category}</span>
        </div>
      </div>

      <div className="relative z-10 pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#0f172a]">
        <span>Open Visualizer</span>
        <ArrowUpRight
          size={14}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </a>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState<string>("arrays");

  const activeModule = useMemo<AlgorithmModuleMeta>(() => {
    return MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#fafafb] text-[#0f172a] font-cabinet selection:bg-sky-100 selection:text-black relative overflow-x-hidden">
      <OnboardingTour />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(241,245,249,0.95),transparent_75%)]" />

      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fafafb]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-clash font-bold text-sm shadow-sm">
              DS
            </div>
            <div>
              <span className="font-clash font-semibold text-sm tracking-tight text-[#0f172a] block">
                DSA UNIVERSE
              </span>
              <span className="text-[11px] text-[#64748b] block font-normal">
                Hardware Memory &amp; Algorithm Visualizer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all text-xs font-medium text-[#0f172a] shadow-xs cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all text-xs font-medium text-[#0f172a] shadow-xs"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-28 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38b6ff]" />
            <span className="text-[11px] font-mono tracking-widest text-[#0f172a] uppercase font-semibold">
              ALGORITHM HARDWARE ARCHITECTURE WORKBENCH &middot; 2026
            </span>
          </div>

          <h1 className="font-clash font-semibold text-[#0f172a] tracking-tight leading-[1.08] text-center text-3xl sm:text-5xl md:text-6xl">
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              Interactive hardware execution.
            </span>
          </h1>

          <p className="text-xs sm:text-base text-[#475569] max-w-xl mx-auto mt-3 sm:mt-4 font-normal leading-relaxed">
            Interactive memory architecture workbench. Inspect contiguous cache line strides, heap pointer dereferences, recursive call stack frames, and dynamic programming tabulation across 6 dedicated visualizers.
          </p>
        </div>

        <section className="relative w-full rounded-[36px] bg-gradient-to-b from-white to-[#f4f6fa] border border-black/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.06)] overflow-hidden mb-24 p-4 sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none">
            <span className="font-clash font-bold text-[15vw] sm:text-[13vw] tracking-tighter text-black/[0.038] uppercase leading-none whitespace-nowrap">
              ALGORITHMS
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-end">
              <div className="p-4 sm:p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-mono tracking-wider text-[#64748b] uppercase">
                    CHOOSE A SYSTEM
                  </span>
                  <span className="text-[10px] font-mono text-sky-600 font-semibold">
                    6 SYSTEMS
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto no-scrollbar pr-0.5">
                  {MODULE_SYSTEMS.map((mod) => {
                    const isSelected = activeId === mod.id;
                    const IconComp = SYSTEM_ICONS[mod.id as keyof typeof SYSTEM_ICONS] || Layers;

                    return (
                      <button
                        key={mod.id}
                        onClick={() => setActiveId(mod.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? "bg-[#0f172a] text-white border-[#0f172a] shadow-xs"
                            : "bg-[#f8f9fa] text-[#0f172a] border-black/[0.04] hover:bg-white hover:border-black/[0.12]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 transition-colors ${
                              isSelected ? "bg-white text-black" : "text-black"
                            }`}
                            style={{ backgroundColor: isSelected ? "#ffffff" : mod.chipColor }}
                          >
                            <IconComp size={14} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="block text-xs font-semibold font-clash leading-snug">
                              {mod.name}
                            </span>
                            <span
                              className={`block text-[10px] font-mono ${
                                isSelected ? "text-slate-300" : "text-[#64748b]"
                              }`}
                            >
                              {mod.category}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0 ml-1.5 shadow-[0_0_8px_#38b6ff]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center">
              <SiliconCrucible3D
                activeId={activeId}
                onSelectModule={(id) => setActiveId(id)}
              />
            </div>

            <div className="lg:col-span-3 order-3 flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="rounded-[24px] bg-white/95 backdrop-blur-xl border border-black/[0.08] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] flex flex-col gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/[0.06] text-[#0f172a] font-semibold">
                          SYSTEM {activeModule.index}
                        </span>
                        <span className="text-xs text-[#64748b] font-mono">
                          {activeModule.category}
                        </span>
                      </div>
                      <div
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: activeModule.accent, color: activeModule.accent }}
                      />
                    </div>

                    <h2 className="font-clash font-bold text-lg text-[#0f172a] leading-tight mb-1">
                      {activeModule.name}
                    </h2>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {activeModule.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-black/[0.06]">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                        ASYMPTOTIC COMPLEXITY
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#0f172a]">
                        {activeModule.complexity}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                        MEMORY TOPOLOGY
                      </span>
                      <span className="text-xs font-mono font-medium text-[#0f172a]">
                        {activeModule.memory}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-1">
                        SCHEMATIC INVARIANT
                      </span>
                      <div className="py-2 px-3 rounded-xl bg-[#0b0c10] text-sky-300 font-mono text-[11px] border border-black/10 overflow-x-auto no-scrollbar">
                        {activeModule.glyph}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-2">
                    <a
                      href={activeModule.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="keycap-btn-black w-full text-xs px-4 flex items-center justify-between"
                    >
                      <span>Launch {activeModule.shortTitle}</span>
                      <div className="flex items-center gap-1.5">
                        <ArrowUpRight size={14} />
                        <span className="text-[10px] opacity-60 font-mono">⏎</span>
                      </div>
                    </a>

                    <button
                      onClick={() => setActiveId("arrays")}
                      className="keycap-btn-white w-full text-xs px-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <RotateCcw size={13} />
                        <span>Reset To Arrays</span>
                      </div>
                      <span className="text-[10px] opacity-60 font-mono">↺</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-black/[0.05]">
                    <span className="text-[10px] font-mono uppercase text-[#94a3b8] block mb-1.5">
                      INTERACTIVE HOTKEYS
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {DSA_TAG_CHIPS.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveId(chip.modId)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                            activeId === chip.modId
                              ? "bg-sky-400 text-black font-semibold shadow-xs"
                              : "bg-[#f1f3f7] text-[#475569] hover:bg-slate-200"
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="pt-16 border-t border-black/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#64748b] block mb-1">
                STANDALONE SIMULATORS
              </span>
              <h2 className="font-clash font-semibold text-2xl text-[#0f172a]">
                All 6 Dedicated Visualizers
              </h2>
            </div>
            <span className="text-xs font-mono text-[#64748b]">
              6 MICRO-FRONTENDS DEPLOYED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULE_SYSTEMS.map((item) => {
              const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Layers;
              return (
                <SpotlightBentoCard
                  key={item.id}
                  item={item}
                  IconComp={IconComp}
                />
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.06] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="font-clash font-semibold text-[#0f172a]">
              DSA UNIVERSE
            </span>
          </div>
          <div>Bespoke Kinetic Architectural Experience &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}