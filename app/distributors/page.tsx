import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import DistributorLocator from "@/components/DistributorLocator";
import { ArrowRight, Check, Compass, Globe, Shield } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Find a distributor — AQUARIS water near you",
  description:
    "Find your nearest AQUARIS table water distributor across Lagos, Abuja, Port Harcourt, Enugu, Kano, Ibadan and 18 cities. Search by city or use your location.",
  alternates: { canonical: "/distributors" },
};

const benefits = [
  {
    icon: <Compass size={19} />,
    title: "Twelve verified locations",
    body: "Flagship depots, regional distributors and retail partners — each with stock, phones and opening hours.",
  },
  {
    icon: <Shield size={19} />,
    title: "Same sealed product",
    body: "Every partner sells the same batch-tested water, sealed at our Ogun State plant. No third-party refilling.",
  },
  {
    icon: <Globe size={19} />,
    title: "Coverage beyond the map",
    body: "Do not see your city? Our route team can arrange drops for standing orders in nearby states.",
  },
];

export default function DistributorsPage() {
  return (
    <>
      <PageHead
        eyebrow="Our network"
        title={
          <>
            Find AQUARIS
            <br />
            <span className="accent-italic">near you.</span>
          </>
        }
        description="Search by city, filter by state, or let your browser find the closest partner. Twelve verified locations and counting."
        crumbs={[{ label: "Find a distributor" }]}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
          <Link href="#locator" className="btn btn--primary">
            <span>
              Open the locator <ArrowRight size={16} className="arrow" />
            </span>
          </Link>
          <Link href="/distribution#apply" className="btn btn--ghost-light">
            <span>Become a distributor</span>
          </Link>
        </div>
      </PageHead>

      <section className="section section--tight" id="locator">
        <div className="container">
          <DistributorLocator />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">Buy with confidence</span>
              <h2 className="h2">
                Every partner. <span className="accent-italic">Same standard.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              We audit partner storage, sell only sealed stock and publish batch summaries to anyone who asks.
            </p>
          </div>
          <div className="why-grid">
            {benefits.map((item, index) => (
              <article className="why-card" key={item.title}>
                <span className="why-card__index">0{index + 1}</span>
                <div className="why-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="partner-strip">
            <div>
              <strong>Want your shop on this list?</strong>
              <p>We onboard new retail partners every month, with starter stock and POS support.</p>
            </div>
            <Link href="/distribution#apply" className="btn btn--ghost">
              <span>
                Apply to partner <Check size={15} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
