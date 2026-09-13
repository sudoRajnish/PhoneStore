// Placeholder password-change logic, standing in for a real endpoint.
// Replace the inside of this function later, e.g.:
//
//   export function updatePassword(payload) {
//     return fetch("/profile/password", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }).then((res) => {
//       if (!res.ok) return res.json().then((body) => { throw new Error(body.message); });
//       return res.json();
//     });
//   }
//
// As long as it still returns a Promise that resolves on success and
// rejects with an Error on failure, nothing on the Update Password page
// needs to change once a backend exists.

export function updatePassword({ currentPassword }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo-only failure case so the error UI can be seen without a backend.
      if (currentPassword === "wrongpassword") {
        reject(new Error("Current password is incorrect."));
        return;
      }
      resolve({ success: true });
    }, 1000);
  });
}
