import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TextField from "../components/TextField.jsx";
import TextAreaField from "../components/TextAreaField.jsx";
import PaymentMethodSelector from "../components/PaymentMethodSelector.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useCart } from "../context/CartContext.jsx";
import { computeCartTotals } from "../utils/cartTotals.js";
import { createOrder } from "../utils/orders.js";
import { isValidPhone, isValidPinCode } from "../utils/validators.js";
import "./Checkout.css";

const initialAddress = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
};

function validateAddress(data) {
  const errors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required.";

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.address.trim()) errors.address = "Address is required.";
  if (!data.city.trim()) errors.city = "City is required.";
  if (!data.state.trim()) errors.state = "State is required.";

  if (!data.pinCode.trim()) {
    errors.pinCode = "PIN code is required.";
  } else if (!isValidPinCode(data.pinCode)) {
    errors.pinCode = "Enter a valid PIN code.";
  }

  return errors;
}

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, itemCount, subtotal } = useCart();

  const [addressData, setAddressData] = useState(initialAddress);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const { originalSubtotal, discount, delivery, total } = useMemo(
    () => computeCartTotals(cartItems, subtotal),
    [cartItems, subtotal]
  );

  const handleChange = (field) => (event) => {
    setAddressData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions — a second click/Enter while the first
    // request is still in flight is a no-op.
    if (isSubmitting) return;

    const validationErrors = validateAddress(addressData);
    setErrors(validationErrors);
    setFormError(null);

    if (Object.keys(validationErrors).length > 0) {
      setFormError("Please fix the errors below before placing your order.");
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await createOrder({
        address: addressData,
        paymentMethod,
        items: cartItems,
        subtotal: originalSubtotal,
        discount,
        delivery,
        total,
      });
      // Cart is intentionally left as-is here — it only clears once payment
      // actually succeeds, on the page this hands off to.
      navigate("/payment", { state: { order } });
    } catch (err) {
      setFormError(err.message || "Something went wrong placing your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <main className="checkout">
          <div className="container checkout__empty">
            <EmptyState
              icon="🧾"
              title="Your cart is empty"
              description="Add a few smartphones to your cart before checking out."
              actionLabel="Continue Shopping"
              actionTo="/shop"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="checkout">
        <div className="container">
          <h1 className="checkout__heading">Checkout</h1>

          <form className="checkout__body" onSubmit={handleSubmit} noValidate>
            <div className="checkout__form-column">
              <section className="checkout__section">
                <h2>Delivery Address</h2>

                <div className="checkout__grid checkout__grid--2">
                  <TextField
                    id="fullName"
                    label="Full Name"
                    value={addressData.fullName}
                    onChange={handleChange("fullName")}
                    error={errors.fullName}
                    placeholder="Rohan Sharma"
                    autoComplete="name"
                  />
                  <TextField
                    id="phone"
                    label="Phone"
                    type="tel"
                    value={addressData.phone}
                    onChange={handleChange("phone")}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </div>

                <TextAreaField
                  id="address"
                  label="Address"
                  value={addressData.address}
                  onChange={handleChange("address")}
                  error={errors.address}
                  placeholder="Street address, apartment, suite, etc."
                  rows={2}
                />

                <div className="checkout__grid checkout__grid--3">
                  <TextField
                    id="city"
                    label="City"
                    value={addressData.city}
                    onChange={handleChange("city")}
                    error={errors.city}
                    placeholder="Kolkata"
                    autoComplete="address-level2"
                  />
                  <TextField
                    id="state"
                    label="State"
                    value={addressData.state}
                    onChange={handleChange("state")}
                    error={errors.state}
                    placeholder="West Bengal"
                    autoComplete="address-level1"
                  />
                  <TextField
                    id="pinCode"
                    label="PIN Code"
                    value={addressData.pinCode}
                    onChange={handleChange("pinCode")}
                    error={errors.pinCode}
                    placeholder="700091"
                    autoComplete="postal-code"
                  />
                </div>
              </section>

              <section className="checkout__section">
                <h2>Payment Method</h2>
                <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
              </section>
            </div>

            <div className="checkout__summary-column">
              <OrderSummary
                items={cartItems}
                subtotal={originalSubtotal}
                discount={discount}
                delivery={delivery}
                total={total}
                itemCount={itemCount}
              >
                {formError && (
                  <p className="checkout__form-error" role="alert">
                    {formError}
                  </p>
                )}

                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                  {isSubmitting && <span className="checkout__spinner" aria-hidden="true" />}
                  {isSubmitting ? "Placing Order..." : "Proceed to Payment"}
                </button>

                <p className="checkout__disclaimer">
                  You won't be charged yet. Review your order on the next step.
                </p>
              </OrderSummary>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
