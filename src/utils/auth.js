// Placeholder authentication logic.
// Replace the inside of this function with a real API call later, e.g.:
//
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) throw new Error("Invalid email or password");
//   return res.json();
//
// As long as it still returns a Promise that resolves on success and
// rejects with an Error on failure, no changes are needed in Login.jsx.

export function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo-only failure case so the error UI can be seen without a backend.
      if (email.toLowerCase() === "test@fail.com") {
        reject(new Error("Incorrect email or password. Please try again."));
        return;
      }
      resolve({ email });
    }, 1200);
  });
}

// Same placeholder pattern as mockLogin — replace with a real
// `POST /api/auth/register` call later; keep the resolve/reject contract.
export function mockRegister({ email }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.toLowerCase() === "test@fail.com") {
        reject(new Error("An account with this email already exists."));
        return;
      }
      resolve({ email });
    }, 1200);
  });
}
