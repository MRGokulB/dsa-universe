"use client";

import { MemoryScene } from "@/components/arrays/MemoryScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full flex flex-col">
      <MemoryScene />
      <NextSection 
        href="/big-o" 
        title="Big O Notation" 
        description="Learn why O(1) is fast and O(n) is slow with visual charts." 
      />
    </div>
  );
}
