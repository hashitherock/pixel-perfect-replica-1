import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Sholok" },
      { name: "description", content: "Answers to common questions about Sholok services, accounts and profiles." },
      { property: "og:title", content: "Help Center — Sholok" },
      { property: "og:description", content: "Frequently asked questions about using Sholok." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Help,
});

const faqs = [
  { q: "What is Sholok?", a: "Sholok is a unified portal that brings many digital services into one consistent experience." },
  { q: "Are the services live?", a: "Not yet. This site is a frontend demonstration, and each service page is a preview." },
  { q: "Do I need an account?", a: "No. The account area uses fictional demo data only. No real sign-in exists." },
  { q: "What are profiles and roles?", a: "One account could hold several profiles — for example a Creator profile on Blog or a Seller profile on Smart Store." },
  { q: "Is my data stored?", a: "Only the list of services you recently explored is kept in your own browser." },
];

function Help() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <PageHeader eyebrow="Help" title="How can we help?" />
      <div className="container-site grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="faq-h">
          <h2 id="faq-h" className="text-xl font-bold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-4 rounded-2xl border bg-card px-5 shadow-card">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section aria-labelledby="fb-h" className="h-fit rounded-2xl border bg-card p-6 shadow-card">
          <h2 id="fb-h" className="text-xl font-bold">Send feedback</h2>
          <p className="mt-1 text-sm text-muted-foreground">Demo form — nothing is sent.</p>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (msg.trim().length < 10) return setError("Please write at least 10 characters.");
              setError(""); setMsg(""); toast.success("Thanks! Feedback recorded (demo only).");
            }}
          >
            <label htmlFor="fb" className="text-sm font-medium">Your message</label>
            <textarea id="fb" value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} aria-invalid={!!error} aria-describedby={error ? "fb-err" : undefined}
              className="mt-1.5 w-full rounded-xl border bg-background p-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/15" />
            {error && <p id="fb-err" className="mt-1 text-sm text-destructive">{error}</p>}
            <button className="mt-4 h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary-deep">Send</button>
          </form>
        </section>
      </div>
    </>
  );
}
