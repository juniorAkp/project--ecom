// context/CartContext.js
import { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component that will wrap your app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [], // The array will store the cart items
  });

  // Add item to cart
  const addItemToCart = (product) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const existingItemIndex = prevCart.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { items: updatedItems };
      }

      // Item does not exist, add a new item to the cart
      return { items: [...prevCart.items, { ...product, quantity: 1 }] };
    });
  };

  // Remove item from cart
  const removeItemFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(item => item.id !== productId);
      return { items: updatedItems };
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart({ items: [] });
  };

  // Get the total number of items in the cart
  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
