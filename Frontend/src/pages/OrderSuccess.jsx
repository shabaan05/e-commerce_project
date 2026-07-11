import { Link } from "react-router-dom";

const OrderSuccess = () => {
return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">

    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 text-center max-w-md w-full space-y-6">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-green-600">
        Payment Successful!
      </h1>

      {/* Message */}
      <p className="text-gray-600">
        Your order has been placed successfully. You can track it from your orders page.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

        <Link
          to="/orders"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm transition duration-300"
        >
          View Orders
        </Link>

        <Link
          to="/"
          className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          Continue Shopping
        </Link>

      </div>

    </div>

  </div>
);

};

export default OrderSuccess;
