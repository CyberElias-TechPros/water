import Link from "next/link";
import { ArrowRight, Droplet } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="notfound">
      <div>
        <div className="notfound__drop">
          <Droplet size={110} strokeWidth={1} />
        </div>
        <span className="eyebrow" style={{ marginBottom: 16 }}>
          404 · A drop in the wrong place
        </span>
        <h1>
          This page has
          <br />
          <span className="accent-italic">evaporated.</span>
        </h1>
        <p>
          The link you followed does not exist any more. The water, however, is exactly where it should be.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--primary">
            <span>
              Back home <ArrowRight size={16} className="arrow" />
            </span>
          </Link>
          <Link href="/products" className="btn btn--ghost-light">
            <span>Browse our water</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
