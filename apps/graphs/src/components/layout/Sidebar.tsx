"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe2,
  TableProperties,
  Compass,
  TerminalSquare,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();

  const navItems = [
    { name: "Intro", href: "#intro", icon: LayoutDashboard },
    { name: "Analogy", href: "#analogy", icon: Globe2 },
    { name: "Memory", href: "#representations", icon: TableProperties },
    { name: "Dijkstra", href: "#dijkstra", icon: Compass },
    { name: "Sandbox", href: "#sandbox", icon: TerminalSquare },
    { name: "Quiz", href: "#quiz", icon: CheckCircle2 },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.replace("#", ""));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

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
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)} 
              className="relative group"
            >
              <div
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 shadow-[inset_0_1px_1px_rgba(16,185,129,0.2)]"
                    : "text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
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
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl bg-emerald-400/10 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
