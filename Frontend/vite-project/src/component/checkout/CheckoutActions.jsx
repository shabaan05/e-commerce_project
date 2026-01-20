import { Link } from "react-router-dom";

const CheckoutActions = () => {
  return (
    <Link to="/payment">
      <button className="w-full bg-black text-white py-3 rounded">
        Continue to Payment
      </button>
    </Link>
  );
};

export default CheckoutActions;
