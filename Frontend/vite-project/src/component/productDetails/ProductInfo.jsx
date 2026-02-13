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


   
  

  return (
    <div className="w-1/2 space-y-4">
      <h1 className="text-2xl font-bold">{product?.name}</h1>
      <p className="text-xl">₹{product?.price}</p>

    
  <button
        onClick={handleAddToCart}
        className={`mt-4 px-6 py-2 rounded text-white ${
          added ? "bg-green-600" : "bg-blue-600"
        }`}
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductInfo;

