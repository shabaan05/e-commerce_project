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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="border p-4 mb-4">
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Payment: {order.paymentStatus}</p>

          <select
            value={order.orderStatus}
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
            className="mt-2 border p-1"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
