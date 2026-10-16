import { useState, useEffect, useCallback } from "react";
import { LIGHT_THEME, DARK_THEME, SITE_THEME_KEY, SITE_ACCENT_KEY } from "../../../consts";

export const MINT_ACCENTS = [
  { id: "mint", name: "Mint (Padrão)", color: "#35a854" },
  { id: "aqua", name: "Aqua", color: "#1f9ede" },
  { id: "blue", name: "Azul", color: "#0c75de" },
  { id: "teal", name: "Teal", color: "#199ca8" },
  { id: "orange", name: "Laranja", color: "#ff7139" },
  { id: "red", name: "Vermelho", color: "#e82127" },
  { id: "purple", name: "Roxo", color: "#8c5dd9" },
  { id: "pink", name: "Rosa", color: "#e54980" },
  { id: "sand", name: "Areia", color: "#c5a07c" },
  { id: "grey", name: "Cinza", color: "#70737a" },
] as const;

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentAccent, setCurrentAccent] = useState<string>("mint");

  useEffect(() => {
    const savedTheme = localStorage.getItem(SITE_THEME_KEY);
    const isDarkTheme = savedTheme === DARK_THEME;
    setIsDark(isDarkTheme);

    const savedAccent =
      localStorage.getItem(SITE_ACCENT_KEY) ||
      document.documentElement.getAttribute("data-accent") ||
      "mint";
    setCurrentAccent(savedAccent);

    const handleThemeChange = () => {
      const activeTheme = localStorage.getItem(SITE_THEME_KEY);
      setIsDark(activeTheme === DARK_THEME);
    };

    const handleAccentChange = (e?: Event) => {
      const customEvent = e as CustomEvent<string> | undefined;
      const activeAccent =
        customEvent?.detail ||
        localStorage.getItem(SITE_ACCENT_KEY) ||
        document.documentElement.getAttribute("data-accent") ||
        "mint";
      setCurrentAccent(activeAccent);
    };

    window.addEventListener("theme-change", handleThemeChange);
    window.addEventListener("accent-change", handleAccentChange);
    window.addEventListener("storage", handleThemeChange);
    window.addEventListener("storage", handleAccentChange);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
      window.removeEventListener("accent-change", handleAccentChange);
      window.removeEventListener("storage", handleThemeChange);
      window.removeEventListener("storage", handleAccentChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const nextDark = !prev;
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
      return nextDark;
    });
  }, []);

  const selectAccent = useCallback((accentId: string) => {
    setCurrentAccent(accentId);
    localStorage.setItem(SITE_ACCENT_KEY, accentId);

    document.documentElement.setAttribute("data-accent", accentId);
    if (document.body) {
      document.body.setAttribute("data-accent", accentId);
    }

    window.dispatchEvent(new CustomEvent("accent-change", { detail: accentId }));
  }, []);

  return {
    isDark,
    currentAccent,
    toggleTheme,
    selectAccent,
    accents: MINT_ACCENTS,
  };
}
