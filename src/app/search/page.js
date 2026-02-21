'use client'; // WAJIB ADA: Ini menandakan komponen ini adalah Client-Side Rendering (CSR)

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  // State Management (Wajib) menggunakan local state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect untuk mengambil data setiap kali teks pencarian berubah
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();
        setResults(data.products);
      } catch (error) {
        console.error('Gagal mengambil data pencarian:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Memberikan jeda waktu (debounce) agar tidak memanggil API di setiap ketikan huruf
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Kembali ke Katalog
      </Link>

      <h1 className="text-3xl font-bold mb-6">Cari Produk (CSR)</h1>
      
      {/* Input Pencarian */}
      <input
        type="text"
        placeholder="Ketik nama produk (misal: laptop, phone)..."
        className="w-full p-4 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center text-blue-600 font-semibold mb-8">
          ⏳ Sedang mencari produk...
        </div>
      )}

      {/* Hasil Pencarian */}
      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
              <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded-md mb-4" />
              <h2 className="font-semibold text-lg truncate">{product.title}</h2>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>
              <Link href={`/product/${product.id}`}>
                <button className="mt-4 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                  Lihat Detail
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {!isLoading && query !== '' && results.length === 0 && (
        <p className="text-center text-red-500 mt-8">Produk tidak ditemukan.</p>
      )}

      <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong>Info Teknis:</strong> Halaman ini menggunakan Client-Side Rendering (CSR). Data diambil langsung dari browser pengguna menggunakan <code>useEffect</code> setelah halaman dimuat. Sangat cocok untuk interaksi dinamis seperti pencarian.
      </div>
    </div>
  );
}