"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Code2,
  Terminal,
  RotateCcw,
  Layers,
  LayoutList,
  Database,
  Binary,
  Network,
  Cpu,
  Compass
} from "lucide-react";
import { OnboardingTour } from "../components/OnboardingTour";

interface KeyData {
  id: string;
  char: string;
  isLetter?: boolean;
  color: string;
  textColor: string;
  sideColor: string;
  lat: number;
  lng: number;
  twist: number;
  depthOffset: number;
  // Metadata for the left card
  kicker: string;
  title: string;
  text: string;
  url: string;
  moduleGroup: string;
}

const PALETTES = [
  { bg: "#3fe0a8", text: "#0b261a", side: "#2bb886" }, // Mint
  { bg: "#ff7a2e", text: "#ffffff", side: "#d95b16" }, // Orange
  { bg: "#ffd23f", text: "#1a1600", side: "#d4aa24" }, // Yellow
  { bg: "#38b6ff", text: "#ffffff", side: "#1d8ecc" }, // Sky
  { bg: "#a77bff", text: "#ffffff", side: "#7c52db" }, // Lilac
  { bg: "#ff4fa3", text: "#ffffff", side: "#d62e82" }, // Pink
  { bg: "#c8f03c", text: "#182400", side: "#9ec41f" }, // Lime
  { bg: "#f4f2f8", text: "#0b0c10", side: "#d1cde0" }, // White
  { bg: "#17171f", text: "#ffffff", side: "#000000" }  // Black
];

const DSA_DATA: Record<string, { kicker: string; title: string; text: string; url: string; group: string }> = {
  A: {
    kicker: "A · ARRAYS",
    title: "Contiguous Memory & Two Pointers",
    text: "L1/L2 cache locality, pointer arithmetic, and sliding window optimization.",
    url: "https://arrays-rho.vercel.app",
    group: "Arrays"
  },
  L: {
    kicker: "L · LINKED LISTS",
    title: "Heap Chains & Dynamic Nodes",
    text: "Non-contiguous memory traversal, pointer rewiring, and Floyd cycle detection.",
    url: "https://linked-lists-xi.vercel.app/",
    group: "Linked Lists"
  },
  G: {
    kicker: "G · GRAPHS",
    title: "Topology & Shortest Paths",
    text: "Adjacency matrices, BFS/DFS traversal, Dijkstra min-heap, and topological sort.",
    url: "https://graphs-steel.vercel.app",
    group: "Graphs"
  },
  O: {
    kicker: "O · ASYMPTOTICS",
    title: "Big-O Runtime Bounds",
    text: "Time and space bounds from amortized O(1) to logarithmic O(log N) and quadratic O(N²).",
    url: "https://arrays-rho.vercel.app",
    group: "Complexity"
  },
  R: {
    kicker: "R · RECURSION",
    title: "Call Stack Execution Frames",
    text: "Simulate stack frames, base condition unwinding, and recursion tree limits.",
    url: "https://stacks-queues.vercel.app",
    group: "Stacks"
  },
  I: {
    kicker: "I · ITERATION",
    title: "Pointer Convergence & Windows",
    text: "Left/right pointer narrowing, two-pass partitioning, and cyclic array buffers.",
    url: "https://arrays-rho.vercel.app",
    group: "Arrays"
  },
  T: {
    kicker: "T · TREES",
    title: "Hierarchical Binary Search Trees",
    text: "BST invariants, recursive traversals, and Euler tour lowest common ancestors.",
    url: "https://trees-eight-omega.vercel.app",
    group: "Trees"
  },
  H: {
    kicker: "H · HASH TABLES",
    title: "Hash Tables & O(1) Key Lookup",
    text: "Hash buckets, collision resolution chains, and open addressing probing.",
    url: "https://arrays-rho.vercel.app",
    group: "Arrays"
  },
  M: {
    kicker: "M · MEMORY",
    title: "Silicon-Level RAM Buffers",
    text: "Contiguous byte offsets, stack vs heap allocation, and pointer arithmetic.",
    url: "https://arrays-rho.vercel.app",
    group: "Arrays"
  },
  S: {
    kicker: "S · STACKS & QUEUES",
    title: "LIFO Frames & FIFO Pipelines",
    text: "Call stack execution frames, circular ring buffers, and monotonic patterns.",
    url: "https://stacks-queues.vercel.app",
    group: "Stacks"
  },
  D: {
    kicker: "D · DYNAMIC PROGRAMMING",
    title: "DAG States & 2D Tabulation",
    text: "Optimal substructure, memoization cache grids, and 0/1 knapsack state compression.",
    url: "https://dp-sigma-one.vercel.app",
    group: "Dynamic Prog"
  }
};

const EXTRA_LABELS = [
  "PTR", "RAM", "BFS", "DFS", "BST", "LIFO", "FIFO", "O(1)", "O(N)", "DAG",
  "HEAP", "TRIE", "{ }", "</>", "[ ]", "MEM", "JMP", "CPU", "BIT", "STK",
  "QUE", "V+E", "LCA", "MOD", "TAB", "OPS", "LOG", "0x0", "ARR", "DP"
];

export default function Home() {
  const [selectedKeyId, setSelectedKeyId] = useState<string>("key-A");
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>(null);

  // Rotation states (degrees)
  const [yaw, setYaw] = useState<number>(-12);
  const [pitch, setPitch] = useState<number>(10);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const yawRef = useRef<number>(-12);
  const pitchRef = useRef<number>(10);
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPointerRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const stageRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Build the ~80 chunky matte keycaps placed on the sphere
  const keys = useMemo<KeyData[]>(() => {
    const list: KeyData[] = [];
    const spellLetters = ["A", "L", "G", "O", "R", "I", "T", "H", "M", "S"];

    // Rings: (latitude, count)
    const rings = [
      { lat: 0, count: 16 },
      { lat: 24, count: 14 },
      { lat: -24, count: 14 },
      { lat: 46, count: 10 },
      { lat: -46, count: 10 },
      { lat: 68, count: 6 },
      { lat: -68, count: 6 },
      { lat: 84, count: 2 },
      { lat: -84, count: 2 }
    ];

    let extraIndex = 0;
    let letterIndex = 0;

    rings.forEach((ring, rIdx) => {
      const step = 360 / ring.count;
      // Stagger odd rings like bricks
      const offset = (rIdx % 2) * (step / 2);

      for (let i = 0; i < ring.count; i++) {
        const lng = (i * step + offset) % 360;
        // Pseudo-random deterministic twist and depth offset
        const seed = Math.sin(rIdx * 100 + i * 17);
        const twist = Math.round(seed * 4.5);
        const depthOffset = Math.round(seed * 5);

        // Put ALGORITHMS letters facing the front at latitude 0 and 24
        let char = "";
        let isLetter = false;
        let paletteIndex = (rIdx * 4 + i) % PALETTES.length;

        // Front equator facing viewer (lng around 300 to 60 deg)
        const isEquatorFront = ring.lat === 0 && (lng <= 80 || lng >= 280);
        const isUpperFront = ring.lat === 24 && (lng <= 60 || lng >= 300);

        if ((isEquatorFront || isUpperFront) && letterIndex < spellLetters.length) {
          char = spellLetters[letterIndex];
          isLetter = true;
          letterIndex++;
          // High-contrast vibrant colors for letter keys
          paletteIndex = (letterIndex * 2) % (PALETTES.length - 2);
        } else {
          char = EXTRA_LABELS[extraIndex % EXTRA_LABELS.length];
          extraIndex++;
        }

        const pal = PALETTES[paletteIndex];
        const dataMatch = DSA_DATA[char] || {
          kicker: `KEY · ${char}`,
          title: `Algorithmic Mechanic: ${char}`,
          text: `Interactive runtime visualization and algorithmic logic.`,
          url: "https://arrays-rho.vercel.app",
          group: "Algorithms"
        };

        list.push({
          id: `key-${char}-${rIdx}-${i}`,
          char,
          isLetter,
          color: pal.bg,
          textColor: pal.text,
          sideColor: pal.side,
          lat: ring.lat,
          lng,
          twist,
          depthOffset,
          kicker: dataMatch.kicker,
          title: dataMatch.title,
          text: dataMatch.text,
          url: dataMatch.url,
          moduleGroup: dataMatch.group
        });
      }
    });

    return list;
  }, []);

  // Find active key
  const activeKey = useMemo(() => {
    return keys.find((k) => k.id === (hoveredKeyId || selectedKeyId)) || keys[0];
  }, [keys, hoveredKeyId, selectedKeyId]);

  // Spin to a specific key so it faces the viewer (lat -> pitch, lng -> yaw)
  const spinToKey = useCallback((key: KeyData) => {
    setSelectedKeyId(key.id);
    lastInteractionRef.current = Date.now();
    // To face viewer: targetYaw = -key.lng, targetPitch = key.lat
    let targetYaw = -key.lng;
    while (targetYaw - yawRef.current > 180) targetYaw -= 360;
    while (targetYaw - yawRef.current < -180) targetYaw += 360;

    const targetPitch = Math.max(-45, Math.min(45, key.lat));
    yawRef.current = targetYaw;
    pitchRef.current = targetPitch;
    setYaw(targetYaw);
    setPitch(targetPitch);
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  // Spin to specific letter or topic
  const spinToLetter = (char: string) => {
    const target = keys.find((k) => k.char === char) || keys[0];
    spinToKey(target);
  };

  // Pointer drag interactions
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    lastInteractionRef.current = Date.now();
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    velocityRef.current = { x: 0, y: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!lastPointerRef.current || !isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastPointerRef.current.time);
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;

    const newYaw = yawRef.current + dx * 0.35;
    const newPitch = Math.max(-55, Math.min(55, pitchRef.current - dy * 0.3));

    yawRef.current = newYaw;
    pitchRef.current = newPitch;
    setYaw(newYaw);
    setPitch(newPitch);

    velocityRef.current = { x: (dx / dt) * 16, y: (dy / dt) * 16 };
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: now };
    lastInteractionRef.current = Date.now();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    lastPointerRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Physics animation loop: inertia + gentle idle sway
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isDragging) {
        // Apply inertia friction
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;

        if (Math.abs(velocityRef.current.x) > 0.05 || Math.abs(velocityRef.current.y) > 0.05) {
          yawRef.current += velocityRef.current.x * 0.5;
          pitchRef.current = Math.max(-55, Math.min(55, pitchRef.current - velocityRef.current.y * 0.4));
          setYaw(yawRef.current);
          setPitch(pitchRef.current);
          lastInteractionRef.current = Date.now();
        } else {
          // Idle sway around rest position
          const idleElapsed = (Date.now() - lastInteractionRef.current) / 1000;
          if (idleElapsed > 2.5) {
            const sway = Math.sin(currentTime * 0.001) * 0.25;
            yawRef.current += sway;
            setYaw(yawRef.current);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#fbfcff] to-[#eceef5] text-[#0b0c10] font-cabinet selection:bg-[#c8f03c] selection:text-black relative overflow-x-hidden">
      <OnboardingTour />

      {/* 04 / Huge Faint Background Word "ALGORITHMS" */}
      <div
        aria-hidden="true"
        className="fixed top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 text-[#0b0c10] opacity-[0.05] font-clash font-bold tracking-[-0.04em] leading-[0.8] text-center whitespace-nowrap"
        style={{ fontSize: "clamp(80px, 16vw, 290px)" }}
      >
        ALGORITHMS
      </div>

      {/* 02 / Navigation Bar */}
      <nav className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
        {/* Left: Brand Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0b0c10] text-white flex items-center justify-center font-clash font-bold text-lg shadow-sm">
            DSA
          </div>
          <div>
            <span className="font-clash font-semibold text-sm tracking-tight text-[#0b0c10] block">
              DSA UNIVERSE
            </span>
            <span className="text-[11px] text-[#5d6377] block font-medium">Interactive Key Sphere</span>
          </div>
        </div>

        {/* Centre: Nav links that spin their key to face the visitor */}
        <div className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/70 backdrop-blur-md border border-black/[0.06] shadow-sm">
          {[
            { label: "Arrays", char: "A" },
            { label: "Lists", char: "L" },
            { label: "Stacks", char: "S" },
            { label: "Trees", char: "T" },
            { label: "Graphs", char: "G" },
            { label: "DP", char: "D" }
          ].map((item) => (
            <button
              key={item.char}
              onClick={() => spinToLetter(item.char)}
              className="px-3.5 py-1.5 rounded-xl font-clash text-xs font-semibold text-[#0b0c10] hover:bg-black hover:text-white transition-all cursor-pointer"
            >
              {item.label} → <span className="opacity-60">{item.char}</span>
            </button>
          ))}
        </div>

        {/* Right: Keycap Button "Explore All ↗" */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-dsa-tour"))}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.08] bg-white/80 text-xs font-semibold hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <Sparkles size={13} className="text-[#3fe0a8]" />
            <span>Tour</span>
          </button>

          <a
            href="https://github.com/MRGokulB/dsa-universe"
            target="_blank"
            rel="noopener noreferrer"
            className="keycap-btn-white px-5 text-xs tracking-wide"
          >
            <span>Source ↗</span>
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-20">
        {/* Top Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#c8f03c]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0b0c10]">
              ALGORITHM SPHERE &middot; 2026
            </span>
          </div>

          <h1
            className="font-clash font-semibold text-[#0b0c10] tracking-[-0.03em] leading-[1.08] text-center"
            style={{ fontSize: "clamp(38px, 4.4vw, 72px)" }}
          >
            Master data structures, <br />
            <span className="font-instrument italic font-normal text-black">
              with a tactile mind.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#5d6377] max-w-lg mx-auto mt-3 font-normal">
            Spin the 3D key sphere. Hover over any algorithm key to pop it out and inspect its hardware execution mechanics.
          </p>
        </div>

        {/* 03 / Three-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end min-h-[520px]">
          {/* Left Column: Frosted White Card */}
          <div className="lg:col-span-3 order-2 lg:order-1 w-full">
            <div className="rounded-[24px] bg-white/80 backdrop-blur-xl border border-black/[0.06] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                {/* Mini Keycap */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-clash font-bold text-base shadow-sm shrink-0"
                  style={{
                    backgroundColor: activeKey.color,
                    color: activeKey.textColor,
                    boxShadow: `0 4px 0 ${activeKey.sideColor}, 0 6px 12px rgba(0,0,0,0.08)`
                  }}
                >
                  {activeKey.char}
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5d6377] block font-clash">
                    {activeKey.kicker}
                  </span>
                  <span className="text-xs font-bold text-[#0b0c10] block">
                    {activeKey.moduleGroup}
                  </span>
                </div>
              </div>

              <h2 className="font-clash font-bold text-lg sm:text-xl text-[#0b0c10] mb-2 leading-tight">
                {activeKey.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#5d6377] leading-relaxed mb-6 font-normal">
                {activeKey.text}
              </p>

              {/* Action Button inside Card */}
              <Link
                href={activeKey.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full keycap-btn-black text-xs gap-1.5"
              >
                <span>Launch {activeKey.moduleGroup}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Middle Column: The 3D Keycap Sphere */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center">
            <div
              ref={stageRef}
              className={`w-full max-w-[500px] h-[480px] sm:h-[540px] perspective-stage flex items-center justify-center relative touch-none select-none cursor-grab ${
                isDragging ? "cursor-grabbing" : ""
              }`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* Ground Shadow under the ball */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 h-16 rounded-[50%] bg-[#0b0c10]/[0.08] blur-xl pointer-events-none"
                style={{ transform: "scaleY(0.4)" }}
              />

              {/* The 3D Sphere of Keycaps */}
              <div
                className="preserve-3d relative w-0 h-0 flex items-center justify-center transition-transform duration-75"
                style={{
                  transform: `rotateX(${pitch}deg) rotateY(${yaw}deg)`
                }}
              >
                {keys.map((k) => {
                  const isHovered = hoveredKeyId === k.id;
                  const isSelected = selectedKeyId === k.id;
                  const isPopped = isHovered || isSelected;

                  // Radius of the ball: 180px
                  const radius = 180 + k.depthOffset;

                  return (
                    <div
                      key={k.id}
                      className="absolute preserve-3d"
                      style={{
                        transform: `rotateY(${k.lng}deg) rotateX(${-k.lat}deg) translateZ(${radius}px) rotateZ(${k.twist}deg)`
                      }}
                    >
                      {/* Chunky Keycap Body with 3D Pop Out */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          spinToKey(k);
                        }}
                        onPointerEnter={() => setHoveredKeyId(k.id)}
                        onPointerLeave={() => setHoveredKeyId(null)}
                        className="rounded-xl flex items-center justify-center font-clash font-bold text-center cursor-pointer select-none transition-all duration-200"
                        style={{
                          width: k.isLetter ? "50px" : "44px",
                          height: k.isLetter ? "50px" : "44px",
                          fontSize: k.isLetter ? "20px" : "11px",
                          backgroundColor: k.color,
                          color: k.textColor,
                          boxShadow: isPopped
                            ? `0 6px 0 ${k.sideColor}, 0 14px 28px rgba(0,0,0,0.2)`
                            : `0 4px 0 ${k.sideColor}, 0 6px 12px rgba(0,0,0,0.08)`,
                          transform: isPopped
                            ? "translateZ(30px) scale(1.18)"
                            : "translateZ(0px) scale(1.0)",
                          outline: isSelected ? "2px solid #0b0c10" : "none",
                          outlineOffset: "2px"
                        }}
                      >
                        {k.char}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <span className="text-[11px] font-medium text-[#5d6377] flex items-center gap-1.5 mt-2">
              <Compass size={13} />
              <span>Drag to spin freely &middot; Hover to pop out</span>
            </span>
          </div>

          {/* Right Column: Stacked Keycap Buttons + Tag Chips */}
          <div className="lg:col-span-3 order-3 w-full flex flex-col gap-5">
            {/* Two Stacked Keycap Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="https://arrays-rho.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full keycap-btn-black text-xs gap-2"
              >
                <span>See all modules</span>
                <span className="text-[10px] opacity-75 font-mono">⏎</span>
              </Link>

              <button
                onClick={() => {
                  yawRef.current = -12;
                  pitchRef.current = 10;
                  setYaw(-12);
                  setPitch(10);
                  setSelectedKeyId("key-A");
                  lastInteractionRef.current = Date.now();
                }}
                className="w-full keycap-btn-white text-xs gap-2"
              >
                <span>Spell ALGORITHMS</span>
                <span className="text-[10px] opacity-75 font-mono">↺</span>
              </button>
            </div>

            {/* Clickable Tag Chips */}
            <div className="p-5 rounded-[24px] bg-white/70 backdrop-blur-md border border-black/[0.06] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5d6377] block font-clash mb-3">
                Quick Jump To Key
              </span>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Arrays", char: "A" },
                  { label: "Linked Lists", char: "L" },
                  { label: "Graphs", char: "G" },
                  { label: "Stacks", char: "S" },
                  { label: "Trees", char: "T" },
                  { label: "Recursion", char: "R" },
                  { label: "Iteration", char: "I" },
                  { label: "Memory", char: "M" },
                  { label: "Big-O", char: "O" },
                  { label: "Hash Tables", char: "H" },
                  { label: "DP", char: "D" }
                ].map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => spinToLetter(tag.char)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-black/[0.08] hover:border-black hover:bg-black hover:text-white transition-all text-xs font-medium cursor-pointer shadow-xs"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Section Below */}
        <section className="mt-28 pt-16 border-t border-black/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-clash font-semibold text-xl text-[#0b0c10]">
                All 6 Interactive Systems
              </h2>
              <p className="text-xs text-[#5d6377] mt-0.5">
                Decoupled micro-frontend architecture for computer science visual learning
              </p>
            </div>
            <span className="text-xs font-semibold text-[#5d6377] hidden sm:inline">6 MODULES LIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Arrays & Memory Allocations",
                desc: "Contiguous RAM buffer layout, L1/L2 cache lines, two-pointer techniques, and sliding window.",
                url: "https://arrays-rho.vercel.app",
                char: "A",
                color: "#3fe0a8"
              },
              {
                title: "Linked Lists & Pointers",
                desc: "Dynamic node traversal on the heap, pointer reversal mechanics, and Floyd's cycle detection.",
                url: "https://linked-lists-xi.vercel.app/",
                char: "L",
                color: "#a77bff"
              },
              {
                title: "Stacks, Queues & Call Frames",
                desc: "LIFO execution call frames, circular ring buffers, and monotonic stack search invariants.",
                url: "https://stacks-queues.vercel.app",
                char: "S",
                color: "#ff7a2e"
              },
              {
                title: "Binary Trees & Hierarchies",
                desc: "Balanced BST invariants, recursive traversals, and Euler tour lowest common ancestor resolution.",
                url: "https://trees-eight-omega.vercel.app",
                char: "T",
                color: "#ffd23f"
              },
              {
                title: "Graphs & Topological Paths",
                desc: "Sparse and dense adjacency matrices, graph coloring cycle detection, and Dijkstra min-heap paths.",
                url: "https://graphs-steel.vercel.app",
                char: "G",
                color: "#ff4fa3"
              },
              {
                title: "Dynamic Programming & DAGs",
                desc: "Overlapping subproblems, state compression, memoization cache grids, and 0/1 knapsack solvers.",
                url: "https://dp-sigma-one.vercel.app",
                char: "D",
                color: "#38b6ff"
              }
            ].map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-[22px] bg-white border border-black/[0.06] shadow-sm hover:shadow-md hover:border-black/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-clash font-bold text-sm"
                      style={{ backgroundColor: item.color, color: "#0b0c10" }}
                    >
                      {item.char}
                    </div>
                    <span className="text-[10px] font-bold text-[#5d6377] font-clash uppercase">LIVE SYSTEM</span>
                  </div>

                  <h3 className="font-clash font-semibold text-base text-[#0b0c10] mb-1.5 group-hover:text-black">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5d6377] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#0b0c10]">
                  <span>Explore Architecture</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] bg-white py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#5d6377]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c8f03c]" />
            <span className="font-clash font-semibold text-[#0b0c10]">DSA UNIVERSE &middot; 3D KEYCAP SPHERE</span>
          </div>
          <div>Bespoke Architectural Experience &middot; 2026</div>
        </div>
      </footer>
    </div>
  );
}
