"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Maximize, 
  Minimize,
  BookOpen,
  Cpu,
  BarChart,
  TerminalSquare,
  SearchCode,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  const navItems = [
    { name: "Curriculum", href: "/", icon: LayoutDashboard },
    { name: "The Analogy", href: "/analogy", icon: BookOpen },
    { name: "Memory", href: "/memory", icon: Cpu },
    { name: "Big O", href: "/big-o", icon: BarChart },
    { name: "Sandbox", href: "/sandbox", icon: TerminalSquare },
    { name: "Patterns", href: "/patterns", icon: SearchCode },
    { name: "Quiz", href: "/quiz", icon: CheckCircle2 },
  ];

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="relative group">
              <div 
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-white/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" 
                    : "text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                
                {/* Tooltip */}
                {hoveredIdx === i && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute -top-12 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold whitespace-nowrap shadow-xl pointer-events-none"
                  >
                    {item.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                  </motion.div>
                )}
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  />
                )}
              </div>
            </Link>
          );
        })}

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button 
          onClick={toggleFullscreen}
          onMouseEnter={() => setHoveredIdx(99)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="relative flex items-center justify-center w-12 h-12 rounded-xl text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          {hoveredIdx === 99 && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-12 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold whitespace-nowrap shadow-xl pointer-events-none"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
            </motion.div>
          )}
        </button>
      </div>
    </motion.div>
  );
}
