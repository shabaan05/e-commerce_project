import { useOrders } from "../../context/OrdersContext";
import OrderList from "./OrderList";

const OrdersContainer = () => {
  const { orders } = useOrders();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersContainer;
