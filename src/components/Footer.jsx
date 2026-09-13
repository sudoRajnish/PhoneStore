import { Link } from "react-router-dom";
import "./Footer.css";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const supportLinks = [
  { label: "FAQs", to: "/support/faqs" },
  { label: "Shipping Info", to: "/support/shipping" },
  { label: "Returns", to: "/support/returns" },
  { label: "Track Order", to: "/support/track-order" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="navbar__logo-mark">N</span>
            Nova<span className="navbar__logo-accent">Mobile</span>
          </Link>
          <p>
            Your trusted destination for the latest smartphones — genuine
            products, fair prices, and support that's always in your corner.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="navbar__icon-btn">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram" className="navbar__icon-btn">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Twitter" className="navbar__icon-btn">
              <TwitterIcon />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Customer Support</h4>
          <ul>
            {supportLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Nova Mobile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.6.8-2.5 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.4 3.5 3.2 3.9-.6.1-1.2.2-1.8.1.5 1.6 2 2.7 3.7 2.8A8 8 0 0 1 2 18.4a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.5 1.4-1.2 1.9-2z" />
    </svg>
  );
}

export default Footer;
