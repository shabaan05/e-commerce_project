import { useState } from "react";
import OrderSummary from "./OrderSummary";
import SavedAddress from "./SavedAddress";

import AddNewAddress from "./AddNewAddress";
const CheckoutContainer = () => {
  const [showNewAddress, setShowNewAddress] = useState(false);

return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-6xl mx-auto px-6 space-y-10">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        Checkout
      </h1>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Side - Address Section */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <SavedAddress onUseAddress={() => {}} />
          </div>

          {!showNewAddress && (
            <button
              onClick={() => setShowNewAddress(true)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
            >
              + Add new address
            </button>
          )}

          {showNewAddress && (
            <AddNewAddress onClose={() => setShowNewAddress(false)} />
          )}

        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit">
          <OrderSummary />
        </div>

      </div>

    </div>
  </div>
);

};

export default CheckoutContainer;
