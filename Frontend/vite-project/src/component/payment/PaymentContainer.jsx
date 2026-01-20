import PaymentMethods from "./PaymentMethods";
import PaymentActions from "./PaymentActions";
import PaymentStatus from "./PaymentStatus";

const PaymentContainer = () => {
  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Select Payment Method</h1>
      <PaymentMethods />
      <PaymentActions />
      <PaymentStatus />
    </div>
  );
};

export default PaymentContainer;
