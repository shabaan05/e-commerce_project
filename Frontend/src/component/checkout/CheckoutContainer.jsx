import ShippingAddressSection from "./ShippingAddressSection";
import OrderSummary from "./OrderSummary";

const CheckoutContainer = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-500">
            Review your order and complete payment securely.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <ShippingAddressSection />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit xl:sticky xl:top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
