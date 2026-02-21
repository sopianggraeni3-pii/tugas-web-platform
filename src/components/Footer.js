'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-10 border-t border-pink-100 bg-[#ffa6b6] text-white">
      {/* Container utama dengan flex-col supaya di layar kecil dia otomatis turun ke bawah */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6">
        
        {/* Grup Teks Copyright & Atribusi */}
        <div className="flex flex-col gap-2">
          <div className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase">
            © {currentYear} BARE N’ GLOW. ALL RIGHTS RESERVED.
          </div>
          
          {/* Teks Atribusi dengan max-width agar otomatis ganti baris jika terlalu panjang */}
          <div className="text-[9px] font-medium tracking-[0.15em] uppercase opacity-80 italic max-w-md mx-auto leading-loose">
           CONCEPT INSPIRED BY BARENBLISS (AI ASSISTED DESIGN)
          </div>
        </div>

        {/* Garis pemisah minimalis */}
        <div className="w-12 h-[1px] bg-white/30"></div>

        {/* Menu tambahan */}
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-90">
          <span className="hover:text-gray-800 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-gray-800 cursor-pointer transition-colors">Terms of Service</span>
        </div>
        
      </div>
    </footer>
  );
}