import { useState, useCallback, useRef } from "react";
import type { WindowItem, BlogPostData } from "../types";

const DEFAULT_WINDOWS: WindowItem[] = [
  {
    id: "about",
    title: "Sobre Mim - Guilherme Gules",
    subtitle: "Informações do Sistema",
    icon: "👤",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 250,
    y: 35,
    width: 660,
    height: 650,
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
    x: 935,
    y: 250,
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
    isMaximized: true,
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

interface UseWindowManagerOptions {
  initialWindows?: WindowItem[];
  initialWindow?: string;
}

export function useWindowManager(options: UseWindowManagerOptions = {}) {
  const { initialWindows = DEFAULT_WINDOWS, initialWindow } = options;

  const [windows, setWindows] = useState<WindowItem[]>(() => {
    if (!initialWindow) return initialWindows;
    return initialWindows.map((w) =>
      w.id === initialWindow
        ? { ...w, isOpen: true, isMinimized: false, zIndex: 20 }
        : w
    );
  });

  const [activeWindowId, setActiveWindowId] = useState<string>(
    initialWindow || "terminal"
  );
  const maxZIndexRef = useRef<number>(20);

  const bringToFront = useCallback((winId: string) => {
    maxZIndexRef.current += 1;
    const nextZ = maxZIndexRef.current;
    setWindows((wins) =>
      wins.map((w) =>
        w.id === winId
          ? { ...w, zIndex: nextZ, isMinimized: false }
          : w
      )
    );
    setActiveWindowId(winId);
  }, []);

  const openWindow = useCallback(
    (winId: string) => {
      setWindows((wins) => {
        const exists = wins.some((w) => w.id === winId);
        if (!exists) return wins;
        return wins.map((w) =>
          w.id === winId ? { ...w, isOpen: true, isMinimized: false } : w
        );
      });
      bringToFront(winId);
    },
    [bringToFront]
  );

  const openPostWindow = useCallback(
    (post: BlogPostData) => {
      const postId = `post-${post.id}`;
      setWindows((prevWins) => {
        const existing = prevWins.find((w) => w.id === postId);
        if (existing) {
          return prevWins.map((w) =>
            w.id === postId ? { ...w, isOpen: true, isMinimized: false } : w
          );
        }

        const cascadeOffset = (prevWins.length % 5) * 30;
        const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
        const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

        const newWin: WindowItem = {
          id: postId,
          title: post.title,
          subtitle: "Document Viewer",
          icon: "📄",
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: maxZIndexRef.current + 1,
          x: Math.min(screenWidth - 720, 140 + cascadeOffset),
          y: Math.min(screenHeight - 560, 50 + cascadeOffset),
          width: 700,
          height: 520,
          type: "post",
          postData: post,
        };
        return [...prevWins, newWin];
      });

      bringToFront(postId);
    },
    [bringToFront]
  );

  const closeWindow = useCallback((winId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows((wins) =>
      wins.map((w) => (w.id === winId ? { ...w, isOpen: false } : w))
    );
  }, []);

  const minimizeWindow = useCallback(
    (winId: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setWindows((wins) =>
        wins.map((w) => (w.id === winId ? { ...w, isMinimized: true } : w))
      );
      setActiveWindowId((current) => (current === winId ? "" : current));
    },
    []
  );

  const toggleMaximize = useCallback(
    (winId: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setWindows((wins) =>
        wins.map((w) =>
          w.id === winId ? { ...w, isMaximized: !w.isMaximized } : w
        )
      );
      bringToFront(winId);
    },
    [bringToFront]
  );

  const updateWindowPosition = useCallback((winId: string, x: number, y: number) => {
    setWindows((wins) =>
      wins.map((w) => (w.id === winId ? { ...w, x, y } : w))
    );
  }, []);

  const toggleShowDesktop = useCallback(() => {
    const hasVisible = windows.some((w) => w.isOpen && !w.isMinimized);
    setWindows((wins) =>
      wins.map((w) =>
        w.isOpen ? { ...w, isMinimized: hasVisible } : w
      )
    );
    if (hasVisible) setActiveWindowId("");
  }, [windows]);

  return {
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
  };
}
