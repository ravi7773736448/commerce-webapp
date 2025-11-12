import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./Components/Navbar";
import CartSidebar from "./Components/CartSidebar";
import Products from "./Components/Products";
import Home from "./Components/Home";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs";
import Checkout from "./Components/Checkout";
import OrderConfirmation from "./Components/OrderConfirmation";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster for notifications

function App() {
  return (
    <CartProvider>
      <Router>
        {/* ✅ Toast container for global notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: "#4ade80",
                color: "#fff",
                fontWeight: "600",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#f87171",
                color: "#fff",
                fontWeight: "600",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#b91c1c",
              },
            },
          }}
        />

        <Navbar />
        <CartSidebar />

        <main className="min-h-screen pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<div className="p-8 text-center">Cart Page</div>} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>

        {/* ✅ Footer */}
        <footer className="bg-gray-800 text-white py-8 text-center">
          <p>© 2025 FixKart. Made by Ravi Sharma.</p>
        </footer>
      </Router>
    </CartProvider>
  );
}

export default App;
