"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SandboxScene() {
  const [list, setList] = useState<{ id: number; value: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [nextId, setNextId] = useState(1);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (op: string, currentList: { id: number; value: string }[]) => {
    const listStr = currentList.map((n) => `[${n.value}]`).join(" → ");
    const res = `head → ${listStr ? listStr + " → " : ""}null`;
    setLogs((prev) => [...prev, `${op.padEnd(20)} // ${res}`]);
  };

  const handlePrepend = () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    const newList = [{ id: nextId, value: v }, ...list];
    setNextId((prev) => prev + 1);
    setList(newList);
    addLog(`list.prepend(${v})`, newList);
    setInputValue("");
  };

  const handleAppend = () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    const newList = [...list, { id: nextId, value: v }];
    setNextId((prev) => prev + 1);
    setList(newList);
    addLog(`list.append(${v})`, newList);
    setInputValue("");
  };

  const handleDeleteFirst = () => {
    if (list.length === 0) return;
    const newList = list.slice(1);
    setList(newList);
    addLog("list.deleteFirst()", newList);
  };

  const handleDeleteLast = () => {
    if (list.length === 0) return;
    const newList = list.slice(0, -1);
    setList(newList);
    addLog("list.deleteLast()", newList);
  };

  const handleReverse = () => {
    if (list.length === 0) return;
    const newList = [...list].reverse();
    setList(newList);
    addLog("list.reverse()", newList);
  };

  const handleClear = () => {
    if (list.length === 0) return;
    setList([]);
    addLog("list.clear()", []);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-xl">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Value..."
          className="px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 w-28 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAppend();
          }}
        />
        <div className="w-px h-8 bg-white/10 mx-2" />
        <button
          onClick={handlePrepend}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium"
        >
          Prepend
        </button>
        <button
          onClick={handleAppend}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium"
        >
          Append
        </button>
        <button
          onClick={handleDeleteFirst}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium"
        >
          Delete First
        </button>
        <button
          onClick={handleDeleteLast}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium"
        >
          Delete Last
        </button>
        <button
          onClick={handleReverse}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium"
        >
          Reverse
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-red-400/80 hover:text-red-400 text-sm font-medium ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center text-white/50 text-sm px-2">
        Length: {list.length} node{list.length !== 1 ? "s" : ""}
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-[400px] w-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 overflow-hidden">
        {list.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/40 text-lg font-medium"
          >
            Your list is empty. Add a node to begin.
          </motion.div>
        ) : (
          <div className="flex items-center w-full overflow-x-auto pb-8 pt-12 px-8 min-h-[160px]">
            <AnimatePresence mode="popLayout">
              {list.map((node, index) => (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-center"
                >
                  <div className="relative flex flex-col items-center">
                    {index === 0 && (
                      <motion.div
                        layoutId="head-badge"
                        className="absolute -top-10 bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30 font-medium tracking-wider uppercase"
                      >
                        head
                      </motion.div>
                    )}
                    <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-lg font-mono font-bold text-white shadow-xl backdrop-blur-md">
                      {node.value}
                    </div>
                  </div>
                  <motion.div layout className="text-white/30 flex items-center px-3">
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              ))}
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/30 font-mono text-lg ml-2"
              >
                null
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="w-full bg-[#0d1117] rounded-2xl p-4 flex flex-col border border-white/5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="font-mono text-sm overflow-y-auto h-[180px] flex flex-col gap-1.5 px-2">
          {logs.length === 0 ? (
            <span className="text-white/30 italic">No operations yet...</span>
          ) : (
            logs.map((log, i) => {
              const [op, res] = log.split("//");
              return (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-white whitespace-pre shrink-0">{op}</span>
                  {res && <span className="text-white/40 whitespace-pre"> // {res}</span>}
                </div>
              );
            })
          )}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
}
