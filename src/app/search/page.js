'use client'; // Wajib untuk CSR

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengambil data berdasarkan pencarian (CSR)
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await res.json();
      setResults(data.products);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1000px] mx-auto px-10">
        
        {/* Input Area */}
        <div className="text-center mb-20">
            <h1 className="text-3xl font-serif italic text-black mb-8 tracking-tight">
                Find Your <span className="text-[#ffa6b6]">Glow</span>
            </h1>
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                <input 
                    type="text"
                    placeholder="SEARCH FOR PRODUCTS..."
                    className="w-full border-b-2 border-pink-50 py-4 px-2 text-[11px] text-gray-800 tracking-[0.3em] font-bold focus:outline-none focus:border-[#ffa6b6] bg-transparent transition-colors placeholder:text-gray-300"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            <button 
              type="submit"
              className="absolute right-2 top-4 text-[#ffa6b6] text-[10px] font-black tracking-widest uppercase hover:text-gray-800 transition-colors"
            >
              {loading ? 'Searching...' : 'Go'}
            </button>
          </form>
        </div>

        {/* Results Area */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group">
                <div className="bg-[#fff8f9] aspect-square rounded-sm flex justify-center items-center p-8 mb-4 overflow-hidden relative group-hover:bg-pink-50 transition-all">
                  <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-[9px] font-bold text-gray-600 tracking-widest uppercase mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-[#ffa6b6] text-[10px] font-bold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : query && !loading ? (
          <p className="text-center font-serif italic text-gray-400">No products found for "{query}"</p>
        ) : (
          <div className="text-center py-20 opacity-30">
            <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-gray-400">Your search results will appear here</p>
          </div>
        )}

      </div>
    </div>
  );
}