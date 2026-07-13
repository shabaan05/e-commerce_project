import { AlertTriangle } from "lucide-react";

const LowStockProducts = ({ products = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Low Stock Products
          </h2>

          <p className="text-sm text-gray-500">
            Products that need restocking
          </p>

        </div>

        <AlertTriangle
          className="text-yellow-500"
          size={28}
        />

      </div>

      {products.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-10">

          <AlertTriangle
            size={42}
            className="text-green-500 mb-3"
          />

          <p className="text-gray-500">
            All products are sufficiently stocked.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
            >

              <div>

                <h3 className="font-semibold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Product ID: #{product._id.slice(-6)}
                </p>

              </div>

              <div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                    ${
                      product.countInStock <= 2
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {product.countInStock} Left
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default LowStockProducts;