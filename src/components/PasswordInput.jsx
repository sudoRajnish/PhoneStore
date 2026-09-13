import { useState } from "react";
import { Link } from "react-router-dom";
import "./PasswordInput.css";

// Reusable password field with a show/hide toggle.
// Works like a normal controlled input via value/onChange.
// `showForgotLink` is on by default for the Login page; other pages that
// reuse this field (Register, Update Password, Reset Password) pass false.
function PasswordInput({ id, label, value, onChange, error, autoComplete, placeholder, showForgotLink = true }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="form-field">
      <div className="form-field__row">
        <label htmlFor={id}>{label}</label>
        {showForgotLink && (
          <Link to="/forgot-password" className="form-field__link">
            Forgot Password?
          </Link>
        )}
      </div>

      <div className={`form-field__control ${error ? "has-error" : ""}`}>
        <LockIcon />
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter your password"}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="form-field__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      {error && (
        <span id={`${id}-error`} className="form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.6 20.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a20.6 20.6 0 0 1-2.34 3.31" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default PasswordInput;
