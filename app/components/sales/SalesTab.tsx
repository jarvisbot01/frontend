"use client";

import React from "react";
import { Order } from "../../types/index.js";

interface DynamicFinancials {
  invCost: number;
  invSale: number;
  projectedMargin: number;
  projectedProfit: number;
  totalRevenue: number;
  completedCount: number;
  aov: number;
  totalRealProfit: number;
  realMargin: number;
  weekBuckets: { name: string; sales: number; profit: number; count: number }[];
  pointsSales: { x: number; y: number }[];
  pointsProfit: { x: number; y: number }[];
  dSales: string;
  dSalesArea: string;
  dProfit: string;
  dProfitArea: string;
}

interface SalesTabProps {
  orders: Order[];
  filteredOrders: Order[];
  orderSearch: string;
  setOrderSearch: (s: string) => void;
  orderStatusFilter: "ALL" | "completed" | "processing";
  setOrderStatusFilter: (s: "ALL" | "completed" | "processing") => void;
  dynamicFinancials: DynamicFinancials;
  onOpenSaleModal: () => void;
  onUpdateOrderStatus: (orderId: number, status: string) => void;
  onIssueInvoice: (orderId: number) => void;
  onSendOrderSms: (orderId: number, phone?: string | null, orderNumber?: string) => void;
}

export function SalesTab({
  orders,
  filteredOrders,
  orderSearch,
  setOrderSearch,
  orderStatusFilter,
  setOrderStatusFilter,
  dynamicFinancials,
  onOpenSaleModal,
  onUpdateOrderStatus,
  onIssueInvoice,
  onSendOrderSms,
}: SalesTabProps) {
  return (
    <div className="space-y-6">
      {/* Monthly Financial Performance Card with Revenue & Earnings Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">📈</span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Ganancias y Rendimiento del Último Mes
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Análisis financiero de ingresos, costos operativos y margen neto de ventas
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              ✓ +24.8% Crecimiento Mensual
            </span>
          </div>
        </div>

        {/* 4 Financial KPI Mini Cards with dynamic margins and capitalization */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Ganancias Netas Reales
            </span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              ${dynamicFinancials.totalRealProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Margen realizado: {dynamicFinancials.realMargin.toFixed(1)}%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Facturación Total
            </span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
              ${dynamicFinancials.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-slate-500 block">
              {dynamicFinancials.completedCount} pedidos completados
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Ventas Proyectadas
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 font-bold">
                Stock Almacén
              </span>
            </div>
            <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 mt-1 block">
              ${dynamicFinancials.invSale.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Inversión Costo: ${dynamicFinancials.invCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Margen Previsto Capitalización
            </span>
            <span className="text-xl font-black text-amber-500 mt-1 block">
              {dynamicFinancials.projectedMargin.toFixed(1)}%
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
              +${dynamicFinancials.projectedProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ganancia latente
            </span>
          </div>
        </div>

        {/* Dynamic SVG Visual Area & Bar Chart */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-slate-500">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                <span className="text-slate-800 dark:text-slate-200 font-bold">Facturación ($)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <span className="text-slate-800 dark:text-slate-200 font-bold">Ganancias Netas ($)</span>
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
              <span>Período Dinámico de 4 Semanas ({orders.length} pedidos analizados)</span>
            </div>
          </div>

          {/* SVG Chart Graphic */}
          <div className="h-48 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1="30" x2="600" y2="30" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4" />
              <line x1="0" y1="75" x2="600" y2="75" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4" />

              {/* Indigo Area (Facturación) */}
              <path d={dynamicFinancials.dSalesArea} fill="url(#indigoGrad)" />
              <path
                d={dynamicFinancials.dSales}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Emerald Area (Ganancias Netas) */}
              <path d={dynamicFinancials.dProfitArea} fill="url(#emeraldGrad)" />
              <path
                d={dynamicFinancials.dProfit}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Dynamic Data Points */}
              {dynamicFinancials.pointsSales.map((pt, i) => (
                <g key={`sales-pt-${i}`}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                </g>
              ))}

              {dynamicFinancials.pointsProfit.map((pt, i) => (
                <g key={`profit-pt-${i}`}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>

          {/* Dynamic Weekly Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-center text-xs">
            {dynamicFinancials.weekBuckets.map((wb) => (
              <div
                key={wb.name}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:border-indigo-500/40"
              >
                <span className="font-extrabold text-slate-800 dark:text-slate-200 block text-xs">
                  {wb.name}
                </span>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-black block mt-0.5">
                  +${wb.profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  ${wb.sales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} facturado
                </span>
                <span className="text-[10px] text-indigo-500 font-bold block mt-1">
                  {wb.count} {wb.count === 1 ? "pedido" : "pedidos"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <input
            type="text"
            placeholder="Buscar por N° Orden, Cliente o Correo..."
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            className="w-full sm:max-w-xs px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Status Filter Tabs */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setOrderStatusFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                orderStatusFilter === "ALL"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Todos ({orders.length})
            </button>
            <button
              onClick={() => setOrderStatusFilter("processing")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1 ${
                orderStatusFilter === "processing"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-amber-600 dark:hover:text-amber-400"
              }`}
            >
              <span>⏳ En Proceso ({orders.filter((o) => o.status === "processing").length})</span>
            </button>
            <button
              onClick={() => setOrderStatusFilter("completed")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1 ${
                orderStatusFilter === "completed"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              <span>✓ Completados ({orders.filter((o) => o.status === "completed").length})</span>
            </button>
          </div>
        </div>

        <button
          onClick={onOpenSaleModal}
          className="px-4 py-2 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2 shrink-0"
        >
          <span>+ Registrar Nueva Venta</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[820px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase whitespace-nowrap">
                <th className="py-3.5 px-4">N° Orden</th>
                <th className="py-3.5 px-4">Cliente & Contacto</th>
                <th className="py-3.5 px-4">Ítems</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4">Método de Pago</th>
                <th className="py-3.5 px-4">Factura SDI</th>
                <th className="py-3.5 px-4">SMS Alerta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                    {ord.orderNumber}
                    <span className="block text-[10px] text-slate-400 font-sans">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-white">{ord.customerName}</div>
                    <div className="text-slate-500 text-[11px]">{ord.customerEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {ord.items?.length || 1} producto(s)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-sm text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    ${ord.total}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <select
                      value={ord.status}
                      onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer appearance-none text-center pr-7 pl-3 relative bg-no-repeat focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        ord.status === "completed"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                          : ord.status === "processing"
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/25"
                          : "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30"
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.45rem center",
                        backgroundSize: "0.8em 0.8em",
                      }}
                      title="Haz clic para alternar entre En Proceso y Completado"
                    >
                      <option value="processing" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        ⏳ En Proceso
                      </option>
                      <option value="completed" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        ✓ Completado
                      </option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 capitalize font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {ord.paymentMethod}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {ord.invoiceIssued ? (
                      <a
                        href={`/api/openapi/invoices/FAC-2026-${String(ord.id).padStart(5, "0")}/pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 inline-flex items-center space-x-1 border border-emerald-500/20 whitespace-nowrap"
                      >
                        <span>✓ SDI Timbrada</span>
                        <span>📄</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => onIssueInvoice(ord.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow whitespace-nowrap"
                      >
                        Emitir Factura SDI
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {ord.smsNotified ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                        ✓ Enviado
                      </span>
                    ) : (
                      <button
                        onClick={() => onSendOrderSms(ord.id, ord.customerPhone, ord.orderNumber)}
                        className="text-slate-400 hover:text-indigo-500 text-[11px] font-bold whitespace-nowrap"
                      >
                        Enviar SMS
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
