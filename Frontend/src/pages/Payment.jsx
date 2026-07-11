
import PaymentContainer from "../component/payment/PaymentContainer";
import { PaymentProvider } from "../context/PaymentContext";

const Payment = () => {
  return (
    <PaymentProvider>
      <PaymentContainer />
    </PaymentProvider>
  );
};

export default Payment;
