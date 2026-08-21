"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SandboxScene() {
  const [array, setArray] = useState([10, 20, 30]);
  const [nextVal, setNextVal] = useState(40);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const push = () => {
    if (array.length >= 8) return;
    setActiveLine(3); // Line of code for push
    setArray((prev) => [...prev, nextVal]);
    setNextVal((prev) => prev + 10);
    setTimeout(() => setActiveLine(null), 1500);
  };

  const pop = () => {
    if (array.length === 0) return;
    setActiveLine(5);
    setArray((prev) => prev.slice(0, -1));
    setTimeout(() => setActiveLine(null), 1500);
  };

  const unshift = () => {
    if (array.length >= 8) return;
    setActiveLine(7);
    setArray((prev) => [nextVal, ...prev]);
    setNextVal((prev) => prev + 10);
    setTimeout(() => setActiveLine(null), 1500);
  };

  const shift = () => {
    if (array.length === 0) return;
    setActiveLine(9);
    setArray((prev) => prev.slice(1));
    setTimeout(() => setActiveLine(null), 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-12 py-24 md:py-32 bg-[#09090b]">
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 h-auto lg:h-[600px]">
        
        {/* Code Panel */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col h-full border border-white/5 bg-black/40 overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-4 text-xs font-mono text-white/40">sandbox.js</span>
          </div>

          <pre className="font-mono text-xs md:text-sm leading-loose overflow-x-auto">
            <code className="text-white/70">
              <div className={`px-4 -mx-4 rounded transition-colors ${activeLine === 1 ? 'bg-white/10 text-white' : ''}`}>
                <span className="text-blue-400">const</span> arr = [10, 20, 30];
              </div>
              <div className="px-4 -mx-4 h-6" />
              
              <div className={`px-4 -mx-4 rounded transition-colors ${activeLine === 3 ? 'bg-blue-500/20 text-white' : ''}`}>
                arr.<span className="text-yellow-200">push</span>({nextVal}); <span className="text-green-400/50 ml-4">{"// O(1) Add to end"}</span>
              </div>
              <div className="px-4 -mx-4 h-6" />

              <div className={`px-4 -mx-4 rounded transition-colors ${activeLine === 5 ? 'bg-red-500/20 text-white' : ''}`}>
                arr.<span className="text-yellow-200">pop</span>(); <span className="text-green-400/50 ml-4">{"// O(1) Remove from end"}</span>
              </div>
              <div className="px-4 -mx-4 h-6" />

              <div className={`px-4 -mx-4 rounded transition-colors ${activeLine === 7 ? 'bg-blue-500/20 text-white' : ''}`}>
                arr.<span className="text-yellow-200">unshift</span>({nextVal}); <span className="text-red-400/50 ml-4">{"// O(n) Add to front (SHIFTS ALL)"}</span>
              </div>
              <div className="px-4 -mx-4 h-6" />

              <div className={`px-4 -mx-4 rounded transition-colors ${activeLine === 9 ? 'bg-red-500/20 text-white' : ''}`}>
                arr.<span className="text-yellow-200">shift</span>(); <span className="text-red-400/50 ml-4">{"// O(n) Remove from front (SHIFTS ALL)"}</span>
              </div>
            </code>
          </pre>
        </div>

        {/* Visual Canvas Panel */}
        <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col h-[400px] lg:h-full border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(120,119,198,0.1)_0,transparent_100%)] pointer-events-none" />
          
          <div className="flex-1 flex items-center justify-center perspective-[1000px] overflow-hidden">
            <motion.div 
              className="flex gap-2 md:gap-4 p-4 md:p-8 glass-panel border border-white/10 rounded-2xl transform scale-75 md:scale-100 origin-center"
              initial={{ rotateX: 20 }}
              animate={{ rotateX: 10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <AnimatePresence mode="popLayout">
                {array.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/30 italic">
                    []
                  </motion.div>
                )}
                
                {array.map((item, index) => (
                  <motion.div
                    key={item}
                    layout
                    initial={{ opacity: 0, scale: 0.5, y: -50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
                    className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold relative shadow-lg"
                  >
                    <div className="absolute -bottom-8 text-xs text-white/40 font-mono">[{index}]</div>
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <button onClick={unshift} disabled={array.length >= 8} className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors font-mono text-sm disabled:opacity-50">unshift()</button>
            <button onClick={shift} disabled={array.length === 0} className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors font-mono text-sm disabled:opacity-50">shift()</button>
            <button onClick={push} disabled={array.length >= 8} className="py-3 px-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 transition-colors font-mono text-sm disabled:opacity-50">push()</button>
            <button onClick={pop} disabled={array.length === 0} className="py-3 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-colors font-mono text-sm disabled:opacity-50">pop()</button>
          </div>
        </div>

      </div>
    </div>
  );
}
