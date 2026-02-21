import Link from 'next/link';

async function getProducts() {
  const categories = ['beauty', 'fragrances', 'skin-care', 'womens-bags', 'womens-jewellery', 'womens-watches', 'sunglasses', 'womens-dresses', 'womens-shoes', 'mobile-accessories', 'home-decoration'];
  try {
    const fetches = categories.map(cat => 
      fetch(`https://dummyjson.com/products/category/${cat}`).then(res => res.json())
    );
    const results = await Promise.all(fetches);
    let allProducts = results.flatMap(data => data.products);
    allProducts.sort(() => Math.random() - 0.5);

    return allProducts;
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER KATALOG */}
      <div className="py-24 bg-[#fff8f9] text-center border-b border-pink-50">
        <h1 className="text-3xl md:text-5xl font-serif italic text-gray-800 tracking-tighter mb-4">
          The <span className="text-[#ffa6b6]">Beauty</span> Edit
        </h1>
        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">
          Professional Care • Ethereal Glow • Signature Scents
        </p>
      </div>

      {/* KONTEN UTAMA: Ramping di tengah (max-w-1200px) */}
      <div className="max-w-[1200px] mx-auto px-10 md:px-16 py-16">
        
        <div className="flex justify-between items-end mb-12">
          <div className="text-left">
            <h2 className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-1 font-bold">Curation</h2>
            <p className="text-lg font-serif italic text-gray-800">Selected Essentials</p>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest italic font-medium">
            Collection / {products.length} Items
          </p>
        </div>

        {/* GRID: 5 Kolom agar pas di kontainer 1200px */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-16">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col items-center">
              
              {/* Box Gambar Mungil & Mulus */}
              <div className="bg-[#fff8f9] aspect-square w-full overflow-hidden relative mb-6 rounded-sm flex justify-center items-center p-8 group-hover:bg-pink-50 transition-all duration-500">
                <span className="absolute top-2 left-2 z-10 bg-white/90 text-[#ffa6b6] text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  ✨ {product.category.replace('-', ' ')}
                </span>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" 
                />
              </div>

              {/* Teks Produk yang Rapih */}
              <div className="text-center w-full">
                <h3 className="text-[9px] font-bold text-gray-600 tracking-[0.2em] uppercase mb-2 line-clamp-1 group-hover:text-[#ffa6b6] transition-colors">
                  {product.title}
                </h3>
                <p className="text-[#ffa6b6] text-xs font-serif italic font-bold">
                  ${product.price}
                </p>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}