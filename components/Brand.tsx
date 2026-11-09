import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`brand__mark ${className}`.trim()} viewBox="0 0 40 40" aria-hidden focusable="false">
      <defs>
        <linearGradient id="aquarisMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8fff9" />
          <stop offset="0.45" stopColor="#4fe8da" />
          <stop offset="1" stopColor="#0f8fa3" />
        </linearGradient>
      </defs>
      <path
        d="M20 2.6c7.7 9 12.8 15.4 12.8 21.4A12.8 12.8 0 0 1 7.2 24c0-6 5.1-12.4 12.8-21.4Z"
        fill="url(#aquarisMark)"
      />
      <path
        d="M13.6 23.6c3.6 2.8 9.2 2.8 12.8 0M15.6 28.2c2.5 1.6 6.3 1.6 8.8 0"
        stroke="#032b36"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M20 9.5c3.4 4 5.6 6.9 5.6 9.5a5.6 5.6 0 0 1-11.2 0c0-2.6 2.2-5.5 5.6-9.5Z"
        fill="#ffffff"
        opacity="0.18"
      />
    </svg>
  );
}

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`brand ${className}`.trim()} aria-label="AQUARIS — home">
      <LogoMark />
      <span className="brand__text">
        <span>AQUARIS</span>
        <span className="brand__sub">TABLE WATER</span>
      </span>
    </Link>
  );
}
