import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const ASCII_404 = `
██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝
`;

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [glitchText, setGlitchText] = useState("PAGE NOT FOUND");
  const [showCursor, setShowCursor] = useState(true);

  // Glitch effect for the text
  useEffect(() => {
    const originalText = "PAGE NOT FOUND";
    let interval;

    const glitch = () => {
      const glitched = originalText
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return Math.random() > 0.7
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : char;
        })
        .join("");
      setGlitchText(glitched);

      // Reset after short delay
      setTimeout(() => setGlitchText(originalText), 100);
    };

    interval = setInterval(glitch, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8">
      {/* ASCII 404 */}
      <pre className="text-red-500 text-xs sm:text-sm md:text-base font-bold leading-tight select-none mb-4">
        {ASCII_404}
      </pre>

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
            error@terminal:~
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-4">
          {/* Error Command */}
          <div>
            <p className="text-terminal-green-dim text-sm">
              <span className="text-terminal-green">$</span> cat /error.log
            </p>
          </div>

          {/* Error Output */}
          <div className="bg-terminal-dark p-4 border border-red-500/30 space-y-2">
            <p className="text-red-400 text-sm font-bold">
              [ERROR] {glitchText}
            </p>
            <p className="text-terminal-green-dim text-xs">
              The requested resource could not be located on this server.
            </p>
            <p className="text-terminal-green-dim text-xs">
              Error Code: 404 | Status: NOT_FOUND
            </p>
          </div>

          {/* Stack Trace Style */}
          <div className="text-terminal-green-dim text-xs space-y-1 font-mono">
            <p>
              <span className="text-red-400">→</span> at Router.resolve
              (router.js:42)
            </p>
            <p>
              <span className="text-red-400">→</span> at PathMatcher.match
              (matcher.js:18)
            </p>
            <p>
              <span className="text-red-400">→</span> at App.render (App.js:15)
            </p>
          </div>

          {/* Suggestions */}
          <div className="border-t border-terminal-green/20 pt-4">
            <p className="text-terminal-green-dim text-sm mb-3">
              <span className="text-terminal-green">$</span> suggest --fix
            </p>
            <div className="bg-terminal-dark p-3 border border-terminal-green/20 text-xs space-y-1">
              <p className="text-terminal-green">
                {">"} Check the URL for typos
              </p>
              <p className="text-terminal-green">
                {">"} Return to the home page
              </p>
              <p className="text-terminal-green">
                {">"} Start a new quiz session
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <p className="text-terminal-green-dim text-sm">
              <span className="text-terminal-green">$</span> select action
            </p>
            <div className="flex gap-3">
              <Button onClick={() => navigate("/")} className="flex-1">
                {"[ GO HOME ]"}
              </Button>
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1"
              >
                {"[ GO BACK ]"}
              </Button>
            </div>
          </div>

          {/* Blinking Cursor */}
          <p className="text-terminal-green text-sm">
            <span className="text-terminal-green-dim">$</span>{" "}
            <span
              className={`text-terminal-green-bright ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            >
              _
            </span>
          </p>
        </div>
      </div>

      {/* ASCII Art Footer */}
      <div className="mt-8 text-center">
        <p className="text-terminal-green-dim text-xs">
          ┌─────────────────────────────────────┐
        </p>
        <p className="text-terminal-green-dim text-xs">
          │ Lost? Don't worry, it happens. │
        </p>
        <p className="text-terminal-green-dim text-xs">
          └─────────────────────────────────────┘
        </p>
      </div>
    </div>
  );
}
