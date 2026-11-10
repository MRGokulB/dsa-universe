"use client";

import { useState, useMemo } from "react";
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
import AlgorithmicMatrix3D, { REALM_SYSTEMS, AlgorithmRealmMeta } from "../components/AlgorithmicMatrix3D";
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

  const activeRealm = useMemo<AlgorithmRealmMeta>(() => {
    return REALM_SYSTEMS.find((m) => m.id === activeId) || REALM_SYSTEMS[0];
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#fafafb] text-[#18181b] font-cabinet selection:bg-slate-200 selection:text-black relative overflow-x-hidden">
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
              <span className="text-[11px] text-[#71717a] block font-normal">
                Spatial Algorithm &amp; Data Structure Architecture
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all text-xs font-medium text-[#18181b] shadow-xs cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-white hover:bg-black hover:text-white transition-all text-xs font-medium text-[#18181b] shadow-xs"
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
          <span className="inline-block text-[11px] font-mono tracking-widest text-[#71717a] uppercase mb-3">
            SPATIAL ALGORITHM ARCHITECTURE &middot; 2026
          </span>

          <h1
            className="font-clash font-semibold text-[#0f172a] tracking-[-0.035em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(38px, 4.5vw, 68px)" }}
          >
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              Spatial computation matrix.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#52525b] max-w-lg mx-auto mt-4 font-normal leading-relaxed">
            Examine computational complexity, cache lines, and algorithmic pointer invariants. Navigate across 6 core hardware-aligned domains to launch their dedicated interactive visualizers.
          </p>
        </div>

        {/* Spatial 3D Algorithmic Gateway */}
        <div className="mb-20">
          <AlgorithmicMatrix3D
            activeId={activeId}
            onSelectRealm={(id) => setActiveId(id)}
          />
        </div>

        {/* Selected Realm Telemetry Dossier */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="rounded-[28px] bg-white border border-black/[0.08] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-black/[0.05] text-[#18181b] font-semibold">
                  REALM {activeRealm.index} · ACTIVE
                </span>
                <span className="text-xs font-mono text-[#71717a]">
                  {activeRealm.category}
                </span>
              </div>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activeRealm.accent }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
              <div className="md:col-span-7">
                <h2 className="font-clash font-bold text-2xl text-[#0f172a] mb-2 leading-tight">
                  {activeRealm.name}
                </h2>
                <p className="text-sm text-[#52525b] leading-relaxed mb-6 font-normal">
                  {activeRealm.overview}
                </p>

                <div className="p-3 rounded-xl bg-[#f8f9fa] border border-black/[0.05] font-mono text-xs text-[#18181b] mb-4">
                  <span className="text-[10px] text-[#71717a] block uppercase mb-1">Hardware Schematic</span>
                  <code className="text-emerald-700 font-medium">{activeRealm.schematic}</code>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.01]">
                    <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-1">
                      ASYMPTOTIC COMPLEXITY
                    </span>
                    <span className="text-xs font-mono font-medium text-[#18181b]">
                      {activeRealm.complexity}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.01]">
                    <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-1">
                      MEMORY ARCHITECTURE
                    </span>
                    <span className="text-xs font-mono font-medium text-[#18181b]">
                      {activeRealm.topology}
                    </span>
                  </div>
                </div>

                <a
                  href={activeRealm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-clash font-semibold bg-[#18181b] !text-white hover:bg-black transition-all cursor-pointer shadow-sm"
                >
                  <span className="!text-white">Launch {activeRealm.name}</span>
                  <ArrowUpRight size={14} className="!text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* All 6 Dedicated Standalone Visualizers Catalog */}
        <section className="pt-16 border-t border-black/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] block mb-1">
                STANDALONE APPLICATIONS
              </span>
              <h2 className="font-clash font-semibold text-2xl text-[#0f172a]">
                All 6 Dedicated Visualizers
              </h2>
            </div>
            <span className="text-xs font-mono text-[#71717a]">
              6 MICRO-FRONTENDS DEPLOYED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REALM_SYSTEMS.map((item) => {
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
                      <div className="w-9 h-9 rounded-xl bg-black/[0.04] text-[#18181b] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <IconComp size={16} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono uppercase text-[#71717a]">
                          DIE {item.index}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-clash font-semibold text-base text-[#0f172a] mb-1.5 group-hover:text-black">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#52525b] leading-relaxed mb-4">
                      {item.tagline}
                    </p>

                    <div className="py-2 px-3 rounded-lg bg-[#f8f9fa] border border-black/[0.04] text-[11px] font-mono text-[#52525b] mb-4">
                      {item.complexity}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#18181b]">
                    <span>Open Standalone Visualizer</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
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
