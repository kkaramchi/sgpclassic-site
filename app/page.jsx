"use client";
import { HomePage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page() {
  const setPage = useSetPage();
  return <HomePage setPage={setPage} />;
}
