import products from "./products.js";

// Dummy order data for the Order Details page.
// Replace `getOrderById` with a real call later, e.g.:
//   const res = await fetch(`/api/orders/${id}`);
// as long as it still returns an object shaped like the ones below (or
// null when not found), no component changes are needed.

export const ORDER_STATUSES = ["ordered", "confirmed", "shipped", "out-for-delivery", "delivered"];

export const ORDER_STATUS_LABELS = {
  ordered: "Ordered",
  confirmed: "Confirmed",
  shipped: "Shipped",
  "out-for-delivery": "Out for Delivery",
  delivered: "Delivered",
};

// A few fixed orders so /order/ORD-1001 etc. always show something specific.
const sampleOrders = [
  {
    orderId: "ORD-1001",
    date: "2026-09-08",
    status: "delivered",
    paymentStatus: "Paid",
    paymentMethod: "online",
    address: {
      fullName: "Rohan Sharma",
      phone: "+91 98765 43210",
      address: "24 Lake Road, Salt Lake",
      city: "Kolkata",
      state: "West Bengal",
      pinCode: "700091",
    },
    items: [
      { id: "p1", name: "iPhone 15 Pro", brand: "Apple", price: 134900, color: "#c8ff4d", quantity: 1 },
    ],
  },
  {
    orderId: "ORD-1002",
    date: "2026-09-10",
    status: "shipped",
    paymentStatus: "Paid",
    paymentMethod: "online",
    address: {
      fullName: "Priya Sharma",
      phone: "+91 91234 56789",
      address: "18 Park Street",
      city: "Bengaluru",
      state: "Karnataka",
      pinCode: "560001",
    },
    items: [
      { id: "p3", name: "Galaxy S24 Ultra", brand: "Samsung", price: 129999, color: "#6c5cf0", quantity: 1 },
      { id: "p8", name: "Redmi Note 13 Pro", brand: "Xiaomi", price: 32999, color: "#ff6161", quantity: 2 },
    ],
  },
  {
    orderId: "ORD-1003",
    date: "2026-09-12",
    status: "confirmed",
    paymentStatus: "Pending",
    paymentMethod: "cod",
    address: {
      fullName: "Arjun Das",
      phone: "+91 90000 11223",
      address: "42 Garia Main Road",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
    },
    items: [{ id: "p9", name: "Pixel 8 Pro", brand: "Google", price: 106999, color: "#4dd0ff", quantity: 1 }],
  },
];

function buildTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + (item.oldPrice ?? item.price) * item.quantity, 0);
  const currentSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal - currentSubtotal;
  const delivery = currentSubtotal >= 50000 ? 0 : 99;
  const total = currentSubtotal + delivery;
  return { subtotal, discount, delivery, total };
}

// Builds a plausible order for any id we don't have fixed sample data for —
// e.g. the auto-generated "ORD-XXXXXXXX" ids created by utils/orders.js
// after a real checkout. Deterministic (seeded from the id) so the same id
// always renders the same order rather than changing on every visit.
function buildFallbackOrder(id) {
  const seed = String(id)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const itemCount = (seed % 2) + 1;
  const items = Array.from({ length: itemCount }).map((_, index) => {
    const product = products[(seed + index * 3) % products.length];
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      oldPrice: product.oldPrice,
      color: product.color,
      quantity: (seed + index) % 3 === 0 ? 2 : 1,
    };
  });

  const status = ORDER_STATUSES[seed % ORDER_STATUSES.length];
  const daysAgo = seed % 6;
  const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

  return {
    orderId: id,
    date,
    status,
    paymentStatus: "Paid",
    paymentMethod: seed % 4 === 0 ? "cod" : "online",
    address: {
      fullName: "Rohan Sharma",
      phone: "+91 98765 43210",
      address: "24 Lake Road, Salt Lake",
      city: "Kolkata",
      state: "West Bengal",
      pinCode: "700091",
    },
    items,
  };
}

export function getOrderById(id) {
  if (!id) return null;

  const fixed = sampleOrders.find((order) => order.orderId === id);
  const base = fixed || buildFallbackOrder(id);
  const totals = buildTotals(base.items);

  return { ...base, ...totals };
}
