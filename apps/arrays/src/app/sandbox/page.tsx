"use client";

import { SandboxScene } from "@/components/arrays/SandboxScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full flex flex-col">
      <SandboxScene />
      <NextSection 
        href="/patterns" 
        title="Algorithmic Patterns" 
        description="Master Two Pointers and Sliding Window techniques." 
      />
    </div>
  );
}
