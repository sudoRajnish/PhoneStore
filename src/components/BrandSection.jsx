import brands from "../data/brands.js";
import BrandCard from "./BrandCard.jsx";
import "./BrandSection.css";

function BrandSection() {
  return (
    <section className="brand-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Top brands</span>
          <h2>Shop By Brand</h2>
          <p>Pick a brand to browse their latest lineup of smartphones.</p>
        </div>

        <div className="brand-section__grid">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandSection;
