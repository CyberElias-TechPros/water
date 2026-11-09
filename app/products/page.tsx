import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ShopGrid from "@/components/ShopGrid";
import { Droplet, Shield, Truck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Our Products — bottled table water in 50cl, 75cl, 1.5L and 19L",
  description:
    "Shop AQUARIS premium table water: 50cl and 75cl on-the-go packs, 1.5L family bottles and returnable 19L dispenser refills. Free delivery over ₦15,000.",
  alternates: { canonical: "/products" },
};

const assurance = [
  {
    icon: <Droplet size={19} />,
    title: "Seven-stage purified",
    body: "Every bottle passes sand, carbon, softening, 5µm and 1µm filtration, UV and an ozone finish.",
  },
  {
    icon: <Truck size={19} />,
    title: "Same-day in Lagos",
    body: "Order before 1pm and your water is at the door today. Nationwide in 1–3 days.",
  },
  {
    icon: <Shield size={19} />,
    title: "Sealed at the source",
    body: "Capped, coded and shrink-wrapped at the plant — never re-sealed in transit.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHead
        eyebrow="The full range"
        title={
          <>
            Water for every table,
            <br />
            <span className="accent-italic">every day.</span>
          </>
        }
        description="Four sizes, one standard. Choose the pack that fits your day — then set it on repeat if you never want to think about water again."
        crumbs={[{ label: "Our products" }]}
      >
        <div className="pill-row" style={{ marginTop: 26 }}>
          <span className="chip" style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.18)" }}>
            Free delivery over ₦15,000
          </span>
          <span className="chip" style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.18)" }}>
            Save 5% on weekly refills
          </span>
          <span className="chip" style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.18)" }}>
            Wholesale from 40 packs
          </span>
        </div>
      </PageHead>

      <section className="section section--tight">
        <div className="container">
          <ShopGrid />

          <div className="assurance-row">
            {assurance.map((item) => (
              <div className="assurance" key={item.title}>
                <span className="assurance__icon">{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
