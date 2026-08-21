"use client";

import { SandboxScene } from "@/components/arrays/SandboxScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full block">
      <SandboxScene />
      <NextSection 
        href="/patterns" 
        title="Algorithmic Patterns" 
        description="Master Two Pointers and Sliding Window techniques." 
      />
    </div>
  );
}
