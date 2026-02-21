'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-pink-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
        
        {/* Logo di Sebelah Kiri */}
        <Link 
            href="/" 
            className="text-2xl font-serif italic font-medium text-gray-800 tracking-tighter"
        >
            Bare <span className="text-[#ffa6b6] font-sans font-bold not-italic">N’</span> Glow
        </Link>

        {/* Menu dan Cart di Sebelah Kanan */}
        <div className="flex items-center gap-6 md:gap-10">
          <nav className="hidden md:flex gap-8 text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
            <Link href="/" className="hover:text-[#ffa6b6] transition-colors">Home</Link>
            <Link href="/products" className="hover:text-[#ffa6b6] transition-colors">Shop</Link>
            <Link href="/search" className="hover:text-[#ffa6b6] transition-colors">Search</Link>
          </nav>

          {/* Ikon Keranjang */}
        <Link 
            href="/cart" className="relative cursor-pointer">
            🛒 
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ffa6b6] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                </span>
            )}
        </Link>
        </div>
      </div>
    </header>
  );
}