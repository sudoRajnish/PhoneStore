// Placeholder order + payment-session creation.
// Replace the inside of these functions with real API calls later, e.g.:
//
//   export function createOrder(payload) {
//     return fetch("/api/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }).then((res) => {
//       if (!res.ok) throw new Error("Could not place your order. Please try again.");
//       return res.json(); // { orderId, ... }
//     });
//   }
//
// As long as it still returns a Promise that resolves with an object
// containing an `orderId`, nothing in Checkout.jsx needs to change.

function generateOrderId() {
  return `ORD-${Date.now().toString().slice(-8)}`;
}

export function createOrder(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId: generateOrderId(),
        createdAt: new Date().toISOString(),
        ...payload,
      });
    }, 1200);
  });
}
