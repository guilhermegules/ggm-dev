import { useRef, useEffect, useCallback } from "react";

interface WindowDragOptions {
  onDrag: (winId: string, x: number, y: number) => void;
  onBringToFront?: (winId: string) => void;
}

export function useWindowDrag({ onDrag, onBringToFront }: WindowDragOptions) {
  const draggingRef = useRef<{
    winId: string;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const startDrag = useCallback(
    (
      winId: string,
      initialX: number,
      initialY: number,
      isMaximized: boolean,
      e: React.MouseEvent | React.TouchEvent
    ) => {
      if (isMaximized) return;

      onBringToFront?.(winId);

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      draggingRef.current = {
        winId,
        startX: clientX,
        startY: clientY,
        initialX,
        initialY,
      };
    },
    [onBringToFront]
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const { winId, startX, startY, initialX, initialY } = draggingRef.current;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const maxX = typeof window !== "undefined" ? window.innerWidth - 120 : 1000;
      const maxY = typeof window !== "undefined" ? window.innerHeight - 80 : 700;

      const newX = Math.max(0, Math.min(maxX, initialX + deltaX));
      const newY = Math.max(0, Math.min(maxY, initialY + deltaY));

      onDrag(winId, newX, newY);
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
  }, [onDrag]);

  return { startDrag };
}
