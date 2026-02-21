import Link from 'next/link';

// Di Next.js App Router, fetch tanpa konfigurasi tambahan otomatis menjadi SSG
async function getProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=10');
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data produk'); // Error handling dasar
  }
  
  return res.json();
}

export default async function ProductsPage() {
  const data = await getProducts();
  const products = data.products;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Katalog Produk</h1>
      <p className="text-gray-600 mb-6">Halaman ini di-render menggunakan teknik SSG (Static Site Generation).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Menggunakan img tag biasa untuk kesederhanaan, bisa diganti next/image nanti */}
            <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="font-semibold text-lg truncate">{product.title}</h2>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>
            
            {/* Tombol ini nanti akan mengarah ke halaman SSR kita */}
            <Link href={`/product/${product.id}`}>
              <button className="mt-4 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Lihat Detail
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}