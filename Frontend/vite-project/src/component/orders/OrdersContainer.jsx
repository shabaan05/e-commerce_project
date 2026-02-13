// import { useOrders } from "../../context/OrdersContext";
// import OrderList from "./OrderList";

// const OrdersContainer = () => {
//   const { orders } = useOrders();

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
//       {orders.length > 0 ? (
//         <OrderList orders={orders} />
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default OrdersContainer;
import { useEffect, useState } from "react";
import api from "../../services/api";
import OrderList from "./OrderList";

const OrderContainer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/payment/my-orders");
        setOrders(res.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-5xl mx-auto px-6">
      <OrderList orders={orders} />
    </div>
  </div>
);

};

export default OrderContainer;
