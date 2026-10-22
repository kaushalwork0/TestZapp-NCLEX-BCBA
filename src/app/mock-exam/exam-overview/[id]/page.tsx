"use client";

import { useParams } from "next/navigation";
import { ExamOverview } from "@/components/ExamOverview";

export default function ExamOverviewDynamicPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string) || "ccm-mock-1";

  return <ExamOverview id={id} />;
}
