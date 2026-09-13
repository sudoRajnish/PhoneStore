import products from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import "./FeaturedProducts.css";

const featuredProducts = products.filter((product) => product.featured);

function FeaturedProducts() {
  return (
    <section className="featured">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Handpicked for you</span>
          <h2>Featured Smartphones</h2>
          <p>Our most popular devices this month, chosen for value and performance.</p>
        </div>

        <div className="featured__grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
