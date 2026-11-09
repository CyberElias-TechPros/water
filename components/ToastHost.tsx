"use client";

import { useStore } from "@/lib/store";
import { Check, Close, Info } from "./Icons";

export default function ToastHost() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="toast-host" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div className="toast" data-tone={toast.tone} key={toast.id}>
          <span className="toast__icon">{toast.tone === "success" ? <Check size={18} /> : <Info size={18} />}</span>
          <span className="toast__body">
            <strong>{toast.message}</strong>
            {toast.detail && <span>{toast.detail}</span>}
          </span>
          <button type="button" className="toast__close" aria-label="Dismiss notification" onClick={() => dismissToast(toast.id)}>
            <Close size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
