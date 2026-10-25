import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { CATEGORIES, serviceUrl, slugify } from "../lib/site";
import { LeadForm } from "../components/lead-form";
import { CAT_ICONS, CtaBand } from "./index";
import { Cutout, Sparkle, TINTS } from "../components/pastel";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
        el.classList.add("ring-2", "ring-brand");
        setTimeout(() => el.classList.remove("ring-2", "ring-brand"), 2200);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [slug]);

  const idx = Math.max(0, CATEGORIES.findIndex((c) => c.slug === slug));
  const tint = TINTS[idx % TINTS.length];
  const Icon = CAT_ICONS[slug] ?? CheckCircle2;

  if (!cat) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link to="/" className="btn-brand mt-6">Go Home</Link>
      </div>
    );
  }

  return (
    <>
      <section className="pastel-grad relative overflow-hidden">
        <div aria-hidden className="blob absolute -left-20 top-10 h-64 w-64 bg-[#dbeafe]/70" />
        <div className="container-x relative grid items-end gap-6 pt-10 [&>*]:min-w-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="pb-12 lg:pb-16">
            <nav className="flex items-center gap-1.5 text-[13px] text-body">
              <Link to="/" className="hover:text-royal">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-navy">{cat.title}</span>
            </nav>
            <span className="rise mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-semibold text-royal ring-1 ring-line">
              <Icon className="h-3.5 w-3.5" /> {cat.services.length} {cat.slug === "microsoft-certifications" ? "exams" : "services"}
            </span>
            <h1 className="rise mt-4 max-w-2xl text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[52px]">{cat.title}</h1>
            <p className="rise mt-4 max-w-xl text-[16.5px] leading-relaxed" style={{ animationDelay: "100ms" }}>{cat.intro}</p>
            <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
              <a href="#enquire" className="btn-brand">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="btn-soft">Talk to an Expert</Link>
            </div>
          </div>
          <div className="relative mx-auto hidden h-[340px] w-full max-w-[420px] sm:block">
            <div aria-hidden className={`blob absolute bottom-0 left-[8%] right-[8%] top-[16%] ${tint.bg}`} />
            <Sparkle className="absolute left-2 top-10" />
            <Cutout src={cat.image} eager className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2" />
          </div>
        </div>
      </section>

      <div className="sticky top-[76px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x no-scrollbar flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/services/${c.slug}`}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-semibold transition ${
                c.slug === cat.slug ? "bg-navy text-white" : "bg-surface text-navy ring-1 ring-line hover:ring-royal/40"
              }`}
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>

      <section className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{cat.slug === "microsoft-certifications" ? "All Microsoft Certifications" : `All ${cat.title} Services`}</h2>
            <p className="mt-2">{cat.slug === "microsoft-certifications" ? 'Tap "Learn More" to see who it is for and what you get.' : 'Tap "Learn More" to see details, documents and time taken.'}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {cat.services.map((s) => (
                <div
                  key={s.name}
                  id={slugify(s.name)}
                  className={`scroll-mt-40 flex flex-col rounded-[22px] ${TINTS[cat.services.indexOf(s) % TINTS.length].bg} p-5 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-26px_rgba(20,33,78,0.5)]`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-royal shadow-sm"><CheckCircle2 className="h-4 w-4" /></span>
                    <div>
                      <h3 className="font-semibold leading-snug">{s.name}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 pl-11">
                    <Link
                      to={serviceUrl(cat.slug, s.name)}
                      className="inline-flex items-center gap-1 text-[14px] font-semibold text-brand hover:gap-2"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                    {s.days ? (
                      <span className="flex items-center gap-1.5 text-[13px] text-slate-500"><Clock className="h-3.5 w-3.5" /> {s.days}</span>
                    ) : <span />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside id="enquire" className="scroll-mt-40 rounded-[26px] border border-line bg-white p-6 shadow-[0_30px_60px_-34px_rgba(20,33,78,0.45)] lg:sticky lg:top-40">
            <h3 className="text-xl font-bold">Get a Free <span className="text-royal">Call</span></h3>
            <p className="mt-1 text-[14px]">Our expert will call you and explain everything.</p>
            <div className="mt-5">
              <LeadForm layout="stack" source={`category:${cat.slug}`} defaultService={cat.services[0].name} />
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
