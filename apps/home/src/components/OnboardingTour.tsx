"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, MonitorPlay, Layers } from "lucide-react";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Only show once per user
    const hasSeenTour = localStorage.getItem("dsa_tour_seen");
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    setIsOpen(false);
    localStorage.setItem("dsa_tour_seen", "true");
  };

  const nextStep = () => {
    if (step === 2) {
      completeTour();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const steps = [
    {
      title: "Welcome to DSA Universe",
      description: "Get ready to understand Data Structures & Algorithms visually. No more staring at dry textbooks or flat diagrams.",
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />
    },
    {
      title: "Interactive Learning",
      description: "Our 3D GSAP animations are tied to your scroll. The code executes step-by-step as you move down the page, allowing you to learn at your exact pace.",
      icon: <MonitorPlay className="w-8 h-8 text-purple-400" />
    },
    {
      title: "The Graph",
      description: "Modules that are fully live are highlighted below. We recommend starting with Arrays to master memory fundamentals before tackling Linked Lists.",
      icon: <Layers className="w-8 h-8 text-blue-400" />
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(99,102,241,0.15)] overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-500/10 blur-[50px] pointer-events-none rounded-full" />
            
            <button 
              onClick={completeTour}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center mt-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                {steps[step].icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {steps[step].title}
              </h3>
              
              <p className="text-white/60 leading-relaxed mb-10 h-24">
                {steps[step].description}
              </p>

              <div className="flex items-center justify-between w-full">
                {/* Dots indicator */}
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <div 
                      key={i} 
                      className={\`w-2 h-2 rounded-full transition-all duration-300 \${
                        i === step ? 'bg-indigo-400 w-6' : 'bg-white/20'
                      }\`} 
                    />
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-indigo-50 transition-colors"
                >
                  {step === 2 ? "Get Started" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
