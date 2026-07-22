"use client";
import { TournamentDetailPage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page({ params, searchParams }) {
  const setPage = useSetPage();
  return (
    <TournamentDetailPage
      year={Number(params.year)}
      defaultTab={searchParams?.tab}
      setPage={setPage}
    />
  );
}
