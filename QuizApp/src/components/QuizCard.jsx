import React, { forwardRef, useState } from "react";
import TinderCard from "react-tinder-card";

const QuizCard = forwardRef(
  ({ question, onSwipe, onCardLeftScreen, index, isTop }, ref) => {
    const [swipeDirection, setSwipeDirection] = useState(null);

    const handleSwipe = (direction) => {
      setSwipeDirection(direction);
      // Right = True, Left = False
      const answer = direction === "right";
      onSwipe(answer, direction);
    };

    const getDifficultyColor = () => {
      const colors = {
        easy: "text-green-400 border-green-400",
        medium: "text-yellow-400 border-yellow-400",
        hard: "text-red-400 border-red-400",
      };
      return colors[question.difficulty] || colors.easy;
    };

    // Visual feedback based on swipe direction
    const getSwipeOverlay = () => {
      if (!swipeDirection) return null;

      if (swipeDirection === "right") {
        return (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center rounded-lg border-4 border-green-500 z-10">
            <span className="text-6xl font-bold text-green-500 terminal-glow">
              TRUE
            </span>
          </div>
        );
      }
      if (swipeDirection === "left") {
        return (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center rounded-lg border-4 border-red-500 z-10">
            <span className="text-6xl font-bold text-red-500">FALSE</span>
          </div>
        );
      }
      return null;
    };

    return (
      <TinderCard
        ref={ref}
        onSwipe={handleSwipe}
        onCardLeftScreen={onCardLeftScreen}
        preventSwipe={["up", "down"]}
        swipeRequirementType="position"
        swipeThreshold={100}
        className={`absolute w-full ${isTop ? "z-10" : "z-0"}`}
      >
        <div
          className={`
            relative w-full bg-terminal-dark-light border border-terminal-green/50
            rounded-lg overflow-hidden select-none cursor-grab active:cursor-grabbing
            transform transition-shadow duration-200
            ${isTop ? "shadow-glow" : "opacity-50 scale-95"}
          `}
          style={{
            touchAction: "pan-y",
          }}
        >
          {getSwipeOverlay()}

          {/* Card Header */}
          <div className="px-4 py-3 border-b border-terminal-green/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-terminal-green-dim text-xs">
                ┌─ QUESTION ─┐
              </span>
            </div>
            <span
              className={`text-xs px-2 py-1 border ${getDifficultyColor()}`}
            >
              {question.category?.toUpperCase() || "CODING"}
            </span>
          </div>

          {/* Card Content */}
          <div className="p-6 min-h-[200px] flex flex-col justify-center">
            {/* Terminal prompt style */}
            <div className="mb-4">
              <span className="text-terminal-green-dim text-sm">
                {">"} evaluate_statement.sh
              </span>
            </div>

            {/* Question Text */}
            <div className="bg-terminal-dark p-4 border border-terminal-green/20 rounded">
              <p className="text-terminal-green text-lg leading-relaxed font-mono">
                {question.question}
              </p>
            </div>

            {/* Blinking cursor */}
            <div className="mt-4">
              <span className="text-terminal-green-dim text-sm">
                {">"} awaiting_input
                <span className="animate-blink text-terminal-green-bright">
                  _
                </span>
              </span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-4 py-3 border-t border-terminal-green/30 bg-terminal-dark/50">
            <div className="flex justify-between items-center text-xs">
              <span className="text-red-400">← FALSE</span>
              <span className="text-terminal-green-dim">SWIPE TO ANSWER</span>
              <span className="text-green-400">TRUE →</span>
            </div>
          </div>
        </div>
      </TinderCard>
    );
  }
);

QuizCard.displayName = "QuizCard";

export default QuizCard;
