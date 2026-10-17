"use client";

import React from "react";
import { TabType } from "../../types/index.js";

interface HeaderProps {
  activeTab: TabType;
  theme: "dark" | "light";
  toggleTheme: () => void;
  openMobileMenu: () => void;
}

export function Header({ activeTab, theme, toggleTheme, openMobileMenu }: HeaderProps) {
  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case "dashboard":
        return "Panel Principal";
      case "products":
        return "Gestión de Catálogo";
      case "sales":
        return "Ventas & Facturación";
      case "warehouse":
        return "Almacén & Kardex";
      case "openapi":
        return "Suite OpenAPI Integrada";
    }
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={openMobileMenu}
            aria-label="Abrir Menú"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm">
              N
            </div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">NexusSales</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
            title="Alternar Tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            {activeTab}
          </span>
        </div>
      </header>

      {/* Desktop Top Navbar */}
      <header className="hidden md:flex h-16 px-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 items-center justify-between shrink-0 sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            NexusSales /
          </span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white capitalize">
            {getTabTitle(activeTab)}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center space-x-1.5">
            <span>🛡️</span>
            <span>Sesión JWT + HMAC Cookie</span>
          </span>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center space-x-1"
            title="Cambiar apariencia de tema"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span className="hidden sm:inline">
              {theme === "dark" ? "Tema Claro" : "Tema Oscuro"}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
