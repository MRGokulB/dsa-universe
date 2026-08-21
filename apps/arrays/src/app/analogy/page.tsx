"use client";

import { AnalogyScene } from "@/components/arrays/AnalogyScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";


import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div ref={ref} className="relative w-full block">
      <AnalogyScene />
      <NextSection 
        href="/memory" 
        title="Memory" 
        description="See exactly how arrays look inside your computer's RAM." 
      />
    </div>
  );
}
