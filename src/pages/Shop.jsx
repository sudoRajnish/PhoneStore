import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SearchBar from "../components/SearchBar.jsx";
import BrandFilter from "../components/BrandFilter.jsx";
import PriceFilter, { priceRanges } from "../components/PriceFilter.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";
import EmptyState from "../components/EmptyState.jsx";
import products from "../data/products.js";
import brands from "../data/brands.js";
import "./Shop.css";

// Short artificial delay so the loading state is visible — this is exactly
// where a real `fetch("/api/products")` call would go later; everything
// below it (filtering/sorting) can keep working on whatever it resolves to.
const SIMULATED_LOAD_MS = 500;

function Shop() {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState(() => {
    // Supports links like /shop?brand=apple from the Home page's brand cards.
    const brandId = searchParams.get("brand");
    const matched = brands.find((b) => b.id === brandId);
    return matched ? [matched.name] : [];
  });
  const [priceRangeId, setPriceRangeId] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), SIMULATED_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  const toggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  const hasActiveFilters = searchTerm.trim() !== "" || selectedBrands.length > 0 || priceRangeId !== "all";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setPriceRangeId("all");
    setSortBy("featured");
  };

  const visibleProducts = useMemo(() => {
    const range = priceRanges.find((r) => r.id === priceRangeId) || priceRanges[0];
    const term = searchTerm.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        !term || product.name.toLowerCase().includes(term) || product.brand.toLowerCase().includes(term);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price >= range.min && product.price <= range.max;
      return matchesSearch && matchesBrand && matchesPrice;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // "featured" — keep catalog order, featured items first
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [searchTerm, selectedBrands, priceRangeId, sortBy]);

  return (
    <>
      <Navbar />
      <main className="shop">
        <div className="container shop__hero">
          <h1>Shop Smartphones</h1>
          <p>Compare the latest phones from every major brand and find the right one for you.</p>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="container shop__body">
          <button
            type="button"
            className="shop__filter-toggle"
            onClick={() => setIsFilterPanelOpen((open) => !open)}
            aria-expanded={isFilterPanelOpen}
          >
            <FilterIcon />
            Filters
            {hasActiveFilters && <span className="shop__filter-dot" aria-hidden="true" />}
          </button>

          <aside className={`shop__sidebar ${isFilterPanelOpen ? "is-open" : ""}`}>
            <div className="shop__sidebar-header">
              <h2>Filters</h2>
              {hasActiveFilters && (
                <button type="button" className="shop__clear" onClick={resetFilters}>
                  Clear all
                </button>
              )}
            </div>
            <BrandFilter selectedBrands={selectedBrands} onToggleBrand={toggleBrand} />
            <PriceFilter selectedRangeId={priceRangeId} onSelectRange={setPriceRangeId} />
          </aside>

          <div className="shop__content">
            <div className="shop__toolbar">
              <p className="shop__count">
                {isLoading ? "Loading products..." : `${visibleProducts.length} product${visibleProducts.length === 1 ? "" : "s"} found`}
              </p>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {isLoading ? (
              <div className="shop__grid">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : visibleProducts.length === 0 ? (
              <EmptyState
                icon="📱"
                title="No products found"
                description="Try adjusting your search or filters to find what you're looking for."
                actionLabel="Clear all filters"
                onAction={resetFilters}
              />
            ) : (
              <div className="shop__grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

export default Shop;
