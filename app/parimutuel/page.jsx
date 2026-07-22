"use client";
import { ParimutuelPage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page() {
  const setPage = useSetPage();
  return <ParimutuelPage setPage={setPage} />;
}
