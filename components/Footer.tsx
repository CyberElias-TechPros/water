import Link from "next/link";
import { Brand } from "./Brand";
import NewsletterForm from "./NewsletterForm";
import { Clock, Facebook, Instagram, LinkedIn, Mail, MapPin, Phone, XSocial } from "./Icons";
import { brand, whatsappLink } from "@/lib/content";
import { products } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden />
      <div className="site-footer__watermark" aria-hidden>
        AQUARIS
      </div>
      <div className="container">
        <div className="site-footer__top">
          <div>
            <Brand />
            <p className="site-footer__blurb">
              Premium table water, purified in seven stages and sealed at the source in Ogun State. Bottled for homes,
              offices and every table in between.
            </p>
            <div className="site-footer__newsletter">
              <h4>Stay refreshed</h4>
              <NewsletterForm />
            </div>
          </div>

          <div>
            <h4>Our water</h4>
            <div className="site-footer__links">
              {products.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.slug}>
                  {product.shortName}
                </Link>
              ))}
              <Link href="/products">All products</Link>
              <Link href="/order">Order online</Link>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <div className="site-footer__links">
              <Link href="/about">Our story</Link>
              <Link href="/quality">Quality &amp; safety</Link>
              <Link href="/distribution">Wholesale</Link>
              <Link href="/distributors">Find a distributor</Link>
              <Link href="/news">News &amp; updates</Link>
              <Link href="/contact">Contact us</Link>
              <Link href="/admin">Admin area</Link>
            </div>
          </div>

          <div>
            <h4>Talk to us</h4>
            <ul className="site-footer__contact">
              <li>
                <MapPin size={16} />
                <span>{brand.address}</span>
              </li>
              <li>
                <Phone size={16} />
                <span>
                  <a href={brand.phoneHref}>{brand.phone}</a>
                  <br />
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    WhatsApp us →
                  </a>
                </span>
              </li>
              <li>
                <Mail size={16} />
                <span>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </span>
              </li>
              <li>
                <Clock size={16} />
                <span>{brand.hours}</span>
              </li>
            </ul>
            <div className="socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="AQUARIS on Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="AQUARIS on X">
                <XSocial size={15} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="AQUARIS on Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="AQUARIS on LinkedIn">
                <LinkedIn size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {brand.legal}. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms &amp; conditions</Link>
            <Link href="/contact">Support</Link>
          </nav>
          <p>Checkout demonstration — no live payment is processed.</p>
        </div>
      </div>
    </footer>
  );
}
