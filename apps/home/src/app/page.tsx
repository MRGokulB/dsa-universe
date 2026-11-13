"use client";

import { useState } from "react";
import Link from "next/link";
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

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-28 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-[11px] font-mono tracking-widest text-[#64748b] uppercase mb-3">
            INTERACTIVE ALGORITHM STUDIO &middot; 2026
          </span>

          <h1
            className="font-clash font-semibold text-[#0f172a] tracking-[-0.035em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(38px, 4.5vw, 68px)" }}
          >
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              Interactive hardware execution.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#475569] max-w-lg mx-auto mt-4 font-normal leading-relaxed">
            Examine contiguous cache lines, heap node mutations, and call stack frames across 6 dedicated interactive visualizers.
          </p>
        </div>

        {/* Responsive Hero Layout: Expansive 3D Centerpiece + Dedicated Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Main 3D Stage Column */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <SiliconCrucible3D
              activeId={activeId}
              onSelectModule={(id) => setActiveId(id)}
            />

            {/* Clean Horizontal System Selector Dock */}
            <div className="w-full max-w-2xl mt-4 flex items-center justify-center flex-wrap gap-2 p-2 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
              {MODULE_SYSTEMS.map((mod) => {
                const isSelected = activeId === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveId(mod.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-black text-white shadow-xs font-semibold"
                        : "text-[#475569] hover:bg-black/[0.04] hover:text-black"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: mod.chipColor }}
                    />
                    <span>{mod.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] text-[#64748b] font-mono mt-3 tracking-wide">
              ::: Drag to find your angle &middot; Click any card to focus
            </span>
          </div>

          {/* Dedicated High-Clarity Inspector Card */}
          <div className="lg:col-span-4">
            <div className="rounded-[24px] bg-white border border-black/[0.08] p-7 shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/[0.05] text-[#0f172a] font-semibold">
                    SYSTEM {activeModule.index}
                  </span>
                  <span className="text-xs text-[#64748b] font-mono">
                    {activeModule.category}
                  </span>
                </div>
                <div
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: activeModule.chipColor }}
                />
              </div>

              <h2 className="font-clash font-bold text-2xl text-[#0f172a] mb-2 leading-tight">
                {activeModule.name}
              </h2>

              <p className="text-sm text-[#475569] leading-relaxed mb-6 font-normal">
                {activeModule.tagline}
              </p>

              <div className="space-y-4 pt-5 border-t border-black/[0.06] mb-7">
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
              </div>

              <a
                href={activeModule.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-xs font-clash font-semibold bg-[#0f172a] !text-white hover:bg-black transition-all cursor-pointer shadow-sm"
              >
                <span className="!text-white">Launch {activeModule.name}</span>
                <ArrowUpRight size={14} className="!text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Catalog Section */}
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
                      <div className="w-9 h-9 rounded-xl bg-black/[0.04] text-[#0f172a] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
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
