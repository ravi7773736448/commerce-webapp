import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartSidebar = () => {
  const {
    cartItems,
    addItem,
    decreaseQty,
    removeItem,
    clearCart,
    sidebarOpen,
    toggleSidebar,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const handleCheckout = () => {
    toggleSidebar(); // close sidebar
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity z-40 ${
          sidebarOpen ? "opacity-20 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ease-in-out pt-16 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {cartItems && cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 border-b pb-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-indigo-600 font-bold">
                      ₹{(item.price || 0).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 border rounded text-center min-w-12">
                        {item.qty || 1}
                      </span>
                      <button
                        onClick={() =>
                          addItem({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            image: item.image,
                          })
                        }
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
          )}
        </div>

        {/* Footer */}
        {cartItems && cartItems.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                clearCart();
                toggleSidebar();
              }}
              className="w-full px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
