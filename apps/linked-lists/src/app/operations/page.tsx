"use client";

import OperationsScene from "@/components/linked-lists/OperationsScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full block">
      <OperationsScene />
      <NextSection
        href="/patterns"
        title="Patterns"
        description="Master list reversal and Floyd's cycle detection with animated pointers."
      />
    </div>
  );
}
