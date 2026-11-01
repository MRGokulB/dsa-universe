"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, HelpCircle } from "lucide-react";

const QUESTIONS = [
  {
    text: "In a valid Binary Search Tree (BST) with unique integers, where must node 42 be placed if the root is 50 and its left child is 30?",
    options: [
      "In the left subtree of node 30",
      "In the right subtree of node 30",
      "In the right subtree of node 50",
      "At the root level"
    ],
    correct: 1,
    explanation: "Because 42 < 50, it belongs to the left subtree of 50. Because 42 > 30, it must be placed within the right subtree of 30."
  },
  {
    text: "Which traversal of a Binary Search Tree always outputs the node keys in strictly ascending sorted order?",
    options: [
      "In-Order Traversal (Left, Root, Right)",
      "Pre-Order Traversal (Root, Left, Right)",
      "Post-Order Traversal (Left, Right, Root)",
      "Level-Order Traversal (Breadth First)"
    ],
    correct: 0,
    explanation: "In-order traversal visits all smaller elements in the left subtree, then the root, then all larger elements in the right subtree."
  },
  {
    text: "In the worst case (e.g., sequentially inserting strictly ascending numbers 1, 2, 3, 4 into a standard BST), what does the search time complexity degrade to?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correct: 2,
    explanation: "Without self-balancing (like AVL or Red-Black mechanisms), sequential insertion creates a degenerate, single-branch tree that behaves like a linked list with O(n) search time."
  },
  {
    text: "What is the maximum number of nodes in a binary tree of height h (where a root node alone has height 0)?",
    options: [
      "2^(h + 1) - 1",
      "2^h",
      "2 * h",
      "h^2"
    ],
    correct: 0,
    explanation: "A complete binary tree of height h has 1 + 2 + 4 + ... + 2^h nodes, which sums to 2^(h + 1) - 1."
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
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 06 &middot; Knowledge Verification
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Test Your Intuition
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Verify your understanding of tree branching, BST invariants, and algorithmic complexities.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  Question {currentIdx + 1} of {QUESTIONS.length}
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
                      borderClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
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
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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
                    <span className="text-amber-400 font-bold block mb-1">Explanation:</span>
                    {curQ.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {isAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-mono transition-colors"
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
                You scored <span className="text-amber-400 font-bold">{score}</span> out of {QUESTIONS.length}
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 font-mono text-xs transition-colors"
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
