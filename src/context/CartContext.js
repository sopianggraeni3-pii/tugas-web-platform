'use client';

import { createContext, useContext, useState } from 'react';

// Membuat Context
const CartContext = createContext();

// Membuat Provider untuk membungkus aplikasi
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook kustom agar lebih mudah dipanggil
export const useCart = () => useContext(CartContext);