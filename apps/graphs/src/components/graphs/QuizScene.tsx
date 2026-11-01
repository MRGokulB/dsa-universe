"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    text: "Which algorithm guarantees finding the shortest path between two vertices in an UNWEIGHTED graph with optimal O(V + E) time complexity?",
    options: [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Dijkstra's Algorithm",
      "Floyd-Warshall Algorithm"
    ],
    correct: 0,
    explanation: "Because all edges have equal weight (1 unit), BFS discovers vertices in strict order of hop distance from the start node, guaranteeing shortest paths in linear time."
  },
  {
    text: "How is a cycle detected during Depth-First Search (DFS) on an undirected graph?",
    options: [
      "If we encounter an already visited neighbor that is NOT the immediate parent",
      "If any vertex has an even degree",
      "If the recursive call stack exceeds 100 frames",
      "If the graph contains directed arrows"
    ],
    correct: 0,
    explanation: "In an undirected graph, backtracking to the immediate parent is normal. Reaching an already visited vertex that is NOT the parent proves an alternate closed path (a cycle) exists."
  },
  {
    text: "Why does Dijkstra's algorithm fail on graphs containing negative edge weights?",
    options: [
      "Its greedy invariant breaks: once a node is finalized from the priority queue, a subsequent negative edge could reduce its cost",
      "Negative numbers cause an arithmetic overflow in priority queues",
      "It triggers an infinite loop in the queue pop step",
      "JavaScript cannot compare negative floating point values"
    ],
    correct: 0,
    explanation: "Dijkstra assumes that extending an already optimal path with additional edges only increases cost (non-negative weights). Negative edges violate this greedy premise, requiring Bellman-Ford instead."
  },
  {
    text: "For a sparse network with 10,000 vertices and 25,000 edges, how does the memory requirement of an Adjacency Matrix compare to an Adjacency List?",
    options: [
      "Matrix wastes 100,000,000 cells (O(V²)), while List allocates only ~35,000 elements (O(V + E))",
      "Adjacency Matrix uses less memory because arrays are contiguous",
      "They have identical memory usage of O(V + E)",
      "Adjacency List requires O(V²) pointer allocations"
    ],
    correct: 0,
    explanation: "A matrix always allocates V × V = 10,000² = 100 million cells, 99.9% of which are zeros. An adjacency list allocates only for actual vertices and edges, saving immense RAM."
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
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">
            Chapter 05 &middot; Knowledge Verification
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Test Your Intuition
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Verify your understanding of cyclic graphs, BFS/DFS traversal mechanics, and shortest-path guarantees.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  Question {currentIdx + 1} of {QUESTIONS.length}
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                    <span className="text-emerald-400 font-bold block mb-1">Explanation:</span>
                    {curQ.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {isAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono transition-colors"
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
                You scored <span className="text-emerald-400 font-bold">{score}</span> out of {QUESTIONS.length}
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 font-mono text-xs transition-colors"
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
