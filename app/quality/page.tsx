import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import PurificationStepper from "@/components/PurificationStepper";
import Accordion from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/lib/content";
import { ArrowRight, Check, Droplet, Info, Shield, Sparkles } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Quality & safety — how AQUARIS water is purified and tested",
  description:
    "Seven-stage purification, in-house laboratory testing, batch traceability and hygiene protocols. See the numbers we hold ourselves to at the AQUARIS plant.",
  alternates: { canonical: "/quality" },
};

const pillars = [
  {
    icon: <Droplet size={20} />,
    title: "Source protection",
    body: "A sealed 148m borehole with a protected wellhead. Water is sampled at extraction before it reaches the plant.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Seven-stage treatment",
    body: "Sand, carbon, mineral balance, 5µm and 1µm filtration, UV and an ozone finish — in that order, every shift.",
  },
  {
    icon: <Shield size={20} />,
    title: "Batch traceability",
    body: "Every bottle carries a batch code tied to a fill time, line and test record. Ask us and we will find it.",
  },
];

const labRows = [
  { test: "Colour & appearance", spec: "Clear, colourless", result: "Complies" },
  { test: "Odour & taste", spec: "Neutral", result: "Complies" },
  { test: "pH at 25°C", spec: "7.0 – 8.0", result: "7.4" },
  { test: "Turbidity", spec: "< 1.0 NTU", result: "< 0.3 NTU" },
  { test: "Total dissolved solids", spec: "20 – 120 mg/L", result: "68 mg/L" },
  { test: "Conductivity", spec: "< 250 µS/cm", result: "112 µS/cm" },
  { test: "Total coliform (per 100ml)", spec: "0", result: "0" },
  { test: "E. coli (per 100ml)", spec: "0", result: "0" },
  { test: "Nitrate (as NO₃)", spec: "< 10 mg/L", result: "1.4 mg/L" },
  { test: "Lead", spec: "< 0.01 mg/L", result: "Not detected" },
];

const hygiene = [
  "Full plant wash-down and sanitisation at the end of every shift.",
  "Filter cartridges replaced on pressure-drop triggers, not just a calendar.",
  "Bottles rinsed and air-knifed before filling; caps UV-treated before application.",
  "Staff health checks, dedicated uniforms and hand-sanitising at every entry point.",
  "Pest control and water-point swabbing on a documented monthly schedule.",
];

export default function QualityPage() {
  return (
    <>
      <PageHead
        eyebrow="Quality & safety"
        title={
          <>
            Water should be
            <br />
            <span className="accent-italic">boringly reliable.</span>
          </>
        }
        description="No clever claims. Just a documented process, a laboratory on site, and batch records we can hand you if you ask."
        crumbs={[{ label: "Quality & safety" }]}
      >
        <div className="pill-row" style={{ marginTop: 26 }}>
          {["7 purification stages", "3 sample points per batch", "In-house laboratory"].map((item) => (
            <span
              className="chip"
              key={item}
              style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.18)" }}
            >
              <Check size={13} /> {item}
            </span>
          ))}
        </div>
      </PageHead>

      <section className="section section--tight">
        <div className="container">
          <div className="why-grid">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <article className="why-card">
                  <span className="why-card__index">0{index + 1}</span>
                  <div className="why-card__icon">{pillar.icon}</div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <Reveal>
                <span className="eyebrow">Inside the plant</span>
                <h2 className="h2">
                  Follow the water, <span className="accent-italic">stage by stage.</span>
                </h2>
              </Reveal>
            </div>
            <p className="section-head__aside">
              Select any stage to see what happens and the measurement we monitor at that point.
            </p>
          </div>
          <PurificationStepper />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">What we test for</span>
              <h2 className="h2">
                The numbers behind <span className="accent-italic">the bottle.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              Typical results from a recent finished-product sample. Full batch records are available to trade and
              corporate customers on request.
            </p>
          </div>

          <div className="table-wrap">
            <table className="lab-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Internal specification</th>
                  <th>Typical result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {labRows.map((row) => (
                  <tr key={row.test}>
                    <td>{row.test}</td>
                    <td>{row.spec}</td>
                    <td>{row.result}</td>
                    <td>Complies</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            <Info size={14} /> Illustrative summary for this demonstration site. Production customers should request the
            current batch report from our quality team.
          </p>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">Hygiene & sanitation</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              A clean room is a <span className="accent-italic">daily habit.</span>
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Filling happens inside a filtered, positive-pressure clean room. Nobody enters without changing into plant
              uniform, and the room is sanitised on a fixed schedule that is signed off each shift.
            </p>
            <ul className="process" style={{ marginTop: 26 }}>
              {hygiene.map((item) => (
                <li key={item}>
                  <Check size={15} style={{ flexShrink: 0, marginTop: 3, color: "var(--aqua-deep)" }} />
                  <p style={{ margin: 0 }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="cert-stack">
            <div className="cert-card">
              <span className="cert-card__icon">
                <Shield size={20} />
              </span>
              <h3>Regulatory documentation</h3>
              <p>
                Our NAFDAC and Standards Organisation of Nigeria documentation is available to trade customers and
                regulators on request. We do not publish approval numbers we cannot verify.
              </p>
            </div>
            <div className="cert-card">
              <span className="cert-card__icon">
                <Sparkles size={20} />
              </span>
              <h3>Laboratory testing</h3>
              <p>
                In-house testing covers microbiological indicators, turbidity, pH, conductivity and dissolved solids,
                with periodic independent verification.
              </p>
            </div>
            <div className="cert-card">
              <span className="cert-card__icon">
                <Droplet size={20} />
              </span>
              <h3>Traceability</h3>
              <p>
                Every bottle is batch-coded. Send us the code and we can tell you the line, the shift and the test
                record behind it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">Quality questions</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 50px)" }}>
                Ask us <span className="accent-italic">anything.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              Our quality lead answers directly. No scripted responses.
            </p>
          </div>
          <div className="narrow">
            <Accordion
              items={[
                ...faqs.map((faq, index) => ({ id: `quality-faq-${index}`, title: faq.q, content: <p>{faq.a}</p> })),
                {
                  id: "quality-reports",
                  title: "Can I get the batch report for my delivery?",
                  content: (
                    <p>
                      Yes. Every delivery note includes the batch code. Send it to our quality team and we will reply with
                      the corresponding test record, usually the same working day.
                    </p>
                  ),
                },
                {
                  id: "quality-independent",
                  title: "Do you use an independent laboratory?",
                  content: (
                    <p>
                      In-house testing runs on every batch; independent laboratory verification is carried out
                      periodically as an additional check. Ask us for the most recent summary.
                    </p>
                  ),
                },
              ]}
            />
            <div style={{ marginTop: 28 }}>
              <Link href="/contact" className="btn btn--primary">
                <span>
                  Contact the quality team <ArrowRight size={16} className="arrow" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
