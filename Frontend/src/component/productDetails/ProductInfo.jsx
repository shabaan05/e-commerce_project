import React from "react";
import { useCart } from "../../context/CartContext"; // adjust path if needed
import { useState } from "react";
const ProductInfo = ({ product }) => {
  const { addToCart } = useCart(); // get addToCart from context
  const [added, setAdded] = useState(false);

  
  const handleAddToCart = () => {
  addToCart({
    id: product._id,   // ✅ FIXED
    name: product.name,
    price: product.price,
    image: product.image,
  });

   setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
};


   
  

 //..
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
      className={`mt-4 px-8 py-3 rounded-lg text-white font-medium shadow-sm transition duration-300 ${
        added
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>

  </div>
);

};

export default ProductInfo;

