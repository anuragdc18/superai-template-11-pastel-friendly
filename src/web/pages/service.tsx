import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { findService, serviceUrl, waLink } from "../lib/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { telHref, useSite } from "../queries/site";
import { CtaBand } from "./index";
import { Cutout, Sparkle } from "../components/pastel";

const STEPS = [
  { title: "Free Call", text: "Tell us what you need. We explain everything simply." },
  { title: "Share Details", text: "Send documents or details on WhatsApp. No office visit." },
  { title: "We Do the Work", text: "Our expert handles it and updates you on every step." },
  { title: "Done", text: "You get the final certificate / files on WhatsApp and email." },
];

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line rounded-[22px] border border-line bg-white">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy"
          >
            {f.q}
            <ChevronDown className={`h-5 w-5 shrink-0 text-royal transition ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="px-5 pb-5 text-[15px] leading-relaxed">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

function Block({ icon: Icon, title, children }: { icon: typeof Users; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[24px] bg-surface p-6 ring-1 ring-line sm:p-7">
      <h2 className="flex items-center gap-3 text-[22px] font-bold">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-royal shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Ticks({ items, cols = false }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`grid gap-3 ${cols ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[15.5px] text-navy">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wa" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function ServicePage() {
  const { cat: catSlug, service: serviceSlug } = useParams<{ cat: string; service: string }>();
  const { cat, service } = findService(catSlug, serviceSlug);
  const site = useSite();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [catSlug, serviceSlug]);

  if (!cat || !service) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <Link to={cat ? `/services/${cat.slug}` : "/"} className="btn-brand mt-6">
          {cat ? `See all ${cat.title}` : "Go Home"}
        </Link>
      </div>
    );
  }

  const who = service.who ?? cat.who;
  const includes = service.includes ?? cat.includes;
  const docs = service.docs ?? cat.docs;
  const related = cat.services.filter((s) => s.name !== service.name).slice(0, 4);
  const isCert = cat.slug === "microsoft-certifications";
  const faqs = [
    ...(isCert ? [] : [{
      q: `How long does ${service.name} take?`,
      a: service.days
        ? `Usually ${service.days}. We tell you the exact timeline on the free call.`
        : "It depends on your needs. We give you a clear timeline on the free call.",
    }]),
    { q: "How much does it cost?", a: "The price depends on your needs. Our expert shares a clear price on the free call — no hidden charges." },
    { q: "Do I need to visit your office?", a: "No. Everything is done online — on phone and WhatsApp — from anywhere in India." },
    { q: "Will you help after the work is done?", a: "Yes. You can call or WhatsApp us any time if you have questions later." },
  ];

  return (
    <>
      <section className="pastel-grad relative overflow-hidden">
        <div aria-hidden className="blob absolute -left-20 top-10 h-64 w-64 bg-[#dbeafe]/70" />
        <div className="container-x relative grid items-end gap-6 pt-10 [&>*]:min-w-0 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="pb-12 lg:pb-16">
            <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-body">
              <Link to="/" className="hover:text-royal">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={`/services/${cat.slug}`} className="hover:text-royal">{cat.title}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-navy">{service.name}</span>
            </nav>
            <h1 className="rise mt-5 max-w-2xl text-[36px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[50px]">{service.name}</h1>
            <p className="rise mt-4 max-w-xl text-[17px] leading-relaxed" style={{ animationDelay: "100ms" }}>
              {service.text}
            </p>
            <div className="rise mt-6 flex flex-wrap gap-2.5 text-[13.5px] font-medium text-navy" style={{ animationDelay: "160ms" }}>
              {service.days && (
                <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 ring-1 ring-line">
                  <Clock className="h-4 w-4 text-brand" /> {service.days}
                </span>
              )}
              <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 ring-1 ring-line">
                <ShieldCheck className="h-4 w-4 text-wa" /> 100% online
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 ring-1 ring-line">
                <Headphones className="h-4 w-4 text-royal" /> Free expert call
              </span>
            </div>
            <div className="rise mt-8 flex flex-wrap gap-3 lg:hidden" style={{ animationDelay: "220ms" }}>
              <a href="#get-started" className="btn-brand">Get Free Consultation <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="relative mx-auto hidden h-[320px] w-full max-w-[380px] lg:block">
            <div aria-hidden className="blob absolute bottom-0 left-[8%] right-[8%] top-[16%] bg-peach" />
            <Sparkle className="absolute left-2 top-10" />
            <Cutout src={cat.image} eager className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-6">
            <Block icon={Users} title="Who Is This For?">
              <Ticks items={who} />
            </Block>

            <Block icon={BadgeCheck} title="What You Get">
              <Ticks items={includes} cols />
            </Block>

            {docs && docs.length > 0 && (
              <Block icon={FileText} title="Documents Needed">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {docs.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 text-[15px] text-navy ring-1 ring-line">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-royal" /> {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px]">Not sure about a document? Don't worry — we'll guide you on the call.</p>
              </Block>
            )}

            <Block icon={Clock} title="How It Works">
              <ol className="grid gap-4 sm:grid-cols-2">
                {STEPS.map((st, i) => (
                  <li key={st.title} className="flex gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-[15px] font-bold text-white">{i + 1}</span>
                    <span>
                      <span className="block font-semibold text-navy">{st.title}</span>
                      <span className="block text-[14.5px] leading-relaxed">{st.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Block>

            <div>
              <h2 className="mb-4 text-[22px] font-bold">Common Questions</h2>
              <Faq items={faqs} />
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="mb-4 text-[22px] font-bold">Related Services</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.name}
                      to={serviceUrl(cat.slug, r.name)}
                      className="group flex items-center justify-between gap-3 rounded-2xl bg-sky px-4 py-3.5 ring-1 ring-line hover:ring-royal/40"
                    >
                      <span>
                        <span className="block font-semibold text-navy">{r.name}</span>
                        {r.days && <span className="block text-[13px] text-slate-500">{r.days}</span>}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand transition group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside id="get-started" className="scroll-mt-28 space-y-4 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_30px_60px_-34px_rgba(20,33,78,0.45)]">
              <div className="bg-[linear-gradient(115deg,#1455ed,#4f8bff)] px-6 py-5">
                <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white/80">Get Started</p>
                <h3 className="mt-1 text-xl font-bold !text-white">Talk to an Expert — Free</h3>
                <p className="mt-1 text-[14px] text-white/85">We'll call you back within 30 minutes.</p>
              </div>
              <div className="p-6">
                <LeadForm key={service.name} layout="stack" source={`service:${serviceSlug}`} defaultService={service.name} cta="Get Free Call" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={telHref(site.phone)} className="flex items-center justify-center gap-2 rounded-full bg-white py-3 font-semibold text-navy ring-1 ring-line hover:ring-royal/40">
                <Phone className="h-4 w-4 text-royal" /> Call Us
              </a>
              <a
                href={waLink(site.whatsapp, `Hi, I need help with ${service.name}`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-wa py-3 font-semibold text-white hover:brightness-95"
              >
                <WaIcon /> WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
