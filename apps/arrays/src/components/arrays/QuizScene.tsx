"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    q: "Why is inserting an element at the beginning of an Array O(n)?",
    options: [
      "Because you have to allocate new memory.",
      "Because every subsequent element must be shifted right by one index.",
      "Because the pointer has to traverse to the end first."
    ],
    answer: 1
  },
  {
    q: "Which operation is consistently O(1) in a dynamic array?",
    options: [
      "Searching for a value",
      "Inserting at the front (unshift)",
      "Accessing by index (arr[i])"
    ],
    answer: 2
  },
  {
    q: "What pattern is best for finding a pair of numbers in a SORTED array?",
    options: [
      "Two Pointers",
      "Sliding Window",
      "Prefix Sum"
    ],
    answer: 0
  }
];

export function QuizScene() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    
    setSelected(idx);
    const correct = idx === QUESTIONS[currentQ].answer;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setIsCorrect(null);
    setCurrentQ(q => q + 1);
  };

  const reset = () => {
    setCurrentQ(0);
    setSelected(null);
    setIsCorrect(null);
    setScore(0);
  };

  const isComplete = currentQ >= QUESTIONS.length;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 bg-transparent relative overflow-hidden">
      
      {/* Background flare based on state */}
      <div className={`absolute inset-0 transition-colors duration-700 pointer-events-none opacity-20
        ${isCorrect === true ? 'bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.5)_0,transparent_70%)]' : 
          isCorrect === false ? 'bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.5)_0,transparent_70%)]' : 
          'bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.2)_0,transparent_70%)]'}`} 
      />

      <div className="max-w-2xl w-full relative z-10">
        
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div 
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card border border-white/5 p-8 md:p-12 rounded-3xl"
            >
              <div className="text-blue-400 font-mono text-sm mb-4">Question {currentQ + 1} of {QUESTIONS.length}</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">{QUESTIONS[currentQ].q}</h3>
              
              <div className="space-y-4">
                {QUESTIONS[currentQ].options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isAnswer = QUESTIONS[currentQ].answer === i;
                  
                  let stateClass = "bg-white/5 border-white/10 hover:bg-white/10";
                  if (selected !== null) {
                    if (isAnswer) stateClass = "bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_20px_rgba(74,222,128,0.2)]";
                    else if (isSelected && !isAnswer) stateClass = "bg-red-500/20 border-red-500 text-red-300";
                    else stateClass = "bg-white/5 border-white/5 opacity-50";
                  }

                  return (
                    <motion.button
                      key={i}
                      disabled={selected !== null}
                      onClick={() => handleSelect(i)}
                      animate={isSelected && !isAnswer ? { x: [-5, 5, -5, 5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      className={`w-full text-left p-4 md:p-6 rounded-xl border transition-all duration-300 ${stateClass}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {selected !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex justify-end"
                >
                  <button onClick={handleNext} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors">
                    {currentQ === QUESTIONS.length - 1 ? "Finish" : "Next Question"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="glass-card border border-white/5 p-12 rounded-3xl text-center"
            >
              <div className="text-6xl mb-6">{score === QUESTIONS.length ? '🏆' : '📚'}</div>
              <h2 className="text-4xl font-bold mb-4">Module Complete!</h2>
              <p className="text-xl text-white/60 mb-8">You scored {score} out of {QUESTIONS.length}</p>
              
              <button onClick={reset} className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-colors">
                Retry Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
