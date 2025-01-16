import { create } from "zustand";
import axios from "axios";

// Zustand store for cart management
export const useCartStore = create((set, get) => ({
  // Initial cart state
  cart: [],
  totalQuantity: 0,  // Added state for total cart quantity

  // Fetch cart items from API
  fetchCart: async (userId) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      set({ cart: data.cartItems.items });

      // Calculate the total quantity
      const totalQuantity = data.cartItems.items.reduce((total, item) => total + item.quantity, 0);
      set({ totalQuantity }); // Update the quantity state
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  },

  // Add item to cart
  addItem: async (userId, productId) => {
    try {
      await axios.post(`/api/add-to-cart/${userId}`, { productId });
      const { fetchCart } = get();
      fetchCart(userId); // Refetch the updated cart
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  },

  // Update item quantity in the cart
  updateItemQuantity: async (userId, productId, quantity) => {
    if (quantity < 1) return; // Avoid invalid quantities
    try {
      await axios.put(`/api/cart/${userId}`, { productId, quantity });
      const { fetchCart } = get();
      fetchCart(userId); // Refetch the updated cart
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  },

  // Remove item from cart
  removeItem: async (userId, productId) => {
    try {
      await axios.delete(`/api/delete-cart/${userId}/${productId}`);
      const { fetchCart } = get();
      fetchCart(userId); // Refetch the updated cart
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  },

  // Clear the cart
  clearCart: async (userId) => {
    try {
      await axios.delete(`/api/cart/${userId}`);
      set({ cart: [], totalQuantity: 0 }); // Reset both cart and quantity state
    } catch (error) {
      console.error("Failed to clear the cart:", error);
    }
  },
}));
