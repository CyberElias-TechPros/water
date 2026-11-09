import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import EnquiryForm from "@/components/EnquiryForm";
import { Reveal } from "@/components/Reveal";
import { wholesaleTiers, faqs, brand } from "@/lib/content";
import Accordion from "@/components/Accordion";
import { ArrowRight, Check, Clock, Mail, MapPin, Phone, Truck, WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Wholesale & distribution — trade pricing for offices, hotels and retailers",
  description:
    "AQUARIS wholesale table water: trade pricing from 40 packs, pallet rates for distributors, scheduled office refills and event supply across Nigeria.",
  alternates: { canonical: "/distribution" },
};

const process = [
  {
    title: "Tell us your volume",
    body: "A rough weekly or monthly number is enough. We will recommend the pack mix and delivery rhythm.",
  },
  {
    title: "Get a written quote",
    body: "Trade pricing, delivery fees and payment terms in one clear proforma — usually within the same working day.",
  },
  {
    title: "Confirm and schedule",
    body: "Approve the quote, set a delivery window, and we block production capacity for your standing order.",
  },
  {
    title: "Deliver and invoice",
    body: "Route team delivers, installs dispensers where needed, and sends a single monthly invoice.",
  },
];

export default function DistributionPage() {
  return (
    <>
      <PageHead
        eyebrow="Wholesale & distribution"
        title={
          <>
            Supply that keeps
            <br />
            <span className="accent-italic">up with you.</span>
          </>
        }
        description="For offices, hotels, clinics, schools, events and retailers: trade pricing, scheduled drops and a route team that plans around your operation — not ours."
        crumbs={[{ label: "Distribution" }]}
      >
        <div className="pill-row" style={{ marginTop: 26 }}>
          {["Trade pricing from 40 packs", "Pallet rates available", "Monthly invoicing", "Event stock blocking"].map(
            (item) => (
              <span
                className="chip"
                key={item}
                style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.18)" }}
              >
                {item}
              </span>
            ),
          )}
        </div>
      </PageHead>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">Three ways to buy</span>
              <h2 className="h2">
                Pick the tier that fits <span className="accent-italic">your volume.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              All tiers get the same water. What changes is pricing, delivery rhythm and the level of account support.
            </p>
          </div>

          <div className="tier-grid">
            {wholesaleTiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 90}>
                <article className="tier-card" data-featured={Boolean(tier.featured)}>
                  {tier.featured && <span className="tier-card__flag">Most popular</span>}
                  <span className="tier-card__target">{tier.target}</span>
                  <h3>{tier.name}</h3>
                  <p className="tier-card__discount">{tier.discount}</p>
                  <p className="tier-card__minimum">Minimum: {tier.minimum}</p>
                  <ul>
                    {tier.perks.map((perk) => (
                      <li key={perk}>
                        <Check size={14} /> {perk}
                      </li>
                    ))}
                  </ul>
                  <Link href="#apply" className={tier.featured ? "btn btn--primary btn--block" : "btn btn--ghost btn--block"}>
                    <span>
                      Request pricing <ArrowRight size={15} className="arrow" />
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="small muted" style={{ marginTop: 20, maxWidth: "70ch" }}>
            Prices exclude delivery and are quoted per drop. Volumes above 500 packs are quoted individually. All
            wholesale customers receive our current batch testing summary on request.
          </p>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container split">
          <Reveal variant="left" className="split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/quality-lab.webp" alt="AQUARIS quality team inspecting a water sample" loading="lazy" />
            <span className="split__media-tag">
              <span className="status-dot" /> Lab tested, every batch
            </span>
          </Reveal>
          <div className="split__copy">
            <span className="eyebrow">How a trade account works</span>
            <h2 className="h2">
              Four steps from enquiry to <span className="accent-italic">first drop.</span>
            </h2>
            <ol className="process">
              {process.map((item, index) => (
                <li key={item.title}>
                  <span className="process__num">0{index + 1}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="split__actions">
              <Link href="#apply" className="btn btn--primary">
                <span>
                  Start an application <ArrowRight size={16} className="arrow" />
                </span>
              </Link>
              <a href={`mailto:${brand.wholesaleEmail}`} className="btn btn--ghost">
                <span>Email wholesale</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container contact-layout">
          <div className="contact-card">
            <EnquiryForm
              types={[
                { id: "wholesale", label: "Wholesale / trade pricing" },
                { id: "distributor", label: "Distributor application" },
                { id: "corporate", label: "Corporate supply (office / hotel)" },
                { id: "event", label: "Event bulk order" },
                { id: "retail", label: "Retail partnering" },
              ]}
              subject="Request wholesale pricing"
              cta="Send enquiry"
              successTitle="Enquiry received"
              successBody="Our trade desk will reply within one working day with pricing, availability and the next delivery window for your area."
            />
          </div>

          <aside className="contact-info">
            <h2>Talk to the trade desk</h2>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Phone size={18} />
              </span>
              <div>
                <span>Direct line</span>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <WhatsApp size={18} />
              </span>
              <div>
                <span>WhatsApp</span>
                <a
                  href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("Hello AQUARIS, I'd like wholesale pricing.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message the trade desk
                </a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Mail size={18} />
              </span>
              <div>
                <span>Wholesale email</span>
                <a href={`mailto:${brand.wholesaleEmail}`}>{brand.wholesaleEmail}</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <MapPin size={18} />
              </span>
              <div>
                <span>Plant &amp; collection</span>
                <strong>{brand.plant}</strong>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Clock size={18} />
              </span>
              <div>
                <span>Trade desk hours</span>
                <strong>{brand.hours}</strong>
              </div>
            </div>
            <div className="hours">
              <h3>Delivery windows</h3>
              <div>
                <span>Lagos, standing orders</span>
                <span>Mon – Sat</span>
              </div>
              <div>
                <span>Lagos, ad-hoc</span>
                <span>Same day</span>
              </div>
              <div>
                <span>Other states</span>
                <span>1 – 3 days</span>
              </div>
            </div>
            <p className="small" style={{ marginTop: 20, color: "rgba(233,252,252,.5)" }}>
              <Truck size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
              Free delivery on trade orders above ₦15,000 within Lagos.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--white section--tight">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">Common questions</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.4vw, 48px)" }}>
                Answering <span className="accent-italic">the logistics.</span>
              </h2>
            </div>
          </div>
          <div className="narrow">
            <Accordion items={faqs.map((faq, index) => ({ id: `faq-${index}`, title: faq.q, content: <p>{faq.a}</p> }))} initialOpen={-1} />
          </div>
        </div>
      </section>
    </>
  );
}
