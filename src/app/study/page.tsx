"use client";

import { useState } from "react";
import { Search, RotateCw, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DrawerToggleIcon = ({ isOpen, color = "#C6364C" }: { isOpen: boolean, color?: string }) => (
  <div className="relative flex items-center justify-center w-[32px] h-[28px] rounded-[3px] border-[1.5px] border-white overflow-hidden cursor-pointer shrink-0">
    {/* Left solid part */}
    <div className="absolute left-0 top-0 bottom-0 w-[12px] bg-white flex flex-col justify-center items-center py-1 gap-[2.5px]">
       <div className="flex gap-[2px] items-center w-full px-[3px]">
         <div className="w-[2px] h-[2px] rounded-full" style={{ backgroundColor: color }} />
         <div className="flex-1 h-[1.5px]" style={{ backgroundColor: color }} />
       </div>
       <div className="flex gap-[2px] items-center w-full px-[3px]">
         <div className="w-[2px] h-[2px] rounded-full" style={{ backgroundColor: color }} />
         <div className="flex-1 h-[1.5px]" style={{ backgroundColor: color }} />
       </div>
       <div className="flex gap-[2px] items-center w-full px-[3px]">
         <div className="w-[2px] h-[2px] rounded-full" style={{ backgroundColor: color }} />
         <div className="flex-1 h-[1.5px]" style={{ backgroundColor: color }} />
       </div>
    </div>
    {/* Chevron */}
    <div className="absolute right-[2px]">
       {isOpen ? (
         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
       ) : (
         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
       )}
    </div>
  </div>
);

export default function StudyPage() {
  // Opens with drawer by default as requested ("opens with slight bluesh ham burger by default")
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const router = useRouter();
  const themeColor = "var(--color-primary)";
  const bluishText = "var(--color-secondary)";
  
  const sections = [
    "Nursing Process",
    "Quality and Safety Education for Nurses",
    "Cognitive Level",
    "Content",
    "Activity Statement",
    "Concept",
    "NCLEX Category"
  ];

  return (
    <div className="relative h-full overflow-hidden flex bg-background-muted">
      
      {/* Drawer Overlay (visible on the right when drawer is open) */}
      {isDrawerOpen && (
        <div 
          className="absolute inset-0 bg-black/40 z-20 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white z-30 transform transition-transform duration-300 ease-in-out shadow-[-10px_0_20px_rgba(0,0,0,0.1)] flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div 
          className="h-[56px] shrink-0 flex items-center px-4 justify-between"
          style={{ backgroundColor: themeColor }}
        >
          <span className="text-white text-lg font-medium tracking-wide">Study</span>
          
          <div className="flex items-center gap-4">
            <button className="text-white">
              <Search className="w-5 h-5" strokeWidth={2} />
            </button>
            <div onClick={() => setIsDrawerOpen(false)}>
              <DrawerToggleIcon isOpen={true} color={themeColor} />
            </div>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-white flex flex-col">
          <div className="mb-4">
            <h3 className="text-xs font-bold tracking-wider mb-2 text-secondary">
              SECTIONS IN PROGRESS
            </h3>
            
            <div className="flex gap-2 mb-2">
              <div className="w-[30%] bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.03)] rounded-[3px] p-2.5 flex items-center">
                <span className="text-success text-[15px] font-medium">0%</span>
              </div>
              <div className="flex-1 bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.03)] rounded-[3px] p-2.5 flex items-center">
                <span className="text-[15px]" style={{ color: bluishText }}>All Questions</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {sections.map((section, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-border-subtle shadow-[0_2px_4px_rgba(0,0,0,0.03)] rounded-[3px] p-2.5 flex items-center"
                >
                  <span className="text-[15px]" style={{ color: bluishText }}>{section}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex-1">
            <h3 className="text-xs font-bold tracking-wider mb-2 uppercase text-secondary">
              SECTIONS COMPLETED
            </h3>
          </div>

          <div className="mt-auto pt-6">
            <button 
              onClick={() => setIsResetModalOpen(true)}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded bg-background-muted border border-border-subtle hover:bg-gray-200 transition-colors text-primary font-medium"
            >
              <RotateCw className="w-4 h-4" strokeWidth={2.5} />
              Reset Section
            </button>
          </div>
        </div>
      </div>

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
            <span className="text-white text-lg font-medium tracking-wide truncate ml-0.5">All Questions</span>
          </div>
          
          <div onClick={() => setIsDrawerOpen(true)}>
            <DrawerToggleIcon isOpen={false} color={themeColor} />
          </div>
        </div>

        {/* Main Content Box */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
          <div className="w-full max-w-md bg-white border border-border-subtle shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-sm p-4 py-8 min-h-full">
            <div className="grid grid-cols-4 gap-y-6 gap-x-2 text-center">
              {Array.from({ length: 56 }).map((_, i) => (
                <div key={i} className="text-[#C8C8C8] text-[15px] cursor-pointer hover:text-gray-500 transition-colors">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reset Modal */}
      {isResetModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 transition-opacity" onClick={() => setIsResetModalOpen(false)} />
          <div className="relative bg-white rounded-xl w-full max-w-[300px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Reset Questions</h2>
              <p className="text-sm text-gray-600">Do you want to reset all the questions in this section?</p>
            </div>
            <div className="flex border-t border-gray-200">
              <button 
                onClick={() => setIsResetModalOpen(false)}
                className="flex-1 py-3.5 text-[#007AFF] font-medium border-r border-gray-200 hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button 
                onClick={() => {
                  setIsResetModalOpen(false);
                }}
                className="flex-1 py-3.5 text-red-500 font-semibold hover:bg-gray-50 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
