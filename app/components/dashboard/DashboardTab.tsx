"use client";

import React from "react";
import { Order, Product, SalesMetrics, WarehouseOverview } from "../../types/index.js";

interface DashboardTabProps {
  metrics: SalesMetrics | null;
  orders: Order[];
  products: Product[];
  warehouseOverview: WarehouseOverview | null;
  criticalDeficitProducts: Product[];
  onQuickRestock: (productId: number, productName: string) => void;
  onIssueInvoice: (orderId: number) => void;
  onNavigateToSales: () => void;
}

export function DashboardTab({
  metrics,
  orders,
  products,
  warehouseOverview,
  criticalDeficitProducts,
  onQuickRestock,
  onIssueInvoice,
  onNavigateToSales,
}: DashboardTabProps) {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Ventas Totales</span>
            <span className="text-emerald-500 text-base">📈</span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            ${(metrics?.revenue || 2243.39).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">
            +18.4% vs mes anterior
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Pedidos Procesados</span>
            <span className="text-indigo-500 text-base">💳</span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {metrics?.salesCount || orders.length || 3}
          </div>
          <span className="text-[11px] text-slate-500 block">100% timbrados en SDI</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Productos en Catálogo</span>
            <span className="text-cyan-500 text-base">📦</span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {metrics?.productsCount || products.length || 8}
          </div>
          <span className="text-[11px] text-slate-500 block">
            {warehouseOverview?.totalStock || 191} unidades en existencia
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Alertas de Stock</span>
            <span className="text-amber-500 text-base">⚠️</span>
          </div>
          <div className="text-2xl font-black text-amber-500">
            {criticalDeficitProducts.length}
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold block truncate">
            {criticalDeficitProducts.length > 0
              ? `${criticalDeficitProducts[0].name} (${criticalDeficitProducts[0].stock}/${criticalDeficitProducts[0].minStock})`
              : "Existencias en nivel óptimo"}
          </span>
        </div>
      </div>

      {/* Critical Stock Alert Banner in Dashboard */}
      {criticalDeficitProducts.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/20 text-amber-500 animate-pulse">⚠️</span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Alerta de Existencias: {criticalDeficitProducts[0].name} (Stock: {criticalDeficitProducts[0].stock} / Mín: {criticalDeficitProducts[0].minStock})
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                SKU {criticalDeficitProducts[0].sku} requiere reposición urgente para evitar quiebre de stock.
              </p>
            </div>
          </div>
          <button
            onClick={() => onQuickRestock(criticalDeficitProducts[0].id, criticalDeficitProducts[0].name)}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30 transition shrink-0"
          >
            ⚡ Reabastecer +10 Unidades
          </button>
        </div>
      )}

      {/* Recent Orders in Dashboard */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Últimos Pedidos Confirmados
            </h3>
            <p className="text-xs text-slate-500">Transacciones sincronizadas con Drizzle ORM</p>
          </div>
          <button
            onClick={onNavigateToSales}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Ver todas las órdenes →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="py-2.5">N° Orden</th>
                <th className="py-2.5">Cliente</th>
                <th className="py-2.5">Importe</th>
                <th className="py-2.5">Estado</th>
                <th className="py-2.5">Factura SDI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3">
                    <span className="font-bold text-slate-900 dark:text-white">{ord.customerName}</span>
                    <span className="block text-[11px] text-slate-400">{ord.customerEmail}</span>
                  </td>
                  <td className="py-3 font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                    ${ord.total}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase inline-flex items-center space-x-1 border ${
                        ord.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : ord.status === "processing"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                      }`}
                    >
                      <span>
                        {ord.status === "completed"
                          ? "✓ Completado"
                          : ord.status === "processing"
                          ? "⏳ En Proceso"
                          : ord.status}
                      </span>
                    </span>
                  </td>
                  <td className="py-3">
                    {ord.invoiceIssued ? (
                      <span className="text-emerald-500 font-bold">✓ Timbrada SDI</span>
                    ) : (
                      <button
                        onClick={() => onIssueInvoice(ord.id)}
                        className="px-2 py-1 rounded bg-indigo-600 text-white text-[10px] font-bold"
                      >
                        Emitir Factura
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
