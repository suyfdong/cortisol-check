"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomQuestions, calculateResult } from "@/lib/data";

type Score = "low" | "medium" | "high" | "chaotic";

export default function QuizPage() {
  const router = useRouter();
  const questions = useMemo(() => getRandomQuestions(3), []);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Score[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = useCallback(
    (score: Score, optionIndex: number) => {
      if (selectedIndex !== null) return;
      setSelectedIndex(optionIndex);

      const newAnswers = [...answers, score];
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ((q) => q + 1);
          setSelectedIndex(null);
        } else {
          const result = calculateResult(newAnswers);
          router.push(`/result/${result.slug}`);
        }
      }, 400);
    },
    [answers, currentQ, questions, router, selectedIndex]
  );

  const question = questions[currentQ];

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-8">
      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-muted">
            {currentQ + 1} / {questions.length}
          </span>
          <span className="font-mono text-xs text-muted">
            {Math.round(((currentQ + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentQ + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 leading-snug">
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                onClick={() => handleSelect(option.score, i)}
                disabled={selectedIndex !== null}
                className={`relative w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all
                  ${
                    selectedIndex === i
                      ? "border-neon-green/60 bg-neon-green/10 scale-[0.98]"
                      : selectedIndex !== null
                      ? "border-border/30 bg-surface/50 opacity-40"
                      : "border-border bg-surface hover:border-neon-green/30 hover:bg-surface-2 active:scale-[0.98]"
                  }`}
              >
                <span className="text-3xl flex-shrink-0">{option.emoji}</span>
                <span className="text-sm md:text-base font-medium">
                  {option.text}
                </span>
                {selectedIndex === i && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto flex-shrink-0 w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 text-neon-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
