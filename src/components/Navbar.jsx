import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./Navbar.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-mark">N</span>
          Nova<span className="navbar__logo-accent">Mobile</span>
        </Link>

        <nav className={`navbar__links ${isMenuOpen ? "is-open" : ""}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions shown inside the dropdown on mobile only */}
          <div className="navbar__mobile-actions">
            <Link to="/login" className="btn btn-primary btn-block" onClick={closeMenu}>
              Login
            </Link>
          </div>
        </nav>

        <div className="navbar__actions">
          <button type="button" className="navbar__icon-btn" aria-label="Search">
            <SearchIcon />
          </button>
          <Link to="/cart" className="navbar__icon-btn" aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}>
            <CartIcon />
            {itemCount > 0 && <span className="navbar__cart-badge">{itemCount}</span>}
          </Link>
          <Link to="/login" className="btn btn-primary btn-sm navbar__login">
            Login
          </Link>

          <button
            type="button"
            className={`navbar__hamburger ${isMenuOpen ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default Navbar;
