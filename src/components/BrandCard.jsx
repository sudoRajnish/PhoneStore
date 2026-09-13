import { Link } from "react-router-dom";
import "./BrandCard.css";

function BrandCard({ brand }) {
  return (
    <Link to={`/shop?brand=${brand.id}`} className="brand-card">
      <span className="brand-card__initial">{brand.initial}</span>
      <span className="brand-card__name">{brand.name}</span>
    </Link>
  );
}

export default BrandCard;
