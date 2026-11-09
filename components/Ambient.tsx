"use client";

import { useEffect, useRef } from "react";

type LenisLike = {
  raf: (time: number) => void;
  scrollTo: (target: number, options?: Record<string, unknown>) => void;
  destroy: () => void;
};
import { usePathname } from "next/navigation";

/**
 * Smooth scrolling (Lenis) plus ambient pointer feedback: a soft
 * aqua glow that follows the cursor and ripples on every click.
 */
export default function Ambient() {
  const pathname = usePathname();
  const lenisRef = useRef<LenisLike | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let cancelled = false;
    let instance: LenisLike | null = null;

    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        instance = new Lenis({ duration: 1.1, wheelMultiplier: 1, touchMultiplier: 1.5 });
        lenisRef.current = instance;
        const raf = (time: number) => {
          instance?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      })
      .catch(() => {
        /* fall back to native scrolling */
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      instance?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    const instance = lenisRef.current;
    if (instance) instance.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0 });
  }, [pathname]);

  // cursor glow
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const glow = glowRef.current;
    if (!glow) return;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.opacity = "1";
    };
    const leave = () => {
      glow.style.opacity = "0";
    };
    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.transform = `translate3d(${x - 190}px, ${y - 190}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // click ripples
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onDown = (event: PointerEvent) => {
      if (reduce.matches) return;
      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 1000);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden />;
}
