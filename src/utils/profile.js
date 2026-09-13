import dummyUser from "../data/user.js";

// Placeholder profile read/write, standing in for the real endpoints.
// Replace the insides of these functions later, e.g.:
//
//   export function fetchProfile() {
//     return fetch("/profile").then((res) => {
//       if (!res.ok) throw new Error("Could not load your profile.");
//       return res.json();
//     });
//   }
//
//   export function updateProfile(payload) {
//     return fetch("/profile", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }).then((res) => {
//       if (!res.ok) throw new Error("Could not save your changes. Please try again.");
//       return res.json();
//     });
//   }
//
// As long as both keep returning Promises shaped like the dummy data below,
// nothing in the Update Profile page needs to change once a backend exists.

export function fetchProfile() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...dummyUser }), 700);
  });
}

export function updateProfile(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo-only failure case so the error UI can be seen without a backend.
      if (payload.email.toLowerCase() === "test@fail.com") {
        reject(new Error("Could not save your changes. Please try again."));
        return;
      }
      resolve({ ...payload });
    }, 1100);
  });
}
