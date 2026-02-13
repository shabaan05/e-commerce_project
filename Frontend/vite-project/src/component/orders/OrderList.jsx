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
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-4xl mx-auto px-6 space-y-8">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        My Orders
      </h1>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>

    </div>
  </div>
);

};

export default OrderList;
