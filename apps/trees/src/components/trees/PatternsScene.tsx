"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, RotateCcw, GitBranch, Layers } from "lucide-react";

interface Step {
  line: number;
  text: string;
  activeId: number | null;
  targetA?: number;
  targetB?: number;
  lcaFound?: number | null;
  currentDepth?: number;
}

export default function PatternsScene() {
  const [activeTab, setActiveTab] = useState<"lca" | "depth">("lca");
  const [stepIdx, setStepIdx] = useState(0);

  const lcaCode = [
    "function lowestCommonAncestor(root, p, q) {",
    "  let curr = root;",
    "  while (curr) {",
    "    if (p.val < curr.val && q.val < curr.val) curr = curr.left;",
    "    else if (p.val > curr.val && q.val > curr.val) curr = curr.right;",
    "    else return curr; // Split point or match is LCA",
    "  }",
    "}"
  ];

  const depthCode = [
    "function maxDepth(node) {",
    "  if (!node) return 0;",
    "  let leftDepth = maxDepth(node.left);",
    "  let rightDepth = maxDepth(node.right);",
    "  return 1 + Math.max(leftDepth, rightDepth);",
    "}"
  ];

  const lcaSteps: Step[] = [
    { line: 1, text: "Start at root node (50). Targets: p = 20, q = 40.", activeId: 50, targetA: 20, targetB: 40, lcaFound: null },
    { line: 3, text: "Compare with 50: 20 < 50 AND 40 < 50. Both targets in left subtree. Move to curr.left (30).", activeId: 30, targetA: 20, targetB: 40, lcaFound: null },
    { line: 4, text: "Compare with 30: 20 < 30 but 40 > 30. Paths split here!", activeId: 30, targetA: 20, targetB: 40, lcaFound: null },
    { line: 5, text: "Split point reached: Node 30 is the Lowest Common Ancestor (LCA).", activeId: 30, targetA: 20, targetB: 40, lcaFound: 30 }
  ];

  const depthSteps: Step[] = [
    { line: 1, text: "Call maxDepth(50). Need depth of left and right subtrees.", activeId: 50, currentDepth: 1 },
    { line: 2, text: "Descend left: call maxDepth(30).", activeId: 30, currentDepth: 2 },
    { line: 2, text: "Descend left: call maxDepth(20). Both children are null (depth = 0).", activeId: 20, currentDepth: 3 },
    { line: 4, text: "Node 20 returns 1 + max(0, 0) = 1. Back up to 30.", activeId: 30, currentDepth: 2 },
    { line: 3, text: "At node 30, descend right: call maxDepth(40). Returns 1.", activeId: 40, currentDepth: 3 },
    { line: 4, text: "Node 30 returns 1 + max(1, 1) = 2. Back up to root 50.", activeId: 50, currentDepth: 2 },
    { line: 3, text: "Now compute right subtree: maxDepth(70) yields 2.", activeId: 70, currentDepth: 2 },
    { line: 4, text: "Root returns 1 + max(2, 2) = 3. Total Maximum Tree Depth = 3.", activeId: 50, currentDepth: 3 }
  ];

  const currentSteps = activeTab === "lca" ? lcaSteps : depthSteps;
  const currentStep = currentSteps[stepIdx] || currentSteps[0];
  const codeLines = activeTab === "lca" ? lcaCode : depthCode;

  const handleNext = () => {
    if (stepIdx < currentSteps.length - 1) setStepIdx(stepIdx + 1);
  };

  const handlePrev = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const handleReset = () => {
    setStepIdx(0);
  };

  const switchTab = (tab: "lca" | "depth") => {
    setActiveTab(tab);
    setStepIdx(0);
  };

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 04 &middot; Essential Patterns
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Master the Recursive Laws
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Solve top interview problems by exploiting hierarchical branching and recursive bottom-up returns.
          </p>
        </div>

        <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <button
            onClick={() => switchTab("lca")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === "lca"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <GitBranch className="w-4 h-4" />
            Lowest Common Ancestor
          </button>
          <button
            onClick={() => switchTab("depth")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === "depth"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4" />
            Maximum Tree Depth
          </button>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col items-center gap-6 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                Visual State
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Step {stepIdx + 1} of {currentSteps.length}
              </span>
            </div>

            <div className="relative w-full h-64 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                    currentStep.activeId === 50
                      ? "border-2 border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110"
                      : "border border-white/20 bg-white/5 text-white/80"
                  }`}
                >
                  50
                </div>

                <div className="flex gap-20 items-center">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                      currentStep.lcaFound === 30
                        ? "border-2 border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.5)] scale-115"
                        : currentStep.activeId === 30
                        ? "border-2 border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110"
                        : "border border-white/20 bg-white/5 text-white/80"
                    }`}
                  >
                    30
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                      currentStep.activeId === 70
                        ? "border-2 border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110"
                        : "border border-white/20 bg-white/5 text-white/80"
                    }`}
                  >
                    70
                  </div>
                </div>

                <div className="flex gap-8 items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xs transition-all duration-300 ${
                      activeTab === "lca" && currentStep.targetA === 20
                        ? "border-2 border-indigo-400 bg-indigo-500/20 text-indigo-300"
                        : currentStep.activeId === 20
                        ? "border-2 border-amber-400 bg-amber-400/20 text-amber-300"
                        : "border border-white/10 bg-white/5 text-white/60"
                    }`}
                  >
                    20
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xs transition-all duration-300 ${
                      activeTab === "lca" && currentStep.targetB === 40
                        ? "border-2 border-indigo-400 bg-indigo-500/20 text-indigo-300"
                        : currentStep.activeId === 40
                        ? "border-2 border-amber-400 bg-amber-400/20 text-amber-300"
                        : "border border-white/10 bg-white/5 text-white/60"
                    }`}
                  >
                    40
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-sm text-white/70 min-h-[4rem] flex items-center">
              {currentStep.text}
            </div>

            <div className="w-full flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title="Reset Stepper"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={stepIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={stepIdx === currentSteps.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-4">
              Algorithm Execution
            </span>
            <div className="font-mono text-xs leading-relaxed space-y-1">
              {codeLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentStep.line === idx
                      ? "bg-amber-500/20 text-amber-300 font-semibold border-l-2 border-amber-400"
                      : "text-white/40"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
