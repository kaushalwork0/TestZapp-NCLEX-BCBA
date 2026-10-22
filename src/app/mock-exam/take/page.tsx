"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LiveExamSession } from "@/components/LiveExamSession";

function TakeExamContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "ccm-mock-1";
  const title = searchParams.get("title") || "CCM Mock Exam 1";

  return <LiveExamSession id={id} title={title} totalQuestions={180} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center text-sm text-gray-500">Loading exam...</div>}>
      <TakeExamContent />
    </Suspense>
  );
}
