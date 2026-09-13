import { Link } from "react-router-dom";
import PhoneMockup from "./PhoneMockup.jsx";
import "./AuthLayout.css";

// Shared shell for auth pages (Login now, Register later).
// Keeps the branding/visual side consistent without duplicating markup.
function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="auth">
      <div className="auth__panel">
        <div className="auth__panel-inner">
          <Link to="/" className="auth__logo">
            <span className="navbar__logo-mark">N</span>
            Nova<span className="navbar__logo-accent">Mobile</span>
          </Link>

          {eyebrow && <span className="auth__eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p className="auth__subtitle">{subtitle}</p>}

          {children}

          <Link to="/" className="auth__back">
            ← Back to home
          </Link>
        </div>
      </div>

      <div className="auth__visual">
        <div className="auth__blob" aria-hidden="true" />
        <PhoneMockup accent="#c8ff4d" className="auth__phone" />
        <div className="auth__floating-card auth__floating-card--top">
          <span className="dot" />
          Secure login
        </div>
        <div className="auth__floating-card auth__floating-card--bottom">
          <strong>15k+</strong>
          shoppers trust Nova Mobile
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
