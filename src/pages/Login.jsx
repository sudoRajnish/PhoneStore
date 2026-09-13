import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import TextField from "../components/TextField.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import SocialLoginButtons from "../components/SocialLoginButtons.jsx";
import { mockLogin } from "../utils/auth.js";
import "./Login.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null); // { type: 'success' | 'error', text }

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    // Clear that field's error as soon as the person starts fixing it.
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
      await mockLogin(formData.email.trim(), formData.password);
      setFormMessage({ type: "success", text: "Login successful! Redirecting..." });
      // Placeholder redirect — replace with real post-login navigation later.
      setTimeout(() => navigate("/"), 900);
    } catch (err) {
      setFormMessage({ type: "error", text: err.message || "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Nova Mobile account" title="Welcome Back" subtitle="Login to continue shopping">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
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

        <PasswordInput
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleChange("password")}
          error={errors.password}
          autoComplete="current-password"
        />

        {formMessage && (
          <div className={`login-form__message login-form__message--${formMessage.type}`} role="status">
            {formMessage.type === "success" ? <CheckIcon /> : <AlertIcon />}
            {formMessage.text}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block login-form__submit" disabled={isSubmitting}>
          {isSubmitting && <span className="login-form__spinner" aria-hidden="true" />}
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="login-form__register">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>

        <SocialLoginButtons />
      </form>
    </AuthLayout>
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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default Login;
