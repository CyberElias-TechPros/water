"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive water pool. A damped 2D wave simulation rendered to a
 * canvas — click, drag or tap anywhere on the surface to make ripples.
 */
export default function RipplePool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let prev = new Float32Array(0);
    let cur = new Float32Array(0);
    let small = document.createElement("canvas");
    let smallCtx = small.getContext("2d");
    let imageData: ImageData | null = null;
    let raf = 0;
    let visible = true;
    let width = 1;
    let height = 1;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;

      cols = Math.max(64, Math.min(240, Math.round(rect.width / 4.5)));
      rows = Math.max(40, Math.round((cols * rect.height) / Math.max(rect.width, 1)));
      prev = new Float32Array(cols * rows);
      cur = new Float32Array(cols * rows);

      small = document.createElement("canvas");
      small.width = cols;
      small.height = rows;
      smallCtx = small.getContext("2d");
      imageData = smallCtx ? smallCtx.createImageData(cols, rows) : null;
    };

    setup();
    const ro = new ResizeObserver(() => setup());
    ro.observe(canvas);

    const drop = (clientX: number, clientY: number, force: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(((clientX - rect.left) / rect.width) * cols);
      const y = Math.floor(((clientY - rect.top) / rect.height) * rows);
      if (x < 2 || y < 2 || x >= cols - 2 || y >= rows - 2) return;
      const index = y * cols + x;
      cur[index] = force;
      cur[index - 1] = force * 0.6;
      cur[index + 1] = force * 0.6;
      cur[index - cols] = force * 0.6;
      cur[index + cols] = force * 0.6;
    };

    let lastMove = 0;
    const onPointerDown = (event: PointerEvent) => {
      drop(event.clientX, event.clientY, 1.15);
      canvas.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 55) return;
      lastMove = now;
      drop(event.clientX, event.clientY, 0.42);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lastAmbient = performance.now();
    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!visible || !imageData || !smallCtx) return;

      if (!reduce && now - lastAmbient > 3400) {
        lastAmbient = now;
        const rect = canvas.getBoundingClientRect();
        drop(rect.left + rect.width * (0.15 + Math.random() * 0.7), rect.top + rect.height * (0.2 + Math.random() * 0.6), 0.65);
      }

      const damping = 0.985;
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const value = (prev[i - 1] + prev[i + 1] + prev[i - cols] + prev[i + cols]) * 0.5 - cur[i];
          cur[i] = value * damping;
        }
      }
      const swap = prev;
      prev = cur;
      cur = swap;

      const data = imageData.data;
      for (let y = 0; y < rows; y++) {
        const depth = y / rows;
        const baseR = 5 + depth * 9;
        const baseG = 28 + depth * 46;
        const baseB = 40 + depth * 54;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const h = prev[i];
          const light = Math.max(0, Math.min(1, h * 1.15));
          const dark = Math.max(0, Math.min(1, -h * 1.15));
          const gx = Math.abs(prev[i + 1] - prev[i - 1]);
          const gy = Math.abs(prev[i + cols] - prev[i - cols]);
          const spec = Math.min(1, (gx + gy) * 3.2);
          const p = i * 4;
          data[p] = Math.min(255, baseR * (1 - dark * 0.55) + light * 95 + spec * 52);
          data[p + 1] = Math.min(255, baseG * (1 - dark * 0.55) + light * 200 + spec * 118);
          data[p + 2] = Math.min(255, baseB * (1 - dark * 0.5) + light * 205 + spec * 124);
          data[p + 3] = 255;
        }
      }
      smallCtx.putImageData(imageData, 0, 0);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(small, 0, 0, cols, rows, 0, 0, width, height);
    };
    raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
        });
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-label="Interactive water surface — click or drag to make ripples" role="img" />;
}
