"use client";
import { usePathname } from "next/navigation";
import { Nav } from "./views";
import { useSetPage, activeNavFromPath } from "@/lib/nav";

export default function SiteNav() {
  const setPage = useSetPage();
  const pathname = usePathname();
  return <Nav active={activeNavFromPath(pathname)} setPage={setPage} />;
}
