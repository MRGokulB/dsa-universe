"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ArrowUpRight,
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  Code2,
  RotateCcw,
  Sliders,
  Terminal,
  Activity
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

function RackModuleUnit({ item, IconComp }: { item: AlgorithmModuleMeta; IconComp: any }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-clash font-bold text-sm shadow-xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}` }}
          >
            <IconComp size={18} style={{ color: item.accent }} />
          </div>
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-wider px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60">
            MOD {item.index}
          </span>
        </div>

        <h3 className="font-clash font-bold text-lg text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {item.tagline}
        </p>

        <div className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] font-mono text-slate-600 mb-4 flex items-center justify-between">
          <span className="truncate">{item.complexity.split("·")[0].trim()}</span>
          <span className="text-[10px] text-emerald-700 font-bold px-1.5 py-0.5 rounded bg-emerald-50">
            {item.category}
          </span>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">
        <span>Launch Visualizer</span>
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (MODULE_SYSTEMS[idx]) {
          setActiveId(MODULE_SYSTEMS[idx].id);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeModule = useMemo<AlgorithmModuleMeta>(() => {
    return MODULE_SYSTEMS.find((m) => m.id === activeId) || MODULE_SYSTEMS[0];
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#f3f4f7] text-[#0f172a] font-cabinet selection:bg-emerald-100 selection:text-black relative overflow-x-hidden">
      <OnboardingTour />

      <a
        href="#main-visualizer"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-lg text-xs font-mono font-bold"
      >
        Skip to visualizer
      </a>

      <header className="sticky top-0 z-50 border-b border-black/[0.08] bg-[#f3f4f7]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center shadow-sm border border-zinc-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 to-transparent pointer-events-none" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22V12" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 7L12 12L3 7" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="2.2" fill="#34d399" />
              </svg>
            </div>
            <div>
              <span className="font-clash font-bold text-sm tracking-tight text-[#0f172a] block">
                DSA UNIVERSE
              </span>
              <span className="text-[11px] text-[#64748b] font-mono block">
                Silicon Hardware Architecture &amp; Precision Visualizers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <Compass size={14} className="text-slate-600" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 transition-all text-xs font-semibold !text-white shadow-xs"
              aria-label="GitHub Repository"
            >
              <Code2 size={14} className="!text-white" />
              <span className="!text-white">GitHub ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main-visualizer" className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-28 relative z-10">
        <section className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <h1 className="font-clash font-bold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
                Master Data Structures, <br />
                <span className="font-instrument italic font-normal text-slate-500">
                  from first principles.
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
              Step through contiguous memory lines, pointer dereferences, recursive search trees, and dynamic programming with minimal interactive models.
            </p>
          </div>

          <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-start gap-2">
            {MODULE_SYSTEMS.map((mod) => {
              const isSelected = activeId === mod.id;
              const IconComp = SYSTEM_ICONS[mod.id as keyof typeof SYSTEM_ICONS] || Layers;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveId(mod.id)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <IconComp size={14} style={{ color: isSelected ? "#10b981" : mod.accent }} />
                  <span>{mod.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-20">
          <SiliconCrucible3D
            activeId={activeId}
            onSelectModule={(id) => setActiveId(id)}
          />
        </section>

        <section className="pt-12 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 font-bold block mb-1">
                CURATED LEARNING PATH
              </span>
              <h2 className="font-clash font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                6 Visual Algorithm Adventures
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Click any module to launch the dedicated standalone visualizer
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULE_SYSTEMS.map((item) => {
              const IconComp = SYSTEM_ICONS[item.id as keyof typeof SYSTEM_ICONS] || Layers;
              return (
                <RackModuleUnit
                  key={item.id}
                  item={item}
                  IconComp={IconComp}
                />
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-slate-800">DSA Universe</span>
            <span>&copy; 2026 &middot; Visual Data Structures &amp; Algorithms</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="https://arrays-rho.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              Arrays
            </a>
            <a href="https://linked-lists-xi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              Linked Lists
            </a>
            <a href="https://graphs-steel.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              Graphs
            </a>
            <a href="https://github.com/MRGokulB/dsa-universe" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
