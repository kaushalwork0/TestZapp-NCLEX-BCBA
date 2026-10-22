"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, ShieldCheck, Clock, X } from "lucide-react";

export interface CandidateAgreementProps {
  id?: string;
  title?: string;
  time?: string;
  onBack: () => void;
  onStartExam?: () => void;
}

export function CandidateAgreement({
  id = "ccm-mock-1",
  title = "CCM Mock Exam 1",
  time = "3:00:00",
  onBack,
  onStartExam,
}: CandidateAgreementProps) {
  const router = useRouter();
  const [agreedLeave, setAgreedLeave] = useState(false);
  const [agreedShare, setAgreedShare] = useState(false);
  const [isExamActiveModal, setIsExamActiveModal] = useState(false);

  const canStart = agreedLeave && agreedShare;

  const handleStartClick = () => {
    if (!canStart) return;
    setIsExamActiveModal(true);
  };

  const handleBeginLiveExam = () => {
    setIsExamActiveModal(false);
    if (onStartExam) {
      onStartExam();
    } else {
      router.push(`/mock-exam/take/${id}`);
    }
  };

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-background-muted font-sans select-none">
      {/* Product Standard Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center px-4 gap-2.5 z-10 shadow-sm relative text-white">
        <button
          onClick={onBack}
          aria-label="Back to exam overview"
          className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <div className="flex flex-col min-w-0">
          <span className="text-white text-lg font-normal tracking-wide ml-0.5 leading-tight">
            Before You Start
          </span>
          <span className="text-white/80 text-xs font-normal ml-0.5 truncate">
            {title}
          </span>
        </div>

        {/* Right Info Pill */}
        <span className="absolute right-4 text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full text-white font-medium">
          Exam Rules
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24 scrollbar-hide">
        {/* Intro Context Card */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3.5">
          <p className="text-[13px] text-gray-500 leading-relaxed">
            These rules simulate an authentic Pearson VUE examination environment. Please review each guideline before starting the 3-hour timer.
          </p>
        </div>

        {/* Internet Connected Status Card */}
        <div className="bg-emerald-50/70 border border-emerald-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-900 tracking-wide">
              Internet Connected & Exam Ready
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Session Sync Active</span>
        </div>

        {/* Warning Card: Don't Leave The Exam */}
        <div className="bg-rose-50/70 border border-rose-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3.5 flex gap-3 items-start">
          <div className="w-9 h-9 rounded-[3px] bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C6364C"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="2" width="12" height="20" rx="2" />
              <path d="M11 18h2" />
              <path d="M3 3l18 18" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-semibold text-primary leading-tight">
              Don&apos;t leave the exam
            </span>
            <span className="text-[12.5px] text-gray-700 leading-relaxed">
              Switching to another app, going to your home screen or locking your phone ends the exam immediately. It cannot be resumed.
            </span>
          </div>
        </div>

        {/* 5 Numbered Rules in Unified Product Card */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[15px] font-medium text-secondary">Exam Guidelines</h3>
            <span className="text-[11px] text-gray-400">5 Instructions</span>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              {
                num: 1,
                title: "Stay connected",
                desc: "Keep Wi-Fi or mobile data on for the full 3 hours. If connection drops, your answers are saved and the timer keeps running.",
              },
              {
                num: 2,
                title: "Turn on Do Not Disturb",
                desc: "Calls and notifications can disrupt your session and trigger anti-tamper exit detection.",
              },
              {
                num: 3,
                title: "Charge your device",
                desc: "Plug in, or verify you have sufficient battery power to complete all 3 hours uninterrupted.",
              },
              {
                num: 4,
                title: "Continuous timer without breaks",
                desc: "The exam timer runs continuously for the full 3 hours. There are no scheduled breaks or pauses.",
              },
              {
                num: 5,
                title: "Test like the real thing",
                desc: "Find a quiet testing space and put away all books, study aids, and secondary electronic devices.",
              },
            ].map((rule) => (
              <div key={rule.num} className="p-3 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {rule.num}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13.5px] font-medium text-secondary leading-snug">
                    {rule.title}
                  </span>
                  <span className="text-[12px] text-gray-500 leading-relaxed">
                    {rule.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Agreement Card */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[15px] font-medium text-secondary flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Candidate Agreement
            </h3>
            <span className="text-[11px] font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-[3px] border border-primary/15">
              Required
            </span>
          </div>

          <div className="p-3 flex flex-col gap-2">
            {/* Agreement 1 */}
            <button
              type="button"
              role="checkbox"
              aria-checked={agreedLeave}
              onClick={() => setAgreedLeave(!agreedLeave)}
              className={`p-3 rounded-[3px] border transition-all flex items-start gap-3 text-left cursor-pointer ${
                agreedLeave
                  ? "bg-primary/5 border-primary text-gray-900 shadow-xs"
                  : "bg-gray-50/60 border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-[3px] border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                  agreedLeave
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                {agreedLeave && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </span>
              <span className="text-[13px] font-medium leading-snug">
                I understand that leaving the app ends my exam immediately.
              </span>
            </button>

            {/* Agreement 2 */}
            <button
              type="button"
              role="checkbox"
              aria-checked={agreedShare}
              onClick={() => setAgreedShare(!agreedShare)}
              className={`p-3 rounded-[3px] border transition-all flex items-start gap-3 text-left cursor-pointer ${
                agreedShare
                  ? "bg-primary/5 border-primary text-gray-900 shadow-xs"
                  : "bg-gray-50/60 border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-[3px] border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                  agreedShare
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                {agreedShare && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </span>
              <span className="text-[13px] font-medium leading-snug">
                I agree not to copy, screenshot, or share exam questions.
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Button matching Product Design System */}
      <div className="shrink-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] p-3 px-4 z-10">
        <button
          type="button"
          disabled={!canStart}
          onClick={handleStartClick}
          className={`w-full font-medium py-3 rounded-[3px] transition-all flex items-center justify-center gap-2 text-[15px] shadow-sm ${
            canStart
              ? "bg-primary hover:bg-primary/90 text-white cursor-pointer active:scale-[0.99]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Start exam • {time}</span>
        </button>
      </div>

      {/* Session Ready Confirmation Modal matching Product Design System */}
      {isExamActiveModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[3px] border border-gray-200 max-w-sm w-full p-5 shadow-2xl flex flex-col gap-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-secondary text-lg">Exam Session Ready</h3>
              <p className="text-xs text-gray-500 mt-1">
                <strong>{title}</strong> is prepared. Your 3-hour timer for all 180 questions will commence.
              </p>
              <div className="mt-3 p-3 bg-gray-50 rounded-[3px] border border-gray-200 flex justify-around text-xs text-secondary font-medium">
                <div>Format: <strong className="text-gray-900">Full Exam</strong></div>
                <div>Questions: <strong className="text-gray-900">180</strong></div>
                <div>Timer: <strong className="text-primary font-bold">3:00:00</strong></div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsExamActiveModal(false)}
                className="flex-1 py-3 border border-gray-200 text-secondary hover:text-gray-900 font-medium text-sm rounded-[3px] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBeginLiveExam}
                className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-medium text-sm rounded-[3px] shadow-sm transition-colors cursor-pointer"
              >
                Begin Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

