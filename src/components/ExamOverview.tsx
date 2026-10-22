"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  FileText,
  Layers,
  Flag,
  Award,
  Calculator,
  Highlighter,
  ZoomIn,
  Presentation,
  HelpCircle,
  ChevronRight,
  X,
  AlertCircle
} from "lucide-react";

import { CandidateAgreement } from "@/components/CandidateAgreement";

export interface ExamOverviewProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

const exam1 = {
  title: "CCM Mock Exam 1",
  subtitle: "Certified Case Manager practice exam",
  questions: 180,
  time: "3 hours",
};
const exam2 = {
  title: "CCM Mock Exam 2",
  subtitle: "Certified Case Manager practice exam",
  questions: 180,
  time: "3 hours",
};
const exam3 = {
  title: "CCM Mock Exam 3",
  subtitle: "Certified Case Manager practice exam",
  questions: 180,
  time: "3 hours",
};

const mockExamsData: Record<string, typeof exam1> = {
  "ccm-mock-1": exam1,
  "mock-1": exam1,
  "ccm-1": exam1,
  "1": exam1,
  "ccm-mock-2": exam2,
  "mock-2": exam2,
  "ccm-2": exam2,
  "2": exam2,
  "ccm-mock-3": exam3,
  "mock-3": exam3,
  "ccm-3": exam3,
  "3": exam3,
};

const domainsData = [
  { name: "Care Management", pct: 30 },
  { name: "Psychosocial Concepts and Support Systems", pct: 20 },
  { name: "Ethical, Legal and Practice Standards", pct: 18 },
  { name: "Reimbursement Methods", pct: 12 },
  { name: "Quality and Outcomes Evaluation", pct: 10 },
  { name: "Rehabilitation Concepts and Strategies", pct: 10 },
];

export function ExamOverview({ id = "ccm-mock-1", title: customTitle, subtitle: customSubtitle }: ExamOverviewProps) {
  const router = useRouter();
  const normalizedId = (id || "ccm-mock-1").toLowerCase();
  const examInfo = mockExamsData[normalizedId] || {
    title: customTitle || `CCM Mock Exam ${normalizedId.replace(/[^0-9]/g, "") || id}`,
    subtitle: customSubtitle || "Certified Case Manager practice exam",
    questions: 180,
    time: "3 hours",
  };

  const title = customTitle || examInfo.title;
  const subtitle = customSubtitle || examInfo.subtitle;

  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [step, setStep] = useState<"overview" | "agreement">("overview");

  if (step === "agreement") {
    return (
      <CandidateAgreement
        id={id}
        title={title}
        time="3:00:00"
        onBack={() => setStep("overview")}
        onStartExam={() => {
          router.push(`/mock-exam/take/${normalizedId}`);
        }}
      />
    );
  }

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-background-muted font-sans select-none">
      {/* Product Standard Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center px-4 gap-2.5 z-10 shadow-sm relative text-white">
        <Link
          href="/mock-exam"
          className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors flex items-center justify-center"
          aria-label="Back to Mock Exams"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </Link>
        <div className="flex flex-col min-w-0">
          <span className="text-white text-lg font-normal tracking-wide ml-0.5 leading-tight">
            Exam Overview
          </span>
          <span className="text-white/80 text-xs font-normal ml-0.5 truncate">
            {title}
          </span>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24 scrollbar-hide">
        {/* Intro Card matching product card system */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-secondary">{title}</h2>
            <span className="text-[11px] font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-[3px] border border-primary/15">
              Official Format
            </span>
          </div>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            {subtitle}. Simulate realistic Pearson VUE testing conditions with continuous timing and standard tools.
          </p>
        </div>

        {/* 4 Overview Grid Cards (2x2) with rounded-[3px] and product tokens */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Questions */}
          <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-secondary">Questions</span>
              <FileText className="w-4 h-4 text-primary/75" />
            </div>
            <div className="mt-2.5">
              <span className="text-2xl font-bold text-gray-800 leading-none">180</span>
              <p className="text-[11px] text-gray-400 font-medium mt-1">150 scored · 30 unscored</p>
            </div>
          </div>

          {/* Time */}
          <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-secondary">Total Time</span>
              <Clock className="w-4 h-4 text-primary/75" />
            </div>
            <div className="mt-2.5">
              <span className="text-2xl font-bold text-gray-800 leading-none">3 hours</span>
              <p className="text-[11px] text-gray-400 font-medium mt-1">Continuous timer</p>
            </div>
          </div>
        </div>

        {/* Section: How It Works */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[15px] font-medium text-secondary flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-primary" />
              How It Works
            </h3>
            <span className="text-[11px] text-gray-400">Rules</span>
          </div>
          <div className="p-3.5 space-y-2.5 text-[13px] text-gray-600 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Each question features multiple choice options with exactly one correct answer.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>30 unscored pretest questions are mixed in anonymously. Answer every question.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>You can flag questions and review answers at any time before final submission.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Final score provides pass/not-pass status along with domain performance breakdowns.</span>
            </div>
          </div>
        </div>

        {/* Section: What the Exam Covers */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[15px] font-medium text-secondary">What the Exam Covers</h3>
            <span className="text-[11px] text-gray-400">6 Core Domains</span>
          </div>
          <div className="divide-y divide-gray-100">
            {domainsData.map((d, i) => (
              <div key={i} className="p-3 flex items-center justify-between gap-3 text-[13px]">
                <span className="text-gray-700 font-medium leading-snug">{d.name}</span>
                <span className="text-primary font-bold text-xs bg-primary/8 px-2.5 py-1 rounded-[3px] border border-primary/15 shrink-0">
                  {d.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Tools You'll Have */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-[15px] font-medium text-secondary">Tools Provided in Exam</h3>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 text-xs">
            {[
              { label: "Flag for review", icon: Flag },
              { label: "Review screen", icon: Layers },
              { label: "Whiteboard notes", icon: Presentation },
              { label: "Calculator", icon: Calculator },
              { label: "Highlight & Strike", icon: Highlighter },
              { label: "Zoom up to 200%", icon: ZoomIn },
            ].map((t, i) => {
              const IconComp = t.icon;
              return (
                <div
                  key={i}
                  className="bg-gray-50/70 border border-gray-200 rounded-[3px] p-2.5 flex items-center gap-2 text-gray-700 font-medium"
                >
                  <IconComp className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footnote */}
        <p className="text-[11px] text-gray-400 leading-relaxed px-1 text-center">
          Practice exam based on the published CCM format. Not affiliated with The Commission or Pearson VUE.
        </p>
      </div>

      {/* Footer Actions matching Product Design System */}
      <div className="shrink-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] p-3 px-4 flex gap-2.5 z-10">
        <button
          onClick={() => setIsTutorialOpen(true)}
          className="flex-1 bg-white border border-gray-200 hover:border-primary/50 text-secondary hover:text-primary font-medium py-3 rounded-[3px] text-sm transition-colors shadow-sm active:scale-[0.99] flex items-center justify-center"
        >
          Take Tutorial
        </button>
        <button
          onClick={() => setStep("agreement")}
          className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-[3px] text-sm transition-colors shadow-sm active:scale-[0.99] flex items-center justify-center gap-1.5"
        >
          <span>Continue</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tutorial Modal matching Product Design System */}
      {isTutorialOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[3px] border border-gray-200 max-w-sm w-full p-5 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-medium text-secondary text-base">Exam Interface Tutorial</h3>
              <button
                onClick={() => setIsTutorialOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs text-gray-600 leading-relaxed">
              <p>• <strong>Navigation:</strong> Move between questions using Next and Previous buttons.</p>
              <p>• <strong>Flagging:</strong> Flag questions to revisit before final submission.</p>
              <p>• <strong>Review Screen:</strong> Access an overview of all answered, unanswered, and flagged items.</p>
            </div>
            <button
              onClick={() => setIsTutorialOpen(false)}
              className="w-full py-2.5 bg-primary text-white font-medium text-xs rounded-[3px] hover:bg-primary/90 transition-colors shadow-sm"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

