import React, { useState, useEffect, useRef, useCallback } from "react";
import type { BlogPostData, WindowItem } from "./types";
import TerminalWindow from "./TerminalWindow";
import AboutWindow from "./AboutWindow";
import BlogWindow from "./BlogWindow";
import ArticleWindow from "./ArticleWindow";
import SettingsWindow from "./SettingsWindow";
import LinksWindow from "./LinksWindow";
import { LIGHT_THEME, DARK_THEME, SITE_THEME_KEY } from "../../consts";

interface CinnamonDesktopProps {
  posts: BlogPostData[];
  initialWindow?: string;
  initialPostSlug?: string;
}

export default function CinnamonDesktop({
  posts,
  initialWindow,
  initialPostSlug,
}: CinnamonDesktopProps) {
  // Base Windows configuration
  const defaultWindows: WindowItem[] = [
    {
      id: "about",
      title: "Sobre Mim - Guilherme Gules",
      subtitle: "Informações do Sistema",
      icon: "👤",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 40,
      y: 35,
      width: 660,
      height: 520,
      type: "about",
    },
    {
      id: "terminal",
      title: "guilherme@gules: ~",
      subtitle: "cin-terminal",
      icon: "⌨️",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      x: 180,
      y: 90,
      width: 580,
      height: 400,
      type: "terminal",
    },
    {
      id: "blog",
      title: "Explorador de Artigos",
      subtitle: "Blog & Publicações",
      icon: "📚",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      x: 120,
      y: 60,
      width: 720,
      height: 500,
      type: "blog",
    },
    {
      id: "settings",
      title: "Configurações do Sistema",
      subtitle: "Aparência & Temas",
      icon: "⚙️",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      x: 200,
      y: 80,
      width: 580,
      height: 440,
      type: "settings",
    },
    {
      id: "links",
      title: "Links & Redes",
      subtitle: "GitHub & Conexões",
      icon: "🔗",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      x: 240,
      y: 110,
      width: 520,
      height: 380,
      type: "links",
    },
  ];

  const [windows, setWindows] = useState<WindowItem[]>(defaultWindows);
  const [activeWindowId, setActiveWindowId] = useState<string>("terminal");
  const [maxZIndex, setMaxZIndex] = useState<number>(20);

  // Taskbar & Menu states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [clockTime, setClockTime] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [notification, setNotification] = useState<{
    visible: boolean;
    title: string;
    text: string;
    icon: string;
  } | null>(null);

  // Dragging state
  const draggingRef = useRef<{
    winId: string;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  // Initialize clock and theme
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);

    const savedTheme = localStorage.getItem(SITE_THEME_KEY);
    setIsDark(savedTheme === DARK_THEME);

    return () => clearInterval(interval);
  }, []);

  // Handle deep link initial windows if provided
  useEffect(() => {
    if (initialPostSlug) {
      const found = posts.find((p) => p.id === initialPostSlug);
      if (found) {
        openPostWindow(found);
      }
    } else if (initialWindow) {
      openWindow(initialWindow);
    }
  }, [initialWindow, initialPostSlug]);

  // Bring window to front
  const bringToFront = useCallback(
    (winId: string) => {
      setMaxZIndex((prev) => {
        const nextZ = prev + 1;
        setWindows((wins) =>
          wins.map((w) =>
            w.id === winId
              ? { ...w, zIndex: nextZ, isMinimized: false }
              : w
          )
        );
        return nextZ;
      });
      setActiveWindowId(winId);
    },
    []
  );

  // Open / Restore any window
  const openWindow = (winId: string) => {
    setWindows((wins) => {
      const exists = wins.some((w) => w.id === winId);
      if (!exists) return wins;
      return wins.map((w) =>
        w.id === winId ? { ...w, isOpen: true, isMinimized: false } : w
      );
    });
    bringToFront(winId);
    setIsMenuOpen(false);
  };

  // Open dynamic article window (allows opening MULTIPLE articles at once!)
  const openPostWindow = (post: BlogPostData) => {
    const postId = `post-${post.id}`;
    setWindows((prevWins) => {
      const existing = prevWins.find((w) => w.id === postId);
      if (existing) {
        return prevWins.map((w) =>
          w.id === postId ? { ...w, isOpen: true, isMinimized: false } : w
        );
      }

      // Calculate cascaded offset
      const cascadeOffset = (prevWins.length % 5) * 30;
      const newWin: WindowItem = {
        id: postId,
        title: post.title,
        subtitle: "Document Viewer",
        icon: "📄",
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZIndex + 1,
        x: Math.min(window.innerWidth - 720, 140 + cascadeOffset),
        y: Math.min(window.innerHeight - 560, 50 + cascadeOffset),
        width: 700,
        height: 520,
        type: "post",
        postData: post,
      };
      return [...prevWins, newWin];
    });

    bringToFront(postId);
  };

  // Close window
  const closeWindow = (winId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows((wins) =>
      wins.map((w) => (w.id === winId ? { ...w, isOpen: false } : w))
    );
  };

  // Minimize window
  const minimizeWindow = (winId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows((wins) =>
      wins.map((w) => (w.id === winId ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === winId) {
      setActiveWindowId("");
    }
  };

  // Toggle maximize
  const toggleMaximize = (winId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows((wins) =>
      wins.map((w) =>
        w.id === winId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
    bringToFront(winId);
  };

  // Taskbar Tab Click
  const handleTaskbarClick = (win: WindowItem) => {
    if (win.isMinimized) {
      bringToFront(win.id);
    } else if (activeWindowId === win.id) {
      minimizeWindow(win.id);
    } else {
      bringToFront(win.id);
    }
  };

  // Show Desktop
  const handleShowDesktop = () => {
    const hasVisible = windows.some((w) => w.isOpen && !w.isMinimized);
    setWindows((wins) =>
      wins.map((w) =>
        w.isOpen ? { ...w, isMinimized: hasVisible } : w
      )
    );
    if (hasVisible) setActiveWindowId("");
  };

  // Start dragging
  const handleTitlebarMouseDown = (
    winId: string,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    const win = windows.find((w) => w.id === winId);
    if (!win || win.isMaximized) return;

    bringToFront(winId);

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    draggingRef.current = {
      winId,
      startX: clientX,
      startY: clientY,
      initialX: win.x,
      initialY: win.y,
    };
  };

  // Global mousemove / touchmove listener for smooth dragging
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const { winId, startX, startY, initialX, initialY } = draggingRef.current;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const newX = Math.max(0, Math.min(window.innerWidth - 120, initialX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, initialY + deltaY));

      setWindows((wins) =>
        wins.map((w) => (w.id === winId ? { ...w, x: newX, y: newY } : w))
      );
    };

    const handleEnd = () => {
      draggingRef.current = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  // Theme switcher
  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const nextTheme = nextDark ? DARK_THEME : LIGHT_THEME;
    const prevTheme = nextDark ? LIGHT_THEME : DARK_THEME;

    localStorage.setItem(SITE_THEME_KEY, nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.body.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.remove(prevTheme);
    document.documentElement.classList.add(nextTheme);
    document.body.classList.remove(prevTheme);
    document.body.classList.add(nextTheme);

    if (nextDark) {
      document.documentElement.classList.add("cin-dark");
      document.body?.classList.add("cin-dark");
    } else {
      document.documentElement.classList.remove("cin-dark");
      document.body?.classList.remove("cin-dark");
    }

    window.dispatchEvent(new CustomEvent("theme-change"));
  };

  const showNotification = (title: string, text: string, icon = "🌿") => {
    setNotification({ visible: true, title, text, icon });
    setTimeout(() => setNotification(null), 3500);
  };

  // Start Menu Filtered Items
  const menuApps = [
    { id: "about", name: "Sobre Mim", desc: "Perfil, bio e carreira", icon: "👤", cat: "all" },
    { id: "blog", name: "Blog de Artigos", desc: "Publicações técnicas e guias", icon: "📚", cat: "all" },
    { id: "terminal", name: "Terminal", desc: "Prompt interativo Linux Mint", icon: "⌨️", cat: "system" },
    { id: "settings", name: "Configurações", desc: "Aparência, cores e temas", icon: "⚙️", cat: "system" },
    { id: "links", name: "Links & Projetos", desc: "Repositórios e contato", icon: "🔗", cat: "internet" },
  ];

  const filteredMenuApps = menuApps.filter(
    (app) =>
      app.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      app.desc.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div className="cin-desktop relative w-screen h-screen overflow-hidden select-none">
      {/* 1. Desktop Workspace */}
      <div
        className="cin-workspace relative w-full h-full overflow-hidden"
        onClick={() => {
          if (isMenuOpen) setIsMenuOpen(false);
        }}
      >
        {/* Desktop Shortcuts Grid */}
        <div className="cin-desktop-grid">
          <div
            className="cin-desktop-icon"
            onDoubleClick={() => openWindow("about")}
            onClick={() => openWindow("about")}
            title="Clique para abrir Sobre Mim"
          >
            <div className="cin-desktop-icon-img text-3xl">👤</div>
            <div className="cin-desktop-icon-label">Sobre Mim</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => openWindow("blog")}
            onClick={() => openWindow("blog")}
            title="Clique para abrir o Blog"
          >
            <div className="cin-desktop-icon-img text-3xl">📚</div>
            <div className="cin-desktop-icon-label">Blog</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => openWindow("terminal")}
            onClick={() => openWindow("terminal")}
            title="Clique para abrir o Terminal"
          >
            <div className="cin-desktop-icon-img text-3xl">⌨️</div>
            <div className="cin-desktop-icon-label">Terminal</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => openWindow("settings")}
            onClick={() => openWindow("settings")}
            title="Clique para abrir Configurações"
          >
            <div className="cin-desktop-icon-img text-3xl">⚙️</div>
            <div className="cin-desktop-icon-label">Configurações</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => openWindow("links")}
            onClick={() => openWindow("links")}
            title="Clique para abrir Links"
          >
            <div className="cin-desktop-icon-img text-3xl">🔗</div>
            <div className="cin-desktop-icon-label">Projetos</div>
          </div>

          <a
            href="/files/curriculo-guilhermegulesmoreira.pdf"
            download
            className="cin-desktop-icon no-underline"
            title="Baixar Currículo em PDF"
          >
            <div className="cin-desktop-icon-img text-3xl">📄</div>
            <div className="cin-desktop-icon-label">Currículo</div>
          </a>
        </div>

        {/* 2. Floating Windows (Multiple Tabs & Windows Open at Same Time) */}
        {windows.map((win) => {
          if (!win.isOpen) return null;
          const isActive = activeWindowId === win.id && !win.isMinimized;
          const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

          return (
            <div
              key={win.id}
              id={`cin-win-${win.id}`}
              onMouseDown={() => bringToFront(win.id)}
              className={`cin-window ${isActive ? "is-active" : "is-backdrop"} ${
                win.isMaximized ? "is-maximized" : ""
              }`}
              style={{
                display: win.isMinimized ? "none" : "flex",
                zIndex: win.zIndex,
                left: win.isMaximized ? 0 : isMobile ? 8 : win.x,
                top: win.isMaximized ? 0 : isMobile ? 8 : win.y,
                width: win.isMaximized ? "100%" : isMobile ? "calc(100vw - 16px)" : win.width,
                height: win.isMaximized
                  ? "calc(100vh - 40px)"
                  : isMobile
                  ? "calc(100vh - 56px)"
                  : win.height,
              }}
            >
              {/* Window Headerbar / Titlebar */}
              <header
                className="cin-titlebar select-none"
                onMouseDown={(e) => {
                  if ((e.target as HTMLElement).closest(".cin-win-btn")) return;
                  handleTitlebarMouseDown(win.id, e);
                }}
                onTouchStart={(e) => {
                  if ((e.target as HTMLElement).closest(".cin-win-btn")) return;
                  handleTitlebarMouseDown(win.id, e);
                }}
              >
                <div className="cin-titlebar-left">
                  <span className="cin-titlebar-icon text-base">{win.icon}</span>
                  {win.subtitle && (
                    <span className="cin-titlebar-subtitle hidden sm:inline">
                      {win.subtitle}
                    </span>
                  )}
                </div>

                <div className="cin-titlebar-center">
                  <span className="cin-titlebar-title truncate max-w-xs sm:max-w-md">
                    {win.title}
                  </span>
                </div>

                <div className="cin-titlebar-right">
                  <div className="cin-window-controls">
                    {/* Minimize */}
                    <button
                      type="button"
                      className="cin-win-btn cin-win-btn-min"
                      title="Minimizar"
                      onClick={(e) => minimizeWindow(win.id, e)}
                    >
                      <svg viewBox="0 0 12 12">
                        <line x1="2" y1="6" x2="10" y2="6" />
                      </svg>
                    </button>

                    {/* Maximize */}
                    <button
                      type="button"
                      className="cin-win-btn cin-win-btn-max"
                      title="Maximizar"
                      onClick={(e) => toggleMaximize(win.id, e)}
                    >
                      <svg viewBox="0 0 12 12">
                        <rect x="2" y="2" width="8" height="8" rx="1" fill="none" />
                      </svg>
                    </button>

                    {/* Close */}
                    <button
                      type="button"
                      className="cin-win-btn cin-win-btn-close"
                      title="Fechar"
                      onClick={(e) => closeWindow(win.id, e)}
                    >
                      <svg viewBox="0 0 12 12">
                        <path d="M3 3L9 9M9 3L3 9" />
                      </svg>
                    </button>
                  </div>
                </div>
              </header>

              {/* Window Content Body */}
              <div className="cin-window-body flex-1 overflow-hidden relative">
                {win.type === "about" && <AboutWindow />}
                {win.type === "terminal" && (
                  <TerminalWindow
                    posts={posts}
                    onOpenWindow={openWindow}
                    onOpenPost={openPostWindow}
                  />
                )}
                {win.type === "blog" && (
                  <BlogWindow posts={posts} onOpenPost={openPostWindow} />
                )}
                {win.type === "settings" && <SettingsWindow />}
                {win.type === "links" && <LinksWindow />}
                {win.type === "post" && win.postData && (
                  <ArticleWindow
                    post={win.postData}
                    onClose={() => closeWindow(win.id)}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* 3. Cinnamon Start Menu (Mint Application Launcher) */}
        {isMenuOpen && (
          <div
            className="cin-app-menu"
            style={{ display: "flex" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cin-app-menu-body">
              {/* Left Action Buttons */}
              <aside className="cin-menu-favorites">
                <div className="cin-menu-favorites-group">
                  <button
                    className="cin-menu-action-btn"
                    title="Sobre Mim"
                    onClick={() => openWindow("about")}
                  >
                    👤
                  </button>
                  <button
                    className="cin-menu-action-btn"
                    title="Terminal"
                    onClick={() => openWindow("terminal")}
                  >
                    ⌨️
                  </button>
                  <button
                    className="cin-menu-action-btn"
                    title="Blog"
                    onClick={() => openWindow("blog")}
                  >
                    📚
                  </button>
                  <button
                    className="cin-menu-action-btn"
                    title="Configurações"
                    onClick={() => openWindow("settings")}
                  >
                    ⚙️
                  </button>
                </div>
                <div className="cin-menu-favorites-group">
                  <a
                    href="https://github.com/guilhermegules"
                    target="_blank"
                    rel="noreferrer"
                    className="cin-menu-action-btn no-underline"
                    title="GitHub"
                  >
                    🐙
                  </a>
                  <button
                    className="cin-menu-action-btn btn-danger"
                    title="Reiniciar Sessão"
                    onClick={() => window.location.reload()}
                  >
                    ⏻
                  </button>
                </div>
              </aside>

              {/* Application Items */}
              <div className="cin-menu-applications flex-1 overflow-y-auto p-2">
                {filteredMenuApps.map((item) => (
                  <div
                    key={item.id}
                    className="cin-app-item cursor-pointer"
                    onClick={() => openWindow(item.id)}
                  >
                    <div className="cin-app-icon text-xl">{item.icon}</div>
                    <div className="cin-app-details">
                      <span className="cin-app-name">{item.name}</span>
                      <span className="cin-app-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}

                {/* Direct quick links to articles in start menu */}
                <div className="mt-2 pt-2 border-t border-[var(--cin-separator)]">
                  <div className="px-2 py-1 text-[11px] font-bold text-[var(--cin-fg-dim)] uppercase">
                    Artigos Recentes
                  </div>
                  {posts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="cin-app-item cursor-pointer"
                      onClick={() => {
                        openPostWindow(post);
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="cin-app-icon text-lg">📄</div>
                      <div className="cin-app-details">
                        <span className="cin-app-name text-xs">{post.title}</span>
                        <span className="cin-app-desc text-[11px]">{post.pubDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Search Bar */}
            <footer className="cin-menu-search">
              <input
                type="text"
                className="cin-menu-search-input"
                placeholder="Pesquisar aplicativos e artigos..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                autoFocus
              />
            </footer>
          </div>
        )}

        {/* 4. Desktop Notification Toast */}
        {notification && (
          <div className="cin-notification">
            <div className="cin-notification-icon text-xl">{notification.icon}</div>
            <div className="cin-notification-body">
              <div className="cin-notification-title">{notification.title}</div>
              <div className="cin-notification-text">{notification.text}</div>
            </div>
            <button
              className="cin-notification-close"
              onClick={() => setNotification(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* 5. Cinnamon Bottom Taskbar (The OS Panel) */}
      <footer className="cin-panel flex items-center justify-between px-1">
        {/* Left: Start Menu Button & Running Windows Tabs */}
        <div className="cin-panel-left flex items-center gap-1 overflow-x-auto flex-1 max-w-[calc(100%-160px)]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            className={`cin-panel-menu-btn ${isMenuOpen ? "is-active" : ""}`}
            title="Menu Iniciar Cinnamon"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <circle cx="12" cy="12" r="10" fill="var(--cin-accent, #35a854)" />
              <path d="M7 15C7 11 11 9 16 8C15 13 13 17 9 17C7.5 17 7 16 7 15Z" fill="#ffffff" />
              <path d="M12 11V15" stroke="var(--cin-accent, #35a854)" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Running Windows Taskbar Tabs */}
          <div className="cin-panel-tasks flex items-center gap-1 overflow-x-auto">
            {windows
              .filter((w) => w.isOpen)
              .map((w) => {
                const isActive = activeWindowId === w.id && !w.isMinimized;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => handleTaskbarClick(w)}
                    className={`cin-task-btn is-running ${isActive ? "is-active" : ""}`}
                    title={w.title}
                  >
                    <span className="cin-task-icon text-sm">{w.icon}</span>
                    <span className="cin-task-label max-w-[120px] truncate">{w.title}</span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Right: System Tray & Clock Applet */}
        <div className="cin-panel-right flex items-center gap-1 flex-shrink-0">
          {/* Notifications Applet */}
          <div
            className="cin-panel-applet text-sm"
            title="Notificações"
            onClick={() =>
              showNotification(
                "Linux Mint Cinnamon",
                "Ambiente operacional carregado com sucesso!"
              )
            }
          >
            🔔
          </div>

          {/* Dark Mode Switch in Tray */}
          <div className="cin-panel-applet" title="Alternar Modo Escuro">
            <label className="cin-switch cin-switch-sm cursor-pointer mb-0">
              <input
                type="checkbox"
                className="cin-switch-input"
                checked={isDark}
                onChange={handleToggleTheme}
              />
              <div className="cin-switch-track">
                <div className="cin-switch-thumb" />
              </div>
            </label>
          </div>

          {/* Live Clock Applet */}
          <div className="cin-panel-applet cin-panel-clock font-mono text-xs">
            {clockTime || "--:--"}
          </div>

          {/* Show Desktop Peek Button */}
          <div
            className="cin-panel-show-desktop"
            title="Mostrar Área de Trabalho"
            onClick={handleShowDesktop}
          />
        </div>
      </footer>
    </div>
  );
}
