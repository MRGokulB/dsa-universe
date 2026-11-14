"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  Code2
} from "lucide-react";
import SiliconCrucible3D, { MODULE_SYSTEMS } from "../components/SiliconCrucible3D";
import { OnboardingTour } from "../components/OnboardingTour";

const SYSTEM_ICONS = {
  arrays: Layers,
  "linked-lists": LayoutList,
  "stacks-queues": Database,
  trees: Binary,
  graphs: Network,
  dp: Cpu
};

export default function Home() {
  const [activeId, setActiveId] = useState<string>("arrays");
  const activeModule = MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];
  const ActiveIcon = SYSTEM_ICONS[activeModule.id as keyof typeof SYSTEM_ICONS] || Layers;

  return (
    <div className="min-h-screen bg-[#090c13] text-[#f1f5f9] font-cabinet selection:bg-sky-500/20 selection:text-sky-300 relative overflow-x-hidden">
      <OnboardingTour />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.1),transparent_70%)]" />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#090c13]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-clash font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              DS
            </div>
            <div>
              <span className="font-clash font-semibold text-sm tracking-tight text-white block">
                DSA UNIVERSE
              </span>
              <span className="text-[11px] text-[#94a3b8] block font-normal">
                Hardware Memory &amp; Algorithm Visualizer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white hover:text-black transition-all text-xs font-medium text-[#e2e8f0] cursor-pointer"
            >
              <Sparkles size={13} className="text-sky-400" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white hover:text-black transition-all text-xs font-medium text-[#e2e8f0]"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-28 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          <span className="inline-block text-[11px] font-mono tracking-widest text-[#94a3b8] uppercase mb-2 sm:mb-3">
            INTERACTIVE ALGORITHM STUDIO &middot; 2026
          </span>

          <h1 className="font-clash font-semibold text-white tracking-tight leading-[1.08] text-center text-3xl sm:text-5xl md:text-6xl">
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-sky-200">
              Interactive hardware execution.
            </span>
          </h1>

          <p className="text-xs sm:text-base text-[#94a3b8] max-w-lg mx-auto mt-3 sm:mt-4 font-normal leading-relaxed">
            Orbit the tactile 3D topic cards. Examine contiguous cache lines, heap node mutations, and call stack frames across 6 dedicated visualizers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-20">
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-wider text-[#94a3b8] uppercase block mb-1">
              CHOOSE A SYSTEM
            </span>

            {MODULE_SYSTEMS.map((mod) => {
              const isSelected = activeId === mod.id;
              const IconComp = SYSTEM_ICONS[mod.id as keyof typeof SYSTEM_ICONS] || Layers;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveId(mod.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? "bg-[#141b2a] border-sky-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                      : "bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? "bg-white text-black" : "bg-white/[0.06] text-[#cbd5e1]"
                      }`}
                    >
                      <IconComp size={18} />
                    </div>
                    <div>
                      <span className="font-clash font-semibold text-sm text-white block">
                        {mod.name}
                      </span>
                      <span className="text-xs font-mono text-[#94a3b8] block">
                        {mod.category}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center w-full">
            <SiliconCrucible3D
              activeId={activeId}
              onSelectModule={(id) => setActiveId(id)}
            />

            <span className="text-[11px] text-[#64748b] font-mono mt-2 tracking-wide text-center">
              ::: Drag to find your angle &middot; Click topic card to focus
            </span>
          </div>

          <div className="lg:col-span-4 order-3 w-full">
            <div className="rounded-[24px] bg-[#101522] border border-white/[0.08] p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/[0.08] text-white font-semibold">
                        SYSTEM {activeModule.index}
                      </span>
                      <span className="text-xs text-[#94a3b8] font-mono">
                        {activeModule.category}
                      </span>
                    </div>
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: activeModule.accent, color: activeModule.accent }}
                    />
                  </div>

                  <h2 className="font-clash font-bold text-xl sm:text-2xl text-white mb-2 leading-tight">
                    {activeModule.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-5 sm:mb-6 font-normal">
                    {activeModule.tagline}
                  </p>

                  <div className="space-y-3.5 sm:space-y-4 pt-4 sm:pt-5 border-t border-white/[0.06] mb-6 sm:mb-7">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                        ASYMPTOTIC COMPLEXITY
                      </span>
                      <span className="text-xs font-mono font-semibold text-white">
                        {activeModule.complexity}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                        MEMORY TOPOLOGY
                      </span>
                      <span className="text-xs font-mono font-medium text-[#e2e8f0]">
                        {activeModule.memory}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                        SCHEMATIC INVARIANT
                      </span>
                      <span
                        className="text-xs font-mono font-medium block"
                        style={{ color: activeModule.accent }}
                      >
                        {activeModule.glyph}
                      </span>
                    </div>
                  </div>

                  <a
                    href={activeModule.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 rounded-xl text-xs font-clash font-semibold bg-white !text-black hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                  >
                    <span className="!text-black">Launch {activeModule.name}</span>
                    <ArrowUpRight size={14} className="!text-black" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <section className="pt-16 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#94a3b8] block mb-1">
                STANDALONE SIMULATORS
              </span>
              <h2 className="font-clash font-semibold text-2xl text-white">
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
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-[22px] bg-[#101522] border border-white/[0.06] hover:border-white/[0.2] hover:bg-[#141b2c] hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <IconComp size={16} />
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#94a3b8]">
                        MODULE {item.index}
                      </span>
                    </div>

                    <h3 className="font-clash font-semibold text-base text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                      {item.tagline}
                    </p>

                    <div className="py-2 px-3 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] font-mono text-[#cbd5e1] mb-4">
                      {item.complexity}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-white">
                    <span>Open Visualizer</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#07090e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="font-clash font-semibold text-white">
              DSA UNIVERSE
            </span>
          </div>
          <div>Bespoke Architectural Experience &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
