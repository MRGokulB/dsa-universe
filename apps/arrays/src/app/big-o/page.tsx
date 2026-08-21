"use client";

import { ComplexityScene } from "@/components/arrays/ComplexityScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full flex flex-col">
      <ComplexityScene />
      <NextSection 
        href="/sandbox" 
        title="Sandbox" 
        description="Write code and interact with arrays live in memory." 
      />
    </div>
  );
}
