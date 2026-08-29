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
import { formatPrice } from "../../lib/formatPrice";

const OrderItem = ({ order }) => {
return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

    {/* Top Section */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

      <div>
        <p className="text-sm text-gray-500">Order ID</p>
        <p className="font-medium text-gray-900 break-all">
          {order._id}
        </p>
      </div>

      <div className="sm:text-right">
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-lg font-semibold text-blue-600">
          {formatPrice(order.totalAmount)}
        </p>
      </div>

    </div>

    {/* Status Section */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-sm">

      <p>
        <span className="text-gray-500">Payment Status:</span>{" "}
        <span
          className={`font-semibold ${
            order.paymentStatus === "paid"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {order.paymentStatus}
        </span>
      </p>

      <p>
        <span className="text-gray-500">Order Status:</span>{" "}
        <span className="font-semibold text-blue-600 capitalize">
          {order.orderStatus || "pending"}
        </span>
      </p>

    </div>

    {/* Items Section */}
    <div>
      <p className="text-sm font-medium text-gray-900 mb-3">
        Items
      </p>

      <ul className="space-y-4">
        {order.items.map((item, index) => {
          const product = item.product;
          const imageSrc = product?.images?.[0] || "/placeholder.png";
          const name = product?.name || "Product unavailable";

          return (
            <li
              key={item._id || index}
              className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <img
                src={imageSrc}
                alt={name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200 bg-gray-100 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Qty: {item.quantity} · {formatPrice(item.price)} each
                </p>
              </div>

              <p className="text-sm sm:text-base font-semibold text-blue-600 shrink-0">
                {formatPrice(item.quantity * item.price)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>

  </div>
);

};

export default OrderItem;
