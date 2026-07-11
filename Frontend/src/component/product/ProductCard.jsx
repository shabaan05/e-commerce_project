import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
const ProductCard = ({ product }) => {
//..
return (
  <Link to={`/product/${product._id}`}>
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 cursor-pointer">

      {/* Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Category */}
      <p className="text-xs text-gray-500 mb-1">
        {product.category?.name || "Category"}
      </p>

      {/* Product Name */}
      <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition mb-2">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-xl font-semibold text-blue-600">
        ${product.price}
      </p>

    </div>
  </Link>
);

};

export default ProductCard;
