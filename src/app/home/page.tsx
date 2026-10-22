"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ClipboardCheck,
  Timer,
  Bookmark,
  Library,
  Target,
  BarChart3,
  Check,
  X,
  HelpCircle,
  Settings,
  ShoppingCart,
  ChevronRight,
  Trash2,
  Sparkles,
  TrendingUp,
  Flame,
  LayoutGrid,
  Columns2,
  FileText,
  RotateCcw,
  ExternalLink,
  Award,
  Bell,
  Volume2,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { IOSCheckoutSheet } from "@/components/iOSCheckoutSheet";
import { AndroidCheckoutSheet } from "@/components/AndroidCheckoutSheet";

export default function Home() {
  const router = useRouter();

  // State
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [purchasedCount, setPurchasedCount] = useState(0);

  // Layout preference: "featured" (Hero Mock Exam + 6 tiles) or "grid" (2-column rich grid)
  const [layoutMode, setLayoutMode] = useState<"featured" | "grid">("featured");

  // Interactive Bottom Sheets
  const [activeSheet, setActiveSheet] = useState<"bookmark" | "goal" | "resources" | "settings" | null>(null);

  // Goal state demo
  const [dailyGoal, setDailyGoal] = useState(25);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  // Sync cart and purchases
  useEffect(() => {
    const saved = localStorage.getItem("purchasedMockExams");
    if (saved) {
      try {
        setPurchasedCount(JSON.parse(saved).length);
      } catch (e) {}
    }
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {}
    }
  }, []);

  const updateCart = (newCart: any[]) => {
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const handlePurchaseSuccess = () => {
    if (cartItems.length > 0) {
      const savedExams = localStorage.getItem("purchasedMockExams");
      let purchasedExams = [];
      if (savedExams) {
        try {
          purchasedExams = JSON.parse(savedExams);
        } catch (e) {}
      }
      const updated = [...purchasedExams, ...cartItems];
      localStorage.setItem("purchasedMockExams", JSON.stringify(updated));
      setPurchasedCount(updated.length);
      updateCart([]);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
    }
  };

  // Stats numbers
  const stats = {
    correct: 6,
    incorrect: 26,
    unattempted: 297,
  };
  const totalQuestions = stats.correct + stats.incorrect + stats.unattempted; // 329
  const attemptedQuestions = stats.correct + stats.incorrect; // 32
  const progressPercent = ((attemptedQuestions / totalQuestions) * 100).toFixed(1);
  const correctPercent = ((stats.correct / totalQuestions) * 100).toFixed(1);
  const incorrectPercent = ((stats.incorrect / totalQuestions) * 100).toFixed(1);

  return (
    <div className="relative h-full overflow-hidden bg-[#f8f9fa] flex flex-col font-sans select-none">
      {/* Scrollable Container */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-4">
        
        {/* Header Background */}
        <div
          className="absolute top-0 left-0 right-0 h-[175px] bg-[#d61a43] z-0"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 68%, 0% 100%)" }}
        />

        {/* Top App Bar */}
        <div className="relative z-10 shrink-0 px-4 pt-2">
          <div className="flex justify-between items-center text-white h-[58px]">
            {/* Galaxy Logo */}
            <div className="flex items-center gap-1.5">
              <img
                src="/galaxy.png"
                alt="Galaxy"
                className="h-[44px] w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Skyscape Header Logo */}
            <div className="flex items-center justify-center">
              <img
                src="/skyscape-logo-header.png"
                alt="Skyscape"
                className="h-[48px] w-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-white"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6 text-white" strokeWidth={2.2} />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] px-1 bg-white text-primary text-[11px] font-black rounded-full flex items-center justify-center border-2 border-primary shadow-sm animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Hero Subject Badge & Title */}
        <div className="relative mt-2 flex flex-col items-center z-20 shrink-0 px-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-amber-500/20 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
            <img
              src="/CCM Exam prep.jpg"
              alt="CCM Exam Practice Test"
              className="relative w-[94px] h-[94px] rounded-full shadow-xl border-[3.5px] border-white object-cover bg-white ring-2 ring-primary/20"
            />
          </div>

          <h1 className="mt-3 text-[21px] font-bold text-gray-800 text-center leading-tight tracking-tight">
            CCM Exam Practice Test
          </h1>
          <p className="text-xs text-gray-500 font-medium text-center mt-1">
            Deanna Cooper Gillingham, RN, CCM
          </p>
        </div>

        {/* Quick Readiness Stats */}
        <div className="px-4 mt-3.5 shrink-0">
          <div className="bg-white rounded-2xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/80">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-2">
              {/* Correct */}
              <Link
                href="/stats"
                className="group bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100/80 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-lg font-bold text-emerald-700 leading-none">
                    {stats.correct}
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-800/80 uppercase mt-1.5">
                  CORRECT
                </span>
              </Link>

              {/* Incorrect */}
              <Link
                href="/practice-incorrect"
                className="group bg-rose-50/60 hover:bg-rose-50 border border-rose-100/80 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02] active:scale-95 relative"
                title="Review Incorrect Questions"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-lg font-bold text-rose-700 leading-none">
                    {stats.incorrect}
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-rose-800/80 uppercase mt-1.5 flex items-center gap-0.5">
                  INCORRECT
                </span>
              </Link>

              {/* Unattempted */}
              <div className="bg-amber-50/60 border border-amber-100/80 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-lg font-bold text-amber-700 leading-none">
                    {stats.unattempted}
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-amber-800/80 uppercase mt-1.5">
                  UNATTEMPTED
                </span>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[11px] font-medium text-gray-500">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  All Questions Progress
                </span>
                <span className="text-gray-700 font-semibold">
                  {attemptedQuestions} / {totalQuestions} Attempted ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${correctPercent}%` }}
                  title={`Correct: ${stats.correct}`}
                />
                <div
                  className="bg-rose-500 h-full transition-all duration-500"
                  style={{ width: `${incorrectPercent}%` }}
                  title={`Incorrect: ${stats.incorrect}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Header & View Switcher */}
        <div className="px-4 mt-4 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Study & Exam Modules
            </span>
            <span className="px-1.5 py-0.2 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
              7
            </span>
          </div>

          <div className="flex items-center bg-gray-200/70 p-0.5 rounded-lg border border-gray-200">
            <button
              onClick={() => setLayoutMode("featured")}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                layoutMode === "featured"
                  ? "bg-white text-primary shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              Featured
            </button>
            <button
              onClick={() => setLayoutMode("grid")}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                layoutMode === "grid"
                  ? "bg-white text-primary shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Columns2 className="w-3 h-3" />
              Grid
            </button>
          </div>
        </div>

        {/* ACTION MODULES CONTENT */}
        {layoutMode === "featured" ? (
          /* FEATURED VIEW: Mock Exam Hero Tile + 6 Balanced Grid Tiles */
          <div className="px-4 mt-2.5 flex flex-col gap-2.5 shrink-0">
            {/* NEW TILE: MOCK EXAM (Prominently featured simulation card) */}
            <Link
              href="/mock-exam"
              className="relative overflow-hidden group bg-gradient-to-r from-red-50/90 via-white to-red-50/50 hover:to-red-100/60 border border-primary/25 hover:border-primary/50 shadow-sm hover:shadow-md rounded-2xl p-3.5 transition-all duration-200 active:scale-[0.99] flex items-center justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/25 shrink-0 group-hover:scale-105 transition-transform">
                  <Timer className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[15px] font-bold text-gray-900 leading-tight">
                      Mock Exam
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9.5px] font-black uppercase tracking-wide border border-primary/20">
                      Simulation
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-600 font-medium mt-0.5 truncate">
                    4-Hour Timed Simulation • 185 Qs
                  </span>
                  <span className="text-[10px] text-primary/80 font-semibold mt-0.5">
                    Real Exam Environment
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 relative z-10 pl-2">
                <span className="hidden sm:inline-flex text-xs font-bold text-primary">
                  Start
                </span>
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-sm">
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </div>
            </Link>

            {/* 6 Balanced Supporting Study Tiles (3 columns x 2 rows) */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Study */}
              <Link
                href="/study"
                className="bg-white hover:bg-gray-50/80 active:scale-95 border border-gray-100 hover:border-primary/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-800">Study</span>
                  <span className="text-[9.5px] text-gray-400 font-medium">All Questions</span>
                </div>
              </Link>

              {/* Quiz */}
              <Link
                href="/quiz"
                className="bg-white hover:bg-gray-50/80 active:scale-95 border border-gray-100 hover:border-primary/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-800">Quiz</span>
                  <span className="text-[9.5px] text-gray-400 font-medium">Custom Test</span>
                </div>
              </Link>

              {/* My Stats */}
              <Link
                href="/stats"
                className="bg-white hover:bg-gray-50/80 active:scale-95 border border-gray-100 hover:border-primary/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-800">My stats</span>
                  <span className="text-[9.5px] text-gray-400 font-medium">Analytics</span>
                </div>
              </Link>

              {/* Bookmark */}
              <button
                onClick={() => setActiveSheet("bookmark")}
                className="bg-white hover:bg-gray-50/80 active:scale-95 border border-gray-100 hover:border-primary/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center shrink-0">
                  <Bookmark className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-800">Bookmark</span>
                  <span className="text-[9.5px] text-gray-400 font-medium">Saved Qs</span>
                </div>
              </button>

              {/* Study Goal */}
              <button
                onClick={() => setActiveSheet("goal")}
                className="bg-white hover:bg-gray-50/80 active:scale-95 border border-gray-100 hover:border-primary/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-800">Study Goal</span>
                  <span className="text-[9.5px] text-gray-400 font-medium">Daily Pace</span>
                </div>
              </button>

              {/* Resources (Updated from wrench to learning library!) */}
              <button
                onClick={() => setActiveSheet("resources")}
                className="bg-white hover:bg-gray-50/80 active:scale-95 border border-gray-100 hover:border-primary/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 text-primary flex items-center justify-center shrink-0">
                  <Library className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-800">Resources</span>
                  <span className="text-[9.5px] text-gray-400 font-medium">CCM Guides</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* GRID VIEW: 2-column rich modern cards */
          <div className="px-4 mt-2.5 grid grid-cols-2 gap-2.5 shrink-0">
            {/* Tile 1: Mock Exam */}
            <Link
              href="/mock-exam"
              className="bg-gradient-to-br from-red-50/90 to-white hover:to-red-100/50 border border-primary/30 rounded-2xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all active:scale-95 col-span-2"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm">
                  <Timer className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">
                  SIMULATION
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Mock Exam</h3>
                  <p className="text-[11px] text-gray-500 font-medium">185 Qs • 4-Hour Simulation</p>
                </div>
                <span className="text-primary font-bold text-xs flex items-center">
                  Start &gt;
                </span>
              </div>
            </Link>

            {/* Tile 2: Study */}
            <Link
              href="/study"
              className="bg-white hover:bg-gray-50/80 border border-gray-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col justify-between shadow-sm transition-all active:scale-95 min-h-[92px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xs text-gray-800">Study</h3>
                <p className="text-[10px] text-gray-400 font-medium">Review by Topic</p>
              </div>
            </Link>

            {/* Tile 3: Quiz */}
            <Link
              href="/quiz"
              className="bg-white hover:bg-gray-50/80 border border-gray-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col justify-between shadow-sm transition-all active:scale-95 min-h-[92px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xs text-gray-800">Quiz</h3>
                <p className="text-[10px] text-gray-400 font-medium">Custom Practice</p>
              </div>
            </Link>

            {/* Tile 4: My stats */}
            <Link
              href="/stats"
              className="bg-white hover:bg-gray-50/80 border border-gray-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col justify-between shadow-sm transition-all active:scale-95 min-h-[92px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                <BarChart3 className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xs text-gray-800">My stats</h3>
                <p className="text-[10px] text-gray-400 font-medium">Score Analytics</p>
              </div>
            </Link>

            {/* Tile 5: Bookmark */}
            <button
              onClick={() => setActiveSheet("bookmark")}
              className="bg-white hover:bg-gray-50/80 border border-gray-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col justify-between shadow-sm transition-all active:scale-95 text-left min-h-[92px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                <Bookmark className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xs text-gray-800">Bookmark</h3>
                <p className="text-[10px] text-gray-400 font-medium">Saved Questions</p>
              </div>
            </button>

            {/* Tile 6: Study Goal */}
            <button
              onClick={() => setActiveSheet("goal")}
              className="bg-white hover:bg-gray-50/80 border border-gray-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col justify-between shadow-sm transition-all active:scale-95 text-left min-h-[92px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                <Target className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xs text-gray-800">Study Goal</h3>
                <p className="text-[10px] text-gray-400 font-medium">Daily Target Pace</p>
              </div>
            </button>

            {/* Tile 7: Resources */}
            <button
              onClick={() => setActiveSheet("resources")}
              className="bg-white hover:bg-gray-50/80 border border-gray-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col justify-between shadow-sm transition-all active:scale-95 text-left min-h-[92px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                <Library className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xs text-gray-800">Resources</h3>
                <p className="text-[10px] text-gray-400 font-medium">CCM Blueprints</p>
              </div>
            </button>
          </div>
        )}

        {/* Bottom Bar: Settings & Offline Status */}
        <div className="mt-auto px-4 pt-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Skyscape TestZapp • Offline Ready</span>
          </div>

          <button
            onClick={() => setActiveSheet("settings")}
            className="p-2 text-primary hover:bg-primary/10 rounded-full transition-all active:scale-90"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. CART DRAWER (PRESERVED & FULLY COMPATIBLE)              */}
      {/* ========================================================= */}
      {isCartOpen && (() => {
        const cartTotal = cartItems.reduce(
          (acc, item) => acc + parseFloat(item.price.replace("$", "")),
          0
        );
        return (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="relative w-full sm:w-[400px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              {/* Header */}
              <div className="shrink-0 p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Your Cart ({cartItems.length})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 bg-gray-200/50 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-6 opacity-60 h-full mt-20">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mb-3" />
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-xs text-gray-500">
                      Add mock exams to your cart to purchase them.
                    </p>
                    <Link
                      href="/mock-exam"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-sm"
                    >
                      Browse Mock Exams
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-xl p-3 flex justify-between items-center gap-3 shadow-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">
                          {item.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.questions} Qs • {item.hours} Hrs
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-bold text-primary text-sm">
                          {item.price}
                        </span>
                        <button
                          onClick={() =>
                            updateCart(cartItems.filter((ci) => ci.id !== item.id))
                          }
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal & Checkout */}
              {cartItems.length > 0 && (
                <div className="shrink-0 border-t bg-gray-50 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-medium">Subtotal</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary/20 flex justify-center items-center gap-2 text-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* In-app Checkout Sheet */}
      {(() => {
        const cartTotal = cartItems.reduce(
          (acc, item) => acc + parseFloat(item.price.replace("$", "")),
          0
        );
        const checkoutTitle =
          cartItems.length === 1
            ? cartItems[0].title
            : `Mock Exam Bundle (${cartItems.length} items)`;
        const checkoutPrice = `$${cartTotal.toFixed(2)}`;

        return (
          <IOSCheckoutSheet
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onSuccess={handlePurchaseSuccess}
            title={checkoutTitle}
            price={checkoutPrice}
          />
        );
      })()}

      {/* ========================================================= */}
      {/* 2. BOOKMARK BOTTOM SHEET                                  */}
      {/* ========================================================= */}
      {activeSheet === "bookmark" && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveSheet(null)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col max-h-[80vh] animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-3" />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Bookmark className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Saved Bookmarks</h3>
                  <p className="text-xs text-gray-500">12 questions saved for review</p>
                </div>
              </div>
              <button
                onClick={() => setActiveSheet(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
              {[
                { domain: "Care Delivery", q: "Case Manager's role in transition planning and post-acute discharge." },
                { domain: "Psychosocial", q: "Assessing social determinants of health and family support dynamics." },
                { domain: "Reimbursement", q: "Medicare Part A vs Part B coverage criteria for home health skilled care." },
                { domain: "Quality & Safety", q: "Utilization review criteria for concurrent inpatient review." }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wide">
                    {item.domain}
                  </span>
                  <p className="text-xs text-gray-700 font-medium mt-1 leading-snug">
                    {item.q}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
              <Link
                href="/quiz"
                onClick={() => setActiveSheet(null)}
                className="flex-1 bg-primary text-white text-center font-bold py-3 rounded-xl text-xs hover:bg-primary/90 transition-colors"
              >
                Practice Bookmarked (12 Qs)
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. STUDY GOAL BOTTOM SHEET                                */}
      {/* ========================================================= */}
      {activeSheet === "goal" && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveSheet(null)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-3" />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Target className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Study Goal</h3>
                  <p className="text-xs text-gray-500">Track your daily question pace</p>
                </div>
              </div>
              <button
                onClick={() => setActiveSheet(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100 mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                  <Flame className="w-4 h-4 fill-primary" />
                  <span>4-Day Study Streak!</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">18 of {dailyGoal} questions completed today</p>
              </div>
              <span className="text-2xl font-black text-primary">72%</span>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-700 flex justify-between">
                <span>Daily Question Target</span>
                <span className="text-primary font-bold">{dailyGoal} questions/day</span>
              </label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>10 Light</span>
                <span>25 Standard</span>
                <span>40 Intensive</span>
                <span>60 Mastery</span>
              </div>
            </div>

            <button
              onClick={() => setActiveSheet(null)}
              className="mt-5 w-full bg-primary text-white font-bold py-3 rounded-xl text-xs hover:bg-primary/90 transition-colors"
            >
              Save Daily Target
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. RESOURCES BOTTOM SHEET (REPLACES THE WRENCH!)          */}
      {/* ========================================================= */}
      {activeSheet === "resources" && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveSheet(null)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col max-h-[82vh] animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-3" />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Library className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">CCM Learning Resources</h3>
                  <p className="text-xs text-gray-500">Official reference materials & guides</p>
                </div>
              </div>
              <button
                onClick={() => setActiveSheet(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
              {[
                { title: "CCM Exam Blueprint (Commission for Case Manager Certification)", desc: "Domain weights, 5 core knowledge domains, 185 question structure.", tag: "PDF Blueprint" },
                { title: "CCMC Code of Professional Conduct", desc: "Core ethics, confidentiality, fiduciary responsibility, client advocacy.", tag: "Ethics Guide" },
                { title: "Clinical Case Management Glossary", desc: "Key terminology, DRGs, ICD-10, CMS guidelines, Utilization Review.", tag: "Glossary" },
                { title: "Skyscape Clinical Nursing Suite", desc: "Complementary pharmacotherapy, lab values, and diagnostic reference apps.", tag: "Skyscape Apps" }
              ].map((res, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center gap-3 hover:border-primary/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide">
                      {res.tag}
                    </span>
                    <h4 className="text-xs font-bold text-gray-800 mt-0.5 leading-snug">{res.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{res.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveSheet(null)}
              className="mt-4 w-full bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl text-xs hover:bg-gray-200 transition-colors"
            >
              Close Resources
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. SETTINGS BOTTOM SHEET                                  */}
      {/* ========================================================= */}
      {activeSheet === "settings" && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveSheet(null)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-3" />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Settings className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">App Settings</h3>
                  <p className="text-xs text-gray-500">Preferences & Data</p>
                </div>
              </div>
              <button
                onClick={() => setActiveSheet(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Sound Feedback</div>
                    <div className="text-[10px] text-gray-400">Play chimes on answer submit</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Daily Study Reminders</div>
                    <div className="text-[10px] text-gray-400">Push reminder at 8:00 PM</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={remindersEnabled}
                  onChange={(e) => setRemindersEnabled(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-red-500" />
                  <div>
                    <div className="text-xs font-bold text-red-600">Reset Exam Progress</div>
                    <div className="text-[10px] text-gray-400">Clear attempted questions & scores</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Reset local practice statistics?")) {
                      alert("Progress reset to default.");
                      setActiveSheet(null);
                    }
                  }}
                  className="px-2.5 py-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
              <span className="text-[11px] text-gray-400 font-medium">
                Skyscape TestZapp CCM Prep • v2.4.1 (Build 412)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
