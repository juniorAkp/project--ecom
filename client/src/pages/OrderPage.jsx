import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useCartStore } from "../store/CartStore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PaystackPop from '@paystack/inline-js'; // Import Paystack Pop inline JS
import axios from 'axios'; // Import axios

const OrderPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart, fetchCart } = useCartStore();

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch available delivery locations from the backend
  const fetchDeliveryLocations = async () => {
    try {
      const response = await axios.get("/api/get-locations");
      setLocations(response.data.locations);
    } catch (error) {
      setError("Failed to load delivery locations.");
    }
  };

  // Calculate total order amount
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const handlePlaceOrder = async (deliveryLocation) => {
    // Check if delivery location is selected
    if (!deliveryLocation) {
      setError("Please select a delivery location.");
      return;
    }

    try {
      // Calculate total amount (in kobo, Paystack uses kobo)
      const totalAmount = calculateTotal();
      if (totalAmount === 0) {
        alert("Your cart is empty.");
        return;
      }

      const totalAmountInKobo = Math.round(totalAmount * 100); // Convert to kobo

      const orderDetails = {
        userId: user._id,
        deliveryLocation,
      };

      const response = await axios.post("/api/add-order", orderDetails);
      if (response.data.success) {
        setSuccess("Your order has been placed successfully!");
        // Initialize Paystack payment once the order is created
        payWithPaystack(user.email, totalAmountInKobo, response.data.order._id);
        await updateOrderStatusToPaid(response.data.order._id);
      } else {
        setError(response.data.message || "An error occurred while placing the order.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      setError("An error occurred while placing your order. Please try again.");
    }
  };

  // Initialize Paystack payment
  const payWithPaystack = (email, amount) => {
    const handler = PaystackPop.setup({
      key: import.meta.env.VITE_REACT_APP_PAYSTACK_SECRET, // Use your actual Paystack public key
      email: email,
      amount: amount, // Amount in kobo (N100 = 10000)
      onSuccess(transaction) {
        const message = `Transaction complete! Reference: ${transaction.reference}`;
        setSuccess(message);
        navigate('/')
      },
      oncancel:() => {
        setError("payment cancelled")
      },
      onClose: () => {
        setError("Payment process was closed by the user.");
      }
    });

    handler.openIframe();
  };

  // Update order status to paid
  const updateOrderStatusToPaid = async (orderId) => {
    try {
      const response = await axios.put(`/api/update-orders/${orderId}/pay`);

      if (response.data.success) {
        setSuccess("Order has been paid and placed successfully")
        navigate('/');
      } else {
        setError("Failed to update the order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("An error occurred while updating the order status.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!deliveryLocation) {
      setError("Please select a delivery location.");
      return;
    }

    try {
      const totalAmount = calculateTotal();
      if (totalAmount === 0) {
        alert("Your cart is empty.");
        return;
      }

      await handlePlaceOrder(deliveryLocation);
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
    fetchDeliveryLocations(); // Fetch locations on component mount

    // Load Paystack script dynamically
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user, fetchCart]);

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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Location Select */}
              <div>
                <label htmlFor="deliveryLocation" className="block text-lg font-medium text-gray-700">
                  Delivery Location
                </label>
                <select
                  id="deliveryLocation"
                  name="deliveryLocation"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

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
