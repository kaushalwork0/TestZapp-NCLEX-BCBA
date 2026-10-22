"use client";

import { useParams } from "next/navigation";
import { LiveExamSession } from "@/components/LiveExamSession";

export default function TakeExamDynamicPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string) || "ccm-mock-1";

  const examTitles: Record<string, string> = {
    "ccm-mock-1": "CCM Mock Exam 1",
    "ccm-mock-2": "CCM Mock Exam 2",
    "ccm-mock-3": "CCM Mock Exam 3",
  };

  const title = examTitles[id] || "CCM Mock Exam 1";

  return <LiveExamSession id={id} title={title} totalQuestions={180} />;
}
