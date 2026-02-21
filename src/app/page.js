'use client'; // Wajib karena kita pakai State untuk slider

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mostWanted, setMostWanted] = useState([]);

  // Daftar banner kamu di folder public
  const banners = [
    '/banner-sopi.png',
    '/banner2.png',  // Tambahkan sesuai jumlah ilustrasi kamu
    '/banner3.png',
    'banner.png',
    '/banner4.png'
  ];

  // Ambil data produk (CSR karena sekarang ini Client Component)
  useEffect(() => {
    fetch('https://dummyjson.com/products/category/beauty?limit=5')
      .then(res => res.json())
      .then(data => setMostWanted(data.products));

    // Timer untuk ganti slide otomatis setiap 5 detik
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="bg-white">
      {/* HERO SLIDER SECTION */}
      <div className="relative w-full overflow-hidden bg-white">
        <div 
          className="flex transition-transform duration-1000 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
              <img 
                src={src} 
                alt={`Banner ${index + 1}`} 
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          ))}
        </div>

        {/* Indikator Titik (Dots) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-[#ffa6b6] w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* MOST WANTED SECTION */}
      <div className="max-w-[1400px] mx-auto px-4 mt-24 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-gray-800 tracking-[0.3em] uppercase mb-16">
          Most Wanted
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
          {mostWanted.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="group cursor-pointer flex flex-col items-center">
              <div className="bg-[#fff8f9] w-full aspect-[4/5] overflow-hidden flex justify-center items-center mb-4 rounded-sm">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              <h3 className="text-[9px] font-bold text-gray-700 tracking-[0.15em] uppercase mb-1 text-center px-1">
                {item.title}
              </h3>
              <p className="text-[#ffa6b6] text-[10px] font-bold">
                ${item.price}
              </p>
            </Link>
            
          ))}
        </div>
      </div>

      {/* CLEAN PHILOSOPHY SECTION */}
        <div className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
            <h3 className="text-xl md:text-2xl font-serif text-gray-800 tracking-[0.2em] mb-2 uppercase">“B+N+G”</h3>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 tracking-[0.1em] mb-16 uppercase italic">Clean Philosophy</h2>

        {/* Philosophy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4">
      
             {/* 1. Bare Essentials */}
                <div className="bg-white p-10 rounded-tr-[80px] rounded-bl-[80px] shadow-sm border border-pink-50 flex flex-col items-center group hover:shadow-md transition-shadow">
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">🐰</div>
                    <h4 className="text-lg font-serif text-gray-800 mb-4 tracking-wider">
                        <span className="text-[#ffa6b6] font-bold">B</span>are Essentials
                    </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed text-center font-medium opacity-80">
                    We are committed to the Clean Beauty philosophy and have created a list of 2000 banned risk & cruelty-free ingredients.
                </p>
            </div>

      {/* 2. Nature Inspired */}
      <div className="bg-white p-10 shadow-sm border border-pink-50 flex flex-col items-center group hover:shadow-md transition-shadow">
        <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">🌿</div>
        <h4 className="text-lg font-serif text-gray-800 mb-4 tracking-wider">
          <span className="text-[#ffa6b6] font-bold">N</span>ature Inspired
        </h4>
        <p className="text-[11px] text-gray-500 leading-relaxed text-center font-medium opacity-80">
          We are dedicated to exploring nature-derived vegan ingredients, which is effective on skin and gentle to the earth.
        </p>
      </div>

      {/* 3. Bliss Moments */}
      <div className="bg-white p-10 rounded-tl-[80px] rounded-br-[80px] shadow-sm border border-pink-50 flex flex-col items-center group hover:shadow-md transition-shadow">
        <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">💖</div>
        <h4 className="text-lg font-serif text-gray-800 mb-4 tracking-wider">
          <span className="text-[#ffa6b6] font-bold">G</span>low Moments
        </h4>
        <p className="text-[11px] text-gray-500 leading-relaxed text-center font-medium opacity-80">
          Beauty is when you feel glow with yourself from the inside out. We offer moments of sensorial experiences.
        </p>
      </div>

    </div>
  </div>
</div>
      
      {/* GRADIENT & BUTTON */}
      <div className="w-full bg-gradient-to-b from-white via-pink-50 to-[#ffa6b6]/10 pt-10 pb-10 mt-10">
        <div className="text-center">
          <Link href="/products">
            <button className="bg-white border border-pink-200 text-gray-800 text-[10px] tracking-[0.3em] uppercase px-14 py-4 hover:bg-[#ffa6b6] hover:text-white transition-all shadow-sm">
              Explore All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}