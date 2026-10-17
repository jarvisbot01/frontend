"use client";

import React, { useState } from "react";

interface LoginModalProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  loading: boolean;
  error: string;
  onQuickFillNotice?: (msg: string) => void;
}

export function LoginModal({ onLogin, loading, error, onQuickFillNotice }: LoginModalProps) {
  const [email, setEmail] = useState("admin@ecommerce.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleQuickFill = () => {
    setEmail("admin@ecommerce.com");
    setPassword("admin123");
    if (onQuickFillNotice) {
      onQuickFillNotice("Credenciales cargadas en el formulario");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-950 relative overflow-hidden select-none">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[480px] h-[480px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-[500px] p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl relative z-10 space-y-6">
        {/* Header Brand Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 text-white text-2xl font-black">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              NexusSales Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Administración segura de ecommerce (JWT + Refresh Cookie HMAC)
            </p>
          </div>
        </div>

        {/* Credentials Callout Box */}
        <div
          onClick={handleQuickFill}
          title="Haz clic para autocompletar"
          className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 hover:border-indigo-500/80 transition duration-200 cursor-pointer text-xs space-y-1.5 group"
        >
          <div className="flex items-center space-x-2 text-indigo-300 font-bold">
            <span className="text-sm">🔑</span>
            <span>Credenciales por Defecto del Sistema:</span>
          </div>
          <div className="font-mono text-[11px] space-y-0.5 text-slate-300">
            <div>
              Usuario:{" "}
              <span className="text-cyan-400 font-bold group-hover:underline">
                admin@ecommerce.com
              </span>
            </div>
            <div>
              Contraseña:{" "}
              <span className="text-cyan-400 font-bold group-hover:underline">admin123</span>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-medium">
            ⚠ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Correo Institucional
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ecommerce.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Iniciar Sesión Segura</span>
                <span className="text-base font-normal">➔</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Security Pill */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-medium">
          <span className="text-emerald-500">🛡️</span>
          <span>Protegido con HMAC SHA-256 & HttpOnly Cookies</span>
        </div>
      </div>
    </div>
  );
}
