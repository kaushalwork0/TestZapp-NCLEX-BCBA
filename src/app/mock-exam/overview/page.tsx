"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ExamOverview } from "@/components/ExamOverview";

function ExamOverviewPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "ccm-mock-1";
  const title = searchParams.get("title") || undefined;
  const desc = searchParams.get("desc") || undefined;

  return <ExamOverview id={id} title={title} subtitle={desc} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center text-sm text-gray-500">Loading overview...</div>}>
      <ExamOverviewPageContent />
    </Suspense>
  );
}
