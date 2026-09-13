import "./FilterGroup.css";
import "./PriceFilter.css";

export const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-20000", label: "Under ₹20,000", min: 0, max: 20000 },
  { id: "20000-50000", label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
  { id: "50000-100000", label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { id: "over-100000", label: "Over ₹1,00,000", min: 100000, max: Infinity },
];

function PriceFilter({ selectedRangeId, onSelectRange }) {
  return (
    <div className="filter-group">
      <h3>Price</h3>
      <ul className="price-filter">
        {priceRanges.map((range) => (
          <li key={range.id}>
            <label>
              <input
                type="radio"
                name="price-range"
                checked={selectedRangeId === range.id}
                onChange={() => onSelectRange(range.id)}
              />
              {range.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceFilter;
