"use client";

import { useState } from "react";
import { purificationSteps } from "@/lib/content";
import { Droplet } from "./Icons";

const backdrops = [
  "/images/source-water.webp",
  "/images/production-line.webp",
  "/images/quality-lab.webp",
  "/images/source-water.webp",
  "/images/pour.webp",
  "/images/quality-lab.webp",
  "/images/production-line.webp",
];

export default function PurificationStepper() {
  const [active, setActive] = useState(0);
  const step = purificationSteps[active];

  return (
    <div className="stepper">
      <div className="stepper__list" role="tablist" aria-label="Purification stages">
        {purificationSteps.map((item, index) => (
          <button
            type="button"
            className="stepper__item"
            key={item.step}
            data-active={index === active}
            onClick={() => setActive(index)}
            role="tab"
            aria-selected={index === active}
            aria-controls="purification-panel"
          >
            <span className="stepper__num">{item.step}</span>
            <span className="stepper__title">{item.title}</span>
            <span className="stepper__metric">{item.metric}</span>
          </button>
        ))}
      </div>

      <div
        className="stepper__panel"
        id="purification-panel"
        role="tabpanel"
        aria-live="polite"
      >
        <div className="stepper__bg" style={{ backgroundImage: `url(${backdrops[active % backdrops.length]})` }} aria-hidden />
        <div className="stepper__panel-top">
          <span className="stepper__panel-num">{step.step}</span>
          <span className="badge badge--dark">
            <Droplet size={12} /> Stage {active + 1} of {purificationSteps.length}
          </span>
        </div>
        <h3 key={`title-${active}`}>{step.title}</h3>
        <p key={`body-${active}`}>{step.body}</p>
        <span className="stepper__panel-metric">{step.metric}</span>
        <span className="stepper__progress" style={{ width: `${((active + 1) / purificationSteps.length) * 100}%` }} />
      </div>
    </div>
  );
}
