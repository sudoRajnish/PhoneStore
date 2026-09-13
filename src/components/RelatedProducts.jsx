import ProductCard from "./ProductCard.jsx";
import "./RelatedProducts.css";

function RelatedProducts({ products, title = "You Might Also Like" }) {
  if (products.length === 0) return null;

  return (
    <section className="related-products">
      <h2>{title}</h2>
      <div className="related-products__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
