import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useCart } from "../context/CartContext.jsx";
import { createPaymentSession, verifyPayment } from "../utils/payment.js";
import "./Payment.css";
import { formatCurrency } from "../utils/currency.js";

// "initiated" | "processing" | "success" | "failed" | "cancelled"
function Payment() {
  const location = useLocation();
  const { clearCart } = useCart();
  const order = location.state?.order;

  const [status, setStatus] = useState("initiated");
  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [completedAt, setCompletedAt] = useState(null);

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="payment">
          <div className="container payment__empty">
            <EmptyState
              icon="🔒"
              title="No order to pay for"
              description="We couldn't find an order for this payment session. Please start checkout again from your cart."
              actionLabel="Go to Cart"
              actionTo="/cart"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const handlePay = async () => {
    setStatus("processing");
    setErrorMessage(null);
    try {
      const session = await createPaymentSession(order);
      const result = await verifyPayment(session.sessionId);

      if (result.status === "success") {
        setTransactionId(result.transactionId);
        setCompletedAt(new Date());
        setStatus("success");
        // Payment is confirmed, so the cart it was for is now settled.
        clearCart();
      } else {
        setErrorMessage(result.error || "Payment failed. Please try again.");
        setStatus("failed");
      }
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong while processing your payment.");
      setStatus("failed");
    }
  };

  const handleCancel = () => setStatus("cancelled");

  return (
    <>
      <Navbar />
      <main className="payment">
        <div className="container">
          <div className="payment__heading">
            <LockIcon />
            <div>
              <h1>Secure Payment</h1>
              <p>Order ID: {order.orderId}</p>
            </div>
          </div>

          {(status === "initiated" || status === "processing") && (
            <div className="payment__grid">
              <OrderSummary
                items={order.items}
                subtotal={order.subtotal}
                discount={order.discount}
                delivery={order.delivery}
                total={order.total}
                itemCount={itemCount}
              />

              <div className="payment__panel">
                {status === "initiated" && (
                  <>
                    <span className="payment__panel-icon payment__panel-icon--pending">
                      <ClockIcon />
                    </span>
                    <h2>Payment Initiated</h2>
                    <p>
                      {order.paymentMethod === "cod"
                        ? "You chose Cash on Delivery. Confirm below to place your order."
                        : "Review your order, then continue to complete payment securely."}
                    </p>
                    <div className="payment__amount">{formatCurrency(order.total)}</div>
                    <button type="button" className="btn btn-primary btn-block" onClick={handlePay}>
                      {order.paymentMethod === "cod" ? "Confirm Order" : "Pay Now"}
                    </button>
                    <button type="button" className="payment__cancel" onClick={handleCancel}>
                      Cancel Payment
                    </button>
                  </>
                )}

                {status === "processing" && (
                  <>
                    <span className="payment__panel-icon payment__panel-icon--pending">
                      <span className="payment__spinner" aria-hidden="true" />
                    </span>
                    <h2>Processing Payment</h2>
                    <p>Please don't close or refresh this window while we confirm your payment.</p>
                  </>
                )}
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="payment__result">
              <span className="payment__panel-icon payment__panel-icon--success">
                <CheckIcon />
              </span>
              <h2>Payment Successful</h2>
              <p>Your order has been placed and a confirmation has been sent to you.</p>

              <dl className="payment__receipt">
                <div>
                  <dt>Order ID</dt>
                  <dd>{order.orderId}</dd>
                </div>
                <div>
                  <dt>Amount Paid</dt>
                  <dd>{formatCurrency(order.total)}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{completedAt?.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</dd>
                </div>
                {transactionId && (
                  <div>
                    <dt>Transaction ID</dt>
                    <dd>{transactionId}</dd>
                  </div>
                )}
              </dl>

              <div className="payment__result-actions">
                <Link to={`/order/${order.orderId}`} className="btn btn-primary">
                  View Order
                </Link>
                <Link to="/shop" className="btn btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {status === "failed" && (
            <div className="payment__result">
              <span className="payment__panel-icon payment__panel-icon--failed">
                <XIcon />
              </span>
              <h2>Payment Failed</h2>
              <p>{errorMessage}</p>

              <div className="payment__result-actions">
                <button type="button" className="btn btn-primary" onClick={handlePay}>
                  Try Again
                </button>
                <Link to="/checkout" className="btn btn-secondary">
                  Back to Checkout
                </Link>
              </div>
            </div>
          )}

          {status === "cancelled" && (
            <div className="payment__result">
              <span className="payment__panel-icon payment__panel-icon--cancelled">
                <BanIcon />
              </span>
              <h2>Payment Cancelled</h2>
              <p>You cancelled the payment. Your order has not been placed and your cart is still saved.</p>

              <div className="payment__result-actions">
                <Link to="/checkout" className="btn btn-primary">
                  Back to Checkout
                </Link>
                <Link to="/shop" className="btn btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function LockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>
  );
}

function BanIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
    </svg>
  );
}

export default Payment;
