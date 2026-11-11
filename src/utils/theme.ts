import {
  LIGHT_THEME,
  DARK_THEME,
  SITE_THEME_KEY,
  SITE_ACCENT_KEY,
} from "../consts";

export const THEME_CHANGE_EVENT = "theme-change";
export const ACCENT_CHANGE_EVENT = "accent-change";

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

export type ThemeMode = typeof DARK_THEME | typeof LIGHT_THEME;

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return LIGHT_THEME;
  return localStorage.getItem(SITE_THEME_KEY) === DARK_THEME
    ? DARK_THEME
    : LIGHT_THEME;
}

export function isDarkTheme(): boolean {
  return getStoredTheme() === DARK_THEME;
}

export function getStoredAccent(): string {
  if (typeof window === "undefined") return "mint";
  return (
    localStorage.getItem(SITE_ACCENT_KEY) ||
    document.documentElement.getAttribute("data-accent") ||
    "mint"
  );
}

export function applyThemeToDom(theme: ThemeMode): void {
  if (typeof document === "undefined") return;
  const isDark = theme === DARK_THEME;
  const prevTheme = isDark ? LIGHT_THEME : DARK_THEME;

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.remove(prevTheme);
  document.documentElement.classList.add(theme);

  if (document.body) {
    document.body.classList.add("cin-body");
    document.body.setAttribute("data-theme", theme);
    document.body.classList.remove(prevTheme);
    document.body.classList.add(theme);
  }

  if (isDark) {
    document.documentElement.classList.add("cin-dark");
    document.body?.classList.add("cin-dark");
  } else {
    document.documentElement.classList.remove("cin-dark");
    document.body?.classList.remove("cin-dark");
  }
}

export function applyAccentToDom(accentId: string): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-accent", accentId);
  if (document.body) {
    document.body.setAttribute("data-accent", accentId);
  }
}

export function setTheme(nextTheme: ThemeMode): boolean {
  if (typeof window === "undefined") return false;
  localStorage.setItem(SITE_THEME_KEY, nextTheme);
  applyThemeToDom(nextTheme);
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: nextTheme }));
  return nextTheme === DARK_THEME;
}

export function toggleTheme(): boolean {
  const nextTheme = isDarkTheme() ? LIGHT_THEME : DARK_THEME;
  return setTheme(nextTheme);
}

export function selectAccent(accentId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SITE_ACCENT_KEY, accentId);
  applyAccentToDom(accentId);
  window.dispatchEvent(
    new CustomEvent(ACCENT_CHANGE_EVENT, { detail: accentId })
  );
}
