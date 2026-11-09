"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { ArrowRight, Check } from "./Icons";

export default function NewsletterForm() {
  const { subscribe, toast } = useStore();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const added = subscribe(email);
    setDone(true);
    toast(
      added ? "You're on the list" : "You're already subscribed",
      "success",
      added ? "We'll send occasional updates — no noise." : "This email is already on our list.",
    );
   setEmail("");
  };

  return (
    <div>
      <form className="newsletter-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : undefined}
          required
        />
        <button type="submit" aria-label="Subscribe to updates">
          {done ? <Check size={18} /> : <ArrowRight size={18} />}
        </button>
      </form>
      {error ? (
        <p className="newsletter-note" id="newsletter-error" style={{ color: "#ffb4b4" }}>
          {error}
        </p>
      ) : (
        <p className="newsletter-note">{done ? "You're subscribed. Welcome aboard." : "Delivery news, new sizes, no spam. Unsubscribe anytime."}</p>
      )}
    </div>
  );
}
