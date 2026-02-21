import './globals.css';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Toko Sopi - Tugas Web Platform',
  description: 'Aplikasi Next.js dengan SSR, SSG, dan CSR',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen">
        {/* CartProvider membungkus seluruh aplikasi agar State-nya bisa diakses di mana saja */}
        <CartProvider>
          {/* Navbar akan muncul di semua halaman */}
          <Navbar />
          
          {/* children adalah isi dari masing-masing halaman (SSR/SSG/CSR) */}
          <main className="pb-20">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}