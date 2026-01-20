import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import CheckoutActions from "./CheckoutActions";

const CheckoutContainer = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      {/* Left */}
      <ShippingForm />

      {/* Right */}
      <div className="space-y-4">
        <OrderSummary />
        <CheckoutActions />
      </div>
    </div>
  );
};

export default CheckoutContainer;
