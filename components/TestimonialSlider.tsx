"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import { ChevronLeft, ChevronRight, Star } from "./Icons";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const total = testimonials.length;

  const go = (next: number) => setIndex((next + total) % total);

  useEffect(() => {
    if (paused || dragging) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % total), 6500);
    return () => window.clearInterval(timer);
  }, [paused, dragging, total]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDrag(event.clientX - startX.current);
  };

  const onPointerUp = () => {
    if (drag < -60) go(index + 1);
    else if (drag > 60) go(index - 1);
    setDragging(false);
    setDrag(0);
  };

  return (
    <div
      className="testimonial"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="testimonial__viewport">
        <div
          className="testimonial__track"
          data-dragging={dragging}
          style={{ transform: `translate3d(calc(${-index * 100}% + ${dragging ? drag : 0}px), 0, 0)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {testimonials.map((item, slideIndex) => (
            <div className="testimonial__slide" key={item.name} aria-hidden={slideIndex !== index}>
              <figure className="testimonial__card">
                <span className="testimonial__quote-mark" aria-hidden>
                  “
                </span>
                <div>
                  <div className="stars" aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={13}
                        style={{ opacity: starIndex < Math.round(item.rating) ? 1 : 0.25 }}
                      />
                    ))}
                  </div>
                  <blockquote className="testimonial__text" style={{ marginTop: 14 }}>
                    {item.quote}
                  </blockquote>
                  <figcaption className="testimonial__meta">
                    <div className="testimonial__person">
                      <span className="testimonial__avatar">{item.initials}</span>
                      <span>
                        <strong>{item.name}</strong>
                        <span>
                          {item.role} · {item.company}, {item.city}
                        </span>
                      </span>
                    </div>
                    <span className="badge badge--soft">Verified customer</span>
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial__nav" style={{ justifyContent: "space-between", marginTop: 22 }}>
        <div className="testimonial__dots" style={{ marginTop: 0 }}>
          {testimonials.map((item, dotIndex) => (
            <button
              key={item.name}
              type="button"
              data-active={dotIndex === index}
              aria-label={`Show testimonial ${dotIndex + 1}`}
              aria-current={dotIndex === index}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="circle-btn" aria-label="Previous testimonial" onClick={() => go(index - 1)}>
            <ChevronLeft size={17} />
          </button>
          <button type="button" className="circle-btn" aria-label="Next testimonial" onClick={() => go(index + 1)}>
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
