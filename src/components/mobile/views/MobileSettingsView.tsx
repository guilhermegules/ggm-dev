import React from "react";
import { useTheme, MINT_ACCENTS } from "../../desktop/hooks/useTheme";

export default function MobileSettingsView() {
  const { isDark, currentAccent, toggleTheme, selectAccent } = useTheme();

  return (
    <div className="space-y-4 pb-24">
      <div className="cin-box p-4 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">⚙️</span>
          <div>
            <h1 className="text-base font-bold text-[var(--cin-fg-base)] leading-none">
              Ajustes & Personalização
            </h1>
            <p className="text-xs text-[var(--cin-fg-dim)] mt-1 mb-0">
              Preferências visuais e detalhes do sistema
            </p>
          </div>
        </div>
      </div>

      <div className="cin-box p-4 sm:p-5 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--cin-fg-dim)] m-0">
          Tema Visual
        </h2>

        <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[var(--cin-bg-base)] border border-[var(--cin-border)]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isDark ? "🌙" : "☀️"}</span>
            <div>
              <div className="text-sm font-bold text-[var(--cin-fg-base)]">
                Modo Escuro
              </div>
              <div className="text-xs text-[var(--cin-fg-dim)]">
                {isDark ? "Tema escuro ativado" : "Tema claro ativado"}
              </div>
            </div>
          </div>

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

        <div className="pt-2">
          <div className="text-sm font-bold text-[var(--cin-fg-base)] mb-1">
            Cor de Destaque
          </div>
          <div className="text-xs text-[var(--cin-fg-dim)] mb-3">
            Paleta de acentuação oficial do Cinnamon:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {MINT_ACCENTS.map((item) => {
              const isSelected = currentAccent === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectAccent(item.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-[var(--cin-accent)] bg-[var(--cin-accent-subtle)] font-bold shadow-xs"
                      : "border-[var(--cin-border)] bg-[var(--cin-bg-base)] hover:border-gray-400"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-[var(--cin-fg-base)] truncate">
                    {item.name.replace(" (Padrão)", "")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="cin-box p-5 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--cin-fg-dim)] m-0">
          Sobre a Plataforma
        </h2>

        <div className="space-y-2 text-xs text-[var(--cin-fg-dim)] leading-relaxed">
          <div className="flex justify-between py-1 border-b border-[var(--cin-separator)]">
            <span className="text-[var(--cin-fg-base)] font-medium">Framework</span>
            <span className="font-mono">Astro 7 + React 19</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[var(--cin-separator)]">
            <span className="text-[var(--cin-fg-base)] font-medium">Estilização</span>
            <span className="font-mono">Cinnamon CSS + Tailwind</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[var(--cin-separator)]">
            <span className="text-[var(--cin-fg-base)] font-medium">Design System</span>
            <span>Linux Mint Cinnamon Theme</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[var(--cin-fg-base)] font-medium">Autor</span>
            <span>Guilherme Gules Moreira</span>
          </div>
        </div>
      </div>
    </div>
  );
}
