"use client";

import { 
  Sparkles, 
  ShoppingCart, 
  Check, 
  X, 
  HelpCircle, 
  FileText, 
  LayoutGrid, 
  Bookmark, 
  Stethoscope, 
  CalendarDays, 
  BrainCircuit, 
  Settings,
  Brain
} from "lucide-react";
import { CheckoutDemo } from "@/components/CheckoutDemo"; // We might want to mount the sheet here if needed
import { useState, useEffect } from "react";
import { IOSCheckoutSheet } from "@/components/iOSCheckoutSheet";
import { AndroidCheckoutSheet } from "@/components/AndroidCheckoutSheet";
import Link from "next/link";

function StatBox({ icon, title, subtitle, titleColor = "text-gray-900", subtitleColor = "text-gray-500", customTitle = null }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col items-center justify-center text-center gap-1.5 border border-gray-50/50">
      <div className="flex items-center justify-center gap-1.5">
        {icon}
        {customTitle ? customTitle : <span className={`text-xl font-medium ${titleColor}`}>{title}</span>}
      </div>
      <span className={`text-[9px] font-medium tracking-wider uppercase ${subtitleColor}`}>{subtitle}</span>
    </div>
  );
}

function GridBox({ icon, title, disabled = false, subtitle = null }: any) {
  return (
    <div className={`bg-white rounded-xs shadow-sm aspect-[4/4.5] flex flex-col items-center justify-center gap-4 border border-gray-50/50 ${disabled ? 'opacity-50' : 'hover:scale-[1.02] transition-transform cursor-pointer'}`}>
      <div className={`${disabled ? 'text-gray-300' : 'text-primary'}`}>
        {icon}
      </div>
      <div className="flex flex-col items-center">
        <span className={`text-sm font-medium ${disabled ? 'text-gray-300' : 'text-gray-700'}`}>{title}</span>
        {subtitle && <span className="text-[10px] text-gray-300 mt-1">{subtitle}</span>}
      </div>
    </div>
  );
}

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [purchasedCount, setPurchasedCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("purchasedExams");
    if (saved) {
      try {
        setPurchasedCount(JSON.parse(saved).length);
      } catch (e) {}
    }
  }, []);

  return (
    <div className="relative h-full overflow-hidden bg-[#f8f9fa] flex flex-col">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header Background */}
        <div className="absolute top-0 left-0 right-0 h-[160px] bg-primary z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 55%, 0% 100%)' }} />

        {/* Header */}
        <div className="relative z-10 shrink-0">
          <div className="flex justify-between items-center text-white">
            <img src="/galaxy.png" alt="Galaxy" className="h-[60px] w-auto object-contain" />
            <img src="/skyscape-logo-header.png" alt="skyscape" className="h-[60px] w-auto object-contain" />
            <button onClick={() => setIsSheetOpen(true)} className="hover:opacity-80 transition-opacity flex items-center justify-center">
              <img src="/cart.png" alt="Cart" className="h-[60px] w-auto object-contain" />
            </button>
          </div>
        </div>
        
        {/* Badge overlay */}
        <div className="relative mt-4  flex flex-col items-center z-20 shrink-0">
          <img 
            src="/BCBA%20app%20icon.png" 
            alt="BCBA ABA Exam Practice Test" 
            className="w-[100px] h-[100px] rounded-full shadow-xl border-[3px] border-white object-cover bg-white"
          />
          <h2 className="mt-5 text-[22px] font-medium text-gray-700 text-center px-4 leading-tight">BCBA ABA Exam Practice Test</h2>
          <span className="text-sm text-gray-400 mt-2">Skyscape Team</span>
        </div>

        {/* Stats */}
        <div className="px-4 mt-4 shrink-0">
          <div className="grid grid-cols-4 gap-2.5">
            <StatBox icon={<Check className="w-7 h-7 text-[#65a30d]" strokeWidth={2.5} />} title="0" subtitle="CORRECT" />
            <StatBox icon={<X className="w-7 h-7 text-[#dc2626]" strokeWidth={2.5} />} title="0" subtitle="INCORRECT" />
            <StatBox icon={<HelpCircle className="w-7 h-7 text-[#d97706]" strokeWidth={2.5} />} title="2579" subtitle="UNATTEMPTED" />
            
            <Link href="/stats">
              <StatBox 
                customTitle={
                  <div className="h-7 flex items-end gap-[3px] justify-center pt-1">
                    <div className="w-1.5 h-4 bg-primary rounded-t-sm" />
                    <div className="w-1.5 h-6 bg-primary rounded-t-sm" />
                    <div className="w-1.5 h-3 bg-primary rounded-t-sm" />
                  </div>
                } 
                subtitle="My stats" 
                titleColor="text-primary" 
                subtitleColor="text-primary underline decoration-primary/30 underline-offset-2" 
              />
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="px-4 mt-4 grid grid-cols-3 gap-3 shrink-0">
          <Link href="/study">
            <GridBox icon={<img src="/study.png" alt="Study" className="w-10 h-10 object-contain" />} title="Study" />
          </Link>
          <Link href="/quiz">
            <GridBox icon={<img src="/quiz.png" alt="Quiz" className="w-10 h-10 object-contain" />} title="Quiz" />
          </Link>
          <GridBox icon={<img src="/bookmark.png" alt="Bookmark" className="w-10 h-10 object-contain" />} title="Bookmark" />
          <GridBox icon={<img src="/resources.png" alt="Resources" className="w-10 h-10 object-contain" />} title="Resources" />
          <GridBox icon={<img src="/study%20goal.png" alt="Study Goal" className="w-10 h-10 object-contain" />} title="Study Goal" />
          <GridBox icon={<img src="/querious%20ai.png" alt="QueriousAI" className="w-10 h-10 object-contain opacity-40 grayscale" />} title="QueriousAI" disabled subtitle="Not available" />
        </div>

        {/* Footer */}
        <div className="mt-auto px-4 py-2 flex justify-end shrink-0">
          <button className="p-2 text-primary hover:opacity-80 transition-opacity">
            <Settings className="w-8 h-8" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Reusing iOS Checkout Sheet for demo on shopping cart click */}
      <IOSCheckoutSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSuccess={() => setIsSuccess(true)}
      />
    </div>
  );
}
