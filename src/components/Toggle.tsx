import { useEffect, useState } from "react";
import { LIGHT_THEME, DARK_THEME, SITE_THEME_KEY } from "../consts";

export default function Toggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem(SITE_THEME_KEY);
    setIsDark(theme === DARK_THEME);
  }, []);

  const handleChange = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const nextTheme = nextDark ? DARK_THEME : LIGHT_THEME;
    const prevTheme = nextDark ? LIGHT_THEME : DARK_THEME;

    localStorage.setItem(SITE_THEME_KEY, nextTheme);

    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.remove(prevTheme);
    document.documentElement.classList.add(nextTheme);

    if (document.body) {
      document.body.setAttribute("data-theme", nextTheme);
      document.body.classList.remove(prevTheme);
      document.body.classList.add(nextTheme);
    }

    if (nextDark) {
      document.documentElement.classList.add("cin-dark");
      document.body?.classList.add("cin-dark");
    } else {
      document.documentElement.classList.remove("cin-dark");
      document.body?.classList.remove("cin-dark");
    }

    window.dispatchEvent(new CustomEvent("theme-change"));
  };

  return (
    <div className="flex items-center gap-2">
      <label
        className="cin-switch cin-switch-sm cursor-pointer"
        title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
      >
        <input
          type="checkbox"
          className="cin-switch-input"
          checked={isDark}
          onChange={handleChange}
          id="toggle-button"
          aria-label="Alternar tema escuro/claro"
        />
        <div className="cin-switch-track">
          <div className="cin-switch-thumb" />
        </div>
      </label>
      <span className="text-xs select-none" aria-hidden="true">
        {isDark ? "🌙" : "☀️"}
      </span>
    </div>
  );
}
