import React from "react";

export type MobileTab = "about" | "blog" | "links" | "settings";

interface MobileBottomBarProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  blogCount?: number;
}

interface TabItem {
  id: MobileTab;
  label: string;
  icon: string;
  badge?: number;
}

export default function MobileBottomBar({
  activeTab,
  onTabChange,
  blogCount,
}: MobileBottomBarProps) {
  const tabs: TabItem[] = [
    { id: "about", label: "Sobre", icon: "👤" },
    { id: "blog", label: "Blog", icon: "📚", badge: blogCount },
    { id: "links", label: "Links", icon: "🔗" },
    { id: "settings", label: "Ajustes", icon: "⚙️" },
  ];

  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cin-separator)] bg-[var(--cin-bg-surface)]/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] transition-colors shadow-lg"
    >
      <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? "text-[var(--cin-accent)] font-semibold"
                  : "text-[var(--cin-fg-dim)] hover:text-[var(--cin-fg-base)]"
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-all ${
                  isActive ? "bg-[var(--cin-accent-subtle)]" : ""
                }`}
              >
                <span className="text-lg leading-none">{tab.icon}</span>
                {typeof tab.badge === "number" && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold bg-[var(--cin-accent)] text-white flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
