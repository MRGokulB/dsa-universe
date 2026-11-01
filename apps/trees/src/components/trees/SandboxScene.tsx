"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, RefreshCw, Terminal, RotateCw } from "lucide-react";

interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

const DEFAULT_TREE: TreeNode = {
  val: 50,
  left: {
    val: 30,
    left: { val: 20, left: null, right: null },
    right: { val: 40, left: null, right: null }
  },
  right: {
    val: 70,
    left: { val: 60, left: null, right: null },
    right: { val: 80, left: null, right: null }
  }
};

function insertNode(root: TreeNode | null, val: number): TreeNode {
  if (!root) return { val, left: null, right: null };
  if (val === root.val) return root;
  if (val < root.val) {
    return { ...root, left: insertNode(root.left || null, val) };
  } else {
    return { ...root, right: insertNode(root.right || null, val) };
  }
}

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  return {
    val: root.val,
    left: invertTree(root.right || null),
    right: invertTree(root.left || null)
  };
}

export default function SandboxScene() {
  const [tree, setTree] = useState<TreeNode>(DEFAULT_TREE);
  const [inputValue, setInputValue] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [foundNode, setFoundNode] = useState<number | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "BST initialized with root 50.",
    "Ready for operations: insert, search, or invert."
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-7), msg]);
  };

  const handleInsert = () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num)) return;
    setTree((prev) => insertNode(prev, num));
    addLog(`bst.insert(${num}) -> updated tree structure`);
    setInputValue("");
    setHighlightedNodes([num]);
    setFoundNode(null);
    setNotFound(false);
  };

  const handleSearch = () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num)) return;
    const path: number[] = [];
    let curr: TreeNode | null | undefined = tree;
    let found = false;

    while (curr) {
      path.push(curr.val);
      if (curr.val === num) {
        found = true;
        break;
      }
      if (num < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    setHighlightedNodes(path);
    if (found) {
      setFoundNode(num);
      setNotFound(false);
      addLog(`bst.search(${num}) -> FOUND along path [${path.join(" -> ")}]`);
    } else {
      setFoundNode(null);
      setNotFound(true);
      addLog(`bst.search(${num}) -> NOT FOUND (explored ${path.join(" -> ")})`);
    }
  };

  const handleInvert = () => {
    setTree((prev) => invertTree(prev) || DEFAULT_TREE);
    setHighlightedNodes([]);
    setFoundNode(null);
    setNotFound(false);
    addLog("bst.invert() -> all left and right pointers mirrored");
  };

  const handleReset = () => {
    setTree(DEFAULT_TREE);
    setHighlightedNodes([]);
    setFoundNode(null);
    setNotFound(false);
    addLog("bst.reset() -> reset to default balanced tree");
  };

  const renderNode = (node: TreeNode | null | undefined, depth: number = 0): React.ReactNode => {
    if (!node) return null;

    const isHighlighted = highlightedNodes.includes(node.val);
    const isFound = foundNode === node.val;

    return (
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: isFound ? 1.15 : isHighlighted ? 1.08 : 1,
            borderColor: isFound
              ? "rgba(52,211,153,1)"
              : isHighlighted
              ? "rgba(245,158,11,1)"
              : "rgba(255,255,255,0.15)",
            backgroundColor: isFound
              ? "rgba(52,211,153,0.2)"
              : isHighlighted
              ? "rgba(245,158,11,0.2)"
              : "rgba(255,255,255,0.05)"
          }}
          className="w-12 h-12 rounded-2xl border flex items-center justify-center font-mono font-bold text-sm text-white shadow-lg transition-colors"
        >
          {node.val}
        </motion.div>

        {(node.left || node.right) && (
          <div className="flex gap-4 sm:gap-8 mt-4 pt-2 border-t border-white/10 relative">
            <div className="flex flex-col items-center">
              {node.left ? renderNode(node.left, depth + 1) : <div className="w-10 h-6 flex items-center justify-center text-xs text-white/20 font-mono">null</div>}
            </div>
            <div className="flex flex-col items-center">
              {node.right ? renderNode(node.right, depth + 1) : <div className="w-10 h-6 flex items-center justify-center text-xs text-white/20 font-mono">null</div>}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 05 &middot; Interactive Sandbox
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Binary Search Tree Lab
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Insert new keys, trace logarithmic search pathways, or mirror the entire tree in real-time.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col items-center p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="w-full flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Value (e.g. 35)"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-amber-400/50 w-32"
              />
              <button
                onClick={handleInsert}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 font-mono text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Insert
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 font-mono text-xs transition-colors"
              >
                <Search className="w-3.5 h-3.5" /> Search
              </button>
              <button
                onClick={handleInvert}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 font-mono text-xs transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" /> Invert
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors ml-auto"
                title="Reset Tree"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {notFound && (
              <div className="w-full mb-4 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono text-center">
                Value not found in BST.
              </div>
            )}

            <div className="w-full min-h-[320px] flex items-center justify-center p-4 overflow-x-auto">
              {renderNode(tree)}
            </div>
          </div>

          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full">
            <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest mb-4">
              <Terminal className="w-4 h-4 text-amber-400" />
              Execution Console
            </div>
            <div className="font-mono text-xs text-white/60 space-y-2 flex-1">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-white/5 pb-1">
                  <span className="text-amber-400/80">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
