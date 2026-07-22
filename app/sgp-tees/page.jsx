"use client";
import { SgpTeesPickerPage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page() {
  const setPage = useSetPage();
  return <SgpTeesPickerPage setPage={setPage} />;
}
