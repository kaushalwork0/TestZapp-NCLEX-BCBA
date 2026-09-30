"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PracticeIncorrectPage() {
  const router = useRouter();
  const themeColor = "var(--color-primary)";

  return (
    <div className="relative h-full overflow-hidden flex bg-background-muted">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background-muted relative z-10">
        {/* Main Header */}
        <div 
          className="h-[56px] shrink-0 flex items-center px-4 justify-between"
          style={{ backgroundColor: themeColor }}
        >
          <div className="flex items-center gap-2.5">
            <button onClick={() => router.back()} className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
              <ChevronLeft className="w-7 h-7" strokeWidth={2} />
            </button>
            <span className="text-white text-lg font-medium tracking-wide truncate ml-0.5">Incorrect Quiz Questions</span>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
          <div className="w-full max-w-md bg-white border border-border-subtle shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-2xl p-6 min-h-full">
            
            <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-[16px] font-semibold text-secondary">Jul-08-2026 10:15:00</h2>
                <p className="text-[13px] text-gray-500 mt-1">24 Incorrect Questions (out of 98)</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-y-6 gap-x-2 text-center">
              {[
                3, 7, 12, 14, 21, 25, 29, 33, 38, 41,
                45, 49, 52, 57, 61, 66, 72, 75, 78, 83,
                88, 91, 94, 97
              ].map((qNum, i) => (
                <div key={i} className="text-red-400 font-medium text-[15px] cursor-pointer hover:text-red-500 hover:bg-red-50 py-1.5 rounded-lg transition-all">
                  {qNum}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
