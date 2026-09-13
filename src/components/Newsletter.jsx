import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Placeholder handler only — no backend/API wired up yet.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="container newsletter__card">
        <div className="section-heading">
          <span className="section-eyebrow">Stay Updated</span>
          <h2>Stay Updated</h2>
          <p>Subscribe to get the latest smartphone deals and offers.</p>
        </div>

        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="newsletter__success" role="status">
            You're subscribed — thanks for joining us!
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
