import React from "react";
import type { WindowItem } from "./types";

interface WindowFrameProps {
  window: WindowItem;
  isActive: boolean;
  onBringToFront: (id: string) => void;
  onMinimize: (id: string, e: React.MouseEvent) => void;
  onMaximize: (id: string, e: React.MouseEvent) => void;
  onClose: (id: string, e: React.MouseEvent) => void;
  onTitlebarMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  children: React.ReactNode;
}

export default function WindowFrame({
  window: win,
  isActive,
  onBringToFront,
  onMinimize,
  onMaximize,
  onClose,
  onTitlebarMouseDown,
  children,
}: WindowFrameProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div
      id={`cin-win-${win.id}`}
      onMouseDown={() => onBringToFront(win.id)}
      className={`cin-window ${isActive ? "is-active" : "is-backdrop"} ${
        win.isMaximized ? "is-maximized" : ""
      }`}
      style={{
        display: win.isMinimized ? "none" : "flex",
        zIndex: win.zIndex,
        left: win.isMaximized ? 0 : isMobile ? 8 : win.x,
        top: win.isMaximized ? 0 : isMobile ? 8 : win.y,
        width: win.isMaximized ? "100%" : isMobile ? "calc(100vw - 16px)" : win.width,
        height: win.isMaximized
          ? "calc(100vh - 40px)"
          : isMobile
          ? "calc(100vh - 56px)"
          : win.height,
      }}
    >
      {/* Window Headerbar / Titlebar */}
      <header
        className="cin-titlebar select-none"
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest(".cin-win-btn")) return;
          onTitlebarMouseDown(e);
        }}
        onTouchStart={(e) => {
          if ((e.target as HTMLElement).closest(".cin-win-btn")) return;
          onTitlebarMouseDown(e);
        }}
      >
        <div className="cin-titlebar-left">
          <span className="cin-titlebar-icon text-base">{win.icon}</span>
          {win.subtitle && (
            <span className="cin-titlebar-subtitle hidden sm:inline">
              {win.subtitle}
            </span>
          )}
        </div>

        <div className="cin-titlebar-center">
          <span className="cin-titlebar-title truncate max-w-xs sm:max-w-md">
            {win.title}
          </span>
        </div>

        <div className="cin-titlebar-right">
          <div className="cin-window-controls">
            {/* Minimize */}
            <button
              type="button"
              className="cin-win-btn cin-win-btn-min"
              title="Minimizar"
              onClick={(e) => onMinimize(win.id, e)}
            >
              <svg viewBox="0 0 12 12">
                <line x1="2" y1="6" x2="10" y2="6" />
              </svg>
            </button>

            {/* Maximize */}
            <button
              type="button"
              className="cin-win-btn cin-win-btn-max"
              title="Maximizar"
              onClick={(e) => onMaximize(win.id, e)}
            >
              <svg viewBox="0 0 12 12">
                <rect x="2" y="2" width="8" height="8" rx="1" fill="none" />
              </svg>
            </button>

            {/* Close */}
            <button
              type="button"
              className="cin-win-btn cin-win-btn-close"
              title="Fechar"
              onClick={(e) => onClose(win.id, e)}
            >
              <svg viewBox="0 0 12 12">
                <path d="M3 3L9 9M9 3L3 9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Window Content Body */}
      <div className="cin-window-body flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
