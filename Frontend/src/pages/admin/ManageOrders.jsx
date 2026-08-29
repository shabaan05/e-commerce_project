import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/adminApi";
import TableSkeleton from "../../component/skeletons/TableSkeleton";
import { formatPrice } from "../../lib/formatPrice";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("FETCH ORDERS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
    }
  };

  if (loading)
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
        <TableSkeleton rows={5} cols={4} />
      </div>
    );

  return (
    <div>
      <h1>Manage Orders</h1>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                {order.user?.name} <br />
                {order.user?.email}
              </td>
              <td>{formatPrice(order.totalPrice)}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
