"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ChevronRight } from "lucide-react";

const TRAVERSALS = {
  inorder: {
    name: "In-Order (L &rarr; Root &rarr; R)",
    description: "Visits Left Subtree, then Root, then Right Subtree. On a BST, this produces elements in perfectly sorted order!",
    order: [20, 30, 40, 50, 60, 70, 80],
    steps: [
      { current: 20, visited: [20], desc: "Reach leftmost leaf: 20" },
      { current: 30, visited: [20, 30], desc: "Back up to parent: 30" },
      { current: 40, visited: [20, 30, 40], desc: "Visit right child of 30: 40" },
      { current: 50, visited: [20, 30, 40, 50], desc: "Visit tree root: 50" },
      { current: 60, visited: [20, 30, 40, 50, 60], desc: "Descend to right subtree leftmost: 60" },
      { current: 70, visited: [20, 30, 40, 50, 60, 70], desc: "Visit parent: 70" },
      { current: 80, visited: [20, 30, 40, 50, 60, 70, 80], desc: "Visit right child: 80" }
    ]
  },
  preorder: {
    name: "Pre-Order (Root &rarr; L &rarr; R)",
    description: "Visits Root first, then Left Subtree, then Right Subtree. Perfect for tree cloning and serialization.",
    order: [50, 30, 20, 40, 70, 60, 80],
    steps: [
      { current: 50, visited: [50], desc: "Process root immediately: 50" },
      { current: 30, visited: [50, 30], desc: "Process left child: 30" },
      { current: 20, visited: [50, 30, 20], desc: "Process left leaf: 20" },
      { current: 40, visited: [50, 30, 20, 40], desc: "Process right leaf: 40" },
      { current: 70, visited: [50, 30, 20, 40, 70], desc: "Move to right subtree root: 70" },
      { current: 60, visited: [50, 30, 20, 40, 70, 60], desc: "Process left child of 70: 60" },
      { current: 80, visited: [50, 30, 20, 40, 70, 60, 80], desc: "Process right child of 70: 80" }
    ]
  },
  postorder: {
    name: "Post-Order (L &rarr; R &rarr; Root)",
    description: "Processes both children before the parent. Essential for calculating folder sizes or deleting trees safely.",
    order: [20, 40, 30, 60, 80, 70, 50],
    steps: [
      { current: 20, visited: [20], desc: "Bottom left leaf: 20" },
      { current: 40, visited: [20, 40], desc: "Bottom right leaf: 40" },
      { current: 30, visited: [20, 40, 30], desc: "Parent of leaves: 30" },
      { current: 60, visited: [20, 40, 30, 60], desc: "Right subtree left leaf: 60" },
      { current: 80, visited: [20, 40, 30, 60, 80], desc: "Right subtree right leaf: 80" },
      { current: 70, visited: [20, 40, 30, 60, 80, 70], desc: "Parent of leaves: 70" },
      { current: 50, visited: [20, 40, 30, 60, 80, 70, 50], desc: "Finally visit root: 50" }
    ]
  }
};

export default function TraversalScene() {
  const [tab, setTab] = useState<"inorder" | "preorder" | "postorder">("inorder");
  const [stepIdx, setStepIdx] = useState(0);

  const curData = TRAVERSALS[tab];
  const curStep = curData.steps[stepIdx];

  const handleTabChange = (newTab: "inorder" | "preorder" | "postorder") => {
    setTab(newTab);
    setStepIdx(0);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-24 px-4 md:px-12 bg-transparent">
      <div className="max-w-4xl w-full text-center mb-10">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-2">Chapter 03 &middot; Navigation Strategies</span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The 4 Tree Traversals</h2>
        <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
          Unlike linear arrays with a single direction, trees offer multiple distinct paths to visit every single node.
        </p>
      </div>

      <div className="flex gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 mb-8">
        {(["inorder", "preorder", "postorder"] as const).map((key) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              tab === key
                ? "bg-amber-500 text-black font-bold shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-xl font-bold text-amber-300">{curData.name}</h4>
            <p className="text-xs text-white/50 max-w-md mt-1">{curData.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStepIdx(0)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => setStepIdx((prev) => Math.min(prev + 1, curData.steps.length - 1))}
              disabled={stepIdx === curData.steps.length - 1}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 disabled:opacity-40 transition-colors"
            >
              Next Node <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
          Step {stepIdx + 1} of {curData.steps.length}: {curStep.desc}
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-white/[0.02] rounded-2xl border border-white/5">
          <div className="flex flex-col items-center gap-6">
            <div
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
                curStep.current === 50
                  ? "border-amber-400 bg-amber-500/30 text-amber-300 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : curStep.visited.includes(50)
                  ? "border-amber-500/40 bg-amber-500/10 text-white"
                  : "border-white/10 bg-white/5 text-white/40"
              }`}
            >
              50
            </div>

            <div className="grid grid-cols-2 gap-16">
              <div
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                  curStep.current === 30
                    ? "border-amber-400 bg-amber-500/30 text-amber-300 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                    : curStep.visited.includes(30)
                    ? "border-amber-500/40 bg-amber-500/10 text-white"
                    : "border-white/10 bg-white/5 text-white/40"
                }`}
              >
                30
              </div>
              <div
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                  curStep.current === 70
                    ? "border-amber-400 bg-amber-500/30 text-amber-300 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                    : curStep.visited.includes(70)
                    ? "border-amber-500/40 bg-amber-500/10 text-white"
                    : "border-white/10 bg-white/5 text-white/40"
                }`}
              >
                70
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {[20, 40, 60, 80].map((val) => (
                <div
                  key={val}
                  className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    curStep.current === val
                      ? "border-amber-400 bg-amber-500/30 text-amber-300 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                      : curStep.visited.includes(val)
                      ? "border-amber-500/40 bg-amber-500/10 text-white"
                      : "border-white/10 bg-white/5 text-white/40"
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-white/40">Accumulated Output Sequence:</span>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-black/60 border border-white/10 overflow-x-auto min-h-[44px]">
            {curStep.visited.map((v, i) => (
              <span key={i} className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
