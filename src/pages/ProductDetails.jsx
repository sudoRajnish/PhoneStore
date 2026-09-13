import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ImageGallery from "../components/ImageGallery.jsx";
import RatingStars from "../components/RatingStars.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import SpecsTable from "../components/SpecsTable.jsx";
import InfoTabs from "../components/InfoTabs.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import EmptyState from "../components/EmptyState.jsx";
import products from "../data/products.js";
import { getReviewsForProduct } from "../data/reviews.js";
import { useCart } from "../context/CartContext.jsx";
import "./ProductDetails.css";
import { formatCurrency } from "../utils/currency.js";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const reviews = useMemo(() => (product ? getReviewsForProduct(product.id) : []), [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="product-details">
          <div className="container product-details__not-found">
            <EmptyState
              icon="📱"
              title="Product not found"
              description="This product may have been removed or the link is incorrect."
              actionLabel="Back to Shop"
              actionTo="/shop"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { brand, name, price, oldPrice, rating, reviews: reviewCount, color, stock, description, specs } = product;
  const discountPercent = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  const stockStatus = stock === 0 ? "out" : stock <= 5 ? "low" : "in";
  const stockLabel =
    stockStatus === "out" ? "Out of Stock" : stockStatus === "low" ? `Only ${stock} left in stock!` : "In Stock";

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: <p>{description}</p>,
    },
    {
      id: "specifications",
      label: "Specifications",
      content: <SpecsTable specs={specs} />,
    },
    {
      id: "delivery",
      label: "Delivery Information",
      content: (
        <ul className="product-details__info-list">
          <li>Free standard delivery in 3–5 business days.</li>
          <li>Express delivery available at checkout for 1–2 business day arrival.</li>
          <li>Cash on delivery available in select locations.</li>
          <li>Orders ship from our regional warehouse once payment is confirmed.</li>
        </ul>
      ),
    },
    {
      id: "warranty",
      label: "Warranty Information",
      content: (
        <ul className="product-details__info-list">
          <li>1-year manufacturer warranty covering hardware defects.</li>
          <li>10-day free replacement window for delivery damage or dead-on-arrival units.</li>
          <li>Warranty does not cover accidental damage, liquid damage, or unauthorized repairs.</li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="product-details">
        <div className="container">
          <nav className="product-details__breadcrumb" aria-label="Breadcrumb">
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <Link to={`/shop?brand=${brand.toLowerCase()}`}>{brand}</Link>
            <span>/</span>
            <span aria-current="page">{name}</span>
          </nav>

          <div className="product-details__main">
            <ImageGallery color={color} productName={name} />

            <div className="product-details__info">
              <span className="product-details__brand">{brand}</span>
              <h1>{name}</h1>

              <div className="product-details__rating">
                <RatingStars rating={rating} size={16} />
                <span>{rating}</span>
                <a href="#reviews">({reviewCount} reviews)</a>
              </div>

              <div className="product-details__price">
                <span className="product-details__price-current">{formatCurrency(price)}</span>
                {oldPrice && <span className="product-details__price-old">{formatCurrency(oldPrice)}</span>}
                {discountPercent && <span className="product-details__discount">{discountPercent}% OFF</span>}
              </div>

              <p className={`product-details__stock product-details__stock--${stockStatus}`}>
                <span className="dot" />
                {stockLabel}
              </p>

              <p className="product-details__spec-line">{product.spec}</p>

              <div className="product-details__purchase">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => Math.min(q + 1, stock))}
                  onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                  min={1}
                  max={stock}
                />

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddToCart}
                  disabled={stockStatus === "out"}
                >
                  {addedMessage ? "Added to Cart ✓" : "Add to Cart"}
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleBuyNow}
                  disabled={stockStatus === "out"}
                >
                  Buy Now
                </button>
              </div>

              <ul className="product-details__trust">
                <li>
                  <TruckIcon /> Fast delivery
                </li>
                <li>
                  <ShieldIcon /> Genuine product
                </li>
                <li>
                  <LockIcon /> Secure payment
                </li>
              </ul>
            </div>
          </div>

          <div className="product-details__tabs">
            <InfoTabs tabs={tabs} />
          </div>

          <section id="reviews" className="product-details__reviews">
            <div className="product-details__reviews-header">
              <h2>Customer Reviews</h2>
              <div className="product-details__reviews-summary">
                <RatingStars rating={rating} size={16} />
                <span>
                  {rating} out of 5 · {reviewCount} reviews
                </span>
              </div>
            </div>

            <div className="product-details__reviews-grid">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </section>

          <RelatedProducts products={relatedProducts} title={`More from ${brand}`} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="6" width="15" height="12" rx="2" />
      <path d="M16 10h3l3 3v5h-6" />
      <circle cx="6" cy="20" r="2" />
      <circle cx="18" cy="20" r="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 3 6v6c0 5 3.8 8.5 9 10 5.2-1.5 9-5 9-10V6l-9-4z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export default ProductDetails;
