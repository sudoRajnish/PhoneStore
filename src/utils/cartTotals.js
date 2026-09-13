// Shared pricing math so Cart and Checkout can't drift apart.
// `subtotal` here is the current (already-discounted) cart subtotal, e.g.
// from useCart().subtotal.

// Free delivery above this subtotal, flat rate below it — placeholder
// business rule, easy to swap for a real shipping calculation later.
export const FREE_DELIVERY_THRESHOLD = 50000;
export const FLAT_DELIVERY_CHARGE = 99;

export function computeCartTotals(cartItems, subtotal) {
  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice ?? item.price) * item.quantity,
    0
  );
  const discount = originalSubtotal - subtotal;
  const delivery = cartItems.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : FLAT_DELIVERY_CHARGE;
  const total = subtotal + delivery;

  return { originalSubtotal, discount, delivery, total };
}
