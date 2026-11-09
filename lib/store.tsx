"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "./products";

export type ToastTone = "default" | "success" | "error";
export type Toast = { id: string; message: string; detail?: string; tone: ToastTone };

export type OrderCustomer = {
  name: string;
  phone: string;
  email: string;
  address: string;
  zone: string;
  zoneLabel: string;
  notes: string;
  date: string;
};

export type Order = {
  ref: string;
  createdAt: string;
  customer: OrderCustomer;
  items: CartLine[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  payment: string;
  status: "Pending" | "Confirmed" | "Out for delivery" | "Delivered";
};

export type Enquiry = {
  id: string;
  createdAt: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
  message: string;
};

export type SiteSettings = {
  heroHeadline: string;
  heroSub: string;
  announcements: string[];
};

export const defaultSettings: SiteSettings = {
  heroHeadline: "Pure refreshment.|Every drop|matters.",
  heroSub:
    "Seven-stage purified table water from a protected Nigerian aquifer — sealed at the source and delivered to your door, chilled and on schedule.",
  announcements: [
    "Premium drinking water, delivered to your doorstep across Lagos.",
    "Now accepting wholesale and distribution enquiries.",
    "Free delivery on your first order over ₦15,000 with code FREESHIP.",
  ],
};

type StoreValue = {
  hydrated: boolean;
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  addItem: (item: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  bump: number;
  toasts: Toast[];
  toast: (message: string, tone?: ToastTone, detail?: string) => void;
  dismissToast: (id: string) => void;
  orders: Order[];
  placeOrder: (order: Omit<Order, "ref" | "createdAt" | "status">) => Order;
  addOrders: (orders: Order[]) => void;
  updateOrderStatus: (ref: string, status: Order["status"]) => void;
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt">) => void;
  settings: SiteSettings;
  updateSettings: (patch: Partial<SiteSettings>) => void;
  newsletter: string[];
  subscribe: (email: string) => boolean;
};

const StoreContext = createContext<StoreValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable */
  }
};

const uid = () => Math.random().toString(36).slice(2, 10);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [newsletter, setNewsletter] = useState<string[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    setCart(read<CartLine[]>("aquaris.cart.v1", []));
    setOrders(read<Order[]>("aquaris.orders.v1", []));
    setEnquiries(read<Enquiry[]>("aquaris.enquiries.v1", []));
    setSettings({ ...defaultSettings, ...read<Partial<SiteSettings>>("aquaris.settings.v1", {}) });
    setNewsletter(read<string[]>("aquaris.newsletter.v1", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) write("aquaris.cart.v1", cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) write("aquaris.orders.v1", orders);
  }, [orders, hydrated]);
  useEffect(() => {
    if (hydrated) write("aquaris.enquiries.v1", enquiries);
  }, [enquiries, hydrated]);
  useEffect(() => {
    if (hydrated) write("aquaris.settings.v1", settings);
  }, [settings, hydrated]);
  useEffect(() => {
    if (hydrated) write("aquaris.newsletter.v1", newsletter);
  }, [newsletter, hydrated]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen]);

  const dismissToast = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const toast = useCallback(
    (message: string, tone: ToastTone = "default", detail?: string) => {
      const id = uid();
      setToasts((list) => [...list.slice(-2), { id, message, detail, tone }]);
      timers.current[id] = setTimeout(() => dismissToast(id), 4600);
    },
    [dismissToast],
  );

  const addItem = useCallback(
    (item: Omit<CartLine, "key" | "qty">, qty = 1) => {
      const key = `${item.slug}::${item.variantId}`;
      setCart((list) => {
        const existing = list.find((line) => line.key === key);
        if (existing) {
          return list.map((line) => (line.key === key ? { ...line, qty: line.qty + qty } : line));
        }
        return [...list, { ...item, key, qty }];
      });
      setBump((value) => value + 1);
      toast(`${item.name} added to your order`, "success", `${item.pack} · ${qty} × ₦${item.price.toLocaleString("en-NG")}`);
    },
    [toast],
  );

  const removeItem = useCallback((key: string) => {
    setCart((list) => list.filter((line) => line.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((list) =>
      qty <= 0
        ? list.filter((line) => line.key !== key)
        : list.map((line) => (line.key === key ? { ...line, qty: Math.min(qty, 99) } : line)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const placeOrder = useCallback(
    (payload: Omit<Order, "ref" | "createdAt" | "status">) => {
      const ref = `AQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const order: Order = {
        ...payload,
        ref,
        createdAt: new Date().toISOString(),
        status: "Pending",
      };
      setOrders((list) => [order, ...list]);
      setCart([]);
      return order;
    },
    [],
  );

  const addOrders = useCallback((incoming: Order[]) => {
    setOrders((list) => [...incoming, ...list]);
  }, []);

  const updateOrderStatus = useCallback((ref: string, status: Order["status"]) => {
    setOrders((list) => list.map((order) => (order.ref === ref ? { ...order, status } : order)));
  }, []);

  const addEnquiry = useCallback((enquiry: Omit<Enquiry, "id" | "createdAt">) => {
    setEnquiries((list) => [
      { ...enquiry, id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`, createdAt: new Date().toISOString() },
      ...list,
    ]);
  }, []);

  const updateSettings = useCallback((patch: Partial<SiteSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const subscribe = useCallback(
    (email: string) => {
      const clean = email.trim().toLowerCase();
      let added = false;
      setNewsletter((list) => {
        if (list.includes(clean)) return list;
        added = true;
        return [...list, clean];
      });
      return added;
    },
    [],
  );

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, line) => sum + line.price * line.qty, 0), [cart]);

  const value: StoreValue = {
    hydrated,
    cart,
    cartCount,
    subtotal,
    addItem,
    removeItem,
    setQty,
    clearCart,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    bump,
    toasts,
    toast,
    dismissToast,
    orders,
    placeOrder,
    addOrders,
    updateOrderStatus,
    enquiries,
    addEnquiry,
    settings,
    updateSettings,
    newsletter,
    subscribe,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

