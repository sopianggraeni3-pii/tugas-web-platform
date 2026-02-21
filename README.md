# 🎀 Bare N’ Glow - E-Commerce Beauty Platform

**Bare N’ Glow** adalah aplikasi web e-commerce modern yang dikembangkan untuk memenuhi tugas mata kuliah Pengembangan Web Platform. Aplikasi ini berfokus pada pengalaman belanja produk kecantikan yang estetik, cepat, dan interaktif.

---

## 🚀 Pemenuhan Persyaratan Tugas

Aplikasi ini telah mengimplementasikan seluruh poin persyaratan sebagai berikut:

### 1. Framework Utama
* Menggunakan **Next.js 15+ (App Router)** sebagai framework utama untuk performa dan SEO yang optimal.

### 2. Teknik Rendering (Wajib)
Aplikasi mengimplementasikan tiga teknik rendering utama:
* **Static Site Generation (SSG)**: Diterapkan pada halaman **Katalog (Shop)** untuk melakukan *pre-rendering* data produk dari API sehingga akses halaman sangat instan.
* **Server-Side Rendering (SSR)**: Diterapkan pada **Halaman Detail Produk** untuk memastikan informasi produk yang ditampilkan selalu akurat dan dinamis setiap kali diakses.
* **Client-Side Rendering (CSR)**: Diterapkan pada fitur **Search** dan **Keranjang Belanja** untuk menangani interaksi pengguna secara *real-time* tanpa perlu memuat ulang halaman.

### 3. Sumber Data (API)
* Mengambil data secara dinamis dari **DummyJSON API** (Kategori: *Beauty, Fragrances, Skincare, Accessories, etc.*).
* Data ditampilkan secara responsif menggunakan grid sistem Tailwind CSS.

### 4. State Management (Wajib)
* Menggunakan **React Context API** untuk mengelola state global **Shopping Cart**. Fitur ini memungkinkan pengguna menambah atau menghapus produk dari mana saja dengan sinkronisasi data yang instan.

### 5. Fitur Tambahan & Optimasi
* **Responsive Design**: Tampilan yang menyesuaikan perangkat (Mobile, Tablet, Desktop).
* **UI/UX Enhancement**: Menggunakan tipografi jumbo yang elegan dan palet warna *Soft Pink Gradient*.
* **Loading Indicator**: Menampilkan status loading saat sistem melakukan kurasi produk di halaman pencarian.

---

## 🛠️ Tech Stack
* **Framework**: Next.js
* **Styling**: Tailwind CSS
* **State**: Context API
* **Icons**: Lucide React
* **Deployment**: Vercel (Ready)

---

## 💻 Cara Menjalankan Project Secara Lokal

1. Clone repository:
   ```bash
   git clone [https://github.com/sopianggraeni3-pii/tugas-web-platform.git](https://github.com/sopianggraeni3-pii/tugas-web-platform.git)