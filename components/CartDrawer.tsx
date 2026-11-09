"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";
import { ArrowRight, Cart, Close, Shield, Truck } from "./Icons";

const FREE_DELIVERY = 15000;

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, subtotal, removeItem, setQty, cartCount } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  const remaining = Math.max(0, FREE_DELIVERY - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY) * 100);

  return (
    <>
      <div className="overlay" data-open={cartOpen} onClick={() => setCartOpen(false)} aria-hidden />
      <aside
        className="cart-drawer"
        data-open={cartOpen}
        aria-label="Shopping cart"
        aria-hidden={!cartOpen}
        data-lenis-prevent
      >
        <div className="cart-drawer__head">
          <h2>
            Your order {cartCount > 0 && <span>{cartCount}</span>}
          </h2>
          <button type="button" className="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}>
            <Close size={22} />
          </button>
        </div>

        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">
                <Cart size={32} />
              </div>
              <h3>Your cart is empty</h3>
              <p>Add a pack of AQUARIS and we will have it at your door before the ice melts.</p>
              <Link href="/products" className="btn btn--primary" onClick={() => setCartOpen(false)}>
                <span>
                  Browse our water <ArrowRight size={16} className="arrow" />
                </span>
              </Link>
            </div>
          ) : (
            <>
              {cart.map((line) => (
                <div className="cart-line" key={line.key}>
                  <div className="cart-line__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={line.image} alt={line.name} loading="lazy" />
                  </div>
                  <div className="cart-line__info">
                    <span className="cart-line__name">{line.name}</span>
                    <span className="cart-line__variant">{line.pack}</span>
                    <div className="cart-line__row">
                      <div className="qty">
                        <button type="button" aria-label={`Decrease quantity of ${line.name}`} onClick={() => setQty(line.key, line.qty - 1)}>
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button type="button" aria-label={`Increase quantity of ${line.name}`} onClick={() => setQty(line.key, line.qty + 1)}>
                          +
                        </button>
                      </div>
                      <span className="cart-line__price">{money(line.price * line.qty)}</span>
                    </div>
                    <button type="button" className="cart-line__remove" onClick={() => removeItem(line.key)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="drawer-progress">
                <p>
                  {remaining > 0 ? (
                    <>
                      Add <b>{money(remaining)}</b> more for free delivery
                    </>
                  ) : (
                    <>You have unlocked free delivery 🎉</>
                  )}
                </p>
                <div className="drawer-progress__bar">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <p className="cart-drawer__note">
              <Truck size={14} /> Delivery calculated at checkout
            </p>
            <Link href="/order" className="btn btn--primary btn--block" onClick={() => setCartOpen(false)}>
              <span>
                Continue to checkout <ArrowRight size={16} className="arrow" />
              </span>
            </Link>
            <p className="cart-drawer__note">
              <Shield size={14} /> Sealed at source · Batch tested
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
