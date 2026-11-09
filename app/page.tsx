import Link from "next/link";
import Hero from "@/components/Hero";
import { CountUp, Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import PurificationStepper from "@/components/PurificationStepper";
import TestimonialSlider from "@/components/TestimonialSlider";
import RipplePool from "@/components/RipplePool";
import Magnetic from "@/components/Magnetic";
import {
  ArrowRight,
  ArrowUpRight,
  Chat,
  Check,
  Droplet,
  Funnel,
  Leaf,
  Package,
  Shield,
  Truck,
  Quote,
} from "@/components/Icons";
import { brand, distributors, news, stats, whyUs } from "@/lib/content";
import { products } from "@/lib/products";

const featureIcons: Record<string, React.ReactNode> = {
  filter: <Funnel size={22} />,
  seal: <Package size={22} />,
  truck: <Truck size={22} />,
  shield: <Shield size={22} />,
  leaf: <Leaf size={22} />,
  chat: <Chat size={22} />,
};

const partners = [
  "Eko Grand Hotel",
  "Meridian Partners",
  "Green Basket Stores",
  "Civic Health Clinics",
  "Bluewater Events",
  "Harmony Schools",
  "Atlas Offices",
  "Lagoon Suites",
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* credibility marquee */}
      <div className="trust-strip">
        <div className="container trust-strip__inner">
          <span className="trust-strip__label">Trusted by 480+ teams</span>
          <div className="marquee">
            {[0, 1].map((copy) => (
              <div className="marquee__track" key={copy} aria-hidden={copy === 1}>
                {partners.map((partner) => (
                  <span className="marquee__item" key={`${copy}-${partner}`}>
                    <span className="marquee__dot" />
                    {partner}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* brand intro */}
      <section className="section">
        <div className="container intro">
          <Reveal variant="left" className="intro__media">
            <div className="intro__media-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/source-water.webp" alt="Crystal-clear water ripples, the texture of AQUARIS water" loading="lazy" />
            </div>
            <div className="intro__media-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/production-line.webp" alt="AQUARIS bottles moving along the production line" loading="lazy" />
            </div>
            <div className="intro__seal" aria-hidden>
              <svg viewBox="0 0 100 100">
                <defs>
                  <path id="sealCircle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text fill="rgba(255,255,255,0.45)" fontSize="6.4" letterSpacing="2.2">
                  <textPath href="#sealCircle">PURIFIED IN SEVEN STAGES · SEALED AT SOURCE ·</textPath>
                </text>
              </svg>
              <div className="intro__seal-center">
                12<span>Years</span>
              </div>
            </div>
          </Reveal>

          <div className="intro__copy">
            <Reveal>
              <span className="eyebrow">More than just water</span>
              <h2 className="h2">
                Clean water is the baseline.
                <br />
                <span className="accent-italic">Trust</span> is what we bottle.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead">
                We started in 2012 with one borehole, one purification line and forty cases a week. Twelve years later
                the mission has not moved: make water so consistently good that nobody has to think about it.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="intro__points">
                <div className="intro__point">
                  <Check size={16} />
                  <span>Every batch sampled and tested at three points in production.</span>
                </div>
                <div className="intro__point">
                  <Check size={16} />
                  <span>Bottled and sealed inside a filtered clean room — never in transit.</span>
                </div>
                <div className="intro__point">
                  <Check size={16} />
                  <span>Delivered by our own trained route team, on a schedule you set.</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="intro__actions">
                <Magnetic>
                  <Link href="/about" className="btn btn--primary">
                    <span>
                      Read our story <ArrowRight size={16} className="arrow" />
                    </span>
                  </Link>
                </Magnetic>
                <div className="intro__signature">
                  <span className="avatar">ON</span>
                  <div>
                    <strong>Olamide Nwankwo</strong>
                    <span>Founder, AQUARIS</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* featured products */}
      <section className="section section--white" id="products">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <Reveal>
                <span className="eyebrow">Our water</span>
                <h2 className="h2">
                  Four sizes. <span className="accent-italic">One standard.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal className="section-head__aside" delay={100}>
              <p>
                From the pocket-sized 50cl to the returnable 19L dispenser bottle — same seven-stage water, same sealed
                finish, different occasions.
              </p>
              <Link href="/products" className="link-underline" style={{ marginTop: 16 }}>
                View all water <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 90} variant="scale">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* why us */}
      <section className="section section--sky">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <Reveal>
                <span className="eyebrow">Why AQUARIS</span>
                <h2 className="h2">
                  The details you <span className="accent-italic">can taste.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal className="section-head__aside" delay={90}>
              <p>
                No magic. Just disciplined filtration, sealed packaging, honest labelling and a delivery team that
                shows up when it says it will.
              </p>
            </Reveal>
          </div>

          <div className="why-grid">
            {whyUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="why-card">
                  <span className="why-card__index">0{index + 1}</span>
                  <div className="why-card__icon">{featureIcons[item.icon]}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="stats-band">
        <div className="container">
          <div className="stats-band__grid">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <div className="stat">
                  <div className="stat__value">
                    <CountUp value={stat.value} decimals={stat.decimals} />
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="stat__label">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* quality / purification */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <Reveal>
                <span className="eyebrow">Quality &amp; safety</span>
                <h2 className="h2">
                  Seven stages between the aquifer and <span className="accent-italic">your table.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal className="section-head__aside" delay={90}>
              <p>Tap a stage to see what happens inside the plant — and the number we hold ourselves to.</p>
              <Link href="/quality" className="link-underline" style={{ marginTop: 16 }}>
                How we test <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>
          <Reveal variant="fade">
            <PurificationStepper />
          </Reveal>
        </div>
      </section>

      {/* interactive pool */}
      <section className="pool" aria-label="Interactive water">
        <RipplePool />
        <div className="pool__veil" />
        <div className="pool__content">
          <Reveal>
            <span className="eyebrow">Clarity you can feel</span>
            <h2 className="h2">
              Still water.
              <br />
              <span className="accent-italic">Not still for long.</span>
            </h2>
            <p>Touch the surface. Every ripple you make is a small reminder of how clear water should be.</p>
          </Reveal>
        </div>
        <div className="pool__hint">
          <Droplet size={14} /> Click, drag or tap to make ripples
        </div>
      </section>

      {/* distribution */}
      <section className="section section--deep">
        <div className="container split">
          <Reveal variant="left" className="split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/distribution.webp" alt="Packs of AQUARIS water loaded for delivery beside a van" loading="lazy" />
            <span className="split__media-tag">
              <span className="status-dot" /> Daily dispatch from Lekki &amp; Ogun
            </span>
          </Reveal>
          <Reveal variant="right" className="split__copy">
            <span className="eyebrow">Distribution &amp; wholesale</span>
            <h2 className="h2">
              For homes. For offices. For <span className="accent-italic">every table.</span>
            </h2>
            <p className="muted">
              Scheduled office refills, hotel housekeeping routes, event bulk orders and retail supply — with trade
              pricing, monthly invoicing and a route team that knows your gate.
            </p>
            <div className="coverage">
              {["Lagos", "Abuja", "Port Harcourt", "Enugu", "Kano", "Ibadan", "Asaba", "Uyo", "Benin City"].map(
                (city) => (
                  <span key={city}>{city}</span>
                ),
              )}
            </div>
            <div className="split__actions">
              <Link href="/distribution" className="btn btn--primary">
                <span>
                  Wholesale pricing <ArrowRight size={16} className="arrow" />
                </span>
              </Link>
              <Link href="/distributors" className="btn btn--ghost-light">
                <span>Find a distributor</span>
              </Link>
            </div>
            <p className="small" style={{ marginTop: 22, color: "rgba(233,252,252,.45)" }}>
              {distributors.length} verified locations · coverage extends to 18 cities
            </p>
          </Reveal>
        </div>
      </section>

      {/* testimonials */}
      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <Reveal>
                <span className="eyebrow">In their words</span>
                <h2 className="h2">
                  What our customers <span className="accent-italic">actually say.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal className="section-head__aside" delay={90}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className="quote-bubble" aria-hidden>
                  <Quote size={20} />
                </span>
                <p style={{ fontSize: 13 }}>
                  Feedback collected from verified orders, delivery invoices and wholesale partners.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal variant="fade">
            <TestimonialSlider />
          </Reveal>
        </div>
      </section>

      {/* news */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <Reveal>
                <span className="eyebrow">News &amp; updates</span>
                <h2 className="h2">
                  From the <span className="accent-italic">plant floor.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal className="section-head__aside" delay={80}>
              <Link href="/news" className="link-underline">
                All updates <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="news-grid">
            {news.slice(0, 3).map((item, index) => (
              <Reveal key={item.id} delay={index * 90}>
                <Link href={`/news#${item.id}`} className="news-card">
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
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="cta-band__bg" style={{ backgroundImage: "url(/images/pour.webp)" }} aria-hidden />
        <div className="container cta-band__inner">
          <div>
            <Reveal>
              <span className="eyebrow">Make every moment refreshing</span>
              <h2 className="h2">
                Your next drop is <span className="accent-italic">already chilled.</span>
              </h2>
              <p>
                Order a pack, set up a weekly office refill, or send us a wholesale enquiry. We answer in minutes, not
                days.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="cta-band__actions">
                <Link href="/products" className="btn btn--primary btn--lg">
                  <span>
                    Explore our products <ArrowRight size={17} className="arrow" />
                  </span>
                </Link>
                <Link href="/contact" className="btn btn--ghost-light btn--lg">
                  <span>Contact our team</span>
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal variant="scale" delay={160}>
            <div className="cta-band__badge">
              <div>
                <strong>18</strong>
                <span>Cities delivered weekly</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
