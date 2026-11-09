"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";
import type { Product } from "@/lib/products";
import { ArrowRight, Check, Plus, Star } from "./Icons";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useStore();
  const [added, setAdded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const quickAdd = () => {
    const variant = product.variants[0];
    addItem(
      {
        slug: product.slug,
        variantId: variant.id,
        name: product.name,
        pack: variant.label,
        price: variant.price,
        image: product.image,
      },
      1,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <article className="pcard" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="pcard__media">
        <div className="pcard__badges">
          {product.badge && <span className="badge">{product.badge}</span>}
          {product.compareAt && <span className="badge badge--soft">Save {money(product.compareAt - product.price)}</span>}
        </div>
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`} style={{ display: "block", height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pcard__img" src={product.image} alt={`${product.name} bottle`} loading="lazy" decoding="async" />
        </Link>
        <button type="button" className="pcard__quick" onClick={quickAdd}>
          {added ? <Check size={15} /> : <Plus size={15} />}
          {added ? "Added to your order" : "Quick add to order"}
        </button>
      </div>

      <div className="pcard__body">
        <div className="pcard__eyebrow">
          <span>{product.size} · {product.pack}</span>
          <span className="pcard__rating">
            <Star size={11} /> {product.rating}
          </span>
        </div>
        <h3 className="pcard__name">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="pcard__tag">{product.tagline}</p>
        <div className="pcard__foot">
          <span className="pcard__price">
            <strong>
              {money(product.price)}
              {product.compareAt && <del>{money(product.compareAt)}</del>}
            </strong>
            <small>{product.variants[0].label}</small>
          </span>
          <button
            type="button"
            className="pcard__add"
            data-added={added}
            aria-label={`Add ${product.name} to cart`}
            onClick={quickAdd}
          >
            {added ? <Check size={17} /> : <Plus size={17} />}
          </button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedGrid({ items }: { items: Product[] }) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </div>
  );
}

export function ViewAllLink() {
  return (
    <Link href="/products" className="link-underline">
      View all water <ArrowRight size={15} />
    </Link>
  );
}
