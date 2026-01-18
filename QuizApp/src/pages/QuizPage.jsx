import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import QuizCard from "../components/QuizCard";
import { Button } from "../components/ui/button";
import { useQuiz } from "../hooks/useQuiz";

// ASCII Progress Bar Component
function ProgressBar({ current, total }) {
  const filled = Math.round((current / total) * 20);
  const empty = 20 - filled;
  const percentage = (current / total) * 100;

  return (
    <div className="text-center space-y-2">
      <div className="text-terminal-green font-mono text-sm">
        [{"█".repeat(filled)}
        {"░".repeat(empty)}] {current}/{total}
      </div>
      <div className="text-terminal-green-dim text-xs">
        {percentage.toFixed(0)}% Complete
      </div>
    </div>
  );
}

// Score Display Component
function ScoreDisplay({ score }) {
  return (
    <div className="text-center">
      <div className="text-terminal-green terminal-glow text-2xl font-bold">
        {score}
      </div>
      <div className="text-terminal-green-dim text-xs">SCORE</div>
    </div>
  );
}

// Loading Spinner
function LoadingSpinner() {
  const [frame, setFrame] = useState(0);
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 80);
    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-terminal-green text-4xl terminal-glow">
        {frames[frame]}
      </div>
      <div className="text-terminal-green-dim text-sm animate-pulse">
        Loading questions...
      </div>
    </div>
  );
}

// Feedback Toast
function FeedbackToast({ isCorrect, isVisible }) {
  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed top-24 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded border-2 font-bold text-lg
        transition-all duration-300
        ${
          isCorrect
            ? "bg-green-900/90 border-green-500 text-green-400"
            : "bg-red-900/90 border-red-500 text-red-400"
        }
      `}
    >
      {isCorrect ? "✓ CORRECT!" : "✗ WRONG!"}
    </div>
  );
}

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = location.state?.difficulty || "easy";

  const {
    questions,
    currentIndex,
    score,
    isLoading,
    error,
    isComplete,
    totalQuestions,
    answers,
    answerQuestion,
  } = useQuiz(difficulty, 10);

  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });
  const [cardKey, setCardKey] = useState(0);

  // Navigate to results when quiz is complete
  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        navigate("/results", {
          state: {
            score,
            totalQuestions,
            answers,
            difficulty,
          },
        });
      }, 500);
    }
  }, [isComplete, navigate, score, totalQuestions, answers, difficulty]);

  const handleSwipe = useCallback(
    (answer, direction) => {
      const isCorrect = answerQuestion(answer);

      // Show feedback
      setFeedback({ show: true, isCorrect });
      setTimeout(() => {
        setFeedback({ show: false, isCorrect: false });
      }, 800);

      // Force new card instance
      setCardKey((k) => k + 1);
    },
    [answerQuestion]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading || isComplete) return;

      if (e.key === "ArrowLeft") {
        handleSwipe(false, "left");
      } else if (e.key === "ArrowRight") {
        handleSwipe(true, "right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, isComplete, handleSwipe]);

  // Get current and next questions for stack effect
  const visibleQuestions = useMemo(() => {
    const cards = [];
    for (let i = currentIndex; i < Math.min(currentIndex + 3, questions.length); i++) {
      cards.push({
        question: questions[i],
        index: i,
        isTop: i === currentIndex,
      });
    }
    return cards.reverse(); // Reverse so top card renders last (on top)
  }, [questions, currentIndex]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4">
        <div className="terminal-border bg-terminal-dark-light p-6 max-w-md w-full text-center">
          <p className="text-red-400 text-lg mb-4">ERROR: {error}</p>
          <Button onClick={() => navigate("/")} variant="outline">
            {"<"} RETURN HOME
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 pb-8 px-4">
      <FeedbackToast isCorrect={feedback.isCorrect} isVisible={feedback.show} />

      {/* Header Stats */}
      <div className="max-w-lg mx-auto w-full mb-6">
        <div className="terminal-border bg-terminal-dark-light p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-terminal-green-dim text-xs">
              <span className="text-terminal-green">$</span> quiz --difficulty{" "}
              <span
                className={
                  difficulty === "easy"
                    ? "text-green-400"
                    : difficulty === "medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {difficulty}
              </span>
            </div>
            <ScoreDisplay score={score} />
          </div>
          <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-lg h-[400px]">
          <AnimatePresence>
            {visibleQuestions.map(({ question, index, isTop }) => (
              <QuizCard
                key={`${question.id}-${isTop ? cardKey : index}`}
                question={question}
                isTop={isTop}
                onSwipe={handleSwipe}
                style={{
                  zIndex: isTop ? 10 : 5 - (index - currentIndex),
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls Hint */}
      <div className="max-w-lg mx-auto w-full mt-6">
        <div className="text-center space-y-2">
          <p className="text-terminal-green-dim text-xs">
            ┌───────────────────────────────────────┐
          </p>
          <p className="text-terminal-green-dim text-xs">
            │ SWIPE LEFT: False │ SWIPE RIGHT: True │
          </p>
          <p className="text-terminal-green-dim text-xs">
            │ or use ← → arrow keys │
          </p>
          <p className="text-terminal-green-dim text-xs">
            └───────────────────────────────────────┘
          </p>
        </div>
      </div>
    </div>
  );
}
