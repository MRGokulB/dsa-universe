"use client";

import MemoryScene from "@/components/linked-lists/MemoryScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div className="relative w-full block">
      <MemoryScene />
      <NextSection
        href="/operations"
        title="Operations"
        description="Watch pointer rewiring step by step — insert, delete, and traverse."
      />
    </div>
  );
}
