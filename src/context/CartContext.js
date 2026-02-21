'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [notification, setNotification] = useState(null); // State notifikasi

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('barenglow_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('barenglow_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    
    // Munculkan Notifikasi
    setNotification(`${product.title} added to bag! ✨`);
    
    // Hilang otomatis setelah 3 detik
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isMounted }}>
      {children}
      
      {/* TAMPILAN NOTIFIKASI (TOAST) */}
      {notification && (
        <div className="fixed top-24 right-10 z-[100] bg-white border border-pink-100 shadow-xl px-6 py-4 rounded-sm animate-fade-in-down transition-all">
          <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
            <span className="text-[#ffa6b6]">●</span> {notification}
          </p>
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);