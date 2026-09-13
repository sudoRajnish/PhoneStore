import { Link } from "react-router-dom";
import PhoneMockup from "./PhoneMockup.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import products from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import "./CartItem.css";
import { formatCurrency } from "../utils/currency.js";

function CartItem({ item }) {
  const { id, brand, name, price, color, quantity } = item;
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Look up the live product to cap quantity at current stock — the cart
  // itself only stores what was added, not stock, so this keeps the limit
  // accurate even if stock changes after the item was added.
  const stock = products.find((p) => p.id === id)?.stock ?? 10;
  const subtotal = price * quantity;

  return (
    <article className="cart-item">
      <Link to={`/product/${id}`} className="cart-item__image">
        <PhoneMockup accent={color} />
      </Link>

      <div className="cart-item__details">
        <Link to={`/product/${id}`} className="cart-item__name">
          {name}
        </Link>
        <span className="cart-item__brand">{brand}</span>
        <span className="cart-item__price cart-item__price--mobile">{formatCurrency(price)}</span>
      </div>

      <span className="cart-item__price">{formatCurrency(price)}</span>

      <QuantitySelector
        quantity={quantity}
        onIncrease={() => increaseQuantity(id)}
        onDecrease={() => decreaseQuantity(id)}
        min={1}
        max={stock}
        size="sm"
      />

      <span className="cart-item__subtotal">{formatCurrency(subtotal)}</span>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => removeFromCart(id)}
        aria-label={`Remove ${name} from cart`}
      >
        <TrashIcon />
      </button>
    </article>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export default CartItem;
