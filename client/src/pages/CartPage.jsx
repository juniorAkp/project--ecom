import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useCartStore } from "../store/CartStore";
import Header from "../components/Header";

const CartPage = () => {
  const { user } = useAuthStore();
  const { cart, fetchCart, updateItemQuantity, removeItem } = useCartStore();
  const [zipCode, setZipCode] = useState("");

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleZipCodeChange = (e) => setZipCode(e.target.value);

  useEffect(() => {
    fetchCart(user._id);
  }, [user]);

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Shopping Cart</h2>
            {cart.length > 0 ? (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Price: ${item.product.price}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {item.product.richDescription || "No description available."}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() =>
                              updateItemQuantity(user._id, item.product._id, item.quantity - 1)
                            }
                            className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItemQuantity(user._id, item.product._id, parseInt(e.target.value))
                            }
                            className="w-12 text-center border border-gray-300 rounded-lg"
                          />
                          <button
                            onClick={() =>
                              updateItemQuantity(user._id, item.product._id, item.quantity + 1)
                            }
                            className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(user._id, item.product._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-4">Your cart is empty.</p>
            )}
          </div>

          {/* Right Column - Checkout & Delivery Details */}
          <div className="bg-white rounded-lg shadow-xl p-6 sticky top-16 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg font-medium text-gray-700">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-700">
                <span>Tax (10%)</span>
                <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between text-xl font-semibold text-gray-900">
                <span>Total</span>
                <span>${(calculateSubtotal() * 1.1).toFixed(2)}</span>
              </div>
              <button
                className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
