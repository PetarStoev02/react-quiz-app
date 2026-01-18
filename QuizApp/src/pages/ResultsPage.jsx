import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

// ASCII Art based on score
const ASCII_ART = {
  excellent: `
   ★ ★ ★ ★ ★
  ╔═══════════╗
  ║  PERFECT  ║
  ║   SCORE   ║
  ╚═══════════╝
      ║║
     ████
    ██████
   ████████
  `,
  great: `
    ★ ★ ★ ★
   ┌────────┐
   │  GREAT │
   │  JOB!  │
   └────────┘
       │
      ╱╲
     ╱  ╲
  `,
  good: `
     ★ ★ ★
   ┌───────┐
   │ GOOD  │
   │ WORK  │
   └───────┘
      \\│/
       │
  `,
  okay: `
      ★ ★
   ┌───────┐
   │ NOT   │
   │ BAD   │
   └───────┘
       │
      ─┼─
  `,
  tryAgain: `
       ★
   ┌────────┐
   │  KEEP  │
   │TRYING! │
   └────────┘
      ╱╲
     ╱  ╲
  `,
};

function getGrade(percentage) {
  if (percentage >= 100) return { grade: "S", art: ASCII_ART.excellent, color: "text-yellow-400" };
  if (percentage >= 80) return { grade: "A", art: ASCII_ART.great, color: "text-green-400" };
  if (percentage >= 60) return { grade: "B", art: ASCII_ART.good, color: "text-terminal-green" };
  if (percentage >= 40) return { grade: "C", art: ASCII_ART.okay, color: "text-yellow-400" };
  return { grade: "F", art: ASCII_ART.tryAgain, color: "text-red-400" };
}

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    totalQuestions = 10,
    answers = [],
    difficulty = "easy",
  } = location.state || {};

  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const { grade, art, color } = getGrade(percentage);

  const playAgain = () => {
    navigate("/quiz", { state: { difficulty } });
  };

  const changeDifficulty = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-8 px-4">
      {/* ASCII Art */}
      <pre
        className={`${color} text-xs sm:text-sm font-bold terminal-glow leading-tight mb-6 select-none`}
      >
        {art}
      </pre>

      {/* Results Terminal */}
      <div className="w-full max-w-lg terminal-border bg-terminal-dark-light p-1">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-terminal-green/30">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-terminal-green-dim text-xs flex-1 text-center">
            results@terminal:~
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-6">
          {/* Command */}
          <div>
            <p className="text-terminal-green-dim text-sm">
              <span className="text-terminal-green">$</span> cat results.txt
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-terminal-dark p-4 border border-terminal-green/20 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-terminal-green-dim">Score:</span>
              <span className="text-terminal-green text-xl font-bold terminal-glow">
                {score}/{totalQuestions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-terminal-green-dim">Accuracy:</span>
              <span className="text-terminal-green font-bold">
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-terminal-green-dim">Grade:</span>
              <span className={`text-2xl font-bold ${color}`}>{grade}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-terminal-green-dim">Difficulty:</span>
              <span
                className={
                  difficulty === "easy"
                    ? "text-green-400"
                    : difficulty === "medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {difficulty.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Answer Summary */}
          <div>
            <p className="text-terminal-green-dim text-sm mb-3">
              <span className="text-terminal-green">$</span> cat answer_log.txt
            </p>
            <div className="bg-terminal-dark p-3 border border-terminal-green/20 max-h-48 overflow-y-auto space-y-2">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`text-xs flex items-start gap-2 pb-2 border-b border-terminal-green/10 last:border-b-0`}
                >
                  <span
                    className={
                      answer.isCorrect ? "text-green-400" : "text-red-400"
                    }
                  >
                    {answer.isCorrect ? "[✓]" : "[✗]"}
                  </span>
                  <div className="flex-1">
                    <p className="text-terminal-green-dim truncate">
                      Q{index + 1}: {answer.question.slice(0, 50)}...
                    </p>
                    <p className="text-terminal-green-dim">
                      Your answer:{" "}
                      <span
                        className={
                          answer.userAnswer ? "text-green-400" : "text-red-400"
                        }
                      >
                        {answer.userAnswer ? "TRUE" : "FALSE"}
                      </span>
                      {!answer.isCorrect && (
                        <span className="ml-2">
                          (Correct:{" "}
                          <span className="text-terminal-green">
                            {answer.correctAnswer ? "TRUE" : "FALSE"}
                          </span>
                          )
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <p className="text-terminal-green-dim text-sm">
              <span className="text-terminal-green">$</span> select action
            </p>
            <div className="flex gap-3">
              <Button onClick={playAgain} className="flex-1">
                {"[ PLAY AGAIN ]"}
              </Button>
              <Button onClick={changeDifficulty} variant="outline" className="flex-1">
                {"[ CHANGE DIFFICULTY ]"}
              </Button>
            </div>
          </div>

          {/* Cursor */}
          <p className="text-terminal-green text-sm">
            <span className="text-terminal-green-dim">$</span>{" "}
            <span className="animate-blink">_</span>
          </p>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-8 text-center">
        <p className="text-terminal-green-dim text-xs">
          ┌─────────────────────────────────────────┐
        </p>
        <p className="text-terminal-green-dim text-xs">
          │ Correct: {score} │ Wrong: {totalQuestions - score} │
        </p>
        <p className="text-terminal-green-dim text-xs">
          └─────────────────────────────────────────┘
        </p>
      </div>
    </div>
  );
}
