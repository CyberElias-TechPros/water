export type Category = "on-the-go" | "family" | "office";

export type ProductVariant = {
  id: string;
  label: string;
  pack: string;
  price: number;
  note?: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  category: Category;
  categoryLabel: string;
  size: string;
  pack: string;
  price: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  badge?: string;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  variants: ProductVariant[];
  accent: string;
};

export const products: Product[] = [
  {
    slug: "classic-50cl",
    name: "AQUARIS Classic 50cl",
    shortName: "Classic 50cl",
    tagline: "On-the-go hydration",
    category: "on-the-go",
    categoryLabel: "On the go",
    size: "50cl",
    pack: "Pack of 12",
    price: 1800,
    compareAt: 2100,
    image: "/images/product-50cl.webp",
    gallery: ["/images/product-50cl.webp", "/images/pour.webp", "/images/source-water.webp"],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 412,
    stock: 860,
    description:
      "The bottle that goes everywhere. Slim, pocketable and sealed for freshness, our 50cl Classic is purified through seven stages and batch-tested so every sip tastes exactly as crisp as the last.",
    features: [
      "Seven-stage purification, batch tested",
      "Slim 50cl body fits cup holders and backpacks",
      "Tamper-evident seal on every bottle",
      "100% recyclable PET packaging",
    ],
    specs: [
      { label: "Volume", value: "500ml per bottle" },
      { label: "Pack size", value: "12 bottles per pack" },
      { label: "Source", value: "Deep-bore aquifer, Ogun State" },
      { label: "Purification", value: "Sand → carbon → softening → 5µm → 1µm → UV → ozone" },
      { label: "pH at bottling", value: "7.2 – 7.6" },
      { label: "Shelf life", value: "6 months from bottling" },
      { label: "Pallet quantity", value: "96 packs per pallet" },
    ],
    variants: [
      { id: "12", label: "Pack of 12", pack: "12 bottles", price: 1800 },
      { id: "24", label: "Case of 24", pack: "24 bottles", price: 3400, note: "Save ₦200" },
      { id: "72", label: "Trade case of 72", pack: "72 bottles", price: 9600, note: "Wholesale" },
    ],
    accent: "#7fdfe6",
  },
  {
    slug: "classic-75cl",
    name: "AQUARIS Classic 75cl",
    shortName: "Classic 75cl",
    tagline: "Everyday table water",
    category: "on-the-go",
    categoryLabel: "On the go",
    size: "75cl",
    pack: "Pack of 12",
    price: 2400,
    image: "/images/product-75cl.webp",
    gallery: ["/images/product-75cl.webp", "/images/pour.webp", "/images/source-water.webp"],
    badge: "Most loved",
    rating: 4.8,
    reviews: 528,
    stock: 1240,
    description:
      "The bottle on every Nigerian dining table. Generous, balanced and endlessly drinkable — 75cl of softly mineral water that complements food instead of competing with it.",
    features: [
      "Balanced mineral profile for dining",
      "Wide-mouth bottle for easy pouring",
      "Crystal-clear body with premium label",
      "Ideal for restaurants, events and family tables",
    ],
    specs: [
      { label: "Volume", value: "750ml per bottle" },
      { label: "Pack size", value: "12 bottles per pack" },
      { label: "Source", value: "Deep-bore aquifer, Ogun State" },
      { label: "Purification", value: "Seven stages including UV and ozone finishing" },
      { label: "pH at bottling", value: "7.2 – 7.6" },
      { label: "Shelf life", value: "6 months from bottling" },
      { label: "Pallet quantity", value: "72 packs per pallet" },
    ],
    variants: [
      { id: "12", label: "Pack of 12", pack: "12 bottles", price: 2400 },
      { id: "24", label: "Case of 24", pack: "24 bottles", price: 4500, note: "Save ₦300" },
      { id: "60", label: "Trade case of 60", pack: "60 bottles", price: 10800, note: "Wholesale" },
    ],
    accent: "#6cc9ee",
  },
  {
    slug: "family-1-5l",
    name: "AQUARIS Family 1.5L",
    shortName: "Family 1.5L",
    tagline: "Hydration for the household",
    category: "family",
    categoryLabel: "Family",
    size: "1.5L",
    pack: "Pack of 6",
    price: 2700,
    image: "/images/product-1-5l.webp",
    gallery: ["/images/product-1-5l.webp", "/images/source-water.webp", "/images/pour.webp"],
    badge: "New",
    rating: 4.7,
    reviews: 186,
    stock: 540,
    description:
      "One bottle, the whole table. The 1.5L Family size is made for shared meals, school lunches and long days — with a reinforced grip and a cap designed to reseal cleanly.",
    features: [
      "Family-sized 1.5L bottle",
      "Reinforced grip zone",
      "Resealable cap that stays clean",
      "Delivered in shrink-wrapped packs of six",
    ],
    specs: [
      { label: "Volume", value: "1.5 litres per bottle" },
      { label: "Pack size", value: "6 bottles per pack" },
      { label: "Source", value: "Deep-bore aquifer, Ogun State" },
      { label: "Purification", value: "Seven stages including UV and ozone finishing" },
      { label: "pH at bottling", value: "7.2 – 7.6" },
      { label: "Shelf life", value: "6 months from bottling" },
      { label: "Pallet quantity", value: "60 packs per pallet" },
    ],
    variants: [
      { id: "6", label: "Pack of 6", pack: "6 bottles", price: 2700 },
      { id: "12", label: "Case of 12", pack: "12 bottles", price: 5200, note: "Save ₦200" },
      { id: "36", label: "Trade case of 36", pack: "36 bottles", price: 15000, note: "Wholesale" },
    ],
    accent: "#8fd0ff",
  },
  {
    slug: "dispenser-19l",
    name: "AQUARIS Dispenser 19L",
    shortName: "Dispenser 19L",
    tagline: "Home & office refills",
    category: "office",
    categoryLabel: "Home & office",
    size: "19L",
    pack: "Single refill",
    price: 3500,
    image: "/images/product-19l.webp",
    gallery: ["/images/product-19l.webp", "/images/distribution.webp", "/images/source-water.webp"],
    badge: "Home & office",
    rating: 4.9,
    reviews: 674,
    stock: 310,
    description:
      "Big-bottle clarity for teams, families and events. Delivered sealed, installed on request and collected for reuse — our 19L dispenser bottle is the simplest way to keep a whole office hydrated.",
    features: [
      "19 litres of purified table water",
      "Food-grade, reusable polycarbonate bottle",
      "Free first-time dispenser installation",
      "Scheduled refills with empty-bottle collection",
    ],
    specs: [
      { label: "Volume", value: "19 litres per bottle" },
      { label: "Pack size", value: "1 bottle (returnable)" },
      { label: "Source", value: "Deep-bore aquifer, Ogun State" },
      { label: "Purification", value: "Seven stages including UV and ozone finishing" },
      { label: "Bottle deposit", value: "Refundable ₦2,000 per bottle" },
      { label: "Shelf life", value: "3 months once opened, 6 months sealed" },
      { label: "Delivery", value: "Scheduled weekly or fortnightly" },
    ],
    variants: [
      { id: "1", label: "Single refill", pack: "1 × 19L", price: 3500 },
      { id: "2", label: "Twin refill", pack: "2 × 19L", price: 6500, note: "Save ₦500" },
      {
        id: "dispenser",
        label: "Refill + dispenser",
        pack: "19L + hot/cold dispenser",
        price: 42000,
        note: "Installation included",
      },
    ],
    accent: "#5ad1c8",
  },
];

export const categoryFilters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All water" },
  { id: "on-the-go", label: "On the go" },
  { id: "family", label: "Family" },
  { id: "office", label: "Home & office" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string) {
  return products.filter((p) => p.slug !== slug).slice(0, 3);
}

export type CartLine = {
  key: string;
  slug: string;
  variantId: string;
  name: string;
  pack: string;
  price: number;
  image: string;
  qty: number;
};

export const promoCodes: Record<string, { type: "percent" | "shipping"; value: number; label: string }> = {
  AQUARIS10: { type: "percent", value: 10, label: "10% off your order" },
  DROP5: { type: "percent", value: 5, label: "5% off your order" },
  FREESHIP: { type: "shipping", value: 0, label: "Free delivery anywhere we deliver" },
};

export const deliveryZones = [
  { id: "lagos-island", label: "Lagos Island & Lekki", fee: 1800, eta: "Same day" },
  { id: "lagos-mainland", label: "Lagos Mainland & Ikeja", fee: 1500, eta: "Same day" },
  { id: "abuja", label: "Abuja (FCT)", fee: 3200, eta: "1–2 days" },
  { id: "southwest", label: "Ogun, Oyo & Osun", fee: 2800, eta: "1–2 days" },
  { id: "southsouth", label: "Rivers, Delta & Edo", fee: 3800, eta: "2–3 days" },
  { id: "other", label: "Other states", fee: 4500, eta: "2–4 days" },
  { id: "pickup", label: "Pick up from our plant", fee: 0, eta: "Ready in 2 hours" },
];
