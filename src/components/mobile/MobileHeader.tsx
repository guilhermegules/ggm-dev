import React from "react";
import { useTheme } from "../desktop/hooks/useTheme";

interface MobileHeaderProps {
  currentTabName?: string;
}

export default function MobileHeader({ currentTabName }: MobileHeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--cin-separator)] bg-[var(--cin-bg-surface)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--cin-border)] bg-[var(--cin-bg-base)] flex items-center justify-center flex-shrink-0">
            <img
              src="/me.jpg"
              alt="Guilherme Gules"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-[var(--cin-fg-base)]">
              Guilherme Gules
            </span>
            <span className="text-[11px] text-[var(--cin-fg-dim)] leading-none">
              {currentTabName || "Full Stack Developer"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--cin-accent-subtle)] text-[var(--cin-accent)] border border-[var(--cin-accent)]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cin-accent)] animate-pulse" />
            Disponível
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
            className="w-9 h-9 rounded-lg border border-[var(--cin-border)] bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)] hover:border-[var(--cin-accent)] flex items-center justify-center text-base transition-colors"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
