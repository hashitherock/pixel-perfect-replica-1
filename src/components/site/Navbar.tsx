import { Link } from "@tanstack/react-router";
import { Menu, Search, UserRound, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockAccount } from "@/data/services";
import { useRecent } from "@/lib/recent";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Explore Services" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" },
] as const;

function AccountMenu() {
  const { profileId, setProfileId } = useRecent();
  const active = mockAccount.profiles.find((p) => p.id === profileId)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Demo account menu" className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground">
        {active.name.charAt(0)}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="text-sm font-semibold">{mockAccount.name}</div>
          <div className="text-xs font-normal text-muted-foreground">Demo account · simulated</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Switch profile</DropdownMenuLabel>
        {mockAccount.profiles.map((p) => (
          <DropdownMenuItem key={p.id} onSelect={() => { setProfileId(p.id); toast(`Switched to ${p.name} (${p.role}) — demo only`); }}>
            <div className="flex-1">
              <div className="text-sm">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.service} · {p.role}</div>
            </div>
            {p.id === profileId && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/account">Account overview</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground data-[status=active]:text-primary"
              activeProps={{ "data-status": "active" } as never}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/services" aria-label="Search services" className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
            <Search className="h-5 w-5" />
          </Link>
          <AccountMenu />
          <Link to="/services" className="hidden h-11 items-center rounded-full bg-brand-orange px-5 text-sm font-semibold text-primary-foreground transition hover:bg-brand-orange-deep active:scale-[0.98] lg:inline-flex">
            Explore Services
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full hover:bg-muted md:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetHeader><SheetTitle className="sr-only">Menu</SheetTitle><Logo /></SheetHeader>
              <nav aria-label="Mobile" className="mt-4 flex flex-col gap-1 px-4">
                {[...nav, { to: "/account", label: "Demo Account" } as const].map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium hover:bg-primary-soft hover:text-primary">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
