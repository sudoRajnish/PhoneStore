import "./ProductCardSkeleton.css";

// Mirrors ProductCard's layout so the loading state doesn't jump around
// once real data (or a real API response) arrives.
function ProductCardSkeleton() {
  return (
    <div className="product-skeleton" aria-hidden="true">
      <div className="product-skeleton__image" />
      <div className="product-skeleton__body">
        <div className="product-skeleton__line product-skeleton__line--sm" />
        <div className="product-skeleton__line product-skeleton__line--md" />
        <div className="product-skeleton__line product-skeleton__line--sm" />
        <div className="product-skeleton__line product-skeleton__line--lg" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
