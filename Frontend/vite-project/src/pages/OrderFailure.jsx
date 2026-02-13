import { Link } from "react-router-dom";

const OrderFailure = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">
        ❌ Payment Failed
      </h1>
      <p className="mt-4">
        Something went wrong with your payment.
      </p>

      <div className="mt-6">
        <Link to="/checkout" className="mr-4 text-blue-600">
          Retry Payment
        </Link>
        <Link to="/cart" className="text-blue-600">
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default OrderFailure;
