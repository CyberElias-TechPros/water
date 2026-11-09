import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "The terms that apply to AQUARIS orders, delivery, returns, wholesale accounts and use of this website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHead
        eyebrow="Legal"
        title={
          <>
            Terms &amp; <span className="accent-italic">conditions.</span>
          </>
        }
        description="The short version: we deliver sealed, tested water, we tell you the price before you pay, and we fix problems quickly."
        crumbs={[{ label: "Terms & conditions" }]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="prose__meta">
            <span>Last updated: 1 November 2026</span>
            <span>Governed by the laws of the Federal Republic of Nigeria</span>
          </div>
          <article className="prose">
            <p>
              These terms apply to your use of this website and to orders placed with {brand.legal}. By placing an order
              you accept them. This site is a demonstration and does not process live payments or create binding orders.
            </p>

            <h2>Orders</h2>
            <p>
              An order is confirmed when our team accepts it — normally by phone, WhatsApp or email. We may decline or
              adjust an order if stock is unavailable, the delivery area is not covered, or the details cannot be verified.
            </p>
            <p>Prices are shown in Nigerian Naira and include VAT where applicable. Delivery fees are shown before you confirm.</p>

            <h2>Delivery</h2>
            <ul>
              <li>Lagos same-day delivery applies to orders confirmed before 1:00pm, subject to route capacity.</li>
              <li>Estimated times are given in good faith; traffic, weather and access restrictions can affect them.</li>
              <li>Someone aged 18 or over must receive the delivery, or you may nominate a secure drop-off point in writing.</li>
              <li>1–3 working days applies to Abuja, Port Harcourt, Enugu, Kano, Ibadan and other covered states.</li>
            </ul>

            <h2>Returns and quality issues</h2>
            <p>
              Every bottle leaves the plant sealed. If a pack arrives damaged, leaking or with a broken seal, tell us
              within 24 hours with a photo and we will replace it or refund it. Opened or partially used packs cannot be
              returned for hygiene reasons.
            </p>

            <h2>19L dispenser bottles</h2>
            <p>
              Returnable 19L bottles remain the property of AQUARIS. A refundable deposit applies per bottle. We collect
              empties on your next refill; unreturned bottles may be charged at replacement cost after 60 days.
            </p>

            <h2>Wholesale and distribution</h2>
            <p>
              Trade pricing, credit terms and territory arrangements are set out in a separate written agreement. Minimum
              volumes, delivery windows and payment terms in that agreement take precedence over this page.
            </p>

            <h2>Website use</h2>
            <p>
              Content, photography, product names and branding on this site belong to {brand.legal}. You may share links
              and quote short passages, but you may not reproduce the site or present our branding as your own.
            </p>

            <h2>Liability</h2>
            <p>
              We are responsible for delivering safe, correctly labelled water that meets the specification we publish.
              To the extent permitted by Nigerian law, we are not liable for indirect losses such as lost business arising
              from a delayed delivery. Nothing in these terms limits liability for death, personal injury, or fraud.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria. Disputes will first be referred to
              good-faith negotiation, then to the courts of Lagos State.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms: <a href={`mailto:${brand.email}`}>{brand.email}</a> · {brand.phone}
              <br />
              {brand.address}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
