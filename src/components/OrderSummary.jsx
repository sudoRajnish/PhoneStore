import PhoneMockup from "./PhoneMockup.jsx";
import "./OrderSummary.css";
import { formatCurrency } from "../utils/currency.js";

// Reusable price breakdown block — used on the Cart page and the Checkout
// page. `items` is optional: Cart already lists products in the main
// column, so it omits `items`; Checkout passes the cart snapshot so
// products/quantity/price show up inside the summary itself.
function OrderSummary({ items, subtotal, discount, delivery, total, itemCount, children }) {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      {items && (
        <ul className="order-summary__items">
          {items.map((item) => (
            <li key={item.id}>
              <span className="order-summary__item-thumb">
                <PhoneMockup accent={item.color} />
              </span>
              <span className="order-summary__item-info">
                <span className="order-summary__item-name">{item.name}</span>
                <span className="order-summary__item-meta">
                  {formatCurrency(item.price)} × {item.quantity}
                </span>
              </span>
              <span className="order-summary__item-total">{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="order-summary__rows">
        <div className="order-summary__row">
          <dt>Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>

        {discount > 0 && (
          <div className="order-summary__row order-summary__row--discount">
            <dt>Discount</dt>
            <dd>-{formatCurrency(discount)}</dd>
          </div>
        )}

        <div className="order-summary__row">
          <dt>Delivery Charge</dt>
          <dd>{delivery === 0 ? "Free" : formatCurrency(delivery)}</dd>
        </div>
      </dl>

      <div className="order-summary__total">
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </div>

      {children}
    </div>
  );
}

export default OrderSummary;
