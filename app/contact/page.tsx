import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import EnquiryForm from "@/components/EnquiryForm";
import Accordion from "@/components/Accordion";
import { brand, faqs, whatsappLink } from "@/lib/content";
import { Clock, Headset, Mail, MapPin, Phone, Truck, WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact AQUARIS — orders, wholesale and customer care",
  description:
    "Talk to the AQUARIS team: call, WhatsApp or email us about orders, delivery, wholesale pricing or distribution. Real people, weekdays and Saturdays.",
  alternates: { canonical: "/contact" },
};

const responseTimes = [
  { icon: <WhatsApp size={18} />, channel: "WhatsApp", time: "≈ 6 min", note: "Fastest for orders and delivery questions" },
  { icon: <Phone size={18} />, channel: "Phone", time: "Under 1 min", note: "Mon – Sat, 8:00am – 6:00pm" },
  { icon: <Mail size={18} />, channel: "Email", time: "Same day", note: "For invoices, quotes and documents" },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Contact"
        title={
          <>
            A real person,
            <br />
            <span className="accent-italic">every time.</span>
          </>
        }
        description="Order questions, delivery changes, wholesale quotes or a complaint — it all lands in one inbox, with humans on the other end."
        crumbs={[{ label: "Contact" }]}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
          <a className="btn btn--primary" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <span>
              <WhatsApp size={16} /> Chat on WhatsApp
            </span>
          </a>
          <a className="btn btn--ghost-light" href={brand.phoneHref}>
            <span>
              <Phone size={16} /> {brand.phone}
            </span>
          </a>
        </div>
      </PageHead>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-card">
            <EnquiryForm
              types={[
                { id: "general", label: "General enquiry" },
                { id: "order", label: "Order or delivery question" },
                { id: "wholesale", label: "Wholesale / bulk pricing" },
                { id: "distributor", label: "Distributor application" },
                { id: "corporate", label: "Corporate supply" },
                { id: "feedback", label: "Feedback or complaint" },
              ]}
              subject="Send us a message"
              cta="Send message"
              successTitle="Message received"
              successBody="Thank you — our team will reply within one working day. For anything urgent, WhatsApp is fastest."
            />
          </div>

          <aside className="contact-info">
            <h2>Reach us directly</h2>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Phone size={18} />
              </span>
              <div>
                <span>Phone</span>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Mail size={18} />
              </span>
              <div>
                <span>Email</span>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Headset size={18} />
              </span>
              <div>
                <span>Wholesale desk</span>
                <a href={`mailto:${brand.wholesaleEmail}`}>{brand.wholesaleEmail}</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <MapPin size={18} />
              </span>
              <div>
                <span>Office</span>
                <strong>{brand.address}</strong>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__icon">
                <Truck size={18} />
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
                <span>Opening hours</span>
                <strong>{brand.hours}</strong>
              </div>
            </div>

            <div className="hours">
              <h3>Dispatch cut-off</h3>
              <div>
                <span>Same-day Lagos delivery</span>
                <span>1:00pm</span>
              </div>
              <div>
                <span>Plant pickup</span>
                <span>2 hours</span>
              </div>
              <div>
                <span>Sunday</span>
                <span>Pickup only</span>
              </div>
            </div>

            <a
              className="btn btn--primary btn--block"
              style={{ marginTop: 22 }}
              href={whatsappLink("Hello AQUARIS, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <WhatsApp size={16} /> Message us now
              </span>
            </a>
          </aside>
        </div>
      </section>

      <section className="section section--sky section--tight">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">How we respond</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 50px)" }}>
                Fast, by <span className="accent-italic">whatever channel.</span>
              </h2>
            </div>
            <p className="section-head__aside">Measured across the last 90 days of customer conversations.</p>
          </div>
          <div className="response-grid">
            {responseTimes.map((item) => (
              <div className="response-card" key={item.channel}>
                <span className="response-card__icon">{item.icon}</span>
                <div>
                  <span>{item.channel}</span>
                  <strong>{item.time}</strong>
                  <p>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">Before you write</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 50px)" }}>
                Answers to the <span className="accent-italic">usual questions.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              Still stuck? Send the form above — we do not use canned replies.
            </p>
          </div>
          <div className="narrow">
            <Accordion items={faqs.map((faq, index) => ({ id: `contact-faq-${index}`, title: faq.q, content: <p>{faq.a}</p> }))} />
            <p className="small muted" style={{ marginTop: 24 }}>
              Looking for wholesale?{" "}
              <Link href="/distribution" style={{ color: "var(--aqua-deep)", fontWeight: 600 }}>
                See trade pricing and the application form
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
