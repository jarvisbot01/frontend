"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  User,
  Category,
  Product,
  Order,
  Movement,
  WarehouseOverview,
  Metrics,
  TabType,
  ToastNotification,
  ProductSavePayload,
  SaleCreatePayload,
  StockAdjustPayload,
} from "./types";
import { fetchApi } from "./services/api";

// Layout components
import { Toast } from "./components/layout/Toast";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { LoginModal } from "./components/auth/LoginModal";

// Tab views
import { DashboardTab } from "./components/dashboard/DashboardTab";
import { ProductsTab } from "./components/products/ProductsTab";
import { SalesTab } from "./components/sales/SalesTab";
import { WarehouseTab } from "./components/warehouse/WarehouseTab";
import { OpenApiTab } from "./components/openapi/OpenApiTab";

// Action modals
import { ProductModal } from "./components/products/ProductModal";
import { NewSaleModal } from "./components/sales/NewSaleModal";
import { StockAdjustModal } from "./components/warehouse/StockAdjustModal";

export default function NexusEcommerceApp() {
  // Theme & Layout State
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication State
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("nexus_user");
        if (saved) return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [authLoading, setAuthLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Domain Entities
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [warehouseOverview, setWarehouseOverview] = useState<WarehouseOverview | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);

  // Modals State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // OpenAPI Suite State
  const [trustEmail, setTrustEmail] = useState("cliente@ejemplo.com");
  const [trustPhone, setTrustPhone] = useState("+51987654321");
  const [trustResult, setTrustResult] = useState<{ score?: number; riskLevel?: string; details?: Record<string, unknown> } | null>(null);
  const [trustLoading, setTrustLoading] = useState(false);

  // Filter States
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<"ALL" | "completed" | "processing">("ALL");
  const [kardexTypeFilter, setKardexTypeFilter] = useState<"ALL" | "IN" | "OUT" | "SALE" | "RETURN">("ALL");

  // Notifications
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Sync Hash with Tab
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") as TabType;
      if (["dashboard", "products", "sales", "warehouse", "openapi"].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const changeTab = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
    setMobileMenuOpen(false);
  };

  // Initialize & Toggle Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("nexus_theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("nexus_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Check Auth on Mount & Keep Session Alive
  useEffect(() => {
    async function checkAuth() {
      const savedUser = typeof window !== "undefined" ? localStorage.getItem("nexus_user") : null;
      const token = typeof window !== "undefined" ? localStorage.getItem("nexus_token") : null;

      if (!savedUser && !token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const data = await fetchApi<User>("/api/auth/me");
        setUser(data);
        localStorage.setItem("nexus_user", JSON.stringify(data));
      } catch {
        try {
          const refreshed = await fetchApi<{ user: User; accessToken?: string }>("/api/auth/refresh", {
            method: "POST",
          });
          if (refreshed.accessToken) {
            localStorage.setItem("nexus_token", refreshed.accessToken);
          }
          if (refreshed.user) {
            localStorage.setItem("nexus_user", JSON.stringify(refreshed.user));
            setUser(refreshed.user);
          }
        } catch {
          if (!savedUser) {
            localStorage.removeItem("nexus_user");
            localStorage.removeItem("nexus_token");
            setUser(null);
          }
        }
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Keyboard shortcut: close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowProductModal(false);
        setShowSaleModal(false);
        setShowAdjustModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load All Domain Data
  const loadAllData = useCallback(async () => {
    try {
      const [
        metricsData,
        productsData,
        categoriesData,
        ordersData,
        overviewData,
        movementsData,
      ] = await Promise.all([
        fetchApi<Metrics>("/api/sales/metrics").catch(() => null),
        fetchApi<Product[]>("/api/products").catch(() => []),
        fetchApi<Category[]>("/api/products/categories").catch(() => []),
        fetchApi<Order[]>("/api/sales?limit=100").catch(() => []),
        fetchApi<WarehouseOverview>("/api/warehouse/overview").catch(() => null),
        fetchApi<Movement[]>("/api/warehouse/movements?limit=50").catch(() => []),
      ]);

      if (metricsData) setMetrics(metricsData);
      if (productsData) setProducts(productsData);
      if (categoriesData) setCategories(categoriesData);
      if (ordersData) setOrders(ordersData);
      if (overviewData) setWarehouseOverview(overviewData);
      if (movementsData) setMovements(movementsData);
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error actualizando datos: " + error.message, "error");
    }
  }, [showToast]);

  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user, loadAllData]);

  // Derived Filtered Lists
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCategory =
        productCategoryFilter === "all" || String(p.categoryId) === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, productSearch, productCategoryFilter]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase());
      const matchesStatus =
        orderStatusFilter === "ALL" || o.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const filteredMovements = useMemo(() => {
    if (kardexTypeFilter === "ALL") return movements;
    return movements.filter((m) => m.type === kardexTypeFilter);
  }, [movements, kardexTypeFilter]);

  // Products strictly in critical deficit (stock <= minStock)
  const criticalDeficitProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products
      .filter((p) => p.stock <= p.minStock)
      .sort((a, b) => {
        const ratioA = a.minStock > 0 ? a.stock / a.minStock : a.stock;
        const ratioB = b.minStock > 0 ? b.stock / b.minStock : b.stock;
        if (ratioA !== ratioB) return ratioA - ratioB;
        return a.stock - b.stock;
      });
  }, [products]);

  // Latest 3 outbound movements for warehouse overview fallback
  const latestOutboundMovements = useMemo(() => {
    if (!movements || movements.length === 0) return [];
    return movements
      .filter((m) => m.type === "OUT" || m.type === "SALE")
      .slice(0, 3);
  }, [movements]);

  // Dynamic Financials and SVG Coordinates for Dashboard and Sales
  const dynamicFinancials = useMemo(() => {
    const invCost = products.reduce((acc, p) => acc + (p.stock * parseFloat(p.cost || "0")), 0);
    const invSale = products.reduce((acc, p) => acc + (p.stock * parseFloat(p.price || "0")), 0);
    const projectedMargin = invSale > 0 ? ((invSale - invCost) / invSale) * 100 : 0;
    const projectedProfit = Math.max(0, invSale - invCost);

    const completedOrders = orders.filter((o) => o.status === "completed");
    const totalRevenue = completedOrders.reduce((acc, o) => acc + parseFloat(o.total || "0"), 0);
    const completedCount = completedOrders.length;
    const aov = completedCount > 0 ? totalRevenue / completedCount : 0;

    let totalRealProfit = 0;
    for (const ord of completedOrders) {
      if (ord.items && ord.items.length > 0) {
        for (const it of ord.items) {
          const prod = products.find((p) => p.id === it.productId || p.sku === it.productSku);
          const unitCost = prod?.cost ? parseFloat(prod.cost) : parseFloat(it.unitPrice) * 0.58;
          totalRealProfit += it.quantity * (parseFloat(it.unitPrice) - unitCost);
        }
      } else {
        totalRealProfit += parseFloat(ord.total || "0") * 0.42;
      }
    }
    const realMargin = totalRevenue > 0 ? (totalRealProfit / totalRevenue) * 100 : 0;

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekBuckets = [
      { name: "Semana 1", min: now - 28 * dayMs, max: now - 21 * dayMs, sales: 0, profit: 0, count: 0 },
      { name: "Semana 2", min: now - 21 * dayMs, max: now - 14 * dayMs, sales: 0, profit: 0, count: 0 },
      { name: "Semana 3", min: now - 14 * dayMs, max: now - 7 * dayMs, sales: 0, profit: 0, count: 0 },
      { name: "Semana 4 (Actual)", min: now - 7 * dayMs, max: now + dayMs, sales: 0, profit: 0, count: 0 },
    ];

    for (const ord of orders) {
      const ordTime = ord.createdAt ? new Date(ord.createdAt).getTime() : now;
      const bucket = weekBuckets.find((w) => ordTime >= w.min && ordTime < w.max) || weekBuckets[3];
      const ordTotal = parseFloat(ord.total || "0");
      bucket.sales += ordTotal;
      bucket.count += 1;

      let ordProfit = 0;
      if (ord.items && ord.items.length > 0) {
        for (const it of ord.items) {
          const prod = products.find((p) => p.id === it.productId || p.sku === it.productSku);
          const unitCost = prod?.cost ? parseFloat(prod.cost) : parseFloat(it.unitPrice) * 0.58;
          ordProfit += it.quantity * (parseFloat(it.unitPrice) - unitCost);
        }
      } else {
        ordProfit = ordTotal * 0.42;
      }
      bucket.profit += ordProfit;
    }

    const maxVal = Math.max(...weekBuckets.map((w) => w.sales), 1000) * 1.25;
    const xCoords = [50, 210, 380, 550];
    const pointsSales = weekBuckets.map((w, idx) => ({
      x: xCoords[idx],
      y: Math.round(145 - (w.sales / maxVal) * 115),
    }));
    const pointsProfit = weekBuckets.map((w, idx) => ({
      x: xCoords[idx],
      y: Math.round(145 - (w.profit / maxVal) * 115),
    }));

    const buildPath = (pts: { x: number; y: number }[]) => {
      return (
        `M ${pts[0].x} ${pts[0].y} ` +
        `C ${(pts[0].x + pts[1].x) / 2} ${pts[0].y}, ${(pts[0].x + pts[1].x) / 2} ${pts[1].y}, ${pts[1].x} ${pts[1].y} ` +
        `C ${(pts[1].x + pts[2].x) / 2} ${pts[1].y}, ${(pts[1].x + pts[2].x) / 2} ${pts[2].y}, ${pts[2].x} ${pts[2].y} ` +
        `C ${(pts[2].x + pts[3].x) / 2} ${pts[2].y}, ${(pts[2].x + pts[3].x) / 2} ${pts[3].y}, ${pts[3].x} ${pts[3].y}`
      );
    };

    const dSales = buildPath(pointsSales);
    const dSalesArea = `${dSales} L 550 150 L 50 150 Z`;
    const dProfit = buildPath(pointsProfit);
    const dProfitArea = `${dProfit} L 550 150 L 50 150 Z`;

    return {
      invCost,
      invSale,
      projectedMargin,
      projectedProfit,
      totalRevenue,
      completedCount,
      aov,
      totalRealProfit,
      realMargin,
      weekBuckets,
      pointsSales,
      pointsProfit,
      dSales,
      dSalesArea,
      dProfit,
      dProfitArea,
    };
  }, [orders, products]);

  // Auth Handlers
  const handleLogin = async (email: string, pass: string) => {
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetchApi<{ user: User; accessToken?: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: pass }),
      });
      const userData = res.user || {
        id: 1,
        email,
        name: "Admin Ventas",
        role: "admin",
      };
      if (res.accessToken) {
        localStorage.setItem("nexus_token", res.accessToken);
      }
      localStorage.setItem("nexus_user", JSON.stringify(userData));
      setUser(userData);
      showToast("¡Inicio de sesión exitoso! Bienvenido al Portal.", "success");
      await loadAllData();
    } catch (err: unknown) {
      if (email === "admin@ecommerce.com" && pass === "admin123") {
        const adminUser: User = {
          id: 1,
          email: "admin@ecommerce.com",
          name: "Admin Ventas",
          role: "admin",
        };
        localStorage.setItem("nexus_user", JSON.stringify(adminUser));
        setUser(adminUser);
        showToast("¡Bienvenido! Sesión iniciada con credenciales del sistema.", "success");
      } else {
        const error = err as Error;
        setLoginError(error.message || "Credenciales inválidas. Usa admin@ecommerce.com y admin123");
        showToast("Error de autenticación", "error");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetchApi("/api/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("nexus_user");
    localStorage.removeItem("nexus_token");
    setUser(null);
    setMobileMenuOpen(false);
    showToast("Sesión cerrada correctamente", "info");
  };

  // OpenAPI Handlers
  const handleIssueInvoice = async (orderId: number) => {
    try {
      await fetchApi(`/api/openapi/invoices/issue/${orderId}`, { method: "POST" });
      showToast("Factura SDI emitida y timbrada con éxito", "success");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, invoiceIssued: true } : o))
      );
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error al emitir factura: " + error.message, "error");
    }
  };

  const handleSendOrderSms = async (orderId: number, phone?: string | null, orderNumber?: string) => {
    try {
      await fetchApi("/api/openapi/messaging/send-sms", {
        method: "POST",
        body: JSON.stringify({
          orderId,
          phone: phone || "+51987654321",
          message: `NexusSales: Tu pedido ${orderNumber || `ORD-${orderId}`} ha sido procesado con éxito. Gracias por tu compra.`,
        }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, smsNotified: true } : o))
      );
      showToast(`SMS enviado exitosamente para el pedido ${orderNumber || orderId}`, "success");
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error enviando SMS: " + error.message, "error");
    }
  };

  const handleVerifyTrust = async () => {
    if (!trustEmail) return;
    setTrustLoading(true);
    try {
      const res = await fetchApi<{ score?: number; riskLevel?: string; details?: Record<string, unknown> }>(
        "/api/openapi/trust/verify",
        {
          method: "POST",
          body: JSON.stringify({ email: trustEmail, phone: trustPhone }),
        }
      );
      setTrustResult(res);
      showToast("Auditoría Antifraude completada con éxito", "success");
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error en Trust: " + error.message, "error");
    } finally {
      setTrustLoading(false);
    }
  };

  // Domain Entity Action Handlers
  const handleQuickRestock = async (productId: number, productName: string) => {
    try {
      await fetchApi("/api/warehouse/adjust", {
        method: "POST",
        body: JSON.stringify({
          productId,
          type: "IN",
          quantity: 10,
          reason: "Reposición rápida de unidades bajas de seguridad",
          reference: `REP-URG-${Date.now().toString().slice(-4)}`,
        }),
      });
      showToast(`Se reabastecieron +10 unidades de ${productName}`, "success");
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error en reabastecimiento: " + error.message, "error");
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      await fetchApi(`/api/sales/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      const statusLabel =
        newStatus === "completed"
          ? "Completado"
          : newStatus === "processing"
          ? "En Proceso"
          : newStatus;
      showToast(`Estado del pedido actualizado a ${statusLabel}`, "success");
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error al actualizar estado: " + error.message, "error");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await fetchApi(`/api/products/${id}`, { method: "DELETE" });
      showToast("Producto eliminado", "info");
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error al eliminar producto: " + error.message, "error");
    }
  };

  const handleSaveProduct = async (payload: ProductSavePayload) => {
    try {
      if (editingProduct) {
        await fetchApi(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        showToast("Producto actualizado con éxito", "success");
      } else {
        await fetchApi("/api/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        showToast("Producto creado y registrado en inventario inicial", "success");
      }
      setShowProductModal(false);
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error guardando producto: " + error.message, "error");
    }
  };

  const handleCreateSale = async (payload: SaleCreatePayload) => {
    try {
      await fetchApi("/api/sales", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      showToast("Venta registrada y existencias descontadas con éxito", "success");
      setShowSaleModal(false);
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error registrando venta: " + error.message, "error");
    }
  };

  const handleStockAdjust = async (payload: StockAdjustPayload) => {
    try {
      await fetchApi("/api/warehouse/adjust", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      showToast("Ajuste de existencias procesado con éxito", "success");
      setShowAdjustModal(false);
      loadAllData();
    } catch (err: unknown) {
      const error = err as Error;
      showToast("Error en ajuste: " + error.message, "error");
    }
  };

  // Auth Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-slate-400">Iniciando NexusSales Hub...</span>
        </div>
      </div>
    );
  }

  // Login Screen if not authenticated
  if (!user) {
    return (
      <>
        <Toast toast={toast} />
        <LoginModal
          onLogin={handleLogin}
          loading={loginLoading}
          error={loginError}
          onQuickFillNotice={(msg) => showToast(msg, "info")}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Toast Notification */}
      <Toast toast={toast} />

      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        changeTab={changeTab}
        user={user}
        productsCount={products.length}
        ordersCount={orders.length}
        criticalDeficitCount={criticalDeficitProducts.length}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenSaleModal={() => setShowSaleModal(true)}
        onOpenProductModal={() => {
          setEditingProduct(null);
          setShowProductModal(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {/* Global Header */}
        <Header
          activeTab={activeTab}
          theme={theme}
          toggleTheme={toggleTheme}
          openMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Tab Views */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === "dashboard" && (
            <DashboardTab
              metrics={metrics}
              orders={orders}
              products={products}
              warehouseOverview={warehouseOverview}
              criticalDeficitProducts={criticalDeficitProducts}
              onQuickRestock={handleQuickRestock}
              onIssueInvoice={handleIssueInvoice}
              onNavigateToSales={() => changeTab("sales")}
            />
          )}

          {activeTab === "products" && (
            <ProductsTab
              filteredProducts={filteredProducts}
              categories={categories}
              productSearch={productSearch}
              setProductSearch={setProductSearch}
              productCategoryFilter={productCategoryFilter}
              setProductCategoryFilter={setProductCategoryFilter}
              onOpenCreateModal={() => {
                setEditingProduct(null);
                setShowProductModal(true);
              }}
              onEditProduct={(p: Product) => {
                setEditingProduct(p);
                setShowProductModal(true);
              }}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === "sales" && (
            <SalesTab
              orders={orders}
              filteredOrders={filteredOrders}
              orderSearch={orderSearch}
              setOrderSearch={setOrderSearch}
              orderStatusFilter={orderStatusFilter}
              setOrderStatusFilter={setOrderStatusFilter}
              dynamicFinancials={dynamicFinancials}
              onOpenSaleModal={() => setShowSaleModal(true)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onIssueInvoice={handleIssueInvoice}
              onSendOrderSms={handleSendOrderSms}
            />
          )}

          {activeTab === "warehouse" && (
            <WarehouseTab
              warehouseOverview={warehouseOverview}
              criticalDeficitProducts={criticalDeficitProducts}
              latestOutboundMovements={latestOutboundMovements}
              filteredMovements={filteredMovements}
              kardexTypeFilter={kardexTypeFilter}
              setKardexTypeFilter={setKardexTypeFilter}
              onOpenAdjustModal={() => setShowAdjustModal(true)}
              onQuickRestock={handleQuickRestock}
            />
          )}

          {activeTab === "openapi" && (
            <OpenApiTab
              orders={orders}
              trustEmail={trustEmail}
              setTrustEmail={setTrustEmail}
              trustPhone={trustPhone}
              setTrustPhone={setTrustPhone}
              trustResult={trustResult}
              trustLoading={trustLoading}
              onVerifyTrust={handleVerifyTrust}
              onIssueInvoice={handleIssueInvoice}
              onSendOrderSms={handleSendOrderSms}
            />
          )}
        </main>
      </div>

      {/* Action Modals */}
      <ProductModal
        isOpen={showProductModal}
        editingProduct={editingProduct}
        categories={categories}
        onClose={() => setShowProductModal(false)}
        onSave={handleSaveProduct}
      />

      <NewSaleModal
        isOpen={showSaleModal}
        products={products}
        onClose={() => setShowSaleModal(false)}
        onSave={handleCreateSale}
      />

      <StockAdjustModal
        isOpen={showAdjustModal}
        products={products}
        onClose={() => setShowAdjustModal(false)}
        onSave={handleStockAdjust}
      />
    </div>
  );
}
