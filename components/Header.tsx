"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { ArrowRight, Cart, ChevronDown, Close, Menu, Phone, Search, WhatsApp } from "./Icons";
import { useStore } from "@/lib/store";
import { brand, whatsappLink } from "@/lib/content";
import { products } from "@/lib/products";

const navItems = [
  { href: "/products", label: "Our Products", dropdown: true },
  { href: "/quality", label: "Quality" },
  { href: "/distribution", label: "Distribution", dropdown: true },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setCartOpen, setSearchOpen, settings, bump } = useStore();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announceIndex, setAnnounceIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [progress, setProgress] = useState(0);
  const lightTop = pathname === "/admin" || (pathname.startsWith("/products/") && pathname !== "/products");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      setCollapsed(y > 90);
      setHidden(y > 460 && y > lastY.current + 4);
      lastY.current = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const messages = settings.announcements;
    if (messages.length < 2) return;
    const timer = window.setInterval(() => {
      setAnnounceIndex((index) => (index + 1) % messages.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [settings.announcements]);

  const announceMessages = settings.announcements;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="site-header" data-solid={solid || lightTop} data-hidden={hidden && !menuOpen}>
        <span className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden />
        <div className="announce" data-collapsed={collapsed}>
          <div className="announce__inner">
            <p className="announce__text" key={announceIndex}>
              <span className="status-dot" aria-hidden />
              <span>{announceMessages[announceIndex % announceMessages.length]}</span>
            </p>
            <div className="announce__dots" aria-hidden>
              {announceMessages.map((message, index) => (
                <span
                  className="announce__dot"
                  data-active={index === announceIndex % announceMessages.length}
                  key={message}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="site-header__inner">
            <Brand />

            <nav className="nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <div className="nav__item" key={item.href}>
                  <Link className="nav__link" href={item.href} data-active={isActive(item.href)}>
                    {item.label}
                    {item.dropdown && <ChevronDown size={13} />}
                  </Link>
                  {item.href === "/products" && (
                    <div className="nav__dropdown">
                      {products.map((product) => (
                        <Link href={`/products/${product.slug}`} key={product.slug}>
                          <span>
                            {product.shortName}
                            <small>{product.tagline}</small>
                          </span>
                          <ArrowRight size={15} />
                        </Link>
                      ))}
                      <Link href="/products">
                        <span>
                          Shop all water
                          <small>Compare sizes and packs</small>
                        </span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                  {item.href === "/distribution" && (
                    <div className="nav__dropdown">
                      <Link href="/distribution">
                        <span>
                          Wholesale &amp; bulk
                          <small>Offices, hotels and events</small>
                        </span>
                        <ArrowRight size={15} />
                      </Link>
                      <Link href="/distributors">
                        <span>
                          Find a distributor
                          <small>12 locations nationwide</small>
                        </span>
                        <ArrowRight size={15} />
                      </Link>
                      <Link href="/distribution#apply">
                        <span>
                          Become a distributor
                          <small>Protected territories</small>
                        </span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="site-header__actions-wrap">
              <div className="nav__actions">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Search products (Command K)"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={19} />
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
                  onClick={() => setCartOpen(true)}
                >
                  <Cart size={20} />
                  {cartCount > 0 && (
                    <span className="icon-btn__count" data-bump={true} key={bump}>
                      {cartCount}
                    </span>
                  )}
                </button>
                <Link href="/order" className="btn btn--primary btn--sm header-order">
                  <span>
                    Order now
                    <ArrowRight size={15} className="arrow" />
                  </span>
                </Link>
                <button
                  type="button"
                  className="icon-btn burger"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                >
                  <Menu size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-menu" data-open={menuOpen} aria-hidden={!menuOpen}>
        <div className="mobile-menu__head">
          <Brand />
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <Close size={24} />
          </button>
        </div>

        <nav className="mobile-menu__links" aria-label="Mobile navigation">
          <Link href="/" data-active={pathname === "/"}>
            Home <small>01</small>
          </Link>
          {navItems.map((item, index) => (
            <Link href={item.href} key={item.href} data-active={isActive(item.href)}>
              {item.label}
              <small>0{index + 2}</small>
            </Link>
          ))}
          <Link href="/distributors" data-active={isActive("/distributors")}>
            Find a distributor <small>08</small>
          </Link>
          <Link href="/order" data-active={isActive("/order")}>
            Order water <small>09</small>
          </Link>
        </nav>

        <div className="mobile-menu__foot">
          <Link href="/order" className="btn btn--primary btn--block">
            <span>
              Start an order <ArrowRight size={16} className="arrow" />
            </span>
          </Link>
          <a href={brand.phoneHref} className="mobile-menu__contact">
            <Phone size={16} /> {brand.phone}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <WhatsApp size={16} /> Chat on WhatsApp
          </a>
          <span className="small" style={{ color: "rgba(255,255,255,.35)" }}>
            {brand.address}
          </span>
        </div>
      </div>
    </>
  );
}
