'use client'; // Interaksi tombol (onClick) wajib menggunakan Client Component

import { useCart } from '../context/CartContext';

export default function AddToCartButton() {
  const { addToCart } = useCart(); // Memanggil fungsi dari Context

  return (
    <button 
      onClick={addToCart}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md mt-6"
    >
      Tambah ke Keranjang 🛒
    </button>
  );
}