"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";

export function ArrayVisualizer() {
  const [array, setArray] = useState([10, 20, 30]);
  const [nextVal, setNextVal] = useState(40);

  const push = () => {
    if (array.length >= 8) return;
    setArray((prev) => [...prev, nextVal]);
    setNextVal((prev) => prev + 10);
  };

  const pop = () => {
    if (array.length === 0) return;
    setArray((prev) => prev.slice(0, -1));
  };

  const unshift = () => {
    if (array.length >= 8) return;
    setArray((prev) => [nextVal, ...prev]);
    setNextVal((prev) => prev + 10);
  };

  const shift = () => {
    if (array.length === 0) return;
    setArray((prev) => prev.slice(1));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      
      {/* 3D Container for Array Elements */}
      <div 
        className="w-full max-w-2xl h-48 flex items-center justify-center mb-12"
        style={{ perspective: "1000px" }}
      >
        <motion.div 
          className="flex gap-4 p-8 glass-card rounded-3xl"
          initial={{ rotateX: 20 }}
          animate={{ rotateX: 10 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <AnimatePresence mode="popLayout">
            {array.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/30 italic"
              >
                Array is empty
              </motion.div>
            )}
            
            {array.map((item, index) => (
              <motion.div
                key={item} // Key must be unique to the value for Framer Motion to track identity correctly
                layout
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: 50 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8
                }}
                className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative"
              >
                {/* Index Indicator */}
                <div className="absolute -bottom-6 text-xs text-white/40 font-mono">
                  [{index}]
                </div>
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Controls */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={unshift}
            disabled={array.length >= 8}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 transition-colors disabled:opacity-50"
          >
            <ArrowRight size={16} /> unshift()
          </button>
          
          <button 
            onClick={shift}
            disabled={array.length === 0}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 transition-colors disabled:opacity-50"
          >
            <ArrowLeft size={16} /> shift()
          </button>

          <button 
            onClick={push}
            disabled={array.length >= 8}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 transition-colors disabled:opacity-50"
          >
            push() <Plus size={16} />
          </button>

          <button 
            onClick={pop}
            disabled={array.length === 0}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 transition-colors disabled:opacity-50"
          >
            pop() <Minus size={16} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
