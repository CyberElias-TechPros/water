"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";
import Accordion from "./Accordion";
import ProductCard from "./ProductCard";
import { whatsappLink } from "@/lib/content";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Close,
  Copy,
  Droplet,
  Minus,
  Plus,
  Shield,
  Share,
  Star,
  Truck,
  WhatsApp,
  ZoomIn,
} from "./Icons";

const frequencies = [
  { id: "once", label: "One-off", discount: 0, note: "Single delivery" },
  { id: "weekly", label: "Weekly", discount: 0.05, note: "Save 5%" },
  { id: "fortnightly", label: "Fortnightly", discount: 0.03, note: "Save 3%" },
];

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addItem, toast } = useStore();
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [frequency, setFrequency] = useState("once");
  const [imageIndex, setImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightbox, setLightbox] = useState(false);
  const [copied, setCopied] = useState(false);

  const variant = product.variants[variantIndex];
  const freq = frequencies.find((item) => item.id === frequency) ?? frequencies[0];
  const unitPrice = Math.round(variant.price * (1 - freq.discount));
  const total = unitPrice * qty;
  const stockPercent = Math.min(100, Math.round((product.stock / 900) * 100));

  const add = () => {
    addItem(
      {
        slug: product.slug,
        variantId: `${variant.id}-${freq.id}`,
        name: product.name,
        pack: `${variant.label}${freq.id !== "once" ? ` · ${freq.label}` : ""}`,
        price: unitPrice,
        image: product.image,
      },
      qty,
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast("Link copied", "success", "Share AQUARIS with anyone.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Could not copy the link", "error", "You can copy the address bar URL instead.");
    }
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") setImageIndex((index) => (index + 1) % product.gallery.length);
      if (event.key === "ArrowLeft") setImageIndex((index) => (index - 1 + product.gallery.length) % product.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, product.gallery.length]);

  return (
    <>
      <div className="pdp">
        <div className="pdp__gallery">
          <div
            className="pdp__stage"
            data-zoom={zoom}
            onClick={() => setLightbox(true)}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;
              setOrigin(`${x}% ${y}%`);
            }}
            role="button"
            tabIndex={0}
            aria-label="Open larger image"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setLightbox(true);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pdp__stage-img"
              src={product.gallery[imageIndex]}
              alt={`${product.name} — view ${imageIndex + 1}`}
              style={{ transformOrigin: origin }}
              fetchPriority="high"
            />
            <span className="pdp__stage-hint">
              <ZoomIn size={13} /> Hover to zoom · click to expand
            </span>
            {product.badge && (
              <span className="badge" style={{ position: "absolute", top: 16, left: 16 }}>
                {product.badge}
              </span>
            )}
          </div>

          <div className="pdp__thumbs">
            {product.gallery.map((image, index) => (
              <button
                type="button"
                className="pdp__thumb"
                key={image + index}
                data-active={index === imageIndex}
                onClick={() => setImageIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={index === imageIndex}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          <div className="pdp__eyebrow">
            <span>{product.categoryLabel}</span>
            <span aria-hidden>·</span>
            <span>{product.size} bottle</span>
            <span aria-hidden>·</span>
            <span>{product.pack}</span>
          </div>

          <h1 className="pdp__title">{product.name}</h1>

          <div className="pdp__rating">
            <span className="stars" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={13} style={{ opacity: index < Math.round(product.rating) ? 1 : 0.25 }} />
              ))}
            </span>
            <b>{product.rating.toFixed(1)}</b>
            <span>· {product.reviews} verified reviews</span>
          </div>

          <div className="pdp__price-row">
            <span className="pdp__price">{money(unitPrice)}</span>
            {variant.price !== unitPrice && <span className="pdp__compare">{money(variant.price)}</span>}
            {product.compareAt && <span className="pdp__compare">{money(product.compareAt)}</span>}
            <span className="pdp__save">{freq.discount > 0 ? `${Math.round(freq.discount * 100)}% subscription saving` : "Incl. VAT"}</span>
          </div>

          <p className="pdp__desc">{product.description}</p>

          <div className="pdp__group">
            <div className="pdp__group-head">
              <span>Choose your pack</span>
              <b>{variant.label}</b>
            </div>
            <div className="variant-row" role="group" aria-label="Pack size">
              {product.variants.map((item, index) => (
                <button
                  type="button"
                  className="variant"
                  key={item.id}
                  data-active={index === variantIndex}
                  onClick={() => setVariantIndex(index)}
                  aria-pressed={index === variantIndex}
                >
                  <strong>{item.label}</strong>
                  <span>{money(item.price)}</span>
                  {item.note && <em>{item.note}</em>}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp__group">
            <div className="pdp__group-head">
              <span>Delivery frequency</span>
              <b>{freq.note}</b>
            </div>
            <div className="variant-row" role="group" aria-label="Delivery frequency">
              {frequencies.map((item) => (
                <button
                  type="button"
                  className="variant"
                  key={item.id}
                  data-active={item.id === frequency}
                  onClick={() => setFrequency(item.id)}
                  aria-pressed={item.id === frequency}
                  style={{ minWidth: 96 }}
                >
                  <strong>{item.label}</strong>
                  <span>{item.discount ? item.note : "Pay as you go"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="buy-row">
            <div className="qty" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((value) => Math.min(99, value + 1))} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
            <button type="button" className="btn btn--primary" onClick={add}>
              <span>
                Add to order · {money(total)} <ArrowRight size={16} className="arrow" />
              </span>
            </button>
            <div className="buy-row__total">
              <span>{variant.pack}</span>
              <b>{money(unitPrice)} each</b>
            </div>
          </div>

          <p className="pdp__stock">
            <span className="status-dot" /> In stock — {product.stock} packs ready to dispatch
          </p>
          <div className="stock-meter" aria-hidden>
            <span style={{ width: `${Math.max(18, stockPercent)}%` }} />
          </div>

          <div className="pdp__delivery">
            <div>
              <Truck size={16} />
              <span>
                <b>Free delivery</b> on orders over ₦15,000. Lagos same-day for orders before 1pm.
              </span>
            </div>
            <div>
              <Shield size={16} />
              <span>Sealed, coded and batch-tested. Tamper seal on every bottle.</span>
            </div>
            <div>
              <Droplet size={16} />
              <span>Seven-stage purified table water from a protected 148m aquifer.</span>
            </div>
          </div>

          <Accordion
            items={[
              {
                id: "specs",
                title: "Product specifications",
                content: (
                  <table className="spec-table">
                    <tbody>
                      {product.specs.map((spec) => (
                        <tr key={spec.label}>
                          <th scope="row">{spec.label}</th>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ),
              },
              {
                id: "quality",
                title: "Quality & testing",
                content: (
                  <div>
                    <p>
                      Every batch of {product.shortName} is sampled after UV treatment, at the filler head and from
                      finished stock. Testing covers microbiological indicators, turbidity, pH, conductivity and total
                      dissolved solids.
                    </p>
                    <p style={{ marginTop: 10 }}>
                      Need the batch summary for your records? Ask our quality team and we will send it the same working
                      day.
                    </p>
                  </div>
                ),
              },
              {
                id: "delivery",
                title: "Delivery & returns",
                content: (
                  <ul style={{ display: "grid", gap: 8 }}>
                    <li>Lagos: same-day for orders placed before 1pm, next morning otherwise.</li>
                    <li>Abuja, Port Harcourt, Enugu, Kano and Ibadan: 1–3 working days.</li>
                    <li>Free delivery on orders above ₦15,000; ₦1,500–₦4,500 by zone below that.</li>
                    <li>Sealed packs can be returned within 7 days if damaged in transit.</li>
                    <li>19L bottles are returnable — we collect empties on your next refill.</li>
                  </ul>
                ),
              },
              {
                id: "wholesale",
                title: "Wholesale & bulk orders",
                content: (
                  <div>
                    <p>
                      Ordering 40 packs or more? Trade pricing starts there, with pallet rates from 200 packs. We also
                      block production capacity for events.
                    </p>
                    <p style={{ marginTop: 10 }}>
                      <Link href="/distribution" className="link-underline">
                        See wholesale pricing <ArrowRight size={14} />
                      </Link>
                    </p>
                  </div>
                ),
              },
            ]}
          />

          <div className="pdp__share">
            <span>Share</span>
            <button type="button" className="share-btn" onClick={copyLink} aria-label="Copy product link">
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
            <a
              className="share-btn"
              href={whatsappLink(`Hi AQUARIS, I'm interested in ${product.name} (${variant.label}).`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ask about this product on WhatsApp"
            >
              <WhatsApp size={16} />
            </a>
            <a
              className="share-btn"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`AQUARIS ${product.shortName} — pure refreshment.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
            >
              <Share size={15} />
            </a>
          </div>
        </div>
      </div>

      <section className="section section--white" style={{ marginTop: "clamp(50px, 7vw, 90px)" }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">You may also like</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.4vw, 46px)" }}>
                Complete the <span className="accent-italic">table.</span>
              </h2>
            </div>
            <Link href="/products" className="link-underline section-head__aside">
              All products <ArrowRight size={15} />
            </Link>
          </div>
          <div className="product-grid product-grid--three">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${product.name} image viewer`}>
          <button type="button" className="lightbox__close" onClick={() => setLightbox(false)} aria-label="Close image viewer">
            <Close size={20} />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous image"
            onClick={() => setImageIndex((index) => (index - 1 + product.gallery.length) % product.gallery.length)}
          >
            <ChevronLeft size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.gallery[imageIndex]} alt={`${product.name} enlarged`} />
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next image"
            onClick={() => setImageIndex((index) => (index + 1) % product.gallery.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
