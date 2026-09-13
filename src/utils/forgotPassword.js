// Placeholder password-reset flow logic (email → OTP → new password).
// Replace the insides of these three functions later, e.g.:
//
//   export function requestOtp(email) {
//     return fetch("/api/auth/forgot-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     }).then((res) => {
//       if (!res.ok) throw new Error("No account found with that email.");
//       return res.json();
//     });
//   }
//
//   export function verifyOtp(email, code) {
//     return fetch("/api/auth/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, code }),
//     }).then((res) => {
//       if (!res.ok) throw new Error("Invalid or expired code. Please try again.");
//       return res.json(); // { resetToken }
//     });
//   }
//
//   export function resetPassword({ email, code, newPassword }) {
//     return fetch("/api/auth/reset-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, code, newPassword }),
//     }).then((res) => {
//       if (!res.ok) throw new Error("Could not reset your password. Please try again.");
//       return res.json();
//     });
//   }
//
// As long as each keeps returning a Promise that resolves on success and
// rejects with an Error on failure, nothing on the Forgot Password page
// needs to change once a backend exists.

export function requestOtp(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.toLowerCase() === "test@fail.com") {
        reject(new Error("We couldn't find an account with that email."));
        return;
      }
      resolve({ sent: true });
    }, 900);
  });
}

// Demo-only: "000000" always fails so the error UI is reachable without a
// backend. Any other 6-digit code succeeds.
export function verifyOtp(email, code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === "000000") {
        reject(new Error("Invalid or expired code. Please try again."));
        return;
      }
      resolve({ resetToken: `reset_${Date.now().toString(36)}` });
    }, 900);
  });
}

export function resetPassword() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}
