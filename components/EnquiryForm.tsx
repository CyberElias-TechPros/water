"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Check, Info, Send } from "./Icons";
import { brand, whatsappLink } from "@/lib/content";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  type: string;
  message: string;
};

const initial: Values = { name: "", email: "", phone: "", company: "", city: "", type: "", message: "" };

export default function EnquiryForm({
  types,
  defaultType,
  subject = "Send an enquiry",
  cta = "Send your enquiry",
  successTitle = "Message received",
  successBody = "Our team reads every enquiry. Expect a reply within one working day — usually much sooner.",
}: {
  types: { id: string; label: string }[];
  defaultType?: string;
  subject?: string;
  cta?: string;
  successTitle?: string;
  successBody?: string;
}) {
  const { addEnquiry, toast } = useStore();
  const [values, setValues] = useState<Values>({ ...initial, type: defaultType ?? types[0].id });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (key: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: "" }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!/^(\+?234|0)[789]\d{9}$/.test(values.phone.replace(/[\s-]/g, ""))) {
      next.phone = "Enter a valid Nigerian mobile number.";
    }
    if (values.message.trim().length < 12) next.message = "Tell us a little more — at least a sentence.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    window.setTimeout(() => {
      addEnquiry({
        type: types.find((item) => item.id === values.type)?.label ?? values.type,
        name: values.name,
        email: values.email,
        phone: values.phone,
        company: values.company,
        city: values.city,
        message: values.message,
      });
      setSending(false);
      setSent(true);
      toast("Enquiry sent", "success", "We will be in touch within one working day.");
      setValues({ ...initial, type: defaultType ?? types[0].id });
    }, 800);
  };

  if (sent) {
    return (
      <div className="form-success">
        <span className="form-success__icon">
          <Check size={20} />
        </span>
        <div>
          <strong>{successTitle}</strong>
          <p>{successBody}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
            <a className="btn btn--sm btn--primary" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <span>Chat now instead</span>
            </a>
            <button type="button" className="btn btn--sm btn--ghost" onClick={() => setSent(false)}>
              <span>Send another</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h2>{subject}</h2>
      <p>
        Tell us what you need and we will reply with pricing, availability and the next delivery window. Prefer to talk?{" "}
        <a href={brand.phoneHref} style={{ color: "var(--aqua-deep)", fontWeight: 600 }}>
          {brand.phone}
        </a>
      </p>

      <div className="form-grid">
        <div className="field" data-error={Boolean(errors.name)}>
          <label htmlFor="enq-name">
            Full name<span className="req">*</span>
          </label>
          <input
            id="enq-name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>

        <div className="field" data-error={Boolean(errors.email)}>
          <label htmlFor="enq-email">
            Email<span className="req">*</span>
          </label>
          <input
            id="enq-email"
            type="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>

        <div className="field" data-error={Boolean(errors.phone)}>
          <label htmlFor="enq-phone">
            Phone<span className="req">*</span>
          </label>
          <input
            id="enq-phone"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="0801 234 5678"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <span className="field__error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="enq-company">Company / organisation</label>
          <input
            id="enq-company"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder="Optional"
            autoComplete="organization"
          />
        </div>

        <div className="field">
          <label htmlFor="enq-type">What is this about?</label>
          <select id="enq-type" value={values.type} onChange={(event) => update("type", event.target.value)}>
            {types.map((type) => (
              <option value={type.id} key={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="enq-city">Delivery city / state</label>
          <input
            id="enq-city"
            value={values.city}
            onChange={(event) => update("city", event.target.value)}
            placeholder="e.g. Lekki, Lagos"
            autoComplete="address-level2"
          />
        </div>

        <div className="field field--full" data-error={Boolean(errors.message)}>
          <label htmlFor="enq-message">
            Message<span className="req">*</span>
          </label>
          <textarea
            id="enq-message"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="How many packs, how often, and when do you need them?"
            rows={5}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <span className="field__error">{errors.message}</span>}
        </div>

        <div className="field field--full">
          <p className="form-note">
            <Info size={14} /> By sending this form you agree to our{" "}
            <a href="/privacy" style={{ color: "var(--aqua-deep)" }}>
              privacy policy
            </a>
            . We never sell your details.
          </p>
        </div>

        <div className="field field--full">
          <button type="submit" className="btn btn--primary" disabled={sending}>
            <span>
              <Send size={16} /> {sending ? "Sending…" : cta}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
