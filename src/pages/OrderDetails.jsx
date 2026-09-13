import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import OrderProgressTracker from "../components/OrderProgressTracker.jsx";
import OrderItemRow from "../components/OrderItemRow.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getOrderById, ORDER_STATUS_LABELS } from "../data/orders.js";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const order = useMemo(() => getOrderById(id), [id]);

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="order-details">
          <div className="container order-details__empty">
            <EmptyState
              icon="📦"
              title="Order not found"
              description="We couldn't find an order with that ID."
              actionLabel="Back to Orders"
              actionTo="/orders"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { orderId, date, status, paymentStatus, address, items, subtotal, discount, delivery, total } = order;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="order-details">
        <div className="container">
          <Link to="/orders" className="order-details__back">
            ← Back to Orders
          </Link>

          <div className="order-details__heading">
            <div>
              <h1>Order {orderId}</h1>
              <p>Placed on {formattedDate}</p>
            </div>
            <div className="order-details__badges">
              <StatusBadge label={ORDER_STATUS_LABELS[status]} tone="accent" />
              <StatusBadge
                label={`Payment: ${paymentStatus}`}
                tone={paymentStatus === "Paid" ? "success" : "warning"}
              />
            </div>
          </div>

          <section className="order-details__card">
            <OrderProgressTracker status={status} />
          </section>

          <div className="order-details__body">
            <div className="order-details__main">
              <section className="order-details__card">
                <h2>Delivery Address</h2>
                <address className="order-details__address">
                  <strong>{address.fullName}</strong>
                  <span>{address.phone}</span>
                  <span>{address.address}</span>
                  <span>
                    {address.city}, {address.state} {address.pinCode}
                  </span>
                </address>
              </section>

              <section className="order-details__card">
                <h2>Products</h2>
                <div className="order-details__items">
                  {items.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                  ))}
                </div>
              </section>
            </div>

            <div className="order-details__summary-column">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                delivery={delivery}
                total={total}
                itemCount={itemCount}
              />
            </div>
          </div>

          <div className="order-details__actions">
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/orders" className="btn btn-secondary">
              Back to Orders
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default OrderDetails;
