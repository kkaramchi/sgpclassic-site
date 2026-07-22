"use client";
import { PlayerDetailPage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page({ params }) {
  const setPage = useSetPage();
  return <PlayerDetailPage name={decodeURIComponent(params.name)} setPage={setPage} />;
}
