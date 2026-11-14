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
      className="group relative p-6 rounded-[22px] neumorphic-card hover:border-black/[0.2] transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="absolute top-3 left-3 skeuo-screw" />
      <div className="absolute top-3 right-3 skeuo-screw" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 skeuo-handle opacity-70 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 pt-2 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-clash font-bold text-sm shadow-xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${item.chipColor}` }}
          >
            <IconComp size={18} />
          </div>
          <span className="text-[10px] font-mono uppercase text-[#64748b] tracking-wider px-2 py-0.5 rounded bg-black/[0.04] border border-black/[0.05]">
            CH {item.index}
          </span>
        </div>

        <h3 className="font-clash font-bold text-base text-[#0f172a] mb-1.5 group-hover:text-black transition-colors">
          {item.name}
        </h3>

        <p className="text-xs text-[#475569] leading-relaxed mb-4">
          {item.tagline}
        </p>

        <div className="py-2 px-3 rounded-lg bg-black/[0.02] border border-black/[0.06] text-[11px] font-mono text-[#475569] mb-4 flex items-center justify-between">
          <span className="truncate">{item.complexity.split("·")[0].trim()}</span>
          <span className="text-[10px] text-zinc-500 font-semibold">{item.category}</span>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono font-bold text-[#0f172a]">
        <span>Deploy Module</span>
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
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-emerald-400 flex items-center justify-center font-clash font-bold text-sm shadow-sm border border-zinc-700">
              DS
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

          <div className="hidden lg:flex items-center gap-4 vfd-display px-4 py-1.5 rounded-xl text-[11px] font-mono text-emerald-400">
            <span className="flex items-center gap-1.5">
              <span className="led-diode-green" />
              CH: 0{activeModule.index}
            </span>
            <span className="text-zinc-600">|</span>
            <span>BUS: 64-BIT CACHE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-emerald-300">STATUS: ARMED</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.1] bg-white hover:bg-black hover:text-white transition-all text-xs font-mono font-bold text-[#0f172a] shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <Compass size={13} className="text-emerald-600" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/[0.1] bg-white hover:bg-black hover:text-white transition-all text-xs font-mono font-bold text-[#0f172a] shadow-xs"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main-visualizer" className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-28 relative z-10">
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <h1 className="font-clash font-bold text-3xl sm:text-5xl text-[#0f172a] tracking-tight leading-tight">
                Silicon Memory Architecture. <br />
                <span className="font-instrument italic font-normal text-zinc-600">
                  Precision execution consoles.
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] max-w-md font-normal leading-relaxed">
              Step through physical cache lines, pointer dereference chains, LIFO stack frames, and dynamic programming memoization on live silicon dies.
            </p>
          </div>

          <div className="p-3 rounded-2xl neumorphic-panel border border-black/[0.08] flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748b] px-2 font-bold">
              MECHANICAL CHANNEL SELECTOR:
            </span>

            <div className="flex flex-wrap gap-2">
              {MODULE_SYSTEMS.map((mod) => {
                const isSelected = activeId === mod.id;
                const IconComp = SYSTEM_ICONS[mod.id as keyof typeof SYSTEM_ICONS] || Layers;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveId(mod.id)}
                    className={`skeuo-channel-key px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-clash font-bold flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                      isSelected ? "active" : ""
                    }`}
                  >
                    <span className={isSelected ? "led-diode-green" : "led-diode-off"} />
                    <span>CH 0{mod.index}</span>
                    <span className="text-[11px] text-[#475569]">{mod.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <SiliconCrucible3D
            activeId={activeId}
            onSelectModule={(id) => setActiveId(id)}
          />
        </section>

        <section className="pt-12 border-t border-black/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#64748b] block mb-1">
                STANDALONE CHANNELS
              </span>
              <h2 className="font-clash font-bold text-2xl sm:text-3xl text-[#0f172a] tracking-tight">
                6 Modular Silicon Visualizers
              </h2>
            </div>
            <span className="text-xs font-mono text-[#64748b]">
              Interactive Hardware Engines
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

      <footer className="border-t border-black/[0.08] bg-[#f8f9fa] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="led-diode-green" />
            <span className="font-clash font-bold text-[#0f172a]">DSA Universe</span>
            <span>&copy; 2026 &middot; Precision Hardware Silicon Matrix</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="https://arrays-rho.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              RAM Arrays
            </a>
            <a href="https://linked-lists-xi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Pointer Chains
            </a>
            <a href="https://graphs-steel.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Dijkstra
            </a>
            <a href="https://github.com/MRGokulB/dsa-universe" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
