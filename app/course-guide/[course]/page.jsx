"use client";
import { CourseGuidePage } from "@/components/views";
import { useSetPage } from "@/lib/nav";

export default function Page({ params }) {
  const setPage = useSetPage();
  return <CourseGuidePage course={params.course} setPage={setPage} />;
}
