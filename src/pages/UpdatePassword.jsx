import { useState } from "react";
import PasswordInput from "../components/PasswordInput.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { updatePassword } from "../utils/password.js";
import { isValidPassword, PASSWORD_MIN_LENGTH } from "../utils/validators.js";
import "./UpdatePassword.css";

const initialFormData = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

function validate(data) {
  const errors = {};

  if (!data.currentPassword) {
    errors.currentPassword = "Current password is required.";
  }

  if (!data.newPassword) {
    errors.newPassword = "New password is required.";
  } else if (!isValidPassword(data.newPassword)) {
    errors.newPassword = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  if (!data.confirmNewPassword) {
    errors.confirmNewPassword = "Please confirm your new password.";
  } else if (data.confirmNewPassword !== data.newPassword) {
    errors.confirmNewPassword = "Passwords do not match.";
  }

  return errors;
}

function UpdatePassword() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setMessage(null);

    if (Object.keys(validationErrors).length > 0) {
      setMessage({ type: "error", text: "Please fix the errors below before continuing." });
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePassword(formData);
      setMessage({ type: "success", text: "Your password has been updated successfully." });
      setFormData(initialFormData);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="update-password">
        <div className="container update-password__container">
          <div className="update-password__heading">
            <h1>Change Password</h1>
            <p>Keep your account secure by using a strong password.</p>
          </div>

          <form className="update-password__card" onSubmit={handleSubmit} noValidate>
            <PasswordInput
              id="currentPassword"
              label="Current Password"
              value={formData.currentPassword}
              onChange={handleChange("currentPassword")}
              error={errors.currentPassword}
              autoComplete="current-password"
              showForgotLink={false}
            />

            <PasswordInput
              id="newPassword"
              label="New Password"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              error={errors.newPassword}
              placeholder={`Min. ${PASSWORD_MIN_LENGTH} characters`}
              autoComplete="new-password"
              showForgotLink={false}
            />

            <PasswordInput
              id="confirmNewPassword"
              label="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange("confirmNewPassword")}
              error={errors.confirmNewPassword}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              showForgotLink={false}
            />

            {message && (
              <p className={`update-password__message update-password__message--${message.type}`} role="status">
                {message.text}
              </p>
            )}

            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
              {isSubmitting && <span className="update-password__spinner" aria-hidden="true" />}
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UpdatePassword;
