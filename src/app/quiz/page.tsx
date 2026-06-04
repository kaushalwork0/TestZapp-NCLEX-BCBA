"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronDown, Info, Calendar, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { IOSCheckoutSheet } from "@/components/iOSCheckoutSheet";

// Hardcoded Mock Exams for the POC
const mockExams = [
  { id: "mock-1", title: "Baseline Readiness", description: "Best for first-time assessment", questions: 185, hours: 4, price: "$49.99", color: "text-green-600", dot: "bg-green-500", sessions: ["Jun 20 • 9:00 AM", "Jun 21 • 2:00 PM", "Jun 24 • 6:00 PM"] },
  { id: "mock-2", title: "Progress Checkpoint", description: "Measure improvement", questions: 185, hours: 4, price: "$59.99", color: "text-yellow-600", dot: "bg-yellow-500", sessions: ["Jul 01 • 9:00 AM", "Jul 05 • 2:00 PM", "Jul 10 • 6:00 PM"] },
  { id: "mock-3", title: "Final Readiness", description: "Closest to exam day", questions: 185, hours: 4, price: "$69.99", color: "text-red-600", dot: "bg-red-500", sessions: ["Aug 05 • 9:00 AM", "Aug 10 • 2:00 PM", "Aug 15 • 6:00 PM"] }
];

export default function QuizPage() {
  const router = useRouter();
  const [quizMode, setQuizMode] = useState<"STUDY" | "EXAM">("STUDY");
  
  // Study Mode State
  const [answerMode, setAnswerMode] = useState<"AS_I_GO" | "AT_END">("AS_I_GO");
  const [quizName, setQuizName] = useState("Jun-04-2026 02:30:57");
  
  // Exam Mode State
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutExam, setCheckoutExam] = useState<any>(null);
  
  // Persistence for Purchased Exams
  const [purchasedExams, setPurchasedExams] = useState<any[]>([]);
  
  // Warning Modal State
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [startExamData, setStartExamData] = useState<any>(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("purchasedExams");
    if (saved) {
      try {
        setPurchasedExams(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleQuizModeToggle = () => {
    if (quizMode === "STUDY") {
      setQuizMode("EXAM");
    } else {
      setQuizMode("STUDY");
    }
  };

  const handlePurchaseSuccess = () => {
    if (checkoutExam) {
      const updated = [...purchasedExams, checkoutExam];
      setPurchasedExams(updated);
      localStorage.setItem("purchasedExams", JSON.stringify(updated));
      setSelectedExamId(null);
      setSelectedSession(null);
    }
  };

  const openCheckout = () => {
    if (selectedExamId && selectedSession) {
      const exam = mockExams.find(e => e.id === selectedExamId);
      if (exam) {
        setCheckoutExam({ ...exam, session: selectedSession });
        setIsCheckoutOpen(true);
      }
    }
  };

  const handleStartExam = (exam: any) => {
    setStartExamData(exam);
    setIsWarningOpen(true);
    setAgreed(false);
  };

  const handleAgreeAndContinue = () => {
    setIsWarningOpen(false);
    alert("Exam Started! (POC placeholder - this would route to actual exam screen)");
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

        {quizMode === "STUDY" && (
          <>
            {/* Answer Mode Card */}
            <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
              <div className="p-3 border-b border-gray-100">
                <h3 className="text-[15px] font-medium text-secondary">Answer Mode:</h3>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input type="radio" name="answerMode" className="opacity-0 absolute" checked={answerMode === "AS_I_GO"} onChange={() => setAnswerMode("AS_I_GO")} />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answerMode === "AS_I_GO" ? "border-secondary" : "border-gray-300"}`}>
                      {answerMode === "AS_I_GO" && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                    </div>
                  </div>
                  <span className={`text-[15px] ${answerMode === "AS_I_GO" ? "text-secondary" : "text-gray-500"}`}>Show answers as I go</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input type="radio" name="answerMode" className="opacity-0 absolute" checked={answerMode === "AT_END"} onChange={() => setAnswerMode("AT_END")} />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answerMode === "AT_END" ? "border-secondary" : "border-gray-300"}`}>
                      {answerMode === "AT_END" && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                    </div>
                  </div>
                  <span className={`text-[15px] ${answerMode === "AT_END" ? "text-secondary" : "text-gray-500"}`}>Show answers at the end</span>
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

            {/* Study Bottom Card */}
            <div className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
              <div className="p-3 border-b border-gray-100">
                <h3 className="text-[15px] font-medium text-secondary">Number of Questions</h3>
              </div>
              <div className="p-4 text-center">
                <span className="text-[15px] text-gray-600">2579</span>
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-lg py-3.5 rounded-[4px] mt-1 transition-colors shadow-sm">
              START
            </button>
          </>
        )}

        {quizMode === "EXAM" && (
          <div className="flex flex-col gap-4 mt-2">
            
            {/* My Exams Section (Purchased) */}
            {purchasedExams.length > 0 && (
              <div className="mb-4">
                <h2 className="text-secondary font-bold mb-3 px-1 uppercase text-sm tracking-wide">My Exams</h2>
                <div className="flex flex-col gap-3">
                  {purchasedExams.map((pe, idx) => (
                    <div key={idx} className="bg-white border-l-4 border-l-green-500 border border-border-subtle shadow-sm rounded p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-secondary">{pe.title}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{pe.session}</span>
                          </div>
                        </div>
                        <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded">Scheduled</span>
                      </div>
                      <button 
                        onClick={() => handleStartExam(pe)}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-2.5 rounded mt-1 transition-colors text-sm"
                      >
                        Start Exam
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-secondary font-bold mb-1 px-1 uppercase text-sm tracking-wide">Available Mock Exams</h2>

            {/* Mock Exam Cards */}
            {mockExams.map(exam => (
              <div 
                key={exam.id} 
                className={`bg-white border-2 rounded-[6px] transition-all overflow-hidden ${selectedExamId === exam.id ? 'border-primary shadow-md' : 'border-border-subtle shadow-sm'}`}
              >
                <div className="p-4 flex flex-col gap-2 cursor-pointer" onClick={() => setSelectedExamId(exam.id)}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${exam.dot}`} />
                      <h4 className="font-bold text-gray-900">{exam.title}</h4>
                    </div>
                    <span className="font-bold text-lg text-primary">{exam.price}</span>
                  </div>
                  <p className="text-sm text-gray-500">{exam.description}</p>
                  
                  <div className="flex gap-4 mt-2 text-sm text-gray-600 font-medium bg-gray-50 p-2 rounded w-fit">
                    <span>{exam.questions} Questions</span>
                    <span>•</span>
                    <span>{exam.hours} Hours</span>
                  </div>
                </div>

                {/* Session Selection */}
                {selectedExamId === exam.id && (
                  <div className="px-4 pb-4 pt-1 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-sm font-medium text-secondary mb-3 border-t border-gray-100 pt-3">Select Session:</p>
                    <div className="flex flex-wrap gap-2">
                      {exam.sessions.map((session, sIdx) => (
                        <div 
                          key={sIdx}
                          onClick={() => setSelectedSession(session)}
                          className={`text-sm px-3 py-2 rounded-full cursor-pointer border transition-colors ${selectedSession === session ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
                        >
                          {session}
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      disabled={!selectedSession}
                      onClick={openCheckout}
                      className="w-full mt-5 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded transition-colors"
                    >
                      Purchase Selected Exam
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Sheet */}
      <IOSCheckoutSheet
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handlePurchaseSuccess}
        title={checkoutExam?.title}
        price={checkoutExam?.price}
      />

      {/* Exam-Day Warning Modal */}
      {isWarningOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setIsWarningOpen(false)} />
          <div className="relative bg-white rounded-xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-primary p-4 text-center">
              <h2 className="text-xl font-bold text-white">Before You Begin</h2>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex gap-3 text-yellow-800 text-sm">
                <Info className="w-5 h-5 shrink-0" />
                <p>You are about to start <strong>{startExamData?.title}</strong>. Please confirm you understand the exam conditions.</p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {[
                  "I understand this is a 4-hour timed exam",
                  "I understand the exam cannot be paused",
                  "I understand results assess readiness",
                  "I understand purchases are non-refundable",
                  "I understand exam content is confidential"
                ].map((req, idx) => (
                  <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 shrink-0">
                      <input 
                        type="checkbox" 
                        className="opacity-0 absolute" 
                        checked={agreed} // In a real app, each would have its own state. For POC, one toggle agrees to all or we just use a generic agreed state.
                        onChange={(e) => setAgreed(e.target.checked)} 
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${agreed ? "bg-primary border-primary" : "border-gray-300 group-hover:border-primary/50"}`}>
                        {agreed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 leading-snug">{req}</span>
                  </label>
                ))}
              </div>

              <button 
                disabled={!agreed}
                onClick={handleAgreeAndContinue}
                className="w-full mt-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded transition-all active:scale-[0.98]"
              >
                Agree & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
