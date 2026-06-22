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
  Brain,
  Trash2
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

function GridBox({ icon, title, disabled = false, subtitle = null, href = null }: any) {
  const content = (
    <>
      <div className={`${disabled ? 'text-gray-300' : 'text-primary'}`}>
        {icon}
      </div>
      <div className="flex flex-col items-center text-center px-1">
        <span className={`text-xs leading-tight font-medium ${disabled ? 'text-gray-300' : 'text-gray-700'}`}>{title}</span>
        {subtitle && <span className="text-[9px] text-gray-300 mt-0.5">{subtitle}</span>}
      </div>
    </>
  );

  const containerClass = `bg-white rounded-xs shadow-sm h-full w-full flex flex-col items-center justify-center gap-1.5 border border-gray-50/50 ${disabled ? 'opacity-50' : 'hover:scale-[1.02] transition-transform cursor-pointer'} aspect-[4/4.5] p-1 overflow-hidden`;

  if (href && !disabled) {
    return (
      <Link href={href} className={containerClass}>
        {content}
      </Link>
    );
  }

  return (
    <div className={containerClass}>
      {content}
    </div>
  );
}

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
        try { purchasedExams = JSON.parse(savedExams); } catch(e) {}
      }
      const updated = [...purchasedExams, ...cartItems];
      localStorage.setItem("purchasedMockExams", JSON.stringify(updated));
      setPurchasedCount(updated.length);
      updateCart([]);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
    }
  };

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
            <button onClick={() => setIsCartOpen(true)} className="hover:opacity-80 transition-opacity flex items-center justify-center relative">
              <img src="/cart.png" alt="Cart" className="h-[60px] w-auto object-contain" />
              {cartItems.length > 0 && (
                <span className="absolute top-2 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[11px] font-bold border-2 border-primary text-white">
                  {cartItems.length}
                </span>
              )}
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

        {/* Main Grid - Row 1 (3 items) */}
        <div className="px-4 mt-4 grid grid-cols-3 gap-3 shrink-0">
          <GridBox href="/study" icon={<img src="/study.png" alt="Study" className="w-10 h-10 object-contain" />} title="Study" />
          <GridBox href="/quiz" icon={<img src="/quiz.png" alt="Quiz" className="w-10 h-10 object-contain" />} title="Quiz" />
          <GridBox icon={<img src="/bookmark.png" alt="Bookmark" className="w-10 h-10 object-contain" />} title="Bookmark" />
        </div>

        {/* Main Grid - Row 2 (4 items) */}
        <div className="px-4 mt-3 grid grid-cols-4 gap-3 shrink-0">
          <GridBox icon={<img src="/resources.png" alt="Resources" className="w-10 h-10 object-contain" />} title="Resources" />
          <GridBox icon={<img src="/study%20goal.png" alt="Study Goal" className="w-10 h-10 object-contain" />} title="Study Goal" />
          <GridBox icon={<img src="/querious%20ai.png" alt="QueriousAI" className="w-10 h-10 object-contain opacity-40 grayscale" />} title="QueriousAI" disabled subtitle="Not available" />
          <GridBox href="/mock-exam" icon={<FileText className="w-10 h-10 text-primary" strokeWidth={1.5} />} title="Mock Exam" />
        </div>

        {/* Footer */}
        <div className="mt-auto px-4 py-2 flex justify-end shrink-0">
          <button className="p-2 text-primary hover:opacity-80 transition-opacity">
            <Settings className="w-8 h-8" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (() => {
        const cartTotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace("$", "")), 0);
        return (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            <div className="relative w-full sm:w-[400px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="shrink-0 p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <img src="/cart.png" alt="Cart" className="w-6 h-6 object-contain" />
                  Your Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 bg-gray-200/50 hover:bg-gray-200 rounded-full text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-6 opacity-60 h-full mt-20">
                    <img src="/cart.png" alt="Cart" className="w-20 h-20 object-contain mb-4 grayscale opacity-50" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Your cart is empty</h3>
                    <p className="text-sm text-gray-500">Add mock exams to your cart to purchase them.</p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 flex justify-between items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
                        <div className="text-xs text-gray-500 mt-0.5">{item.questions} Qs • {item.hours} Hrs</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-bold text-primary">{item.price}</span>
                        <button 
                          onClick={() => updateCart(cartItems.filter(ci => ci.id !== item.id))}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="shrink-0 border-t bg-gray-50 p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-black/10 flex justify-center items-center gap-2"
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
    </div>
  );
}
