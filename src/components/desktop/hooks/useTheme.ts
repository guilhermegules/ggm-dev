import { useState, useEffect, useCallback } from "react";
import {
  MINT_ACCENTS,
  THEME_CHANGE_EVENT,
  ACCENT_CHANGE_EVENT,
  isDarkTheme,
  getStoredAccent,
  toggleTheme as toggleSiteTheme,
  selectAccent as selectSiteAccent,
} from "../../../utils/theme";

export { MINT_ACCENTS };

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentAccent, setCurrentAccent] = useState<string>("mint");

  useEffect(() => {
    setIsDark(isDarkTheme());
    setCurrentAccent(getStoredAccent());

    const handleThemeChange = () => {
      setIsDark(isDarkTheme());
    };

    const handleAccentChange = (e?: Event) => {
      const customEvent = e as CustomEvent<string> | undefined;
      setCurrentAccent(customEvent?.detail || getStoredAccent());
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.addEventListener(ACCENT_CHANGE_EVENT, handleAccentChange);
    window.addEventListener("storage", handleThemeChange);
    window.addEventListener("storage", handleAccentChange);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      window.removeEventListener(ACCENT_CHANGE_EVENT, handleAccentChange);
      window.removeEventListener("storage", handleThemeChange);
      window.removeEventListener("storage", handleAccentChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextDark = toggleSiteTheme();
    setIsDark(nextDark);
  }, []);

  const selectAccent = useCallback((accentId: string) => {
    selectSiteAccent(accentId);
    setCurrentAccent(accentId);
  }, []);

  return {
    isDark,
    currentAccent,
    toggleTheme,
    selectAccent,
    accents: MINT_ACCENTS,
  };
}
