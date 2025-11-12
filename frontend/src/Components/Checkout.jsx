import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext) || [];
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const placeOrder = () => {
    if (!cartItems || cartItems.length === 0) return;

    // Create order object
    const order = {
      id: "ORD" + Math.floor(Math.random() * 1000000),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
    };

    // Clear the cart
    clearCart();

    // Navigate to confirmation page
    navigate("/order-confirmation", { state: { order } });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
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
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-4 border-b pb-4">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p>Quantity: <span className="font-bold">{item.qty || 1}</span></p>
              <p>Price: ₹{(item.price || 0).toFixed(2)}</p>
              <p>Subtotal: ₹{((item.price || 0) * (item.qty || 1)).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between text-xl font-bold">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <button
        onClick={placeOrder}
        className="mt-6 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
