"use client";

import { PatternsScene } from "@/components/arrays/PatternsScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen">
      <Link href="/" className="fixed top-8 left-8 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 text-sm text-white/60 hover:text-white glass-panel border border-white/10">
        <ArrowLeft size={16} /> Back to Module Hub
      </Link>
      <PatternsScene />
    </div>
  );
}
