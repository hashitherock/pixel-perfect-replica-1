import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categoryLabel, type Service } from "@/data/services";

function Highlight({ text, query }: { text: string; query?: string | undefined }) {
  const q = query?.trim();
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-brand-orange-soft px-0.5 text-accent-foreground">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function ServiceCard({ service, query }: { service: Service; query?: string | undefined }) {
  const Icon = service.icon;
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {categoryLabel(service.category)}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold"><Highlight text={service.name} query={query} /></h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-1 font-semibold text-primary">
          Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
        {service.status === "Coming Soon" && (
          <span className="rounded-full bg-brand-orange-soft px-2 py-0.5 text-xs font-semibold text-accent-foreground">Coming soon</span>
        )}
      </div>
    </Link>
  );
}
