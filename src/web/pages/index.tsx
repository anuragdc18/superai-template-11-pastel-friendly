import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Clock,
  FileText,
  GraduationCap,
  Headphones,
  Heart,
  IndianRupee,
  MapPin,
  Minus,
  Monitor,
  PenTool,
  Plus,
  Printer,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Upload,
  Users,
  ClipboardList,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink } from "../lib/site";
import { asset } from "../lib/demo";
import { useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { useContent } from "../queries/content";
import { PostCard } from "../components/content-ui";
import { Burst, CheckCard, Cutout, GoogleG, Hand, SectionHead, Sparkle, Squiggle, TINTS } from "../components/pastel";

export const CAT_ICONS: Record<string, LucideIcon> = {
  registration: FileText,
  branding: PenTool,
  design: Printer,
  "social-media": Heart,
  website: Monitor,
  "ai-tools": Bot,
  "microsoft-certifications": GraduationCap,
};

/* ───────────────────────── 1. Hero (5 rotating slides, one cut-out photo each) ───────────────────────── */

type HeroSlide = { tab: string; tag: string; title: string; text: string; cta: string; link: string; image: string; checks: string[]; note: string };

const slideFor = (link: string) => SLIDES.find((s) => s.link === link)!;
const fromSlide = (link: string, image: string, checks: string[], note: string, tab?: string): HeroSlide => {
  const s = slideFor(link);
  return { tab: tab ?? s.tag, tag: s.tag, title: s.title, text: s.text, cta: s.cta || s.linkText, link: s.cta ? "#enquiry" : s.link, image, checks, note };
};

const HERO: HeroSlide[] = [
  {
    tab: "All Services",
    tag: "Business Services · 100% Online",
    title: "Everything Your Business Needs",
    text: "Registration, logo & branding, websites, social media, AI tools and Microsoft certifications — all in one place, handled by experts, 100% online.",
    cta: "Get Free Consultation",
    link: "#enquiry",
    image: "/images/hero-all.webp",
    checks: ["Registration to marketing", "Expert guidance at every step", "Reply within 30 minutes"],
    note: "Start · Build · Grow · Together",
  },
  fromSlide("/services/registration", "/images/hero-registration.webp", ["GST, Company, LLP & more", "Documents checked by experts", "Updates on WhatsApp"], "Start the right way!", "Registration"),
  fromSlide("/services/branding", "/images/hero-branding.webp", ["Logo, cards & brand kit", "2–3 design options", "Print-ready files"], "Look pro from day one", "Branding"),
  fromSlide("/services/website", "/images/hero-website.webp", ["Mobile-friendly websites", "Instagram & Facebook handled", "More enquiries"], "Get found online!", "Website & Social"),
  fromSlide("/services/microsoft-certifications", "/images/hero-microsoft.webp", ["Better career opportunities", "Globally recognised certification", "Guidance in simple language"], "Learn · Build · Grow", "Microsoft"),
];

const HERO_FEATURES = [
  { icon: Headphones, a: "Expert", b: "Guidance" },
  { icon: Smartphone, a: "Fully", b: "Online" },
  { icon: Clock, a: "Reply in", b: "30 Minutes" },
];

function HeroCta({ s }: { s: HeroSlide }) {
  return s.link.startsWith("#") ? (
    <a href={s.link} className="btn-brand">
      {s.cta} <ArrowRight className="h-4 w-4" />
    </a>
  ) : (
    <Link to={s.link} className="btn-brand">
      {s.cta} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % HERO.length), 5000);
    return () => clearTimeout(t);
  }, [i, paused]);
  const s = HERO[i];
  const words = s.title.split(" ");
  const split = words.length > 3 ? words.length - 2 : words.length - 1;

  return (
    <section className="pastel-grad relative overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* soft pastel blobs */}
      <div aria-hidden className="blob absolute -left-24 top-24 h-72 w-72 bg-[#dbeafe]/70" />
      <div aria-hidden className="absolute -bottom-20 left-[38%] h-56 w-56 rounded-full bg-[#ffe8d9]/60 blur-2xl" />

      <div className="container-x relative grid items-center gap-6 pb-24 pt-10 lg:grid-cols-[1.02fr_1fr] lg:pb-28 lg:pt-14 [&>*]:min-w-0">
        <div className="relative z-10">
          {/* topic tabs */}
          <div role="tablist" aria-label="Choose a topic" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {HERO.map((h, k) => (
              <button
                key={h.tab}
                role="tab"
                aria-selected={k === i}
                onClick={() => setI(k)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${
                  k === i ? "bg-navy text-white shadow-[0_8px_18px_-10px_rgba(20,33,78,0.8)]" : "bg-white text-navy ring-1 ring-line hover:ring-royal/40"
                }`}
              >
                {h.tab}
              </button>
            ))}
          </div>

          <p key={`t${i}`} className="rise mt-7 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-semibold text-royal ring-1 ring-line">
            <Sparkles className="h-3.5 w-3.5" /> {s.tag}
          </p>
          <h1 key={`h${i}`} className="rise mt-4 text-[40px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[54px] lg:text-[60px]" style={{ animationDelay: "60ms" }}>
            {words.slice(0, split).join(" ")} <span className="relative whitespace-nowrap text-royal">
              {words.slice(split).join(" ")}
              <Burst className="absolute -right-9 -top-3 hidden h-8 w-8 sm:block" color="#FFC23D" />
            </span>
          </h1>
          <p key={`p${i}`} className="rise mt-5 max-w-[520px] text-[16.5px] leading-relaxed" style={{ animationDelay: "120ms" }}>
            {s.text}
          </p>

          <div className="rise mt-6 flex flex-wrap gap-x-6 gap-y-3" style={{ animationDelay: "160ms" }}>
            {HERO_FEATURES.map((f) => (
              <span key={f.a} className="flex items-center gap-2.5 text-[13px] leading-tight text-navy">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-royal ring-1 ring-line">
                  <f.icon className="h-5 w-5" />
                </span>
                <span>
                  {f.a}
                  <br />
                  <span className="font-semibold">{f.b}</span>
                </span>
              </span>
            ))}
          </div>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "200ms" }}>
            <HeroCta s={s} />
            <Link to="/contact" className="btn-soft">Talk to an Expert</Link>
          </div>

          <div className="mt-8 flex items-center gap-2" aria-hidden>
            {HERO.map((h, k) => (
              <button key={h.tab} tabIndex={-1} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-9 bg-brand" : "w-2.5 bg-navy/15 hover:bg-navy/30"}`} />
            ))}
          </div>
        </div>

        {/* right: cut-out person + floating checklist */}
        <div className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[500px] lg:h-[560px]">
          <div aria-hidden className="blob absolute bottom-0 left-1/2 h-[78%] w-[86%] -translate-x-1/2 bg-[#ffe9d6]" />
          <div aria-hidden className="absolute bottom-[8%] right-[2%] h-28 w-28 rounded-full bg-[#dfe9ff]" />
          <Sparkle className="absolute left-[10%] top-[18%] h-7 w-7" />
          <Sparkle className="absolute right-[6%] top-[46%] h-5 w-5" color="var(--color-royal)" />
          {HERO.map((h, k) => (
            <Cutout
              key={h.image}
              src={asset(h.image)}
              eager={k === 0}
              className={`absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div key={`n${i}`} className="rise absolute left-0 top-[4%] hidden sm:block">
            <Hand arrow="down-right" rotate={-8} className="max-w-[150px] text-[23px] text-royal">{s.note}</Hand>
          </div>
          <div key={`c${i}`} className="rise absolute right-0 top-[6%] hidden w-[235px] sm:block" style={{ animationDelay: "120ms" }}>
            <CheckCard items={s.checks} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 2. Lead form card with pointing person ───────────────────────── */

function FormCard() {
  return (
    <section id="enquiry" className="relative z-10 scroll-mt-28">
      <div className="container-x -mt-16">
        <div className="relative grid items-center gap-4 rounded-[28px] bg-white p-5 [&>*]:min-w-0 shadow-[0_30px_60px_-28px_rgba(20,33,78,0.35)] ring-1 ring-line sm:p-7 lg:grid-cols-[170px_1fr] lg:gap-6 lg:py-6">
          <div className="relative hidden h-[170px] lg:block">
            <div aria-hidden className="absolute bottom-0 left-2 h-32 w-32 rounded-full bg-lemon" />
            <Cutout src={asset("/images/form-person.webp")} className="absolute bottom-0 left-0 h-[190px] w-auto max-w-none" />
          </div>
          <div>
            <h2 className="text-[22px] font-extrabold sm:text-[26px]">
              Get a Free <span className="text-royal">Call</span> from Our Expert
            </h2>
            <p className="mb-5 mt-1 text-[14.5px]">Tell us what you need and we'll guide you.</p>
            <LeadForm cta="Call Me Back" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3. Stats with doodles ───────────────────────── */

const STATS = [
  { icon: null, big: "4.8", small: "Google Rating", tone: "" },
  { icon: Users, big: "1,000+", small: "Happy Clients", tone: "bg-sky text-royal" },
  { icon: MapPin, big: "Pan-India", small: "Service", tone: "bg-lav text-[#7a5af5]" },
  { icon: ShieldCheck, big: "100%", small: "Online Process", tone: "bg-mint text-[#16a34a]" },
];

function Stats() {
  return (
    <section className="relative py-12">
      <Burst className="absolute left-[3%] top-12 hidden h-10 w-10 -rotate-90 lg:block" color="#ef4444" />
      <Squiggle className="absolute right-[3%] top-12 hidden lg:block" />
      <div className="container-x">
        <div className="grid grid-cols-2 gap-y-6 rounded-[24px] bg-surface px-4 py-6 ring-1 ring-line md:grid-cols-4">
          {STATS.map((s, k) => (
            <div key={s.small} className={`flex items-center justify-center gap-3 ${k ? "md:border-l md:border-line" : ""}`}>
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${s.icon ? s.tone : "bg-white ring-1 ring-line"}`}>
                {s.icon ? <s.icon className="h-6 w-6" /> : <GoogleG />}
              </span>
              <span>
                <span className="block text-[20px] font-extrabold leading-tight text-navy">{s.big}</span>
                <span className="text-[13px]">{s.small}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. Services: swipeable pastel cards ───────────────────────── */

function ServicesCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const update = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  };
  const go = (d: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: d * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };
  useEffect(update, []);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="container-x">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Our Services" title="What Do You Need" accent="Help With?" text="Swipe through the categories. Each one has a clear list of services." align="left" className="!mb-0" />
          <div className="flex items-center gap-5">
            <Hand arrow="down-left" rotate={-7} className="hidden text-[22px] text-navy lg:inline-block">Everything your business<br />needs – in one place!</Hand>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} disabled={atStart} aria-label="Previous categories" className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy ring-1 ring-line transition hover:bg-navy hover:text-white disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-navy">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button onClick={() => go(1)} disabled={atEnd} aria-label="Next categories" className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-[0_10px_22px_-10px_rgba(255,106,31,0.8)] transition hover:bg-brand-dark disabled:opacity-35">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div ref={track} onScroll={update} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 pt-6 sm:mx-0 sm:px-0">
          {CATEGORIES.map((c, k) => {
            const Icon = CAT_ICONS[c.slug] ?? FileText;
            const t = TINTS[k % TINTS.length];
            return (
              <Link
                key={c.slug}
                data-card
                to={`/services/${c.slug}`}
                className={`group relative flex h-[340px] w-[84%] shrink-0 snap-start flex-col overflow-visible rounded-[26px] ${t.bg} p-6 ring-1 ${t.ring} transition hover:-translate-y-1 hover:shadow-[0_26px_46px_-26px_rgba(20,33,78,0.45)] sm:w-[calc((100%-20px)/2.2)] lg:w-[calc((100%-60px)/3.45)]`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${t.icon} shadow-sm`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 max-w-[58%] text-[21px] font-bold leading-tight">{c.title}</h3>
                <p className="mt-2 max-w-[52%] text-[13.5px] leading-snug">{c.short}</p>
                <span className="mt-2 text-[12.5px] font-semibold text-navy/60">
                  {c.services.length} {c.slug === "microsoft-certifications" ? "exams" : "services"}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand transition group-hover:gap-2.5">
                  View Services <ArrowRight className="h-4 w-4" />
                </span>
                <Cutout src={c.image} className="absolute bottom-0 right-0 h-[82%] w-[58%] object-bottom transition duration-500 group-hover:scale-[1.04]" />
              </Link>
            );
          })}
          <div className="w-1 shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. Microsoft banner ───────────────────────── */

const MS = CATEGORIES.find((c) => c.slug === "microsoft-certifications")!;

function MicrosoftBanner() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(110deg,#e3f0ff_0%,#eef4ff_45%,#f3eefe_100%)] ring-1 ring-line">
          <div className="grid items-end gap-4 lg:grid-cols-[1.25fr_0.9fr_0.75fr] [&>*]:min-w-0">
            <div className="relative z-10 p-7 sm:p-10">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-royal shadow-[0_14px_30px_-16px_rgba(20,33,78,0.5)]">
                  <GraduationCap className="h-8 w-8" />
                </span>
                <h2 className="text-[26px] font-extrabold leading-tight sm:text-[32px]">{MS.title}</h2>
              </div>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed">{MS.short}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {MS.services.map((s) => (
                  <Link key={s.name} to={serviceUrl(MS.slug, s.name)} className="rounded-full bg-white px-3 py-1 text-[12.5px] font-bold text-navy ring-1 ring-line hover:text-royal hover:ring-royal/40">
                    {s.name.split(":")[0]}
                  </Link>
                ))}
              </div>
              <Link to={`/services/${MS.slug}`} className="btn-brand mt-7">
                View All Exams <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative hidden h-[330px] lg:block">
              <div aria-hidden className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-white/70" />
              <Cutout src={asset("/images/cat-microsoft.webp")} className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2" />
              <Burst className="absolute right-6 top-8" color="#FFC23D" />
            </div>
            <div className="relative z-10 px-7 pb-8 sm:px-10 lg:px-0 lg:pb-10 lg:pr-10">
              <CheckCard items={["Learn at your pace", "Practice tests", "Exam booking support", "Globally recognised"]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. Service menu (all services, restaurant-menu style) ───────────────────────── */

const POPULAR_NAMES = new Set(POPULAR.map((p) => p.name));

function ServiceMenu() {
  const [active, setActive] = useState(CATEGORIES[0].slug);
  const cat = CATEGORIES.find((c) => c.slug === active)!;
  const Icon = CAT_ICONS[cat.slug] ?? FileText;
  const half = Math.ceil(cat.services.length / 2);
  const cols = [cat.services.slice(0, half), cat.services.slice(half)];
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-x">
        <SectionHead eyebrow="Service Menu" title="Pick Anything From" accent="Our Menu" text="Every service we offer, with the usual time it takes. Starred ones are what most customers choose." />
        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-[13.5px] font-semibold transition ${
                active === c.slug ? "bg-brand text-white shadow-[0_10px_20px_-10px_rgba(255,106,31,0.8)]" : "bg-white text-navy ring-1 ring-line hover:ring-brand/40"
              }`}
            >
              {c.menu}
            </button>
          ))}
        </div>

        <div className="relative mx-auto max-w-5xl rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-36px_rgba(20,33,78,0.45)] ring-1 ring-line sm:p-10">
          <Sparkle className="absolute -top-3 right-10 h-7 w-7" />
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b-2 border-dashed border-line pb-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky text-royal">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-[22px] font-bold leading-tight">{cat.title}</h3>
                <p className="text-[13.5px]">{cat.short}</p>
              </div>
            </div>
            <Link to={`/services/${cat.slug}`} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-royal hover:gap-2.5">
              Open {cat.menu} page <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div key={cat.slug} className="rise grid gap-x-12 md:grid-cols-2">
            {cols.map((col, ci) => (
              <ul key={ci} className="space-y-1">
                {col.map((s) => (
                  <li key={s.name}>
                    <Link to={serviceUrl(cat.slug, s.name)} className="group flex items-baseline gap-2 rounded-xl px-2 py-2.5 transition hover:bg-surface">
                      <span className="flex items-center gap-1.5 font-semibold text-navy group-hover:text-royal">
                        {POPULAR_NAMES.has(s.name) && <Star className="h-3.5 w-3.5 shrink-0 fill-[#FFC23D] text-[#FFC23D]" aria-label="Most popular" />}
                        <span className="text-[15px]">{s.name.replace(/:.*/, "")}</span>
                      </span>
                      <span className="dots-leader h-3 min-w-6 flex-1" aria-hidden />
                      <span className="shrink-0 text-[13px] font-medium text-body">{s.days ?? "Ask us"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-[13px]">
            <Star className="h-3.5 w-3.5 fill-[#FFC23D] text-[#FFC23D]" /> Most popular with our customers
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. Process: 3 cut-out characters ───────────────────────── */

const STEPS = [
  { img: "/images/step-1.webp", icon: ClipboardList, title: "Tell Us What You Need", text: "Fill the form or call us. It takes 1 minute.", tint: "bg-peach" },
  { img: "/images/step-2.webp", icon: Upload, title: "Share Your Documents", text: "Send them on WhatsApp or email. No office visit needed.", tint: "bg-sky" },
  { img: "/images/step-3.webp", icon: BadgeCheck, title: "We Get It Done", text: "You get updates at every step until it's complete.", tint: "bg-mint" },
];

function Process() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <SectionHead eyebrow="How It Works" title="Simple" accent="3-Step Process" text="Get started in 3 easy steps. No technical knowledge needed." />
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, k) => (
            <div key={s.title} className="relative text-center">
              <div className="relative mx-auto h-[250px] w-[250px]">
                <div aria-hidden className={`blob absolute inset-x-4 bottom-0 top-10 ${s.tint}`} />
                <Cutout src={asset(s.img)} className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2" />
                <span className="absolute left-3 top-8 grid h-11 w-11 place-items-center rounded-full bg-brand text-[17px] font-extrabold text-white ring-4 ring-white">{k + 1}</span>
              </div>
              {k < STEPS.length - 1 && (
                <svg viewBox="0 0 120 30" className="absolute -right-[18%] top-[110px] hidden h-8 w-[36%] text-navy/35 md:block" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 7" strokeLinecap="round" aria-hidden>
                  <path d="M4 18c30-14 70-14 104-2" />
                  <path d="M100 8l10 8-12 4" strokeDasharray="0" />
                </svg>
              )}
              <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-brand">Step {k + 1}</p>
              <h3 className="mt-1 text-[20px] font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[260px] text-[14.5px]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. Trust + reviews ───────────────────────── */

const WHY = [
  { icon: Sparkles, title: "One place for everything", text: "Registration, branding, website and marketing — no running around.", tone: "bg-peach text-brand" },
  { icon: IndianRupee, title: "Clear pricing", text: "You know the full cost before we start. No hidden charges.", tone: "bg-sky text-royal" },
  { icon: Smartphone, title: "Fully online", text: "Do everything from your phone, from anywhere in India.", tone: "bg-mint text-[#16a34a]" },
  { icon: Headphones, title: "Real experts", text: "CA, CS and design experts guide you at every step.", tone: "bg-lav text-[#7a5af5]" },
];


const REVIEW_TONES = ["bg-royal", "bg-brand", "bg-[#16a34a]"];

function TrustReviews() {
  const site = useSite();
  const content = useContent();
  const rs = content.reviewsSection;
  const REVIEWS = rs.show ? content.reviews.slice(0, 3) : [];
  return (
    <section className="pastel-grad py-16 sm:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-[0.95fr_1.25fr] lg:items-start [&>*]:min-w-0">
        <div>
          <p className="mb-2 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-brand">Why {site.siteName}?</p>
          <h2 className="text-[30px] font-extrabold leading-tight sm:text-[38px]">
            Why Businesses <span className="text-royal">Trust Us</span>
          </h2>
          <ul className="mt-8 space-y-5">
            {WHY.map((w) => (
              <li key={w.title} className="flex gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${w.tone}`}>
                  <w.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-navy">{w.title}</span>
                  <span className="block text-[14.5px]">{w.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="relative mt-8 inline-block">
            <span className="relative inline-block rounded-[22px] rounded-bl-md bg-lemon px-5 py-3 ring-1 ring-[#f6e3a1]">
              <Hand rotate={-3} className="text-[25px]">Simple. Transparent. Reliable.</Hand>
            </span>
            <Sparkle className="absolute -right-6 -top-4" />
          </div>
        </div>

        {REVIEWS.length > 0 && (
        <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-36px_rgba(20,33,78,0.45)] ring-1 ring-line sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[21px] font-bold">What Our Clients Say</h3>
            {rs.rating && (
              <a href={rs.googleUrl || undefined} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[14px] font-semibold text-navy">
                <GoogleG className="h-5 w-5" /> {rs.rating}
                <span className="flex text-[#FFB020]">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-4 w-4 fill-current" />)}</span>
                <span className="font-normal text-body">on Google{rs.ratingCount ? ` (${rs.ratingCount})` : ""}</span>
              </a>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {REVIEWS.map((r, k) => (
              <figure key={r.id} className={`rounded-2xl bg-surface p-5 ring-1 ring-line ${k === 2 ? "sm:col-span-2" : ""}`}>
                <div className="flex text-[#FFB020]">{Array.from({ length: r.rating }, (_, x) => <Star key={x} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-[14.5px] leading-relaxed text-navy">"{r.text}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-full text-[15px] font-bold text-white ${REVIEW_TONES[k % 3]}`}>{r.name[0]}</span>
                  <span>
                    <span className="block text-[14.5px] font-semibold text-navy">{r.name}</span>
                    <span className="text-[12.5px]">{r.place}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Latest blog posts ───────────────────────── */

function LatestPosts() {
  const content = useContent();
  if (!content.blog.show || !content.posts.length) return null;
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow={content.blog.title || "Blog"} title="Tips &" accent="Guides" align="left" className="!mb-8" />
          <Link to="/blog" className="mb-8 inline-flex items-center gap-1.5 font-semibold text-royal hover:gap-2.5">
            See all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.posts.slice(0, 3).map((p) => (
            <PostCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9. FAQ with helper person ───────────────────────── */


function FaqHelp() {
  const [open, setOpen] = useState<number | null>(0);
  const FAQS = useContent().faqs;
  if (!FAQS.length) return null;
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center [&>*]:min-w-0">
        <div className="relative mx-auto h-[360px] w-full max-w-[380px] sm:h-[420px]">
          <div aria-hidden className="blob absolute bottom-0 left-6 right-6 top-20 bg-sky" />
          <span aria-hidden className="font-hand absolute left-0 top-10 text-[64px] font-bold leading-none text-[#ef4444]">?</span>
          <span aria-hidden className="font-hand absolute right-4 top-0 text-[44px] font-bold leading-none text-royal">?</span>
          <Cutout src={asset("/images/faq-person.webp")} className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-[62%]" />
          <div className="absolute right-0 top-[18%] w-[150px] rounded-[22px] rounded-bl-md bg-lemon px-4 py-3 shadow-[0_14px_30px_-18px_rgba(20,33,78,0.5)] ring-1 ring-[#f6e3a1]">
            <Hand rotate={-4} className="text-[22px]">Got more questions? We're here to help!</Hand>
          </div>
        </div>
        <div>
          <SectionHead eyebrow="FAQ" title="Common" accent="Questions" align="left" className="!mb-7" />
          <div className="space-y-3">
            {FAQS.map((f, k) => {
              const isOpen = open === k;
              return (
                <div key={f.id} className={`rounded-2xl bg-white ring-1 transition ${isOpen ? "ring-royal/30 shadow-[0_18px_36px_-24px_rgba(20,85,237,0.45)]" : "ring-line"}`}>
                  <button onClick={() => setOpen(isOpen ? null : k)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-5 py-4 text-left font-semibold text-navy">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${isOpen ? "bg-royal text-white" : "bg-sky text-royal"}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                    {f.q}
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-[60px] text-[14.5px]">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 10. CTA (also used on category/service pages) ───────────────────────── */

export function CtaBand() {
  const site = useSite();
  return (
    <section className="pb-16 pt-10 sm:pb-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(115deg,#1455ed_0%,#2f6df6_55%,#4f8bff_100%)] px-6 pt-10 text-white sm:px-10 lg:pt-0">
          <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="grid items-end gap-6 lg:grid-cols-[0.8fr_1.4fr_0.8fr] [&>*]:min-w-0">
            <div className="relative order-3 mx-auto h-[230px] w-[230px] lg:order-1 lg:h-[270px] lg:w-full">
              <div aria-hidden className="absolute inset-x-[8%] bottom-0 top-[6%] rounded-t-full bg-white lg:inset-x-[12%]" />
              <Cutout src={asset("/images/cta-person.webp")} className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2" />
            </div>
            <div className="order-1 text-center lg:order-2 lg:py-12 lg:text-left">
              <h2 className="text-[28px] font-extrabold leading-tight !text-white sm:text-[36px]">Ready to Grow Your Business?</h2>
              <p className="mt-2 text-[16px] text-white/85">Talk to our expert today. The first consultation is free.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link to="/contact" className="btn-brand">
                  Get Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={waLink(site.whatsapp, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-wa px-7 py-3 font-semibold text-white shadow-[0_12px_24px_-12px_rgba(37,211,102,0.9)] transition hover:-translate-y-0.5 hover:brightness-95">
                  <WaIcon /> WhatsApp Us
                </a>
              </div>
            </div>
            <div className="order-2 pb-2 lg:order-3 lg:pb-12">
              <CheckCard items={["No obligation", "Quick response", "Friendly support"]} className="mx-auto max-w-[240px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <FormCard />
      <Stats />
      <ServicesCarousel />
      <MicrosoftBanner />
      <ServiceMenu />
      <Process />
      <TrustReviews />
      <LatestPosts />
      <FaqHelp />
      <CtaBand />
    </>
  );
}
