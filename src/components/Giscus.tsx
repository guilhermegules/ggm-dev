import { useEffect, useRef } from "react";
import { DARK_THEME, SITE_THEME_KEY } from "../consts";

const THEME_CHANGE_EVENT = "theme-change";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  const getTheme = () => localStorage.getItem(SITE_THEME_KEY) ?? "light"

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "guilhermegules/ggm-dev");
    script.setAttribute("data-repo-id", "R_kgDON2265w");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDON226584CtvHK");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-lang", "pt");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const theme = getTheme()
    script.setAttribute("data-theme", theme === DARK_THEME ? "dark" : "light");

    ref.current.appendChild(script);
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      const theme = getTheme()

      const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if (!iframe) return;

      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: theme === DARK_THEME ? "dark" : "light" } } },
        "https://giscus.app"
      );
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  return <div ref={ref} />;
}