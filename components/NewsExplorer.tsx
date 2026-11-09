"use client";

import { useEffect, useMemo, useState } from "react";
import { news } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { useStore } from "@/lib/store";
import { ArrowUpRight, Close, Copy, Share } from "./Icons";

const categories = ["All", ...Array.from(new Set(news.map((item) => item.category)))];

export default function NewsExplorer() {
  const { toast } = useStore();
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(
    () => (category === "All" ? news : news.filter((item) => item.category === category)),
    [category],
  );

  const open = news.find((item) => item.id === openId) ?? null;

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (fromHash && news.some((item) => item.id === fromHash)) {
      setOpenId(fromHash);
      window.setTimeout(() => {
        document.getElementById("news-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, []);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  const close = () => {
    setOpenId(null);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  const share = async () => {
    if (!open) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/news#${open.id}`);
      toast("Article link copied", "success", "Share it with your team.");
    } catch {
      toast("Could not copy the link", "error");
    }
  };

  return (
    <>
      <div className="news-filters" role="group" aria-label="Filter news by category">
        {categories.map((item) => (
          <button
            type="button"
            className="chip"
            key={item}
            data-active={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="news-grid" id="news-list">
        {items.map((item) => (
          <article
            className="news-card"
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              setOpenId(item.id);
              history.replaceState(null, "", `#${item.id}`);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpenId(item.id);
                history.replaceState(null, "", `#${item.id}`);
              }
            }}
          >
            <div className="news-card__top">
              <span className="news-card__cat">{item.category}</span>
              <span>{formatDate(item.date)}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
            <div className="news-card__foot">
              <span>{item.read}</span>
              <span className="news-card__arrow">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="article-modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={close}>
          <article className="article-sheet" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="article-sheet__close" onClick={close} aria-label="Close article">
              <Close size={18} />
            </button>
            <span className="eyebrow">{open.category}</span>
            <h1>{open.title}</h1>
            <div className="article-sheet__meta">
              <span>{formatDate(open.date)}</span>
              <span>{open.read}</span>
              <span>AQUARIS communications</span>
            </div>
            <div className="article-sheet__body">
              {open.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="article-sheet__foot">
              <button type="button" className="btn btn--ghost btn--sm" onClick={share}>
                <span>
                  <Copy size={14} /> Copy link
                </span>
              </button>
              <a
                className="btn btn--ghost btn--sm"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(open.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <Share size={14} /> Share
                </span>
              </a>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
