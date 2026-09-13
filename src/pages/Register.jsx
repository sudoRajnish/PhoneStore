import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import TextField from "../components/TextField.jsx";
import TextAreaField from "../components/TextAreaField.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import { mockRegister } from "../utils/auth.js";
import { isValidEmail, isValidPhone, isValidPassword, PASSWORD_MIN_LENGTH } from "../utils/validators.js";
import "./Register.css";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address: "",
};

function validate(data) {
  const errors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  } else if (!isValidPassword(data.password)) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!data.address.trim()) {
    errors.address = "Address is required.";
  }

  return errors;
}

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setFormMessage(null);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Sent shape is ready for a real API: everything except confirmPassword.
      const { confirmPassword, ...payload } = formData;
      await mockRegister(payload);
      setFormMessage({ type: "success", text: "Account created! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setFormMessage({ type: "error", text: err.message || "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Join Nova Mobile" title="Create Your Account" subtitle="Sign up to start shopping smarter">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          error={errors.fullName}
          placeholder="Rohan Sharma"
          autoComplete="name"
          icon={<UserIcon />}
        />

        <TextField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<MailIcon />}
        />

        <TextField
          id="phone"
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={handleChange("phone")}
          error={errors.phone}
          placeholder="+91 98765 43210"
          autoComplete="tel"
          icon={<PhoneIcon />}
        />

        <PasswordInput
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleChange("password")}
          error={errors.password}
          autoComplete="new-password"
          placeholder="Min. 8 characters"
          showForgotLink={false}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          autoComplete="new-password"
          placeholder="Re-enter password"
          showForgotLink={false}
        />

        <TextAreaField
          id="address"
          label="Address"
          value={formData.address}
          onChange={handleChange("address")}
          error={errors.address}
          placeholder="Street, city, state, PIN code"
        />

        {formMessage && (
          <div className={`register-form__message register-form__message--${formMessage.type}`} role="status">
            {formMessage.text}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block register-form__submit" disabled={isSubmitting}>
          {isSubmitting && <span className="register-form__spinner" aria-hidden="true" />}
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>

        <p className="register-form__login">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default Register;
