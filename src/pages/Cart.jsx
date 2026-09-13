import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CartItem from "../components/CartItem.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useCart } from "../context/CartContext.jsx";
import { computeCartTotals } from "../utils/cartTotals.js";
import "./Cart.css";

function Cart() {
  const { cartItems, itemCount, subtotal, clearCart } = useCart();

  const { originalSubtotal, discount, delivery, total } = useMemo(
    () => computeCartTotals(cartItems, subtotal),
    [cartItems, subtotal]
  );

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <div className="container">
          <div className="cart-page__header">
            <h1>Your Shopping Cart</h1>
            {cartItems.length > 0 && (
              <button type="button" className="cart-page__clear" onClick={clearCart}>
                Clear cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <EmptyState
              icon="🛒"
              title="Your cart is empty"
              description="Looks like you haven't added any smartphones yet. Start browsing to find your next phone."
              actionLabel="Continue Shopping"
              actionTo="/shop"
            />
          ) : (
            <div className="cart-page__body">
              <div className="cart-page__items">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <OrderSummary
                subtotal={originalSubtotal}
                discount={discount}
                delivery={delivery}
                total={total}
                itemCount={itemCount}
              >
                <Link to="/checkout" className="btn btn-primary btn-block">
                  Proceed to Checkout
                </Link>
                <Link to="/shop" className="cart-page__continue">
                  ← Continue Shopping
                </Link>
              </OrderSummary>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
