import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Layers, Sparkles, LayoutGrid, Search, Smartphone, Sprout, Accessibility, Repeat } from "lucide-react";
import hero from "@/assets/hero-sholok.jpg";
import { services, featuredContent, getService } from "@/data/services";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ServiceExplorer } from "@/components/site/ServiceExplorer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sholok — Everything You Need, All in One Place" },
      { name: "description", content: "Discover search, news, shopping, entertainment, tools and everyday services in one unified Sholok portal." },
      { property: "og:title", content: "Sholok — Everything You Need, All in One Place" },
      { property: "og:description", content: "One unified digital portal for knowledge, shopping, entertainment, work and everyday life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Compass, title: "Discover services", text: "Search or browse categories to find what you need." },
  { icon: Layers, title: "Explore the tools", text: "Open the service and dive into content and features." },
  { icon: Sparkles, title: "Enjoy one experience", text: "The same clean design across the whole ecosystem." },
];

const benefits = [
  { icon: LayoutGrid, title: "One unified destination", text: "Every service starts from the same place." },
  { icon: Search, title: "Easy discovery", text: "Live search and filters across all services." },
  { icon: Repeat, title: "Consistent experience", text: "Familiar layouts and controls everywhere." },
  { icon: Smartphone, title: "Mobile-friendly", text: "Designed for phones first, then bigger screens." },
  { icon: Sprout, title: "Growing ecosystem", text: "New services join the portal over time." },
  { icon: Accessibility, title: "Clean & accessible", text: "Readable, keyboard-friendly and calm." },
];

function Index() {
  const featured = services.filter((s) => s.featured);
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-soft relative">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="animate-rise inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold text-primary shadow-card">
              <span className="h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" /> {services.length} services, one portal
            </span>
            <h1 className="animate-rise text-display mt-5 [animation-delay:80ms]">
              Everything You Need, <span className="text-gradient-brand">All in One Place.</span>
            </h1>
            <p className="animate-rise mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground [animation-delay:160ms]">
              Discover a smarter digital experience with Sholok. Explore services for knowledge, shopping, entertainment, work, and everyday life—all through one unified platform.
            </p>
            <div className="animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]">
              <Link to="/services" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-lift transition hover:bg-primary-deep active:scale-[0.98]">
                Explore Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/about" className="inline-flex h-12 items-center rounded-full border bg-card px-6 font-semibold transition hover:border-brand-orange hover:text-brand-orange-deep">
                Discover Sholok
              </Link>
            </div>
          </div>
          <div className="animate-rise [animation-delay:200ms]">
            <img src={hero} alt="Purple and orange shapes connected together, representing Sholok's connected services" width={1200} height={1104} className="mx-auto w-full max-w-xl mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-site py-16 md:py-24" aria-labelledby="featured-h">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">Featured</p>
              <h2 id="featured-h" className="text-section mt-2">Popular on Sholok</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">View all services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </Reveal>
      </section>

      {/* Explore all */}
      <section className="border-y bg-card py-16 md:py-24" aria-labelledby="explore-h">
        <div className="container-site">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">Explore</p>
            <h2 id="explore-h" className="text-section mt-2">Find any service, instantly</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Type to search, or filter by category. Results update as you go.</p>
            <div className="mt-8"><ServiceExplorer /></div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="container-site py-16 md:py-24" aria-labelledby="how-h">
        <Reveal>
          <h2 id="how-h" className="text-section text-center">How Sholok works</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border bg-card p-6 shadow-card">
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-primary-soft" aria-hidden="true">0{i + 1}</span>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange-deep"><s.icon className="h-6 w-6" aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Benefits */}
      <section className="bg-primary-soft/50 py-16 md:py-24" aria-labelledby="why-h">
        <div className="container-site">
          <Reveal>
            <h2 id="why-h" className="text-section">Why choose Sholok</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4 rounded-2xl bg-card p-5 shadow-card">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><b.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <div>
                    <h3 className="font-bold">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured content */}
      <section className="container-site py-16 md:py-24" aria-labelledby="disc-h">
        <Reveal>
          <h2 id="disc-h" className="text-section">Discover</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sample stories for illustration.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredContent.map((c) => {
              const svc = getService(c.service)!;
              return (
                <Link key={c.title} to="/services/$slug" params={{ slug: svc.slug }} className="group flex flex-col rounded-2xl border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                  <span className="w-fit rounded-full bg-brand-orange-soft px-2.5 py-1 text-xs font-semibold text-accent-foreground">{c.tag}</span>
                  <h3 className="mt-4 text-lg font-bold leading-snug group-hover:text-primary">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-primary">via {svc.name} →</span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-site pb-20">
        <div className="bg-gradient-brand relative overflow-hidden rounded-3xl px-6 py-14 text-center text-primary-foreground md:px-12 md:py-20">
          <h2 className="text-section mx-auto max-w-2xl">Your Digital World Starts with Sholok.</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Browse every service from one calm, familiar place.</p>
          <Link to="/services" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-card px-7 font-semibold text-primary transition hover:bg-brand-orange-soft active:scale-[0.98]">
            Explore All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
