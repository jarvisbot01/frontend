"use client";

import React from "react";
import { ToastNotification } from "../../types/index.js";

interface ToastProps {
  toast: ToastNotification | null;
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-sm font-medium border transition-all duration-300 animate-bounce ${
        toast.type === "success"
          ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/50"
          : toast.type === "error"
          ? "bg-rose-950/90 text-rose-200 border-rose-500/50"
          : "bg-slate-900/90 text-slate-200 border-slate-700"
      }`}
    >
      <span>{toast.type === "success" ? "✓" : toast.type === "error" ? "⚠" : "ℹ"}</span>
      <span>{toast.message}</span>
    </div>
  );
}
