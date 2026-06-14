import React, { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async (userId) => {
    try {
      const response = await api.get(`/cart/user/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (userId, productId, quantity) => {
    try {
      const response = await api.post(`/cart/user/${userId}/add`, {
        productId,
        quantity,
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (userId, productId) => {
    try {
      const response = await api.delete(`/cart/user/${userId}/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async (userId) => {
    try {
      await api.delete(`/cart/user/${userId}/clear`);
      setCart(null);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);