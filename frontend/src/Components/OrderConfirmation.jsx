// src/pages/OrderConfirmation.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Get order details from navigation state

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No order found</h2>
        <Link
          to="/products"
          className="text-indigo-600 hover:underline"
        >
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-4">Your order has been placed successfully.</p>
        <p className="text-gray-800 font-semibold mb-6">Order ID: {order.id}</p>

        <ul className="text-left mb-6 divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>{item.title} x {item.qty}</span>
              <span>₹{(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="font-bold text-lg mb-6">Total: ₹{order.total.toFixed(2)}</div>

        {/* Pass a message via state to Products page */}
        <Link
          to="/products"
          state={{ message: "Thank you for shopping!" }}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
