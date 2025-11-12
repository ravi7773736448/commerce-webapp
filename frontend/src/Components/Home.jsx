import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

// Product data
const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: "₹4,979",
    image:
      "https://imgs.search.brave.com/ygtWdKmuH15Lzaox-T9M8BV2IeVo8Qy-J-fypMo35Bg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDAv/NTUwLzYwNi9zbWFs/bC9haS1nZW5lcmF0/ZWQtYmxhbmstc2Ny/ZWVuLXNtYXJ0LXdh/dGNoLW1vY2t1cC1m/cmVlLXBob3RvLmpw/Zw",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: "₹10,789",
    image:
      "https://imgs.search.brave.com/ZfoXiVCCjsWrhh1r73cBlJ_4o0FDJMGruHph9jFxWdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NzgwOTk5/NDA5NjctNzNmZTMw/NjgwOTQ5P2l4bGli/PXJiLTQuMS4wJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4Tlh4OGFHVmha/SEJvYjI1bGMzeGxi/bnd3Zkh3d2ZIeDhN/QT09JmZtPWpwZyZx/PTYwJnc9MzAwMA",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "₹3,319",
    image:
      "https://imgs.search.brave.com/Kd6hA6OG0vLG0hfVZuMTXm9QyJJ0qWr1xbdOvDGhkfM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjAv/MDk5LzI5My9zbWFs/bC9hLXNsZWVrLWJs/YWNrLWdhbWluZy1t/b3VzZS13aXRoLWN1/c3RvbWl6YWJsZS1y/Z2ItbGlnaHRzLWRl/c2lnbmVkLWZvci1w/cmVjaXNpb24tYW5k/LXBlcmZvcm1hbmNl/LXBob3RvLmpwZw",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: "₹4,149",
    image:
      "https://imgs.search.brave.com/xJrQUiRKIcm8z4FvxtQmAZgpFP7S23LBWWl0FAUznlU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFsN21CNUxoc0wu/anBn",
  },
];

const Home = () => {
  const { addToCart, addItem } = useContext(CartContext);
  const add = addToCart || addItem;

  const parsePrice = (price) => Number(price.replace(/[^0-9.-]+/g, ""));

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Discover the Latest Tech with FixKart
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            High-quality gadgets at unbeatable prices.
          </p>
          <Link
            to="/products"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
          >
            🛒 Shop Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center p-5"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold text-lg mb-4">
                  {product.price}
                </p>
                <button
                  onClick={() =>
                    add({
                      id: product.id,
                      name: product.name,
                      price: parsePrice(product.price),
                      image: product.image,
                      quantity: 1,
                    })
                  }
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 hover:scale-105 transition-transform duration-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {/* Categories Section */}
<section className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-10 text-gray-800">
      Shop by Category
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
      {[
        { name: "Headphones", icon: "🎧" },
        { name: "Smart Watches", icon: "⌚" },
        { name: "Speakers", icon: "🔊" },
        { name: "Accessories", icon: "🎛️" },
      ].map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:scale-105"
          onClick={() => alert(`Navigate to ${category.name} page`)} // Replace with Link if routing
        >
          <div className="text-5xl mb-4">{category.icon}</div>
          <h3 className="font-semibold text-lg">{category.name}</h3>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-2 text-white">FixKart</h3>
          <p className="text-sm mb-4">
            Quality gadgets. Trusted service. Delivered with care.
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FixKart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
