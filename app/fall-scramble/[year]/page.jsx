"use client";
import { FallScrambleYearPage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page({ params }) {
  const setPage = useSetPage();
  return <FallScrambleYearPage year={Number(params.year)} setPage={setPage} />;
}
