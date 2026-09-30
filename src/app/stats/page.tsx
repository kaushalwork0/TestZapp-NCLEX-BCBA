"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Calendar, Filter, Lightbulb, ChevronDown, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function BottomSheetSelect({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col flex-1">
        <label className="text-[11px] text-gray-500 mb-1 ml-1">{label}</label>
        <button 
          onClick={() => setIsOpen(true)}
          className="border border-gray-200 rounded px-2 py-1.5 bg-gray-50 w-full flex items-center justify-between text-[13px] text-gray-700 focus:outline-none"
        >
          <span className="truncate">{value}</span>
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 z-[100] flex flex-col justify-end"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-t-2xl w-full max-w-md mx-auto overflow-hidden shadow-2xl relative max-h-[70vh] flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                  <span className="font-medium text-gray-800 text-[15px]">Select {label}</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="overflow-y-auto overscroll-contain pb-6 scrollbar-hide">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        onChange(opt);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors active:bg-gray-100"
                    >
                      <span className={`text-[14px] ${value === opt ? 'text-primary font-medium' : 'text-gray-700'}`}>
                        {opt}
                      </span>
                      {value === opt && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function StatsPage() {
  const router = useRouter();
  const [statsTab, setStatsTab] = useState<"PRACTICE_EXAM" | "MOCK_EXAM">("PRACTICE_EXAM");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  
  const categoryOptions = [
    "All", "Question Type", "NCLEX Category", "Content", "Concept", "Nursing Process", "QSEN", "Cognitive Level", "Activity Statement"
  ];
  const subCategoryOptions = ["All"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("tab") === "mock_exam") {
        setStatsTab("MOCK_EXAM");
      }
    }
  }, []);

  const handleTabToggle = () => {
    setStatsTab(prev => prev === "PRACTICE_EXAM" ? "MOCK_EXAM" : "PRACTICE_EXAM");
  };

  const practiceStats = [
    { label: "Correct on 1st Attempt", count: 120, total: 3089, color: "bg-green-500" },
    { label: "Correct After Multiple Attempts", count: 45, total: 3089, color: "bg-orange-400" },
    { label: "Incorrect Responses", count: 85, total: 3089, color: "bg-red-500" },
    { label: "Skipped Questions", count: 15, total: 3089, color: "bg-slate-400" },
    { label: "Unattempted Questions", count: 2824, total: 3089, color: "bg-blue-500" },
  ];

  const submittedMockExams = [
    {
      id: "mock-01",
      title: "Baseline Readiness",
      date: "Jun 01 • 10:00 AM",
      score: "65%",
      stats: [
        { label: "Correct", value: "120 of 185", percentage: 65 },
        { label: "Incorrect", value: "55 of 185", percentage: 30 },
        { label: "Skipped", value: "10 of 185", percentage: 5 },
      ]
    },
    {
      id: "mock-02",
      title: "Mid-Term Review",
      date: "Jun 15 • 2:00 PM",
      score: "82%",
      stats: [
        { label: "Correct", value: "151 of 185", percentage: 82 },
        { label: "Incorrect", value: "30 of 185", percentage: 16 },
        { label: "Skipped", value: "4 of 185", percentage: 2 },
      ]
    }
  ];

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-gray-50">
      
      {/* Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center px-4 z-10 shadow-sm relative">
        <div className="flex items-center gap-2 text-white">
          <button onClick={() => router.back()} className="hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
            <ChevronLeft className="w-7 h-7" strokeWidth={2} />
          </button>
          <span className="text-lg font-normal tracking-wide ml-0.5">My Stats</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4 pb-24 scrollbar-hide">
        
        {/* Tab Toggle Card */}
        {/* <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-[15px] font-medium text-secondary">CCM Exam Practice Test:</h3>
          </div>
          <div className="p-4 flex items-center justify-center gap-4">
            <span className={`text-[13px] font-medium ${statsTab === "PRACTICE_EXAM" ? "text-secondary" : "text-gray-400"}`}>
              PRACTICE
            </span>
            
            <div 
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${statsTab === "MOCK_EXAM" ? "bg-secondary" : "bg-gray-200"}`}
              onClick={handleTabToggle}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${statsTab === "MOCK_EXAM" ? "translate-x-6" : ""}`} />
            </div>

            <span className={`text-[13px] font-medium ${statsTab === "MOCK_EXAM" ? "text-secondary" : "text-gray-400"}`}>
              MOCK
            </span>
          </div>
        </div> */}

        {statsTab === "PRACTICE_EXAM" ? (
          <>
            {/* Filter Questions & Diagnostics */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4">
              {/* <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-secondary" />
                <h3 className="text-[15px] font-medium text-slate-700">Filter Questions</h3>
              </div> */}
              <div className="flex gap-3">
                <BottomSheetSelect 
                  label="Category / Domain"
                  options={categoryOptions}
                  value={category}
                  onChange={setCategory}
                />
                <BottomSheetSelect 
                  label="Sub Category"
                  options={subCategoryOptions}
                  value={subCategory}
                  onChange={setSubCategory}
                />
              </div>
            </div>

            {/* Question Completion */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4">
              <h3 className="text-[16px] font-medium text-slate-700">Question Completion</h3>
              <p className="text-[13px] text-slate-400 mt-0.5 mb-6">Overall coverage of syllabus</p>
              
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F2F4F6" strokeWidth="12" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    strokeDasharray={2 * Math.PI * 40} 
                    strokeDashoffset={(2 * Math.PI * 40) * (1 - (250/3089))} 
                    className="text-success transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-slate-700 leading-none mb-1">250</span>
                  <span className="text-[11px] text-slate-400 font-medium border-t border-gray-100 pt-1 w-16">/ 3089</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[12px] mb-6">
                <div className="flex items-center gap-1.5 bg-gray-50/50 py-1 px-2 rounded">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="text-slate-600">Correct <span className="text-slate-400">(120)</span></span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50/50 py-1 px-2 rounded">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                  <span className="text-slate-600">Mult. Att <span className="text-slate-400">(45)</span></span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50/50 py-1 px-2 rounded">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <span className="text-slate-600">Incorrect <span className="text-slate-400">(85)</span></span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50/50 py-1 px-2 rounded">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <span className="text-slate-600">Unattempted <span className="text-slate-400">(2824)</span></span>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-100 rounded p-3 flex gap-2.5 items-start">
                <div className="mt-0.5 bg-white rounded-full p-0.5 shadow-sm">
                  <Lightbulb className="w-3.5 h-3.5 text-sky-500" />
                </div>
                <p className="text-[12px] text-sky-800 leading-snug">
                  <span className="font-medium">Target Velocity:</span> Student needs 50 questions/day to complete all the Questions in 30 days.
                </p>
              </div>
            </div>

            {/* Progress Breakdown */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4">
              <h3 className="text-[16px] font-medium text-slate-700">Progress Breakdown</h3>
              <p className="text-[12px] text-slate-400 mt-0.5 mb-5">Tap any category row to filter questions</p>
              
              <div className="flex flex-col gap-6">
                {practiceStats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-2 cursor-pointer group">
                    <div className="flex items-center justify-between text-[13px]">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                        <span className="text-slate-600 font-medium group-hover:text-slate-800 transition-colors">{stat.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[12px]">{stat.count} of {stat.total}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${stat.color}`} 
                        style={{ width: `${(stat.count / stat.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            {submittedMockExams.map((exam) => (
              <div key={exam.id} className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
                <div className="p-4 pb-3 border-b border-gray-50 flex justify-between items-start">
                  <div>
                    <h3 className="text-[16px] font-medium text-secondary">{exam.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exam.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    <span className="text-lg font-bold leading-none text-primary">{exam.score}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">Score</span>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-5">
                  {exam.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 cursor-pointer group">
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500">{stat.label}</span>
                        <span className="text-slate-500 font-medium">{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${stat.label === "Correct" ? "bg-green-500" : stat.label === "Incorrect" ? "bg-red-400" : "bg-gray-300"}`} 
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
