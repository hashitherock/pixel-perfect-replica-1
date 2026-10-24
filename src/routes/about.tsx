import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sholok — One Unified Digital Portal" },
      { name: "description", content: "Learn about Sholok's vision: one account and one consistent experience across many digital services." },
      { property: "og:title", content: "About Sholok" },
      { property: "og:description", content: "One verified phone number, one account, many services, profiles and roles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const model = ["One verified phone number", "One user account", "Multiple services", "Multiple profiles", "Multiple roles"];

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="A calmer way to use the internet">
        Sholok brings knowledge, commerce, entertainment and everyday tools together in one consistent, accessible portal.
      </PageHeader>
      <div className="container-site grid gap-12 py-16 lg:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>Today's digital life is spread across dozens of apps, logins and layouts. Sholok's idea is simple: one front door for everything.</p>
          <p>Every service shares the same design language, so once you know one, you know them all.</p>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-card md:p-8">
          <h2 className="text-xl font-bold">The planned account model</h2>
          <ol className="mt-6 space-y-3">
            {model.map((m, i) => (
              <li key={m} className="flex items-center gap-4">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold ${i % 2 ? "bg-brand-orange-soft text-accent-foreground" : "bg-primary-soft text-primary"}`}>{i + 1}</span>
                <span className="font-semibold">{m}</span>
              </li>
            ))}
          </ol>
          <Link to="/account" className="mt-6 inline-flex font-semibold text-primary hover:underline">See the demo account →</Link>
        </div>
      </div>
    </>
  );
}
