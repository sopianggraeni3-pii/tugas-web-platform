'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, isMounted } = useCart();

  // Hitung Total Harga
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  // Jangan render apapun sebelum mounted untuk menghindari Hydration Error
  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-[900px] mx-auto px-10">
        
        <h1 className="text-3xl font-serif italic text-gray-800 mb-12 text-center">
          Your Shopping <span className="text-[#ffa6b6]">Bag</span>
        </h1>

        {cart.length > 0 ? (
          <div className="space-y-8">
            <div className="border-t border-pink-50">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-6 py-6 border-b border-pink-50">
                  <div className="w-20 h-20 bg-[#fff8f9] rounded-sm flex-shrink-0 p-2">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">
                      {item.title}
                    </h3>

                    <p className="text-[9px] text-gray-400 uppercase tracking-tighter mb-2">{item.category}</p>
                    <p className="text-[#ffa6b6] text-sm font-serif italic font-bold">${item.price}</p>
                    </div>

                    <button 
                        onClick={() => removeFromCart(index)}
                        className="text-gray-300 hover:text-red-400 transition-colors p-2"
                        tittle="Remove Item"
                      >
                        <svg
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-4 h-4"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
   
                        </svg>
                      </button>
                    <div>

                    <p className="text-[#ffa6b6] text-sm font-serif italic font-bold">${item.price}</p>
                  </div>
                </div>
                
                    
              ))}
            </div>

            {/* RINGKASAN BELANJA */}
            <div className="bg-[#fff8f9] p-8 rounded-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Total Estimate</span>
                <span className="text-2xl font-serif italic font-bold text-gray-800">${totalPrice.toFixed(2)}</span>
              </div>
              
              <Link href="/checkout">
              <button className="w-full bg-gray-800 text-white text-[10px] font-bold uppercase tracking-[0.3em] py-5 hover:bg-[#ffa6b6] transition-all duration-500">
                Proceed to Checkout
              </button>
              </Link>
              
              <Link href="/products" className="block text-center mt-6 text-[9px] text-gray-400 uppercase tracking-widest hover:text-[#ffa6b6] transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* TAMPILAN JIKA KOSONG */
          <div className="text-center py-20">
            <p className="font-serif italic text-gray-400 mb-8 text-lg">Your bag is currently empty.</p>
            <Link 
              href="/products" 
              className="inline-block bg-[#ffa6b6] text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 py-4 hover:bg-gray-800 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}