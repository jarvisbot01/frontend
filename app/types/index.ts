export type TabType = "dashboard" | "products" | "sales" | "warehouse" | "openapi";

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description?: string;
  price: string;
  cost: string;
  stock: number;
  minStock: number;
  categoryId?: number;
  status: "active" | "inactive" | "out_of_stock";
  createdAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productSku: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerTaxId?: string;
  total: string;
  status: "completed" | "processing" | "pending" | "cancelled";
  paymentMethod: string;
  invoiceIssued: boolean;
  smsNotified: boolean;
  notes?: string;
  createdAt: string;
  items?: OrderItem[];
}

export interface InventoryMovement {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  type: "IN" | "OUT" | "SALE" | "RETURN";
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  reference?: string;
  createdAt: string;
}

export type Movement = InventoryMovement;

export interface WarehouseOverview {
  totalProducts: number;
  totalStock: number;
  totalCostValuation: string;
  totalSaleValuation: string;
  lowStockCount: number;
  lowStockItems: Product[];
}

export interface SalesMetrics {
  revenue: number;
  salesCount: number;
  productsCount: number;
  totalStock: number;
  customersCount: number;
  recentOrders: Order[];
}

export type Metrics = SalesMetrics;

export interface ToastNotification {
  message: string;
  type: "success" | "error" | "info";
}

export interface ProductSavePayload {
  sku: string;
  name: string;
  description: string;
  price: string;
  cost: string;
  stock: number;
  minStock: number;
  categoryId?: number;
}

export interface SaleCreatePayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerTaxId: string;
  paymentMethod: "card" | "transfer" | "cash" | "paypal";
  status: string;
  notes: string;
  items: { productId: number; quantity: number }[];
}

export interface StockAdjustPayload {
  productId: number;
  type: "IN" | "OUT" | "RETURN";
  quantity: number;
  reason: string;
  reference: string;
}
