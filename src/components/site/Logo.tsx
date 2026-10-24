import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="5" className="fill-primary" />
      <rect x="22" y="2" width="16" height="16" rx="8" className="fill-brand-orange" />
      <rect x="2" y="22" width="16" height="16" rx="8" className="fill-primary-deep" />
      <rect x="22" y="22" width="16" height="16" rx="5" className="fill-primary" />
      <circle cx="20" cy="20" r="4.5" className="fill-card stroke-brand-orange" strokeWidth="2.5" />
    </svg>
  );
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5 rounded-lg", className)} aria-label="Sholok home">
      <LogoMark />
      <span className={cn("text-xl font-extrabold tracking-tight", inverted ? "text-primary-foreground" : "text-foreground")}>
        Sholok<span className="text-brand-orange">.</span>
      </span>
    </Link>
  );
}
