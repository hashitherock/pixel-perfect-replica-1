import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-gradient-soft border-b">
      <div className="container-site py-14 md:py-20">
        <p className="animate-rise text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">{eyebrow}</p>
        <h1 className="animate-rise mt-3 max-w-3xl text-section md:text-5xl">{title}</h1>
        {children && <div className="animate-rise mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
