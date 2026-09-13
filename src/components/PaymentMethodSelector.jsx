import "./PaymentMethodSelector.css";

const paymentMethods = [
  {
    id: "online",
    label: "Online Payment",
    description: "Pay securely by card, UPI, or net banking",
    icon: <CardIcon />,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay with cash when your order arrives",
    icon: <CashIcon />,
  },
];

// UI only for now — no real payment gateway is called here. Whichever
// option is selected is just passed along on the order payload; wire the
// actual gateway integration up wherever `paymentMethod` ends up being
// used (see utils/orders.js).
function PaymentMethodSelector({ value, onChange }) {
  return (
    <div className="payment-methods" role="radiogroup" aria-label="Payment method">
      {paymentMethods.map((method) => (
        <label
          key={method.id}
          className={`payment-methods__option ${value === method.id ? "is-selected" : ""}`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={value === method.id}
            onChange={() => onChange(method.id)}
          />
          <span className="payment-methods__icon">{method.icon}</span>
          <span className="payment-methods__text">
            <span className="payment-methods__label">{method.label}</span>
            <span className="payment-methods__description">{method.description}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 6v.01M18 18v.01" />
    </svg>
  );
}

export default PaymentMethodSelector;
