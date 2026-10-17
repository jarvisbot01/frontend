"use client";

import React from "react";
import { Category, Product } from "../../types/index.js";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  categories: Category[];
  onSave: (payload: {
    sku: string;
    name: string;
    description: string;
    price: string;
    cost: string;
    stock: number;
    minStock: number;
    categoryId?: number;
  }) => Promise<void>;
}

export function ProductModal({
  isOpen,
  onClose,
  editingProduct,
  categories,
  onSave,
}: ProductModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      sku: formData.get("sku") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      cost: formData.get("cost") as string,
      stock: parseInt(formData.get("stock") as string, 10),
      minStock: parseInt(formData.get("minStock") as string, 10),
      categoryId: parseInt(formData.get("categoryId") as string, 10) || undefined,
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
            {editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de producto"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">SKU *</label>
              <input
                name="sku"
                defaultValue={editingProduct?.sku || ""}
                placeholder="ELEC-NEW-001"
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Categoría</label>
              <select
                name="categoryId"
                defaultValue={editingProduct?.categoryId || categories[0]?.id || 1}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-400 uppercase mb-1">Nombre del Producto *</label>
            <input
              name="name"
              defaultValue={editingProduct?.name || ""}
              placeholder="Ej. Monitor Curvo 27' 144Hz"
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-400 uppercase mb-1">Descripción</label>
            <textarea
              name="description"
              defaultValue={editingProduct?.description || ""}
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Precio Venta ($) *</label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingProduct?.price || "99.00"}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Costo ($)</label>
              <input
                name="cost"
                type="number"
                step="0.01"
                defaultValue={editingProduct?.cost || "50.00"}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Stock Inicial *</label>
              <input
                name="stock"
                type="number"
                defaultValue={editingProduct?.stock ?? 10}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold text-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase mb-1">Stock Mínimo</label>
              <input
                name="minStock"
                type="number"
                defaultValue={editingProduct?.minStock ?? 5}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold text-amber-500"
              />
            </div>
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
              {editingProduct ? "Actualizar Producto" : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
