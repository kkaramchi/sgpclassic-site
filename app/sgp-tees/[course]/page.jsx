"use client";
import { SgpTeesCoursePage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page({ params }) {
  const setPage = useSetPage();
  return <SgpTeesCoursePage course={params.course} setPage={setPage} />;
}
