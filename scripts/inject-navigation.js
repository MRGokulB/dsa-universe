const fs = require('fs');
const path = require('path');

const apps = [
  { dir: 'arrays', name: 'Arrays' },
  { dir: 'linked-lists', name: 'Linked Lists' }
];

const componentCode = `\
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function NavigationControls({ topicName }: { topicName: string }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setShowTopBtn(currentScrollY > 300);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 left-6 z-50 flex items-center"
      >
        <Link 
          href="https://home-two-rust.vercel.app/" 
          className="group flex items-center gap-3 px-4 py-2 bg-[#050505]/80 hover:bg-[#111] border border-white/10 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md text-sm font-mono shadow-2xl"
        >
          {/* Mini Logo for DSA */}
          <div className="relative flex items-center justify-center w-6 h-6 group-hover:scale-110 transition-transform">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-sm" />
            <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
              <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="8" />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-tight">DSA Universe</span>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{topicName}</span>
          </div>
        </Link>
      </motion.div>

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/50 backdrop-blur-md transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
`;

const basePath = 'D:/FreeLance/DSA visualizations/dsa-universe/apps';

apps.forEach(app => {
  const compDir = path.join(basePath, app.dir, 'src/components/navigation');
  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true });
  }
  
  const compPath = path.join(compDir, 'NavigationControls.tsx');
  fs.writeFileSync(compPath, componentCode, 'utf8');

  const layoutPath = path.join(basePath, app.dir, 'src/app/layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    if (!layoutContent.includes('NavigationControls')) {
      layoutContent = layoutContent.replace(
        'import "./globals.css";',
        'import "./globals.css";\nimport { NavigationControls } from "@/components/navigation/NavigationControls";'
      );
    }
    
    layoutContent = layoutContent.replace(/import Link from "next\/link";\n/, '');
    layoutContent = layoutContent.replace(/import { ArrowLeft } from "lucide-react";\n/, '');
    
    const linkRegex = /<Link[\s\S]*?<\/Link>/g;
    layoutContent = layoutContent.replace(linkRegex, '<NavigationControls topicName="' + app.name + '" />');
    
    fs.writeFileSync(layoutPath, layoutContent, 'utf8');
    console.log("Updated " + app.dir);
  }
});
console.log("Done updating DSA apps.");
