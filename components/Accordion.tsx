"use client";

import { useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function Accordion({ items, initialOpen = 0 }: { items: AccordionItem[]; initialOpen?: number }) {
  const [open, setOpen] = useState<number | null>(initialOpen);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className="accordion__item" key={item.id}>
            <button
              type="button"
              className="accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              id={`trigger-${item.id}`}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span>{item.title}</span>
              <span className="accordion__icon" aria-hidden />
            </button>
            <div
              className="accordion__panel"
              id={`panel-${item.id}`}
              role="region"
              aria-labelledby={`trigger-${item.id}`}
              data-open={isOpen}
            >
              <div className="accordion__panel-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
