import { useState } from "react";
import OrderSummary from "./OrderSummary";
import SavedAddress from "./SavedAddress";

import AddNewAddress from "./AddNewAddress";
const CheckoutContainer = () => {
  const [showNewAddress, setShowNewAddress] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <div>
        <SavedAddress onUseAddress={() => {}} />

        {!showNewAddress && (
          <button
            onClick={() => setShowNewAddress(true)}
            className="mb-4 underline"
          >
            + Add new address
          </button>
        )}

        {showNewAddress && (
          <AddNewAddress onClose={() => setShowNewAddress(false)} />
        )}
      </div>

      <OrderSummary />
    </div>
  );
};

export default CheckoutContainer;
