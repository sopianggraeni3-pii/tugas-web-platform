import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Bare N’ Glow - barenbliss Style',
  description: 'Tugas Web Platform - Sopi Anggraeni',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white flex flex-col min-h-screen text-gray-900 font-sans antialiased">
        <CartProvider>
          {/* Navbar muncul di paling atas */}
          <Navbar />
          
          {/* Main sebagai pembungkus isi halaman agar Footer tetap di bawah */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Footer muncul di paling bawah */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}