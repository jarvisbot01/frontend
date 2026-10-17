"use client";

import React from "react";
import { TabType, User } from "../../types/index.js";

interface SidebarProps {
  activeTab: TabType;
  changeTab: (tab: TabType) => void;
  user: User;
  productsCount: number;
  ordersCount: number;
  criticalDeficitCount: number;
  theme: "dark" | "light";
  toggleTheme: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenSaleModal: () => void;
  onOpenProductModal: () => void;
  onLogout: () => void;
}

export function Sidebar({
  activeTab,
  changeTab,
  user,
  productsCount,
  ordersCount,
  criticalDeficitCount,
  theme,
  toggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenSaleModal,
  onOpenProductModal,
  onLogout,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Drawer Backdrop and Sliding Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            aria-label="Cerrar menú móvil"
          />

          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-10 flex flex-col p-5 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-500/30">
                  N
                </div>
                <div>
                  <h2 className="font-extrabold text-base text-slate-900 dark:text-white leading-none">
                    NexusSales
                  </h2>
                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Ecommerce Hub
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Quick Actions */}
            <div className="my-4 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSaleModal();
                }}
                className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
              >
                <span>💳</span>
                <span>+ Registrar Venta</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProductModal();
                }}
                className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center space-x-2"
              >
                <span>📦</span>
                <span>+ Nuevo Producto</span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1.5 flex-1 overflow-y-auto">
              <button
                onClick={() => changeTab("dashboard")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === "dashboard"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">📊</span>
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => changeTab("products")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === "products"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">📦</span>
                  <span>Productos</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {productsCount}
                </span>
              </button>

              <button
                onClick={() => changeTab("sales")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === "sales"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">💳</span>
                  <span>Ventas & Pedidos</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {ordersCount}
                </span>
              </button>

              <button
                onClick={() => changeTab("warehouse")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === "warehouse"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">🏭</span>
                  <span>Almacén & Kardex</span>
                </div>
                {criticalDeficitCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-extrabold bg-amber-500 text-slate-950 animate-pulse">
                    {criticalDeficitCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => changeTab("openapi")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === "openapi"
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">⚡</span>
                  <span>Suite OpenAPI</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold uppercase">
                  SDI
                </span>
              </button>
            </nav>

            {/* Mobile Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 truncate">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 transition flex items-center justify-center space-x-2"
              >
                <span>↪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex w-64 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 flex-col shrink-0 shadow-sm">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-black text-lg">
              N
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight leading-none text-slate-900 dark:text-white">
                NexusSales
              </h1>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                Ecommerce Hub
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-3 space-y-2 border-b border-slate-200 dark:border-slate-800/80">
          <button
            onClick={onOpenSaleModal}
            className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition flex items-center justify-center space-x-2"
          >
            <span>💳</span>
            <span>+ Registrar Venta</span>
          </button>
          <button
            onClick={onOpenProductModal}
            className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center space-x-2"
          >
            <span>📦</span>
            <span>+ Nuevo Producto</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-3 space-y-1.5 flex-1">
          <button
            onClick={() => changeTab("dashboard")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-base">📊</span>
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => changeTab("products")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "products"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-base">📦</span>
              <span>Productos</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === "products"
                  ? "bg-indigo-700 text-indigo-100"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
            >
              {productsCount}
            </span>
          </button>

          <button
            onClick={() => changeTab("sales")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "sales"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-base">💳</span>
              <span>Ventas & Pedidos</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === "sales"
                  ? "bg-indigo-700 text-indigo-100"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
            >
              {ordersCount}
            </span>
          </button>

          <button
            onClick={() => changeTab("warehouse")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "warehouse"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-base">🏭</span>
              <span>Almacén & Kardex</span>
            </div>
            {criticalDeficitCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-extrabold bg-amber-500 text-slate-950 animate-pulse">
                {criticalDeficitCount}
              </span>
            )}
          </button>

          <button
            onClick={() => changeTab("openapi")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "openapi"
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-base">⚡</span>
              <span>Suite OpenAPI</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold uppercase">
              SDI
            </span>
          </button>
        </nav>

        {/* Live MCP Server Status Pill */}
        <div className="p-4 mx-3 my-2 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-slate-500 dark:text-slate-400">Servidor MCP</span>
            <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
              Online
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
            /mcp • OAuth 2.1 PKCE
          </div>
        </div>

        {/* Theme Switcher in Sidebar */}
        <div className="px-4 py-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80">
          <span className="text-xs font-bold text-slate-500">Apariencia</span>
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span>{theme === "dark" ? "Tema Claro" : "Tema Oscuro"}</span>
          </button>
        </div>

        {/* User Session Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {user.name}
              </div>
              <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Cerrar Sesión / Salir"
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition font-bold text-sm"
          >
            ↪ Salir
          </button>
        </div>
      </aside>
    </>
  );
}
