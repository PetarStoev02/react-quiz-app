import React from "react";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 border-b border-terminal-green/30 bg-terminal-dark/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-terminal-green hover:text-terminal-green-bright transition-colors">
          <span className="text-xl font-bold terminal-glow tracking-widest">
            {">"} CODE_QUIZ
          </span>
          <span className="animate-blink text-terminal-green-bright">_</span>
        </a>

        <nav className="flex items-center gap-6">
          <span className="text-terminal-green-dim text-sm hidden sm:block">
            [v1.0.0]
          </span>
          <a
            href="https://github.com/PetarStoev02/react-quiz-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green/70 hover:text-terminal-green-bright transition-colors text-sm"
          >
            {"<"} GitHub {"/>"}
          </a>
        </nav>
      </div>
    </header>
  );
}
