import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Ctx = { recent: string[]; visit: (slug: string) => void; profileId: string; setProfileId: (id: string) => void };
const RecentContext = createContext<Ctx | null>(null);

export function RecentProvider({ children }: { children: ReactNode }) {
  const [recent, setRecent] = useState<string[]>([]);
  const [profileId, setProfileId] = useState("p1");
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem("sholok-recent") ?? "[]");
      if (Array.isArray(v)) setRecent(v);
    } catch {}
  }, []);
  const visit = useCallback((slug: string) => {
    setRecent((r) => {
      const next = [slug, ...r.filter((s) => s !== slug)].slice(0, 6);
      try { localStorage.setItem("sholok-recent", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);
  return <RecentContext.Provider value={{ recent, visit, profileId, setProfileId }}>{children}</RecentContext.Provider>;
}

export function useRecent() {
  const c = useContext(RecentContext);
  if (!c) throw new Error("useRecent outside provider");
  return c;
}
