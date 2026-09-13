import "./SearchBar.css";

function SearchBar({ value, onChange, placeholder = "Search smartphones..." }) {
  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
      />
      {value && (
        <button type="button" className="search-bar__clear" onClick={() => onChange("")} aria-label="Clear search">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default SearchBar;
