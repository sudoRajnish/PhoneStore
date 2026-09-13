import { Link } from "react-router-dom";
import PhoneMockup from "./PhoneMockup.jsx";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">New arrivals just landed</span>
          <h1>
            Find Your Perfect <span>Smartphone</span>
          </h1>
          <p>
            Browse the latest flagships from every major brand, compare specs
            side by side, and get genuine devices delivered to your door with
            secure payment and fast shipping.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/shop" className="btn btn-secondary">
              Explore Phones
            </Link>
          </div>

          <div className="hero__stats">
            <div>
              <strong>15k+</strong>
              <span>Happy customers</span>
            </div>
            <div>
              <strong>120+</strong>
              <span>Phone models</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>Average rating</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__blob" aria-hidden="true" />
          <PhoneMockup accent="#c8ff4d" className="hero__phone" />
          <div className="hero__floating-card hero__floating-card--top">
            <span className="dot" />
            In stock &amp; ready to ship
          </div>
          <div className="hero__floating-card hero__floating-card--bottom">
            <strong>₹1,34,900</strong>
            iPhone 15 Pro
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
