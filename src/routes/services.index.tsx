import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ServiceExplorer } from "@/components/site/ServiceExplorer";
import { ServiceCard } from "@/components/site/ServiceCard";
import { getService } from "@/data/services";
import { useRecent } from "@/lib/recent";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Explore Services — Sholok" },
      { name: "description", content: "Browse and search all Sholok services: news, shopping, webtoon, music, maps, translator and more." },
      { property: "og:title", content: "Explore Services — Sholok" },
      { property: "og:description", content: "Search and filter the full Sholok service catalog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { recent } = useRecent();
  const recentServices = recent.map(getService).filter((s) => !!s);
  return (
    <>
      <PageHeader eyebrow="Service directory" title="Explore every Sholok service">
        Search by name or keyword, filter by category, and open any service preview.
      </PageHeader>
      <div className="container-site py-12 md:py-16">
        {recentServices.length > 0 && (
          <section aria-labelledby="recent-h" className="mb-14">
            <h2 id="recent-h" className="text-xl font-bold">Recently explored</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentServices.slice(0, 4).map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </section>
        )}
        <h2 className="sr-only">All services</h2>
        <ServiceExplorer showSort />
      </div>
    </>
  );
}
