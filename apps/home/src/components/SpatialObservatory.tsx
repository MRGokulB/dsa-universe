"use client";

import { useState, useRef, useCallback } from "react";
import { 
  Layers, 
  LayoutList, 
  Database, 
  Binary, 
  Network, 
  Cpu, 
  ArrowUpRight,
  Compass,
  Sparkles
} from "lucide-react";

export interface AlgorithmRealmMeta {
  id: string;
  index: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  url: string;
  complexity: string;
  spaceComplexity: string;
  topology: string;
  cacheLocality: string;
  schematicTag: string;
  overview: string;
}

export const REALM_SYSTEMS: AlgorithmRealmMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    shortName: "Arrays & Cache",
    category: "Linear Memory",
    tagline: "Contiguous cache line prefetching and two-pointer convergence.",
    url: "https://arrays-rho.vercel.app",
    complexity: "Access O(1) · Search O(log N)",
    spaceComplexity: "O(1) Auxiliary",
    topology: "Contiguous 64-Byte Bus",
    cacheLocality: "100% L1 Sequential Hit",
    schematicTag: "BUS_ADDR [0x00 ... 0x38]",
    overview: "Hardware-level memory modeling exploring CPU cache locality, sequential prefetching, and two-pointer array partitions."
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    shortName: "Pointers & Chains",
    category: "Heap Pointers",
    tagline: "Dynamic node traversal across scattered heap addresses.",
    url: "https://linked-lists-xi.vercel.app/",
    complexity: "Insert O(1) · Traversal O(N)",
    spaceComplexity: "O(N) Overhead",
    topology: "Dispersed Node Chain",
    cacheLocality: "Non-contiguous Heap",
    schematicTag: "PTR_DEREF [HEAD* -> NEXT]",
    overview: "Dynamic pointer traversal across scattered heap addresses, pointer mutation safety, and fast/slow runner cycle traps."
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    shortName: "Stacks & Buffers",
    category: "Execution Registers",
    tagline: "LIFO execution activation records and ring queue buffers.",
    url: "https://stacks-queues.vercel.app",
    complexity: "Push O(1) · Pop O(1)",
    spaceComplexity: "O(K) Depth",
    topology: "RSP Stack Register",
    cacheLocality: "Contiguous L1 Stack",
    schematicTag: "STACK_FRAME [RSP - 8B]",
    overview: "CPU execution frame mechanics, stack overflow safety bounds, and amortized circular queue ring buffers."
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    shortName: "Binary Trees",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive logarithmic pathfinding.",
    url: "https://trees-eight-omega.vercel.app",
    complexity: "Search O(log N) · Insert O(log N)",
    spaceComplexity: "O(H) Recursion",
    topology: "Balanced Tree",
    cacheLocality: "Logarithmic Cache Lines",
    schematicTag: "BST_NODE [L ◄ ROOT ► R]",
    overview: "Logarithmic search invariants, AVL self-balancing rotations, and recursive depth-first tree traversals."
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    shortName: "Graph Networks",
    category: "Topological Mesh",
    tagline: "Adjacency matrix traversal and min-heap shortest paths.",
    url: "https://graphs-steel.vercel.app",
    complexity: "Dijkstra O((V + E) log V)",
    spaceComplexity: "O(V + E) Adjacency",
    topology: "Topological Mesh",
    cacheLocality: "Sparse Indexed Memory",
    schematicTag: "PRIORITY_HEAP [MIN_WEIGHT]",
    overview: "Weighted graph edge relaxation, priority queue wavefronts, and cycle isolation across sparse networks."
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    shortName: "Dynamic Program",
    category: "State Matrix",
    tagline: "DAG state lattices and 1D rolling tabulation memoization.",
    url: "https://dp-sigma-one.vercel.app",
    complexity: "Subproblems O(N·W)",
    spaceComplexity: "O(W) Array",
    topology: "State Matrix DAG",
    cacheLocality: "Tabulated Sequential",
    schematicTag: "MEMO_SLOT [DP[i][w]]",
    overview: "Optimal substructure analysis, overlapping subproblem memoization, and bottom-up topological transitions."
  }
];

const REALM_ICONS = {
  arrays: Layers,
  "linked-lists": LayoutList,
  "stacks-queues": Database,
  trees: Binary,
  graphs: Network,
  dp: Cpu
};

interface SpatialObservatoryProps {
  activeId: string;
  onSelectRealm: (id: string) => void;
}

export default function SpatialObservatory({
  activeId,
  onSelectRealm
}: SpatialObservatoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 6, y: -4 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 5, y: -3 });
  }, []);

  const activeRealm = REALM_SYSTEMS.find((r) => r.id === activeId) || REALM_SYSTEMS[0];
  const IconComp = REALM_ICONS[activeRealm.id as keyof typeof REALM_ICONS] || Layers;

  return (
    <div className="w-full max-w-6xl mx-auto select-none">
      <div className="flex items-center justify-between overflow-x-auto pb-4 mb-6 border-b border-black/[0.08] gap-2 scrollbar-none">
        {REALM_SYSTEMS.map((realm) => {
          const isSelected = realm.id === activeId;
          const TabIcon = REALM_ICONS[realm.id as keyof typeof REALM_ICONS] || Layers;

          return (
            <button
              key={realm.id}
              onClick={() => onSelectRealm(realm.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                isSelected
                  ? "bg-[#18181b] text-white border-transparent shadow-sm"
                  : "bg-white text-[#71717a] border-black/[0.06] hover:border-black/[0.15] hover:text-[#18181b]"
              }`}
            >
              <TabIcon size={14} className={isSelected ? "text-white" : "text-[#71717a]"} />
              <span className="font-semibold tracking-tight">{realm.index}</span>
              <span className="font-sans font-medium">{realm.shortName}</span>
            </button>
          );
        })}
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="perspective-[1400px] mb-16"
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="relative w-full rounded-[28px] bg-[#0e1117] border border-white/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.25)] p-8 lg:p-10 overflow-hidden text-white"
        >
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 bg-white/[0.06] px-3 py-1 rounded-full border border-white/[0.08]">
                  DOMAIN {activeRealm.index} · {activeRealm.category}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </div>

              <h2 className="font-clash font-bold text-3xl sm:text-4xl text-white tracking-tight mb-3">
                {activeRealm.name}
              </h2>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-8 font-normal">
                {activeRealm.overview}
              </p>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                    TIME COMPLEXITY
                  </span>
                  <span className="text-xs font-mono font-semibold text-white">
                    {activeRealm.complexity}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                    MEMORY TOPOLOGY
                  </span>
                  <span className="text-xs font-mono font-semibold text-white">
                    {activeRealm.topology}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                    HARDWARE LOCALITY
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {activeRealm.cacheLocality}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={activeRealm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white !text-black font-clash font-semibold text-xs hover:bg-white/90 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span className="!text-black">Launch Interactive Visualizer</span>
                  <ArrowUpRight size={15} className="!text-black" />
                </a>
                <span className="text-[11px] font-mono text-white/40">
                  {activeRealm.schematicTag}
                </span>
              </div>
            </div>

            <div 
              style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
              className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/[0.08] relative min-h-[300px]"
            >
              <div className="absolute top-3 left-4 text-[10px] font-mono text-white/40 tracking-wider">
                SCHEMATIC VISUALIZATION
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white mb-6 shadow-inner">
                <IconComp size={32} />
              </div>

              <div className="w-full text-center space-y-2">
                <div className="font-mono text-xs text-white/80 bg-white/[0.05] py-2 px-4 rounded-xl border border-white/[0.08] inline-block max-w-full truncate">
                  {activeRealm.schematicTag}
                </div>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  {activeRealm.tagline}
                </p>
              </div>

              <div className="w-full pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>STAGE: ACTIVE RUNNER</span>
                <span>BUS: 64-BIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
