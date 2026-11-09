"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";
import { products } from "@/lib/products";
import { ArrowRight, Close, Search } from "./Icons";

const quickLinks = [
  { href: "/quality", label: "Quality & testing" },
  { href: "/distributors", label: "Find a distributor" },
  { href: "/distribution", label: "Wholesale pricing" },
  { href: "/contact", label: "Contact our team" },
];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
    setQuery("");
    setActive(0);
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      [product.name, product.tagline, product.size, product.categoryLabel, product.description]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  const links = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return quickLinks;
    return quickLinks.filter((link) => link.label.toLowerCase().includes(term));
  }, [query]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter" && results[active]) {
      setSearchOpen(false);
      router.push(`/products/${results[active].slug}`);
    }
  };

  return (
    <div className="search-panel" data-open={searchOpen} aria-hidden={!searchOpen} onClick={() => setSearchOpen(false)}>
      <div className="search-box" onClick={(event) => event.stopPropagation()} role="dialog" aria-label="Search AQUARIS">
        <div className="search-box__input">
          <Search size={21} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search water, sizes or packs…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            aria-label="Search products"
          />
          {query ? (
            <button type="button" className="icon-btn" aria-label="Clear search" onClick={() => setQuery("")}>
              <Close size={16} />
            </button>
          ) : (
            <kbd>ESC</kbd>
          )}
        </div>

        <div className="search-box__body" data-lenis-prevent>
          {results.length === 0 && links.length === 0 ? (
            <div className="search-empty">
              <p>No matches for “{query}”.</p>
              <p style={{ marginTop: 8 }}>
                Try <b>50cl</b>, <b>dispenser</b> or{" "}
                <button type="button" className="link-underline" onClick={() => setQuery("")} style={{ display: "inline-flex" }}>
                  see everything
                </button>
                .
              </p>
            </div>
          ) : (
            <>
              {results.map((product, index) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="search-result"
                  data-active={index === active}
                  onClick={() => setSearchOpen(false)}
                  onMouseEnter={() => setActive(index)}
                >
                  <span className="search-result__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt="" loading="lazy" />
                  </span>
                  <span>
                    <strong>{product.name}</strong>
                    <span>
                      {product.pack} · {product.categoryLabel}
                    </span>
                  </span>
                  <span className="search-result__price">{money(product.price)}</span>
                </Link>
              ))}
              {links.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--line)" }}>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="search-result"
                      style={{ gridTemplateColumns: "1fr auto" }}
                      onClick={() => setSearchOpen(false)}
                    >
                      <strong style={{ fontSize: 13 }}>{link.label}</strong>
                      <ArrowRight size={15} />
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="search-box__foot">
          <span>↑ ↓ to navigate · Enter to open · Esc to close</span>
          <span>{results.length} product{results.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
