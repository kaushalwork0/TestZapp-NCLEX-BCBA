"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Info, Check, Calendar, BarChart2, RotateCw, MoreVertical, Share2, RotateCcw, Apple, Bot, X, Trash2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { IOSCheckoutSheet } from "@/components/iOSCheckoutSheet";
import { AndroidCheckoutSheet } from "@/components/AndroidCheckoutSheet";
import Link from "next/link";

const mockExams = [
  { id: "mock-1", title: "Baseline Readiness", description: "Best for first-time assessment", questions: 185, hours: 4, price: "$49.99", color: "text-green-600", dot: "bg-green-500" },
  { id: "mock-2", title: "Progress Checkpoint", description: "Measure improvement", questions: 185, hours: 4, price: "$59.99", color: "text-yellow-600", dot: "bg-yellow-500" },
  { id: "mock-3", title: "Final Readiness", description: "Closest to exam day", questions: 185, hours: 4, price: "$69.99", color: "text-red-600", dot: "bg-red-500" },
  { id: "mock-4", title: "Philosophical Underpinnings", description: "Focus on foundational concepts", questions: 185, hours: 4, price: "$19.99", color: "text-blue-600", dot: "bg-blue-500" },
  { id: "mock-5", title: "Concepts and Principles", description: "Deep dive into core principles", questions: 185, hours: 4, price: "$29.99", color: "text-indigo-600", dot: "bg-indigo-500" },
  { id: "mock-6", title: "Measurement & Data Display", description: "Mastering graphs and data interpretation", questions: 185, hours: 4, price: "$24.99", color: "text-purple-600", dot: "bg-purple-500" },
  { id: "mock-7", title: "Experimental Design", description: "Single-subject design mastery", questions: 185, hours: 4, price: "$24.99", color: "text-pink-600", dot: "bg-pink-500" },
  { id: "mock-8", title: "Ethics Code Mastery", description: "Ethics Code for Behavior Analysts", questions: 185, hours: 4, price: "$29.99", color: "text-rose-600", dot: "bg-rose-500" },
  { id: "mock-9", title: "Behavior Assessment", description: "FBA and preference assessments", questions: 185, hours: 4, price: "$24.99", color: "text-orange-600", dot: "bg-orange-500" },
  { id: "mock-10", title: "Behavior-Change Procedures", description: "Intervention and strategies", questions: 185, hours: 4, price: "$34.99", color: "text-teal-600", dot: "bg-teal-500" },
  { id: "mock-11", title: "Selecting Interventions", description: "Client-centered intervention planning", questions: 185, hours: 4, price: "$24.99", color: "text-cyan-600", dot: "bg-cyan-500" },
  { id: "mock-12", title: "Personnel Supervision", description: "Management and supervision standards", questions: 185, hours: 4, price: "$19.99", color: "text-sky-600", dot: "bg-sky-500" },
  { id: "mock-13", title: "Section A-D Intensive", description: "Mid-level cumulative review", questions: 185, hours: 4, price: "$39.99", color: "text-emerald-600", dot: "bg-emerald-500" },
  { id: "mock-14", title: "Section E-I Intensive", description: "Advanced cumulative review", questions: 185, hours: 4, price: "$39.99", color: "text-fuchsia-600", dot: "bg-fuchsia-500" },
  { id: "mock-15", title: "Comprehensive Mini-Mock", description: "Half-length full spectrum test", questions: 185, hours: 4, price: "$34.99", color: "text-violet-600", dot: "bg-violet-500" }
];

const initialMyMockExams = [
  { id: "mock-prog", title: "Practice Mock 1", hours: 4 },
  { id: "mock-0", title: "Diagnostic Mock", score: "65%", date: "Jun 01 • 10:00 AM", scoreColor: "text-yellow-600" },
  { id: "mock-00", title: "Mid-Term Review", score: "82%", date: "Jun 15 • 2:00 PM", scoreColor: "text-green-600" }
];

export default function MockExamPage() {
  const router = useRouter();
  
  const [baseMyExams, setBaseMyExams] = useState(initialMyMockExams);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [detailsExam, setDetailsExam] = useState<any>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [purchasedExams, setPurchasedExams] = useState<any[]>([]);
  
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [startExamData, setStartExamData] = useState<any>(null);
  const [agreed, setAgreed] = useState(false);

  const [mockExamTab, setMockExamTab] = useState<"MY_EXAMS" | "PURCHASE">("MY_EXAMS");

  const handleTabToggle = () => {
    setMockExamTab(prev => prev === "MY_EXAMS" ? "PURCHASE" : "MY_EXAMS");
  };

  useEffect(() => {
    const savedExams = localStorage.getItem("purchasedMockExams");
    if (savedExams) {
      try {
        setPurchasedExams(JSON.parse(savedExams));
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
      const updated = [...purchasedExams, ...cartItems];
      setPurchasedExams(updated);
      localStorage.setItem("purchasedMockExams", JSON.stringify(updated));
      updateCart([]);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
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

  const handleDeleteExam = (id: string) => {
    if (baseMyExams.some(e => e.id === id)) {
      setBaseMyExams(baseMyExams.filter(e => e.id !== id));
    }
    if (purchasedExams.some(e => e.id === id)) {
      const updated = purchasedExams.filter(e => e.id !== id);
      setPurchasedExams(updated);
      localStorage.setItem("purchasedMockExams", JSON.stringify(updated));
    }
    setActiveDropdownId(null);
  };

  const allMyMockExams = [
    ...baseMyExams,
    ...purchasedExams.map(pe => ({ ...pe, status: "Not Started" }))
  ];

  const availableExams = mockExams.filter(exam => !purchasedExams.some(pe => pe.id === exam.id));

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center px-4 gap-2.5 z-10 shadow-sm relative">
        <button onClick={() => router.back()} className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <span className="text-white text-lg font-normal tracking-wide ml-0.5">Mock Exam</span>

        {/* Platform Toggle & Cart */}
        <div className="absolute right-4 flex items-center gap-3">
          <div className="flex bg-white/20 p-1 rounded-full border border-white/20">
            <button
              onClick={() => setPlatform("ios")}
              className={`p-1 rounded-full transition-all ${
                platform === "ios" ? "bg-white text-primary shadow-sm" : "text-white/70 hover:text-white"
              }`}
              title="Simulate iOS"
            >
              <Apple className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPlatform("android")}
              className={`p-1 rounded-full transition-all ${
                platform === "android" ? "bg-white text-primary shadow-sm" : "text-white/70 hover:text-white"
              }`}
              title="Simulate Android"
            >
              <Bot className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <button onClick={() => setIsCartOpen(true)} className="hover:opacity-80 transition-opacity flex items-center justify-center relative p-1">
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-primary text-white">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4 pb-24">
        
        {/* Tab Toggle Card */}
        <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px]">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-[15px] font-medium text-secondary">My Exams & Exam Store:</h3>
          </div>
          <div className="p-4 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${mockExamTab === "MY_EXAMS" ? "text-secondary" : "text-gray-400"}`}>
              MY EXAMS
            </span>
            
            <div 
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${mockExamTab === "PURCHASE" ? "bg-secondary" : "bg-gray-200"}`}
              onClick={handleTabToggle}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${mockExamTab === "PURCHASE" ? "translate-x-6" : ""}`} />
            </div>

            <span className={`text-sm font-medium ${mockExamTab === "PURCHASE" ? "text-secondary" : "text-gray-400"}`}>
              PURCHASE
            </span>
          </div>
        </div>

        {mockExamTab === "MY_EXAMS" ? (
          <div className="flex flex-col gap-3">
            {/* My Mock Exams */}
            {allMyMockExams.length === 0 && (
              <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-8 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                  <RotateCw className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-[15px] font-medium text-secondary">No Exams Yet</h3>
                <p className="text-sm text-gray-500">You haven't purchased any mock exams yet. Browse the available exams below.</p>
              </div>
            )}
            {allMyMockExams.map((ce, idx) => (
              <div key={idx} className="relative">
                  {ce.score ? (
                    <Link href="/stats?tab=mock_exam" className="block">
                      <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] flex flex-col cursor-pointer transition-all hover:border-primary/40">
                        <div className="p-4 flex justify-between items-start border-b border-gray-50">
                          <div>
                            <h4 className="font-medium text-[15px] text-secondary">{ce.title}</h4>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                              <Calendar className="w-4 h-4" />
                              <span>{ce.date}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="flex flex-col items-end bg-gray-50 px-2.5 py-1 rounded border border-gray-100">
                              <span className={`text-lg font-bold leading-none ${ce.scoreColor}`}>{ce.score}</span>
                              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">Score</span>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveDropdownId(activeDropdownId === ce.id ? null : ce.id);
                              }}
                              className="p-1 -mr-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50/50">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleStartExam(ce);
                            }}
                            className="w-full bg-white border border-gray-200 hover:border-primary/50 text-primary font-medium py-2.5 rounded-[3px] flex items-center justify-center gap-2 transition-colors text-sm shadow-sm"
                          >
                            <RotateCw className="w-4 h-4" />
                            Restart Exam
                          </button>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary/80" />
                      <div className="p-4 pl-5 flex justify-between items-start border-b border-gray-50">
                        <div>
                          <h4 className="font-medium text-[15px] text-secondary pr-8">{ce.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                            Not Started • {ce.hours} Hours
                          </p>
                        </div>
                        <button 
                          onClick={() => setActiveDropdownId(activeDropdownId === ce.id ? null : ce.id)}
                          className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-3 bg-gray-50/50 pl-4">
                        <button 
                          onClick={() => handleStartExam(ce)}
                          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-[3px] flex items-center justify-center transition-colors text-[15px] shadow-sm"
                        >
                          Start Exam
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dropdown Menu */}
                  {activeDropdownId === ce.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setActiveDropdownId(null)} />
                      <div className="absolute right-4 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                        <button 
                          onClick={() => setActiveDropdownId(null)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Share2 className="w-4 h-4 text-gray-500" />
                          Share {ce.score ? "Result" : "Exam"}
                        </button>
                        <button 
                          onClick={() => setActiveDropdownId(null)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4 text-gray-500" />
                          Request Refund
                        </button>
                        <button 
                          onClick={() => handleDeleteExam(ce.id)}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100 mt-1 pt-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          Delete (POC Only)
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Available Exams */}
            {availableExams.map(exam => (
              <div 
                key={exam.id} 
                onClick={() => setDetailsExam(exam)}
                className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] transition-all overflow-hidden hover:border-primary/40 cursor-pointer flex flex-col"
              >
                <div className="p-4 flex flex-col gap-2 border-b border-gray-50">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start gap-2 pt-0.5">
                      <div className={`w-2 h-2 shrink-0 rounded-full mt-1.5 ${exam.dot}`} />
                      <h4 className="font-medium text-[15px] text-secondary leading-snug">{exam.title}</h4>
                    </div>
                    <span className="font-bold text-[17px] text-primary shrink-0 bg-primary/5 px-2 py-0.5 rounded text-center">{exam.price}</span>
                  </div>
                  <p className="text-[14px] text-gray-500 line-clamp-2 mt-1">{exam.description}</p>
                </div>
                
                <div className="bg-gray-50/50 p-4 pt-3 flex flex-col gap-3 mt-auto">
                  <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded flex-1 justify-center shadow-sm">
                      <span className="text-primary font-bold">{exam.questions}</span>
                      <span className="text-xs uppercase tracking-wide">Qs</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded flex-1 justify-center shadow-sm">
                      <span className="text-primary font-bold">{exam.hours}</span>
                      <span className="text-xs uppercase tracking-wide">Hrs</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!cartItems.some(item => item.id === exam.id)) {
                        updateCart([...cartItems, exam]);
                      } else {
                        setIsCartOpen(true);
                      }
                    }}
                    className={`w-full font-medium py-2.5 rounded-[3px] transition-all flex items-center justify-center gap-2 text-[15px] shadow-sm ${
                      cartItems.some(item => item.id === exam.id) 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                  >
                    {cartItems.some(item => item.id === exam.id) ? (
                      <><Check className="w-4 h-4" /> Added to Cart</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4" /> Purchase Mock Exam</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {detailsExam && (
        <div className="absolute inset-0 z-40 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetailsExam(null)} />
          <div className="relative bg-white w-full sm:w-[400px] h-[85vh] sm:h-[80vh] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 z-50">
            {/* Modal Header */}
            <div className="shrink-0 p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Exam Details</h3>
              <button onClick={() => setDetailsExam(null)} className="p-1.5 bg-gray-200/50 hover:bg-gray-200 rounded-full text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 pb-20">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full shrink-0 ${detailsExam.dot}`} />
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{detailsExam.title}</h2>
              </div>
              <p className="text-gray-600 mb-6">{detailsExam.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-1">
                  <span className="text-2xl font-bold text-primary">{detailsExam.questions}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Questions</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-1">
                  <span className="text-2xl font-bold text-primary">{detailsExam.hours}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Hours</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">What's included</h4>
                <ul className="space-y-3">
                  {["Full-length practice test mimicking the real exam.", "Detailed rationales for correct and incorrect answers.", "Performance analytics by content area.", "One-time purchase, access anytime."].map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-snug">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white/90 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total</span>
                <span className="text-2xl font-bold text-gray-900">{detailsExam.price}</span>
              </div>
              <button 
                onClick={() => {
                  if (!cartItems.some(item => item.id === detailsExam.id)) {
                    updateCart([...cartItems, detailsExam]);
                  }
                  setDetailsExam(null);
                  setIsCartOpen(true);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
              >
                {cartItems.some(item => item.id === detailsExam.id) ? "View in Cart" : "Purchase Mock Exam"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (() => {
        const cartTotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace("$", "")), 0);
        return (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            <div className="relative w-full sm:w-[400px] h-full bg-gray-50 flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Header */}
              <div className="h-[56px] shrink-0 bg-primary flex justify-between items-center px-4 z-10 shadow-sm relative">
                <div className="flex items-center gap-2 text-white">
                  <ShoppingCart className="w-5 h-5" />
                  <h2 className="text-lg font-normal tracking-wide ml-0.5">Your Cart</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-white hover:bg-white/10 p-1.5 -mr-1.5 rounded-full transition-colors">
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-6 opacity-60 h-full mt-20">
                    <ShoppingCart className="w-20 h-20 text-gray-400 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-medium text-secondary mb-1">Your cart is empty</h3>
                    <p className="text-sm text-gray-500">Add mock exams to your cart to purchase them.</p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-[3px] p-3 flex justify-between items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[15px] text-secondary truncate">{item.title}</h4>
                        <div className="text-xs text-gray-500 mt-0.5">{item.questions} Qs • {item.hours} Hrs</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-bold text-[15px] text-primary bg-primary/5 px-2 py-0.5 rounded">{item.price}</span>
                        <button 
                          onClick={() => updateCart(cartItems.filter(ci => ci.id !== item.id))}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-[3px] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="shrink-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] p-4 space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[15px] text-secondary font-medium">Subtotal</span>
                    <span className="text-xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-lg py-3.5 rounded-[4px] transition-colors shadow-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Checkout Sheets */}
      {(() => {
        const cartTotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace("$", "")), 0);
        const checkoutTitle = cartItems.length === 1 ? cartItems[0].title : `Mock Exam Bundle (${cartItems.length} items)`;
        const checkoutPrice = `$${cartTotal.toFixed(2)}`;

        return platform === "ios" ? (
          <IOSCheckoutSheet
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onSuccess={handlePurchaseSuccess}
            title={checkoutTitle}
            price={checkoutPrice}
          />
        ) : (
          <AndroidCheckoutSheet
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onSuccess={handlePurchaseSuccess}
            title={checkoutTitle}
            price={checkoutPrice}
          />
        );
      })()}

      {/* Exam-Day Warning Modal */}
      {isWarningOpen && (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsWarningOpen(false)} />
          <div className="relative bg-white w-full sm:max-w-[400px] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-[17px] font-semibold text-secondary">Ready to start?</h2>
              <button onClick={() => setIsWarningOpen(false)} className="p-1.5 bg-gray-200/50 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="text-center space-y-1.5">
                <h3 className="font-semibold text-primary text-[19px]">{startExamData?.title}</h3>
                <p className="text-[15px] text-gray-500">
                  This mock exam is designed to simulate the real testing experience.
                </p>
              </div>

              <div className="flex bg-gray-50 rounded-xl py-4 justify-center divide-x divide-gray-200 border border-gray-100">
                <div className="flex flex-col items-center px-6">
                  <span className="text-2xl font-bold text-secondary">4</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mt-1">Hours</span>
                </div>
                <div className="flex flex-col items-center px-6">
                  <span className="text-2xl font-bold text-secondary">185</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mt-1">Questions</span>
                </div>
              </div>

              <div className="space-y-3.5">
                
                <div className="flex gap-3 items-start">
                  <div className="bg-green-100 p-1 rounded-full shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                  </div>
                  <p className="text-[14px] text-gray-600 leading-snug">
                    <strong className="text-gray-800 font-medium">Clear your schedule.</strong> Make sure you have 4 uninterrupted hours in a quiet space.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-green-100 p-1 rounded-full shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                  </div>
                  <p className="text-[14px] text-gray-600 leading-snug">
                    <strong className="text-gray-800 font-medium">Instant feedback.</strong> Results and detailed domain analytics will be ready upon completion.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button 
                  onClick={handleAgreeAndContinue}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 rounded-[8px] transition-all shadow-sm text-[15px]"
                >
                  Start Exam Now
                </button>
                <button 
                  onClick={() => setIsWarningOpen(false)}
                  className="w-full py-3.5 rounded-[8px] font-medium text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50 transition-colors text-[15px]"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
