// import { Link } from "react-router-dom";

// const OrderItem = ({ order }) => {
//   return (
//     <div className="border p-4 rounded flex justify-between items-center">
//       <div>
//         <p>
//           <span className="font-semibold">Order ID:</span> {order.id}
//         </p>
//         <p>
//           <span className="font-semibold">Date:</span> {order.date}
//         </p>
//         <p>
//           <span className="font-semibold">Status:</span> {order.status}
//         </p>
//       </div>
//       <Link to={`/orders/${order.id}`}>
//         <button className="bg-black text-white px-4 py-2 rounded">
//           View Details
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default OrderItem;
const OrderItem = ({ order }) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">Order ID:</p>
          <p className="text-sm text-gray-600">{order._id}</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Total:</p>
          <p>₹{order.totalAmount}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <p>
          Payment Status:{" "}
          <span className={`font-semibold ${
            order.paymentStatus === "paid"
              ? "text-green-600"
              : "text-red-600"
          }`}>
            {order.paymentStatus}
          </span>
        </p>

        <p>
          Order Status:{" "}
          <span className="font-semibold text-blue-600">
            {order.orderStatus || "pending"}
          </span>
        </p>
      </div>

      <div className="mt-4">
        <p className="font-semibold mb-2">Items:</p>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {order.items.map((item, index) => (
            <li key={index}>
              {item.quantity} × ₹{item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderItem;
