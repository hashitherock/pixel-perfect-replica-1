import { useMemo, useState } from "react";
import { Search, X, SearchX } from "lucide-react";
import { categories, filterServices, services, type CategoryId } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

export function ServiceExplorer({ showSort = false, initialQuery = "" }: { showSort?: boolean; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<"default" | "name" | "category">("default");

  const results = useMemo(() => {
    const r = filterServices(services, query, cat);
    if (sort === "name") return [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "category") return [...r].sort((a, b) => a.category.localeCompare(b.category));
    return r;
  }, [query, cat, sort]);

  const clear = () => { setQuery(""); setCat("all"); setSort("default"); };
  const dirty = query || cat !== "all" || sort !== "default";

  return (
    <div>
      <div className="relative">
        <label htmlFor="service-search" className="sr-only">Search services</label>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          id="service-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services — try “music”, “translate”, “jobs”"
          className="h-14 w-full rounded-2xl border bg-card pl-12 pr-12 text-base shadow-card outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        {[{ id: "all" as const, label: "All" }, ...categories].map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
            className={cn(
              "min-h-10 rounded-full border px-4 text-sm font-medium transition",
              cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary/40 hover:text-primary",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing <strong className="text-foreground">{results.length}</strong> of {services.length} services
        </p>
        <div className="flex items-center gap-3">
          {showSort && (
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-10 rounded-lg border bg-card px-3 text-foreground">
                <option value="default">Featured</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
              </select>
            </label>
          )}
          {dirty && (
            <button onClick={clear} className="h-10 rounded-lg px-3 text-sm font-semibold text-primary hover:bg-primary-soft">Clear filters</button>
          )}
        </div>
      </div>

      {results.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((s) => <ServiceCard key={s.slug} service={s} query={query} />)}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
          <SearchX className="h-10 w-10 text-brand-orange" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-bold">No services match “{query}”</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try a different keyword or clear your filters.</p>
          <button onClick={clear} className="mt-5 h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep">Clear filters</button>
        </div>
      )}
    </div>
  );
}
