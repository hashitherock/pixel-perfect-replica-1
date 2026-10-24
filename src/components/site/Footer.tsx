import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            One unified portal for knowledge, shopping, entertainment, work and everyday life.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary">Explore Services</Link></li>
            <li><Link to="/account" className="hover:text-primary">Demo Account</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Popular services</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {services.filter((s) => s.featured).slice(0, 5).map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-primary">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Company</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/help" className="hover:text-primary">Help</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-site flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sholok. Frontend demonstration — services shown are previews.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex h-10 items-center gap-1.5 rounded-full border px-4 font-medium hover:border-primary hover:text-primary">
            <ArrowUp className="h-4 w-4" aria-hidden="true" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
