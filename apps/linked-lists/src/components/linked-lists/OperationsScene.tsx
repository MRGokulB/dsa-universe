import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type NodeData = {
  id: string;
  val: string;
  col: number;
  row: number;
  pointers?: string[];
  status?: "normal" | "new" | "deleting";
};

type EdgeData = {
  id: string;
  from: string;
  to: string | "null";
  style?: "normal" | "dashed" | "fading";
};

type StepData = {
  nodes: NodeData[];
  edges: EdgeData[];
  codeLine: number;
  narration: string;
};

const PREPEND_CODE = [
  'const node = new Node("X");',
  'node.next = head;',
  'head = node;'
];

const PREPEND_STEPS: StepData[] = [
  {
    nodes: [
      { id: "X", val: "X", col: 0, row: -1, status: "new" },
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "B", val: "B", col: 1, row: 0 },
      { id: "C", val: "C", col: 2, row: 0 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "null" },
    ],
    codeLine: 0,
    narration: "Create a new node. It exists in memory but isn't connected.",
  },
  {
    nodes: [
      { id: "X", val: "X", col: 0, row: -1, status: "new" },
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "B", val: "B", col: 1, row: 0 },
      { id: "C", val: "C", col: 2, row: 0 },
    ],
    edges: [
      { id: "ex", from: "X", to: "A", style: "dashed" },
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "null" },
    ],
    codeLine: 1,
    narration: "Point the new node's next to the current head. The bridge is built.",
  },
  {
    nodes: [
      { id: "X", val: "X", col: 0, row: -1, status: "new", pointers: ["head"] },
      { id: "A", val: "A", col: 0, row: 0 },
      { id: "B", val: "B", col: 1, row: 0 },
      { id: "C", val: "C", col: 2, row: 0 },
    ],
    edges: [
      { id: "ex", from: "X", to: "A", style: "dashed" },
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "null" },
    ],
    codeLine: 2,
    narration: "Move head to the new node. It's now the first element.",
  },
  {
    nodes: [
      { id: "X", val: "X", col: 0, row: 0, pointers: ["head"] },
      { id: "A", val: "A", col: 1, row: 0 },
      { id: "B", val: "B", col: 2, row: 0 },
      { id: "C", val: "C", col: 3, row: 0 },
    ],
    edges: [
      { id: "ex", from: "X", to: "A" },
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "null" },
    ],
    codeLine: -1,
    narration: "Done in O(1). No shifting. Just two pointer assignments.",
  },
];

const INSERT_CODE = [
  'let curr = head.next;',
  'const node = new Node("X");',
  'node.next = curr.next;',
  'curr.next = node;'
];

const INSERT_STEPS: StepData[] = [
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "B", val: "B", col: 1, row: 0, pointers: ["curr"] },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: 0,
    narration: "Find the target node B.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "B", val: "B", col: 1, row: 0, pointers: ["curr"] },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
      { id: "X", val: "X", col: 1, row: 1, status: "new" },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: 1,
    narration: "Create a new node X.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "B", val: "B", col: 1, row: 0, pointers: ["curr"] },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
      { id: "X", val: "X", col: 1, row: 1, status: "new" },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
      { id: "ex", from: "X", to: "C", style: "dashed" },
    ],
    codeLine: 2,
    narration: "FIRST: bridge X to C. Skip this and C is lost forever.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "B", val: "B", col: 1, row: 0, pointers: ["curr"] },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
      { id: "X", val: "X", col: 1, row: 1, status: "new" },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C", style: "fading" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
      { id: "ex", from: "X", to: "C" },
      { id: "ebx", from: "B", to: "X", style: "dashed" },
    ],
    codeLine: 3,
    narration: "NOW redirect B to X. Safe because X already bridges to C.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "B", val: "B", col: 1, row: 0 },
      { id: "X", val: "X", col: 2, row: 0 },
      { id: "C", val: "C", col: 3, row: 0 },
      { id: "D", val: "D", col: 4, row: 0 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "ebx", from: "B", to: "X" },
      { id: "ex", from: "X", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: -1,
    narration: "Done. The node is inserted.",
  },
];

const DELETE_CODE = [
  'let prev = head, curr = head.next;',
  'while (curr.val !== "B") { prev = curr; curr = curr.next; }',
  'prev.next = curr.next;'
];

const DELETE_STEPS: StepData[] = [
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head", "prev"] },
      { id: "B", val: "B", col: 1, row: 0, pointers: ["curr"] },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: 0,
    narration: "Initialize prev and curr pointers.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head", "prev"] },
      { id: "B", val: "B", col: 1, row: 0, pointers: ["curr"] },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: 1,
    narration: "Loop until curr is B. We need prev to stay one step behind.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head", "prev"] },
      { id: "B", val: "B", col: 1, row: 0, pointers: ["curr"] },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B", style: "fading" },
      { id: "eac", from: "A", to: "C", style: "dashed" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: 2,
    narration: "Redirect A to skip over B.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head", "prev"] },
      { id: "B", val: "B", col: 1, row: 1, pointers: ["curr"], status: "deleting" },
      { id: "C", val: "C", col: 2, row: 0 },
      { id: "D", val: "D", col: 3, row: 0 },
    ],
    edges: [
      { id: "eac", from: "A", to: "C" },
      { id: "e2", from: "B", to: "C", style: "fading" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: 2,
    narration: "B is unreachable. Garbage collector reclaims it.",
  },
  {
    nodes: [
      { id: "A", val: "A", col: 0, row: 0, pointers: ["head"] },
      { id: "C", val: "C", col: 1, row: 0 },
      { id: "D", val: "D", col: 2, row: 0 },
    ],
    edges: [
      { id: "eac", from: "A", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "null" },
    ],
    codeLine: -1,
    narration: "Done. Node B is removed.",
  },
];

type Mode = "prepend" | "insert" | "delete";

export default function OperationsScene() {
  const [mode, setMode] = useState<Mode>("prepend");
  const [stepIdx, setStepIdx] = useState(0);

  const steps =
    mode === "prepend" ? PREPEND_STEPS : mode === "insert" ? INSERT_STEPS : DELETE_STEPS;
  const currentStep = steps[stepIdx];
  const codeBlock =
    mode === "prepend" ? PREPEND_CODE : mode === "insert" ? INSERT_CODE : DELETE_CODE;

  const handleNext = () => setStepIdx((p) => Math.min(p + 1, steps.length - 1));
  const handlePrev = () => setStepIdx((p) => Math.max(p - 1, 0));
  const handleReset = () => setStepIdx(0);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setStepIdx(0);
  };

  const getColX = (col: number) => 80 + col * 130;
  const getRowY = (row: number) => 180 + row * 100;

  const getIntersection = (x1: number, y1: number, x2: number, y2: number, rx: number, ry: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) return { x: x1, y: y1 };
    const scaleX = Math.abs(rx / dx);
    const scaleY = Math.abs(ry / dy);
    const scale = Math.min(scaleX, scaleY);
    return {
      x: x1 + dx * scale,
      y: y1 + dy * scale,
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex gap-2 p-1 bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-xl w-fit">
        {(["prepend", "insert", "delete"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {m === "prepend" ? "Prepend" : m === "insert" ? "Insert After" : "Delete"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex-1 flex flex-col">
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto flex-1">
              {codeBlock.map((line, idx) => {
                const isActive = idx === currentStep.codeLine;
                return (
                  <div
                    key={idx}
                    className={`px-4 py-1.5 -mx-4 transition-colors ${
                      isActive
                        ? "bg-blue-500/10 text-blue-300 border-l-2 border-blue-400"
                        : "text-gray-400 border-l-2 border-transparent"
                    }`}
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-xl h-[400px] relative overflow-hidden flex-1 shadow-2xl">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrow-normal"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
                </marker>
                <marker
                  id="arrow-dashed"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
                </marker>
                <marker
                  id="arrow-fading"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
              </defs>

              {currentStep.edges.map((edge) => {
                const fromNode = currentStep.nodes.find((n) => n.id === edge.from);
                if (!fromNode) return null;

                const x1 = getColX(fromNode.col);
                const y1 = getRowY(fromNode.row);

                let x2, y2;
                if (edge.to === "null") {
                  x2 = x1 + 100;
                  y2 = y1;
                } else {
                  const toNode = currentStep.nodes.find((n) => n.id === edge.to);
                  if (!toNode) return null;
                  x2 = getColX(toNode.col);
                  y2 = getRowY(toNode.row);
                }

                const start = getIntersection(x1, y1, x2, y2, 32, 24);
                const end = getIntersection(x2, y2, x1, y1, 38, 30); 

                const isCurve = Math.abs(x2 - x1) > 150 && y1 === y2;
                const pathD = isCurve
                  ? `M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${start.y - 80} ${end.x} ${end.y}`
                  : `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

                let strokeColor = "#9ca3af";
                let strokeDash = "none";
                let marker = "url(#arrow-normal)";

                if (edge.style === "dashed") {
                  strokeColor = "#4ade80";
                  strokeDash = "5,5";
                  marker = "url(#arrow-dashed)";
                } else if (edge.style === "fading") {
                  strokeColor = "#ef4444";
                  marker = "url(#arrow-fading)";
                }

                return (
                  <motion.path
                    key={`${mode}-${edge.id}-${stepIdx}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: edge.style === "fading" ? 0.2 : 1 }}
                    transition={{ duration: 0.5 }}
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeDasharray={strokeDash}
                    markerEnd={marker}
                  />
                );
              })}

              {currentStep.edges.map((edge) => {
                if (edge.to !== "null") return null;
                const fromNode = currentStep.nodes.find((n) => n.id === edge.from);
                if (!fromNode) return null;
                const x = getColX(fromNode.col) + 120;
                const y = getRowY(fromNode.row);
                return (
                  <motion.text
                    key={`null-${edge.id}-${stepIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    x={x}
                    y={y + 5}
                    fill="#9ca3af"
                    fontSize="14"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    null
                  </motion.text>
                );
              })}
            </svg>

            <AnimatePresence>
              {currentStep.nodes.map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8, x: getColX(node.col) - 32, y: getRowY(node.row) - 24 }}
                  animate={{ opacity: node.status === "deleting" ? 0 : 1, scale: 1, x: getColX(node.col) - 32, y: getRowY(node.row) - 24 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`absolute w-[64px] h-[48px] rounded-lg border-2 flex items-center justify-center text-lg font-bold shadow-lg
                    ${
                      node.status === "new"
                        ? "bg-green-500/20 border-green-400 text-green-300"
                        : "bg-blue-500/20 border-blue-400 text-blue-300"
                    }
                  `}
                >
                  {node.val}

                  {node.pointers && node.pointers.length > 0 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      {node.pointers.map((p, i) => (
                        <div
                          key={p}
                          className="bg-purple-500/20 border border-purple-500/50 text-purple-300 text-[10px] px-1.5 py-0.5 rounded"
                          style={{ marginTop: i > 0 ? -4 : 0 }}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/80 font-medium text-sm sm:text-base flex-1">
              {currentStep.narration}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={stepIdx === 0}
                className="p-2 rounded-lg bg-white/5 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={stepIdx === steps.length - 1}
                className="p-2 rounded-lg bg-white/5 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
