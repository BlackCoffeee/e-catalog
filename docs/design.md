# Design System & UI/UX Specification (DESIGN.md)
## Digital E-Catalog & Brosur Interaktif PMB Universitas Sari Mulia (UNISM)

---

### 1. Design Direction & Antislop Dials

#### 1.1 Identitas Karakter & Tone of Voice
- **Karakter Visual (Modern Academic)**:
  - Antarmuka dirancang merepresentasikan perguruan tinggi terakreditasi yang berwibawa, inovatif, dan ramah terhadap generasi muda serta orang tua calon mahasiswa.
  - Tampilan mengutamakan kebersihan visual (cleanliness), tata letak terstruktur, serta keterbacaan data yang tinggi (high legibility) tanpa ornamen grafis berlebih atau template AI generik.
- **Tone of Voice**:
  - Komunikatif, transparan, solutif, dan membangkitkan optimisme masa depan.
  - Menghindari istilah klise pemasaran AI seperti "revolusioner", "mutakhir", "cerdas tanpa batas", dan menggantinya dengan informasi faktual berbasis data resmi (akreditasi LAM-PTKes/BAN-PT, rincian biaya per-trimester nyata, dan legalitas izin institusi).

#### 1.2 Penetapan Dials (Standar Antislop UI)
Setiap komponen dan layout halaman mematuhi parameter tiga dial visual yang konsisten:
- **ENERGY: 2 (Balanced)**:
  - Tampilan berkarakter kuat melalui kontras warna yang tegas dan tipografi proporsional, namun tetap terasa tenang dan terpercaya layaknya portal edukasi modern.
- **RHYTHM: 2 (Consistent with Deliberate Breaks)**:
  - Ritme tata letak seksi bervariasi secara harmonis: kombinasi hero berwibawa, grid kartu informasi cepat, tabel data interaktif dengan sorting, showcase prodi responsif, hingga widget kalkulator biaya. Menghindari monotonitas layout berulang antar seksi.
- **MOTION: 2 (Subtle Academic Motion via GSAP)**:
  - Animasi dirancang berwibawa (*Subtle & Prestigious*) menggunakan mesin GSAP: indikator progress bar emas di atas saat pindah rute, efek fade-up lembut seksi & kartu via ScrollTrigger, dan counter angka interaktif pada kalkulator biaya. Menghindari scroll parallax berat atau animasi bouncing yang lambat di ponsel.
- **Pernyataan Design Read Acuan**:
  > *"Reading this as: Educational E-Catalog & Admission Portal for prospective students and parents, in a Modern Academic style, dial ENERGY 2 / RHYTHM 2 / MOTION 2."*

#### 1.3 Focal Point & Hirarki Visual
- **Prinsip Satu Titik Fokus per Layar**:
  - Pada Beranda: Hero banner dengan nilai jual utama dan tombol Dual CTA menjadi titik tangkap pandangan pertama.
  - Pada Halaman Rute Khusus: Judul halaman yang lugas langsung mengarahkan pengguna ke komponen kerja utama (katalog filter prodi, tabel biaya, atau panduan langkah pendaftaran).
- **Whitespace Struktural**: Ruang kosong (padding dan gap) dimanfaatkan secara disiplin sebagai pemisah kelompok informasi, bukan sisa ruang kosong tanpa tujuan.

---

### 2. Design Tokens & Palet Warna

#### 2.1 Warna Utama (Brand Identity UNISM)
Palet resmi yang dipilih adalah **Opsi A (Academic Deep Navy & Warm Ochre)** yang merepresentasikan wibawa institusi akademik berakreditasi nasional sekaligus memberikan sentuhan hangat dan optimisme bagi calon mahasiswa baru:
- **Primary Brand (Deep Navy)**:
  - Nilai Heksadesimal: `#0F2942` (HSL: 209°, 63%, 16%)
  - Karakter: Solid, berwibawa, formal, stabil, dan menjadi jangkar identitas universitas.
  - Penggunaan: Header navigasi, hero container, judul utama, kartu promosi, dan tombol aksi standar.
- **Accent Brand (Warm Ochre / Gold)**:
  - Nilai Heksadesimal: `#D97706` (Tailwind `amber-600`, HSL: 37°, 94%, 44%)
  - Karakter: Cemerlang, berprestasi, hangat, dan memberikan titik kontras visual yang terarah.
  - Penggunaan: Tombol pendaftaran utama (*Call to Action* prioritas 1), badge akreditasi, sorotan potongan biaya atau beasiswa, serta penanda status aktif.

#### 2.2 Warna Permukaan & Netral (Light & Dark Mode)
Sistem tema dirancang secara fungsional untuk kedua mode. Mode gelap **tidak sekadar membalik latar belakang**, melainkan mentransformasi token *primary* dan *accent* ke saturasi yang lebih terang (*luminous*) agar tidak tenggelam di layar gelap:

| Token Desain (CSS Variable) | Light Mode (Nilai HEX) | Dark Mode (Nilai HEX) | Peran & Penerapan |
| :--- | :--- | :--- | :--- |
| `--background` | `#F8FAFC` (Slate 50) | `#070C16` (Deep Navy Obsidian) | Latar belakang dasar halaman seluruh rute. |
| `--foreground` | `#0F172A` (Slate 900) | `#F1F5F9` (Slate 100) | Teks isi (*body copy*), label formulir, dan data tabel. |
| `--card` | `#FFFFFF` (Putih Murni) | `#131F33` (Elevated Navy Slate) | Latar belakang kartu prodi, kartu jalur seleksi, & modal dialog. |
| `--card-foreground` | `#0F172A` (Slate 900) | `#F1F5F9` (Slate 100) | Teks judul dan deskripsi di dalam komponen kartu. |
| `--popover` | `#FFFFFF` | `#131F33` | Latar belakang dropdown menu, tooltip, & date-picker. |
| `--popover-foreground` | `#0F172A` | `#F1F5F9` | Teks di dalam popover dan menu dropdown. |
| `--primary` | `#0F2942` (Deep Navy) | `#38BDF8` (Luminous Sky Blue) | Warna identitas utama elemen interaktif dan fokus. |
| `--primary-foreground` | `#FFFFFF` | `#070C16` | Teks di atas tombol primary (kontras maksimal). |
| `--secondary` | `#F1F5F9` (Slate 100) | `#1E293B` (Slate 800) | Latar tombol sekunder, filter chip non-aktif, & badge netral. |
| `--secondary-foreground`| `#0F2942` (Deep Navy) | `#F1F5F9` (Slate 100) | Teks pada tombol sekunder dan filter chip. |
| `--accent` | `#D97706` (Warm Ochre) | `#F59E0B` (Amber Glow) | Tombol CTA utama (Daftar Sekarang) & sorotan prodi unggulan. |
| `--accent-foreground` | `#FFFFFF` | `#070C16` (Deep Void) | Teks di atas warna aksen (keterbacaan instan tanpa blur). |
| `--muted` | `#F1F5F9` (Slate 100) | `#16233B` (Muted Navy) | Latar header tabel TanStack dan seksi selingan. |
| `--muted-foreground` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Teks keterangan bantuan, timestamp, dan subtitle. |
| `--border` | `#E2E8F0` (Slate 200) | `#22324F` (Crisp Navy Border) | Garis batas struktural kartu, pemisah baris tabel, & input. |
| `--input` | `#E2E8F0` (Slate 200) | `#22324F` (Crisp Navy Border) | Garis batas input field dan select dropdown. |
| `--ring` | `#0F2942` (Deep Navy) | `#38BDF8` (Luminous Sky Blue) | Outline fokus aksesibilitas navigasi keyboard (2px solid). |

#### 2.3 Warna Semantik & Status Feedback
Seluruh indikator status menggunakan warna solid terstandarisasi dengan pelabelan teks eksplisit (tidak hanya mengandalkan titik warna):
- **Success (Lulus Seleksi / Kuota Tersedia / Pembayaran Berhasil)**:
  - Light: `#059669` (Emerald 600) pada latar `#ECFDF5` (Emerald 50).
  - Dark: `#10B981` (Emerald 500) pada latar `#062D24` dengan border `#047857`.
- **Warning (Batas Akhir Segera Tiba / Sisa Kuota Terbatas)**:
  - Light: `#D97706` (Amber 600) pada latar `#FFFBEB` (Amber 50).
  - Dark: `#F59E0B` (Amber 500) pada latar `#2E1E05` dengan border `#78350F`.
- **Destructive / Error (Pendaftaran Tutup / Validasi Form Gagal / Ditolak)**:
  - Light: `#DC2626` (Red 600) pada latar `#FEF2F2` (Red 50).
  - Dark: `#F87171` (Red 400) pada latar `#361111` dengan border `#7F1D1D`.
- **Info (Jalur Seleksi Aktif / Pengumuman Terbuka)**:
  - Light: `#0284C7` (Sky 600) pada latar `#F0F9FF` (Sky 50).
  - Dark: `#38BDF8` (Sky 400) pada latar `#082F49` dengan border `#0369A1`.

#### 2.4 Standar Kontras Rasio (WCAG 2.1 AA Compliance)
- **Teks Normal (< 18px)**: Rasio kontras minimal **4.5:1** terhadap warna latar belakang.
  - Light Mode: Teks `#0F172A` di atas `#FFFFFF` = **15.8:1** (Lolos AAA).
  - Light Mode: Teks `#FFFFFF` di atas `#0F2942` (Primary) = **13.5:1** (Lolos AAA).
  - Dark Mode: Teks `#F1F5F9` di atas `#070C16` (Background) = **16.2:1** (Lolos AAA).
  - Dark Mode: Teks `#070C16` di atas `#F59E0B` (Accent CTA) = **11.4:1** (Lolos AAA).
- **Teks Besar & Heading (≥ 18px bold atau ≥ 24px regular)**: Rasio kontras minimal **3:1**.
  - Light Mode: Heading `#0F2942` di atas `#F8FAFC` = **13.2:1** (Lolos AAA).
  - Dark Mode: Heading `#FFFFFF` di atas `#131F33` (Card) = **13.8:1** (Lolos AAA).
- **Komponen Interaktif & Batas Input Form**: Rasio kontras minimal **3:1** terhadap bidang sekelilingnya guna memenuhi kemudahan aksesibilitas bagi calon mahasiswa dengan keterbatasan visual.

---

### 3. Tipografi & Skala Huruf

#### 3.1 Pilihan Typeface (Heading & Body)
Sistem tipografi menggunakan satu keluarga huruf terpadu untuk menjaga performa rendering dan konsistensi visual:
- **Font Utama: Plus Jakarta Sans**
  - Implementasi: Dimuat via paket bawaan `next/font/google` dengan deklarasi variabel CSS `--font-sans`.
  - Bobot yang Digunakan:
    - `400 (Regular)`: Teks paragraf, deskripsi prodi, dan catatan kaki.
    - `500 (Medium)`: Subtitle, navigasi menu, dan metadata label.
    - `600 (SemiBold)`: Sub-heading, nama program studi di kartu, dan label formulir.
    - `700 (Bold)`: Judul halaman, angka nominal biaya, dan tombol aksi utama.
  - **Dukungan Tabular Figures (`tabular-nums`)**:
    - Komponen tabel biaya, kalkulator trimester, dan rincian DPP wajib menerapkan kelas CSS `tabular-nums` (`font-feature-settings: "tnum"`).
    - Memastikan digit angka 0 sampai 9 memiliki lebar monospaced yang seragam sehingga perbandingan nominal rupiah sejajar lurus ke bawah.

#### 3.2 Skala Ukuran & Hierarki Tipografi (Mobile-First)

| Peran Tipografi | Ukuran Mobile (Viewport < 768px) | Ukuran Desktop (Viewport ≥ 768px) | Bobot (Weight) | Line Height | Kelas Tailwind |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 28px (1.75rem) | 40px (2.5rem) | Bold (700) | 1.15 (Tight) | `text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight` |
| **Heading 1 (H1)** | 24px (1.5rem) | 32px (2rem) | Bold (700) | 1.2 (Snug) | `text-xl md:text-3xl font-bold tracking-tight` |
| **Heading 2 (H2)** | 20px (1.25rem) | 24px (1.5rem) | Bold (700) | 1.25 (Snug) | `text-lg md:text-2xl font-bold` |
| **Heading 3 (H3)** | 16px (1rem) | 18px (1.125rem) | SemiBold (600) | 1.35 | `text-base md:text-lg font-semibold` |
| **Body Large (Lead)**| 15px (0.9375rem) | 16px (1rem) | Regular (400) | 1.6 (Relaxed) | `text-[15px] md:text-base leading-relaxed` |
| **Body Regular** | 14px (0.875rem) | 14px (0.875rem) | Regular (400) | 1.5 (Normal) | `text-sm leading-normal` |
| **Small / Caption** | 12px (0.75rem) | 12px (0.75rem) | Medium (500) | 1.4 | `text-xs font-medium` |
| **Angka Biaya (Tnum)**| 14px s.d. 18px | 16px s.d. 24px | Bold (700) | 1.2 | `font-bold tabular-nums tracking-tight` |

#### 3.3 Kaidah Penulisan (Antislop Copywriting & Tata Bahasa)
Untuk menjaga kesan profesional dan terpercaya tanpa aroma teks buatan mesin:
- **Bebas Tanda Pisah Em Dash (`—`)**:
  - Dilarang keras menggunakan tanda sambung em dash (`—`) pada seluruh teks antarmuka publik maupun panel admin.
  - Pemisahan konteks wajib menggunakan tanda kurung `(...)`, tanda titik dua `:`, atau pemisahan kalimat menjadi dua frasa yang padat dan terstruktur.
- **Bebas Frasa Klise Pemasaran AI**:
  - Menghilangkan jargon seperti "membuka gerbang revolusi masa depan", "solusi pembelajaran tanpa batas", dan "ekosistem mutakhir".
  - Menggantinya dengan fakta konkrit: "Akreditasi Institusi Baik Sekali BAN-PT", "15 Program Studi Pilihan", "Skema Biaya Per-Trimester Terbuka".
- **Penulisan Nominal Rupiah Terstandarisasi**:
  - Seluruh harga wajib ditulis lengkap: `Rp 2.200.000` (menggunakan spasi tunggal setelah Rp dan titik sebagai pemisah ribuan).
  - Tidak diperkenankan menulis singkatan yang ambigu bagi orang tua calon mahasiswa seperti `2.2jt` atau `IDR 2.2M`.
- **Aksi Tombol Langsung & Spesifik**:
  - Tombol tidak boleh hanya bertuliskan "Klik Disini" atau "Selengkapnya".
  - Gunakan verba tindakan: "Daftar Jalur Reguler", "Buka Kalkulator Biaya", "Unduh Panduan PDF", "Hubungi Tim Admisi".

---

### 4. Layout, Grid, & Responsivitas Mobile-First

#### 4.1 Breakpoints & Skala Kontainer
Sistem tata letak dirancang mengutamakan ponsel (*mobile-first*), kemudian berekspansi secara proporsional ke perangkat tablet dan layar monitor desktop:
- **Breakpoints Terstandarisasi (Tailwind CSS)**:
  - `Mobile (default)`: < 640px (1 kolom penuh, padding horizontal `px-4`).
  - `sm`: ≥ 640px (Tablet portrait / ponsel besar, padding horizontal `px-6`).
  - `md`: ≥ 768px (Tablet landscape, navigasi desktop mulai aktif).
  - `lg`: ≥ 1024px (Laptop / Desktop standar, multi-kolom grid 3 prodi).
  - `xl`: ≥ 1280px (Desktop lebar, batas maksimal lebar kontainer `max-w-7xl mx-auto`).
- **Whitespace Vertikal Antar-Seksi**:
  - Jarak antar-seksi konten di mobile: `py-10` sampai `py-12` (40px s.d. 48px).
  - Jarak antar-seksi konten di desktop: `py-16` sampai `py-20` (64px s.d. 80px).
  - Menghindari seksi yang bertumpuk terlalu rapat atau terisolasi terlalu jauh.

#### 4.2 Spacing System & Konsistensi Radius Sudut (Corner Radius)
Untuk mencegah inkonsistensi bentuk komponen antar-halaman, radius sudut dikunci pada aturan baku berikut:
- **Tabel & Kartu Utama (`rounded-lg` / 8px)**:
  - Kartu program studi, kartu jalur pendaftaran, kontainer kalkulator biaya, dan pembungkus tabel TanStack.
  - Memberikan kesan modern dan terstruktur tanpa melengkung berlebihan.
- **Elemen Interaktif & Formulir (`rounded-md` / 6px)**:
  - Seluruh tombol (*Button*), kotak input teks (*Input*), menu pilih (*Select*), dan kotak centang (*Checkbox*).
- **Badge Status & Tag Kategori (`rounded` / 4px)**:
  - Label akreditasi prodi ("Unggul", "Baik Sekali"), penanda jenjang ("S1", "D3", "Profesi"), dan tag status periode aktif.
- **Larangan Radius Generik (Kaidah Antislop)**:
  - Dilarang membungkus seluruh tombol dan kartu dengan bentuk kapsul lonjong (`rounded-full`). Kapsul hanya diizinkan untuk avatar foto profil atau tombol ikon melingkar tunggal.

#### 4.3 Navigasi Mobile (Pola Hybrid: Header Sheet + Sticky Bottom Dual CTA)
Sesuai hasil evaluasi kenyamanan pengguna ponsel:
- **Sticky Top Bar (Header Minimal)**:
  - Menempel di bagian atas layar (`sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border`).
  - Berisi logo ringkas UNISM PMB, sakelar mode terang/gelap (Light/Dark toggle), dan tombol hamburger.
  - Menekan tombol hamburger membuka *Slide-out Sheet* dari sisi kanan yang memuat 15 rute katalog publik yang dikelompokkan rapi (Program Studi, Biaya Kuliah, Jalur Seleksi, Beasiswa, & Fasilitas).
- **Sticky Bottom Dual CTA Bar (Mobile Viewport < 768px)**:
  - Komponen bar menempel permanen di bagian bawah layar ponsel (`fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border p-3 md:hidden`).
  - Menghadirkan dua tombol aksi utama tepat di area jangkauan jempol pengunjung:
    1. **Tombol "Daftar PMB"**: Aksen penuh Warm Ochre (`bg-accent text-accent-foreground font-bold`), langsung menuju formulir pendaftaran atau panduan alur.
    2. **Tombol "Chat WA Admisi"**: Border sekunder solid dengan ikon WhatsApp resmi untuk konsultasi instan.
  - Kontainer konten utama (`<main>`) secara otomatis diberi ruang bawah tambahan (`pb-20 md:pb-0`) agar tidak ada informasi teks atau tabel yang tertutup oleh bar sticky bawah.

---

### 5. Spesifikasi Komponen Utama (Public Catalog & Admin Panel)

#### 5.1 Hero Section & Search Bar Cepat
- **Hero Banner Beranda**:
  - Warna Latar: Solid Deep Navy (`bg-[#0F2942]` di Light Mode / `bg-[#131F33]` dengan border struktural di Dark Mode).
  - Komposisi:
    - *Eyebrow Tag*: Akreditasi Institusi "Baik Sekali" oleh BAN-PT (warna teks Amber/Gold).
    - *Headline*: "Kuliah Berkualitas, Masa Depan Lebih Pasti" (font-bold 40px di desktop, 28px di mobile).
    - *Sub-headline*: Informasi ringkas mengenai skema perkuliahan, fleksibilitas kelas reguler & RPL, serta transparansi biaya per-trimester.
    - *Dual CTA*: Tombol utama "Daftar PMB" (`bg-accent text-accent-foreground`) berdampingan dengan tombol sekunder "Konsultasi WhatsApp".
- **Bilah Pencarian Cepat (Quick Search Bar)**:
  - Input teks dengan ikon kaca pembesar dan shortcut keyboard visual (`Ctrl + K` / `Cmd + K`).
  - *Instant Filter*: Mengetik nama prodi atau fakultas langsung memfilter daftar katalog prodi tanpa reload halaman.

#### 5.2 Kartu Pintas (Quick Hub) & Kartu Program Studi
- **Kartu Pintas Navigasi Cepat (6 Rute Utama)**:
  - Grid 2 kolom di mobile, 3 kolom di tablet, 6 kolom di desktop.
  - Berisi: Jalur Seleksi, Rincian Biaya, Program RPL/Karyawan, Info Beasiswa, Fasilitas Kampus, & Alur Pendaftaran.
  - State Interaksi: Elevasi border saat hover (`hover:border-primary transition-colors`).
- **Kartu Program Studi (Study Program Card)**:
  - Grid 1 kolom di mobile, 2 kolom di tablet, 3 kolom di desktop.
  - Struktur Kartu:
    1. *Thumbnail*: Foto representatif fasilitas prodi format `.webp` rasio 16:9 (`next/image` lazy loading).
    2. *Badges*: Badge Jenjang ("S1", "D3", "Profesi") dan Badge Akreditasi Resmi ("Unggul", "Baik Sekali").
    3. *Fakultas & Nama Prodi*: Heading H3 tebal dengan warna teks kontras tinggi.
    4. *Highlight Biaya*: Blok khusus di bagian bawah kartu menampilkan: "Biaya Trimester (Smt 1-4): Rp X.XXX.000 / trimester".
    5. *Tombol Aksi*: "Rincian Prodi & Biaya" menuju rute detail `/program-studi/[slug]`.

#### 5.3 Widget Kalkulator Biaya Trimester Interaktif
- **Tujuan**: Membantu calon mahasiswa dan orang tua menghitung simulasi beban biaya per-trimester maupun cicilan bulanan secara transparan tanpa biaya tersembunyi.
- **Elemen Antarmuka**:
  - *Input Dropdown Prodi*: Memilih program studi yang diminati dari daftar master aktif.
  - *Pilihan Kategori Kelas*: Tab toggle antara "Kelas Reguler" dan "Kelas Karyawan / RPL".
  - *Pilihan Jalur Pendaftaran*: Dropdown jalur seleksi (menghitung otomatis potongan DPP jika jalur memberikan diskon).
- **Hasil Kalkulasi (Keluaran)**:
  - Rincian biaya Trimester Fase 1 (Semester 1 s.d. 4).
  - Rincian biaya Trimester Fase 2 (Semester 5 s.d. 8).
  - Biaya registrasi awal / DPP yang telah dikurangi diskon jalur.
  - Estimasi cicilan per-bulan (opsi pembayaran bertahap).
  - Tombol aksi cepat: "Unduh Rincian Simulasi" atau "Lanjut Daftar Jalur Ini".

#### 5.4 Komponen Data Table (TanStack Table di Admin & Public)
- **Penerapan**:
  - Halaman Publik: Tabel Biaya Seluruh Prodi (`/biaya-pendidikan`) dan Tabel Status Akreditasi (`/akreditasi`).
  - Panel Admin: Tabel Manajemen Periode (`/admin/periods`), Tabel Manajemen Biaya (`/admin/tuitions`), Tabel Master Prodi (`/admin/programs`), dan Jalur Seleksi (`/admin/tracks`).
- **Standar Antarmuka Tabel**:
  - *Responsive Scroll Wrapper*: Pembungkus tabel dengan `overflow-x-auto` dan penanda bayangan halus saat tabel digeser pada layar ponsel.
  - *Header Kolom*: Mendukung klik untuk pengurutan data (*Sorting* ASC / DESC) dengan ikon panah arah yang jelas.
  - *Filter & Search Terintegrasi*: Bilah pencarian global di pojok kiri atas tabel dan dropdown filter status di pojok kanan atas.
  - *Pagination Bar*: Menampilkan informasi rentang baris data aktif ("Menampilkan 1-10 dari 45 data"), tombol nomor halaman, serta dropdown penentu jumlah baris per halaman (10, 25, 50 baris).

#### 5.5 Formulir & Visual Invalid Feedback (React Hook Form + Zod)
Sesuai aturan ketat arsitektur formulir:
- **Label Eksplisit**: Setiap kotak input memiliki `<label>` teks permanen di atas field (bukan hanya placeholder).
- **Status Validasi Realtime**:
  - *State Normal*: Garis batas netral `border-input`.
  - *State Fokus*: Ring aksen fokus 2px solid `ring-2 ring-primary`.
  - *State Invalid (Error)*: Garis batas berubah merah tegas `border-destructive`.
- **Pesan Invalid Feedback Nyata**:
  - Pesan error dari skema validasi Zod ditampilkan tepat di bawah kotak input dengan teks merah `text-xs text-destructive font-medium flex items-center gap-1`.
  - Dilarang menyembunyikan pesan kesalahan validasi atau hanya mengandalkan alert pop-up browser bawaan.
- **State Tombol Submit**:
  - Menampilkan status memuat (*loading spinner* dan teks "Menyimpan perubahan...") serta menonaktifkan klik ganda (*disabled*) saat proses mutasi Server Actions sedang berjalan.

#### 5.6 Status Komponen Khusus (Skeleton Loading, Empty State, & Error State)
- **Skeleton Loading (Pengganti Spinner Kosong)**:
  - Menggunakan komponen skeleton yang mencerminkan siluet bentuk kartu atau baris tabel yang sedang dimuat dengan animasi denyut halus (`animate-pulse bg-muted`).
  - Menghindari layar putih kosong atau spinner melingkar di tengah halaman yang membingungkan pengunjung.
- **Empty State (Data Tidak Ditemukan)**:
  - Ditampilkan saat pencarian prodi tidak menghasilkan data atau filter tabel kosong.
  - Berisi: Ikon ilustratif netral, judul lugas "Program Studi Tidak Ditemukan", saran perbaikan kata kunci, dan tombol aksi "Reset Filter Pencarian".
- **Error State (Gagal Memuat Data)**:
  - Penanganan batas kesalahan (*React Error Boundary*) pada rute Next.js (`error.tsx`).
  - Menampilkan pesan transparan: "Gagal memuat rincian informasi. Koneksi terputus atau server sedang dalam pemeliharaan.", dilengkapi tombol "Muat Ulang Halaman".

---

### 6. Arsitektur Layout Halaman (Public Portal & Admin Panel)

#### 6.1 Layout Shell Portal Publik (`src/app/(public)/layout.tsx`)
Portal publik dirancang mengutamakan kemudahan navigasi calon mahasiswa dan transparansi informasi bagi orang tua:
- **Prinsip Full Width Screen (Edge-to-Edge 100%)**:
  - Seluruh seksi latar belakang membentang penuh 100% lebar layar (*full-bleed*), sementara area konten di dalamnya memiliki batas fleksibel dengan padding responsif (`px-4 sm:px-6 lg:px-8 xl:px-12`).
  - Memberikan ruang baca yang lega, nyaman di monitor lebar maupun ponsel, tanpa terkurung dalam kotak sempit.
- **Top Announcement Bar**:
  - Menempel di bagian paling atas: Menampilkan informasi periode penerimaan aktif (contoh: "Pendaftaran Mahasiswa Baru TA 2027/2028 Telah Dibuka") disertai countdown batas waktu gelombang dan tautan cepat ke formulir pendaftaran.
- **Header Navigasi Utama**:
  - Logo resmi UNISM PMB, navigasi menu (Program Studi, Biaya Kuliah, Jalur Seleksi, Beasiswa, Fasilitas), sakelar tema Light/Dark mode, dan tombol aksi "Daftar Sekarang".
  - Di perangkat seluler (< 768px): Tautan menu disatukan ke dalam *Slide-out Sheet Drawer* sisi kanan.
- **Sticky Mobile Bottom Dual CTA Bar (< 768px)**:
  - Komponen bar menempel di bawah layar ponsel (`fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border p-3 md:hidden`).
  - Menampilkan tombol "Daftar PMB" (`bg-accent text-accent-foreground font-bold`) dan tombol "Chat WA Admisi" di jangkauan jempol.
  - Kontainer `<main>` diberi padding bawah kompensasi `pb-20 md:pb-0` agar konten tidak tertutup.
- **Footer Komprehensif Publik (Full Width)**:
  - Membentang penuh di bagian dasar seluruh rute publik dengan 4 blok informasi:
    1. *Profil & Legalitas Institusi*: Logo UNISM, legalitas akreditasi resmi BAN-PT dan LAM-PTKes, serta nomor izin operasional Kemendikbudristek.
    2. *Tautan Navigasi Cepat*: Tautan langsung ke 15 rute katalog publik, panduan beasiswa, dan portal registrasi online.
    3. *Jam Layanan & Lokasi*: Jadwal operasional loket layanan admisi kampus (Senin s.d. Sabtu) dan peta lokasi kampus Universitas Sari Mulia Banjarmasin.
    4. *Saluran Kontak Resmi*: Nomor WhatsApp CS PMB 1, WhatsApp CS PMB 2, telepon kantor, alamat email resmi admisi, dan media sosial institusi.
  - *Sub-footer*: Baris copyright resmi UNISM dan tautan kebijakan privasi calon mahasiswa.

#### 6.2 Anatomi Layout Halaman Publik Spesifik
- **Beranda (Landing Page `/`) - Alur Konversi & Eksplorasi Lengkap**:
  1. *Announcement Bar*: Periode & gelombang aktif.
  2. *Hero Section Solid Dual CTA*: Headline akreditasi Baik Sekali, deskripsi keunggulan, tombol "Daftar Sekarang" dan "Konsultasi WhatsApp".
  3. *Quick Hub (6 Kartu Pintas)*: Akses instan ke Jalur Seleksi, Biaya Pendidikan, Program RPL/Karyawan, Beasiswa, Fasilitas Kampus, & Alur Masuk.
  4. *Showcase Program Studi Pilihan*: Grid kartu prodi unggulan dilengkapi filter instan antar-fakultas.
  5. *Widget Kalkulator Biaya Trimester Interaktif*: Simulasi biaya per-trimester (Smt 1-4 & Smt 5-8), pilihan kelas reguler vs karyawan, serta kalkulasi diskon DPP dari jalur seleksi.
  6. *Alur Pendaftaran 5 Langkah Visual*: Diagram alur registrasi dari pembuatan akun hingga daftar ulang.
  7. *Fasilitas & Beasiswa*: Galeri foto fasilitas format `.webp` dan informasi program beasiswa KIP & prestasi.
  8. *FAQ & Seksi Kontak Admisi*: Tanya jawab yang sering ditanyakan orang tua dan formulir konsultasi langsung.
- **Halaman Detail Program Studi (`/program-studi/[slug]`) - 2-Kolom Split Layout**:
  - *Kolom Kiri (70% - Konten Akademik & Karir)*:
    - Banner prodi dengan badge akreditasi resmi (BAN-PT / LAM-PTKes).
    - Profil keilmuan prodi dan peluang profesi lulusan.
    - Struktur kurikulum per-semester dan beban SKS.
    - Fasilitas laboratorium khusus prodi dan profil dosen pengampu.
  - *Kolom Kanan (30% - Sticky Sidebar Biaya & Pendaftaran)*:
    - Kartu ringkasan biaya yang menempel saat halaman di-scroll (*sticky-top*).
    - Tabel ringkas Biaya Trimester (Fase 1 Smt 1-4 vs Fase 2 Smt 5-8).
    - Pilihan kelas Reguler atau Kelas Karyawan/RPL.
    - Ringkasan berkas persyaratan pendaftaran.
    - Tombol aksi langsung "Daftar Program Studi Ini".
- **Halaman Katalog & Rincian Biaya (`/program-studi`, `/biaya-pendidikan`) - Top Filter & Dual View**:
  - *Top Filter Bar*: Dropdown fakultas, filter jenjang (S1, D3, Profesi), pill filter pilar (Reguler, RPL, KIP), dan search input instan.
  - *Dual View Toggle*: Tombol sakelar untuk beralih antara:
    - **Mode Kartu Visual (Card Grid)**: Optimal untuk calon mahasiswa yang ingin melihat kartu foto representatif dan deskripsi ringkas prodi.
    - **Mode Tabel Terstruktur (TanStack Table)**: Optimal untuk orang tua yang ingin membandingkan angka nominal biaya semester 1-4 dan 5-8 antar-prodi secara sekaligus.

#### 6.3 Layout Shell Panel Admin (`src/app/admin/layout.tsx`)
Panel admin dirancang untuk produktivitas staf pengelola PMB dalam mengelola data akademik multi-tahun:
- **Prinsip Full Width Workspace (Lebar Penuh 100%)**:
  - Area kerja data menggunakan lebar layar penuh (`w-full px-4 sm:px-6 lg:px-8`) agar tabel TanStack dengan banyak kolom (biaya per-trimester, DPP, diskon jalur, kuota) dapat tampil leluasa tanpa pemotongan yang menyulitkan pembacaan data.
- **Collapsible Vertical Sidebar**:
  - Terletak di sisi kiri: Dapat diminimalkan (*toggle collapse*) menjadi mode ikon untuk memperluas ruang kerja tabel.
  - Struktur Menu Berikon:
    - Dashboard Utama (`/admin/dashboard`)
    - Periode Akademik (`/admin/periods`)
    - Master Program Studi (`/admin/programs`)
    - Jalur Seleksi & Diskon (`/admin/tracks`)
    - Rincian Biaya Pendidikan (`/admin/tuitions`)
    - Manajemen Beasiswa & Fasilitas
    - Pengaturan Akun Admin
  - Tombol Logout aman di bagian bawah sidebar.
- **Sticky Topbar Header**:
  - *Breadcrumb*: Menunjukkan lokasi hierarki modul aktif (contoh: *Admin > Biaya Pendidikan > Tambah Data*).
  - *Indikator Permanen Periode Aktif*: Badge dengan sorotan warna solid `TA 2027/2028 (Aktif)` yang selalu terlihat, dilengkapi tombol pintas untuk berpindah konteks tahun akademik.
  - *Kontrol Tema & Pengguna*: Sakelar Light/Dark mode dan foto avatar profil admin yang sedang bertugas.
- **Workspace Beranda Admin (`/admin/dashboard`) - Ringkasan Operasional PMB**:
  - *4 Kartu Status Cepat*:
    1. Periode Akademik Aktif (Tahun Akademik & status gelombang).
    2. Total Jalur Seleksi Buka (Jumlah jalur reguler & non-reguler).
    3. Master Program Studi (Total prodi terdaftar & terverifikasi).
    4. Kelengkapan Biaya Pendidikan (Persentase prodi yang telah diisi tarif biayanya).
  - *Quick Action Shortcuts*: Tombol aksi cepat "+ Buka Periode Baru", "+ Input Biaya Prodi", dan "Pratinjau Portal Publik".
  - *Tabel Status Jalur Pendaftaran Aktif*: Ringkasan jalur seleksi yang sedang dibuka beserta kuota, biaya tes, dan diskon registrasi ulang.
- **Pola Formulir Entri Data (Dedicated Page Form)**:
  - Form pembuatan dan pembaruan data dialihkan ke rute halaman tersendiri (contoh: `/admin/tuitions/new`, `/admin/tuitions/[id]/edit`) dengan tata letak formulir multi-seksi lebar penuh.
  - Dilengkapi *React Hook Form + Zod*, label eksplisit, pesan *visual invalid feedback* nyata, kalkulasi otomatis total biaya, dan tombol submit berstatus loading.
- **Footer Panel Admin (Full Width)**:
  - Membentang di dasar area kerja admin:
    - Informasi versi rilis sistem portal PMB UNISM.
    - Indikator status koneksi server & database MySQL.
    - Timestamp sinkronisasi data terakhir dan copyright institusi.

---

### 7. Sistem Animasi & Gerakan Interaktif (GSAP Motion System)

#### 7.1 Library & Engine Animasi Resmi
Sistem animasi dirancang berbasis performa tinggi 60 FPS menggunakan kombinasi:
- **GSAP Core (`gsap`) & React Hook Resmi (`@gsap/react`)**:
  - Seluruh animasi komponen React memanfaatkan hook `useGSAP()` dengan penanganan siklus hidup (*lifecycle*) dan pembersihan memori otomatis (*auto-cleanup*) saat komponen di-unmount atau rute berpindah.
  - Plugin resmi yang didaftarkan pada sisi klien: `ScrollTrigger` untuk pemicu animasi seksi saat digeser.
- **Aturan Performa GPU (Anti-Layout Thrashing)**:
  - Animasi dibatasi secara ketat hanya pada properti akselerasi perangkat keras GPU: `transform` (`x`, `y`, `scale`) dan `opacity`.
  - Dilarang menganimasikan properti pemicu reflow layout browser seperti `top`, `left`, `width`, `height`, `margin`, atau `padding`.

#### 7.2 Karakter Gerakan & Parameter Waktu (Timing & Easing)
Menghadirkan nuansa akademik yang berwibawa (*Subtle & Prestigious*):
- **Durasi Mikro-Interaksi (Hover, Klik, Toggle)**:
  - Durasi: `0.15s` sampai `0.2s` | Easing: `power2.out`.
  - Menghasilkan respon sentuhan yang instan dan responsif.
- **Durasi Pemunculan Komponen (Section / Card Reveal)**:
  - Durasi: `0.4s` sampai `0.5s` | Easing: `power3.out`.
  - Gerakan lembut dari posisi `y: 16px` dan `opacity: 0` menuju posisi normal `y: 0` dan `opacity: 1`.
- **Stagger Terukur Antar-Kartu**:
  - Interval jeda beruntun: `0.06s` (60ms) antar-kartu prodi atau kartu quick hub.
  - Mencegah kesan kaku tanpa membuat pengguna menunggu lama.

#### 7.3 Titik Penerapan Spesifik (Motion Touchpoints)
1. **Transisi Perpindahan Halaman Rute (Page Route Transitions)**:
   - *Top Accent Progress Bar*: Garis indikator tipis 3px dengan warna Warm Ochre `#D97706` di bagian paling atas viewport yang bergerak cepat saat proses navigasi rute baru dimulai hingga selesai.
   - *Fade Entrance Konten Halaman Baru*: Wrapper konten utama halaman yang baru dimuat masuk dengan efek pudar halus (`opacity: 0` ke `1` dalam `0.25s` via `power1.inOut`).
2. **ScrollTrigger Reveal (Halaman Beranda & Publik)**:
   - Terpicu saat bagian atas seksi mencapai area pandang `top 85%` layar.
   - Diterapkan pada: Baris Kartu Quick Hub, Grid Kartu Program Studi Unggulan, Alur Pendaftaran 5 Langkah, dan Galeri Fasilitas.
3. **Animated Number Counter (Kalkulator Biaya & Statistik Admin)**:
   - Saat pengguna mengganti prodi atau kelas pada Widget Kalkulator Biaya Trimester, angka nominal rupiah bergulir mulus (*animated number tween*) dari nilai sebelumnya ke nilai baru dalam durasi `0.4s`.
   - Memberikan kepuasan visual dan mempertegas bahwa kalkulasi bersifat interaktif dan dinamis.
4. **Mikro-Interaksi Kartu & Navigasi**:
   - Efek Hover Kartu Prodi: Elevasi mikro `y: -3px` dan perubahan warna garis batas kartu menuju warna brand primary.
   - Slide-out Sheet Mobile: Panel menu mobile meluncur dari kanan layar `x: 100%` ke `0%` dengan durasi `0.3s` kurva `power3.out`.
   - Accordion FAQ: Pembukaan dan penutupan pertanyaan tanya jawab yang mengalir mulus tanpa patah.

#### 7.4 Kepatuhan Aksesibilitas (`prefers-reduced-motion`)
Untuk pengguna dengan sensitivitas vestibular atau yang mengaktifkan mode hemat gerak pada sistem operasinya:
- Sistem menggunakan deteksi media query: `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- Jika aktif, seluruh efek translasi (`x`, `y`) dan jeda durasi animasi dinonaktifkan secara otomatis (`duration: 0`, elemen langsung tampil `opacity: 1` tanpa gerakan meluncur).
