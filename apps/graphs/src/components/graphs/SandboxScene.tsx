"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Plus, Terminal, Share2 } from "lucide-react";

interface GraphData {
  nodes: { id: string; x: number; y: number }[];
  edges: [string, string][];
}

const DEFAULT_GRAPH: GraphData = {
  nodes: [
    { id: "1", x: 60, y: 120 },
    { id: "2", x: 150, y: 50 },
    { id: "3", x: 150, y: 190 },
    { id: "4", x: 260, y: 50 },
    { id: "5", x: 260, y: 190 },
    { id: "6", x: 340, y: 120 }
  ],
  edges: [
    ["1", "2"],
    ["1", "3"],
    ["2", "4"],
    ["3", "5"],
    ["4", "6"],
    ["5", "6"],
    ["2", "3"]
  ]
};

export default function SandboxScene() {
  const [graph, setGraph] = useState<GraphData>(DEFAULT_GRAPH);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [traversalType, setTraversalType] = useState<"BFS" | "DFS" | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Graph initialized with 6 vertices and 7 edges.",
    "Ready to execute BFS (Breadth-First) or DFS (Depth-First)."
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-7), msg]);
  };

  const runBFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setTraversalType("BFS");
    setVisitedNodes([]);
    addLog("BFS started from vertex 1 using a FIFO Queue.");

    const adj: Record<string, string[]> = {};
    graph.nodes.forEach((n) => (adj[n.id] = []));
    graph.edges.forEach(([u, v]) => {
      adj[u].push(v);
      adj[v].push(u);
    });

    const queue: string[] = ["1"];
    const visited = new Set<string>(["1"]);
    const order: string[] = [];

    while (queue.length > 0) {
      const u = queue.shift()!;
      order.push(u);
      setCurrentNode(u);
      setVisitedNodes([...order]);
      addLog(`Queue pop -> Visit vertex ${u}`);
      await new Promise((r) => setTimeout(r, 600));

      for (const v of adj[u]) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
        }
      }
    }

    setCurrentNode(null);
    setIsRunning(false);
    addLog(`BFS complete! Order: [${order.join(" -> ")}]`);
  };

  const runDFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setTraversalType("DFS");
    setVisitedNodes([]);
    addLog("DFS started from vertex 1 using recursion / LIFO Call Stack.");

    const adj: Record<string, string[]> = {};
    graph.nodes.forEach((n) => (adj[n.id] = []));
    graph.edges.forEach(([u, v]) => {
      adj[u].push(v);
      adj[v].push(u);
    });

    const visited = new Set<string>();
    const order: string[] = [];

    const dfs = async (u: string) => {
      visited.add(u);
      order.push(u);
      setCurrentNode(u);
      setVisitedNodes([...order]);
      addLog(`DFS descend -> Visit vertex ${u}`);
      await new Promise((r) => setTimeout(r, 600));

      for (const v of adj[u]) {
        if (!visited.has(v)) {
          await dfs(v);
        }
      }
    };

    await dfs("1");
    setCurrentNode(null);
    setIsRunning(false);
    addLog(`DFS complete! Order: [${order.join(" -> ")}]`);
  };

  const handleReset = () => {
    setGraph(DEFAULT_GRAPH);
    setVisitedNodes([]);
    setCurrentNode(null);
    setTraversalType(null);
    setIsRunning(false);
    addLog("Graph reset to default 6-node network.");
  };

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 04 &middot; Interactive Sandbox
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Graph Traversal Workbench
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Watch BFS ripple outwards level-by-level, or follow DFS dive down deepest branches.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col items-center p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="w-full flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <button
                onClick={runBFS}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 disabled:opacity-30 disabled:pointer-events-none font-mono text-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5" /> Run BFS
              </button>
              <button
                onClick={runDFS}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-30 disabled:pointer-events-none font-mono text-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5" /> Run DFS
              </button>
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors ml-auto"
                title="Reset Graph"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full h-72 flex items-center justify-center p-4">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
                {graph.edges.map(([u, v], idx) => {
                  const nodeU = graph.nodes.find((n) => n.id === u)!;
                  const nodeV = graph.nodes.find((n) => n.id === v)!;
                  const isTraversed = visitedNodes.includes(u) && visitedNodes.includes(v);
                  return (
                    <line
                      key={idx}
                      x1={nodeU.x}
                      y1={nodeU.y}
                      x2={nodeV.x}
                      y2={nodeV.y}
                      stroke={
                        isTraversed
                          ? traversalType === "BFS"
                            ? "rgba(6,182,212,0.8)"
                            : "rgba(16,185,129,0.8)"
                          : "rgba(255,255,255,0.15)"
                      }
                      strokeWidth={isTraversed ? 3 : 1.5}
                      strokeDasharray={isTraversed ? undefined : "3 3"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {graph.nodes.map((n) => {
                const isVisited = visitedNodes.includes(n.id);
                const isCurrent = currentNode === n.id;
                return (
                  <motion.div
                    key={n.id}
                    style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 240) * 100}%` }}
                    animate={{
                      scale: isCurrent ? 1.25 : isVisited ? 1.08 : 1,
                      borderColor: isCurrent
                        ? "#f59e0b"
                        : isVisited
                        ? traversalType === "BFS"
                          ? "#06b6d4"
                          : "#10b981"
                        : "rgba(255,255,255,0.2)",
                      backgroundColor: isCurrent
                        ? "rgba(245,158,11,0.3)"
                        : isVisited
                        ? traversalType === "BFS"
                          ? "rgba(6,182,212,0.25)"
                          : "rgba(16,185,129,0.25)"
                        : "rgba(255,255,255,0.05)"
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl border flex items-center justify-center font-mono font-bold text-xs text-white shadow-xl transition-colors cursor-pointer"
                  >
                    {n.id}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full">
            <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest mb-4">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Traversal Output
            </div>
            <div className="font-mono text-xs text-white/60 space-y-2 flex-1">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-white/5 pb-1">
                  <span className="text-emerald-400/80">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
