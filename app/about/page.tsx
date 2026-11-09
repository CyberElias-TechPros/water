import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { CountUp, Reveal } from "@/components/Reveal";
import { ArrowRight, Check, Droplet, Leaf, Shield } from "@/components/Icons";
import { brand, stats, timeline, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our story — a Nigerian water company built on consistency",
  description:
    "AQUARIS began in 2012 with one borehole and forty cases a week. Today we purify and deliver table water across 18 Nigerian cities — with the same standard.",
  alternates: { canonical: "/about" },
};

const team = [
  { name: "Olamide Nwankwo", role: "Founder & Managing Director", initials: "ON" },
  { name: "Grace Okoye", role: "Head of Quality", initials: "GO" },
  { name: "Ibrahim Sule", role: "Operations & Logistics", initials: "IS" },
  { name: "Chidera Umeh", role: "Trade & Distribution", initials: "CU" },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="Our story"
        title={
          <>
            Built one bottle at a
            <br />
            <span className="accent-italic">time.</span>
          </>
        }
        description="We are a Nigerian water company that grew slowly, on purpose. Same source, same seven stages, same team — from forty cases a week to eighteen cities."
        crumbs={[{ label: "About us" }]}
      />

      <section className="section">
        <div className="container story">
          <Reveal variant="left" className="story__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/quality-lab.webp" alt="An AQUARIS quality technician inspecting a water sample" loading="lazy" />
          </Reveal>
          <Reveal variant="right" className="story__copy">
            <span className="eyebrow">Since {brand.founded}</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              The boring parts are the <span className="accent-italic">important parts.</span>
            </h2>
            <p className="lead" style={{ marginTop: 22 }}>
              Water is a simple product with a very short list of things that can go wrong. Our entire business is built
              around making sure none of them do: source protection, filtration discipline, sealed packaging, honest
              labelling and delivery that arrives when we said it would.
            </p>
            <p className="lead">
              We started in 2012 when our founder, tired of inconsistent supply at his family&apos;s restaurant, bought a
              single purification line in Ogun State. Fourteen years later the plant has two lines, an in-house laboratory
              and a route team that delivers to more than 480 businesses — but the standard has not moved.
            </p>
            <div className="intro__points" style={{ marginTop: 26 }}>
              <div className="intro__point">
                <Check size={16} />
                <span>We publish what we test for — not just what sounds good.</span>
              </div>
              <div className="intro__point">
                <Check size={16} />
                <span>Every driver is trained on handling, hygiene and customer service before their first route.</span>
              </div>
              <div className="intro__point">
                <Check size={16} />
                <span>Our 19L bottles are returned, sanitised and reused instead of discarded.</span>
              </div>
            </div>
            <div className="split__actions">
              <Link href="/quality" className="btn btn--primary">
                <span>
                  How we test <ArrowRight size={16} className="arrow" />
                </span>
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                <span>Talk to us</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div className="stats-band__grid">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 70}>
                <div className="stat">
                  <div className="stat__value">
                    <CountUp value={stat.value} decimals={stat.decimals} />
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="stat__label">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">The timeline</span>
              <h2 className="h2">
                Fourteen years,
                <br />
                <span className="accent-italic">six decisions.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              Growth was never the goal. Reliability was — and growth followed it.
            </p>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 60}>
                <div className="timeline__item">
                  <span className="timeline__year">{item.year}</span>
                  <div className="timeline__body">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">What we stand for</span>
              <h2 className="h2">
                Three words we <span className="accent-italic">actually hire for.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              These are printed in the plant, on the trucks and in every onboarding pack.
            </p>
          </div>

          <div className="value-grid">
            {values.map((value, index) => (
              <article className="value-card" key={value.title}>
                <span className="value-card__num">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
                <div className="value-card__icons" aria-hidden>
                  {index === 0 ? <Droplet size={17} /> : index === 1 ? <Shield size={17} /> : <Leaf size={17} />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="eyebrow">The people</span>
              <h2 className="h2">
                Small team. <span className="accent-italic">Long memory.</span>
              </h2>
            </div>
            <p className="section-head__aside">
              You will meet the same faces on our routes — most of our drivers have been with us for over four years.
            </p>
          </div>
          <div className="team-grid">
            {team.map((person) => (
              <div className="team-card" key={person.name}>
                <span className="team-card__avatar">{person.initials}</span>
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </div>
            ))}
          </div>

          <div className="partner-strip">
            <div>
              <strong>We are hiring route drivers and lab technicians.</strong>
              <p>If you care about the details, we would like to meet you.</p>
            </div>
            <a href={`mailto:${brand.email}`} className="btn btn--ghost">
              <span>Send your CV</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
