"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Users, Play, Plus, Trash2, Eye } from "lucide-react";

export default function SandboxScene() {
  const [mode, setMode] = useState<"stack" | "queue">("stack");
  const [items, setItems] = useState<number[]>([10, 20, 30]);
  const [nextVal, setNextVal] = useState(40);
  const [message, setMessage] = useState<string>("Ready");

  const pushStack = () => {
    if (items.length >= 7) {
      setMessage("Stack Overflow! Maximum sandbox capacity reached.");
      return;
    }
    setItems((prev) => [...prev, nextVal]);
    setNextVal((prev) => prev + 10);
    setMessage(`Pushed ${nextVal} to top.`);
  };

  const popStack = () => {
    if (items.length === 0) {
      setMessage("Stack Underflow! Cannot pop from empty stack.");
      return;
    }
    const popped = items[items.length - 1];
    setItems((prev) => prev.slice(0, -1));
    setMessage(`Popped ${popped} from top.`);
  };

  const enqueue = () => {
    if (items.length >= 7) {
      setMessage("Queue Full! Buffer limit reached.");
      return;
    }
    setItems((prev) => [...prev, nextVal]);
    setNextVal((prev) => prev + 10);
    setMessage(`Enqueued ${nextVal} at rear.`);
  };

  const dequeue = () => {
    if (items.length === 0) {
      setMessage("Queue Underflow! No items to dequeue.");
      return;
    }
    const removed = items[0];
    setItems((prev) => prev.slice(1));
    setMessage(`Dequeued ${removed} from front.`);
  };

  const peek = () => {
    if (items.length === 0) {
      setMessage("Structure is empty.");
      return;
    }
    if (mode === "stack") {
      setMessage(`Peek Top: ${items[items.length - 1]}`);
    } else {
      setMessage(`Peek Front: ${items[0]}`);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-12 py-24 bg-transparent">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Chapter 05 &middot; Interactive Lab</span>
              <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  onClick={() => { setMode("stack"); setItems([10, 20, 30]); setMessage("Switched to Stack mode."); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    mode === "stack" ? "bg-emerald-500 text-black font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Stack
                </button>
                <button
                  onClick={() => { setMode("queue"); setItems([10, 20, 30]); setMessage("Switched to Queue mode."); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    mode === "queue" ? "bg-cyan-500 text-black font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Queue
                </button>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {mode === "stack" ? "Stack Workbench" : "Queue Workbench"}
            </h3>
            <p className="text-sm text-white/50 mb-6">
              {mode === "stack"
                ? "Items enter and exit from the Top. Observe how LIFO prevents access to the base."
                : "Items enter at the Rear and leave through the Front. FIFO guarantees order preservation."}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {mode === "stack" ? (
                <>
                  <button
                    onClick={pushStack}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-colors"
                  >
                    <Plus size={14} /> Push({nextVal})
                  </button>
                  <button
                    onClick={popStack}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={14} /> Pop()
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={enqueue}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors"
                  >
                    <Plus size={14} /> Enqueue({nextVal})
                  </button>
                  <button
                    onClick={dequeue}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={14} /> Dequeue()
                  </button>
                </>
              )}
              <button
                onClick={peek}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Eye size={14} /> Peek()
              </button>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70">
              Status: <span className="text-emerald-400 font-bold">{message}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 flex justify-between">
            <span>Size: {items.length} / 7</span>
            <span>Time Complexity: O(1)</span>
          </div>
        </div>

        <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center min-h-[360px]">
          {mode === "stack" ? (
            <div className="w-56 h-72 border-b-4 border-l-2 border-r-2 border-emerald-500/30 rounded-b-2xl p-4 flex flex-col-reverse gap-2 bg-white/[0.02]">
              <AnimatePresence>
                {items.map((val, idx) => (
                  <motion.div
                    key={val}
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`p-2.5 rounded-xl text-xs font-mono font-bold text-center border ${
                      idx === items.length - 1
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "bg-white/5 border-white/10 text-white/70"
                    }`}
                  >
                    {val} {idx === items.length - 1 && "&middot; TOP"}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full max-w-md">
              <div className="flex justify-between text-xs font-mono text-white/40 px-2">
                <span className="text-cyan-400 font-bold">&larr; FRONT (Dequeue)</span>
                <span className="text-emerald-400 font-bold">REAR (Enqueue) &rarr;</span>
              </div>
              <div className="flex items-center gap-2 p-4 rounded-2xl border border-cyan-500/30 bg-white/[0.02] min-h-[80px] overflow-x-auto">
                <AnimatePresence>
                  {items.map((val, idx) => (
                    <motion.div
                      key={val}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold shrink-0 border ${
                        idx === 0
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                          : idx === items.length - 1
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                          : "bg-white/5 border-white/10 text-white/70"
                      }`}
                    >
                      {val}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
