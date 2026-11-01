"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    q: "Which data structure is primarily utilized by CPU architectures to manage recursive function executions?",
    options: [
      "Queue (FIFO)",
      "Stack (LIFO)",
      "Linked List without pointers"
    ],
    answer: 1,
    explanation: "The runtime Call Stack stores stack frames containing local variables and return addresses, unwinding in reverse order (LIFO)."
  },
  {
    q: "Why is a naive array implementation of a queue inefficient when executing dequeue()?",
    options: [
      "Because finding the front takes O(log n) binary search time.",
      "Because removing index 0 forces all remaining elements to shift left in O(n) time.",
      "Because arrays cannot store numbers in sequence."
    ],
    answer: 1,
    explanation: "In an array, removing the first item leaves an empty slot at index 0, requiring an O(n) linear shift unless a circular buffer is used."
  },
  {
    q: "Which technique allows finding the 'Next Greater Element' for all array items in linear O(n) time?",
    options: [
      "Monotonic Stack",
      "Two-Pointer Sliding Window",
      "Binary Search Tree traversal"
    ],
    answer: 0,
    explanation: "A monotonic decreasing stack maintains candidate indices, allowing every element to be pushed and popped at most once."
  }
];

export default function QuizScene() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === QUESTIONS[currentQ].answer;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    setIsCorrect(null);
    setCurrentQ((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setIsCorrect(null);
    setScore(0);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-transparent">
      <div className="w-full max-w-2xl bg-black/40 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Chapter 06 &middot; Knowledge Check</span>
          <span className="text-xs font-mono text-white/40">
            {currentQ < QUESTIONS.length ? `Question ${currentQ + 1} of ${QUESTIONS.length}` : "Finished"}
          </span>
        </div>

        {currentQ < QUESTIONS.length ? (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 leading-snug">
              {QUESTIONS[currentQ].q}
            </h3>

            <div className="flex flex-col gap-3 mb-6">
              {QUESTIONS[currentQ].options.map((option, idx) => {
                let borderCol = "border-white/10 hover:border-white/30";
                let bgCol = "bg-white/[0.02]";

                if (selected !== null) {
                  if (idx === QUESTIONS[currentQ].answer) {
                    borderCol = "border-emerald-500/80";
                    bgCol = "bg-emerald-500/10 text-emerald-300";
                  } else if (idx === selected) {
                    borderCol = "border-red-500/80";
                    bgCol = "bg-red-500/10 text-red-300";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                    className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${borderCol} ${bgCol}`}
                  >
                    <span>{option}</span>
                    {selected !== null && idx === QUESTIONS[currentQ].answer && (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
                    )}
                    {selected !== null && idx === selected && idx !== QUESTIONS[currentQ].answer && (
                      <XCircle size={16} className="text-red-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <p className="text-xs font-mono text-white/60 bg-white/5 p-4 rounded-xl border border-white/10">
                  {QUESTIONS[currentQ].explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 px-6 py-2.5 rounded-full bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors"
                >
                  {currentQ === QUESTIONS.length - 1 ? "View Score" : "Next Question"}
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-3xl font-bold mb-3">Quiz Completed!</h3>
            <p className="text-white/60 text-lg mb-6">
              You scored <span className="text-emerald-400 font-bold">{score}</span> out of {QUESTIONS.length}
            </p>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
            >
              <RotateCcw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
