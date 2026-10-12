import React from "react";
import type { BlogPostData, WindowItem } from "./types";
import WindowFrame from "./WindowFrame";
import TerminalContainer from "./TerminalWindow";
import AboutWindow from "./AboutWindow";
import BlogWindow from "./BlogWindow";
import ArticleWindow from "./ArticleWindow";
import SettingsWindow from "./SettingsWindow";
import LinksWindow from "./LinksWindow";

interface CinnamonDesktopPresenterProps {
  windows: WindowItem[];
  activeWindowId: string;
  posts: BlogPostData[];
  isMenuOpen: boolean;
  menuSearch: string;
  clockTime: string;
  isDark: boolean;
  notification: {
    visible: boolean;
    title: string;
    text: string;
    icon: string;
  } | null;
  showHomeShortcut?: boolean;
  onBringToFront: (winId: string) => void;
  onOpenWindow: (winId: string) => void;
  onOpenPost: (post: BlogPostData) => void;
  onCloseWindow: (winId: string, e?: React.MouseEvent) => void;
  onMinimizeWindow: (winId: string, e?: React.MouseEvent) => void;
  onToggleMaximize: (winId: string, e?: React.MouseEvent) => void;
  onTaskbarClick: (win: WindowItem) => void;
  onShowDesktop: () => void;
  onTitlebarMouseDown: (
    winId: string,
    initialX: number,
    initialY: number,
    isMaximized: boolean,
    e: React.MouseEvent | React.TouchEvent
  ) => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onMenuSearchChange: (value: string) => void;
  onToggleTheme: () => void;
  onNotificationDismiss: () => void;
  onNotificationTrigger: (title: string, text: string) => void;
}

const MENU_APPS = [
  { id: "about", name: "Sobre Mim", desc: "Perfil, bio e carreira", icon: "👤", cat: "all" },
  { id: "blog", name: "Blog de Artigos", desc: "Publicações técnicas e guias", icon: "📚", cat: "all" },
  { id: "terminal", name: "Terminal", desc: "Prompt interativo Linux Mint", icon: "⌨️", cat: "system" },
  { id: "settings", name: "Configurações", desc: "Aparência, cores e temas", icon: "⚙️", cat: "system" },
  { id: "links", name: "Links & Projetos", desc: "Repositórios e contato", icon: "🔗", cat: "internet" },
];

export default function CinnamonDesktopPresenter({
  windows,
  activeWindowId,
  posts,
  isMenuOpen,
  menuSearch,
  clockTime,
  isDark,
  notification,
  showHomeShortcut = false,
  onBringToFront,
  onOpenWindow,
  onOpenPost,
  onCloseWindow,
  onMinimizeWindow,
  onToggleMaximize,
  onTaskbarClick,
  onShowDesktop,
  onTitlebarMouseDown,
  onToggleMenu,
  onCloseMenu,
  onMenuSearchChange,
  onToggleTheme,
  onNotificationDismiss,
  onNotificationTrigger,
}: CinnamonDesktopPresenterProps) {
  const filteredMenuApps = MENU_APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      app.desc.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div className="cin-desktop relative w-screen h-screen overflow-hidden select-none">
      {/* 1. Desktop Workspace */}
      <div
        className="cin-workspace relative w-full h-full overflow-hidden"
        onClick={onCloseMenu}
      >
        {/* Desktop Shortcuts Grid */}
        <div className="cin-desktop-grid">
          {showHomeShortcut && (
            <a
              href="/"
              className="cin-desktop-icon no-underline"
              title="Voltar para a página inicial"
            >
              <div className="cin-desktop-icon-img text-3xl">🏠</div>
              <div className="cin-desktop-icon-label">Início</div>
            </a>
          )}

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => onOpenWindow("about")}
            onClick={() => onOpenWindow("about")}
            title="Clique para abrir Sobre Mim"
          >
            <div className="cin-desktop-icon-img text-3xl">👤</div>
            <div className="cin-desktop-icon-label">Sobre Mim</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => onOpenWindow("blog")}
            onClick={() => onOpenWindow("blog")}
            title="Clique para abrir o Blog"
          >
            <div className="cin-desktop-icon-img text-3xl">📚</div>
            <div className="cin-desktop-icon-label">Blog</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => onOpenWindow("terminal")}
            onClick={() => onOpenWindow("terminal")}
            title="Clique para abrir o Terminal"
          >
            <div className="cin-desktop-icon-img text-3xl">⌨️</div>
            <div className="cin-desktop-icon-label">Terminal</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => onOpenWindow("settings")}
            onClick={() => onOpenWindow("settings")}
            title="Clique para abrir Configurações"
          >
            <div className="cin-desktop-icon-img text-3xl">⚙️</div>
            <div className="cin-desktop-icon-label">Configurações</div>
          </div>

          <div
            className="cin-desktop-icon"
            onDoubleClick={() => onOpenWindow("links")}
            onClick={() => onOpenWindow("links")}
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

          return (
            <WindowFrame
              key={win.id}
              window={win}
              isActive={isActive}
              onBringToFront={onBringToFront}
              onMinimize={onMinimizeWindow}
              onMaximize={onToggleMaximize}
              onClose={onCloseWindow}
              onTitlebarMouseDown={(e) =>
                onTitlebarMouseDown(win.id, win.x, win.y, win.isMaximized, e)
              }
            >
              {win.type === "about" && <AboutWindow />}
              {win.type === "terminal" && (
                <TerminalContainer
                  posts={posts}
                  onOpenWindow={onOpenWindow}
                  onOpenPost={onOpenPost}
                />
              )}
              {win.type === "blog" && (
                <BlogWindow posts={posts} onOpenPost={onOpenPost} />
              )}
              {win.type === "settings" && <SettingsWindow />}
              {win.type === "links" && <LinksWindow />}
              {win.type === "post" && win.postData && (
                <ArticleWindow
                  post={win.postData}
                  onClose={() => onCloseWindow(win.id)}
                />
              )}
            </WindowFrame>
          );
        })}

        {/* 3. Cinnamon Start Menu */}
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
                    onClick={() => {
                      onOpenWindow("about");
                      onCloseMenu();
                    }}
                  >
                    👤
                  </button>
                  <button
                    className="cin-menu-action-btn"
                    title="Terminal"
                    onClick={() => {
                      onOpenWindow("terminal");
                      onCloseMenu();
                    }}
                  >
                    ⌨️
                  </button>
                  <button
                    className="cin-menu-action-btn"
                    title="Blog"
                    onClick={() => {
                      onOpenWindow("blog");
                      onCloseMenu();
                    }}
                  >
                    📚
                  </button>
                  <button
                    className="cin-menu-action-btn"
                    title="Configurações"
                    onClick={() => {
                      onOpenWindow("settings");
                      onCloseMenu();
                    }}
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
                    onClick={() => {
                      onOpenWindow(item.id);
                      onCloseMenu();
                    }}
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
                        onOpenPost(post);
                        onCloseMenu();
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
                onChange={(e) => onMenuSearchChange(e.target.value)}
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
              onClick={onNotificationDismiss}
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
              onToggleMenu();
            }}
            className={`cin-panel-menu-btn ${isMenuOpen ? "is-active" : ""}`}
            title="Menu Iniciar Cinnamon"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <circle cx="12" cy="12" r="10" fill="var(--cin-accent, #35a854)" />
              <path d="M7 15C7 11 11 9 16 8C15 13 13 17 9 17C7.5 17 7 16 7 15Z" fill="#ffffff" />
              <path d="M12 11V15" stroke="var(--cin-accent, #35a854)" strokeWidth="1.5" strokeLinecap="round" />
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
                    onClick={() => onTaskbarClick(w)}
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
            className="cin-panel-applet text-sm cursor-pointer"
            title="Notificações"
            onClick={() =>
              onNotificationTrigger(
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
                onChange={onToggleTheme}
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
            onClick={onShowDesktop}
          />
        </div>
      </footer>
    </div>
  );
}
