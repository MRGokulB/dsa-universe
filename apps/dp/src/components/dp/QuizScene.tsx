"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    text: "Which two fundamental properties MUST a problem possess to be efficiently solvable using Dynamic Programming?",
    options: [
      "Optimal Substructure & Overlapping Subproblems",
      "Greedy Choice Property & Linear Ordering",
      "Contiguous Memory Layout & Binary Branching",
      "Strict Monotonicity & Acyclic Topology"
    ],
    correct: 0,
    explanation: "Optimal Substructure means an optimal solution is composed of optimal solutions to subproblems. Overlapping Subproblems means the recursive algorithm visits the exact same subproblems repeatedly instead of generating new ones."
  },
  {
    text: "What is the defining distinction between Top-Down Memoization and Bottom-Up Tabulation?",
    options: [
      "Memoization is recursive with an on-demand cache; Tabulation is iterative, filling a table from base cases up",
      "Memoization is strictly faster than Tabulation in all circumstances",
      "Tabulation requires exponential O(2ⁿ) memory",
      "Memoization does not store intermediate results"
    ],
    correct: 0,
    explanation: "Memoization preserves natural recursive problem decomposition and stores results in a hash table or array. Tabulation systematically computes and stores smaller base cases first via iterative loops."
  },
  {
    text: "When computing the N-th Fibonacci number iteratively, what is the minimum auxiliary space complexity achievable?",
    options: [
      "O(1) auxiliary space (using only two scalar variables)",
      "O(N) space (an array of size N is mandatory)",
      "O(log N) space",
      "O(N²) space"
    ],
    correct: 0,
    explanation: "Because dp[i] depends only on the previous two values (dp[i-1] and dp[i-2]), you only need to store two variables (prev1, prev2) instead of an entire array, optimizing space from O(N) to O(1)."
  },
  {
    text: "In the 0/1 Knapsack transition dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]]), what does the term dp[i-1][w] correspond to?",
    options: [
      "The best achievable value when EXCLUDING item i from the knapsack",
      "The value achieved when force-including item i",
      "The remaining knapsack capacity",
      "The base case boundary check"
    ],
    correct: 0,
    explanation: "The recurrence tests two choices: either exclude item i (leaving capacity w and taking the best of the first i-1 items, which is dp[i-1][w]), or include item i (gaining val[i] and using remaining capacity w - wt[i])."
  }
];

export default function QuizScene() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const curQ = QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === curQ.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="w-full min-h-screen py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <span className="text-purple-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 05 &middot; Knowledge Verification
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Test Your Intuition
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Verify your understanding of overlapping subproblems, state recurrence relations, and space optimization.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  Question {currentIdx + 1} of {QUESTIONS.length}
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Score: {score}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-medium text-white mb-6 leading-relaxed">
                {curQ.text}
              </h3>

              <div className="space-y-3 mb-6">
                {curQ.options.map((opt, i) => {
                  let borderClass = "border-white/10 hover:border-white/30 bg-white/[0.02]";
                  if (isAnswered) {
                    if (i === curQ.correct) {
                      borderClass = "border-purple-500 bg-purple-500/10 text-purple-300";
                    } else if (i === selectedOpt) {
                      borderClass = "border-rose-500 bg-rose-500/10 text-rose-300";
                    } else {
                      borderClass = "border-white/5 opacity-40";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm ${borderClass}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && i === curQ.correct && (
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      )}
                      {isAnswered && i === selectedOpt && i !== curQ.correct && (
                        <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/70 mb-6 leading-relaxed"
                  >
                    <span className="text-purple-400 font-bold block mb-1">Explanation:</span>
                    {curQ.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {isAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 text-xs font-mono transition-colors"
                  >
                    {currentIdx < QUESTIONS.length - 1 ? "Next Question" : "Finish Quiz"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold mb-2">Quiz Completed</h3>
              <p className="text-white/60 mb-6">
                You scored <span className="text-purple-400 font-bold">{score}</span> out of {QUESTIONS.length}
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 font-mono text-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
