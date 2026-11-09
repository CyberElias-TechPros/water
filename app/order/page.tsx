import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import OrderFlow from "@/components/OrderFlow";
import TrackOrder from "@/components/TrackOrder";

export const metadata: Metadata = {
  title: "Order water online",
  description:
    "Order AQUARIS table water online — choose your packs, delivery area and payment method. Same-day Lagos delivery, nationwide in 1–3 days.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <PageHead
        eyebrow="Checkout"
        title={
          <>
            Let&apos;s get water
            <br />
            <span className="accent-italic">to your door.</span>
          </>
        }
        description="Three short steps. Choose your packs, tell us where you are, and we will confirm by phone before dispatch."
        crumbs={[{ label: "Order" }]}
      />
      <section className="section section--tight">
        <div className="container">
          <OrderFlow />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <TrackOrder />
        </div>
      </section>
    </>
  );
}
