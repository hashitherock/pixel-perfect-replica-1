import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms (Demo) — Sholok" },
      { name: "description", content: "Demo terms of use for the Sholok frontend preview." },
      { property: "og:title", content: "Terms (Demo) — Sholok" },
      { property: "og:description", content: "Terms for using the Sholok demo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Demo page" title="Terms of Use" />
      <div className="container-site max-w-3xl space-y-4 py-14 leading-relaxed text-muted-foreground">
        <p>This is a placeholder for a frontend demonstration and is not a binding agreement.</p>
        <p>All services, accounts and content shown are illustrative previews. No real transactions, sign-ins or integrations take place.</p>
      </div>
    </>
  ),
});
