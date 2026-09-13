import { Link } from "react-router-dom";
import "./SpecialOffer.css";

function SpecialOffer() {
  return (
    <section className="offer">
      <div className="container offer__card">
        <div className="offer__text">
          <span className="section-eyebrow">Limited time</span>
          <h2>Upgrade Your Phone Today</h2>
          <p>Get amazing deals on the latest smartphones.</p>
          <Link to="/shop" className="btn btn-primary">
            Shop Deals
          </Link>
        </div>
        <div className="offer__glow" aria-hidden="true" />
      </div>
    </section>
  );
}

export default SpecialOffer;
