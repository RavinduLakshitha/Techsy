import "./App.css";
import DrawerAppBar from "./components/navbar/Navbar";
import MultiActionAreaCard from "./components/productList/ProductList";
import CartPage from "./components/cart/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <DrawerAppBar />
      <Router>
        <Routes>
          <Route path="/" element={<MultiActionAreaCard />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
