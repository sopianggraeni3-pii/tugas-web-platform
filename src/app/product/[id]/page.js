'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductDetail({ params }) {
  // 1. Ambil fungsi addToCart dari Context
  const { addToCart } = useCart();
  
  // 2. Unwrapping params (khas Next.js terbaru)
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // 3. State untuk data produk dan loading
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 4. Ambil data produk saat halaman dimuat
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Gagal ambil produk");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="font-serif italic text-[#ffa6b6] animate-pulse">Preparing your glow...</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <p className="font-serif italic text-gray-500 mb-6">Product not found...</p>
      <Link href="/products" className="text-[#ffa6b6] text-[10px] font-bold uppercase tracking-widest border-b border-[#ffa6b6] pb-1">
        Back to Collection
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
      <div className="max-w-[1100px] mx-auto px-10">
        
        {/* Navigasi Kecil */}
        <nav className="mb-10 text-[10px] uppercase tracking-[0.2em] text-gray-400">
          <Link href="/" className="hover:text-[#ffa6b6]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#ffa6b6]">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-bold">{product.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* FOTO PRODUK */}
          <div className="w-full md:w-1/2 bg-[#fff8f9] aspect-square rounded-sm flex justify-center items-center p-16 overflow-hidden">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-700" 
            />
          </div>

          {/* DETAIL PRODUK */}
          <div className="w-full md:w-1/2">
            <p className="text-[#ffa6b6] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              ✨ {product.category.replace('-', ' ')}
            </p>
            
            <h1 className="text-3xl font-serif text-gray-800 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-serif italic font-bold text-[#ffa6b6]">
                ${product.price}
              </span>
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                ⭐ {product.rating} Rating
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-10 opacity-80 font-medium">
              {product.description}
            </p>

            {/* TOMBOL ADD TO BAG - Sekarang Sudah Aktif! */}
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-[#ffa6b6] text-white text-[11px] font-bold uppercase tracking-[0.3em] py-5 hover:bg-gray-800 transition-all duration-500 shadow-lg shadow-pink-100 active:scale-95"
            >
              Add to Bag
            </button>
            
            <p className="text-center text-[9px] text-gray-300 uppercase tracking-widest mt-6">
              Free Shipping on Orders Over $50
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}