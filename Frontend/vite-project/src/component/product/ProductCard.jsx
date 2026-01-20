import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border p-4 rounded cursor-pointer hover:shadow-md transition">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover mb-2"
        />

        <p className="text-sm text-gray-500">{product.category}</p>

        <h3 className="font-semibold">{product.name}</h3>

        <p className="font-bold">₹{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
