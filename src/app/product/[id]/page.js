import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

// Fungsi untuk mengambil detail satu produk
async function getProductDetail(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Gagal mengambil detail produk');
  }
  
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  // PERBAIKANNYA DI SINI: Kita harus tambahkan 'await' sebelum 'params'
  const { id } = await params; 
  
  const product = await getProductDetail(id);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Kembali ke Katalog
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8 mt-4">
        {/* Bagian Gambar */}
        <div className="md:w-1/2 bg-gray-100 rounded-lg flex justify-center items-center p-4">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="max-h-80 object-contain rounded-md"
          />
        </div>
        
        {/* Bagian Info Produk */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center justify-between mb-8">
            <span className="text-3xl font-extrabold text-blue-600">${product.price}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Stok: {product.stock}
            </span>
          </div>
          
          <AddToCartButton />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong>Info Teknis:</strong> Halaman ini menggunakan Server-Side Rendering (SSR). Data diambil langsung dari server pada setiap request agar informasi harga dan stok selalu akurat.
      </div>
    </div>
  );
}