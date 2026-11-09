"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import WaterShader from "./WaterShader";
import Magnetic from "./Magnetic";
import { useStore } from "@/lib/store";
import { ArrowRight, Droplet, Snowflake, Truck } from "./Icons";

export default function Hero() {
  const { settings } = useStore();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 26;
      targetY = (event.clientY / window.innerHeight - 0.5) * 22;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      wrap.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lines = settings.heroHeadline.split("|").filter(Boolean).slice(0, 3);

  return (
    <section className="hero">
      <WaterShader />
      <div className="hero__veil" />
      <div className="hero__grain" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__badge">
            <span className="status-dot" />
            Sealed at source · Ogun State, Nigeria
          </span>

          <h1 className="hero__title">
            {lines.map((line, index) => (
              <span className="line" key={`${line}-${index}`}>
                <span>{index === 1 ? <em>{line}</em> : line}</span>
              </span>
            ))}
          </h1>

          <p className="hero__sub">{settings.heroSub}</p>

          <div className="hero__cta">
            <Magnetic>
              <Link href="/products" className="btn btn--primary btn--lg">
                <span>
                  Explore our products <ArrowRight size={17} className="arrow" />
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/order" className="btn btn--ghost-light btn--lg">
                <span>Order now</span>
              </Link>
            </Magnetic>
          </div>

          <div className="hero__meta">
            <div>
              <strong>7-stage</strong>
              <span>Purification</span>
            </div>
            <div>
              <strong>18</strong>
              <span>Cities served</span>
            </div>
            <div>
              <strong>Same-day</strong>
              <span>Lagos delivery</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__orb" aria-hidden />
          <div className="hero__bottle-wrap">
            <div className="hero__bottle-inner" ref={wrapRef}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
              className="hero__bottle"
              src="/images/hero-bottle.webp"
              alt="AQUARIS bottled water with a crown of water splashing around the bottle"
              width={1408}
              height={768}
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="hero__card hero__card--ph">
            <span className="hero__card-icon">
              <Droplet size={18} />
            </span>
            <div>
              <strong>pH 7.4</strong>
              <span>Balanced</span>
            </div>
          </div>

          <div className="hero__card hero__card--temp">
            <span className="hero__card-icon">
              <Snowflake size={18} />
            </span>
            <div>
              <strong>8–12°C</strong>
              <span>Chilled delivery</span>
            </div>
          </div>

          <div className="hero__card hero__card--truck" style={{ right: "8%", top: "4%", animationDelay: "1s" }}>
            <span className="hero__card-icon">
              <Truck size={18} />
            </span>
            <div>
              <strong>Same day</strong>
              <span>Lagos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <i /> Scroll to explore
      </div>
    </section>
  );
}
