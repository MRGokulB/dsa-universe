"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    text: "A student writes this code to insert newNode after curr:\n\ncurr.next = newNode;\nnewNode.next = curr.next;\n\nWhat happens?",
    options: [
      "newNode is correctly inserted",
      "newNode.next points to itself, rest of list is lost",
      "A NullPointerException occurs",
      "The list is reversed"
    ],
    correct: 1,
    explanation: "After curr.next = newNode, the value of curr.next IS newNode. So newNode.next = curr.next sets newNode.next = newNode (itself). The original downstream nodes are orphaned."
  },
  {
    text: "Given [10 → 20 → 30 → 40] with curr at node 20:\n\ncurr.next = curr.next.next;\n\nWhat does the list look like?",
    options: [
      "[10 → 20 → 40]",
      "[10 → 30 → 40]",
      "[10 → 20 → 30]",
      "[10 → 40]"
    ],
    correct: 0,
    explanation: "curr.next.next is node 40. Setting curr.next to 40 bypasses node 30. Node 30 is now unreachable."
  },
  {
    text: "Which is faster: accessing the 1000th element in an array vs a linked list?",
    options: [
      "Array — O(1) vs O(n)",
      "Linked List — no shifting needed",
      "They are the same — both O(1)",
      "Depends on the data type"
    ],
    correct: 0,
    explanation: "Arrays use base + index × size for O(1) random access. Linked lists must traverse from head through 999 nodes — O(n)."
  },
  {
    text: "Why can this crash?\n\nwhile (fast.next != null && fast != null)",
    options: [
      "fast.next is checked before fast, so if fast is null, accessing .next crashes",
      "The loop never terminates",
      "fast can never be null",
      "Short-circuit evaluation prevents the crash"
    ],
    correct: 0,
    explanation: "JavaScript evaluates left-to-right. If fast is null, fast.next throws before the fast != null check. The correct order is: fast != null && fast.next != null."
  },
  {
    text: "You frequently add/remove items at the start of a collection but rarely access by index. Which structure?",
    options: [
      "Array",
      "Linked List",
      "Both are equally good",
      "Neither — use a hash map"
    ],
    correct: 1,
    explanation: "Prepending to a linked list is O(1). Prepending to an array is O(n) because every element must shift right. Since random access is rare, the linked list wins."
  },
  {
    text: "After prev.next = curr.next, what happens to the deleted node in JavaScript?",
    options: [
      "It is immediately erased from memory",
      "It still exists until garbage collected",
      "It becomes the new head",
      "It causes a memory leak"
    ],
    correct: 1,
    explanation: "The node is merely bypassed — no references point to it anymore. JavaScript's garbage collector will eventually reclaim it, but it's not instant."
  },
  {
    text: "In Floyd's cycle detection, why does fast move 2 steps while slow moves 1?",
    options: [
      "To save time",
      "Their relative speed of 1 guarantees they meet in any cycle",
      "Only speed 2 works",
      "Any speed difference works"
    ],
    correct: 1,
    explanation: "With a relative speed difference of exactly 1, fast closes the gap by 1 node each iteration, guaranteeing they meet. Other speed differences also work, but 2:1 is optimal and simplest."
  },
  {
    text: "Singly linked list with n nodes, no tail pointer. Time to delete the LAST node?",
    options: [
      "O(1)",
      "O(n) — must traverse to second-to-last",
      "O(log n)",
      "O(n²)"
    ],
    correct: 1,
    explanation: "To delete the last node, you need to set the second-to-last node's next to null. Finding it requires traversing the entire list — O(n)."
  }
];

export default function QuizScene() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === QUESTIONS[currentQuestion].correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const renderTextWithCode = (text: string) => {
    if (text.includes("\n")) {
      const parts = text.split("\n\n");
      return (
        <div className="space-y-4">
          <p>{parts[0]}</p>
          {parts.length > 2 && (
            <pre className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm overflow-x-auto text-white">
              <code>{parts[1]}</code>
            </pre>
          )}
          {parts.length > 2 ? <p>{parts[2]}</p> : (
            <pre className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm overflow-x-auto text-white">
              <code>{parts[1]}</code>
            </pre>
          )}
        </div>
      );
    }
    return <p>{text}</p>;
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-16 flex flex-col justify-center text-white">
      {!isFinished ? (
        <div className="w-full">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 text-sm font-medium text-white/50">
              <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-500"
                initial={{ width: `${(currentQuestion / QUESTIONS.length) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <div className="text-xl md:text-2xl font-medium mb-8">
                {renderTextWithCode(QUESTIONS[currentQuestion].text)}
              </div>

              <div className="space-y-3">
                {QUESTIONS[currentQuestion].options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === QUESTIONS[currentQuestion].correct;
                  const showStatus = showResult;

                  let buttonClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ";

                  if (!showStatus) {
                    buttonClass += "border-white/10 hover:border-purple-500/50 hover:bg-white/[0.04]";
                  } else {
                    if (isCorrect) {
                      buttonClass += "border-green-500 bg-green-500/10";
                    } else if (isSelected) {
                      buttonClass += "border-red-500 bg-red-500/10";
                    } else {
                      buttonClass += "border-white/5 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white/10 text-xs font-medium">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </span>
                      {showStatus && isCorrect && <Check className="w-5 h-5 text-green-500" />}
                      {showStatus && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 pt-6 border-t border-white/10"
                  >
                    <div className="text-sm text-white/70 mb-6">
                      <span className="font-semibold text-white mr-2">Explanation:</span>
                      {QUESTIONS[currentQuestion].explanation}
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
                    >
                      {currentQuestion === QUESTIONS.length - 1 ? "See Results" : "Next Question"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center"
        >
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
            {score}/{QUESTIONS.length}
          </div>
          <h2 className="text-2xl font-semibold mb-2">Quiz Completed!</h2>
          <p className="text-white/50 mb-8">
            {score === QUESTIONS.length 
              ? "Perfect score! You have a deep understanding of linked lists." 
              : score >= QUESTIONS.length / 2 
                ? "Good job! You've grasped the core concepts well." 
                : "Keep practicing! Linked lists can be tricky at first."}
          </p>
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Quiz
          </button>
        </motion.div>
      )}
    </div>
  );
}
