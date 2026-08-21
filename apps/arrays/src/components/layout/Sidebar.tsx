"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Menu, 
  X, 
  Maximize, 
  Minimize,
  BookOpen,
  Cpu,
  BarChart,
  TerminalSquare,
  SearchCode,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-white"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Container */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 256,
          x: 0
        }}
        className={`hidden md:flex h-screen sticky top-0 border-r border-white/5 bg-[#09090b]/80 backdrop-blur-xl z-50 flex-col py-8 transition-all duration-500`}
      >
        <div className={`px-6 mb-8 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && <h1 className="text-xl font-bold tracking-tighter text-gradient whitespace-nowrap">Arrays</h1>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                  <item.icon size={20} className="min-w-[20px]" />
                  {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <button 
            onClick={toggleFullscreen}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 border border-transparent ${isCollapsed ? 'justify-center' : ''}`}
          >
            {isFullscreen ? <Minimize size={20} className="min-w-[20px]" /> : <Maximize size={20} className="min-w-[20px]" />}
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Full Screen</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#09090b] border-r border-white/10 z-[70] flex flex-col py-8"
            >
              <div className="px-6 mb-8 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tighter text-gradient">Arrays</h1>
                <button onClick={() => setIsMobileOpen(false)} className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileOpen(false)}>
                      <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
