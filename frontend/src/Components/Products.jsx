import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

// Sample product data in INR (rounded)
const sampleProducts = [
  { id: 1, title: "Wireless Headphones", price: 4979, image: "https://imgs.search.brave.com/P34EmXdv-Al0M4ULRzjBd380RRuvCvFUpWG7-39l1AU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Ym93ZXJzd2lsa2lu/cy5jb20vZHcvaW1h/Z2UvdjIvQkdKSF9Q/UkQvb24vZGVtYW5k/d2FyZS5zdGF0aWMv/LS9MaWJyYXJ5LVNp/dGVzLWJvd2Vyc19u/b3J0aGFtZXJpY2Ff/c2hhcmVkL2RlZmF1/bHQvZHdkNDkyNTFj/OC9DYXRlZ29yeS9I/ZWFkcGhvbmVzL0JX/X1B4N1MzX01haW5U/aGluX01vYmlsZS1t/aW4uanBnP3N3PTc2/OA" },
  { id: 2, title: "Smartwatch", price: 10789, image: "https://imgs.search.brave.com/MO2_G97vVvDLtWzDtuiZG1WPeskbk-t_FpF6SMZfn4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNDM3/MDM3L3BleGVscy1w/aG90by00MzcwMzcu/anBlZz9hdXRvPWNv/bXByZXNzJmNzPXRp/bnlzcmdiJmRwcj0x/Jnc9NTAw" },
  { id: 3, title: "Portable Speaker", price: 3319, image: "https://imgs.search.brave.com/0lM52ayIapRhuu738d9g2o8vZGLUPMAtFDztaWrKcR0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdnN0/b3JlLmluL2Nkbi9z/aG9wL3Byb2R1Y3Rz/L0FWU3RvcmUzXzVm/ZTc4ZGI3LTBlYjYt/NDMwYi05NGRkLThl/NjdmMzFmZTJmMy5q/cGc_dj0xNjEzMjk0/MzIzJndpZHRoPTEy/MDA" },
  { id: 4, title: "Bluetooth Earbuds", price: 4149, image: "https://imgs.search.brave.com/ywwto5y_S_FD8bhXeANNpzuCzFrE-r4_ZTJ1bYmoaQY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzE1Zk5yR04rTUwu/anBn" },
  { id: 5, title: "Fitness Tracker", price: 6639, image: "https://imgs.search.brave.com/UCGQLHrP52HLhmtXCLDOOFfrXwEmx8qUOBwEfmmtNXY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGhld2lyZWN1dHRl/ci5jb20vd3AtY29u/dGVudC9tZWRpYS8y/MDIzLzExL2ZpdG5l/c3MtdHJhY2tlci0y/MDQ4cHgtNTM0OC5q/cGc_YXV0bz13ZWJw/JnF1YWxpdHk9NzUm/d2lkdGg9MTAyNA" },
  { id: 6, title: "Laptop Stand", price: 2489, image: "https://imgs.search.brave.com/6ztl3guXGMnlG9CdlDzlKkta-jia1MnPLoz3ADEw5iU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9TRUxMRVIvRGVm/YXVsdC8yMDI1Lzcv/NTMwNTc0OTQyL0xZ/L0ZQL1RaLzIxODUy/NDQ0LzEtNTAweDUw/MC5qcGc" },
  { id: 7, title: "Wireless Mouse", price: 1659, image: "https://imgs.search.brave.com/nHTjGNsxDZ9MJDBWaNAiq9qAu_C1QvOX68LbH9ThPOo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTkv/MjkzLzM1Ni9zbWFs/bC9zbGVlay1ibGFj/ay13aXJlbGVzcy1t/b3VzZS1waG90by5q/cGc" },
  { id: 8, title: "Mechanical Keyboard", price: 7469, image: "https://imgs.search.brave.com/OmSg55TKgKkY8YJ31pup6bwKf80Hx7Lpe0FQvt7qGVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVkcmFnb24uaW4v/Y2RuL3Nob3AvZmls/ZXMvMV8zZWY1YjRi/OC1iZWZmLTRlNWEt/Yjg4NC1iNTA2MWRh/N2ZhZmIucG5nP3Y9/MTczNzAzMDE3MSZ3/aWR0aD0xMDAw" },
  { id: 9, title: "USB-C Hub", price: 2074, image: "https://imgs.search.brave.com/nsPqiEtgvRynQzXmCOiC3pouPmUUVKmMGT76JXzwDHM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y2xvdWRiZi5jb20v/dGh1bWIvZm9ybWF0/L21pbmlfeHNpemUv/dXBmaWxlLzE5OS9w/cm9kdWN0X28vRS1z/dW4tNi1pbi0xLVR5/cGUtYy1IdWItRG9j/a2luZy1VU0ItQy1I/dWItd2l0aC1VSEQt/Zm9yLUxhcHRvcC5q/cGcud2VicA" },
];

// Reusable Product Card Component
const ProductCard = ({ product, add }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col overflow-hidden">
    <div className="relative">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-indigo-600 font-bold text-xl mt-2">₹{product.price}</p>
      </div>
      <button
        className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        onClick={() =>
          add({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  </div>
);

const Products = () => {
  const { addItem } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = sampleProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title + Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <h1 className="text-4xl font-bold text-gray-800 text-center sm:text-left">
            Our Products
          </h1>

          {/* Search Input with Icon */}
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} add={addItem} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-6 text-center text-gray-600">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
