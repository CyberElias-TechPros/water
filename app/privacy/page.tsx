import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How AQUARIS collects, uses and protects the personal information you share when ordering or contacting us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHead
        eyebrow="Legal"
        title={
          <>
            Privacy, in <span className="accent-italic">plain language.</span>
          </>
        }
        description="What we collect, why we need it, how long we keep it and how to ask us to delete it."
        crumbs={[{ label: "Privacy policy" }]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="prose__meta">
            <span>Last updated: 1 November 2026</span>
            <span>Applies to aquaris.ng and our ordering channels</span>
          </div>
          <article className="prose">
            <p>
              {brand.legal} (&ldquo;AQUARIS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides table water and delivery
              services in Nigeria. This policy explains how we handle personal information when you visit our website,
              place an order, or contact our team. This site is a demonstration build and does not process live payments.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>Contact details you give us: name, phone number, email and delivery address.</li>
              <li>Order details: products, quantities, delivery area, preferred date and delivery notes.</li>
              <li>Communications: messages sent through our forms, WhatsApp, email or phone.</li>
              <li>Technical data: basic browser and device information, and pages visited on this site.</li>
            </ul>

            <h2>How we use it</h2>
            <p>
              To fulfil orders, arrange delivery, confirm details by phone, issue invoices, answer enquiries and improve
              the service. We also use aggregate, non-identifying information to understand which products and pages are
              useful.
            </p>

            <h2>What we never do</h2>
            <ul>
              <li>We do not sell or rent your personal information.</li>
              <li>We do not store card details on this website. Payments are handled by a licensed provider.</li>
              <li>We do not send marketing messages to people who have not asked for them.</li>
            </ul>

            <h2>How long we keep it</h2>
            <p>
              Order records are retained for as long as required for tax, accounting and warranty purposes. Enquiries are
              kept for up to 24 months. You can ask us to delete anything we are not legally required to keep.
            </p>

            <h2>Who we share it with</h2>
            <p>
              Only the people who need it to complete your order: our dispatch team, the assigned route driver, and — for
              paid orders — the payment provider. Where a delivery is fulfilled by a distribution partner, we share the
              name, address and phone number required to complete that delivery.
            </p>

            <h2>Cookies and local storage</h2>
            <p>
              This demonstration site stores your cart, order history and content preferences in your browser&rsquo;s local
              storage so the experience survives a page refresh. Nothing is transmitted to our servers. Clearing your
              browser storage removes it.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask to see, correct or delete the personal information we hold about you, or object to a particular
              use. Contact us at{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a> or call {brand.phone}. We aim to respond within seven
              working days.
            </p>

            <h2>Children</h2>
            <p>Our services are intended for adults. We do not knowingly collect information from children under 18.</p>

            <h2>Changes</h2>
            <p>
              If we make a material change to this policy we will update the date above and, where appropriate, tell
              customers directly.
            </p>

            <h2>Contact</h2>
            <p>
              {brand.legal}
              <br />
              {brand.address}
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a> · {brand.phone}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
