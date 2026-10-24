import {
  Search, Newspaper, PenLine, Coffee, ShoppingBag, Store, Map, MessageCircleQuestion,
  BookImage, Clapperboard, BookOpen, ScrollText, Tv, Music, Languages, BookA,
  LineChart, Trophy, CloudSun, Building2, Briefcase, LayoutGrid, type LucideIcon,
} from "lucide-react";

export type CategoryId = "discover" | "community" | "commerce" | "entertainment" | "tools" | "life";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "discover", label: "Discover" },
  { id: "community", label: "Community" },
  { id: "commerce", label: "Commerce" },
  { id: "entertainment", label: "Entertainment" },
  { id: "tools", label: "Tools" },
  { id: "life", label: "Everyday Life" },
];

export type Service = {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  icon: LucideIcon;
  status: "Demo Preview" | "Coming Soon";
  featured?: boolean;
  keywords: string[];
  features: string[];
};

export const services: Service[] = [
  { slug: "search", name: "Search", description: "Find answers, pages and places across the Sholok ecosystem.", category: "discover", icon: Search, status: "Demo Preview", featured: true, keywords: ["web", "find", "lookup"], features: ["Unified results", "Smart suggestions", "Image & video search"] },
  { slug: "news", name: "News", description: "Headlines and stories curated from many perspectives.", category: "discover", icon: Newspaper, status: "Demo Preview", featured: true, keywords: ["headlines", "media", "press"], features: ["Topic channels", "Daily briefings", "Saved stories"] },
  { slug: "blog", name: "Blog", description: "Write, publish and grow your personal audience.", category: "community", icon: PenLine, status: "Demo Preview", keywords: ["write", "publish", "creator"], features: ["Rich editor", "Followers", "Post analytics"] },
  { slug: "cafe", name: "Cafe", description: "Interest-based communities for every hobby and passion.", category: "community", icon: Coffee, status: "Demo Preview", keywords: ["forum", "group", "community"], features: ["Member boards", "Events", "Moderation tools"] },
  { slug: "shopping", name: "Shopping", description: "Compare products and discover deals in one place.", category: "commerce", icon: ShoppingBag, status: "Demo Preview", featured: true, keywords: ["buy", "deals", "products"], features: ["Price comparison", "Wishlists", "Reviews"] },
  { slug: "smart-store", name: "Smart Store", description: "Open an online store and reach Sholok shoppers.", category: "commerce", icon: Store, status: "Coming Soon", keywords: ["seller", "shop", "merchant"], features: ["Store builder", "Order dashboard", "Seller profile"] },
  { slug: "maps", name: "Maps", description: "Directions, places and local discovery near you.", category: "life", icon: Map, status: "Demo Preview", featured: true, keywords: ["navigation", "directions", "places"], features: ["Route planning", "Place details", "Saved spots"] },
  { slug: "knowledge-qa", name: "Knowledge Q&A", description: "Ask questions and get answers from the community.", category: "community", icon: MessageCircleQuestion, status: "Demo Preview", keywords: ["questions", "answers", "help"], features: ["Expert answers", "Topic tags", "Reputation"] },
  { slug: "webtoon", name: "Webtoon", description: "Vertical-scroll comics from emerging and loved artists.", category: "entertainment", icon: BookImage, status: "Demo Preview", featured: true, keywords: ["comics", "manga", "art"], features: ["Daily updates", "Creator tips", "Reading list"] },
  { slug: "series", name: "Series", description: "Serialized stories and episodes to follow week by week.", category: "entertainment", icon: Clapperboard, status: "Coming Soon", keywords: ["episodes", "shows"], features: ["Episode alerts", "Bookmarks", "Recommendations"] },
  { slug: "ebooks", name: "eBooks", description: "A digital library of books for reading anywhere.", category: "entertainment", icon: BookOpen, status: "Demo Preview", keywords: ["books", "reading", "library"], features: ["Offline reading", "Highlights", "Collections"] },
  { slug: "web-novels", name: "Web Novels", description: "Original fiction published chapter by chapter.", category: "entertainment", icon: ScrollText, status: "Demo Preview", keywords: ["fiction", "stories", "novel"], features: ["Genre browsing", "Author follow", "Comments"] },
  { slug: "tv-videos", name: "TV & Videos", description: "Clips, live shows and on-demand video.", category: "entertainment", icon: Tv, status: "Demo Preview", keywords: ["video", "live", "stream"], features: ["Live channels", "Highlights", "Watch later"] },
  { slug: "vibe", name: "Music — Vibe", description: "Playlists and mixes tuned to your mood.", category: "entertainment", icon: Music, status: "Demo Preview", featured: true, keywords: ["music", "playlist", "songs", "vibe"], features: ["Mood mixes", "Charts", "Lyrics"] },
  { slug: "papago", name: "Translator — Papago", description: "Translate text and phrases between languages.", category: "tools", icon: Languages, status: "Demo Preview", featured: true, keywords: ["translate", "language", "papago"], features: ["Text translation", "Phrasebook", "Conversation mode"] },
  { slug: "dictionary", name: "Dictionary", description: "Definitions, pronunciations and example sentences.", category: "tools", icon: BookA, status: "Demo Preview", keywords: ["words", "meaning", "define"], features: ["Pronunciation", "Synonyms", "Word lists"] },
  { slug: "finance", name: "Finance", description: "Market overviews, currency rates and money tools.", category: "life", icon: LineChart, status: "Demo Preview", keywords: ["stocks", "money", "market"], features: ["Watchlists", "Currency converter", "Market news"] },
  { slug: "sports", name: "Sports", description: "Scores, fixtures and highlights from every league.", category: "discover", icon: Trophy, status: "Demo Preview", keywords: ["cricket", "football", "scores"], features: ["Live scores", "Team follow", "Match highlights"] },
  { slug: "weather", name: "Weather", description: "Forecasts and conditions for the places you care about.", category: "life", icon: CloudSun, status: "Demo Preview", keywords: ["forecast", "rain", "temperature"], features: ["Hourly forecast", "Alerts", "Air quality"] },
  { slug: "real-estate", name: "Real Estate", description: "Explore homes and properties to rent or buy.", category: "life", icon: Building2, status: "Coming Soon", keywords: ["property", "homes", "rent"], features: ["Listings", "Area guides", "Saved homes"] },
  { slug: "jobs", name: "Jobs", description: "Discover opportunities and build your career profile.", category: "life", icon: Briefcase, status: "Coming Soon", keywords: ["career", "work", "hiring"], features: ["Job alerts", "Career profile", "Company pages"] },
  { slug: "more", name: "More Services", description: "New services joining the Sholok ecosystem soon.", category: "tools", icon: LayoutGrid, status: "Coming Soon", keywords: ["upcoming", "new"], features: ["Early previews", "Feedback", "Roadmap"] },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export function filterServices(list: Service[], query: string, category: CategoryId | "all") {
  const q = query.trim().toLowerCase();
  return list.filter((s) => {
    if (category !== "all" && s.category !== category) return false;
    if (!q) return true;
    return [s.name, s.description, ...s.keywords].some((t) => t.toLowerCase().includes(q));
  });
}

export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;

export const featuredContent = [
  { tag: "Trending", title: "10 webtoons everyone is reading this month", excerpt: "From slice-of-life to fantasy epics, a sample list of what readers love.", service: "webtoon" },
  { tag: "Guide", title: "Plan a weekend trip with Maps and Weather", excerpt: "An illustrative walkthrough of combining two Sholok services.", service: "maps" },
  { tag: "Spotlight", title: "Start writing: your first Sholok Blog post", excerpt: "Tips for creators taking their first steps on the platform.", service: "blog" },
];

export const mockAccount = {
  name: "Ayesha Rahman",
  phone: "+880 1•••• ••••42",
  profiles: [
    { id: "p1", name: "Ayesha", service: "All services", role: "User" },
    { id: "p2", name: "Ayesha Writes", service: "Blog", role: "Creator" },
    { id: "p3", name: "Craft Corner", service: "Smart Store", role: "Seller" },
    { id: "p4", name: "Book Club Admin", service: "Cafe", role: "Service Manager" },
  ],
};
