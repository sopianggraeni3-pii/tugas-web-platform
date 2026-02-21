'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart(); // Mengambil data state global dari Context

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">
          Toko<span className="text-black">Sopi.</span>
        </Link>

        {/* Menu Navigasi */}
        <div className="flex gap-6 items-center font-medium text-gray-600">
          <Link href="/products" className="hover:text-blue-600 transition-colors">
            Katalog (SSG)
          </Link>
          <Link href="/search" className="hover:text-blue-600 transition-colors">
            Cari (CSR)
          </Link>
          
          {/* Ikon Keranjang dari State Management */}
          <div className="ml-4 flex items-center bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <span className="mr-2 text-xl">🛒</span>
            <span className="font-bold text-blue-700">{cartCount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}