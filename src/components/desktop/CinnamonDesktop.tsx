import React, { useState, useEffect, useCallback } from "react";
import type { BlogPostData, WindowItem } from "./types";
import CinnamonDesktopPresenter from "./CinnamonDesktopPresenter";
import { useWindowManager } from "./hooks/useWindowManager";
import { useWindowDrag } from "./hooks/useWindowDrag";
import { useTheme } from "./hooks/useTheme";
import { useClock } from "./hooks/useClock";

interface CinnamonDesktopProps {
  posts: BlogPostData[];
  initialWindow?: string;
  initialPostSlug?: string;
  showHomeShortcut?: boolean;
}

export default function CinnamonDesktop({
  posts,
  initialWindow,
  initialPostSlug,
  showHomeShortcut = false,
}: CinnamonDesktopProps) {
  const {
    windows,
    activeWindowId,
    bringToFront,
    openWindow,
    openPostWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindowPosition,
    toggleShowDesktop,
  } = useWindowManager();

  const { startDrag } = useWindowDrag({
    onDrag: updateWindowPosition,
    onBringToFront: bringToFront,
  });

  const { isDark, toggleTheme } = useTheme();
  const clockTime = useClock();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [notification, setNotification] = useState<{
    visible: boolean;
    title: string;
    text: string;
    icon: string;
  } | null>(null);

  // Handle deep linking or initial windows
  useEffect(() => {
    if (initialPostSlug) {
      const found = posts.find((p) => p.id === initialPostSlug);
      if (found) {
        openPostWindow(found);
      }
    } else if (initialWindow) {
      openWindow(initialWindow);
    }
  }, [initialWindow, initialPostSlug, posts, openPostWindow, openWindow]);

  const showNotification = useCallback((title: string, text: string, icon = "🌿") => {
    setNotification({ visible: true, title, text, icon });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const handleTaskbarClick = useCallback(
    (win: WindowItem) => {
      if (win.isMinimized) {
        bringToFront(win.id);
      } else if (activeWindowId === win.id) {
        minimizeWindow(win.id);
      } else {
        bringToFront(win.id);
      }
    },
    [activeWindowId, bringToFront, minimizeWindow]
  );

  const handleOpenWindow = useCallback(
    (id: string) => {
      openWindow(id);
      setIsMenuOpen(false);
    },
    [openWindow]
  );

  return (
    <CinnamonDesktopPresenter
      windows={windows}
      activeWindowId={activeWindowId}
      posts={posts}
      isMenuOpen={isMenuOpen}
      menuSearch={menuSearch}
      clockTime={clockTime}
      isDark={isDark}
      notification={notification}
      showHomeShortcut={showHomeShortcut}
      onBringToFront={bringToFront}
      onOpenWindow={handleOpenWindow}
      onOpenPost={openPostWindow}
      onCloseWindow={closeWindow}
      onMinimizeWindow={minimizeWindow}
      onToggleMaximize={toggleMaximize}
      onTaskbarClick={handleTaskbarClick}
      onShowDesktop={toggleShowDesktop}
      onTitlebarMouseDown={(winId, initialX, initialY, isMaximized, e) =>
        startDrag(winId, initialX, initialY, isMaximized, e)
      }
      onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      onCloseMenu={() => {
        if (isMenuOpen) setIsMenuOpen(false);
      }}
      onMenuSearchChange={setMenuSearch}
      onToggleTheme={toggleTheme}
      onNotificationDismiss={() => setNotification(null)}
      onNotificationTrigger={showNotification}
    />
  );
}
