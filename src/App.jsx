import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";
import DrawerAppBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from "./components/Orders";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";


export default function App() {
  const [cart, setCart] = useState([]); // State to manage the cart

  return (
    <Router>
      <DrawerAppBar />
      <Routes>
        {/* Pass `cart` and `setCart` as props */}
        <Route
          path="/"
          element={<ProductList cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart product={cart} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right"/>
    </Router>
  );
}
