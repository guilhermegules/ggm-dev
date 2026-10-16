import { DARK_THEME } from "../consts";
import { getStoredTheme, THEME_CHANGE_EVENT } from "./theme";

export function registerGiscusElement() {
  if (
    typeof window === "undefined" ||
    typeof HTMLElement === "undefined" ||
    customElements.get("cin-giscus")
  ) {
    return;
  }

  class CinGiscusElement extends HTMLElement {
    private initialized = false;

    private handleThemeChange = () => {
      const theme = getStoredTheme() === DARK_THEME ? "dark" : "light";
      const iframe = this.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if (!iframe) return;

      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
    };

    connectedCallback() {
      window.addEventListener(THEME_CHANGE_EVENT, this.handleThemeChange);

      if (this.initialized) return;
      this.initialized = true;

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

      const theme = getStoredTheme() === DARK_THEME ? "dark" : "light";
      script.setAttribute("data-theme", theme);

      this.appendChild(script);
    }

    disconnectedCallback() {
      window.removeEventListener(THEME_CHANGE_EVENT, this.handleThemeChange);
    }
  }

  customElements.define("cin-giscus", CinGiscusElement);
}

registerGiscusElement();
