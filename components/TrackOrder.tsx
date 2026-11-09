"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore, type Order } from "@/lib/store";
import { money } from "@/lib/format";
import { ArrowRight, Check, Clock, Package, Search, Truck } from "./Icons";

const stages: Order["status"][] = ["Pending", "Confirmed", "Out for delivery", "Delivered"];

export default function TrackOrder() {
  const { orders } = useStore();
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const lookup = (event: React.FormEvent) => {
    event.preventDefault();
    const term = reference.trim().toUpperCase();
    if (!term) {
      setError("Enter the reference from your confirmation.");
      return;
    }
    const found = orders.find((order) => order.ref.toUpperCase() === term);
    if (!found) {
      setResult(null);
      setError("We could not find that reference in this browser. Check the reference or contact us on WhatsApp.");
      return;
    }
    setError("");
    setResult(found);
  };

  const stageIndex = result ? Math.max(0, stages.indexOf(result.status)) : 0;

  return (
    <div className="tracker">
      <div className="tracker__copy">
        <span className="eyebrow">Already ordered?</span>
        <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 50px)", marginTop: 14 }}>
          Track your <span className="accent-italic">water.</span>
        </h2>
        <p className="lead" style={{ marginTop: 16 }}>
          Enter the reference from your confirmation (for example AQ-2026-4102) to see exactly where your order is.
        </p>
        <form className="tracker__form" onSubmit={lookup}>
          <label htmlFor="track-ref" className="sr-only">
            Order reference
          </label>
          <input
            id="track-ref"
            value={reference}
            onChange={(event) => {
              setReference(event.target.value);
              setError("");
            }}
            placeholder="AQ-2026-0000"
          />
          <button type="submit" className="btn btn--primary">
            <span>
              <Search size={15} /> Track
            </span>
          </button>
        </form>
        {error && <p className="field__error" style={{ marginTop: 10 }}>{error}</p>}
        {!orders.length && (
          <p className="field__hint" style={{ marginTop: 10 }}>
            No orders in this browser yet —{" "}
            <Link href="/products" style={{ color: "var(--aqua-deep)", fontWeight: 600 }}>
              start one
            </Link>{" "}
            or load sample data in the{" "}
            <Link href="/admin" style={{ color: "var(--aqua-deep)", fontWeight: 600 }}>
              demo dashboard
            </Link>
            .
          </p>
        )}
      </div>

      <div className="tracker__result" data-empty={!result}>
        {result ? (
          <>
            <div className="tracker__head">
              <div>
                <span className="tracker__label">Order</span>
                <strong>{result.ref}</strong>
              </div>
              <span className="status-pill" data-status={result.status}>
                {result.status}
              </span>
            </div>

            <div className="tracker-steps">
              {stages.map((stage, index) => (
                <div
                  className="tracker-step"
                  key={stage}
                  data-state={index < stageIndex ? "done" : index === stageIndex ? "active" : "todo"}
                >
                  <span className="tracker-step__dot">{index <= stageIndex ? <Check size={11} /> : index + 1}</span>
                  <span className="tracker-step__label">{stage}</span>
                </div>
              ))}
            </div>

            <div className="tracker__grid">
              <div>
                <span className="tracker__label">Deliver to</span>
                <p>{result.customer.address}</p>
              </div>
              <div>
                <span className="tracker__label">Area</span>
                <p>{result.customer.zoneLabel}</p>
              </div>
              <div>
                <span className="tracker__label">Items</span>
                <p>{result.items.reduce((sum, line) => sum + line.qty, 0)} packs</p>
              </div>
              <div>
                <span className="tracker__label">Total</span>
                <p>{money(result.total)}</p>
              </div>
            </div>

            <div className="tracker__foot">
              <span>
                <Package size={14} /> Placed {new Date(result.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
              </span>
              <span>
                {result.status === "Delivered" ? <Check size={14} /> : result.status === "Out for delivery" ? <Truck size={14} /> : <Clock size={14} />}
                {result.status === "Delivered"
                  ? "Delivered — thank you"
                  : result.status === "Out for delivery"
                    ? "With the driver now"
                    : "Dispatch will call to confirm"}
              </span>
            </div>
          </>
        ) : (
          <div className="tracker__placeholder">
            <div className="empty-state__icon">
              <Truck size={30} />
            </div>
            <h3>Where is my water?</h3>
            <p>
              Your tracking timeline appears here. After dispatch you will also receive a call from the route driver.
            </p>
            <Link href="/contact" className="link-underline" style={{ marginTop: 16 }}>
              Need help with an order? <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
