import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export const Droplet = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.8c3.7 4.3 6.4 7.7 6.4 11.1a6.4 6.4 0 1 1-12.8 0C5.6 10.5 8.3 7.1 12 2.8Z" />
    <path d="M9.2 14.6c0-1.4.8-2.6 2-3.4" opacity=".6" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const ArrowUp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20V4" />
    <path d="m6 10 6-6 6 6" />
  </svg>
);

export const Cart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 4h2.2l2.1 10.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L20.5 7H6" />
    <circle cx="9.5" cy="20" r="1.3" />
    <circle cx="17.5" cy="20" r="1.3" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.4-3.4" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 7h18M3 12h18M3 17h12" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Star = ({ size = 14, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.4 3h-2A1.4 1.4 0 0 0 3 4.5C3 13 11 21 19.5 21a1.4 1.4 0 0 0 1.5-1.4v-2a1.4 1.4 0 0 0-1.1-1.4l-2.7-.6a1.4 1.4 0 0 0-1.4.5l-1 1.2a14.7 14.7 0 0 1-5.6-5.6l1.2-1a1.4 1.4 0 0 0 .5-1.4l-.6-2.7A1.4 1.4 0 0 0 6.4 3Z" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.8 6.6 7.3 5.4a1.5 1.5 0 0 0 1.8 0l7.3-5.4" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 10.5c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" />
    <circle cx="12" cy="10.5" r="2.6" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3.3 2" />
  </svg>
);

export const Truck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 6.5h11v10H2z" />
    <path d="M13 9.5h4.4l3.6 3.4v3.6h-8z" />
    <circle cx="6.5" cy="18" r="1.7" />
    <circle cx="17.5" cy="18" r="1.7" />
  </svg>
);

export const Shield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.6 20 6v5.6c0 5-3.4 8.4-8 9.8-4.6-1.4-8-4.8-8-9.8V6l8-3.4Z" />
    <path d="m8.6 11.8 2.3 2.4 4.5-4.6" />
  </svg>
);

export const Leaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20c0-8 5-14 16-15 0 11-5.4 16-11.4 16-2.7 0-4.6-.6-4.6-1Z" />
    <path d="M9 15c2-3 5-5.2 8.5-6.4" />
  </svg>
);

export const Funnel = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />
  </svg>
);

export const Chat = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 12a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-3.4-.7L3 21l1.4-4.3A8.4 8.4 0 1 1 21 12Z" />
    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg width={p.size ?? 22} height={p.size ?? 22} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.53 3.68 1.46 5.2L2 22l5.1-1.62a9.84 9.84 0 0 0 4.94 1.33c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm0 17.98c-1.6 0-3.1-.44-4.38-1.22l-.31-.19-3.03.96.97-2.94-.2-.32a8.1 8.1 0 0 1-1.26-4.33 8.2 8.2 0 1 1 8.21 8.04Zm4.6-6.03c-.25-.13-1.49-.73-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8.99-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.39.11-.52.12-.12.25-.29.38-.43.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09s.9 2.42 1.02 2.59c.13.17 1.76 2.7 4.27 3.79.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.49-.61 1.7-1.2.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.28Z" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const XSocial = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

export const Facebook = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5h1.3V5c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H9.5v3H12v7h2.5Z" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7.5 10v7M7.5 7.5v.01M11.5 17v-4a2.5 2.5 0 0 1 5 0v4" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const Trash = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V4.8h6V7M6 7l1 13h10l1-13" />
  </svg>
);

export const Share = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4" />
  </svg>
);

export const ZoomIn = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M11 8.5v5M8.5 11h5M20 20l-3.4-3.4" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m14.5 5-7 7 7 7" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9.5 5 7 7-7 7" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 9 7 7 7-7" />
  </svg>
);

export const Copy = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
  </svg>
);

export const Lock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4.5" y="10" width="15" height="11" rx="2.5" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
  </svg>
);

export const User = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.3-3.4 4.1-5.2 7.5-5.2s6.2 1.8 7.5 5.2" />
  </svg>
);

export const Sparkles = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
    <path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
  </svg>
);

export const CreditCard = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5" width="19" height="14" rx="3" />
    <path d="M2.5 10h19M6.5 14.5h3" />
  </svg>
);

export const Bank = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 9.5 12 4l9 5.5M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
  </svg>
);

export const Package = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.8 21 7v10l-9 4.2L3 17V7l9-4.2Z" />
    <path d="M3 7l9 4.2L21 7M12 11.2V21" />
  </svg>
);

export const Globe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const Compass = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.4 8.6-2 5.1-5.1 2 2-5.1 5.1-2Z" />
  </svg>
);

export const Info = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.6v.01" strokeWidth="1.8" />
  </svg>
);

export const Headset = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="13" width="4" height="6" rx="1.6" />
    <rect x="17.5" y="13" width="4" height="6" rx="1.6" />
    <path d="M20 19v.6a3.4 3.4 0 0 1-3.4 3.4H13" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 6C6 7 4.5 9.4 4.5 13v5h5.8v-6H7.6c0-2 1-3.3 2.8-4L9 6ZM19.5 6c-3 1-4.5 3.4-4.5 7v5h5.8v-6h-2.7c0-2 1-3.3 2.8-4l-1.4-2Z" />
  </svg>
);

export const Droplets = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 4.5c2.3 2.8 4 5 4 7.2a4 4 0 1 1-8 0C5 9.5 6.7 7.3 9 4.5Z" />
    <path d="M16.5 10c1.6 1.9 2.5 3.3 2.5 4.7a2.5 2.5 0 1 1-5 0c0-.6.2-1.2.5-1.8" opacity=".65" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m10 8.6 5.5 3.4L10 15.4V8.6Z" />
  </svg>
);

export const Snowflake = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2v20M4 6.5l16 11M20 6.5l-16 11" />
    <path d="M12 2 9.6 4.6M12 2l2.4 2.6M12 22l-2.4-2.6M12 22l2.4-2.6" />
  </svg>
);

export const Send = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 3 3 10.5l7 2.7L21 3ZM21 3l-6.3 18-3.7-7.8" />
  </svg>
);

export const BarChartPlaceholder = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const RefreshCw = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 11a8 8 0 0 0-13.6-4.6L3 9" />
    <path d="M3 4v5h5" />
    <path d="M4 13a8 8 0 0 0 13.6 4.6L21 15" />
    <path d="M21 20v-5h-5" />
  </svg>
);

export const ShoppingBag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h16l-1.4 12.2a1.6 1.6 0 0 1-1.6 1.4H7a1.6 1.6 0 0 1-1.6-1.4L4 8Z" />
    <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
  </svg>
);

export const Settings = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.9 14H3.7a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.3-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 2.9-1.3V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.3 2.9h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M2.8 20c1-3 3.4-4.6 6.2-4.6s5.2 1.6 6.2 4.6" />
    <path d="M16.4 5.2a3.4 3.4 0 0 1 0 6.4M18 15.6c2 .6 3.3 2.1 4 4.4" />
  </svg>
);
