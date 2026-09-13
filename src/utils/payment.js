// Placeholder payment logic for the "Secure Payment" page.
//
// IMPORTANT: Roger Pay (or any gateway) secret keys must never live in this
// frontend code. The two functions below are exactly where a backend call
// belongs — the backend holds the secret key, talks to Roger Pay, and only
// ever sends the frontend a client-safe session id / redirect URL and,
// later, a plain success/failure result.
//
// Real integration would look roughly like:
//
//   export function createPaymentSession(order) {
//     return fetch("/api/payments/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderId: order.orderId, amount: order.total }),
//     }).then((res) => {
//       if (!res.ok) throw new Error("Could not start payment. Please try again.");
//       return res.json(); // { sessionId, redirectUrl? }
//     });
//   }
//
//   export function verifyPayment(sessionId) {
//     // Roger Pay redirects the user back (or fires a webhook the backend
//     // already recorded) — the frontend just asks the backend what
//     // happened, it never talks to Roger Pay directly.
//     return fetch(`/api/payments/verify?sessionId=${sessionId}`).then((res) => {
//       if (!res.ok) throw new Error("Could not verify payment status.");
//       return res.json(); // { status: "success" | "failed", transactionId, error? }
//     });
//   }
//
// As long as both keep returning Promises shaped like below, nothing in
// Payment.jsx needs to change once the backend exists.

function generateSessionId() {
  return `sess_${Date.now().toString(36)}`;
}

function generateTransactionId() {
  return `txn_${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}

export function createPaymentSession(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ sessionId: generateSessionId(), orderId: order.orderId });
    }, 700);
  });
}

// Demo-only: randomly succeeds or fails so every UI state is reachable
// without a real gateway. Replace entirely with the real verify call above.
export function verifyPayment() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccessful = Math.random() < 0.75;
      if (isSuccessful) {
        resolve({ status: "success", transactionId: generateTransactionId() });
      } else {
        resolve({
          status: "failed",
          error: "Your bank declined this transaction. Please try another payment method.",
        });
      }
    }, 1600);
  });
}
