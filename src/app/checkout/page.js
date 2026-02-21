'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, isMounted } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePay = (e) => {
    e.preventDefault();
    // Simulasi proses pembayaran
    setIsSuccess(true);
    // Di sini nanti keranjang bisa dikosongkan jika mau
  };

  if (!isMounted) return null;

  // TAMPILAN JIKA BERHASIL BAYAR
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-10">
        <div className="text-6xl mb-6">✨</div>
        <h1 className="text-3xl font-serif italic text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-10 text-center leading-loose">
          Thank you for glowing with us. <br/> Your order is being prepared with love.
        </p>
        <Link href="/" className="bg-[#ffa6b6] text-white text-[10px] font-bold uppercase tracking-[0.3em] px-12 py-5 hover:bg-gray-800 transition-all">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1000px] mx-auto px-10">
        <h1 className="text-3xl font-serif italic text-gray-800 mb-12 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* SISI KIRI: FORM DATA */}
          <form onSubmit={handlePay} className="space-y-5">
            <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.3em] mb-8">Shipping Information</h2>
            <input type="text" placeholder="FULL NAME" required className="w-full border-b border-pink-100 py-3 text-[10px] text-gray-800 tracking-widest focus:outline-none focus:border-[#ffa6b6] transition-colors placeholder:text-gray-400 bg-transparent" />
            <input type="email" placeholder="EMAIL ADDRESS" required className="w-full border-b border-pink-100 py-3 text-[10px] text-gray-800 tracking-widest focus:outline-none focus:border-[#ffa6b6] transition-colors placeholder:text-gray-400 bg-transparent" />
            <input type="text" placeholder="SHIPPING ADDRESS" required className="w-full border-b border-pink-100 py-3 text-[10px] text-gray-800 tracking-widest focus:outline-none focus:border-[#ffa6b6] transition-colors placeholder:text-gray-400 bg-transparent" />
            
            <div className="pt-10">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6">Payment Method</h2>
              <div className="p-4 border border-[#ffa6b6] rounded-sm flex items-center gap-4 bg-[#fff8f9]">
                <div className="w-3 h-3 rounded-full bg-[#ffa6b6]"></div>
                <span className="text-[10px] font-bold text-gray-600 tracking-widest">VIRTUAL ACCOUNT (MOCKUP)</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-800 text-white text-[10px] font-bold uppercase tracking-[0.4em] py-6 mt-10 hover:bg-[#ffa6b6] transition-all">
              Complete Purchase — ${totalPrice.toFixed(2)}
            </button>
          </form>

          {/* SISI KANAN: RINGKASAN PESANAN */}
          <div className="bg-[#fff8f9] p-10 rounded-sm self-start">
            <h2 className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.3em] mb-8 text-center">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-600 uppercase tracking-widest">{item.title}</span>
                  <span className="font-bold text-gray-800">${item.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-pink-100 pt-6 flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Total</span>
              <span className="text-xl font-serif italic font-bold text-[#ffa6b6]">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}