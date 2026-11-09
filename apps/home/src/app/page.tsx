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
  Code2,
  Terminal,
  Activity,
  Boxes
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
    <div className="min-h-screen bg-[#07080b] text-[#f0f2f7] font-cabinet selection:bg-sky-500/30 selection:text-white relative overflow-x-hidden">
      <OnboardingTour />

      {/* Subtle Blueprint Grid Trace */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(56,189,248,0.06),transparent_70%)]" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07080b]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
              <Boxes size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-clash font-semibold text-sm tracking-tight text-white">
                  DSA UNIVERSE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
                  WEBGL 3D
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono hidden sm:block">Hardware Memory &amp; Algorithm Visualizer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300 cursor-pointer"
            >
              <Sparkles size={13} className="text-sky-400" />
              <span>Tour</span>
            </button>

            <a
              href="https://github.com/MRGokulB/dsa-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-zinc-300"
              aria-label="GitHub Repository"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Experience */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-24 relative z-10">
        {/* Top Hero Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/[0.06] text-sky-300 text-xs font-mono mb-4">
            <Terminal size={12} />
            <span>AUTHENTIC THREE.JS HARDWARE CRUCIBLE</span>
          </div>

          <h1 className="font-clash font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-4">
            Algorithms in Silicon. <br />
            <span className="font-instrument italic font-normal text-zinc-300">
              Interactive WebGL 3D execution.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            A real-time 3D hardware memory die rendered in WebGL. Drag to orbit the silicon crucible, click any module to focus, and launch the dedicated simulator.
          </p>
        </div>

        {/* 3D WebGL Canvas Centerpiece */}
        <div className="mb-12">
          <SiliconCrucible3D activeId={activeId} onSelectModule={setActiveId} />
        </div>

        {/* Interactive Active Module Telemetry Deck & Quick Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left / Center: Active System Detailed Telemetry HUD */}
          <div className="lg:col-span-8 silicon-panel rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-base border"
                  style={{
                    background: `${activeModule.accent}15`,
                    borderColor: `${activeModule.accent}35`,
                    color: activeModule.accent
                  }}
                >
                  <ActiveIcon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-500 uppercase">
                      SYSTEM {activeModule.index}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      LIVE SIMULATOR
                    </span>
                  </div>
                  <h2 className="font-clash font-bold text-2xl text-white tracking-tight">
                    {activeModule.name}
                  </h2>
                </div>
              </div>

              <Link
                href={activeModule.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-button-primary px-6 text-xs gap-2 shrink-0"
              >
                <span>Launch {activeModule.category} Visualizer</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase tracking-wider">
                  Asymptotic Complexity
                </span>
                <span className="font-mono text-xs font-semibold text-white">
                  {activeModule.complexity}
                </span>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase tracking-wider">
                  Memory Topology
                </span>
                <span className="font-mono text-xs font-semibold text-sky-300">
                  {activeModule.memory}
                </span>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase tracking-wider">
                  Hardware Locality
                </span>
                <span className="font-mono text-xs font-semibold text-emerald-300">
                  {activeModule.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              Clicking any 3D memory block on the crucible above dynamically inspects its internal memory allocation and execution context stack in real time.
            </p>
          </div>

          {/* Right: Tactile Quick Module Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
              <Activity size={13} className="text-sky-400" />
              <span>Select 3D Memory Block</span>
            </span>

            {MODULE_SYSTEMS.map((mod) => {
              const isSelected = activeId === mod.id;
              const Icon = SYSTEM_ICONS[mod.id as keyof typeof SYSTEM_ICONS] || Layers;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveId(mod.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.08] border-sky-400 shadow-[0_4px_16px_rgba(56,189,248,0.15)]"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs border"
                      style={{
                        background: `${mod.accent}15`,
                        borderColor: `${mod.accent}35`,
                        color: mod.accent
                      }}
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="font-clash font-semibold text-xs text-white block">
                        {mod.name}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 block">
                        {mod.complexity.split("·")[0]}
                      </span>
                    </div>
                  </div>

                  <span
                    className="font-mono text-[10px] font-bold"
                    style={{ color: mod.accent }}
                  >
                    {isSelected ? "FOCUSED" : "FOCUS →"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Section Below */}
        <section className="pt-16 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-clash font-bold text-xl text-white tracking-tight">
                All 6 Decoupled Standalone Apps
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Each micro-frontend can be run independently or explored via the 3D Crucible
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">TURBOPACK REPO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULE_SYSTEMS.map((sys) => {
              const Icon = SYSTEM_ICONS[sys.id as keyof typeof SYSTEM_ICONS] || Layers;

              return (
                <a
                  key={sys.id}
                  href={sys.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group silicon-panel rounded-2xl p-6 transition-all hover:border-white/[0.22] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border font-mono font-bold text-xs"
                        style={{
                          background: `${sys.accent}15`,
                          borderColor: `${sys.accent}35`,
                          color: sys.accent
                        }}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        {sys.category}
                      </span>
                    </div>

                    <h3 className="font-clash font-semibold text-lg text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                      {sys.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-4">
                      {sys.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>{sys.complexity.split("·")[0]}</span>
                    <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 font-semibold">
                      Launch App ↗
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050609] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="font-clash font-semibold text-white">DSA UNIVERSE &middot; THREE.JS WEBGL CRUCIBLE</span>
          </div>
          <div>Bespoke Hardware Architecture &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
