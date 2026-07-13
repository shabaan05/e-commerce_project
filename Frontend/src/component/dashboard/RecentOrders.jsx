import { Eye } from "lucide-react";

const statusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-700";

    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    case "shipped":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentOrders = ({ orders = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500">
            Latest customer purchases
          </p>

        </div>

      </div>

      {orders.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No orders found
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3 text-gray-500 font-semibold">
                  Customer
                </th>

                <th className="text-left py-3 text-gray-500 font-semibold">
                  Amount
                </th>

                <th className="text-left py-3 text-gray-500 font-semibold">
                  Status
                </th>

                <th className="text-left py-3 text-gray-500 font-semibold">
                  Date
                </th>

                <th className="text-center py-3 text-gray-500 font-semibold">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="py-4">

                    <div>

                      <p className="font-semibold">
                        {order.user?.name || "Unknown"}
                      </p>

                      <p className="text-sm text-gray-500">
                        #{order._id.slice(-6)}
                      </p>

                    </div>

                  </td>

                  <td className="font-semibold">
                    ₹{order.totalPrice?.toLocaleString()}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="text-center">

                    <button className="text-blue-600 hover:text-blue-800">

                      <Eye size={20} />

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default RecentOrders;