import { CheckCircle2 } from "lucide-react";
import { CUTOUT_TRANSPARENT } from "../lib/cutout";

/** A person/object photo shown as a cut-out (see lib/cutout.ts). */
export function Cutout({ src, alt = "", className = "", eager = false, style }: { src: string; alt?: string; className?: string; eager?: boolean; style?: React.CSSProperties }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      style={style}
      className={`${CUTOUT_TRANSPARENT ? "cutout-sticker" : "cutout"} pointer-events-none select-none object-contain ${className}`}
    />
  );
}

/** Handwritten note with an optional curly arrow. */
export function Hand({ children, className = "", arrow, rotate = -6 }: { children: React.ReactNode; className?: string; arrow?: "down-left" | "down-right" | "left" | "right"; rotate?: number }) {
  return (
    <span className={`font-hand pointer-events-none relative inline-block text-[24px] leading-[1.05] text-navy ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
      {arrow && <CurlyArrow dir={arrow} />}
    </span>
  );
}

function CurlyArrow({ dir }: { dir: "down-left" | "down-right" | "left" | "right" }) {
  const pos =
    dir === "down-left"
      ? "-bottom-9 left-2 -scale-x-100"
      : dir === "down-right"
        ? "-bottom-9 right-2"
        : dir === "left"
          ? "-left-14 top-1 -scale-x-100 rotate-[-60deg]"
          : "-right-14 top-1 rotate-[-60deg]";
  return (
    <svg viewBox="0 0 60 40" className={`absolute h-9 w-14 ${pos}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
      <path d="M4 6c10 2 22 8 28 18 3 5 6 9 14 10" />
      <path d="M38 30l9 4-3-9" />
    </svg>
  );
}

/** Small burst / sparkle doodles. */
export function Burst({ className = "", color = "var(--color-brand)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`pointer-events-none h-8 w-8 ${className}`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" aria-hidden>
      <path d="M20 4v8M8 10l5 6M32 10l-5 6M4 22h8M28 22h8" />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#FFC23D" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none h-6 w-6 ${className}`} fill={color} aria-hidden>
      <path d="M12 1.5c.7 4.9 2.6 6.8 7.5 7.5-4.9.7-6.8 2.6-7.5 7.5-.7-4.9-2.6-6.8-7.5-7.5 4.9-.7 6.8-2.6 7.5-7.5z" />
    </svg>
  );
}

export function Squiggle({ className = "", color = "#22C55E" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`pointer-events-none h-9 w-9 ${className}`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" aria-hidden>
      <path d="M6 10l10-4M8 22l14-2M10 34l10-6" />
    </svg>
  );
}

/** Centered section heading with an orange eyebrow and a blue highlighted end. */
export function SectionHead({ eyebrow, title, accent, text, align = "center", className = "" }: { eyebrow?: string; title: string; accent?: string; text?: string; align?: "center" | "left"; className?: string }) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} mb-10 max-w-2xl ${className}`}>
      {eyebrow && <p className="mb-2 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>}
      <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[40px]">
        {title} {accent && <span className="text-royal">{accent}</span>}
      </h2>
      {text && <p className="mt-3 text-[16px] leading-relaxed">{text}</p>}
    </div>
  );
}

/** White checklist card with green/blue ticks. */
export function CheckCard({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgba(20,33,78,0.35)] ring-1 ring-line ${className}`}>
      {items.map((t, i) => (
        <li key={t} className="flex items-center gap-2.5 text-[13.5px] font-medium leading-snug text-navy">
          <CheckCircle2 className={`h-5 w-5 shrink-0 ${i % 2 ? "text-wa" : "text-royal"}`} />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function GoogleG({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** Pastel tint + matching icon colour per category (cycled by index). */
export const TINTS = [
  { bg: "bg-peach", ring: "ring-[#ffd9c2]", icon: "bg-brand text-white" },
  { bg: "bg-mint", ring: "ring-[#bfe9d1]", icon: "bg-wa text-white" },
  { bg: "bg-sky", ring: "ring-[#c4defb]", icon: "bg-royal text-white" },
  { bg: "bg-rose", ring: "ring-[#f8c9d7]", icon: "bg-[#ef4f7f] text-white" },
  { bg: "bg-lav", ring: "ring-[#d9cffa]", icon: "bg-[#7a5af5] text-white" },
  { bg: "bg-lemon", ring: "ring-[#f6e3a1]", icon: "bg-[#f2a516] text-white" },
  { bg: "bg-sky", ring: "ring-[#c4defb]", icon: "bg-navy text-white" },
];
