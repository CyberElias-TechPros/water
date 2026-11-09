"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { deliveryZones, promoCodes } from "@/lib/products";
import { money } from "@/lib/format";
import { useStore, type Order } from "@/lib/store";
import { brand, whatsappLink } from "@/lib/content";
import {
  ArrowRight,
  Bank,
  Calendar,
  Cart,
  Check,
  CreditCard,
  Info,
  Lock,
  Minus,
  Package,
  Phone,
  Plus,
  Shield,
  Truck,
  WhatsApp,
} from "./Icons";

type Fields = {
  name: string;
  phone: string;
  email: string;
  address: string;
  zone: string;
  notes: string;
  date: string;
};

const emptyFields: Fields = {
  name: "",
  phone: "",
  email: "",
  address: "",
  zone: "lagos-island",
  notes: "",
  date: "",
};

const paymentMethods = [
  { id: "card", title: "Card payment", note: "Paystack · secure 3D verification", icon: <CreditCard size={18} /> },
  { id: "transfer", title: "Bank transfer", note: "Account details sent with your invoice", icon: <Bank size={18} /> },
  { id: "delivery", title: "Pay on delivery", note: "Cash or transfer when your water arrives", icon: <Truck size={18} /> },
];

const stepLabels = ["Your order", "Delivery", "Payment"];

export default function OrderFlow() {
  const { cart, subtotal, setQty, removeItem, placeOrder, toast, hydrated } = useStore();
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [payment, setPayment] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const zone = deliveryZones.find((item) => item.id === fields.zone) ?? deliveryZones[0];
  const promoConfig = promo ? promoCodes[promo] : null;

  const discount = useMemo(() => {
    if (!promoConfig || promoConfig.type !== "percent") return 0;
    return Math.round((subtotal * promoConfig.value) / 100);
  }, [promoConfig, subtotal]);

  const freeDelivery = promoConfig?.type === "shipping" || subtotal - discount >= 15000;
  const delivery = freeDelivery ? 0 : subtotal > 0 ? zone.fee : 0;
  const total = Math.max(0, subtotal - discount + delivery);

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (fields.name.trim().length < 2) next.name = "Please tell us who the order is for.";
    if (!/^(\+?234|0)[789]\d{9}$/.test(fields.phone.replace(/[\s-]/g, ""))) {
      next.phone = "Enter a valid Nigerian mobile number, e.g. 0801 234 5678.";
    }
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) {
      next.email = "That email address does not look right.";
    }
    if (fields.zone !== "pickup" && fields.address.trim().length < 8) {
      next.address = "A street address helps our driver find you.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (promoCodes[code]) {
      setPromo(code);
      setPromoError("");
      toast("Promo applied", "success", promoCodes[code].label);
    } else {
      setPromoError("That code is not valid. Try AQUARIS10.");
      setPromo(null);
    }
  };

  const goToPayment = () => {
    if (validate()) setStep(3);
    else toast("Check your delivery details", "error", "A few fields still need attention.");
  };

  const submitOrder = () => {
    if (!cart.length) return;
    setPlacing(true);
    window.setTimeout(() => {
      const created = placeOrder({
        customer: {
          name: fields.name,
          phone: fields.phone,
          email: fields.email,
          address: fields.zone === "pickup" ? `${brand.plant} (pickup)` : fields.address,
          zone: fields.zone,
          zoneLabel: zone.label,
          notes: fields.notes,
          date: fields.date,
        },
        items: cart,
        subtotal,
        discount,
        delivery,
        total,
        payment: paymentMethods.find((method) => method.id === payment)?.title ?? "Card payment",
      });
      setOrder(created);
      setPlacing(false);
      setStep(4);
      toast("Order received", "success", `Reference ${created.ref}. We will call to confirm.`);
      window.dispatchEvent(new Event("aquaris:scroll-top"));
    }, 1100);
  };

  const orderMessage = () => {
    const lines = (order?.items ?? cart)
      .map((line) => `• ${line.qty} × ${line.name} (${line.pack}) — ${money(line.price * line.qty)}`)
      .join("\n");
    return `Hello AQUARIS, I just placed order ${order?.ref ?? "(new order)"}.\n${lines}\nTotal: ${money(total)}\nName: ${fields.name}\nAddress: ${fields.address || "pickup"}`;
  };

  if (!hydrated) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">
          <Cart size={30} />
        </div>
        <h3>Loading your cart…</h3>
      </div>
    );
  }

  if (step === 4 && order) {
    return (
      <div className="confirm">
        <div className="confirm__burst" aria-hidden>
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} style={{ "--i": index } as React.CSSProperties} />
          ))}
        </div>
        <div className="confirm__check">
          <Check size={38} />
        </div>
        <h1>Your water is on the way.</h1>
        <p>
          Thank you, {order.customer.name.split(" ")[0]}. We have your order and our dispatch team will call{" "}
          {order.customer.phone} to confirm before it leaves the plant.
        </p>
        <div className="confirm__ref">
          <Package size={16} /> Order reference {order.ref}
        </div>

        <div className="confirm__summary">
          <h3>Order summary</h3>
          {order.items.map((line) => (
            <div className="confirm__row" key={line.key}>
              <span>
                {line.qty} × {line.name} <small style={{ color: "var(--ink-mute)" }}>({line.pack})</small>
              </span>
              <b>{money(line.price * line.qty)}</b>
            </div>
          ))}
          <div className="confirm__row">
            <span>Subtotal</span>
            <b>{money(order.subtotal)}</b>
          </div>
          {order.discount > 0 && (
            <div className="confirm__row">
              <span>Promo discount</span>
              <b>−{money(order.discount)}</b>
            </div>
          )}
          <div className="confirm__row">
            <span>Delivery · {order.customer.zoneLabel}</span>
            <b>{order.delivery === 0 ? "Free" : money(order.delivery)}</b>
          </div>
          <div className="confirm__row">
            <span>Payment</span>
            <b>{order.payment}</b>
          </div>
          <div className="confirm__row">
            <span>
              <b>Total</b>
            </span>
            <b>{money(order.total)}</b>
          </div>
          <div className="confirm__row">
            <span>Deliver to</span>
            <b style={{ textAlign: "right", maxWidth: "60%" }}>
              {order.customer.address}
              {order.customer.date ? ` · ${order.customer.date}` : ""}
            </b>
          </div>
        </div>

        <div className="confirm__actions">
          <a
            className="btn btn--primary"
            href={whatsappLink(orderMessage())}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <WhatsApp size={17} /> Send order on WhatsApp
            </span>
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
            <span>Print receipt</span>
          </button>
          <Link href="/products" className="btn btn--ghost">
            <span>Order more water</span>
          </Link>
        </div>

        <div className="confirm__meta">
          <div>
            <Truck size={14} /> {order.customer.zone === "pickup" ? "Ready for pickup in 2 hours" : zone.eta}
          </div>
          <div>
            <Phone size={14} /> {brand.phone}
          </div>
          <div>
            <Shield size={14} /> No card details stored
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-layout">
      <div>
        <div className="steps" role="list" aria-label="Checkout steps">
          {stepLabels.map((label, index) => {
            const number = index + 1;
            const state = step === number ? "active" : step > number ? "done" : "todo";
            return (
              <div className="steps__item" data-state={state} key={label} role="listitem" aria-current={state === "active"}>
                <b>{state === "done" ? <Check size={12} /> : number}</b>
                <span>{label}</span>
              </div>
            );
          })}
        </div>

        {step === 1 && (
          <div className="order-card">
            <div className="order-card__head">
              <h2>Your order</h2>
              <Link href="/products" className="link-underline" style={{ fontSize: 12 }}>
                Add more water
              </Link>
            </div>

            {cart.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">
                  <Cart size={30} />
                </div>
                <h3>Nothing here yet</h3>
                <p>Your cart is empty. Pick a pack and we will get it on the next dispatch.</p>
                <Link href="/products" className="btn btn--primary">
                  <span>
                    Browse our water <ArrowRight size={16} className="arrow" />
                  </span>
                </Link>
              </div>
            ) : (
              <>
                {cart.map((line) => (
                  <div className="order-item" key={line.key}>
                    <div className="order-item__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={line.image} alt={line.name} loading="lazy" />
                    </div>
                    <div>
                      <p className="order-item__name">{line.name}</p>
                      <p className="order-item__variant">{line.pack}</p>
                      <div className="order-item__controls">
                        <div className="qty">
                          <button type="button" onClick={() => setQty(line.key, line.qty - 1)} aria-label={`Decrease ${line.name}`}>
                            <Minus size={13} />
                          </button>
                          <span>{line.qty}</span>
                          <button type="button" onClick={() => setQty(line.key, line.qty + 1)} aria-label={`Increase ${line.name}`}>
                            <Plus size={13} />
                          </button>
                        </div>
                        <button type="button" className="cart-line__remove" onClick={() => removeItem(line.key)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="order-item__price">
                      {money(line.price * line.qty)}
                      <small>{money(line.price)} each</small>
                    </div>
                  </div>
                ))}

                <div className="order-nav">
                  <span className="small muted">
                    {cart.reduce((sum, line) => sum + line.qty, 0)} packs · {money(subtotal)}
                  </span>
                  <button type="button" className="btn btn--primary" onClick={() => setStep(2)}>
                    <span>
                      Continue to delivery <ArrowRight size={16} className="arrow" />
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="order-card">
            <div className="order-card__head">
              <h2>Where should we deliver?</h2>
              <span className="badge badge--soft">{zone.eta}</span>
            </div>

            <div className="form-grid form-grid--full">
              <div className="field" data-error={Boolean(errors.name)}>
                <label htmlFor="name">
                  Full name<span className="req">*</span>
                </label>
                <input
                  id="name"
                  value={fields.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Adaeze Nwosu"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>

              <div className="field" data-error={Boolean(errors.phone)}>
                <label htmlFor="phone">
                  Phone number<span className="req">*</span>
                </label>
                <input
                  id="phone"
                  value={fields.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="0801 234 5678"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <span className="field__error">{errors.phone}</span>}
              </div>

              <div className="field" data-error={Boolean(errors.email)}>
                <label htmlFor="email">Email (for your receipt)</label>
                <input
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="zone">
                  Delivery area<span className="req">*</span>
                </label>
                <select id="zone" value={fields.zone} onChange={(event) => update("zone", event.target.value)}>
                  {deliveryZones.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.label} — {item.fee === 0 ? "free" : money(item.fee)}
                    </option>
                  ))}
                </select>
              </div>

              {fields.zone !== "pickup" && (
                <div className="field field--full" data-error={Boolean(errors.address)}>
                  <label htmlFor="address">
                    Delivery address<span className="req">*</span>
                  </label>
                  <input
                    id="address"
                    value={fields.address}
                    onChange={(event) => update("address", event.target.value)}
                    placeholder="15b Admiralty Way, Lekki Phase 1, Lagos"
                    autoComplete="street-address"
                    aria-invalid={Boolean(errors.address)}
                  />
                  {errors.address && <span className="field__error">{errors.address}</span>}
                </div>
              )}

              <div className="field">
                <label htmlFor="date">Preferred delivery date</label>
                <input
                  id="date"
                  type="date"
                  value={fields.date}
                  onChange={(event) => update("date", event.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
                <span className="field__hint">Leave blank for the earliest available slot.</span>
              </div>

              <div className="field">
                <label htmlFor="notes">Delivery instructions</label>
                <input
                  id="notes"
                  value={fields.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Gate code, landmark, reception contact…"
                />
              </div>

              <div className="field field--full">
                <p className="form-note">
                  <Lock size={14} /> Your details are used to fulfil this order only. We never store card information.
                </p>
              </div>
            </div>

            <div className="order-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>
                <span>Back to order</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={goToPayment}>
                <span>
                  Continue to payment <ArrowRight size={16} className="arrow" />
                </span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="order-card">
            <div className="order-card__head">
              <h2>How would you like to pay?</h2>
              <span className="badge badge--soft">Secure checkout</span>
            </div>

            <div className="pay-methods" role="radiogroup" aria-label="Payment method">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  className="pay-method"
                  key={method.id}
                  data-active={payment === method.id}
                  onClick={() => setPayment(method.id)}
                  role="radio"
                  aria-checked={payment === method.id}
                >
                  <span className="pay-method__radio" aria-hidden />
                  <span className="pay-method__icon">{method.icon}</span>
                  <span>
                    <strong>{method.title}</strong>
                    <span>{method.note}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="demo-note">
              <Info size={15} />
              <span>
                This checkout is a front-end demonstration. No real payment is taken and no card details are collected.
                In production this step hands off to Paystack or Flutterwave and the transaction is verified server-side
                before an order is marked paid.
              </span>
            </div>

            <div className="order-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>
                <span>Back to delivery</span>
              </button>
              <button type="button" className="btn btn--primary btn--lg" onClick={submitOrder} disabled={placing}>
                <span>
                  {placing ? (
                    <>
                      <span className="spin" style={{ display: "inline-flex" }}>
                        <Package size={16} />
                      </span>
                      Placing order…
                    </>
                  ) : (
                    <>
                      Place order · {money(total)} <ArrowRight size={17} className="arrow" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <aside className="summary-card" aria-label="Order summary">
        <h2>Order summary</h2>
        <div className="summary-lines">
          <div className="summary-line">
            <span>Items ({cart.reduce((sum, line) => sum + line.qty, 0)})</span>
            <span>{money(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-line summary-line--discount">
              <span>Promo {promo}</span>
              <span>−{money(discount)}</span>
            </div>
          )}
          <div className="summary-line">
            <span>Delivery · {zone.label}</span>
            <span>{delivery === 0 ? "Free" : money(delivery)}</span>
          </div>
          <div className="summary-line">
            <span>Estimated arrival</span>
            <span>{zone.eta}</span>
          </div>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>{money(total)}</strong>
        </div>

        <form
          className="promo-form"
          onSubmit={(event) => {
            event.preventDefault();
            applyPromo();
          }}
        >
          <label htmlFor="promo" className="sr-only">
            Promo code
          </label>
          <input
            id="promo"
            value={promoInput}
            onChange={(event) => {
              setPromoInput(event.target.value);
              setPromoError("");
            }}
            placeholder="Promo code"
          />
          <button type="submit">Apply</button>
        </form>
        {promoError && (
          <p className="promo-msg" data-error="true">
            {promoError}
          </p>
        )}
        {promo && !promoError && <p className="promo-msg">Applied: {promoCodes[promo].label}</p>}

        <div className="summary-trust">
          <div>
            <Shield size={14} /> 100% sealed and batch tested
          </div>
          <div>
            <Truck size={14} /> Free delivery over ₦15,000
          </div>
          <div>
            <Calendar size={14} /> Cancel or reschedule before dispatch
          </div>
          <div>
            <Phone size={14} /> {brand.phone}
          </div>
        </div>
      </aside>
    </div>
  );
}
