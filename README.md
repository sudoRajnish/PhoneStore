# Nova Mobile — Full Frontend (12 pages)

A responsive, dark-themed React + Vite front end for a mobile phone
e-commerce store, built up page by page for an internship project. All 10
originally requested pages are done, plus Forgot Password: **Home**,
**Login**, **Register**, **Shop**, **Product Details**, **Cart**,
**Checkout**, **Payment**, **Order Details**, **Update Profile**,
**Update Password**, and **Forgot Password**.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## File structure

```
mobile-store-home/
├── index.html                     Page shell, loads Google Fonts (Sora + Inter)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                    React root — wraps <App /> in <BrowserRouter> + <CartProvider>
    ├── App.jsx                     Router setup + <ScrollToTop />; live routes below
    ├── index.css                   Design tokens (colors, fonts) + shared utility classes
    ├── data/
    │   ├── products.js             Product catalog, 14 phones across 8 brands (swap for a real API later)
    │   ├── brands.js                Brand list — Home's "Shop By Brand" + Shop page's brand filter
    │   ├── reviews.js               Dummy review pool, distributed per product (swap for a real API later)
    │   ├── orders.js                Dummy order data + deterministic fallback generator (swap for a real API later)
    │   └── user.js                  Dummy signed-in user record, standing in for GET /profile
    ├── utils/
    │   ├── auth.js                  Placeholder `mockLogin()` / `mockRegister()` — swap for real API calls later
    │   ├── validators.js            Shared email/phone/password/PIN-code validation helpers
    │   ├── cartTotals.js            Shared subtotal/discount/delivery/total math (Cart + Checkout)
    │   ├── orders.js                Placeholder `createOrder()` — swap for a real API call later
    │   ├── payment.js               Placeholder `createPaymentSession()` / `verifyPayment()` — no secrets here, ever
    │   ├── profile.js               Placeholder `fetchProfile()` / `updateProfile()` — GET/PUT /profile stand-ins
    │   ├── password.js              Placeholder `updatePassword()` — swap for a real API call later
    │   └── forgotPassword.js        Placeholder `requestOtp()` / `verifyOtp()` / `resetPassword()` — swap for real API calls later
    ├── context/
    │   └── CartContext.jsx          Cart state via React Context (localStorage-backed for now)
    ├── pages/
    │   ├── Home.jsx                  Assembles every section into the Home Page
    │   ├── Login.jsx / .css          Login page: validation, loading state, placeholder auth
    │   ├── Register.jsx / .css       Registration page: validation, loading state, placeholder auth
    │   ├── Shop.jsx / .css           Shop page: search, filters, sort, product grid
    │   ├── ProductDetails.jsx / .css Product details page at /product/:id
    │   ├── Cart.jsx / .css           Cart page at /cart: items, order summary, empty state
    │   ├── Checkout.jsx / .css       Checkout page at /checkout: address form, payment method, place order
    │   ├── Payment.jsx / .css        Secure Payment page at /payment: initiated/processing/success/failed/cancelled
    │   ├── OrderDetails.jsx / .css   Order details page at /order/:id: status tracker, address, products, summary
    │   ├── UpdateProfile.jsx / .css  Update Profile page at /profile: editable info, avatar, validation
    │   ├── UpdatePassword.jsx / .css Update Password page at /update-password: current/new/confirm, validation
    │   └── ForgotPassword.jsx / .css Forgot Password page at /forgot-password: email → OTP → reset → success
    └── components/
        ├── Navbar.jsx / .css        Responsive navbar with hamburger menu + live cart count badge
        ├── Hero.jsx / .css          Hero banner with heading, CTAs, and phone illustration
        ├── PhoneMockup.jsx          Reusable SVG smartphone illustration (used across the app)
        ├── ScrollToTop.jsx          Scrolls to top on every route change
        ├── BrandSection.jsx / .css  Home's "Shop By Brand" section
        ├── BrandCard.jsx / .css     Single clickable brand badge — links to /shop?brand=<id>
        ├── FeaturedProducts.jsx / .css  Home's "Featured Smartphones" grid
        ├── ProductCard.jsx / .css   Product card — image, spec, price, rating, Add to Cart (wired to CartContext)
        ├── ProductCardSkeleton.jsx / .css  Loading placeholder shown while the Shop grid "loads"
        ├── SearchBar.jsx / .css     Search input with a clear button, used on the Shop page
        ├── BrandFilter.jsx / .css   Checkbox brand filter for the Shop page sidebar
        ├── PriceFilter.jsx / .css   Radio price-range filter for the Shop page sidebar
        ├── FilterGroup.css          Shared heading/spacing styles for BrandFilter + PriceFilter
        ├── SortDropdown.jsx / .css  Sort-by <select> for the Shop page
        ├── EmptyState.jsx / .css    Generic "nothing here" block — no-results and not-found states
        ├── ImageGallery.jsx / .css  Large image + switchable thumbnails on Product Details
        ├── RatingStars.jsx / .css   Reusable 5-star rating display
        ├── QuantitySelector.jsx / .css  Reusable +/- quantity control
        ├── SpecsTable.jsx / .css    Renders a product's specs object as a table
        ├── InfoTabs.jsx / .css      Generic tabs panel (Description/Specs/Delivery/Warranty)
        ├── ReviewCard.jsx / .css    Single customer review card
        ├── RelatedProducts.jsx / .css  "More from this brand" grid at the bottom of Product Details
        ├── CartItem.jsx / .css      Single cart row — image, details, quantity, subtotal, remove
        ├── OrderSummary.jsx / .css  Reusable subtotal/discount/delivery/total breakdown (Cart + Checkout); optional `items` list
        ├── PaymentMethodSelector.jsx / .css  Online Payment / Cash on Delivery selection cards (UI only)
        ├── OrderProgressTracker.jsx / .css  Ordered → Confirmed → Shipped → Out for Delivery → Delivered stepper
        ├── OrderItemRow.jsx / .css  Read-only product row for Order Details (image, qty, price, subtotal)
        ├── StatusBadge.jsx / .css   Small colored status pill (payment status, etc.)
        ├── AvatarUploader.jsx / .css  Profile picture preview + local upload (no real storage backend yet)
        ├── OtpInput.jsx / .css     6-box OTP entry with auto-advance, backspace, and paste support
        ├── SpecialOffer.jsx / .css  Promotional banner ("Upgrade Your Phone Today")
        ├── WhyChooseUs.jsx / .css   4-column feature grid
        ├── FeatureCard.jsx / .css   Single feature card (icon, title, description)
        ├── Newsletter.jsx / .css    Email subscribe form (front-end only, no backend yet)
        ├── Footer.jsx / .css        Site footer with links and social icons
        ├── AuthLayout.jsx / .css    Shared split-screen shell for auth pages (Login + Register)
        ├── TextField.jsx            Reusable labeled text/email/tel input with error message
        ├── TextAreaField.jsx        Reusable labeled textarea (used for Address on Register)
        ├── PasswordInput.jsx / .css Password field with show/hide toggle; "Forgot Password?" link is optional
        └── SocialLoginButtons.jsx / .css  UI-only Google/Apple buttons (no real OAuth wired up)
```

## Forgot Password Page

- **Route:** `/forgot-password` — this is exactly where every "Forgot
  Password?" link across the app (Login, and inside `PasswordInput`
  wherever it's shown) already pointed, so it's now live everywhere it was
  linked from. Reuses the same split-screen `AuthLayout` shell as Login and
  Register, with the heading/subtitle changing per step.
- **Step 1 — Email:** "Forgot Password?" / "Enter your registered email
  address and we'll help you reset your password.", an email field
  (required + format validated), and "Send OTP".
- **Step 2 — OTP:** a 6-box `OtpInput` (auto-advances as you type,
  backspace moves back, and pasting a full code fills all boxes at once),
  "Verify OTP", a countdown ("Resend OTP in 0:45") that turns into a
  clickable "Resend OTP" once it hits zero, and a link back to Step 1 to
  use a different email.
- **Step 3 — Reset Password:** New Password and Confirm Password
  (`PasswordInput`, same show/hide toggle as everywhere else, with the
  "Forgot Password?" link turned off since it'd be circular here), minimum
  8 characters, must match, and "Reset Password".
- **Step 4 — Success:** "Password Reset Successful" with a "Back to Login"
  button.
- **Placeholder API, one function per step:** `requestOtp(email)`,
  `verifyOtp(email, code)`, and `resetPassword({ email, code, newPassword })`
  in `src/utils/forgotPassword.js` — each resolves after a short delay.
  Try `test@fail.com` at Step 1, or the code `000000` at Step 2, to see the
  error states. Swap each function's internals for the real
  `POST /api/auth/...` calls documented in that file's comments later —
  nothing in `ForgotPassword.jsx` needs to change as long as they keep
  resolving on success and rejecting with an `Error` on failure.

## Update Password Page

- **Route:** `/update-password`. Not yet linked from anywhere in the app
  (no account/settings menu exists yet) — visit it directly.
- **Fields:** Current Password, New Password, Confirm New Password — each
  using the same `PasswordInput` component as Login/Register (show/hide
  toggle), with `showForgotLink={false}` since it doesn't belong here.
- **Validation:** all three required; new password must be at least
  8 characters (`PASSWORD_MIN_LENGTH` in `utils/validators.js`); confirm
  must match. Errors clear as each field is edited.
- **UX:** "Update Password" disables and shows a spinner while submitting,
  with a guard against double submission. On success the form clears and
  shows "Your password has been updated successfully."; on failure it
  shows the error message instead and keeps what was typed.
- **Placeholder API:** `updatePassword(payload)` in `src/utils/password.js`
  resolves after a short delay — try `wrongpassword` as the current
  password to see the error state. Swap its internals for a real
  `PUT /profile/password` call later; nothing on the page needs to change
  as long as it still resolves on success and rejects with an `Error` on
  failure.

## Update Profile Page

- **Route:** `/profile`. Not yet linked from the navbar (no account menu
  exists in this app yet) — visit it directly for now.
- **Loads dummy data on mount**, simulating `GET /profile`: a brief
  "Loading your profile..." spinner state, then the form fills in from
  `src/data/user.js` via `fetchProfile()` in `src/utils/profile.js`.
- **Editable fields:** profile picture, Full Name, Email, Phone Number,
  Address, City, State, PIN Code — same validation rules as
  Register/Checkout (required fields, email/phone/PIN format checks).
- **Profile picture:** `AvatarUploader` lets you pick a local image file
  and preview it immediately (via `URL.createObjectURL`, revoked on
  change/removal to avoid leaking memory) or fall back to initials in a
  colored circle. There's no real upload endpoint yet — a real integration
  would upload the file (multipart, or its own `/profile/avatar` endpoint)
  and store the returned URL instead of just previewing locally.
- **Save Changes:** validates first; on success calls `updateProfile()`
  (simulating `PUT /profile`) with a loading spinner on the button, then
  shows a "Profile updated successfully." message. Swap the inside of
  `fetchProfile`/`updateProfile` for real calls later — nothing in the page
  needs to change as long as they keep returning Promises shaped the same
  way.
- **Cancel:** discards any unsaved edits (including a chosen-but-unsaved
  photo) and reverts the form back to the last saved profile.

## Order Details Page

- **Route:** `/order/:id` — reached from Payment's "View Order" link, or
  directly (e.g. `/order/ORD-1001`).
- **Displays:** Order ID, order date, order status, payment status,
  delivery address, products (with image, quantity, price, per-line
  subtotal via `OrderItemRow`), and the same `OrderSummary` totals
  breakdown (subtotal, discount, delivery, total) used on Cart/Checkout/
  Payment.
- **Status tracker:** `OrderProgressTracker` shows Ordered → Confirmed →
  Shipped → Out for Delivery → Delivered as connected steps, with
  completed steps checked off and the current step highlighted.
- **Actions:** "Continue Shopping" (→ `/shop`) and "Back to Orders" (→
  `/orders`, not built yet).
- **Dummy data, but always resolves to something:** `src/data/orders.js`
  has 3 fixed sample orders (`ORD-1001` / `ORD-1002` / `ORD-1003`, each at
  a different status) to try directly. Any other id — including the
  real-looking `ORD-XXXXXXXX` ids generated by `utils/orders.js` after an
  actual checkout — gets a plausible order deterministically generated
  from that id, so "View Order" from the Payment page always shows
  something coherent instead of a dead end. This is a stand-in only:
  since there's no backend, the synthesized order won't necessarily match
  what was actually in that cart. Swap `getOrderById(id)` for a real
  `GET /api/orders/:id` call later and this limitation goes away — nothing
  else in the page needs to change.

## Payment Page

- **Route:** `/payment` — arrived at only via Checkout's `navigate("/payment",
  { state: { order } })`, so the order travels through router state rather
  than a URL param. If someone lands here without that state (e.g. a bare
  refresh, since router state doesn't survive one), it shows a "No order to
  pay for" empty state pointing back to `/cart` instead of crashing — a
  real version would instead put `orderId` in the URL and fetch the order
  status from the backend.
- **Heading:** "Secure Payment" with the Order ID shown underneath.
- **Order Summary:** the same reusable `OrderSummary` component as Cart and
  Checkout, showing products, subtotal, discount, delivery, and total.
- **Five UI states**, driven by one `status` value:
  1. **Payment Initiated** — order total shown, "Pay Now" (or "Confirm
     Order" for Cash on Delivery) and "Cancel Payment".
  2. **Processing Payment** — spinner, no actions, "don't close this
     window" notice.
  3. **Payment Successful** — Order ID, Amount Paid, Date, Transaction ID,
     "View Order" (→ `/order/:id`, not built yet) and "Continue Shopping".
     The cart is cleared here, once payment is actually confirmed.
  4. **Payment Failed** — the error message, "Try Again" (re-attempts
     payment) and "Back to Checkout". Cart is left untouched.
  5. **Payment Cancelled** — shown if "Cancel Payment" is clicked before
     paying; "Back to Checkout" and "Continue Shopping". Cart is left
     untouched.
- **Clean separation for Roger Pay, by design:** `src/utils/payment.js`
  exports `createPaymentSession(order)` and `verifyPayment(sessionId)` as
  placeholders — **no gateway secret keys anywhere in this code**. The
  real flow (documented in comments in that file) is: backend creates a
  payment session with Roger Pay using a server-side secret and hands the
  frontend a session id; Roger Pay redirects back or fires a webhook the
  backend records; the frontend then asks the backend "what happened" via
  `verifyPayment`, never talking to Roger Pay directly. Right now
  `verifyPayment()` just resolves randomly (~75% success) after a short
  delay purely so every UI state above is reachable for a demo — swap its
  body for the real backend call and nothing in `Payment.jsx` changes.

## Checkout Page

- **Route:** `/checkout` — linked from the Cart page's "Proceed to
  Checkout" and Product Details' "Buy Now". Redirects to a "cart is empty"
  state (with a link back to Shop) if there's nothing to check out.
- **Delivery Address:** Full Name, Phone, Address, City, State, PIN Code —
  all required, with phone-format and PIN-format checks
  (`src/utils/validators.js`). Errors clear as each field is edited, and a
  summary error banner appears above the submit button if the form has
  problems.
- **Order Summary:** reuses the same `OrderSummary` component as Cart, now
  passed the cart items so it lists each product/quantity/price alongside
  Subtotal, Discount, Delivery Charge, and Total — all computed with the
  same shared `computeCartTotals()` helper the Cart page uses, so the two
  pages can never show different numbers for the same cart.
- **Payment Method:** "Online Payment" / "Cash on Delivery" selector cards
  (`PaymentMethodSelector.jsx`) — UI only, no gateway wired up. The chosen
  value just rides along on the order payload.
- **Place Order:** the "Proceed to Payment" button lives inside the order
  summary sidebar. It disables and shows a spinner while submitting, and a
  guard at the top of the submit handler (`if (isSubmitting) return`)
  prevents a second submission from a fast double-click as well.
- **Placeholder order creation:** `createOrder(payload)` in
  `src/utils/orders.js` resolves with a generated `orderId` after a short
  delay, then the page navigates to `/payment` (not built yet) with the
  order passed via router state. Swap the inside of `createOrder` for a
  real `POST /api/orders` call later — nothing in `Checkout.jsx` needs to
  change as long as it still resolves with an object containing `orderId`.
- The cart is deliberately **not** cleared here — that should happen once
  payment actually succeeds, on the page this hands off to.

## Cart Page

- **Route:** `/cart` — linked from the navbar cart icon (which shows a live
  item count badge), Product Details' Buy Now, and elsewhere.
- **Per item:** image, name (links to its Product Details page), brand,
  price, a `QuantitySelector` capped at that product's current stock,
  subtotal (price × qty), and a remove button. Rows collapse into a
  two-line mobile layout under ~760px.
- **Order Summary:** Subtotal (based on original list price), Discount (the
  savings from any items on sale), Delivery Charge (free over $500, a flat
  $15 otherwise), and Total — all recalculated live as quantities change.
  "Proceed to Checkout" links to `/checkout` (not built yet).
- **Empty state:** "Your cart is empty" with a "Continue Shopping" button
  back to `/shop`.
- A small "Clear cart" action sits next to the page heading when the cart
  has items.
- All of this runs on the same `CartContext` (`src/context/CartContext.jsx`)
  built earlier — `increaseQuantity`, `decreaseQuantity`, `removeFromCart`,
  and `clearCart` are called directly, and `subtotal`/`itemCount` are
  derived automatically. It's still in-memory + `localStorage`; swap it for
  real `GET/PUT/DELETE /cart` calls later without touching the Cart page.

## Product Details Page

- **Route:** `/product/:id` — `id` matches a `products.js` entry (e.g.
  `/product/p1`). An unknown id shows a friendly "Product not found" state
  with a link back to the Shop instead of crashing.
- **Left side:** `ImageGallery` — a large view plus 3 thumbnails (Front /
  Back / Side). There's no real product photography yet, so all 3 reuse the
  same `PhoneMockup` SVG with different CSS transforms; swap in a real
  `images: []` array later and the click-to-switch logic doesn't need to
  change.
- **Right side:** brand, name, `RatingStars` + review count (jumps to the
  reviews section), current/original price with a computed discount badge,
  color-coded stock status (in stock / only N left / out of stock — Add to
  Cart and Buy Now disable when stock is 0), a `QuantitySelector` capped at
  available stock, Add to Cart, and Buy Now.
- **Add to Cart** calls the real `CartContext` and shows a brief "Added to
  Cart ✓" confirmation. **Buy Now** adds the item then navigates to
  `/checkout` (not built yet).
- **Below the main section:** an `InfoTabs` panel with Description,
  Specifications (Display/Processor/RAM/Storage/Camera/Battery/OS via
  `SpecsTable`), Delivery Information, and Warranty Information.
- **Customer Reviews:** dummy reviews from `data/reviews.js`, shown via
  `ReviewCard`. Each product gets a stable-but-different slice of a shared
  review pool — swap `getReviewsForProduct()` for a real
  `GET /api/products/:id/reviews` call later.
- **Related Products:** other items from the same brand, reusing
  `ProductCard` (and its own Add to Cart / View Details behavior) via the
  `RelatedProducts` component.

## Shop Page

- **Route:** `/shop` — search, brand filter (checkboxes for all 8 brands),
  price filter (radio bands), sort dropdown, live product count, loading
  skeleton on first load, and a "No products found" empty state.
- Brand cards on Home link to `/shop?brand=apple` and pre-select that
  filter.

## Registration & Login Pages

- **`/register`:** Full Name, Email, Phone, Password, Confirm Password,
  Address — all validated client-side, with a placeholder `mockRegister()`
  call and a loading/success/error message area.
- **`/login`:** email + password validation, show/hide password, "Forgot
  Password?" link (page not built yet), and a placeholder `mockLogin()`
  call.

## Notes

- **Cart context is live.** `CartProvider` wraps the whole app in
  `main.jsx`. Cart state is kept in memory and mirrored to `localStorage`
  so it survives a refresh; swap the internals for real `GET/POST /cart`
  calls whenever a backend exists.
- **Single product catalog.** `data/products.js` is the one source of truth
  for Home's featured section, the Shop page, and Product Details — 14
  phones across 8 brands, each with `id`, `brand`, `name`, `spec`, `price`,
  `oldPrice`, `rating`, `reviews`, `color`, `badge`, `featured`, `stock`,
  `description`, and a `specs` object.
- **Routing.** All 12 pages now render for real: `/`, `/login`,
  `/register`, `/shop`, `/product/:id`, `/cart`, `/checkout`, `/payment`,
  `/order/:id`, `/profile`, `/update-password`, and `/forgot-password`.
  `/about`, `/contact`, and `/orders` (an order-list page) are still linked
  to here and there but intentionally not built.
- **No stock images.** Product art is a small reusable inline SVG component
  (`PhoneMockup.jsx`) instead of external image URLs, so the app works
  offline.
- **Design.** Dark, premium tech palette (near-black background, volt-lime
  accent, indigo for the promo banner) with Sora for headings and Inter for
  body text. Fully responsive, with a hamburger menu on mobile.
