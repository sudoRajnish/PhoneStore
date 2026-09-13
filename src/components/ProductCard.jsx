import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneMockup from "./PhoneMockup.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/currency.js";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { id, brand, name, spec, price, oldPrice, rating, reviews, color, badge } = product;
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className="product-card">
      {badge && <span className="product-card__badge">{badge}</span>}

      <Link to={`/product/${id}`} className="product-card__image">
        <PhoneMockup accent={color} className="product-card__phone" />
      </Link>

      <div className="product-card__body">
        <span className="product-card__brand">{brand}</span>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__spec">{spec}</p>

        <div className="product-card__rating" aria-label={`Rated ${rating} out of 5`}>
          <StarIcon />
          <span>{rating}</span>
          <span className="product-card__reviews">({reviews})</span>
        </div>

        <div className="product-card__price">
          <span className="product-card__price-current">{formatCurrency(price)}</span>
          {oldPrice && <span className="product-card__price-old">{formatCurrency(oldPrice)}</span>}
        </div>

        <div className="product-card__actions">
          <Link to={`/product/${id}`} className="btn btn-secondary btn-sm btn-block">
            View Details
          </Link>
          <button type="button" className="btn btn-primary btn-sm btn-block" onClick={handleAddToCart}>
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default ProductCard;
