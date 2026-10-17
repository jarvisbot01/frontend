"use client";

import React from "react";
import { Product } from "../../types/index.js";

interface StockAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSave: (payload: {
    productId: number;
    type: "IN" | "OUT" | "RETURN";
    quantity: number;
    reason: string;
    reference: string;
  }) => Promise<void>;
}

export function StockAdjustModal({
  isOpen,
  onClose,
  products,
  onSave,
}: StockAdjustModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      productId: parseInt(formData.get("productId") as string, 10),
      type: formData.get("type") as "IN" | "OUT" | "RETURN",
      quantity: parseInt(formData.get("quantity") as string, 10),
      reason: formData.get("reason") as string,
      reference: formData.get("reference") as string,
    };
    await onSave(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Ajuste de Inventario (Kardex)
          </h3>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de ajuste"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-400 uppercase mb-1">Producto *</label>
            <select
              name="productId"
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Tipo de Ajuste *</label>
              <select
                name="type"
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold"
              >
                <option value="IN">➕ Entrada (IN)</option>
                <option value="OUT">➖ Salida (OUT)</option>
                <option value="RETURN">↩ Devolución (RETURN)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Cantidad *</label>
              <input
                name="quantity"
                type="number"
                min={1}
                defaultValue={5}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold text-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-400 uppercase mb-1">Motivo del Ajuste *</label>
            <input
              name="reason"
              defaultValue="Recepción de nuevo lote de proveedor"
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-400 uppercase mb-1">N° de Guía o Referencia</label>
            <input
              name="reference"
              placeholder="Ej. GUIA-2026-0091"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono font-medium"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30"
            >
              Confirmar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
