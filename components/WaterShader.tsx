"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + 17.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime * 0.055;

  vec2 q = p * 3.0;
  float flow = fbm(q + vec2(t * 1.6, -t) + fbm(q * 1.6 - t * 0.7));
  float c1 = fbm(q * 1.4 + flow * 1.7 + vec2(t * 1.2, 0.0));
  float c2 = fbm(q * 2.1 - flow * 1.1 - vec2(0.0, t * 1.5));
  float caustic = pow(abs(sin((c1 + c2) * 6.28318)), 7.0);

  vec2 mouse = vec2(uMouse.x * aspect, uMouse.y);
  float dist = length(p - mouse);
  float ripple = sin(dist * 34.0 - uTime * 2.4) * exp(-dist * 5.5) * 0.55;

  float depth = smoothstep(0.0, 1.0, uv.y * 0.75 + flow * 0.55);
  vec3 deep = vec3(0.008, 0.055, 0.078);
  vec3 mid = vec3(0.016, 0.180, 0.235);
  vec3 aqua = vec3(0.16, 0.78, 0.74);
  vec3 color = mix(deep, mid, clamp(depth, 0.0, 1.0));
  color += aqua * caustic * 0.20;
  color += aqua * max(ripple, 0.0) * 0.13;
  color += aqua * 0.045 * smoothstep(0.55, 1.0, uv.y);
  color *= 1.0 - 0.52 * length(uv - vec2(0.5, 0.5));

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function WaterShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      wrap.dataset.fallback = "true";
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) {
      wrap.dataset.fallback = "true";
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      wrap.dataset.fallback = "true";
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      width = Math.max(1, Math.round(rect.width * dpr * 0.85));
      height = Math.max(1, Math.round(rect.height * dpr * 0.85));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const mouse = { x: 0.74, y: 0.55 };
    const target = { x: 0.74, y: 0.55 };
    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width;
      target.y = 1 - (event.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
        });
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div className={`hero__canvas ${className}`.trim()} ref={wrapRef} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
