"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1);
  const isHovering = useRef(false);
  const visibleRef = useRef(false);
  const isGrabbingScrollbar = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent | MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Combined hover detection (was 2 separate listeners)
      const target = e.target as HTMLElement;
      const isClickable = target.closest(
        "a, button, [role='button'], [role='link'], input, textarea, select, label[for], .cursor-pointer"
      );
      isHovering.current = !!isClickable;

      if (!visibleRef.current && !isGrabbingScrollbar.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    let raf: number;
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      const targetScale = isHovering.current ? 1.5 : 1;
      currentScale.current += (targetScale - currentScale.current) * 0.2;

      if (ringRef.current) {
        const offset = 16 * currentScale.current;
        ringRef.current.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px) scale(${currentScale.current})`;

        // Update border directly to avoid React re-renders
        if (isHovering.current) {
          ringRef.current.style.borderColor = "rgba(0, 212, 170, 0.8)";
          ringRef.current.style.borderWidth = "2px";
        } else {
          ringRef.current.style.borderColor = "rgba(0, 212, 170, 0.4)";
          ringRef.current.style.borderWidth = "1.5px";
        }
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    const onPointerDown = (e: PointerEvent | MouseEvent) => {
      if (e.clientX >= document.documentElement.clientWidth) {
        isGrabbingScrollbar.current = true;
        if (visibleRef.current) {
          visibleRef.current = false;
          setVisible(false);
        }
      }
    };

    const onPointerUp = () => {
      isGrabbingScrollbar.current = false;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []); // Run once — visibleRef prevents re-render churn

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-teal rounded-full pointer-events-none z-[99999] mix-blend-screen"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999]"
        style={{
          border: "1.5px solid rgba(0, 212, 170, 0.4)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}