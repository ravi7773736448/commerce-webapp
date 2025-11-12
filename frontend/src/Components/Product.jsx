import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

// ✅ Product data (you can later move this to a separate file or fetch from API)
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
  {
    id: 5,
    name: "Over-Ear Headphones",
    price: "₹6,250",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1600185367564-f7d76df2c9b0?fit=crop&w=500&q=80",
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: "₹3,799",
    image:
      "https://images.unsplash.com/photo-1580910051075-64fcbf6c6e68?fit=crop&w=500&q=80",
  },
  {
    id: 8,
    name: "Portable Speaker",
    price: "₹2,999",
    image:
      "https://images.unsplash.com/photo-1583482283586-06a8a8a541da?fit=crop&w=500&q=80",
  },
];

const Products = () => {
  const { addToCart } = useContext(CartContext);

  const parsePrice = (price) => Number(price.replace(/[^0-9.-]+/g, ""));

  return (
    <div className="bg-gray-50 min-h-screen font-sans py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our latest gadgets and accessories at unbeatable prices.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-t-xl"
                />
              </Link>
              <div className="p-5 flex flex-col justify-between h-44">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-indigo-600 font-bold text-lg mt-2">
                    {product.price}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: parsePrice(product.price),
                        image: product.image,
                        quantity: 1,
                      })
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-sm text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            to="/"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
