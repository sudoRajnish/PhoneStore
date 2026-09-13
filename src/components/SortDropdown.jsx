import "./SortDropdown.css";

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating-desc", label: "Highest Rated" },
  { id: "name-asc", label: "Name: A to Z" },
];

function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-dropdown">
      <span>Sort by</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label="Sort products">
        {sortOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SortDropdown;
