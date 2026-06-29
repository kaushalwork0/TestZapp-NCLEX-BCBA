"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StatsPage() {
  const router = useRouter();
  const [statsTab, setStatsTab] = useState<"PRACTICE_EXAM" | "MOCK_EXAM">("PRACTICE_EXAM");

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
    { label: "Correct", value: "0 of 3089", percentage: 0 },
    { label: "Correct Multiple Attempts", value: "0 of 3089", percentage: 0 },
    { label: "Incorrect", value: "0 of 3089", percentage: 0 },
    { label: "Skipped", value: "0 of 3089", percentage: 0 },
    { label: "Unattempted", value: "3089 of 3089", percentage: 100 },
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

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4 pb-24">
        
        {/* Tab Toggle Card */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-[15px] font-medium text-secondary">BCBA ABA Exam:</h3>
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
        </div>

        {statsTab === "PRACTICE_EXAM" ? (
          <>
            {/* Focus on your weak areas Card */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-5">
              <h2 className="text-[19px] font-normal text-center text-slate-600 mb-8 mt-2">Focus on your weak areas</h2>
              
              <div className="flex gap-4 px-2">
                <div className="flex-1 border-b border-gray-300 pb-1.5">
                  <select className="w-full appearance-none bg-transparent text-center text-[15px] text-gray-700 focus:outline-none cursor-pointer tracking-wide">
                    <option>All</option>
                  </select>
                </div>
                <div className="flex-1 border-b border-gray-300 pb-1.5">
                  <select className="w-full appearance-none bg-transparent text-center text-[15px] text-gray-700 focus:outline-none cursor-pointer tracking-wide">
                    <option>All</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 text-[11px] text-gray-300 font-medium tracking-wide pl-2">
                Question
              </div>
            </div>

            {/* Question Stats Card */}
            <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
              <div className="p-4 pb-2">
                <h3 className="text-[17px] font-normal text-slate-600">Question Stats</h3>
                <p className="text-[15px] text-slate-400 mt-1">Tap to Review/Attempt</p>
              </div>
              
              <div className="p-4 pt-1 flex flex-col gap-6">
                {practiceStats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-2 cursor-pointer group">
                    <div className="flex justify-between items-center text-[15px]">
                      <span className="text-slate-400 group-hover:text-slate-500 transition-colors">{stat.label}</span>
                      <span className="text-slate-400">{stat.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-gray-300 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${stat.percentage}%` }}
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
