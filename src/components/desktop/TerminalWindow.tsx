import React, { useRef, useEffect } from "react";
import type { BlogPostData } from "./types";
import { useTerminal } from "./hooks/useTerminal";

interface TerminalContainerProps {
  posts: BlogPostData[];
  onOpenWindow: (type: string) => void;
  onOpenPost: (post: BlogPostData) => void;
}

export default function TerminalContainer({
  posts,
  onOpenWindow,
  onOpenPost,
}: TerminalContainerProps) {
  const { history, inputVal, setInputVal, runCommand } = useTerminal({
    posts,
    onOpenWindow,
    onOpenPost,
  });

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    runCommand("neofetch");
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  return (
    <div
      className="terminal-body flex flex-col h-full overflow-hidden select-text"
      style={{
        backgroundColor: "#1a1a1d",
        color: "#dedede",
        fontFamily: "var(--cin-font-mono, monospace)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable history */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--cin-accent,#35a854)] font-bold">guilherme@gules</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400 font-bold">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            {item.output && <div className="pl-2">{item.output}</div>}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Quick Chips for Touch / Mobile */}
      <div className="flex flex-wrap gap-1 px-3 py-1.5 border-t border-[#333339] bg-[#222226]">
        {["help", "whoami", "skills", "posts", "about", "clear"].map((btnCmd) => (
          <button
            key={btnCmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(btnCmd);
            }}
            className="text-[11px] px-2 py-0.5 rounded bg-[#33333a] hover:bg-[var(--cin-accent,#35a854)] hover:text-white text-gray-300 font-mono transition-colors border border-[#44444c] cursor-pointer"
          >
            {btnCmd}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 pt-1 border-t border-[#333339] bg-[#1a1a1d]">
        <div className="flex items-center gap-1 text-xs flex-shrink-0">
          <span className="text-[var(--cin-accent,#35a854)] font-bold">guilherme@gules</span>
          <span className="text-gray-400">:</span>
          <span className="text-blue-400 font-bold">~</span>
          <span className="text-gray-400">$</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="digite um comando..."
          className="flex-1 bg-transparent text-white border-none outline-none font-mono text-xs focus:ring-0 p-0"
          autoFocus
        />
      </form>
    </div>
  );
}
