import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { mockAccount, services } from "@/data/services";
import { useRecent } from "@/lib/recent";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Demo Account — Sholok" },
      { name: "description", content: "A simulated preview of the Sholok account: profiles, roles and service access." },
      { property: "og:title", content: "Demo Account — Sholok" },
      { property: "og:description", content: "Preview how one Sholok account can hold many profiles and roles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});

function Account() {
  const { profileId, setProfileId } = useRecent();
  const [prefs, setPrefs] = useState({ digest: true, recs: true, compact: false });
  const active = mockAccount.profiles.find((p) => p.id === profileId)!;

  return (
    <>
      <PageHeader eyebrow="Demo account" title={`Hi, ${mockAccount.name.split(" ")[0]}`}>
        <span className="inline-flex items-start gap-2 text-base"><Info className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> Frontend simulation with fictional data. Switching profiles does not change real access.</span>
      </PageHeader>
      <div className="container-site py-12">
        <Tabs defaultValue="profiles">
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="access">Service access</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mockAccount.profiles.map((p) => (
                <button key={p.id} onClick={() => { setProfileId(p.id); toast(`Now using ${p.name} — demo only`); }} aria-pressed={p.id === profileId}
                  className={cn("rounded-2xl border bg-card p-5 text-left shadow-card transition hover:-translate-y-0.5", p.id === profileId && "border-primary ring-4 ring-primary/15")}>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-lg font-bold text-primary">{p.name.charAt(0)}</span>
                  <div className="mt-4 font-bold">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.service}</div>
                  <span className="mt-3 inline-block rounded-full bg-brand-orange-soft px-2.5 py-1 text-xs font-semibold text-accent-foreground">{p.role}</span>
                  {p.id === profileId && <div className="mt-2 text-xs font-semibold text-primary">Active profile</div>}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="access" className="mt-6">
            <p className="text-sm text-muted-foreground">Illustrative access for <strong className="text-foreground">{active.name}</strong> ({active.role}).</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 9).map((s) => {
                const elevated = active.service === s.name;
                return (
                  <li key={s.slug} className="flex items-center justify-between rounded-xl border bg-card p-4">
                    <span className="flex items-center gap-3 font-medium"><s.icon className="h-5 w-5 text-primary" aria-hidden="true" />{s.name}</span>
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", elevated ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{elevated ? active.role : "User"}</span>
                  </li>
                );
              })}
            </ul>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="max-w-xl divide-y rounded-2xl border bg-card shadow-card">
              <div className="p-5"><div className="text-sm text-muted-foreground">Verified phone (masked, fictional)</div><div className="font-semibold">{mockAccount.phone}</div></div>
              {([["digest", "Weekly digest"], ["recs", "Personalized recommendations"], ["compact", "Compact layout"]] as const).map(([k, label]) => (
                <label key={k} className="flex items-center justify-between p-5">
                  <span className="font-medium">{label}</span>
                  <Switch checked={prefs[k]} onCheckedChange={(v) => { setPrefs((p) => ({ ...p, [k]: v })); toast(`${label} ${v ? "on" : "off"} (demo)`); }} />
                </label>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
