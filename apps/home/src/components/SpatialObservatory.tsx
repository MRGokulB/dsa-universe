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

function RealmSchematicViewport({ id }: { id: string }) {
  if (id === "arrays") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-1.5 w-full justify-center">
          {[
            { addr: "0x00", val: "12", isPtr: true, ptrName: "L" },
            { addr: "0x08", val: "24", isPtr: false },
            { addr: "0x10", val: "38", isPtr: false },
            { addr: "0x18", val: "54", isPtr: true, ptrName: "MID" },
            { addr: "0x20", val: "72", isPtr: false },
            { addr: "0x28", val: "96", isPtr: true, ptrName: "R" }
          ].map((cell, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[9px] font-mono text-white/40 mb-1">{cell.addr}</span>
              <div className={`w-10 h-12 rounded-lg border flex flex-col items-center justify-center ${
                cell.isPtr 
                  ? "bg-white/10 border-white/40 text-white font-semibold shadow-xs" 
                  : "bg-white/[0.03] border-white/[0.08] text-white/60"
              }`}>
                <span className="text-xs font-mono">{cell.val}</span>
              </div>
              {cell.isPtr && (
                <span className="text-[9px] font-mono text-emerald-400 mt-1 font-bold">
                  {cell.ptrName}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50">
          <span>CACHE: 64B BOUNDARY</span>
          <span className="text-emerald-400">L1 SEQUENTIAL HIT</span>
        </div>
      </div>
    );
  }

  if (id === "linked-lists") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2 justify-center w-full">
          {[
            { val: "0x4A", label: "HEAD", next: "0x9F" },
            { val: "0x9F", label: "NODE", next: "0xDC" },
            { val: "0xDC", label: "TAIL", next: "NULL" }
          ].map((node, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/20 flex flex-col items-center shadow-xs">
                <span className="text-[9px] font-mono text-purple-400 font-bold">{node.label}</span>
                <span className="text-xs font-mono font-semibold text-white">{node.val}</span>
                <span className="text-[8px] font-mono text-white/40">ptr: {node.next}</span>
              </div>
              {idx < 2 && <span className="text-white/40 font-mono text-xs">→</span>}
            </div>
          ))}
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50">
          <span>FAST / SLOW POINTERS</span>
          <span className="text-purple-400">CYCLE: SAFE</span>
        </div>
      </div>
    );
  }

  if (id === "stacks-queues") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2.5">
        <div className="w-48 flex flex-col gap-1.5">
          <div className="p-2 rounded-lg bg-white/10 border border-white/30 flex items-center justify-between text-xs font-mono text-white">
            <span className="text-emerald-400 font-bold">RSP →</span>
            <span>evalExpr()</span>
            <span className="text-[9px] text-white/40">0x7FF8</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/70">
            <span className="text-white/30">•</span>
            <span>parseToken()</span>
            <span className="text-[9px] text-white/40">0x7FF0</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/50">
            <span className="text-white/20">•</span>
            <span>main()</span>
            <span className="text-[9px] text-white/40">0x7FE8</span>
          </div>
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50">
          <span>LIFO ACTIVATION</span>
          <span className="text-emerald-400">DEPTH: 3 FRAMES</span>
        </div>
      </div>
    );
  }

  if (id === "trees") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/40 flex items-center justify-center text-xs font-mono font-bold text-white shadow-xs">
            42
          </div>
          <div className="w-24 h-4 border-b border-l border-r border-white/20 flex justify-between px-1" />
          <div className="flex justify-between w-32 mt-1">
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs font-mono text-white/70">
              21
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xs font-mono font-bold text-amber-300">
              64
            </div>
          </div>
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-2">
          <span>BALANCED BST INVARIANT</span>
          <span className="text-amber-400">HEIGHT: 2</span>
        </div>
      </div>
    );
  }

  if (id === "graphs") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-xs font-mono text-white">
            U
          </div>
          <span className="text-rose-400 font-mono text-xs font-bold">--(w:4)→</span>
          <div className="w-8 h-8 rounded-full bg-rose-400/20 border border-rose-400/40 flex items-center justify-center text-xs font-mono font-bold text-rose-300">
            V
          </div>
          <span className="text-rose-400 font-mono text-xs font-bold">--(w:2)→</span>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-xs font-mono text-white">
            W
          </div>
        </div>
        <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-3">
          <span>DIJKSTRA MIN-HEAP</span>
          <span className="text-rose-400">RELAXED: 3 EDGES</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-xs">
        {["0", "1", "2", "3"].map((col, idx) => (
          <div key={idx} className="p-2 rounded bg-white/[0.03] text-white/40 text-[10px]">
            w={col}
          </div>
        ))}
        {["0", "12", "12", "24"].map((val, idx) => (
          <div key={idx} className={`p-2 rounded border ${
            idx === 3 
              ? "bg-indigo-500/20 border-indigo-400 text-indigo-300 font-bold" 
              : "bg-white/[0.05] border-white/10 text-white/70"
          }`}>
            {val}
          </div>
        ))}
      </div>
      <div className="w-full px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50 mt-2">
        <span>MEMOIZATION TABLE</span>
        <span className="text-indigo-400">SLOT HIT: OPTIMAL</span>
      </div>
    </div>
  );
}

interface SpatialObservatoryProps {
  activeId: string;
  onSelectRealm: (id: string) => void;
}

export default function SpatialObservatory({
  activeId,
  onSelectRealm
}: SpatialObservatoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 5, y: -3 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 8;

    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 4, y: -2 });
  }, []);

  const activeRealm = REALM_SYSTEMS.find((r) => r.id === activeId) || REALM_SYSTEMS[0];

  return (
    <div className="w-full max-w-6xl mx-auto select-none">
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-6 border-b border-black/[0.06] gap-2">
        {REALM_SYSTEMS.map((realm) => {
          const isSelected = realm.id === activeId;
          const TabIcon = REALM_ICONS[realm.id as keyof typeof REALM_ICONS] || Layers;

          return (
            <button
              key={realm.id}
              onClick={() => onSelectRealm(realm.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                isSelected
                  ? "bg-[#18181b] !text-white border-transparent shadow-sm"
                  : "bg-white text-[#71717a] border-black/[0.06] hover:border-black/[0.15] hover:text-[#18181b]"
              }`}
            >
              <TabIcon size={14} className={isSelected ? "!text-white" : "text-[#71717a]"} />
              <span className={`font-semibold tracking-tight ${isSelected ? "!text-white" : ""}`}>{realm.index}</span>
              <span className={`font-sans font-medium ${isSelected ? "!text-white" : ""}`}>{realm.shortName}</span>
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
              className="lg:col-span-5 flex flex-col items-center justify-between p-6 rounded-2xl bg-black/50 border border-white/[0.1] relative min-h-[320px]"
            >
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-white/40 tracking-wider pb-3 border-b border-white/[0.06]">
                <span>SCHEMATIC VIEWPORT</span>
                <span className="text-emerald-400">RUNNING</span>
              </div>
              
              <div className="w-full my-auto py-4">
                <RealmSchematicViewport id={activeRealm.id} />
              </div>

              <div className="w-full pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>STAGE: ACTIVE SPECIMEN</span>
                <span>BUS: 64-BIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
