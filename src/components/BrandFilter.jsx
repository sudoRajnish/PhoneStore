import brands from "../data/brands.js";
import "./FilterGroup.css";
import "./BrandFilter.css";

function BrandFilter({ selectedBrands, onToggleBrand }) {
  return (
    <div className="filter-group">
      <h3>Brand</h3>
      <ul className="brand-filter">
        {brands.map((brand) => (
          <li key={brand.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => onToggleBrand(brand.name)}
              />
              {brand.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrandFilter;
