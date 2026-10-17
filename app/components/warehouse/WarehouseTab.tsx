"use client";

import React from "react";
import { Product, Movement, WarehouseOverview } from "../../types";

interface WarehouseTabProps {
  warehouseOverview: WarehouseOverview | null;
  criticalDeficitProducts: Product[];
  latestOutboundMovements: Movement[];
  filteredMovements: Movement[];
  kardexTypeFilter: "ALL" | "IN" | "OUT" | "SALE" | "RETURN";
  setKardexTypeFilter: (filter: "ALL" | "IN" | "OUT" | "SALE" | "RETURN") => void;
  onOpenAdjustModal: () => void;
  onQuickRestock: (id: number, name: string) => void;
}

export function WarehouseTab({
  warehouseOverview,
  criticalDeficitProducts,
  latestOutboundMovements,
  filteredMovements,
  kardexTypeFilter,
  setKardexTypeFilter,
  onOpenAdjustModal,
  onQuickRestock,
}: WarehouseTabProps) {
  return (
    <div className="space-y-6">
      {/* Valuation Financial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Valorización a Costo
          </span>
          <div className="text-2xl font-black mt-2 text-slate-900 dark:text-white">
            ${parseFloat(warehouseOverview?.totalCostValuation || "31365.00").toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Costo de compra en almacén</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Valorización a Venta
          </span>
          <div className="text-2xl font-black mt-2 text-emerald-600 dark:text-emerald-400">
            ${parseFloat(warehouseOverview?.totalSaleValuation || "47733.02").toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Precio comercial proyectado</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Margen Global Proyectado
            </span>
            <div className="text-2xl font-black mt-2 text-indigo-600 dark:text-indigo-400">
              34.3%
            </div>
          </div>
          <button
            onClick={onOpenAdjustModal}
            className="mt-3 w-full py-2 px-3 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30 transition text-center"
          >
            + Registrar Ajuste de Stock
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* MONITOREO DINÁMICO DE EXISTENCIAS / SALIDAS KARDEX    */}
      {/* ===================================================== */}
      {criticalDeficitProducts.length > 0 ? (
        <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:row items-start sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
            <div className="flex items-center space-x-3">
              <span className="text-2xl p-2.5 rounded-2xl bg-amber-500/20 text-amber-500 animate-pulse">
                ⚠️
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {criticalDeficitProducts.length === 1
                    ? "1 Producto con Menor Existencia en Almacén"
                    : `${criticalDeficitProducts.length} Productos con Menor Existencia en Almacén`}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Monitoreo dinámico continuo de inventario y umbrales mínimos de reposición
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
              {criticalDeficitProducts.length} Ítem{criticalDeficitProducts.length > 1 ? "s" : ""} en Riesgo Crítico
            </span>
          </div>

          {/* Critical Products Grid */}
          <div
            className={`grid grid-cols-1 ${
              criticalDeficitProducts.length === 1
                ? "max-w-md mx-auto sm:mx-0"
                : criticalDeficitProducts.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
            } gap-4`}
          >
            {criticalDeficitProducts.map((item) => {
              const min = item.minStock || 1;
              const pct = Math.min(100, Math.round((item.stock / min) * 100));
              const isDeficit = item.stock <= item.minStock;
              const deficit = isDeficit ? item.minStock - item.stock : 0;
              const surplus = !isDeficit ? item.stock - item.minStock : 0;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/50 shadow-amber-500/5 hover:border-amber-500 transition-all duration-300 shadow-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        {item.sku}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold border shrink-0 bg-rose-500/20 text-rose-500 border-rose-500/30 animate-pulse">
                      Stock: {item.stock} / Mín: {item.minStock}
                    </span>
                  </div>

                  {/* Inventory Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-500">Nivel de Seguridad:</span>
                      <span className="text-rose-500 font-extrabold">
                        {pct}% {isDeficit ? `(Déficit: ${deficit} un.)` : `(+${surplus} un. margen)`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-rose-500"
                        style={{ width: `${Math.min(100, Math.max(10, pct))}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Precio / Costo</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ${item.price} <span className="text-slate-400 font-normal">(${item.cost})</span>
                      </span>
                    </div>
                    <button
                      onClick={() => onQuickRestock(item.id, item.name)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30 transition flex items-center space-x-1"
                    >
                      <span>⚡ Reabastecer (+10)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* FALLBACK: CUANDO NO HAY PRODUCTOS CRÍTICOS -> MOSTRAR LAS ÚLTIMAS 3 SALIDAS */
        <div className="p-6 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
            <div className="flex items-center space-x-3">
              <span className="text-2xl p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-500">
                📦
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Últimas 3 Salidas de Almacén (Despachos y Bajas)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Inventario en niveles óptimos (sin ítems en riesgo crítico) — Registro de salidas recientes en Kárdex
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white uppercase tracking-wider">
              0 Ítems en Riesgo · Inventario Saludable
            </span>
          </div>

          {/* Grid de las últimas 3 salidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestOutboundMovements.map((mov) => {
              const isSale = mov.type === "SALE";
              return (
                <div
                  key={mov.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        {mov.productSku}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1 line-clamp-1">
                        {mov.productName}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{mov.reason}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-extrabold border shrink-0 ${
                        isSale
                          ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30"
                          : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {isSale ? "Despacho Venta" : "Salida Almacén"}
                    </span>
                  </div>

                  {/* Movement Details */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-500">Cantidad Egresada:</span>
                      <span className="text-rose-500 font-extrabold">
                        -{mov.quantity} un.
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-500">Evolución Stock:</span>
                      <span className="text-slate-700 dark:text-slate-300 font-bold">
                        {mov.previousStock} → {mov.newStock} un.
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-rose-500/70"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(10, Math.round((mov.newStock / (mov.previousStock || 1)) * 100))
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Referencia</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono text-[11px]">
                        {mov.reference || `KDX-${mov.id}`}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {new Date(mov.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Kardex Audit Movements */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kardex Inmutable de Movimientos
            </h3>
            <p className="text-xs text-slate-500">Historial de entradas, salidas, ventas y devoluciones</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl text-xs font-bold">
            {(["ALL", "IN", "OUT", "SALE", "RETURN"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setKardexTypeFilter(t)}
                className={`px-3 py-1 rounded-lg transition ${
                  kardexTypeFilter === t
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase">
                <th className="py-2.5">Fecha</th>
                <th className="py-2.5">Producto & SKU</th>
                <th className="py-2.5">Tipo</th>
                <th className="py-2.5">Cantidad</th>
                <th className="py-2.5">Stock Anterior ➔ Nuevo</th>
                <th className="py-2.5">Motivo & Referencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 text-slate-500 dark:text-slate-400 font-mono">
                    {new Date(m.createdAt).toLocaleDateString()} {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="py-3">
                    <span className="font-bold text-slate-900 dark:text-white">{m.productName}</span>
                    <span className="block font-mono text-indigo-600 dark:text-indigo-400 text-[10px]">{m.productSku}</span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-extrabold text-[10px] ${
                        m.type === "IN" || m.type === "RETURN"
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : m.type === "SALE"
                          ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                          : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {m.type}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-sm">
                    {m.type === "IN" || m.type === "RETURN" ? `+${m.quantity}` : `-${m.quantity}`}
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300 font-mono">
                    {m.previousStock} ➔ <span className="font-bold text-indigo-600 dark:text-indigo-400">{m.newStock}</span>
                  </td>
                  <td className="py-3">
                    <div className="font-medium text-slate-900 dark:text-white">{m.reason}</div>
                    {m.reference && (
                      <span className="text-[10px] text-slate-400 font-mono">{m.reference}</span>
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
