import { useEffect, useState } from "react";
import { LIGHT_THEME, SITE_THEME_KEY } from "../consts";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  const handleChange = () => {
    const newValue = !enabled;
    setEnabled(newValue);
  };

  useEffect(() => {
    const theme = localStorage.getItem(SITE_THEME_KEY);
    const isLightTheme = theme === LIGHT_THEME;
    setEnabled(isLightTheme);
  }, []);

  return (
    <button
      onClick={handleChange}
      id="toggle-button"
      className="relative inline-flex items-center h-6 w-11 rounded-full bg-gray-200 dark:bg-neutral-900 transition-colors duration-300"
    >
      <span
        className={`absolute left-1 top-0 transition-transform duration-300 ${
          enabled ? "translate-x-5" : ""
        }`}
      >
        {enabled ? "🌞" : "🌜"}
      </span>
    </button>
  );
}
