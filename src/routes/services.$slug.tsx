import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { categoryLabel, getService, services } from "@/data/services";
import { ServiceCard } from "@/components/site/ServiceCard";
import { useRecent } from "@/lib/recent";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, name: s.name, description: s.description };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} — Sholok` : "Service not found — Sholok";
    const desc = loaderData?.description ?? "This Sholok service could not be found.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-section">Service not found</h1>
      <p className="mt-3 text-muted-foreground">That service isn't part of Sholok yet.</p>
      <Link to="/services" className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground">Browse services</Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const service = getService(slug)!;
  const { visit } = useRecent();
  useEffect(() => { visit(slug); }, [slug, visit]);
  const Icon = service.icon;
  const related = services.filter((s) => s.category === service.category && s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-gradient-soft border-b">
        <div className="container-site py-12 md:py-16">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
              <Icon className="h-10 w-10" aria-hidden="true" />
            </span>
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">{categoryLabel(service.category)}</span>
                <span className="rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-semibold text-accent-foreground">{service.status}</span>
              </div>
              <h1 className="text-section mt-3 md:text-5xl">{service.name}</h1>
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{service.description}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container-site grid gap-8 py-12 lg:grid-cols-[2fr_1fr]">
        <section aria-labelledby="feat-h" className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
          <h2 id="feat-h" className="text-xl font-bold">What you'll be able to do</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl bg-muted p-4 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => toast(service.status === "Coming Soon" ? `We'll keep ${service.name} on your list — demo only` : `${service.name} preview opened — demo only, no real service connected`)}
            className="mt-8 inline-flex h-12 items-center rounded-full bg-brand-orange px-6 font-semibold text-primary-foreground transition hover:bg-brand-orange-deep active:scale-[0.98]"
          >
            {service.status === "Coming Soon" ? "Notify me (demo)" : "Open preview (demo)"}
          </button>
        </section>
        <aside className="flex gap-3 rounded-2xl border border-primary/20 bg-primary-soft p-6 text-sm">
          <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="leading-relaxed text-secondary-foreground">
            This is a <strong>{service.status}</strong>. Sholok is a frontend demonstration; {service.name} is not connected to a live service yet.
          </p>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="container-site pb-20" aria-labelledby="rel-h">
          <h2 id="rel-h" className="text-xl font-bold">More in {categoryLabel(service.category)}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </section>
      )}
    </>
  );
}
