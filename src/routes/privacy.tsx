import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy (Demo) — Sholok" },
      { name: "description", content: "Demo privacy information for the Sholok frontend preview." },
      { property: "og:title", content: "Privacy Policy (Demo) — Sholok" },
      { property: "og:description", content: "How the Sholok demo handles data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Demo page" title="Privacy Policy" />
      <div className="container-site max-w-3xl space-y-4 py-14 leading-relaxed text-muted-foreground">
        <p>This is a placeholder policy for a frontend demonstration. It is not a legal document.</p>
        <p>The demo does not collect names, phone numbers, passwords or payment details. The only thing saved is a short list of recently viewed services, kept in your own browser.</p>
      </div>
    </>
  ),
});
