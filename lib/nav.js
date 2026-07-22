"use client";
import { useRouter } from "next/navigation";

// Maps a legacy page object { id, year, name, tab } to a real URL path.
export function pageToPath(p) {
  if (!p || !p.id) return "/";
  switch (p.id) {
    case "home":
      return "/";
    case "tournaments":
      return "/tournaments";
    case "tournament-detail":
      return `/tournaments/${p.year}${p.tab ? `?tab=${p.tab}` : ""}`;
    case "players":
      return "/players";
    case "player-detail":
      return `/players/${encodeURIComponent(p.name)}`;
    case "parimutuel":
      return "/parimutuel";
    case "live-betting":
      return "/betting";
    case "live-draft":
      return "/draft";
    case "rules":
      return "/rules";
    case "course-legend":
      return "/course-guide/legend";
    case "course-legacy":
      return "/course-guide/legacy";
    case "sgp-tees":
      return "/sgp-tees";
    case "sgp-tees-spire":
      return "/sgp-tees/spire";
    case "sgp-tees-lake":
      return "/sgp-tees/lake";
    default:
      return "/";
  }
}

// Returns a setPage(pageObject) function that navigates using the router.
// This keeps every existing page component working without rewriting its
// internal navigation calls.
export function useSetPage() {
  const router = useRouter();
  return (p) => {
    router.push(pageToPath(p));
  };
}

// Derives the active top-level nav key from the current pathname.
export function activeNavFromPath(pathname) {
  if (!pathname || pathname === "/") return "home";
  if (pathname.startsWith("/tournaments")) return "tournaments";
  if (pathname.startsWith("/players")) return "players";
  if (pathname.startsWith("/parimutuel")) return "parimutuel";
  if (pathname.startsWith("/sgp-tees")) return "sgp-tees";
  if (pathname === "/rules") return "rules";
  if (pathname.startsWith("/course-guide/legend")) return "course-legend";
  if (pathname.startsWith("/course-guide/legacy")) return "course-legacy";
  return "home";
}
