import "./QuantitySelector.css";

function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, max = Infinity, size = "md" }) {
  return (
    <div className={`qty-selector qty-selector--${size}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
