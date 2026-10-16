import React, { useState } from "react";
import { useTheme } from "./hooks/useTheme";

export default function SettingsWindow() {
  const [activeTab, setActiveTab] = useState<"appearance" | "info">("appearance");
  const { isDark, currentAccent, toggleTheme, selectAccent, accents } = useTheme();

  return (
    <div className="flex flex-col h-full bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)] overflow-hidden">
      <div className="cin-tabs bg-[var(--cin-bg-surface)] px-4 pt-2 border-b border-[var(--cin-separator)]">
        <button
          type="button"
          onClick={() => setActiveTab("appearance")}
          className={`cin-tab ${activeTab === "appearance" ? "is-active" : ""}`}
        >
          🎨 Aparência & Cores
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("info")}
          className={`cin-tab ${activeTab === "info" ? "is-active" : ""}`}
        >
          ℹ️ Sobre o Sistema
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === "appearance" && (
          <>
            <div className="cin-pref-card">
              <div className="cin-pref-row">
                <div className="cin-pref-icon text-xl">{isDark ? "🌙" : "☀️"}</div>
                <div className="cin-pref-info">
                  <div className="cin-pref-title">Modo Escuro (Dark Theme)</div>
                  <div className="cin-pref-desc">Alternar entre tema visual claro e escuro do Cinnamon</div>
                </div>
                <div className="cin-pref-action">
                  <label className="cin-switch">
                    <input
                      type="checkbox"
                      className="cin-switch-input"
                      checked={isDark}
                      onChange={toggleTheme}
                    />
                    <div className="cin-switch-track">
                      <div className="cin-switch-thumb" />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="cin-box p-4 rounded-lg bg-[var(--cin-bg-surface)]">
              <h3 className="text-sm font-bold mb-1 text-[var(--cin-fg-base)]">
                Cor de Destaque (Mint Accents)
              </h3>
              <p className="text-xs text-[var(--cin-fg-dim)] mb-4">
                Selecione a paleta de acentuação oficial do Linux Mint:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {accents.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectAccent(item.id)}
                    className={`flex items-center gap-2 p-2 rounded-md border text-left cursor-pointer transition-all ${
                      currentAccent === item.id
                        ? "border-[var(--cin-accent)] bg-[var(--cin-accent-subtle)] font-bold"
                        : "border-[var(--cin-border)] bg-[var(--cin-bg-base)] hover:border-gray-400"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-[var(--cin-fg-base)] truncate">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "info" && (
          <div className="cin-box p-6 rounded-lg bg-[var(--cin-bg-surface)] text-center space-y-4">
            <div className="text-4xl">🌿</div>
            <div>
              <h2 className="text-xl font-bold m-0 text-[var(--cin-fg-base)]">
                Linux Mint Cinnamon (Web OS)
              </h2>
              <p className="text-xs text-[var(--cin-fg-dim)] mt-1">
                Ambiente de desktop simulado com a biblioteca oficial <strong>Cinnamon CSS</strong>.
              </p>
            </div>

            <div className="text-left text-xs space-y-2 border-t border-[var(--cin-separator)] pt-4 font-mono max-w-sm mx-auto text-[var(--cin-fg-dim)]">
              <div className="flex justify-between">
                <span>Versão do Cinnamon:</span>
                <span className="text-[var(--cin-fg-base)]">6.2 (Wilma Edition)</span>
              </div>
              <div className="flex justify-between">
                <span>Biblioteca de Estilos:</span>
                <span className="text-[var(--cin-accent)] font-bold">cinnamon-css 0.0.1</span>
              </div>
              <div className="flex justify-between">
                <span>Framework Web:</span>
                <span className="text-[var(--cin-fg-base)]">Astro 7.0 + React 19</span>
              </div>
              <div className="flex justify-between">
                <span>Desenvolvedor:</span>
                <span className="text-[var(--cin-fg-base)]">Guilherme Gules Moreira</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cin-window-statusbar text-xs px-3 py-1 bg-[var(--cin-bg-surface)] border-t border-[var(--cin-separator)] text-[var(--cin-fg-dim)] flex justify-between">
        <span>Aparência: Mint-Y Design System</span>
        <span>Linux Mint Cinnamon</span>
      </div>
    </div>
  );
}
