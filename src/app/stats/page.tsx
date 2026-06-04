"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StatsPage() {
  const router = useRouter();
  const [purchasedExams, setPurchasedExams] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("purchasedExams");
    if (saved) {
      try {
        setPurchasedExams(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-background-muted">
      
      {/* Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center px-4 gap-2.5 z-10 shadow-sm">
        <button onClick={() => router.back()} className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <span className="text-white text-lg font-normal tracking-wide ml-0.5">My Stats</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        
        {/* Placeholder for real stats */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-border-subtle text-center text-gray-500">
          <p>Overall Performance metrics will appear here.</p>
        </div>

        {/* Purchased Mock Exams Section */}
        <div>
          <h2 className="text-secondary font-bold mb-3 px-1 uppercase text-sm tracking-wide">Purchased Mock Exams</h2>
          
          {purchasedExams.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-border-subtle text-center text-gray-500 text-sm">
              <p>You have not purchased any mock exams yet.</p>
            </div>
          ) : (
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
                  <div className="flex justify-between items-center text-sm border-t border-gray-100 mt-1 pt-3">
                    <span className="text-gray-500">Questions: {pe.questions}</span>
                    <span className="text-gray-500">Time: {pe.hours}h</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
