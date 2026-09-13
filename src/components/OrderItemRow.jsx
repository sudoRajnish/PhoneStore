import { Link } from "react-router-dom";
import PhoneMockup from "./PhoneMockup.jsx";
import "./OrderItemRow.css";
import { formatCurrency } from "../utils/currency.js";

function OrderItemRow({ item }) {
  const { id, name, brand, price, color, quantity } = item;

  return (
    <div className="order-item-row">
      <Link to={`/product/${id}`} className="order-item-row__image">
        <PhoneMockup accent={color} />
      </Link>

      <div className="order-item-row__info">
        <Link to={`/product/${id}`} className="order-item-row__name">
          {name}
        </Link>
        <span className="order-item-row__brand">{brand}</span>
      </div>

      <div className="order-item-row__meta">
        <span className="order-item-row__qty">Qty: {quantity}</span>
        <span className="order-item-row__price">{formatCurrency(price)} each</span>
        <span className="order-item-row__subtotal">{formatCurrency(price * quantity)}</span>
      </div>
    </div>
  );
}

export default OrderItemRow;
