import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import TextField from "../components/TextField.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import OtpInput from "../components/OtpInput.jsx";
import { requestOtp, verifyOtp, resetPassword } from "../utils/forgotPassword.js";
import { isValidEmail, isValidPassword, PASSWORD_MIN_LENGTH } from "../utils/validators.js";
import "./ForgotPassword.css";

const RESEND_SECONDS = 45;

const STEP_CONTENT = {
  email: {
    eyebrow: "Account recovery",
    title: "Forgot Password?",
    subtitle: "Enter your registered email address and we'll help you reset your password.",
  },
  otp: {
    eyebrow: "Account recovery",
    title: "Verify Your Email",
    subtitle: "Enter the 6-digit code we sent you.",
  },
  reset: {
    eyebrow: "Account recovery",
    title: "Create New Password",
    subtitle: "Choose a strong new password for your account.",
  },
  success: {
    eyebrow: "Account recovery",
    title: "Password Reset Successful",
    subtitle: "You can now log in with your new password.",
  },
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function ForgotPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  // Countdown before "Resend OTP" becomes clickable again.
  useEffect(() => {
    if (step !== "otp" || secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, secondsLeft]);

  const handleSendOtp = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!email.trim()) {
      setErrors({ email: "Email is required." });
      return;
    }
    if (!isValidEmail(email)) {
      setErrors({ email: "Enter a valid email address." });
      return;
    }

    setErrors({});
    setFormError(null);
    setIsSubmitting(true);
    try {
      await requestOtp(email.trim());
      setSecondsLeft(RESEND_SECONDS);
      setStep("otp");
    } catch (err) {
      setFormError({ type: "error", text: err.message || "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (otp.length !== 6) {
      setErrors({ otp: "Enter the full 6-digit code." });
      return;
    }

    setErrors({});
    setFormError(null);
    setIsSubmitting(true);
    try {
      await verifyOtp(email, otp);
      setStep("reset");
    } catch (err) {
      setErrors({ otp: err.message || "Invalid or expired code. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (secondsLeft > 0 || isSubmitting) return;
    setFormError(null);
    setErrors({});
    setIsSubmitting(true);
    try {
      await requestOtp(email);
      setOtp("");
      setSecondsLeft(RESEND_SECONDS);
      setFormError({ type: "success", text: "A new code has been sent." });
    } catch (err) {
      setFormError({ type: "error", text: err.message || "Could not resend the code. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = {};
    if (!newPassword) {
      validationErrors.newPassword = "New password is required.";
    } else if (!isValidPassword(newPassword)) {
      validationErrors.newPassword = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your new password.";
    } else if (confirmPassword !== newPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);
    setFormError(null);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await resetPassword({ email, code: otp, newPassword });
      setStep("success");
    } catch (err) {
      setFormError({ type: "error", text: err.message || "Could not reset your password. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = STEP_CONTENT[step];

  return (
    <AuthLayout eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle}>
      {formError && (
        <p className={`forgot-password__message forgot-password__message--${formError.type}`} role="status">
          {formError.text}
        </p>
      )}

      {step === "email" && (
        <form onSubmit={handleSendOtp} noValidate>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => (prev.email ? { ...prev, email: undefined } : prev));
            }}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting && <span className="forgot-password__spinner" aria-hidden="true" />}
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>

          <p className="forgot-password__footer-link">
            Remembered your password? <Link to="/login">Back to Login</Link>
          </p>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} noValidate>
          <p className="forgot-password__otp-hint">
            Code sent to <strong>{email}</strong>
          </p>

          <OtpInput value={otp} onChange={setOtp} error={errors.otp} disabled={isSubmitting} />

          <button
            type="submit"
            className="btn btn-primary btn-block forgot-password__otp-submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <span className="forgot-password__spinner" aria-hidden="true" />}
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="forgot-password__resend">
            {secondsLeft > 0 ? (
              <span>Resend OTP in {formatTime(secondsLeft)}</span>
            ) : (
              <button type="button" onClick={handleResendOtp} disabled={isSubmitting}>
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="button"
            className="forgot-password__change-email"
            onClick={() => {
              setStep("email");
              setOtp("");
              setErrors({});
              setFormError(null);
            }}
          >
            ← Use a different email
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} noValidate>
          <PasswordInput
            id="newPassword"
            label="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrors((prev) => (prev.newPassword ? { ...prev, newPassword: undefined } : prev));
            }}
            error={errors.newPassword}
            placeholder={`Min. ${PASSWORD_MIN_LENGTH} characters`}
            autoComplete="new-password"
            showForgotLink={false}
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => (prev.confirmPassword ? { ...prev, confirmPassword: undefined } : prev));
            }}
            error={errors.confirmPassword}
            placeholder="Re-enter new password"
            autoComplete="new-password"
            showForgotLink={false}
          />

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting && <span className="forgot-password__spinner" aria-hidden="true" />}
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      {step === "success" && (
        <div className="forgot-password__success">
          <span className="forgot-password__success-icon">
            <CheckIcon />
          </span>
          <p>Your password has been changed successfully. You can now sign in with your new password.</p>
          <Link to="/login" className="btn btn-primary btn-block">
            Back to Login
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

export default ForgotPassword;
