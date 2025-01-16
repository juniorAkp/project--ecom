import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/AuthStore";

const PaymentCallback = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    const handlePaymentCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get("reference");

      if (reference) {
        try {
          // Verify the payment on Paystack using the reference
          const { data } = await axios.get(`/verify-payment`, {
            params: { reference, userId: user._id},
          });

          // Check if payment was successful
          if (data.status === "success") {
            // Payment successful, delete the cart
            await axios.delete(`/api/cart/${user._id}`);

            alert("Payment successful! Your cart has been cleared.");
            window.location.href = "/"; // Redirect to home or wherever you'd like
          } else {
            alert("Payment verification failed. Please try again.");
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("An error occurred. Please try again.");
        }
      } else {
        alert("No payment reference found.");
      }
    };

    handlePaymentCallback();
  }, [user]);

  return <div>Loading...</div>;
};

export default PaymentCallback;
