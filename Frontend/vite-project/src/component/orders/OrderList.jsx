// import OrderItem from "./OrderItem";

// const OrderList = ({ orders }) => {
//   return (
//     <div className="space-y-4">
//       {orders.map((order) => (
//         <OrderItem key={order.id} order={order} />
//       ))}
//     </div>
//   );
// };

// export default OrderList;
import OrderItem from "./OrderItem";

const OrderList = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
