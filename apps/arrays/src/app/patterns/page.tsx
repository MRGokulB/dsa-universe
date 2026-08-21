"use client";

import { PatternsScene } from "@/components/arrays/PatternsScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full block">
      <PatternsScene />
      <NextSection 
        href="/quiz" 
        title="Knowledge Check" 
        description="Test your understanding of Arrays and Big O notation." 
      />
    </div>
  );
}
