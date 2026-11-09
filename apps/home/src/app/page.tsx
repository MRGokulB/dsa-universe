"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Grip
} from "lucide-react";
import AlgorithmPrism3D, { ALGORITHM_FACETS } from "../components/AlgorithmPrism3D";
import { OnboardingTour } from "../components/OnboardingTour";

export default function Home() {
  const [activeId, setActiveId] = useState<string>("arrays");
  const activeFacet = ALGORITHM_FACETS.find((f) => f.id === activeId) || ALGORITHM_FACETS[0];

  return (
    <div className="min-h-screen bg-[#fafafb] text-[#18181b] font-cabinet selection:bg-slate-200 selection:text-black relative overflow-x-hidden flex flex-col justify-between">
      <OnboardingTour />

      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fafafb]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-clash font-bold text-sm shadow-xs">
              DS
            </div>
            <div>
              <span className="font-clash font-semibold text-sm tracking-tight text-[#0f172a] block">
                DSA UNIVERSE
              </span>
              <span className="text-[11px] text-[#71717a] block font-normal">
                Kinetic 3D Algorithm Spatial Studio
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] border border-black/[0.06]">
            {ALGORITHM_FACETS.map((facet) => (
              <button
                key={facet.id}
                onClick={() => setActiveId(facet.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeId === facet.id
                    ? "bg-black text-white shadow-xs font-semibold"
                    : "text-[#52525b] hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                {facet.name.split(" ")[0]}
              </button>
            ))}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16 w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-[#71717a] uppercase bg-black/[0.03] border border-black/[0.06] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KINETIC ALGORITHM PRISM &middot; 2026</span>
          </span>

          <h1
            className="font-clash font-semibold text-[#0f172a] tracking-[-0.035em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(38px, 4.5vw, 68px)" }}
          >
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-[#18181b]">
              Interactive 3D geometry.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#52525b] max-w-lg mx-auto mt-3 font-normal leading-relaxed">
            Drag to rotate the algorithm prism. Click any facet to align its memory topology and step into the dedicated simulator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full my-4">
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative">
            <AlgorithmPrism3D
              activeId={activeId}
              onSelectFacet={(id) => setActiveId(id)}
            />
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#71717a] pointer-events-none mt-1">
              <Grip size={13} />
              <span>Drag to spin freely &middot; Click facet to align</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="rounded-[28px] bg-white/90 backdrop-blur-xl border border-black/[0.08] p-7 shadow-[0_20px_45px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shadow-xs"
                    style={{ backgroundColor: activeFacet.accent }}
                  />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#71717a]">
                    FACET {activeFacet.index} &middot; {activeFacet.category}
                  </span>
                </div>
                <span
                  className="font-mono text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `${activeFacet.accent}15`,
                    color: activeFacet.accent
                  }}
                >
                  {activeFacet.symbol}
                </span>
              </div>

              <h2 className="font-clash font-bold text-2xl text-[#0f172a] mb-2 leading-tight">
                {activeFacet.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed mb-6 font-normal">
                {activeFacet.tagline}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#f8f9fa] border border-black/[0.04] mb-6">
                <span className="text-[10px] font-mono uppercase text-[#71717a] block mb-1">
                  ASYMPTOTIC COMPLEXITY
                </span>
                <span className="text-xs font-mono font-semibold text-[#18181b]">
                  {activeFacet.complexity}
                </span>
              </div>

              <a
                href={activeFacet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-clash font-semibold bg-[#18181b] !text-white hover:bg-black transition-all cursor-pointer shadow-sm group"
              >
                <span className="!text-white">Launch {activeFacet.name.split("&")[0].trim()} Visualizer</span>
                <ArrowUpRight size={14} className="!text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <section className="pt-16 mt-8 border-t border-black/[0.06]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] block">
                CATALOG
              </span>
              <h2 className="font-clash font-semibold text-xl text-[#0f172a]">
                All 6 Dedicated Algorithm Simulators
              </h2>
            </div>
            <span className="text-xs font-mono text-[#71717a]">6 LIVE MICRO-FRONTENDS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALGORITHM_FACETS.map((facet) => (
              <a
                key={facet.id}
                href={facet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.18] hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${facet.accent}15`,
                        color: facet.accent
                      }}
                    >
                      {facet.index} &middot; {facet.symbol}
                    </span>
                    <span className="text-[11px] font-mono text-[#71717a] uppercase">
                      {facet.category}
                    </span>
                  </div>

                  <h3 className="font-clash font-semibold text-base text-[#0f172a] mb-1 group-hover:text-black">
                    {facet.name}
                  </h3>

                  <p className="text-xs text-[#52525b] leading-relaxed mb-3">
                    {facet.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#18181b]">
                  <span className="font-mono text-[11px] text-[#71717a]">{facet.complexity}</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.06] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="font-clash font-semibold text-[#0f172a]">
              DSA UNIVERSE &middot; 3D KINETIC PRISM
            </span>
          </div>
          <div>Bespoke Spatial Architecture &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
