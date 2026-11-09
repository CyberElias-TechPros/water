import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import NewsExplorer from "@/components/NewsExplorer";
import NewsletterForm from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "News & updates — from the AQUARIS plant floor",
  description:
    "Operations updates, quality summaries, sustainability trials and service news from AQUARIS table water in Nigeria.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHead
        eyebrow="News & updates"
        title={
          <>
            What is changing
            <br />
            <span className="accent-italic">at the plant.</span>
          </>
        }
        description="Operational changes, quality summaries and the occasional honest note about what we are still working on."
        crumbs={[{ label: "News" }]}
      />

      <section className="section section--tight">
        <div className="container">
          <NewsExplorer />
        </div>
      </section>

      <section className="section section--deep section--tight">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Stay in the loop</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Occasional updates.
              <br />
              <span className="accent-italic">No noise.</span>
            </h2>
            <p className="muted" style={{ marginTop: 18, maxWidth: "46ch" }}>
              Delivery changes, new sizes, batch summaries and the occasional plant story. We send a few emails a year,
              not a few a week.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="newsletter-panel">
              <h3>Subscribe to plant notes</h3>
              <NewsletterForm />
              <p className="small" style={{ marginTop: 16, color: "rgba(233,252,252,.45)" }}>
                Prefer WhatsApp? Message us and ask to be added to the customer broadcast list.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
