"use client";

import React from "react";
import { Product } from "../../types/index.js";

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSave: (payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerTaxId: string;
    paymentMethod: "card" | "transfer" | "cash" | "paypal";
    status: string;
    notes: string;
    items: { productId: number; quantity: number }[];
  }) => Promise<void>;
}

export function NewSaleModal({ isOpen, onClose, products, onSave }: NewSaleModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prodId = parseInt(formData.get("productId") as string, 10);
    const quantity = parseInt(formData.get("quantity") as string, 10);

    const payload = {
      customerName: formData.get("customerName") as string,
      customerEmail: formData.get("customerEmail") as string,
      customerPhone: formData.get("customerPhone") as string,
      customerTaxId: formData.get("customerTaxId") as string,
      paymentMethod: (formData.get("paymentMethod") as "card" | "transfer" | "cash" | "paypal") || "card",
      status: (formData.get("status") as string) || "completed",
      notes: formData.get("notes") as string,
      items: [{ productId: prodId, quantity }],
    };

    await onSave(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Registrar Nueva Venta / Pedido
          </h3>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de venta"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-400 uppercase mb-1">Seleccionar Producto *</label>
            <select
              name="productId"
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                  {p.name} - ${p.price} ({p.stock > 0 ? `Stock: ${p.stock}` : "AGOTADO"})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Cantidad *</label>
              <input
                name="quantity"
                type="number"
                min={1}
                defaultValue={1}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold text-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Método de Pago</label>
              <select
                name="paymentMethod"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
              >
                <option value="card">Tarjeta de Crédito / Débito</option>
                <option value="transfer">Transferencia Bancaria</option>
                <option value="cash">Efectivo</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Estado *</label>
              <select
                name="status"
                defaultValue="completed"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold"
              >
                <option value="completed">✓ Completado</option>
                <option value="processing">⏳ En Proceso</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Nombre del Cliente *</label>
              <input
                name="customerName"
                defaultValue="Carlos Mendoza"
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Email del Cliente *</label>
              <input
                name="customerEmail"
                type="email"
                defaultValue="carlos.mendoza@email.com"
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Teléfono</label>
              <input
                name="customerPhone"
                defaultValue="+51987654321"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">NIF / CIF / TaxID</label>
              <input
                name="customerTaxId"
                defaultValue="B12345678"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-400 uppercase mb-1">Notas de Entrega</label>
            <input
              name="notes"
              placeholder="Ej. Entregar en horario de oficina"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
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
              className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
            >
              Confirmar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
