"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest(
        "a, button, [role='button'], [role='link'], input, textarea, select, label[for], .cursor-pointer"
      );
      setHovering(!!isClickable);
    };

    let raf: number;
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onHoverCheck);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onHoverCheck);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-teal rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          border: hovering ? "2px solid rgba(0, 212, 170, 0.8)" : "1.5px solid rgba(0, 212, 170, 0.4)",
          opacity: visible ? 1 : 0,
          transform: hovering
            ? `translate(${ring.current.x - 24}px, ${ring.current.y - 24}px) scale(1.5)`
            : undefined,
          transition: "opacity 0.3s, border 0.2s, transform 0.2s ease-out",
          willChange: "transform",
        }}
      />
    </>
  );
}
