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
import SpatialObservatory, { REALM_SYSTEMS, AlgorithmRealmMeta } from "../components/SpatialObservatory";
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
            COMPUTATIONAL OBSERVATORY &middot; 2026
          </span>

          <h1
            className="font-clash font-semibold text-[#0f172a] tracking-[-0.035em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(36px, 4.2vw, 64px)" }}
          >
            Algorithms in Architecture. <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              A spatial computational observatory.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#52525b] max-w-lg mx-auto mt-4 font-normal leading-relaxed">
            Six focused interactive visualizers exploring physical memory bus layouts, pointer invariants, and asymptotic computational bounds.
          </p>
        </div>

        {/* Spatial Observatory Stage */}
        <SpatialObservatory
          activeId={activeId}
          onSelectRealm={(id) => setActiveId(id)}
        />

        {/* Architectural Directory Index */}
        <section className="pt-12 border-t border-black/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] block mb-1">
                SYSTEM REGISTRY
              </span>
              <h2 className="font-clash font-semibold text-2xl text-[#0f172a]">
                All 6 Computational Domains
              </h2>
            </div>
            <span className="text-xs font-mono text-[#71717a]">
              6 DEPLOYED MICRO-APPLICATIONS
            </span>
          </div>

          <div className="divide-y divide-black/[0.06] border-y border-black/[0.06] bg-white rounded-2xl shadow-xs overflow-hidden">
            {REALM_SYSTEMS.map((item) => {
              const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Layers;
              const isSelected = item.id === activeId;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected ? "bg-black/[0.02]" : "hover:bg-black/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#71717a] w-6">
                      {item.index}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-black/[0.04] text-[#18181b] flex items-center justify-center">
                      <IconComp size={15} />
                    </div>
                    <div>
                      <h3 className="font-clash font-semibold text-sm text-[#0f172a] leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xs text-[#71717a] font-sans">
                        {item.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:justify-end">
                    <span className="text-xs font-mono text-[#52525b] hidden md:inline">
                      {item.complexity}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/[0.1] text-xs font-medium text-[#18181b] hover:bg-black hover:text-white transition-all shadow-2xs whitespace-nowrap"
                    >
                      <span>Open Realm</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
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
