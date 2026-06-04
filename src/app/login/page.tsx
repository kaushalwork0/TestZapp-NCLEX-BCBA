"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Eye } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "student@skyscape.com" && password === "skyscape") {
      router.push("/home");
    } else {
      alert("Invalid credentials. Use student@skyscape.com / skyscape");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Bar with X */}
      <div className="flex justify-end p-6 pb-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-900" />
        </button>
      </div>

      <div className="flex-1 px-8 pt-4 pb-8 overflow-y-auto flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <img src="/skyscape-logo.png" alt="skyscape" className="h-10 w-auto object-contain" />
        </div>

        <p className="text-gray-900 text-lg mb-8">
          Sign In with your Skyscape Account
        </p>

        {/* Form */}
        <div className="space-y-8 mb-10">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address *"
              className="w-full pb-2 text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-primary outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password *"
              className="w-full pb-2 text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-primary outline-none transition-colors pr-8"
            />
            <button className="absolute right-0 bottom-2 text-gray-500 hover:text-gray-700">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={handleLogin}
            className="bg-primary text-white font-medium py-2.5 px-8 rounded flex-1 hover:bg-primary/90 transition-colors shadow-sm"
          >
            Sign In
          </button>
          <button
            className="bg-primary text-white font-medium py-2.5 px-8 rounded flex-1 hover:bg-primary/90 transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center space-y-5 mt-auto mb-10">
          <button className="text-primary text-sm hover:underline">
            Forgot your Username or Password ?
          </button>
          <button className="text-primary text-base hover:underline">
            Reset Password
          </button>
          <button className="text-primary text-base hover:underline">
            Contact Support
          </button>
        </div>
      </div>
      
      {/* Home indicator bar replacement */}
      <div className="h-1 bg-gray-900 w-32 rounded-full mx-auto mb-2 opacity-0" /> 
    </div>
  );
}
