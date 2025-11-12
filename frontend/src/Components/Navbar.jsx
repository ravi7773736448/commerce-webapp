import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext) || {};
  const navigate = useNavigate();

  // ✅ user state (load from localStorage)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [localCart, setLocalCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [localCart]);

  const cart = Array.isArray(cartItems) ? cartItems : localCart;

  // ✅ Listen for login/logout updates
  useEffect(() => {
    const handleUserChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged")); // notify all tabs/components
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 fixed top-0 w-full z-40 flex items-center">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-tight hover:text-indigo-700 transition"
        >
          FixKart
        </Link>
      </div>

      {/* Center links */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            About
          </Link>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-shrink-0 flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">
              Hello, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
