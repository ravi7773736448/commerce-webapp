import React, { createContext, useState } from "react";

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart items state
  const [cartItems, setCartItems] = useState([]);
  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Add an item to cart (or increase qty if exists)
  const addItem = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });

    setSidebarOpen(true); // Open sidebar automatically when adding
  };

  // Decrease quantity or remove if qty goes to zero
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove an item completely from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        decreaseQty,
        removeItem,
        clearCart,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
