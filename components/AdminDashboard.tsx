"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useStore, type Enquiry, type Order } from "@/lib/store";
import { money, formatDateTime } from "@/lib/format";
import { defaultSettings } from "@/lib/store";
import { products } from "@/lib/products";
import {
  ArrowRight,
  BarChartPlaceholder,
  Check,
  Close,
  Info,
  Lock,
  Mail,
  Package,
  Phone,
  RefreshCw,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "./Icons";

const PIN = "2026";
type Tab = "overview" | "orders" | "products" | "enquiries" | "content";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <BarChartPlaceholder size={16} /> },
  { id: "orders", label: "Orders", icon: <ShoppingBag size={16} /> },
  { id: "products", label: "Products", icon: <Package size={16} /> },
  { id: "enquiries", label: "Enquiries", icon: <Users size={16} /> },
  { id: "content", label: "Website content", icon: <Settings size={16} /> },
];

const sampleOrders = (): Order[] => {
  const base = [
    { name: "Adaeze Nwosu", phone: "08012345678", zone: "lagos-island", zoneLabel: "Lagos Island & Lekki", items: [0, 1], status: "Delivered" as const, daysAgo: 1 },
    { name: "Tunde Balogun", phone: "08023456789", zone: "lagos-mainland", zoneLabel: "Lagos Mainland & Ikeja", items: [3], status: "Out for delivery" as const, daysAgo: 0 },
    { name: "Ifeoma Eze", phone: "08034567890", zone: "southsouth", zoneLabel: "Rivers, Delta & Edo", items: [2, 0], status: "Confirmed" as const, daysAgo: 0 },
    { name: "Musa Ibrahim", phone: "08045678901", zone: "other", zoneLabel: "Other states", items: [1], status: "Pending" as const, daysAgo: 0 },
    { name: "Grace Okoye", phone: "08056789012", zone: "abuja", zoneLabel: "Abuja (FCT)", items: [3, 2], status: "Delivered" as const, daysAgo: 3 },
  ];

  return base.map((entry, index) => {
    const items = entry.items.map((productIndex, lineIndex) => {
      const product = products[productIndex];
      return {
        key: `${product.slug}-demo-${index}-${lineIndex}`,
        slug: product.slug,
        variantId: product.variants[0].id,
        name: product.name,
        pack: product.variants[0].label,
        price: product.variants[0].price,
        image: product.image,
        qty: 2 + lineIndex * 2,
      };
    });
    const subtotal = items.reduce((sum, line) => sum + line.price * line.qty, 0);
    const delivery = subtotal >= 15000 ? 0 : 1800;
    const createdAt = new Date(Date.now() - entry.daysAgo * 86400000 - index * 3600000).toISOString();
    return {
      ref: `AQ-2026-${4100 + index}`,
      createdAt,
      customer: {
        name: entry.name,
        phone: entry.phone,
        email: `${entry.name.split(" ")[0].toLowerCase()}@example.com`,
        address: "14 Admiralty Way, Lekki Phase 1, Lagos",
        zone: entry.zone,
        zoneLabel: entry.zoneLabel,
        notes: "",
        date: "",
      },
      items,
      subtotal,
      discount: 0,
      delivery,
      total: subtotal + delivery,
      payment: index % 3 === 0 ? "Bank transfer" : "Card payment",
      status: entry.status,
    };
  });
};

const sampleEnquiries: Enquiry[] = [
  {
    id: "ENQ-2041",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    type: "Wholesale / trade pricing",
    name: "Bisi Adeleke",
    email: "bisi@lagoonhotels.ng",
    phone: "08033445566",
    company: "Lagoon Suites",
    message: "We need weekly 75cl deliveries for 120 rooms. Can you quote for a standing order and monthly invoicing?",
  },
  {
    id: "ENQ-2042",
    createdAt: new Date(Date.now() - 3600000 * 27).toISOString(),
    type: "Distributor application",
    name: "Sani Bello",
    email: "sani@bellotrading.ng",
    phone: "08077889900",
    company: "Bello Trading",
    message: "I run distribution in Kano and want to discuss a protected territory for the 19L range.",
  },
];

export default function AdminDashboard() {
  const { orders, enquiries, updateOrderStatus, addOrders, addEnquiry, settings, updateSettings, newsletter, toast } = useStore();
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [prices, setPrices] = useState<Record<string, { price: number; stock: number }>>({});
  const [draft, setDraft] = useState(defaultSettings);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("aquaris.catalog.v1");
      if (saved) setPrices(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pending = orders.filter((order) => order.status === "Pending").length;
  const delivered = orders.filter((order) => order.status === "Delivered").length;

  const chart = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return {
        label: date.toLocaleDateString("en-NG", { weekday: "short" }),
        key: date.toISOString().slice(0, 10),
        value: 0,
      };
    });
    orders.forEach((order) => {
      const key = order.createdAt.slice(0, 10);
      const day = days.find((item) => item.key === key);
      if (day) day.value += order.total;
    });
    const max = Math.max(1, ...days.map((day) => day.value));
    return days.map((day) => ({ ...day, height: Math.round((day.value / max) * 100) }));
  }, [orders]);

  const popular = useMemo(() => {
    const totals: Record<string, number> = {};
    orders.forEach((order) =>
      order.items.forEach((line) => {
        totals[line.slug] = (totals[line.slug] ?? 0) + line.qty;
      }),
    );
    return products
      .map((product) => ({ product, qty: totals[product.slug] ?? 0 }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 4);
  }, [orders]);

  const saveCatalog = (slug: string, patch: Partial<{ price: number; stock: number }>) => {
    const current = { price: products.find((p) => p.slug === slug)?.price ?? 0, stock: products.find((p) => p.slug === slug)?.stock ?? 0 };
    const next = { ...prices, [slug]: { ...current, ...prices[slug], ...patch } };
    setPrices(next);
    window.localStorage.setItem("aquaris.catalog.v1", JSON.stringify(next));
  };

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    if (pin.trim() === PIN) {
      setAuthed(true);
      setPinError("");
      toast("Signed in", "success", "Demo administrator workspace.");
    } else {
      setPinError("That PIN is not correct. Demo PIN: 2026");
    }
  };

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login__icon">
          <Lock size={26} />
        </div>
        <h1>Administrator access</h1>
        <p>Protected area for the AQUARIS team. Orders, products, enquiries and website content.</p>
        <form onSubmit={login}>
          <div className="field" data-error={Boolean(pinError)}>
            <label htmlFor="pin">Access PIN</label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(event) => {
                setPin(event.target.value);
                setPinError("");
              }}
              placeholder="••••"
              inputMode="numeric"
              autoComplete="current-password"
              aria-invalid={Boolean(pinError)}
            />
            {pinError && <span className="field__error">{pinError}</span>}
          </div>
          <button type="submit" className="btn btn--primary btn--block">
            <span>
              Enter dashboard <ArrowRight size={16} className="arrow" />
            </span>
          </button>
        </form>
        <p className="admin-hint">
          Demonstration workspace. Use PIN <code>2026</code>. Everything is stored locally in this browser — no real
          accounts, orders or payments are processed.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-side__title">AQUARIS · Admin</div>
        {tabs.map((item) => (
          <button
            type="button"
            className="admin-nav-btn"
            key={item.id}
            data-active={tab === item.id}
            onClick={() => setTab(item.id)}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <div className="admin-side__foot">
          Demo workspace. Data lives in this browser only.
          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              className="admin-nav-btn"
              style={{ padding: 0, fontSize: 11 }}
              onClick={() => {
                setAuthed(false);
                setPin("");
              }}
            >
              <Lock size={13} /> Lock dashboard
            </button>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-head">
          <div>
            <h1>
              {tab === "overview" && "Good to see you."}
              {tab === "orders" && "Orders"}
              {tab === "products" && "Product catalogue"}
              {tab === "enquiries" && "Customer enquiries"}
              {tab === "content" && "Website content"}
            </h1>
            <p>
              {tab === "overview" && "A live snapshot of orders, revenue and messages from this browser."}
              {tab === "orders" && `${orders.length} orders · ${pending} awaiting confirmation`}
              {tab === "products" && "Manage pricing and stock for the range."}
              {tab === "enquiries" && `${enquiries.length} messages from forms on the site.`}
              {tab === "content" && "These edits go live on the homepage immediately."}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                if (orders.length > 0) {
                  toast("Sample data not added", "default", "Clear existing orders first, or view the real ones.");
                  return;
                }
                addOrders(sampleOrders());
                sampleEnquiries.forEach((enquiry) => addEnquiry(enquiry));
                toast("Sample data loaded", "success", "5 orders and 2 enquiries added for this demo.");
              }}
            >
              <span>
                <Sparkles size={14} /> Load demo data
              </span>
            </button>
            <Link href="/" className="btn btn--ghost btn--sm">
              <span>View site</span>
            </Link>
          </div>
        </div>

        {tab === "overview" && (
          <>
            <div className="admin-stat-grid">
              <div className="admin-stat">
                <span>Revenue</span>
                <strong>{money(revenue)}</strong>
                <small>
                  <ArrowRight size={11} /> from {orders.length} orders
                </small>
              </div>
              <div className="admin-stat">
                <span>Orders</span>
                <strong>{orders.length}</strong>
                <small>{pending} pending confirmation</small>
              </div>
              <div className="admin-stat">
                <span>Delivered</span>
                <strong>{delivered}</strong>
                <small>{orders.length ? `${Math.round((delivered / orders.length) * 100)}% completion` : "no orders yet"}</small>
              </div>
              <div className="admin-stat">
                <span>Enquiries</span>
                <strong>{enquiries.length}</strong>
                <small>Wholesale &amp; support combined</small>
              </div>
            </div>

            <div className="admin-panels">
              <div className="admin-card">
                <h2>Revenue · last 7 days</h2>
                <div className="bar-chart">
                  {chart.map((day) => (
                    <div className="bar-chart__col" key={day.key} title={`${day.label}: ${money(day.value)}`}>
                      <div className="bar-chart__bar" style={{ height: `${Math.max(3, day.height)}%` }} />
                      <span>{day.label}</span>
                    </div>
                  ))}
                </div>
                <p className="admin-note">
                  Load demo data or place an order to see this chart fill up. Figures come from orders stored in this
                  browser.
                </p>
              </div>

              <div className="admin-card">
                <h2>Most ordered</h2>
                {popular.map((entry) => (
                  <div className="admin-row" key={entry.product.slug}>
                    <span className="admin-row__name">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={entry.product.image} alt="" />
                      {entry.product.shortName}
                    </span>
                    <span className="admin-row__value">{entry.qty} packs</span>
                  </div>
                ))}
                <p className="admin-note">Ranked by packs sold in local order history.</p>
              </div>
            </div>

            <div className="admin-card" style={{ marginTop: 14 }}>
              <h2>Recent orders</h2>
              {orders.length === 0 ? (
                <div className="admin-empty">
                  No orders in this browser yet.
                  <br />
                  Place one through the checkout, or use “Load demo data”.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Reference</th>
                        <th>Customer</th>
                        <th>Area</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.ref}>
                          <td>
                            <b>{order.ref}</b>
                            <br />
                            <small>{formatDateTime(order.createdAt)}</small>
                          </td>
                          <td>{order.customer.name}</td>
                          <td>
                            <small>{order.customer.zoneLabel}</small>
                          </td>
                          <td>{money(order.total)}</td>
                          <td>
                            <span className="status-pill" data-status={order.status}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {tab === "orders" && (
          <div className="admin-card">
            <h2>All orders</h2>
            {orders.length === 0 ? (
              <div className="admin-empty">No orders yet. Place one through the checkout or load demo data.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.ref}>
                        <td>
                          <b>{order.ref}</b>
                          <br />
                          <small>{formatDateTime(order.createdAt)}</small>
                        </td>
                        <td>
                          {order.customer.name}
                          <br />
                          <small>{order.customer.phone}</small>
                        </td>
                        <td>
                          <small>
                            {order.items.map((line) => `${line.qty}× ${line.name.replace("AQUARIS ", "")}`).join(", ")}
                          </small>
                        </td>
                        <td>{money(order.total)}</td>
                        <td>
                          <small>{order.payment}</small>
                        </td>
                        <td>
                          <select
                            className="status-select"
                            value={order.status}
                            onChange={(event) => {
                              updateOrderStatus(order.ref, event.target.value as Order["status"]);
                              toast("Order updated", "success", `${order.ref} → ${event.target.value}`);
                            }}
                            aria-label={`Update status for ${order.ref}`}
                          >
                            <option>Pending</option>
                            <option>Confirmed</option>
                            <option>Out for delivery</option>
                            <option>Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "products" && (
          <div className="admin-card">
            <h2>Range &amp; stock</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Pack</th>
                    <th>Price (₦)</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const current = prices[product.slug];
                    const price = current?.price ?? product.price;
                    const stock = current?.stock ?? product.stock;
                    return (
                      <tr key={product.slug}>
                        <td>
                          <span className="admin-row__name">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt="" />
                            {product.shortName}
                          </span>
                        </td>
                        <td>
                          <small>{product.pack}</small>
                        </td>
                        <td>
                          <input
                            className="admin-edit-input"
                            type="number"
                            value={price}
                            min={0}
                            onChange={(event) => saveCatalog(product.slug, { price: Number(event.target.value) })}
                            aria-label={`Price for ${product.shortName}`}
                          />
                        </td>
                        <td>
                          <input
                            className="admin-edit-input"
                            type="number"
                            value={stock}
                            min={0}
                            onChange={(event) => saveCatalog(product.slug, { stock: Number(event.target.value) })}
                            aria-label={`Stock for ${product.shortName}`}
                          />
                        </td>
                        <td>
                          <span className="status-pill" data-status={stock > 0 ? "Delivered" : "Pending"}>
                            {stock > 0 ? "In stock" : "Out of stock"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="admin-note">
              <Info size={12} style={{ verticalAlign: "-2px" }} /> Demo catalogue: edits persist in this browser. In
              production these fields write to the products table via a protected API.
            </p>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              style={{ marginTop: 12 }}
              onClick={() => {
                setPrices({});
                window.localStorage.removeItem("aquaris.catalog.v1");
                toast("Catalogue reset", "default", "Original prices and stock restored.");
              }}
            >
              <span>
                <RefreshCw size={14} /> Reset changes
              </span>
            </button>
          </div>
        )}

        {tab === "enquiries" && (
          <div className="admin-panels" style={{ gridTemplateColumns: "1fr" }}>
            <div className="admin-card">
              <h2>Inbox</h2>
              {enquiries.length === 0 ? (
                <div className="admin-empty">
                  No enquiries yet. Submit the contact form, or load demo data from the overview tab.
                </div>
              ) : (
                <div className="enquiry-list">
                  {enquiries.map((enquiry) => (
                    <article className="enquiry" key={enquiry.id}>
                      <div className="enquiry__top">
                        <div>
                          <strong>{enquiry.name}</strong>
                          {enquiry.company && <span className="small muted"> · {enquiry.company}</span>}
                          {enquiry.city && <span className="small muted"> · {enquiry.city}</span>}
                          <div className="small muted">{formatDateTime(enquiry.createdAt)}</div>
                        </div>
                        <span className="status-pill">{enquiry.type}</span>
                      </div>
                      <p>{enquiry.message}</p>
                      <div className="enquiry__actions">
                        <a className="mini-btn" href={`mailto:${enquiry.email}`}>
                          <Mail size={12} /> Email
                        </a>
                        <a className="mini-btn" href={`tel:${enquiry.phone}`}>
                          <Phone size={12} /> Call
                        </a>
                        <a
                          className="mini-btn mini-btn--wa"
                          href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, "").replace(/^0/, "234")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp
                        </a>
                        <span className="small muted" style={{ marginLeft: "auto" }}>
                          {enquiry.id}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "content" && (
          <div className="admin-panels" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
            <div className="admin-card">
              <h2>Homepage content</h2>
              <div className="field">
                <label htmlFor="hero-headline">Hero headline</label>
                <input
                  id="hero-headline"
                  value={draft.heroHeadline}
                  onChange={(event) => setDraft({ ...draft, heroHeadline: event.target.value })}
                />
                <span className="field__hint">Use the pipe character ( | ) to split lines. Line 2 renders in italic.</span>
              </div>
              <div className="field" style={{ marginTop: 14 }}>
                <label htmlFor="hero-sub">Hero supporting text</label>
                <textarea
                  id="hero-sub"
                  value={draft.heroSub}
                  onChange={(event) => setDraft({ ...draft, heroSub: event.target.value })}
                  rows={4}
                />
              </div>

              <h2 style={{ marginTop: 24 }}>Announcement bar</h2>
              {draft.announcements.map((message, index) => (
                <div className="field" style={{ marginTop: 10 }} key={index}>
                  <label htmlFor={`announce-${index}`}>Message {index + 1}</label>
                  <input
                    id={`announce-${index}`}
                    value={message}
                    onChange={(event) => {
                      const next = [...draft.announcements];
                      next[index] = event.target.value;
                      setDraft({ ...draft, announcements: next });
                    }}
                  />
                </div>
              ))}

              <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={() => {
                    updateSettings(draft);
                    toast("Homepage updated", "success", "Your headline and announcements are live.");
                  }}
                >
                  <span>
                    <Check size={14} /> Publish changes
                  </span>
                </button>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => {
                    setDraft(defaultSettings);
                    updateSettings(defaultSettings);
                    toast("Content reset", "default", "Default copy restored.");
                  }}
                >
                  <span>
                    <RefreshCw size={14} /> Reset to default
                  </span>
                </button>
              </div>
            </div>

            <div className="admin-card">
              <h2>Live preview</h2>
              <div className="admin-preview">
                <span className="admin-preview__label">Hero</span>
                <h3>
                  {draft.heroHeadline.split("|").map((line, index) => (
                    <span key={index} style={{ display: "block", fontStyle: index === 1 ? "italic" : "normal" }}>
                      {line}
                    </span>
                  ))}
                </h3>
                <p>{draft.heroSub}</p>
              </div>
              <p className="admin-note">
                Content is saved to this browser and rendered by the live homepage component. In production this would
                sit in a site_settings table with an audit log.
              </p>
              <div className="admin-subscribers">
                <span className="admin-subscribers__label">Newsletter</span>
                <strong>{newsletter.length}</strong>
                <span className="small muted"> subscriber{newsletter.length === 1 ? "" : "s"} from this browser</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
