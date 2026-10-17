"use client";

import React from "react";
import { Category, Product } from "../../types/index.js";

interface ProductsTabProps {
  filteredProducts: Product[];
  categories: Category[];
  productSearch: string;
  setProductSearch: (s: string) => void;
  productCategoryFilter: string;
  setProductCategoryFilter: (c: string) => void;
  onOpenCreateModal: () => void;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: number) => void;
}

export function ProductsTab({
  filteredProducts,
  categories,
  productSearch,
  setProductSearch,
  productCategoryFilter,
  setProductCategoryFilter,
  onOpenCreateModal,
  onEditProduct,
  onDeleteProduct,
}: ProductsTabProps) {
  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <input
            type="text"
            placeholder="Buscar por SKU o Nombre..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-full sm:max-w-xs px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="all">Todas las Categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="px-4 py-2 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2 shrink-0"
        >
          <span>+ Nuevo Producto</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase">
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Producto & Descripción</th>
                <th className="py-3.5 px-4">Precio / Costo</th>
                <th className="py-3.5 px-4">Margen</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredProducts.map((p) => {
                const priceNum = parseFloat(p.price);
                const costNum = parseFloat(p.cost);
                const margin =
                  priceNum > 0 ? (((priceNum - costNum) / priceNum) * 100).toFixed(1) : "0.0";
                const isLowStock = p.stock <= p.minStock;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {p.sku}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</div>
                      <div className="text-slate-500 truncate max-w-xs">{p.description || "Sin descripción"}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">${p.price}</div>
                      <div className="text-slate-400 text-[11px]">Costo: ${p.cost}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                      {margin}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full font-black text-xs inline-flex items-center space-x-1 ${
                          p.stock === 0
                            ? "bg-rose-500/20 text-rose-500"
                            : isLowStock
                            ? "bg-amber-500/20 text-amber-500 animate-pulse border border-amber-500/40"
                            : "bg-emerald-500/20 text-emerald-500"
                        }`}
                      >
                        <span>{p.stock}</span>
                        <span className="text-[10px] opacity-70">/ min {p.minStock}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => onEditProduct(p)}
                        className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition"
                        title="Editar producto"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition"
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
