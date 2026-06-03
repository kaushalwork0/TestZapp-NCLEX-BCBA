"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ScanFace, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function IOSCheckoutSheet({ isOpen, onClose, onSuccess }: Props) {
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === "initial" ? onClose : undefined}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex flex-col justify-end"
          >
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-[32px] w-full max-w-md mx-auto overflow-hidden pb-8 pt-4 px-6 shadow-2xl relative"
              style={{
                boxShadow: "0 -20px 40px -10px rgba(0,0,0,0.1)",
              }}
            >
              {/* Drag Handle */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              <div className="flex justify-between items-center mb-6">
                <button onClick={onClose} disabled={step !== "initial"} className="text-blue-500 font-medium disabled:opacity-50">
                  Cancel
                </button>
                <h2 className="text-xl font-semibold">Pay</h2>
                <div className="w-14" /> {/* Spacer to balance 'Cancel' */}
              </div>

              {/* Order Info */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-gray-500 text-sm">CARD</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-bold tracking-wider">
                      VISA
                    </div>
                    <span className="font-medium text-sm">•••• 4242</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">TOTAL</span>
                  <span className="text-2xl font-bold">$99.00</span>
                </div>
              </div>

              {/* Status/Action Area */}
              <div className="h-32 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {step === "initial" && (
                    <motion.div
                      key="initial"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full flex flex-col items-center gap-4"
                    >
                      <button
                        onClick={handlePay}
                        className="w-full bg-black text-white font-semibold rounded-full py-4 text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                      >
                        Double Click to Pay
                      </button>
                    </motion.div>
                  )}

                  {step === "processing" && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <ScanFace className="w-12 h-12 text-blue-500 animate-pulse" />
                      <span className="text-sm font-medium text-gray-500">Processing Face ID...</span>
                    </motion.div>
                  )}

                  {step === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-500" />
                      <span className="text-lg font-semibold">Done</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
