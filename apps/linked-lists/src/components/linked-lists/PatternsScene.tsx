"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, RotateCcw, Code2, Waypoints, Activity, Target } from "lucide-react";

export default function PatternsScene() {
  const [activeTab, setActiveTab] = useState<"reverse" | "cycle">("reverse");
  const [stepIdx, setStepIdx] = useState(0);

  const reverseCode = [
    "let prev = null, curr = head;",
    "while (curr !== null) {",
    "  let next = curr.next;",
    "  curr.next = prev;",
    "  prev = curr;",
    "  curr = next;",
    "}",
    "return prev;"
  ];

  const cycleCode = [
    "let slow = head, fast = head;",
    "while (fast && fast.next) {",
    "  slow = slow.next;",
    "  fast = fast.next.next;",
    "  if (slow === fast) return true;",
    "}",
    "return false;"
  ];

  const reverseSteps = [
    { line: 0, text: "Initialize prev to null and curr to head (node 1).", prev: null, curr: 1, next: null, links: {1:2, 2:3, 3:4, 4:5, 5:null} },
    { line: 1, text: "Check if curr is not null. It is node 1, so enter loop.", prev: null, curr: 1, next: null, links: {1:2, 2:3, 3:4, 4:5, 5:null} },
    { line: 2, text: "Save the next node (node 2) in next pointer.", prev: null, curr: 1, next: 2, links: {1:2, 2:3, 3:4, 4:5, 5:null} },
    { line: 3, text: "Reverse the link: set curr.next to prev (null).", prev: null, curr: 1, next: 2, links: {1:null, 2:3, 3:4, 4:5, 5:null} },
    { line: 4, text: "Move prev to curr (node 1).", prev: 1, curr: 1, next: 2, links: {1:null, 2:3, 3:4, 4:5, 5:null} },
    { line: 5, text: "Move curr to next (node 2).", prev: 1, curr: 2, next: 2, links: {1:null, 2:3, 3:4, 4:5, 5:null} },
    { line: 1, text: "Check if curr is not null. It is node 2, so continue loop.", prev: 1, curr: 2, next: 2, links: {1:null, 2:3, 3:4, 4:5, 5:null} },
    { line: 2, text: "Save the next node (node 3) in next pointer.", prev: 1, curr: 2, next: 3, links: {1:null, 2:3, 3:4, 4:5, 5:null} },
    { line: 3, text: "Reverse the link: set curr.next to prev (node 1).", prev: 1, curr: 2, next: 3, links: {1:null, 2:1, 3:4, 4:5, 5:null} },
    { line: 4, text: "Move prev to curr (node 2).", prev: 2, curr: 2, next: 3, links: {1:null, 2:1, 3:4, 4:5, 5:null} },
    { line: 5, text: "Move curr to next (node 3).", prev: 2, curr: 3, next: 3, links: {1:null, 2:1, 3:4, 4:5, 5:null} },
    { line: 1, text: "Check if curr is not null. It is node 3, so continue loop.", prev: 2, curr: 3, next: 3, links: {1:null, 2:1, 3:4, 4:5, 5:null} },
    { line: 2, text: "Save the next node (node 4) in next pointer.", prev: 2, curr: 3, next: 4, links: {1:null, 2:1, 3:4, 4:5, 5:null} },
    { line: 3, text: "Reverse the link: set curr.next to prev (node 2).", prev: 2, curr: 3, next: 4, links: {1:null, 2:1, 3:2, 4:5, 5:null} },
    { line: 4, text: "Move prev to curr (node 3).", prev: 3, curr: 3, next: 4, links: {1:null, 2:1, 3:2, 4:5, 5:null} },
    { line: 5, text: "Move curr to next (node 4).", prev: 3, curr: 4, next: 4, links: {1:null, 2:1, 3:2, 4:5, 5:null} },
    { line: 1, text: "Check if curr is not null. It is node 4, so continue loop.", prev: 3, curr: 4, next: 4, links: {1:null, 2:1, 3:2, 4:5, 5:null} },
    { line: 2, text: "Save the next node (node 5) in next pointer.", prev: 3, curr: 4, next: 5, links: {1:null, 2:1, 3:2, 4:5, 5:null} },
    { line: 3, text: "Reverse the link: set curr.next to prev (node 3).", prev: 3, curr: 4, next: 5, links: {1:null, 2:1, 3:2, 4:3, 5:null} },
    { line: 4, text: "Move prev to curr (node 4).", prev: 4, curr: 4, next: 5, links: {1:null, 2:1, 3:2, 4:3, 5:null} },
    { line: 5, text: "Move curr to next (node 5).", prev: 4, curr: 5, next: 5, links: {1:null, 2:1, 3:2, 4:3, 5:null} },
    { line: 1, text: "Check if curr is not null. It is node 5, so continue loop.", prev: 4, curr: 5, next: 5, links: {1:null, 2:1, 3:2, 4:3, 5:null} },
    { line: 2, text: "Save the next node (null) in next pointer.", prev: 4, curr: 5, next: null, links: {1:null, 2:1, 3:2, 4:3, 5:null} },
    { line: 3, text: "Reverse the link: set curr.next to prev (node 4).", prev: 4, curr: 5, next: null, links: {1:null, 2:1, 3:2, 4:3, 5:4} },
    { line: 4, text: "Move prev to curr (node 5).", prev: 5, curr: 5, next: null, links: {1:null, 2:1, 3:2, 4:3, 5:4} },
    { line: 5, text: "Move curr to next (null).", prev: 5, curr: null, next: null, links: {1:null, 2:1, 3:2, 4:3, 5:4} },
    { line: 1, text: "curr is now null. Loop terminates.", prev: 5, curr: null, next: null, links: {1:null, 2:1, 3:2, 4:3, 5:4} },
    { line: 7, text: "Return prev (node 5) as the new head of the reversed list.", prev: 5, curr: null, next: null, links: {1:null, 2:1, 3:2, 4:3, 5:4} },
  ];

  const cycleSteps = [
    { line: 0, text: "Initialize both slow (🐢) and fast (🐇) pointers to head.", slow: 1, fast: 1, met: false },
    { line: 1, text: "Check if fast and fast.next exist.", slow: 1, fast: 1, met: false },
    { line: 2, text: "Move slow 1 step to node 2.", slow: 2, fast: 1, met: false },
    { line: 3, text: "Move fast 2 steps to node 3.", slow: 2, fast: 3, met: false },
    { line: 4, text: "Check if slow equals fast. They haven't met.", slow: 2, fast: 3, met: false },
    { line: 1, text: "Check if fast and fast.next exist.", slow: 2, fast: 3, met: false },
    { line: 2, text: "Move slow 1 step to node 3.", slow: 3, fast: 3, met: false },
    { line: 3, text: "Move fast 2 steps to node 5.", slow: 3, fast: 5, met: false },
    { line: 4, text: "Check if slow equals fast. They haven't met.", slow: 3, fast: 5, met: false },
    { line: 1, text: "Check if fast and fast.next exist.", slow: 3, fast: 5, met: false },
    { line: 2, text: "Move slow 1 step to node 4.", slow: 4, fast: 5, met: false },
    { line: 3, text: "Move fast 2 steps: 5 -> 6 -> 3.", slow: 4, fast: 3, met: false },
    { line: 4, text: "Check if slow equals fast. They haven't met.", slow: 4, fast: 3, met: false },
    { line: 1, text: "Check if fast and fast.next exist.", slow: 4, fast: 3, met: false },
    { line: 2, text: "Move slow 1 step to node 5.", slow: 5, fast: 3, met: false },
    { line: 3, text: "Move fast 2 steps: 3 -> 4 -> 5.", slow: 5, fast: 5, met: false },
    { line: 4, text: "Cycle detected! They met at node 5.", slow: 5, fast: 5, met: true },
  ];

  const currentSteps = activeTab === "reverse" ? reverseSteps : cycleSteps;
  const currentCode = activeTab === "reverse" ? reverseCode : cycleCode;
  const step = currentSteps[stepIdx] as any;

  useEffect(() => {
    setStepIdx(0);
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col p-4 md:p-8 font-sans">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 flex-1">
        
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-white/[0.05] p-1 rounded-xl border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab("reverse")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "reverse" ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white"
              }`}
            >
              Reverse List
            </button>
            <button
              onClick={() => setActiveTab("cycle")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "cycle" ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white"
              }`}
            >
              Floyd's Cycle
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-[500px]">
          
          <div className="lg:col-span-5 flex flex-col h-full bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-2 flex items-center gap-2 text-xs text-white/40 font-mono">
                <Code2 className="w-4 h-4" />
                {activeTab === "reverse" ? "reverse.js" : "hasCycle.js"}
              </div>
            </div>
            
            <div className="p-4 flex-1 overflow-auto font-mono text-sm leading-relaxed">
              {currentCode.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-4 px-2 py-1 rounded transition-colors ${
                    step.line === idx ? "bg-white/[0.08] text-white" : "text-white/50"
                  }`}
                >
                  <span className="text-white/20 select-none w-4 text-right">{idx + 1}</span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col bg-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-white/40 text-sm font-medium">
              {activeTab === "reverse" ? <Waypoints className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
              {activeTab === "reverse" ? "Linked List State" : "Two Pointers"}
            </div>
            
            <div className="flex-1 w-full h-full relative flex items-center justify-center p-8">
              {activeTab === "reverse" ? (
                <ReverseVisualizer step={step} />
              ) : (
                <CycleVisualizer step={step} />
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col md:flex-row items-center gap-6 justify-between">
          
          <div className="flex-1 max-w-2xl">
            <div className="text-xs text-white/40 font-medium mb-1 uppercase tracking-wider">
              Step {stepIdx + 1} of {currentSteps.length}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`text-lg md:text-xl font-medium ${
                  activeTab === "cycle" && step.met ? "text-green-400" : "text-white/90"
                }`}
              >
                {step.text}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
              disabled={stepIdx === 0}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setStepIdx(0)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setStepIdx(Math.min(currentSteps.length - 1, stepIdx + 1))}
              disabled={stepIdx === currentSteps.length - 1}
              className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 disabled:opacity-30 disabled:hover:bg-white transition-all flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

function ReverseVisualizer({ step }: { step: any }) {
  const nodes = [1, 2, 3, 4, 5];
  
  return (
    <div className="w-full max-w-[800px] aspect-[8/3] flex items-center justify-center max-h-[400px]">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.2)" />
          </marker>
          <marker id="arrowhead-rev" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.6)" />
          </marker>
        </defs>
        
        {nodes.map((node) => {
          const nextNode = step.links[node];
          if (nextNode === undefined) return null;
          
          if (nextNode === null) {
            if (node === 1 && step.links[1] === null) {
              return (
                <path
                  key={`link-${node}-null`}
                  d="M 120 150 Q 80 150 50 150"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead-rev)"
                />
              );
            }
            if (node === 5 && step.links[5] === null) {
              return (
                <path
                  key={`link-${node}-null`}
                  d="M 680 150 L 720 150"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              );
            }
            return null;
          }
          
          const x1 = 120 + (node - 1) * 140;
          const x2 = 120 + (nextNode - 1) * 140;
          
          const isReversed = nextNode < node;
          
          if (isReversed) {
            return (
              <path
                key={`link-${node}-${nextNode}`}
                d={`M ${x1 - 30} 140 Q ${(x1 + x2)/2} 110 ${x2 + 30} 140`}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-rev)"
              />
            );
          } else {
            return (
              <path
                key={`link-${node}-${nextNode}`}
                d={`M ${x1 + 30} 150 L ${x2 - 30} 150`}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            );
          }
        })}
        
        {nodes.map((node) => {
          const centerX = 120 + (node - 1) * 140;
          return (
            <foreignObject key={`node-${node}`} x={centerX - 32} y={150 - 32} width="64" height="64" className="overflow-visible">
              <div className="w-full h-full bg-[#1a1a1a] border-2 border-white/20 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg text-white">
                {node}
              </div>
            </foreignObject>
          );
        })}
        
        <text x="30" y="154" fill="rgba(255,255,255,0.3)" fontFamily="monospace" fontSize="14" textAnchor="middle">null</text>
        <text x="770" y="154" fill="rgba(255,255,255,0.3)" fontFamily="monospace" fontSize="14" textAnchor="middle">null</text>
        
        <motion.foreignObject
          layoutId="prev"
          initial={false}
          animate={{ x: step.prev === null ? 10 : (120 + (step.prev - 1) * 140) - 32 }}
          y="200"
          width="64"
          height="32"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-visible"
        >
          <div className="w-full h-full flex justify-center">
            <div className="bg-gray-500/20 text-gray-400 border border-gray-500/30 px-3 py-1 rounded-full text-xs font-mono">prev</div>
          </div>
        </motion.foreignObject>
        
        <motion.foreignObject
          layoutId="curr"
          initial={false}
          animate={{ x: step.curr === null ? 720 : (120 + (step.curr - 1) * 140) - 32 }}
          y="60"
          width="64"
          height="32"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-visible"
        >
          <div className="w-full h-full flex justify-center">
            <div className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-mono">curr</div>
          </div>
        </motion.foreignObject>
        
        {step.next !== null && (
          <motion.foreignObject
            layoutId="next"
            initial={false}
            animate={{ x: (120 + (step.next - 1) * 140) - 32 }}
            y="240"
            width="64"
            height="32"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-visible"
          >
            <div className="w-full h-full flex justify-center">
              <div className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-mono">next</div>
            </div>
          </motion.foreignObject>
        )}
      </svg>
    </div>
  );
}

function CycleVisualizer({ step }: { step: any }) {
  const nodePositions: Record<number, {x: number, y: number}> = {
    1: { x: 100, y: 150 },
    2: { x: 220, y: 150 },
    3: { x: 340, y: 150 },
    4: { x: 440, y: 70 },
    5: { x: 540, y: 150 },
    6: { x: 440, y: 230 }
  };
  
  return (
    <div className="w-full max-w-[700px] aspect-[7/3] flex items-center justify-center max-h-[400px] relative">
      {step.met && (
        <div className="absolute inset-0 bg-green-500/5 pointer-events-none rounded-xl" />
      )}
      
      <svg className="w-full h-full overflow-visible" viewBox="0 0 700 300">
        <defs>
          <marker id="arrowhead-cycle" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
          </marker>
          <marker id="arrowhead-cycle-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(74,222,128,0.5)" />
          </marker>
        </defs>
        
        <path d="M 130 150 L 190 150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-cycle)" />
        <path d="M 250 150 L 310 150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-cycle)" />
        
        <path d="M 360 130 Q 400 70 410 70" stroke={step.met ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.3)"} strokeWidth="2" fill="none" markerEnd={step.met ? "url(#arrowhead-cycle-active)" : "url(#arrowhead-cycle)"} />
        <path d="M 470 70 Q 520 70 525 125" stroke={step.met ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.3)"} strokeWidth="2" fill="none" markerEnd={step.met ? "url(#arrowhead-cycle-active)" : "url(#arrowhead-cycle)"} />
        <path d="M 525 175 Q 520 230 470 230" stroke={step.met ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.3)"} strokeWidth="2" fill="none" markerEnd={step.met ? "url(#arrowhead-cycle-active)" : "url(#arrowhead-cycle)"} />
        <path d="M 410 230 Q 360 230 355 175" stroke={step.met ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.3)"} strokeWidth="2" fill="none" markerEnd={step.met ? "url(#arrowhead-cycle-active)" : "url(#arrowhead-cycle)"} />
        
        {Object.entries(nodePositions).map(([node, pos]) => {
          const numNode = parseInt(node);
          return (
            <foreignObject key={`cnode-${node}`} x={pos.x - 28} y={pos.y - 28} width="56" height="56" className="overflow-visible">
              <div className={`w-full h-full rounded-full flex items-center justify-center text-lg font-bold border-2 shadow-lg transition-colors duration-500 ${
                step.met && (numNode >= 3) ? "bg-green-950 border-green-500/50 text-green-400" : "bg-[#1a1a1a] border-white/20 text-white"
              }`}>
                {node}
              </div>
            </foreignObject>
          );
        })}
        
        {step.met && (
          <motion.foreignObject
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            x="350"
            y="160"
            width="200"
            height="60"
            className="overflow-visible"
          >
            <div className="w-full h-full flex flex-col items-center gap-2">
              <Target className="w-8 h-8 text-green-400" />
              <span className="text-green-400 font-medium text-sm">Met at {step.slow}</span>
            </div>
          </motion.foreignObject>
        )}
        
        <motion.foreignObject
          layoutId="slow"
          initial={false}
          animate={{ x: nodePositions[step.slow].x - 48, y: nodePositions[step.slow].y + 35 }}
          width="96"
          height="32"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-visible"
        >
          <div className="w-full h-full flex justify-center">
            <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-full text-xs font-mono font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
              <span>🐢</span> slow
            </div>
          </div>
        </motion.foreignObject>
        
        <motion.foreignObject
          layoutId="fast"
          initial={false}
          animate={{ x: nodePositions[step.fast].x - 48, y: nodePositions[step.fast].y - 65 }}
          width="96"
          height="32"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-visible"
        >
          <div className="w-full h-full flex justify-center">
            <div className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-full text-xs font-mono font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
              <span>🐇</span> fast
            </div>
          </div>
        </motion.foreignObject>
      </svg>
    </div>
  );
}
