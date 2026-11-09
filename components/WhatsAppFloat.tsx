"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/content";
import { ArrowUp, WhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating floating--bottom">
      <button
        type="button"
        className="float-btn float-btn--top"
        data-visible={showTop}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={18} />
      </button>
      <a
        className="float-btn float-btn--wa"
        href={whatsappLink("Hello AQUARIS! I'd like to ask about ordering table water.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AQUARIS on WhatsApp"
      >
        <WhatsApp size={26} />
        <span className="wa-tooltip">Chat with our water team</span>
      </a>
    </div>
  );
}
