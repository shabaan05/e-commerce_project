import { Link } from "react-router-dom";
import ProductInfo from "../productDetails/ProductInfo";
import ProductTabs from "../productDetails/ProductTabs";
const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="border p-4 rounded cursor-pointer hover:shadow-md transition">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-40 object-cover mb-2"
        />

        <p className="text-sm text-gray-500">
          {product.category.name || "Category"}
        </p>

        
        <div>
          <ProductTabs />
          <ProductInfo />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
