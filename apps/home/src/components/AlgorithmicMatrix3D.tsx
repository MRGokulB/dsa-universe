"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Layers, 
  LayoutList, 
  Database, 
  Binary, 
  Network, 
  Cpu, 
  ArrowUpRight, 
  Sparkles,
  Zap,
  Activity,
  Compass
} from "lucide-react";

export interface AlgorithmRealmMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  accentGlow: string;
  complexity: string;
  spaceComplexity: string;
  topology: string;
  schematic: string;
  overview: string;
}

export const REALM_SYSTEMS: AlgorithmRealmMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    category: "Linear Memory Bus",
    tagline: "Sequential cache lines and two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#3b82f6",
    accentGlow: "rgba(59, 130, 246, 0.4)",
    complexity: "Access O(1) · Search O(log N)",
    spaceComplexity: "O(1) Auxiliary",
    topology: "Contiguous 64-Byte Cache Lines",
    schematic: "[ 0x00 | 0x08 | 0x10 | 0x18 | 0x20 ]",
    overview: "Hardware-level memory modeling exploring CPU cache locality, sequential prefetching, and two-pointer array partitions."
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    category: "Heap Pointers",
    tagline: "Dispersed heap nodes and Floyd cycle isolation algorithm",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.4)",
    complexity: "Insert O(1) · Traversal O(N)",
    spaceComplexity: "O(N) Pointer Overhead",
    topology: "Dispersed Heap Node Chain",
    schematic: "HEAD* -> [0x4A] -> [0x9F] -> NULL",
    overview: "Dynamic pointer traversal across scattered heap addresses, pointer mutation safety, and fast/slow runner cycle traps."
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    category: "Execution Registers",
    tagline: "LIFO activation records and circular ring queue buffers",
    url: "https://stacks-queues.vercel.app",
    accent: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    complexity: "Push O(1) · Pop O(1)",
    spaceComplexity: "O(K) Frame Depth",
    topology: "RSP Stack Register / Ring Array",
    schematic: "PUSH [0x7FFF] | POP -> RSP - 8",
    overview: "CPU execution frame mechanics, stack overflow safety bounds, and amortized circular queue ring buffers."
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    category: "Hierarchical BST",
    tagline: "Balanced BST invariants and recursive logarithmic pathfinding",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.4)",
    complexity: "Search O(log N) · Insert O(log N)",
    spaceComplexity: "O(H) Recursion Stack",
    topology: "Balanced Hierarchical Tree",
    schematic: "(L) <--- [ ROOT: 42 ] ---> (R)",
    overview: "Logarithmic search invariants, AVL self-balancing rotations, and recursive depth-first tree traversals."
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    category: "Topological Mesh",
    tagline: "Adjacency matrix traversal and min-heap shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#f43f5e",
    accentGlow: "rgba(244, 63, 94, 0.4)",
    complexity: "Dijkstra O((V + E) log V)",
    spaceComplexity: "O(V + E) Adjacency Storage",
    topology: "Topological Constellation",
    schematic: "U --(w:4)--> V --(w:2)--> W [MIN_HEAP]",
    overview: "Weighted graph edge relaxation, priority queue wavefronts, and cycle isolation across sparse networks."
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    category: "State Matrix DAG",
    tagline: "DAG state lattices and 1D rolling tabulation memoization",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#6366f1",
    accentGlow: "rgba(99, 102, 241, 0.4)",
    complexity: "Subproblems O(N·W) · Space O(W)",
    spaceComplexity: "O(W) 1D Tabulation Array",
    topology: "Directed Acyclic State Lattice",
    schematic: "DP[i][w] = max(DP[i-1][w], DP[i-1][w-k] + v)",
    overview: "Optimal substructure analysis, overlapping subproblem memoization, and bottom-up topological transitions."
  }
];

const SECTOR_ICONS = {
  arrays: Layers,
  "linked-lists": LayoutList,
  "stacks-queues": Database,
  trees: Binary,
  graphs: Network,
  dp: Cpu
};

interface AlgorithmicMatrix3DProps {
  activeId: string;
  onSelectRealm: (id: string) => void;
}

export default function AlgorithmicMatrix3D({
  activeId,
  onSelectRealm
}: AlgorithmicMatrix3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 12, y: -8 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -14;
    const tiltY = ((x - centerX) / centerX) * 16;

    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 10, y: -6 });
  }, []);

  const activeRealm = REALM_SYSTEMS.find((r) => r.id === activeId) || REALM_SYSTEMS[0];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 select-none">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-[1400px] cursor-crosshair"
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: isHovered ? "transform 0.12s ease-out" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="relative w-full rounded-[32px] p-6 sm:p-8 bg-[#0b0d13] border border-white/[0.12] shadow-[0_32px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
              backgroundSize: "24px 24px, 48px 48px, 48px 48px"
            }}
          />

          <div className="absolute top-4 left-6 flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/40 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALGORITHMIC MONOLITH WAFER · REV 4.2</span>
          </div>

          <div className="absolute top-4 right-6 flex items-center gap-3 text-[10px] font-mono text-white/40">
            <span>CLOCK: 4.80 GHZ</span>
            <span className="hidden sm:inline">BUS: 64-BYTE CONTIGUOUS</span>
          </div>

          <div className="mt-8 mb-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10" style={{ transformStyle: "preserve-3d" }}>
              {REALM_SYSTEMS.map((realm) => {
                const isSelected = realm.id === activeId;
                const Icon = SECTOR_ICONS[realm.id as keyof typeof SECTOR_ICONS] || Layers;

                return (
                  <button
                    key={realm.id}
                    onClick={() => onSelectRealm(realm.id)}
                    style={{
                      transform: isSelected ? "translateZ(24px)" : "translateZ(4px)",
                      transformStyle: "preserve-3d",
                      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    className={`group relative text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#161a26]/90 border-white/30 shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_30px_rgba(59,130,246,0.15)]"
                        : "bg-[#10131d]/60 border-white/[0.08] hover:border-white/20 hover:bg-[#131722]/80"
                    }`}
                  >
                    <div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-20 blur-xl transition-opacity group-hover:opacity-40"
                      style={{ backgroundColor: realm.accent }}
                    />

                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center border transition-colors"
                        style={{
                          backgroundColor: isSelected ? realm.accent : "rgba(255,255,255,0.05)",
                          borderColor: isSelected ? "transparent" : "rgba(255,255,255,0.1)",
                          color: isSelected ? "#ffffff" : "#94a3b8"
                        }}
                      >
                        <Icon size={16} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-white/40 tracking-wider">
                          DIE {realm.index}
                        </span>
                        {isSelected && (
                          <span 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: realm.accent }}
                          />
                        )}
                      </div>
                    </div>

                    <h3 className="font-clash font-semibold text-sm text-white mb-1 group-hover:text-white flex items-center justify-between">
                      <span>{realm.name}</span>
                    </h3>

                    <span className="text-[11px] text-white/50 block font-mono mb-3">
                      {realm.category}
                    </span>

                    <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06] mb-3">
                      <code className="text-[10px] font-mono text-emerald-400/90 block truncate">
                        {realm.schematic}
                      </code>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono text-white/60">
                      <span>{realm.complexity.split("·")[0]}</span>
                      <span className="text-white/40 group-hover:text-white transition-colors">Inspect →</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div 
            style={{ transform: "translateZ(16px)", transformStyle: "preserve-3d" }}
            className="pt-5 border-t border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-20"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: activeRealm.accent }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-white tracking-wide">
                    ACTIVE SECTOR: {activeRealm.name.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {activeRealm.topology}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 font-sans mt-0.5 line-clamp-1">
                  {activeRealm.tagline}
                </p>
              </div>
            </div>

            <a
              href={activeRealm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-clash font-semibold text-xs transition-all shadow-lg hover:brightness-110 active:scale-95 cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: activeRealm.accent,
                color: "#ffffff"
              }}
            >
              <span>Launch Dedicated App</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <span className="text-[11px] font-mono text-[#71717a] tracking-wider uppercase">
          ::: Spatial Gyroscope Active · Hover wafer to tilt in 3D · Select module to route
        </span>
      </div>
    </div>
  );
}
