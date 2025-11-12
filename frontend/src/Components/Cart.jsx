import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-indigo-600 font-semibold hover:underline">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>₹{parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
          >
            Clear Cart
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
