import { Star } from "lucide-react";
import { formatPrice } from "../../lib/formatPrice";

const TopProducts = ({ products = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Top Products
          </h2>

          <p className="text-sm text-gray-500">
            Highest rated products
          </p>
        </div>

      </div>

      {products.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No products found
        </div>

      ) : (

        <div className="space-y-4">

          {products.map((product, index) => (

            <div
              key={product._id}
              className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-4">

                {/* Rank */}

                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                {/* Image */}

                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/70"
                  }
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover border"
                />

                {/* Product Info */}

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {formatPrice(product.price)}
                  </p>

                </div>

              </div>

              {/* Rating */}

              <div className="flex items-center gap-1">

                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-semibold">
                  {product.rating || 0}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default TopProducts;