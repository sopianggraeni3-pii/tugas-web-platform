'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const trendingTags = ['Lipstick', 'Dress', 'Bag', 'Skincare', 'Watch'];

  useEffect(() => {
    async function loadAllProducts() {
      const categories = [
        'beauty', 'fragrances', 'skin-care', 'womens-bags', 
        'womens-jewellery', 'womens-watches', 'sunglasses',
        'womens-dresses', 'womens-shoes', 'home-decoration', 'mobile-accessories'
      ];
      try {
        const fetches = categories.map(cat => 
          fetch(`https://dummyjson.com/products/category/${cat}`).then(res => res.json())
        );
        const results = await Promise.all(fetches);
        const combined = results.flatMap(data => data.products);
        setAllProducts(combined);
        setFiltered([]); 
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllProducts();
  }, []);

  const handleSearch = (e) => {
    const keyword = typeof e === 'string' ? e.toLowerCase() : e.target.value.toLowerCase();
    setQuery(keyword);
    if (keyword.trim() === '') {
      setFiltered([]);
      return;
    }
    const results = allProducts.filter(p => 
      p.title.toLowerCase().includes(keyword) || p.category.toLowerCase().includes(keyword)
    );
    setFiltered(results);
  };

  return (
    // BG: Putih ke Pink Sangat Muda (No Dark Elements!)
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-[#fff9fa] to-[#fff0f2]">
      <div className="max-w-[1200px] mx-auto px-10">
        
        <div className="max-w-[600px] mx-auto mb-20 text-center">
          <h1 className="text-3xl font-serif italic text-gray-800 mb-8">
            Search our <span className="text-[#ffa6b6]">Collection</span>
          </h1>
          
          <input 
            type="text" 
            placeholder="TYPE TO FIND YOUR GLOW..."
            value={query}
            onChange={handleSearch}
            className="w-full border-b border-pink-200 py-4 text-[11px] text-gray-700 tracking-[0.3em] uppercase text-center focus:outline-none focus:border-[#ffa6b6] transition-all placeholder:text-gray-300 bg-transparent mb-8"
          />

          {!query && (
            <div className="animate-in fade-in duration-700">
              <p className="text-[8px] text-gray-400 uppercase tracking-[0.4em] mb-5">Try Searching For</p>
              <div className="flex flex-wrap justify-center gap-3">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="px-5 py-2 bg-white border border-pink-100 rounded-full text-[9px] text-pink-400 uppercase tracking-widest hover:bg-[#ffa6b6] hover:text-white transition-all shadow-sm shadow-pink-50"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HASIL PENCARIAN */}
        {loading ? (
          <div className="text-center py-20 font-serif italic text-[#ffa6b6]">Curating...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-16">
            {filtered.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col items-center">
                <div className="bg-white aspect-square w-full overflow-hidden relative mb-6 rounded-sm flex justify-center items-center p-8 group-hover:shadow-xl group-hover:shadow-pink-100/50 transition-all duration-500 border border-pink-50">
                  <span className="absolute top-2 left-2 z-10 bg-[#ffa6b6] text-white text-[7px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {product.category.replace('-', ' ')}
                  </span>
                  <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="text-center w-full px-2">
                  <h3 className="text-[9px] font-bold text-gray-600 tracking-[0.1em] uppercase mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-[#ffa6b6] text-xs font-serif italic font-bold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* NOT FOUND */}
        {!loading && query !== '' && filtered.length === 0 && (
          <p className="text-center font-serif italic text-gray-400 py-20">Nothing matches your glow yet.</p>
        )}
      </div>
    </div>
  );
}