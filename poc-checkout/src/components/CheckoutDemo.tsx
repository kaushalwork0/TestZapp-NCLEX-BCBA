"use client";

import { useState } from "react";
import { IOSCheckoutSheet } from "./iOSCheckoutSheet";
import { AndroidCheckoutSheet } from "./AndroidCheckoutSheet";
import { CheckCircle2, ShoppingBag, Apple, Bot } from "lucide-react";

export function CheckoutDemo() {
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsSheetOpen(true);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 text-center px-6 animate-in fade-in zoom-in duration-500 relative">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Payment Successful!</h2>
        <p className="text-gray-500 text-lg">Thank you for your purchase.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-8 px-8 py-3 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Platform Toggle for Demo Purposes (Absolute, Icon Only) */}
      <div className="absolute top-4 right-4 flex bg-gray-200/50 backdrop-blur-md p-1 rounded-full z-10 border border-white/20 shadow-sm">
        <button
          onClick={() => setPlatform("ios")}
          className={`p-1.5 rounded-full transition-all ${
            platform === "ios" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"
          }`}
          title="iOS"
        >
          <Apple className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setPlatform("android")}
          className={`p-1.5 rounded-full transition-all ${
            platform === "android" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"
          }`}
          title="Android"
        >
          <Bot className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 pt-16">
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 aspect-square flex items-center justify-center">
          <ShoppingBag className="w-32 h-32 text-gray-200" />
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">Premium Wireless Headphones</h1>
            <span className="text-xl font-semibold text-gray-900">$99.00</span>
          </div>
          <p className="text-gray-500 line-clamp-2">
            Experience crystal clear sound with industry-leading noise cancellation and all-day comfort.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Color</h3>
          <div className="flex gap-3">
            {["bg-black", "bg-gray-200", "bg-blue-100"].map((color, i) => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-white ring-2 ${i === 0 ? 'ring-gray-900' : 'ring-transparent'} ${color} cursor-pointer shadow-sm`} />
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-6 pb-8 z-40">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white font-semibold rounded-full py-4 text-lg shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Checkout with {platform === "ios" ? "Apple Pay" : "Google Pay"}
        </button>
      </div>

      {/* Sheets */}
      {platform === "ios" ? (
        <IOSCheckoutSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          onSuccess={handleSuccess}
        />
      ) : (
        <AndroidCheckoutSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
