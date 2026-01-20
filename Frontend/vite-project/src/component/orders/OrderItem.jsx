import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div>
        <p>
          <span className="font-semibold">Order ID:</span> {order.id}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {order.date}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {order.status}
        </p>
      </div>
      <Link to={`/orders/${order.id}`}>
        <button className="bg-black text-white px-4 py-2 rounded">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default OrderItem;
