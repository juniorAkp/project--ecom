import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useCartStore } from "../store/CartStore";
import axios from "axios";
import Header from "../components/Header";

const OrderPage = () => {
  const { user } = useAuthStore();
  const { cart, fetchCart } = useCartStore();

  const [shippingDetails, setShippingDetails] = useState({
    shippingAddress1: "",
    shippingAddress2: "",
    city: user?.city || "",
    zip: user?.zip || "",
    country: user?.country || "",
    phone: user?.phone || "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  // Paystack Payment Initialization
  const pay = async (email, amount) => {
    try {
      const { data } = await axios.get(`/paystack`, {
        params: { email, amount },
      });
      return data.data.authorization_url;
    } catch (error) {
      console.error("Failed to initialize payment:", error);
      throw new Error("Payment initialization failed. Please try again.");
    }
  };

  const verifyTransaction = async (reference) => {
    try {
      const { data } = await axios.get(`/paystack/verify`, {
        params: { reference },
      });

      if (data.status === "success") {
        setSuccess("Your payment was successful!");
        setError("");
        // Place the order after successful payment
        await handlePlaceOrder();
      } else {
        setError("Payment verification failed.");
      }
    } catch (error) {
      setError("An error occurred during transaction verification. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shippingAddress1, city, zip, country, phone } = shippingDetails;

    if (!shippingAddress1 || !city || !zip || !country || !phone) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsProcessing(true);

    try {
      // Calculate the total price
      const totalAmount = calculateTotal();
      if (totalAmount === 0) {
        alert("Your cart is empty.");
        return;
      }

      // Place the order on the server
      const { data: orderData } = await axios.post("/api/orders", {
        userId: user._id,
        ...shippingDetails,
      });

      if (!orderData.success) {
        throw new Error(orderData.message || "An error occurred while placing the order.");
      }

      // Initialize payment via Paystack
      const amountInSmallestUnit = Math.round(totalAmount * 100); // Convert total amount to kobo
      const paymentUrl = await pay(user.email, amountInSmallestUnit);

      // Redirect to the Paystack payment page
      window.location.href = paymentUrl;
    } catch (error) {
      setError(error.message || "An error occurred. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart(user._id);
    }

    // Get reference from URL when Paystack redirects back
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get("reference");

    if (reference) {
      // Verify the transaction
      verifyTransaction(reference);
    }
  }, [user, fetchCart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Details</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Price: ${item.product.price}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-4">Your cart is empty.</p>
            )}
          </div>

          {/* Right Column - Shipping Form */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Form Fields */}
              {["shippingAddress1", "shippingAddress2", "city", "zip", "country", "phone"].map(
                (field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-lg font-medium text-gray-700"
                    >
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type="text"
                      value={shippingDetails[field]}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required={field !== "shippingAddress2"}
                    />
                  </div>
                )
              )}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
