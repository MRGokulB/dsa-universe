"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Boxes,
  Cpu,
  Layers,
  Sparkles,
  Command,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const completeTour = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("dsa_tour_seen_v2", "true");
    } catch {
      // Local storage not available
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setStep(0);
      setIsOpen(true);
    };
    window.addEventListener("open-dsa-tour", handleOpen);

    try {
      const seen = localStorage.getItem("dsa_tour_seen_v2");
      if (!seen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("open-dsa-tour", handleOpen);
        };
      }
    } catch {
      // Local storage not available
    }

    return () => window.removeEventListener("open-dsa-tour", handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        completeTour();
      } else if (e.key === "ArrowRight") {
        setStep((prev) => Math.min(prev + 1, 3));
      } else if (e.key === "ArrowLeft") {
        setStep((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, completeTour]);

  const steps = [
    {
      kicker: "ECOSYSTEM ARCHITECTURE",
      title: "Parent Hub & Standalone Child Visualizers",
      subtitle: "Understand the dual-tier design of the DSA Universe.",
      icon: Boxes,
      iconColor: "#059669",
      iconBg: "#d1fae5",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] font-bold">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-emerald-400">
                PARENT HUB (You are here)
              </span>
              <span className="text-slate-400">&harr;</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                6 CHILD APPS
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600">
              This application functions as your <strong>Central Command Deck</strong>. It provides high-level architectural telemetry, live memory step-simulations, and instant cross-domain switching.
            </p>
          </div>
          <p>
            Each module links directly to a dedicated <strong>Child Application</strong> (e.g. Arrays, Linked Lists, Trees, Graphs, DP) equipped with in-depth chapter storytelling, sandboxes, and quizzes.
          </p>
        </div>
      )
    },
    {
      kicker: "INTERACTIVE TEST BENCH",
      title: "Live Silicon Memory Console",
      subtitle: "Micro-benchmarks and hardware-level state tracing.",
      icon: Cpu,
      iconColor: "#2563eb",
      iconBg: "#dbeafe",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 mb-1">1. CRT Oscilloscope</div>
              <div className="text-[10px] text-slate-500">
                Sweeping electron beam tracing asymptotic curves: O(1), O(log N), O(N), O(E log V).
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 mb-1">2. Hardware Die Stepper</div>
              <div className="text-[10px] text-slate-500">
                Click Step Pointers to advance two-pointer convergence, LIFO stack frames, or DP memoization.
              </div>
            </div>
          </div>
          <p>
            Use the <strong>Mechanical Channel Selector</strong> or press keys <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-800">1</kbd> through <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-800">6</kbd> to change the active domain instantly.
          </p>
        </div>
      )
    },
    {
      kicker: "DEEP-DIVE EXPEDITIONS",
      title: "Deploying into Child Applications",
      subtitle: "Multi-chapter standalone interactive visualizers.",
      icon: Layers,
      iconColor: "#7c3aed",
      iconBg: "#ede9fe",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-1.5">
            <div className="font-bold text-purple-900 text-xs">Inside Each Standalone Child App:</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-mono text-purple-800">
              <div>&bull; Chapter 1: The Real-World Analogy</div>
              <div>&bull; Chapter 2: Hardware Memory Layout</div>
              <div>&bull; Chapter 3: Big-O Complexity Graph</div>
              <div>&bull; Chapter 4: Core LeetCode Patterns</div>
              <div>&bull; Chapter 5: Interactive Live Sandbox</div>
              <div>&bull; Chapter 6: Concept Mastery Quiz</div>
            </div>
          </div>
          <p>
            Click <strong>Full Workbench ↗</strong> on the central console or <strong>Deploy Module ↗</strong> on any card below to launch the standalone child application in a dedicated window.
          </p>
        </div>
      )
    },
    {
      kicker: "NAVIGATION & SHORTCUTS",
      title: "Keyboard Hotkeys & Quick Access",
      subtitle: "Fly through data structures at maximum velocity.",
      icon: Command,
      iconColor: "#d97706",
      iconBg: "#fef3c7",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Channel Keys:</span>
              <span className="font-bold text-slate-900">Keys [ 1 - 6 ]</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Close Tour / Modals:</span>
              <span className="font-bold text-slate-900">Escape</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Reopen Onboarding:</span>
              <span className="font-bold text-emerald-700">Tour button in Header</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Tip: You can navigate backwards and forwards through this tour anytime using the Left and Right arrow keys.
          </p>
        </div>
      )
    }
  ];

  const current = steps[step];
  const IconComp = current.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-900"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: current.iconBg }}
                >
                  <IconComp size={18} style={{ color: current.iconColor }} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
                    {current.kicker}
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-700">
                    Step {step + 1} of {steps.length}
                  </span>
                </div>
              </div>

              <button
                onClick={completeTour}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                aria-label="Close tour"
              >
                <X size={18} />
              </button>
            </div>

            <h3 id="tour-title" className="text-xl sm:text-2xl font-clash font-bold text-slate-900 tracking-tight mb-1">
              {current.title}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {current.subtitle}
            </p>

            <div className="min-h-[160px] mb-6">
              {current.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === step
                        ? "w-7 bg-emerald-600"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Back</span>
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="px-4 py-2 min-h-[40px] rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <span>Next</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={completeTour}
                      className="px-4 py-2 min-h-[40px] rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Explore Hub</span>
                    </button>
                    <a
                      href="https://arrays-rho.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={completeTour}
                      className="px-3.5 py-2 min-h-[40px] rounded-xl bg-emerald-600 hover:bg-emerald-500 !text-white font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <span className="!text-white">Open Arrays ↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
