import React from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

const QuizCard = ({ question, onSwipe, isTop, style }) => {
  const controls = useAnimation();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Color overlays based on drag direction
  const leftIndicatorOpacity = useTransform(x, [-100, 0], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [0, 100], [0, 1]);

  if (!question) {
    return null;
  }

  const handleDragEnd = (event, info) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      // Swiped right - TRUE
      controls.start({ x: 500, opacity: 0, transition: { duration: 0.3 } });
      setTimeout(() => onSwipe(true, "right"), 200);
    } else if (info.offset.x < -threshold) {
      // Swiped left - FALSE
      controls.start({ x: -500, opacity: 0, transition: { duration: 0.3 } });
      setTimeout(() => onSwipe(false, "left"), 200);
    } else {
      // Return to center
      controls.start({ x: 0, transition: { type: "spring", stiffness: 500, damping: 30 } });
    }
  };

  return (
    <motion.div
      className={`absolute w-full ${isTop ? "z-10 cursor-grab active:cursor-grabbing" : "z-0"}`}
      style={{ x, rotate, opacity, ...style }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileDrag={{ scale: 1.02 }}
    >
      <div
        className={`
          relative w-full bg-terminal-dark-light border border-terminal-green/50
          rounded-lg overflow-hidden select-none
          transform transition-shadow duration-200
          ${isTop ? "shadow-glow" : "opacity-60 scale-95"}
        `}
      >
        {/* Swipe Indicators */}
        <motion.div
          className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-20 pointer-events-none rounded-lg border-4 border-red-500"
          style={{ opacity: leftIndicatorOpacity }}
        >
          <span className="text-5xl font-bold text-red-500">FALSE</span>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-20 pointer-events-none rounded-lg border-4 border-green-500"
          style={{ opacity: rightIndicatorOpacity }}
        >
          <span className="text-5xl font-bold text-green-500 terminal-glow">TRUE</span>
        </motion.div>

        {/* Card Header */}
        <div className="px-4 py-3 border-b border-terminal-green/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-terminal-green-dim text-xs">
              ┌─ QUESTION ─┐
            </span>
          </div>
          <span className="text-xs px-2 py-1 border border-terminal-green/50 text-terminal-green">
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
              <span className="animate-blink text-terminal-green-bright">_</span>
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
    </motion.div>
  );
};

export default QuizCard;
