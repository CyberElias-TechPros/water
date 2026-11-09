import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products, relatedProducts } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import { ChevronRight } from "@/components/Icons";
import { money } from "@/lib/format";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${product.pack}`,
    description: `${product.description.slice(0, 150)}… Buy ${product.name} from ${money(product.price)} with same-day Lagos delivery.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · AQUARIS`,
      description: product.tagline,
      images: [{ url: product.image, width: 1408, height: 768, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`https://aquaris.ng${product.image}`],
    description: product.description,
    brand: { "@type": "Brand", name: "AQUARIS" },
    category: "Bottled water",
    sku: `AQ-${product.slug.toUpperCase()}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `https://aquaris.ng/products/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <>
      <section className="section" style={{ paddingTop: "calc(var(--header-h) + clamp(52px, 6vw, 78px))" }}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ color: "var(--ink-mute)", marginBottom: 22 }}>
            <Link href="/">Home</Link>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <ChevronRight size={12} />
              <Link href="/products">Products</Link>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <ChevronRight size={12} />
              <span aria-current="page" style={{ color: "var(--ink-soft)" }}>
                {product.shortName}
              </span>
            </span>
          </nav>

          <ProductDetail product={product} related={related} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
