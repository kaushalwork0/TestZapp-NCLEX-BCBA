"use client";

import { useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  const [quizMode, setQuizMode] = useState<"STUDY" | "EXAM">("STUDY");
  
  // Study Mode State
  const [answerMode, setAnswerMode] = useState<"AS_I_GO" | "AT_END">("AS_I_GO");
  const [quizName, setQuizName] = useState("Jun-04-2026 02:30:57");

  const [timeLimit, setTimeLimit] = useState(5);

  const handleQuizModeToggle = () => {
    if (quizMode === "STUDY") {
      setQuizMode("EXAM");
    } else {
      setQuizMode("STUDY");
    }
  };

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-background-muted">
      {/* Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center px-4 gap-2.5 z-10 shadow-sm">
        <button onClick={() => router.back()} className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <span className="text-white text-lg font-normal tracking-wide ml-0.5">Get Started</span>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24">
        
        {/* Quiz Mode Card */}
        <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-[15px] font-medium text-secondary">Quiz Mode:</h3>
          </div>
          <div className="p-4 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${quizMode === "STUDY" ? "text-secondary" : "text-gray-400"}`}>
              STUDY
            </span>
            
            <div 
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${quizMode === "EXAM" ? "bg-secondary" : "bg-gray-200"}`}
              onClick={handleQuizModeToggle}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${quizMode === "EXAM" ? "translate-x-6" : ""}`} />
            </div>

            <span className={`text-sm font-medium ${quizMode === "EXAM" ? "text-secondary" : "text-gray-400"}`}>
              EXAM
            </span>
          </div>
        </div>

        {/* Answer Mode Card */}
        <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-[15px] font-medium text-secondary">Answer Mode:</h3>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {quizMode === "STUDY" && (
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="radio" name="answerMode" className="opacity-0 absolute" checked={answerMode === "AS_I_GO"} onChange={() => setAnswerMode("AS_I_GO")} />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answerMode === "AS_I_GO" ? "border-secondary" : "border-gray-300"}`}>
                    {answerMode === "AS_I_GO" && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                  </div>
                </div>
                <span className={`text-[15px] ${answerMode === "AS_I_GO" ? "text-secondary" : "text-gray-500"}`}>Show answers as I go</span>
              </label>
            )}
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input type="radio" name="answerMode" className="opacity-0 absolute" checked={quizMode === "EXAM" || answerMode === "AT_END"} onChange={() => quizMode === "STUDY" && setAnswerMode("AT_END")} />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${quizMode === "EXAM" || answerMode === "AT_END" ? "border-secondary" : "border-gray-300"}`}>
                  {(quizMode === "EXAM" || answerMode === "AT_END") && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                </div>
              </div>
              <span className={`text-[15px] ${quizMode === "EXAM" || answerMode === "AT_END" ? "text-secondary" : "text-gray-500"}`}>Show answers at the end</span>
            </label>
          </div>
        </div>

        {/* Enter Quiz Name Card */}
        <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-[15px] font-medium text-secondary">Enter Quiz Name:</h3>
          </div>
          <div className="p-4">
            <input 
              type="text" 
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 text-[15px] text-secondary focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
        </div>

        {/* Categories / Subcategories */}
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-4">
            <h3 className="text-[15px] font-medium text-secondary mb-3">Categories:</h3>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 rounded-[3px] px-3 py-2.5 text-[15px] text-secondary bg-white focus:outline-none pr-10 cursor-pointer">
                <option>Question Type</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-[15px] font-medium text-secondary mt-5 mb-3">Subcategories:</h3>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 rounded-[3px] px-3 py-2.5 text-[15px] text-secondary bg-white focus:outline-none pr-10 cursor-pointer">
                <option>All subcategories selected</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card depending on mode */}
        {quizMode === "STUDY" ? (
          <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
            <div className="p-3 border-b border-gray-100">
              <h3 className="text-[15px] font-medium text-secondary">Number of Questions</h3>
            </div>
            <div className="p-4 text-center">
              <span className="text-[15px] text-gray-600">2579</span>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
            <div className="p-3 border-b border-gray-100">
              <h3 className="text-[15px] font-medium text-secondary">Select time to attempt 2579 questions:</h3>
            </div>
            <div className="p-4 flex flex-col items-center gap-4">
              <span className="text-[15px] text-gray-600">{timeLimit} minutes</span>
              <input 
                type="range" 
                min="5" 
                max="240" 
                step="5"
                value={timeLimit} 
                onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                className="w-full accent-gray-300 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-lg py-3.5 rounded-[4px] mt-1 transition-colors shadow-sm">
          START
        </button>
      </div>
    </div>
  );
}
