import "./SocialLoginButtons.css";

// Presentational only — clicking these doesn't authenticate anything yet.
// Swap onClick handlers for real OAuth flows when the backend is ready.
function SocialLoginButtons() {
  return (
    <div className="social-login">
      <div className="social-login__divider">
        <span>or continue with</span>
      </div>

      <div className="social-login__row">
        <button type="button" className="social-login__btn" aria-label="Continue with Google">
          <GoogleIcon />
          Google
        </button>
        <button type="button" className="social-login__btn" aria-label="Continue with Apple">
          <AppleIcon />
          Apple
        </button>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.2 14.7 2.2 12 2.2 6.9 2.2 2.7 6.4 2.7 12S6.9 21.8 12 21.8c6.9 0 9.6-4.8 9.6-7.3 0-.5 0-.9-.1-1.3H12z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.4 1c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.5-3 1.4-.1-1.1.4-2.2 1-3 .8-.8 2-1.4 3-1.4zM20.6 17.2c-.5 1.2-.8 1.7-1.5 2.8-1 1.5-2.4 3.3-4.1 3.3-1.5 0-1.9-1-4-1-2 0-2.5.9-4 1-1.7.1-3-1.8-4-3.3-2.7-4-3-8.7-1.3-11.2 1.2-1.8 3-2.8 4.7-2.8 1.7 0 2.8 1 4.2 1 1.3 0 2.2-1 4.2-1 1.5 0 3.1.8 4.2 2.2-3.7 2-3.1 7.3 1.6 9z" />
    </svg>
  );
}

export default SocialLoginButtons;
