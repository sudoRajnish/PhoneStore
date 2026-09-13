import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "../data/orders.js";
import "./OrderProgressTracker.css";

function OrderProgressTracker({ status }) {
  const currentIndex = ORDER_STATUSES.indexOf(status);

  return (
    <ol className="order-tracker">
      {ORDER_STATUSES.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li
            key={step}
            className={`order-tracker__step ${isComplete ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}`}
          >
            <span className="order-tracker__dot">{isComplete ? <CheckIcon /> : index + 1}</span>
            <span className="order-tracker__label">{ORDER_STATUS_LABELS[step]}</span>
          </li>
        );
      })}
    </ol>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default OrderProgressTracker;
