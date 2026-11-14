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
    <div className="min-h-screen bg-[#fafafb] text-[#0f172a] font-cabinet selection:bg-slate-200 selection:text-black relative overflow-x-hidden">
      <OnboardingTour />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(241,245,249,0.9),transparent_75%)]" />

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
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          <span className="inline-block text-[11px] font-mono tracking-widest text-[#64748b] uppercase mb-2 sm:mb-3">
            INTERACTIVE ALGORITHM STUDIO &middot; 2026
          </span>

          <h1 className="font-clash font-semibold text-[#0f172a] tracking-tight leading-[1.08] text-center text-3xl sm:text-5xl md:text-6xl">
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              Interactive hardware execution.
            </span>
          </h1>

          <p className="text-xs sm:text-base text-[#475569] max-w-lg mx-auto mt-3 sm:mt-4 font-normal leading-relaxed">
            Orbit the tactile 3D topic cards. Examine contiguous cache lines, heap node mutations, and call stack frames across 6 dedicated visualizers.
          </p>
        </div>

        <section className="relative w-full rounded-[32px] bg-gradient-to-b from-white to-[#f4f6fa] border border-black/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.06)] overflow-hidden mb-24 min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
          <div className="relative z-20 flex items-center justify-between w-full pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] text-[11px] font-mono text-[#475569] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>COMPUTATIONAL CRUCIBLE &middot; 3D STAGE</span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#64748b] bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/[0.06]">
              6 TACTILE MODULES &middot; 36&deg; VIEW
            </span>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <SiliconCrucible3D
              activeId={activeId}
              onSelectModule={(id) => setActiveId(id)}
            />
          </div>

          <div className="relative z-20 w-full flex flex-col lg:flex-row items-end lg:items-end justify-between gap-4 pointer-events-none mt-auto">
            <div className="w-full lg:w-auto pointer-events-auto flex flex-col items-start gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/[0.08] shadow-[0_12px_28px_rgba(0,0,0,0.06)] overflow-x-auto no-scrollbar max-w-full">
                {MODULE_SYSTEMS.map((mod) => {
                  const isSelected = activeId === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setActiveId(mod.id)}
                      className="relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 z-10"
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="dsa-active-pill"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          className="absolute inset-0 bg-black rounded-xl -z-10 shadow-xs"
                        />
                      )}
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: mod.chipColor }}
                      />
                      <span className={isSelected ? "text-white font-semibold" : "text-[#475569] hover:text-black"}>
                        {mod.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              <span className="text-[10px] sm:text-[11px] text-[#64748b] font-mono tracking-wide px-1">
                ::: Drag stage to orbit &middot; Click any card to inspect
              </span>
            </div>

            <div className="w-full sm:max-w-md pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="rounded-[24px] bg-white/92 backdrop-blur-xl border border-black/[0.08] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/[0.05] text-[#0f172a] font-semibold">
                        SYSTEM {activeModule.index}
                      </span>
                      <span className="text-xs text-[#64748b] font-mono">
                        {activeModule.category}
                      </span>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: activeModule.chipColor }}
                    />
                  </div>

                  <h2 className="font-clash font-bold text-lg sm:text-xl text-[#0f172a] mb-1 leading-tight">
                    {activeModule.name}
                  </h2>

                  <p className="text-xs text-[#475569] leading-relaxed mb-4 font-normal">
                    {activeModule.tagline}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-3.5 border-t border-black/[0.06] mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                        COMPLEXITY
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#0f172a]">
                        {activeModule.complexity.split("·")[0].trim()}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-0.5">
                        TOPOLOGY
                      </span>
                      <span className="text-xs font-mono font-medium text-[#0f172a] truncate block">
                        {activeModule.memory.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  <a
                    href={activeModule.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-clash font-semibold bg-[#0f172a] !text-white hover:bg-black transition-all cursor-pointer shadow-sm"
                  >
                    <span className="!text-white">Launch {activeModule.name}</span>
                    <ArrowUpRight size={14} className="!text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
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
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-[22px] bg-white border border-black/[0.06] hover:border-black/[0.18] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-clash font-semibold text-sm transition-colors"
                        style={{ backgroundColor: `${item.chipColor}` }}
                      >
                        <IconComp size={16} />
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748b]">
                        MODULE {item.index}
                      </span>
                    </div>

                    <h3 className="font-clash font-semibold text-base text-[#0f172a] mb-1.5 group-hover:text-black">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed mb-4">
                      {item.tagline}
                    </p>

                    <div className="py-2 px-3 rounded-lg bg-[#f8f9fa] border border-black/[0.04] text-[11px] font-mono text-[#475569] mb-4">
                      {item.complexity}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#0f172a]">
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

      <footer className="border-t border-black/[0.06] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="font-clash font-semibold text-[#0f172a]">
              DSA UNIVERSE
            </span>
          </div>
          <div>Bespoke Architectural Experience &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
