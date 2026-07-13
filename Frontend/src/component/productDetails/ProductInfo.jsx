import React from "react";
import { useCart } from "../../context/CartContext"; // adjust path if needed
import { useState } from "react";
import Spinner from "../skeletons/Spinner";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    // Brief visual feedback: show "Adding…" then "Added ✓"
    setTimeout(() => {
      setLoading(false);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    }, 400);
  };

  return (
    <div className="w-full md:w-1/2 space-y-6">

      {/* Product Name */}
      <h1 className="text-3xl font-semibold text-gray-900">
        {product?.name}
      </h1>

      {/* Price */}
      <p className="text-2xl font-semibold text-blue-600">
        ₹{product?.price}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading || added}
        className={`mt-4 px-8 py-3 rounded-lg text-white font-medium shadow-sm transition duration-300 flex items-center gap-2 disabled:opacity-90 ${
          added
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <>
            <Spinner size="sm" color="border-white" />
            Adding…
          </>
        ) : added ? (
          "Added ✓"
        ) : (
          "Add to Cart"
        )}
      </button>

    </div>
  );
};

export default ProductInfo;

