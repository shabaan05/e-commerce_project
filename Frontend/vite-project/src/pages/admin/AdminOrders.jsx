import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/payment/admin/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    await api.put(`/payment/admin/update-status/${orderId}`, {
      status
    });

    fetchOrders(); // refresh
  };

  return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-6xl mx-auto px-6 space-y-10">

      {/* Page Title */}
      <h2 className="text-3xl font-semibold text-gray-900">
        Admin Orders
      </h2>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4"
          >

            {/* Top Row */}
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
                  ₹{order.totalAmount}
                </p>
              </div>

            </div>

            {/* Payment + Status */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center">

              <p className="text-sm">
                <span className="text-gray-500">Payment:</span>{" "}
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

              {/* Status Dropdown */}
              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

            </div>

          </div>
        ))}
      </div>

    </div>
  </div>
);

};

export default AdminOrders;
