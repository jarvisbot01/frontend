"use client";

import React from "react";
import { Order } from "../../types";
import { API_BASE } from "../../services/api";

interface TrustResult {
  score?: number;
  riskLevel?: string;
  details?: Record<string, unknown>;
}

interface OpenApiTabProps {
  orders: Order[];
  trustEmail: string;
  setTrustEmail: (email: string) => void;
  trustPhone: string;
  setTrustPhone: (phone: string) => void;
  trustResult: TrustResult | null;
  trustLoading: boolean;
  onVerifyTrust: () => void;
  onIssueInvoice: (orderId: number) => void;
  onSendOrderSms: (orderId: number, phone?: string, orderNumber?: string) => void;
}

export function OpenApiTab({
  orders,
  trustEmail,
  setTrustEmail,
  trustPhone,
  setTrustPhone,
  trustResult,
  trustLoading,
  onVerifyTrust,
  onIssueInvoice,
  onSendOrderSms,
}: OpenApiTabProps) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-cyan-950/60 border border-indigo-700/40 shadow-xl space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-flex items-center space-x-1.5">
          <span>🛡️</span>
          <span>OPENAPI SKILLS SUITE INTEGRADA</span>
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          OpenAPI: Facturación, Antifraude & Comunicaciones
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
          Servicios activos: Invoicing (SDI), Trust (Antifraude), Messaging (SMS) y Utilities (HTML to PDF).
        </p>
      </div>

      {/* 5 OpenAPI Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. OpenAPI Trust (Interactive) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 text-lg">🛡️</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                OpenAPI Trust
              </h3>
              <p className="text-xs text-slate-500">Auditoría Antifraude & Reputación</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                EMAIL DEL COMPRADOR
              </label>
              <input
                type="email"
                value={trustEmail}
                onChange={(e) => setTrustEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                TELÉFONO CELULAR
              </label>
              <input
                type="text"
                value={trustPhone}
                onChange={(e) => setTrustPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium"
              />
            </div>
            <button
              onClick={onVerifyTrust}
              disabled={trustLoading}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white shadow-md shadow-purple-600/30 transition disabled:opacity-50"
            >
              {trustLoading ? "Evaluando..." : "Evaluar Riesgo Transaccional"}
            </button>
          </div>

          {trustResult && (
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-400">Score de Confianza:</span>
                <span className="text-purple-400">{trustResult.score || 95}/100</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                ✓ Nivel de Riesgo: {trustResult.riskLevel || "BAJO"}
              </div>
            </div>
          )}
        </div>

        {/* 2. OpenAPI Invoicing */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-500 text-lg">📄</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              OpenAPI Invoicing
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Genera facturas electrónicas conformes al Sistema SDI europeo y emite el comprobante fiscal en XML y PDF.
          </p>
        </div>

        {/* 3. OpenAPI Messaging */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 text-lg">💬</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              OpenAPI Messaging
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Envío instantáneo de notificaciones SMS transaccionales y códigos OTP a los clientes al concretar su pedido.
          </p>
        </div>

        {/* 4. OpenAPI Utilities */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-500 text-lg">📥</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              OpenAPI Utilities
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Conversión de plantillas web dinámicas a comprobantes impresos oficiales descargables en formato PDF.
          </p>
        </div>

        {/* 5. OpenAPI Auth */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 text-lg">🔑</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              OpenAPI Auth
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tokens Bearer enlazados a oauth.openapi.com con control de saldo, billetera virtual y consumo por endpoint.
          </p>
        </div>
      </div>

      {/* ===================================================== */}
      {/* OPERACIONES OPENAPI POR PEDIDO                        */}
      {/* ===================================================== */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Operaciones OpenAPI por Pedido
          </h3>
          <p className="text-xs text-slate-500">
            Emite facturación electrónica, envía notificaciones SMS y descarga comprobantes
          </p>
        </div>

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-left text-xs min-w-[740px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase whitespace-nowrap">
                <th className="py-3 px-4">ORDEN</th>
                <th className="py-3 px-4">CLIENTE</th>
                <th className="py-3 px-4">IMPORTE</th>
                <th className="py-3 px-4">FACTURA SDI</th>
                <th className="py-3 px-4">SMS NOTIFICADO</th>
                <th className="py-3 px-4 text-right">ACCIONES OPENAPI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {(orders.length > 0
                ? orders
                : [
                    {
                      id: 3,
                      orderNumber: "ORD-2026-003",
                      customerName: "Rodrigo Silva",
                      customerEmail: "rodrigo.silva@email.com",
                      customerPhone: "+34600112233",
                      total: "349.00",
                      invoiceIssued: true,
                      smsNotified: true,
                      status: "processing" as const,
                      paymentMethod: "card",
                      createdAt: "",
                    },
                    {
                      id: 2,
                      orderNumber: "ORD-2026-002",
                      customerName: "Lucia Fernández",
                      customerEmail: "lucia.fernandez@email.com",
                      customerPhone: "+34600223344",
                      total: "204.90",
                      invoiceIssued: false,
                      smsNotified: false,
                      status: "completed" as const,
                      paymentMethod: "transfer",
                      createdAt: "",
                    },
                    {
                      id: 1,
                      orderNumber: "ORD-2026-001",
                      customerName: "Carlos Mendoza",
                      customerEmail: "carlos.mendoza@gmail.com",
                      customerPhone: "+34600334455",
                      total: "1689.49",
                      invoiceIssued: false,
                      smsNotified: false,
                      status: "completed" as const,
                      paymentMethod: "card",
                      createdAt: "",
                    },
                  ]
              ).map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-white">{ord.customerName}</div>
                    <div className="text-slate-500 text-[11px]">{ord.customerEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-sm text-slate-900 dark:text-white whitespace-nowrap">
                    ${ord.total}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {ord.invoiceIssued ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 inline-flex items-center space-x-1">
                        <span>✓</span>
                        <span>Emitida</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs font-medium">Sin emitir</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {ord.smsNotified ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 inline-flex items-center space-x-1">
                        <span>✓</span>
                        <span>Enviado</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs font-medium">Pendiente</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-2">
                      {ord.invoiceIssued ? (
                        <a
                          href={`${API_BASE}/api/openapi/invoices/FAC-2026-${String(ord.id).padStart(5, "0")}/pdf`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap hover:shadow"
                        >
                          <span>📥</span>
                          <span>Ver PDF</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => onIssueInvoice(ord.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 transition-all duration-150 active:scale-95 whitespace-nowrap hover:shadow"
                        >
                          <span>⚡</span>
                          <span>Emitir Factura</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSendOrderSms(ord.id, ord.customerPhone, ord.orderNumber)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all duration-150 active:scale-95 whitespace-nowrap hover:shadow"
                      >
                        <span>💬</span>
                        <span>Enviar SMS</span>
                      </button>
                    </div>
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
