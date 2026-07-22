"use client";
import { PlayersPage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page() {
  const setPage = useSetPage();
  return <PlayersPage setPage={setPage} />;
}
