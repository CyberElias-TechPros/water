import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "./Icons";

type Crumb = { label: string; href?: string };

export default function PageHead({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="page-head">
      <div className="page-head__glow" aria-hidden />
      <div className="page-head__grain" aria-hidden />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <ChevronRight size={12} />
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="eyebrow" style={{ marginTop: 26 }}>
          {eyebrow}
        </span>
        <h1 className="h1">{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  );
}
