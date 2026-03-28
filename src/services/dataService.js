
export const stats = {
  totalOrders: 0,
  activeOrders: 0,
  couriers: 0,
  activeCouriers: 0,
  subscribers: 0,
  activeSubscribers: 0,
  monthlyRevenue: 0
};

export const recentOrders = [];

export const products = [];

export const financialStats = {
  dailyTurnover: 0,
  pendingCollection: 0,
  cashOnHand: 0,
  totalCredit: 0
};

export const transactions = [];

export const couriers = [];

export const reconciliations = [];

export const subscriptionStatus = {
  status: "Active",
  plan: "Pro",
  expiryDate: "2026-12-31"
};

export const churnRiskList = [];

export const currentUser = null;

export const customerOrders = [];

export const createRandomOrder = () => {
  return {
    id: Math.floor(Math.random() * 10000),
    customer: "Yeni Müşteri",
    product: "Su 19L",
    quantity: 1,
    courier: "-",
    status: "Hazırlanıyor",
    amount: 50
  };
};

export const suppliers = [];

export const supplierTransactions = [];
