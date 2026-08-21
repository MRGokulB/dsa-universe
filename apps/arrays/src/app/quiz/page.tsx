"use client";

import { QuizScene } from "@/components/arrays/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full block">
      <QuizScene />
      <NextSection 
        href="/" 
        title="Curriculum Hub" 
        description="Return to the main module hub." 
      />
    </div>
  );
}
