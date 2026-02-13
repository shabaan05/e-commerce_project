import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="mt-4">Your order has been placed successfully.</p>

      <div className="mt-6">
        <Link to="/orders" className="mr-4 text-blue-600">
          View Orders
        </Link>
        <Link to="/" className="text-blue-600">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
