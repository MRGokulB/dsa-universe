"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  Grip
} from "lucide-react";

export interface AlgorithmModuleMeta {
  id: string;
  index: string;
  name: string;
  legend: string;
  category: string;
  tagline: string;
  url: string;
  accent: string;
  color: string;
  sideColor: string;
  complexity: string;
  memory: string;
}

export const MODULE_SYSTEMS: AlgorithmModuleMeta[] = [
  {
    id: "arrays",
    index: "01",
    name: "Contiguous RAM & Arrays",
    legend: "RAM",
    category: "Linear",
    tagline: "Sequential cache lines and two-pointer convergence",
    url: "https://arrays-rho.vercel.app",
    accent: "#2563eb",
    color: "#dbeafe",
    sideColor: "#93c5fd",
    complexity: "Access O(1) · Search O(N)",
    memory: "Contiguous 64-bit Cache Lines"
  },
  {
    id: "linked-lists",
    index: "02",
    name: "Linked Lists & Pointers",
    legend: "LIST",
    category: "Linear",
    tagline: "Dispersed heap nodes and Floyd cycle isolation",
    url: "https://linked-lists-xi.vercel.app/",
    accent: "#7c3aed",
    color: "#ede9fe",
    sideColor: "#c4b5fd",
    complexity: "Insert O(1) · Traversal O(N)",
    memory: "Heap Allocated Pointer Chain"
  },
  {
    id: "stacks-queues",
    index: "03",
    name: "Call Stacks & Buffers",
    legend: "STACK",
    category: "Linear",
    tagline: "LIFO execution frames and circular ring queues",
    url: "https://stacks-queues.vercel.app",
    accent: "#059669",
    color: "#dcfce7",
    sideColor: "#86efac",
    complexity: "Push/Pop O(1) · Enqueue O(1)",
    memory: "RSP Stack Register & Ring Buffer"
  },
  {
    id: "trees",
    index: "04",
    name: "Binary Trees & BSTs",
    legend: "TREE",
    category: "Hierarchical",
    tagline: "Balanced BST invariants and recursive traversals",
    url: "https://trees-eight-omega.vercel.app",
    accent: "#d97706",
    color: "#fef3c7",
    sideColor: "#fde047",
    complexity: "Balanced O(log N) · Worst O(N)",
    memory: "Recursive Node Hierarchy"
  },
  {
    id: "graphs",
    index: "05",
    name: "Graph Networks & Dijkstra",
    legend: "GRAPH",
    category: "Topological",
    tagline: "Adjacency matrix traversal and min-heap shortest paths",
    url: "https://graphs-steel.vercel.app",
    accent: "#e11d48",
    color: "#ffe4e6",
    sideColor: "#fda4af",
    complexity: "BFS O(V+E) · Dijkstra O(E log V)",
    memory: "Sparse Adjacency Matrix & Heap"
  },
  {
    id: "dp",
    index: "06",
    name: "Dynamic Programming",
    legend: "DP",
    category: "Topological",
    tagline: "DAG state lattices and 1D rolling tabulation",
    url: "https://dp-sigma-one.vercel.app",
    accent: "#4f46e5",
    color: "#e0e7ff",
    sideColor: "#a5b4fc",
    complexity: "Pseudo-polynomial O(N * W)",
    memory: "Contiguous DP Memoization Cache"
  }
];

const ICONS = [Layers, LayoutList, Database, Binary, Network, Cpu];
const contours = Array.from({ length: 18 }, (_, index) => (index + 1) * 1.3);
const restingAngle = { pitch: 42, yaw: -20 };
const positions = [135, 75, 18, -40, -96, -150];

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function TactileMemoryStack({ activeId, onSelectModule }: Props) {
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();
  const pointer = useRef<{
    x: number;
    y: number;
    yaw: number;
    pitch: number;
    moved: boolean;
    selected?: string;
  } | null>(null);

  const yaw = useMotionValue(restingAngle.yaw);
  const pitch = useMotionValue(restingAngle.pitch);
  const rotateX = useSpring(pitch, { stiffness: 170, damping: 30 });
  const rotateZ = useSpring(yaw, { stiffness: 170, damping: 30 });

  const activeIndex = useMemo(() => {
    const idx = MODULE_SYSTEMS.findIndex((m) => m.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [activeId]);

  function pointerDown(event: React.PointerEvent) {
    if (reduced || event.pointerType === "touch" || event.button !== 0) return;
    const targetEl = event.target as HTMLElement;
    const selected = targetEl.closest("[data-layer-id]")?.getAttribute("data-layer-id") || undefined;
    pointer.current = {
      x: event.clientX,
      y: event.clientY,
      yaw: yaw.get(),
      pitch: pitch.get(),
      moved: false,
      selected
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: React.PointerEvent) {
    if (!pointer.current) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) pointer.current.moved = true;
    yaw.set(Math.max(-42, Math.min(-6, pointer.current.yaw + dx * 0.17)));
    pitch.set(Math.max(28, Math.min(58, pointer.current.pitch - dy * 0.12)));
  }

  function pointerUp(event: React.PointerEvent) {
    if (!pointer.current) return;
    setDragging(false);
    if (!pointer.current.moved && pointer.current.selected) {
      onSelectModule(pointer.current.selected);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    window.setTimeout(() => {
      pointer.current = null;
    }, 0);
  }

  return (
    <div
      className={`relative w-full h-[460px] sm:h-[500px] flex items-center justify-center select-none ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ perspective: "1100px" }}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
    >
      {/* Diffused Ground Shadow */}
      <div
        className="absolute w-[360px] h-[90px] rounded-[50%] pointer-events-none"
        style={{
          bottom: "16%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15, 23, 42, 0.14)",
          filter: "blur(32px)"
        }}
        aria-hidden="true"
      />

      {/* 3D Stack Machine */}
      <div className="preserve-3d" style={{ transform: "scale3d(0.88, 0.88, 0.88)" }}>
        <motion.div
          className="preserve-3d relative"
          style={{
            width: "320px",
            height: "230px",
            rotateX: reduced ? restingAngle.pitch : rotateX,
            rotateZ: reduced ? restingAngle.yaw : rotateZ
          }}
        >
          {MODULE_SYSTEMS.map((item, index) => {
            const Icon = ICONS[index];
            const isSelected = item.id === activeId;
            const rank = index === activeIndex ? 0 : index < activeIndex ? index + 1 : index;
            const z = positions[rank] ?? 0;
            const xOffset = [-16, 18, 32, 44, 54, 62][rank] ?? 0;
            const yOffset = [-14, 10, 22, 32, 40, 48][rank] ?? 0;

            return (
              <motion.div
                key={item.id}
                data-layer-id={item.id}
                className="preserve-3d absolute inset-0 cursor-pointer"
                initial={false}
                animate={{
                  z,
                  x: xOffset,
                  y: yOffset
                }}
                transition={
                  reduced ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 28 }
                }
              >
                {/* Extruded 3D contour depth slices */}
                {contours.map((depth) => (
                  <span
                    key={depth}
                    className="absolute inset-0 rounded-[24px] pointer-events-none"
                    style={{
                      background: item.sideColor,
                      transform: `translateZ(${-depth}px)`,
                      backfaceVisibility: "hidden"
                    }}
                    aria-hidden="true"
                  />
                ))}

                {/* Tactile Face */}
                <div
                  className="absolute inset-0 rounded-[24px] p-6 flex flex-col justify-between text-left transition-shadow"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.sideColor})`,
                    color: "#0f172a",
                    boxShadow: isSelected
                      ? "inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.12)"
                      : "inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -1px 1px rgba(0,0,0,0.1)",
                    backfaceVisibility: "hidden"
                  }}
                  onClick={() => {
                    if (!pointer.current?.moved) {
                      onSelectModule(item.id);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center">
                        <Icon size={16} strokeWidth={2} />
                      </div>
                      <span className="text-xs font-clash font-semibold text-black/80">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 font-bold">
                      {item.index}
                    </span>
                  </div>

                  <div>
                    <span
                      className="block font-clash font-bold tracking-tight text-black"
                      style={{ fontSize: "56px", lineHeight: "1" }}
                    >
                      {item.legend}
                    </span>
                    <span className="text-[11px] font-mono text-black/70 block mt-1">
                      {item.complexity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/10">
                    <span className="text-[10px] font-mono text-black/60 truncate max-w-[200px]">
                      {item.memory}
                    </span>
                    <div className="flex gap-1" aria-hidden="true">
                      <i className="w-1 h-3 rounded-full bg-black/30 block" />
                      <i className="w-1 h-3 rounded-full bg-black/30 block" />
                      <i className="w-1 h-3 rounded-full bg-black/30 block" />
                      <i className="w-1 h-3 rounded-full bg-black/30 block" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 pointer-events-none">
        <Grip size={13} />
        <span>Drag to find your angle &middot; Click slab to focus</span>
      </div>
    </div>
  );
}
