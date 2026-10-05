"use client";

import { ChevronLeft, ChevronDown, Check } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

const mockDatabase: Record<string, any> = {
  "1": {
    correct: 74.0,
    incorrect: 24.0,
    remaining: 0.0,
    total: 98.0,
    attempted: 98,
    timeSpent: "01:25:30",
    avgTime: "52 s",
    topics: [
      { name: "Clinical Decision Making", correct: 30, incorrect: 10, remaining: 0 },
      { name: "Collaboration", correct: 15, incorrect: 5, remaining: 0 },
      { name: "Managing Care", correct: 10, incorrect: 5, remaining: 0 },
      { name: "Quality Improvement", correct: 9, incorrect: 2, remaining: 0 },
      { name: "Teamwork and Collaboration", correct: 10, incorrect: 2, remaining: 0 },
    ]
  },
  "2": {
    correct: 50.0,
    incorrect: 0.0,
    remaining: 0.0,
    total: 50.0,
    attempted: 50,
    timeSpent: "00:45:10",
    avgTime: "54 s",
    topics: [
      { name: "Clinical Decision Making", correct: 10, incorrect: 0, remaining: 0 },
      { name: "Collaboration", correct: 10, incorrect: 0, remaining: 0 },
      { name: "Managing Care", correct: 10, incorrect: 0, remaining: 0 },
      { name: "Quality Improvement", correct: 10, incorrect: 0, remaining: 0 },
      { name: "Teamwork and Collaboration", correct: 10, incorrect: 0, remaining: 0 },
    ]
  },
  "3": {
    correct: 66.0,
    incorrect: 54.0,
    remaining: 0.0,
    total: 120.0,
    attempted: 120,
    timeSpent: "01:50:00",
    avgTime: "55 s",
    topics: [
      { name: "Clinical Decision Making", correct: 16, incorrect: 14, remaining: 0 },
      { name: "Collaboration", correct: 15, incorrect: 10, remaining: 0 },
      { name: "Managing Care", correct: 15, incorrect: 10, remaining: 0 },
      { name: "Quality Improvement", correct: 10, incorrect: 10, remaining: 0 },
      { name: "Teamwork and Collaboration", correct: 10, incorrect: 10, remaining: 0 },
    ]
  }
};

export default function QuizResultsPage() {
  const router = useRouter();
  const params = useParams();
  const [showPercentages, setShowPercentages] = useState(false);

  // Fetch data matching the tapped quiz, fallback to ID 1 if not found
  const quizId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const data = mockDatabase[quizId || "1"] || mockDatabase["1"];

  const getPercentage = (value: number, total: number) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const correctLength = (data.correct / data.total) * circumference;
  const incorrectLength = (data.incorrect / data.total) * circumference;
  const remainingLength = (data.remaining / data.total) * circumference;

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-white">
      {/* Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center px-4 z-10 shadow-sm gap-2">
        <button onClick={() => router.back()} className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <span className="text-white text-[17px] font-medium tracking-wide">Quiz Results</span>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Toggle */}
        <div className="flex justify-end items-center px-4 py-2 gap-2 text-primary font-medium text-[15px]">
          <span className={!showPercentages ? "opacity-100" : "opacity-40"}>0</span>
          <button 
            onClick={() => setShowPercentages(!showPercentages)}
            className="w-[42px] h-6 bg-gray-300 rounded-full relative flex items-center transition-colors px-0.5"
            aria-label="Toggle percentages"
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${showPercentages ? 'translate-x-[18px]' : 'translate-x-0'}`} />
          </button>
          <span className={showPercentages ? "opacity-100" : "opacity-40"}>%</span>
        </div>

        {/* Chart */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Remaining (grey) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F2F4F6" strokeWidth="12" />
                {/* Correct (green) */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeDasharray={`${correctLength} ${circumference}`}
                  strokeDashoffset={0} 
                  className="text-[#5cb85c] transition-all duration-1000 ease-out" 
                />
                {/* Incorrect (red) */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeDasharray={`${incorrectLength} ${circumference}`}
                  strokeDashoffset={-correctLength}
                  className="text-[#d9534f] transition-all duration-1000 ease-out" 
                />
                {/* Remaining (actual) if any */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeDasharray={`${remainingLength} ${circumference}`}
                  strokeDashoffset={-(correctLength + incorrectLength)}
                  className="text-[#c1c1c1] transition-all duration-1000 ease-out" 
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
               <span className="text-2xl font-bold text-slate-700 leading-none mb-1">
                 {showPercentages ? getPercentage(data.correct, data.total).toFixed(1) + '%' : data.correct.toFixed(0)}
               </span>
               <span className="text-[11px] text-slate-400 font-medium border-t border-gray-100 pt-1 px-2">
                 Correct
               </span>
             </div>
          </div>
          
          <div className="flex gap-4 text-[10.5px] font-medium text-[#4a4a4a]">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#5cb85c]" /> Correct</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#d9534f]" /> Incorrect</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#c1c1c1]" /> Remaining</div>
          </div>
        </div>

        {/* Stats columns */}
        <div className="mx-4 my-2 border-t border-b border-gray-200 flex divide-x divide-gray-200 text-center py-2 text-[#333]">
          <div className="flex-1 flex flex-col gap-1.5">
            <span className="text-[16px] font-semibold">{data.correct}</span>
            <span className="text-[13px] text-secondary">Correct</span>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <span className="text-[16px] font-semibold">{data.attempted}</span>
            <span className="text-[13px] text-secondary">Attempted</span>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <span className="text-[16px] font-semibold">{data.timeSpent}</span>
            <span className="text-[13px] text-secondary">Time Spent</span>
          </div>
        </div>

        {/* Practice Action */}
        <div className="px-4 mb-2">
          {data.incorrect > 0 ? (
            <div 
              onClick={() => router.push('/practice-incorrect')}
              className="bg-gradient-to-r from-[#ffeef0] to-[#fff5f6] border border-[#ffc4cc] rounded-[4px] p-2 my-4 flex items-center justify-between cursor-pointer shadow-xsm shadow-primary/5 hover:shadow active:scale-[0.99] transition-all group"
            >
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-primary tracking-tight">Practice Weak Areas</span>
                <span className="text-[12.5px] text-primary/75 font-medium mt-0.5">Review {data.incorrect} incorrect {data.incorrect === 1 ? 'question' : 'questions'}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                <ChevronLeft className="w-5 h-5 rotate-180 -mr-0.5" />
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f4fcf6] border border-[#bbf7d0] rounded-[10px] p-4 flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-[#166534] tracking-tight">Flawless Performance</span>
                <span className="text-[12.5px] text-[#166534]/75 font-medium mt-0.5">All questions answered correctly</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#166534]/10 flex items-center justify-center text-[#166534]">
                <Check className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>

        {/* Times */}
        <div className="px-5 flex flex-col gap-4 text-[13.5px] text-secondary pb-5 border-b border-gray-200">
          <div className="flex justify-between">
            <span>Avg. Time / Question:</span>
            <span>{data.avgTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Time Taken:</span>
            <span>{data.timeSpent}</span>
          </div>
        </div>

        {/* Dropdown & List */}
        <div className="p-4 mt-2">
          <div className="border border-gray-300 rounded-[4px] p-3 flex justify-between items-center mb-6">
            <span className="font-bold text-secondary text-[15px]">Concept</span>
            <ChevronDown className="w-5 h-5 text-secondary" />
          </div>

          <div className="flex flex-col gap-2">
            {data.topics.map((topic: { name: string; correct: number; incorrect: number; remaining: number }, i: number) => {
              const topicTotal = topic.correct + topic.incorrect + topic.remaining;
              // If topicTotal is 0, the bar is entirely grey. If there's 1 incorrect, it's 100% red.
              const pCorrect = getPercentage(topic.correct, topicTotal);
              const pIncorrect = getPercentage(topic.incorrect, topicTotal);
              const pRemaining = getPercentage(topic.remaining, topicTotal);
              
              return (
                <div 
                  key={i} 
                  className="flex flex-col gap-3 bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xsm hover:border-gray-300 hover:shadow-sm active:scale-[0.99] cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center text-[13.5px]">
                    <span className="text-[#64748b] font-medium">{topic.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#64748b]">
                        (<span className="text-[#5cb85c]">{topic.correct}</span>/
                        <span className="text-[#d9534f]">{topic.incorrect}</span>)
                      </span>
                      <span className="text-[#5cb85c] w-12 text-right">{pCorrect.toFixed(2)}%</span>
                      <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180 -mr-1" />
                    </div>
                  </div>
                  {/* Stacked Progress Bar */}
                  <div className="h-[6px] w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div style={{width: `${pCorrect}%`}} className="bg-[#5cb85c] h-full" />
                    <div style={{width: `${pIncorrect}%`}} className="bg-[#f06565] h-full" />
                    <div style={{width: `${pRemaining}%`}} className="bg-gray-300 h-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
