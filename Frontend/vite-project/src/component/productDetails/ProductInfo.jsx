import React from "react";
import { useCart } from "../../context/CartContext"; // adjust path if needed

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart(); // get addToCart from context

    const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="w-1/2 space-y-4">
      <h1 className="text-2xl font-bold">{product?.name}</h1>
      <p className="text-xl">₹{product?.price}</p>

    

      <button
        className="px-4 py-2 bg-black text-white"
        onClick={handleAddToCart} // added this
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;

