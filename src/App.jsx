import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Home, Login, Register, Shop, Product Details, Cart, Checkout, Payment,
// Order Details, Update Profile, Update Password, and Forgot Password are
// built so far. Other routes (/about, /contact, /orders) are referenced by

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
