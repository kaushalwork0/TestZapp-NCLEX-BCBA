"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AndroidCheckoutSheet({ isOpen, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<"initial" | "processing" | "success">("initial");

  useEffect(() => {
    if (isOpen) {
      setStep("initial");
    }
  }, [isOpen]);

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === "initial" ? onClose : undefined}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-md mx-auto overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
                    <span className="font-bold text-gray-700 text-xs">G</span>
                  </div>
                  <span className="font-medium text-gray-800 text-lg">Google Pay</span>
                </div>
                <button
                  onClick={onClose}
                  disabled={step !== "initial"}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h3 className="text-sm text-gray-500 mb-1">Total to pay</h3>
                  <div className="text-4xl font-light text-gray-900">$99.00</div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                    VISA
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">Visa •••• 4242</div>
                    <div className="text-xs text-gray-500">Checking account</div>
                  </div>
                </div>

                {/* Status/Action Area */}
                <div className="h-16 mt-4">
                  <AnimatePresence mode="wait">
                    {step === "initial" && (
                      <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <button
                          onClick={handlePay}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full py-3.5 text-base shadow-sm transition-colors flex items-center justify-center gap-2 relative overflow-hidden"
                        >
                          Continue
                        </button>
                      </motion.div>
                    )}

                    {step === "processing" && (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full"
                      >
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                      </motion.div>
                    )}

                    {step === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center h-full text-blue-600"
                      >
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                          <Check className="w-6 h-6" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
