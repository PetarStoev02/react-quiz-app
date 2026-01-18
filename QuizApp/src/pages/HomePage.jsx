import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const ASCII_LOGO = `
 ██████╗ ██████╗ ██████╗ ███████╗     ██████╗ ██╗   ██╗██╗███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔═══██╗██║   ██║██║╚══███╔╝
██║     ██║   ██║██║  ██║█████╗      ██║   ██║██║   ██║██║  ███╔╝
██║     ██║   ██║██║  ██║██╔══╝      ██║▄▄ ██║██║   ██║██║ ███╔╝
╚██████╗╚██████╔╝██████╔╝███████╗    ╚██████╔╝╚██████╔╝██║███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚══▀▀═╝  ╚═════╝ ╚═╝╚══════╝
`;

const DIFFICULTY_INFO = {
  easy: {
    label: "EASY",
    description: "Beginner friendly questions",
    color: "text-green-400",
  },
  medium: {
    label: "MEDIUM",
    description: "Intermediate challenges",
    color: "text-yellow-400",
  },
  hard: {
    label: "HARD",
    description: "Expert level problems",
    color: "text-red-400",
  },
};

export default function HomePage() {
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz", { state: { difficulty } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8">
      {/* ASCII Logo */}
      <div className="mb-8 overflow-hidden">
        <pre className="text-terminal-green text-[0.35rem] sm:text-[0.5rem] md:text-xs lg:text-sm font-bold terminal-glow leading-tight select-none whitespace-pre">
          {ASCII_LOGO}
        </pre>
      </div>

      {/* Terminal Window */}
      <div className="w-full max-w-lg terminal-border bg-terminal-dark-light p-1">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-terminal-green/30">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-terminal-green-dim text-xs flex-1 text-center">
            quiz@terminal:~
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Message */}
          <div className="space-y-2">
            <p className="text-terminal-green-dim text-sm">
              <span className="text-terminal-green">$</span> cat welcome.txt
            </p>
            <div className="pl-4 border-l-2 border-terminal-green/30">
              <p className="text-terminal-green text-sm leading-relaxed">
                Welcome to CODE_QUIZ - Test your programming knowledge!
              </p>
              <p className="text-terminal-green-dim text-xs mt-2">
                Swipe RIGHT for TRUE, LEFT for FALSE
              </p>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-3">
            <p className="text-terminal-green-dim text-sm">
              <span className="text-terminal-green">$</span> select --difficulty
            </p>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DIFFICULTY_INFO).map(([key, info]) => (
                  <SelectItem key={key} value={key}>
                    <span className={info.color}>[{info.label}]</span>
                    <span className="ml-2 text-terminal-green-dim text-xs">
                      - {info.description}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Difficulty Display */}
          <div className="bg-terminal-dark p-3 border border-terminal-green/20">
            <p className="text-terminal-green-dim text-xs">
              <span className="text-terminal-green">{">"}</span> Selected:{" "}
              <span className={DIFFICULTY_INFO[difficulty].color}>
                {DIFFICULTY_INFO[difficulty].label}
              </span>
            </p>
            <p className="text-terminal-green-dim text-xs mt-1">
              <span className="text-terminal-green">{">"}</span> Questions: 10
            </p>
            <p className="text-terminal-green-dim text-xs mt-1">
              <span className="text-terminal-green">{">"}</span> Format: True/False
            </p>
          </div>

          {/* Start Button */}
          <div className="space-y-3">
            <p className="text-terminal-green-dim text-sm">
              <span className="text-terminal-green">$</span> ./start_quiz.sh
            </p>
            <Button
              onClick={startQuiz}
              className="w-full h-14 text-lg"
              variant="default"
            >
              {"[ INITIALIZE QUIZ ]"}
            </Button>
          </div>

          {/* Blinking Cursor */}
          <p className="text-terminal-green text-sm">
            <span className="text-terminal-green-dim">$</span>{" "}
            <span className="animate-blink">_</span>
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center space-y-2 max-w-md">
        <p className="text-terminal-green-dim text-xs">
          ┌─────────────────────────────────────┐
        </p>
        <p className="text-terminal-green-dim text-xs px-4">
          │ CONTROLS: Swipe or use Arrow Keys │
        </p>
        <p className="text-terminal-green-dim text-xs px-4">
          │ ← FALSE │ TRUE → │
        </p>
        <p className="text-terminal-green-dim text-xs">
          └─────────────────────────────────────┘
        </p>
      </div>
    </div>
  );
}
