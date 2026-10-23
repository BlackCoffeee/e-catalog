# Product Requirements Document (PRD)
## Digital E-Catalog & Brosur Interaktif PMB Universitas Sari Mulia (UNISM)

---

### System Architecture

#### 1. Tech Stack & Runtime
- **Framework**: Next.js (App Router) dengan TypeScript.
- **Styling & UI Kit**: Tailwind CSS terintegrasi dengan komponen basis `shadcn/ui`.
- **UI Design Standard**: Menerapkan aturan `antislop-ui` (desain berbasis tujuan fungsional, tanpa em dash, hierarki kontras jelas, palet warna berkarakter, aksesibel WCAG AA).
- **Database Engine**: MySQL.
- **Object-Relational Mapping (ORM)**: Prisma ORM (schema-first, migrasi terstruktur, type-safe query).
- **Authentication**: NextAuth.js (Auth.js) dengan Credentials Provider dan enkripsi password `bcrypt` untuk keamanan akses rute internal pengelola.
- **Table Engine**: TanStack Table (`@tanstack/react-table`) untuk seluruh tabel data panel admin (sorting, filtering, pagination).
- **Form & Validation**: React Hook Form (`react-hook-form`) dengan skema Zod via `@hookform/resolvers/zod`. Setiap form wajib menampilkan pesan umpan balik kesalahan (invalid feedback) secara eksplisit di bawah input terkait.
- **Client State Management**: Zustand (`zustand`) untuk pengelolaan state global antarmuka sisi klien (filter katalog publik, status modal, preferensi tampilan, dan state tabel admin).
- **Runtime & Deployment**: Node.js Standalone build di dalam Docker container untuk portabilitas hosting.

#### 2. Project Structure & Modular Conventions
- `src/app/(catalog)/`: Kelompok rute katalog publik untuk calon mahasiswa dan pengunjung umum.
- `src/app/admin/`: Kelompok rute panel dashboard administrasi internal PMB UNISM.
- `src/middleware.ts`: Pengamanan rute (route guard) berbasis sesi NextAuth untuk memproteksi seluruh URL `/admin/*` kecuali `/admin/login`.
- `src/components/ui/`: Komponen atomik basis shadcn/ui (Button, Card, Badge, Dialog, Tabs, Table).
- `src/components/modules/`: Komponen spesifik domain katalog publik (Hero, FacultyFilter, TuitionCalculator, AdmissionTimeline).
- `src/components/admin/`: Komponen antarmuka panel administrasi (Sidebar, DataTables TanStack, FormDialogs).
- `src/stores/`: Zustand store untuk manajemen state antarmuka klien (filterStore, uiStore).
- `src/lib/validations/`: Definisi skema validasi Zod untuk seluruh formulir login dan CRUD admin.
- `src/lib/`: Instansiasi prisma client (`prisma.ts`), konfigurasi auth (`auth.ts`), utilitas format mata uang (`formatters.ts`), dan konstanta.
- `src/actions/`: Server Actions untuk mutasi data CRUD admin dan kalkulasi server-side.
- `prisma/`: Berkas `schema.prisma` dan script seeding database (`seed.ts`).
- `public/assets/`: Direktori aset statis (logo, foto beranda, gambar prodi teroptimasi).

#### 3. Routing & Navigation Paradigm
- Menggunakan arsitektur multi-page berbasis Next.js App Router untuk memastikan setiap topik informasi memiliki URL permanen yang dapat di-share langsung ke calon mahasiswa atau orang tua (deep linking).
- Navigasi global persistent (Navbar di atas dan Footer di bawah) dengan indikator rute aktif.

#### 4. Data Flow & State Strategy
- **Data Fetching**: Memanfaatkan React Server Components (RSC) untuk melakukan direct database query melalui Prisma Client saat halaman dirender di sisi server (SSR/ISR). Query data secara otomatis mengisolasi data berdasarkan `AcademicPeriod` yang aktif (`where: { period: { isActive: true } }`), sehingga pembaruan tahun akademik di masa depan tidak memerlukan modifikasi kode.
- **Client State Management (Zustand)**: Mengelola state interaktif klien secara ringan tanpa prop drilling, seperti filter fakultas dan jenjang pada katalog publik, status pembukaan modal simulasi, serta state filter tabel di dashboard admin.
- **Form Handling & Validation**: Seluruh interaksi form dikelola secara terisolasi menggunakan React Hook Form yang divalidasi oleh Zod Schema. Tidak diperbolehkan submit data yang tidak lolos validasi, dan setiap field wajib memiliki invalid feedback visual (teks warna merah dengan pesan spesifik).
- **Data Table Engine**: Data master di dashboard admin dirender menggunakan TanStack Table dengan integrasi styling shadcn/ui Table, mendukung pengurutan kolom (sorting), penyaringan data (filtering), dan paginasi yang cepat di sisi klien.

#### 5. Asset Handling & Optimization Pipeline
- Seluruh aset visual referensi dalam format `.heif` dikonversi menjadi format `.webp` terkompresi sebelum dimasukkan ke direktori aset publik.
- Menggunakan komponen `next/image` untuk pemuatan gambar secara responsif, lazy loading otomatis, dan pencegahan layout shift (CLS).

---

### Data Schema / Scheme

Model data diimplementasikan pada database MySQL menggunakan Prisma ORM dengan relasi ternormalisasi dan dukungan multi-periode tahun akademik:

#### 1. Scheme Entitas Periode Akademik (`AcademicPeriod`) - Parent Entity
Entitas master penanggalan PMB yang memayungi data biaya dan jalur pendaftaran agar mendukung pembaruan tarif tahunan secara fleksibel tanpa mengubah kode aplikasi:
- `id` (Int, Primary Key, Auto Increment)
- `academicYear` (String, Unique): Kode tahun akademik acuan (contoh: `2027/2028`, `2028/2029`).
- `name` (String): Label tampilan resmi (contoh: `Penerimaan Mahasiswa Baru TA 2027/2028`).
- `isActive` (Boolean, Default: false, Indexed): Flag penanda periode aktif. Hanya ada satu periode bertanda `isActive = true` yang menjadi default tampilan publik pada katalog.
- `startDate` (DateTime, Optional): Tanggal pembukaan resmi pendaftaran.
- `endDate` (DateTime, Optional): Tanggal penutupan masa pendaftaran gelombang akhir.
- `notes` (Text, Optional): Catatan pengantar atau kebijakan khusus periode terkait.
- `createdAt` & `updatedAt` (DateTime)
- **Relasi**:
  - 1 Periode memiliki banyak data Biaya Pendidikan (1-to-many ke `TuitionFee`).
  - 1 Periode memiliki banyak data Jalur Pendaftaran (1-to-many ke `AdmissionTrack`).

#### 2. Scheme Entitas Program Perkuliahan (`LectureProgram`) - Master Program
Entitas klasifikasi 3 pilar program perkuliahan utama di Universitas Sari Mulia:
- `id` (Int, Primary Key, Auto Increment)
- `slug` (String, Unique, Indexed): Identifier program (`reguler`, `rpl`, `kip`).
- `name` (String): Nama program (`Reguler`, `RPL (Rekognisi Pembelajaran Lampau)`, `KIP (Kartu Indonesia Pintar)`).
- `description` (Text): Penjelasan sasaran peserta, mekanisme perkuliahan, dan ketentuan dasar program.
- `createdAt` & `updatedAt` (DateTime)
- **Relasi**: Many-to-many dengan `StudyProgram` (menentukan opsi program apa saja yang dibuka oleh suatu program studi).

#### 3. Scheme Entitas Fakultas (`Faculty`)
- `id` (Int, Primary Key, Auto Increment)
- `slug` (String, Unique, Indexed): Identifier URL yang ramah SEO (contoh: `kesehatan`, `sains-teknologi`, `humaniora`, `kedokteran-hewan-biosains`).
- `name` (String): Nama lengkap fakultas.
- `code` (String): Kode singkatan resmi fakultas (FK, FKHB, FST, FH).
- `description` (Text): Ulasan profil dan visi fakultas.
- `colorTheme` (String, Optional): Nilai token warna aksen untuk styling komponen fakultas.
- `createdAt` & `updatedAt` (DateTime)
- **Relasi**: 1 Fakultas memiliki banyak Program Studi (1-to-many ke `StudyProgram`).

#### 4. Scheme Entitas Program Studi (`StudyProgram`)
- `id` (Int, Primary Key, Auto Increment)
- `slug` (String, Unique, Indexed): Identifier URL prodi (contoh: `teknologi-informasi`, `farmasi`, `kebidanan`).
- `facultyId` (Int, Foreign Key ke `Faculty.id`)
- `name` (String): Nama resmi program studi (contoh: `Sarjana Teknologi Informasi`).
- `degreeLevel` (String / Enum): Jenjang pendidikan (`D3`, `D4`, `S1`, `PROFESI`, `S2`).
- `degreeTitle` (String): Singkatan gelar kelulusan resmi (contoh: `S.Kom`, `S.Farm`, `S.Kep`, `S.Keb`, `S.T`, `S.M`, `S.H`, `S.Pd`, `S.Tr.Kes`, `Ners`, `Apt`, `Bdn`).
- `studyDurationYears` (Decimal / Float): Standar lama studi dalam tahun (contoh: 3.0, 4.0, 1.0).
- `accreditation` (String): Peringkat akreditasi (contoh: `Unggul`, `Baik Sekali`, `Baik`, `Terakreditasi`).
- `description` (Text): Penjelasan fokus keilmuan, kurikulum, dan aktivitas perkuliahan.
- `careerProspects` (JSON): Array daftar peluang karier dan profesi lulusan di dunia kerja.
- `imageCover` (String): Lokasi path aset visual prodi berformat `.webp`.
- `createdAt` & `updatedAt` (DateTime)
- **Relasi**:
  - Many-to-many dengan `LectureProgram` (pilihan Reguler, RPL, KIP).
  - 1 Program Studi memiliki banyak Skema Biaya (1-to-many ke `TuitionFee`).

#### 5. Scheme Entitas Biaya Pendidikan (`TuitionFee`)
- `id` (Int, Primary Key, Auto Increment)
- `periodId` (Int, Foreign Key ke `AcademicPeriod.id`): Relasi ke periode akademik pemilik biaya.
- `studyProgramId` (Int, Foreign Key ke `StudyProgram.id`)
- `trackCategory` (String / Enum): Kategori skema perkuliahan (`REGULAR`, `EMPLOYEE`, `RPL`, `PROFESSION_REGULAR`, `PROFESSION_NON_REGULAR`, `PROFESSION_ALUMNI`, `PROFESSION_NON_ALUMNI`).
- `paymentInterval` (String): Interval penagihan (default: `Trimester / Setiap 3 Bulan Sekali`).
- `earlyTrimesterFee` (Decimal / BigInt): Nominal biaya per trimester untuk tahap awal (Semester 1 s.d 4).
- `lateTrimesterFee` (Decimal / BigInt): Nominal biaya per trimester untuk tahap lanjutan (Semester 5 s.d 8 atau semester profesi).
- `notes` (String, Optional): Keterangan khusus (contoh: pembagian semester profesi apoteker).
- `createdAt` & `updatedAt` (DateTime)

#### 6. Scheme Entitas Jalur Pendaftaran (`AdmissionTrack`)
Entitas dinamis (dapat ditambah atau dikurangi per periode) yang menetapkan biaya pendaftaran tes/wawancara serta biaya registrasi ulang kelulusan:
- `id` (Int, Primary Key, Auto Increment)
- `periodId` (Int, Foreign Key ke `AcademicPeriod.id`): Relasi ke periode akademik aktif.
- `slug` (String, Unique, Indexed): Identifier URL (contoh: `jalur-umum`, `undangan`, `prestasi-akademik`, `unism-cerdas`, `kip-kuliah`).
- `name` (String): Nama resmi jalur penerimaan.
- `category` (String / Enum): Klasifikasi jalur (`REGULAR_GENERAL`, `INVITATION`, `ACADEMIC_ACHIEVEMENT`, `NON_ACADEMIC_ACHIEVEMENT`, `INTERNAL_SCHOLARSHIP`, `GOVERNMENT_SCHOLARSHIP`).
- `registrationFeeHealth` (Decimal): Tarif biaya pendaftaran untuk bisa mengikuti tes dan wawancara pada Fakultas Kesehatan (misal: Rp 500.000, atau Rp 0 pada jalur beasiswa).
- `registrationFeeNonHealth` (Decimal): Tarif biaya pendaftaran untuk bisa mengikuti tes dan wawancara pada Saintek & Humaniora (misal: Rp 350.000, atau Rp 0 pada jalur beasiswa).
- `feeDiscount` (Decimal, Default: 0): Potongan biaya pendaftaran awal (contoh: potongan Rp 150.000 pada jalur undangan).
- `reRegistrationFee` (Decimal, Optional): Nominal standar biaya registrasi ulang (daftar ulang) yang wajib dibayarkan setelah calon mahasiswa dinyatakan resmi lulus seleksi.
- `reRegistrationDiscount` (Decimal, Default: 0): Potongan biaya registrasi ulang atau DPP saat daftar ulang (contoh: potongan Rp 750.000 bagi pemegang prestasi).
- `isTestRequired` (Boolean, Default: true): Kewajiban mengikuti Tes Potensi Akademik (TPA).
- `isInterviewRequired` (Boolean, Default: true): Kewajiban mengikuti tes wawancara prodi.
- `acceptancePriorityPercentage` (Int, Optional): Persentase prioritas kelulusan seleksi (contoh: 60% atau 80%).
- `eligibilityCriteria` (JSON): Kriteria dan ketentuan utama pendaftar (contoh: melampirkan bukti prestasi, rata-rata rapor minimal 80, atau surat undangan sosialisasi).
- `requiredDocuments` (JSON): Daftar berkas wajib yang harus diunggah calon mahasiswa.
- `isActive` (Boolean, Default: true): Status keaktifan jalur penerimaan pada periode berjalan.
- `createdAt` & `updatedAt` (DateTime)

#### 7. Scheme Entitas Beasiswa (`Scholarship`)
- `id` (Int, Primary Key, Auto Increment)
- `slug` (String, Unique, Indexed): Identifier URL beasiswa (contoh: `kip-kuliah`, `unism-cerdas`, `unism-sejahtera`, `yayasan-indah`, `tahfiz-quran`, `pemda`).
- `name` (String): Nama resmi program beasiswa.
- `providerType` (String / Enum): Sumber pendanaan (`INTERNAL_UNISM`, `KEMENDIKTI`, `YAYASAN`, `PEMDA`).
- `coveragePercentage` (Int): Persentase cakupan bantuan biaya kuliah (contoh: 50 atau 100).
- `livingAllowanceProvided` (Boolean): Fasilitas uang saku bulanan selama masa studi.
- `maxHouseholdIncomePerMember` (Decimal, Optional): Batas maksimal penghasilan keluarga per jiwa (contoh: Rp 750.000 atau Rp 500.000).
- `parentOccupationRestriction` (String, Optional): Batasan profesi orang tua (contoh: `Bukan ASN/TNI/POLRI`).
- `description` (Text): Deskripsi latar belakang dan tujuan beasiswa.
- `eligibilityCriteria` (JSON): Persyaratan spesifik penerima beasiswa.
- `benefits` (JSON): Komponen bantuan yang didapatkan penerima.
- `requiredDocuments` (JSON): Berkas administratif pengajuan beasiswa.
- `createdAt` & `updatedAt` (DateTime)

#### 8. Scheme Entitas Fasilitas Kampus (`CampusFacility`)
- `id` (Int, Primary Key, Auto Increment)
- `name` (String): Nama sarana atau laboratorium kampus.
- `category` (String / Enum): Kategori fasilitas (`LABORATORY`, `LIBRARY`, `AUDITORIUM`, `SPORTS`, `CLINIC`, `CAMPUS_BUILDING`).
- `description` (Text): Ulasan fungsi sarana dalam menunjang kompetensi mahasiswa.
- `imageUrl` (String): Path berkas gambar teroptimasi `.webp`.
- `displayOrder` (Int, Default: 0): Urutan tampil pada galeri fasilitas.
- `createdAt` & `updatedAt` (DateTime)

#### 9. Scheme Entitas Pengelola / Admin (`AdminUser`)
Entitas autentikasi untuk staf admisi dan pengelola konten PMB UNISM:
- `id` (Int, Primary Key, Auto Increment)
- `email` (String, Unique, Indexed): Alamat surel resmi staf admisi.
- `passwordHash` (String): Hash kata sandi terenkripsi menggunakan algoritma `bcrypt`.
- `name` (String): Nama lengkap staf pengelola.
- `role` (String / Enum, Default: `ADMIN`): Tingkat hak akses (`SUPERADMIN`, `ADMIN`).
- `isActive` (Boolean, Default: true): Status keaktifan akun staf.
- `createdAt` & `updatedAt` (DateTime)

---

### 1. Ringkasan Eksekutif & Tujuan Produk

#### 1.1 Latar Belakang & Masalah
Penyampaian informasi Penerimaan Mahasiswa Baru (PMB) berbasis brosur cetak atau dokumen PDF statis menghadapi tantangan signifikan:
1. **Keterbacaan dan Akses Seluler**: Sebagian besar calon mahasiswa mengakses informasi melalui ponsel pintar, di mana dokumen PDF dengan tabel biaya padat dan resolusi tinggi sulit dibaca dan memerlukan zoom berulang.
2. **Kebutuhan Informasi Multi-Segmen**: Universitas Sari Mulia melayani dua kelompok audiens utama secara seimbang, yaitu calon mahasiswa reguler lulusan SMA/SMK sederajat dan kalangan pekerja atau tenaga kesehatan yang membutuhkan kelas karyawan serta jalur alih jenjang (RPL Transfer SKS). Brosur fisik sulit memfasilitasi kebutuhan kedua segmen ini tanpa terlihat membingungkan.
3. **Kompleksitas Skema Pembayaran Trimester**: UNISM menerapkan skema pembayaran per-trimester (dibayarkan setiap 3 bulan sekali), yang membagi pembiayaan antara tahap awal (Semester 1 s.d 4) dan tahap akhir (Semester 5 s.d 8). Tanpa simulasi interaktif yang jelas, orang tua dan calon mahasiswa sering salah memahami pembagian beban biaya riil.
4. **Hambatan Konversi Pendaftaran**: Format statis tidak memiliki jembatan aksi langsung bagi pendaftar yang ingin segera mengisi formulir atau berkonsultasi mengenai persyaratan khusus.

#### 1.2 Tujuan & Sasaran (Goals & Objectives)
- Membangun portal E-Catalog & Brosur Interaktif berbasis web yang responsif, ringan, dan dirancang khusus untuk kenyamanan perangkat seluler (mobile-first).
- Menegaskan nilai jual utama (Core Value Proposition) UNISM: Reputasi kampus terakreditasi dengan seluruh prodi terakreditasi, didukung skema pembiayaan per-trimester yang fleksibel dan terjangkau.
- Menyediakan arsitektur navigasi yang rapi untuk memandu calon mahasiswa dari eksplorasi program studi, pengecekan akreditasi, kalkulasi biaya pendidikan, hingga pemahaman ragam beasiswa.
- Mengoptimalkan konversi pendaftaran melalui penempatan Dual Call-to-Action (CTA) terpadu: Tombol pendaftaran langsung ke Portal SPMB resmi dan Tombol konsultasi cepat ke WhatsApp Admin PMB.

#### 1.3 Target Audiens & Persona Pengguna
1. **Calon Mahasiswa Baru Reguler (Siswa SMA/SMK/MA Kelas XII & Lulusan Baru)**
   - Karakteristik: Mengakses informasi lewat ponsel, mencari kejelasan jurusan favorit, akreditasi, biaya awal, dan peluang beasiswa prestasi atau KIP Kuliah.
2. **Orang Tua / Wali Calon Mahasiswa**
   - Karakteristik: Memerhatikan legalitas institusi, kredibilitas akreditasi BAN-PT/LAM-PTKes, transparansi rincian biaya per-trimester, serta kepastian nomor rekening resmi penerimaan pendaftaran.
3. **Pekerja & Karyawan Profesional**
   - Karakteristik: Membutuhkan informasi kelas karyawan (Sains & Teknologi serta Humaniora) dengan jadwal kuliah yang fleksibel dan biaya terjangkau per 3 bulan.
4. **Tenaga Kesehatan & Alumni D3 (Alih Jenjang RPL & Profesi)**
   - Karakteristik: Mencari program transfer SKS (D3 Kebidanan/Keperawatan ke S1) serta program lanjutan Profesi Ners, Pendidikan Profesi Bidan, dan Profesi Apoteker.

---

### 2. Arsitektur Rute & Spesifikasi Halaman (Detail per Route)

Sistem dirancang memiliki 15 rute terstruktur yang memadukan arsitektur navigasi referensi UMBJM dengan kekayaan data Universitas Sari Mulia:

#### 2.1 Rute `/` (Beranda / Portal Utama)
Halaman sentral yang berfungsi sebagai ringkasan eksekutif interaktif dan gerbang navigasi cepat ke seluruh layanan informasi PMB UNISM.
- **Header & Navbar Global**:
  - Logo resmi UNISM dengan teks identitas universitas.
  - Tautan menu navigasi: `Program Studi`, `Biaya Kuliah`, `Jalur Masuk`, `Beasiswa`.
  - Tombol aksi ganda (Dual CTA): Tombol `Daftar Sekarang` (tautan langsung ke portal SPMB online) dan tombol `Konsultasi WhatsApp PMB`.
- **Hero Section**:
  - Judul Utama: *"Kuliah Berkualitas, Masa Depan Lebih Pasti!"*.
  - Narasi Reputasi: Transformasi dari Akbid & STIKES Sari Mulia hingga resmi menjadi Universitas Sari Mulia sejak 2019.
  - Lencana Status Akreditasi: Penegasan akreditasi institusi dan seluruh prodi terakreditasi BAN-PT dan LAM-PTKes.
  - Quick Search / Filter Bar: Input pencarian cepat nama program studi atau minat karir dengan filter fakultas instan.
- **Informasi Utama (Quick Access Action Cards)**:
  - Grid kartu navigasi cepat (mengadopsi kemudahan akses referensi):
    1. Kartu `Program Studi`: Pilihan jurusan di 4 fakultas.
    2. Kartu `Status Akreditasi`: Peringkat akreditasi BAN-PT & LAM-PTKes.
    3. Kartu `Gelar & Durasi Studi`: Daftar gelar kelulusan dan masa studi.
    4. Kartu `Alur Pendaftaran`: Panduan langkah dari formulir hingga NIM.
    5. Kartu `Biaya Pendaftaran`: Rincian biaya formulir per fakultas.
    6. Kartu `Jalur Seleksi & Syarat`: Pilihan jalur reguler, prestasi, dan beasiswa.
    7. Kartu `Biaya Kuliah Trimester`: Skema cicilan per 3 bulan.
    8. Kartu `Konsultasi & Tanya PMB`: Tombol kontak langsung petugas admisi.
- **Sorotan Fakultas (Faculty Showcase)**:
  - Tab navigasi 4 fakultas: Fakultas Kesehatan, Fakultas Kedokteran Hewan & Biosains, Fakultas Sains & Teknologi, Fakultas Humaniora.
  - Menampilkan kartu ringkasan prodi unggulan, jenjang, akreditasi, dan tautan ke halaman detail prodi.
- **Kalkulator Biaya Ringkas (Quick Tuition Preview)**:
  - Widget interaktif di beranda untuk memilih prodi dan langsung melihat estimasi biaya per trimester tanpa harus berpindah halaman.
- **Showcase Kampus & Sarana**:
  - Cuplikan foto fasilitas utama kampus UNISM (gedung beranda depan, laboratorium kesehatan, lab komputer).
- **Banner Program Beasiswa**:
  - Penjelasan singkat peluang kuliah gratis dan beasiswa internal/eksternal dengan tombol `Lihat Semua Beasiswa`.
- **Footer Komprehensif**:
  - Profil Kantor Promosi dan Penerimaan Mahasiswa Baru UNISM.
  - Alamat resmi kampus UNISM (Banjarmasin, Kalimantan Selatan).
  - Peringatan resmi rekening pembayaran SPMB institusi (rekening bank resmi atas nama universitas, bebas penipuan perorangan).
  - Tautan media sosial resmi (Instagram, TikTok, YouTube, WhatsApp).

#### 2.2 Rute `/program-studi` (Direktori Fakultas & Jurusan)
Halaman katalog lengkap seluruh program studi lintas fakultas dan jenjang.
- **Komponen Filter & Pencarian**:
  - Tab filter Fakultas: `Semua Fakultas`, `Kesehatan`, `Kedokteran Hewan & Biosains`, `Sains & Teknologi`, `Humaniora`.
  - Filter Jenjang: `Semua Jenjang`, `Diploma Tiga (D3)`, `Sarjana Terapan (D4)`, `Sarjana (S1)`, `Profesi`.
  - Filter Tipe Kelas: `Reguler`, `Kelas Karyawan`, `Program RPL / Alih Jenjang`.
- **Katalog Kartu Program Studi**:
  - Menampilkan 15+ program studi lengkap.
  - Setiap kartu memuat: Nama prodi, jenjang, fakultas, lencana akreditasi, ringkasan keilmuan, dan prospek karier utama.
  - Tombol aksi: `Detail Program Studi` (menuju `/program-studi/[slug]`) dan `Lihat Biaya Trimester` (menuju `/biaya-pendidikan/[slug]`).

#### 2.3 Rute `/program-studi/[slug]` (Halaman Detail Program Studi)
Halaman spesifik untuk masing-masing program studi (contoh: `/program-studi/farmasi`, `/program-studi/teknologi-informasi`).
- **Header Prodi**: Nama program studi, jenjang gelar, status akreditasi, fakultas naungan, dan gambar sampul representatif.
- **Ulasan Program (Perkuliahan)**: Penjelasan mendalam mengenai materi perkuliahan, kompetensi lulusan, dan keunggulan kurikulum.
- **Peluang Karier & Prospek Kerja**: Daftar terperinci profesi yang dapat ditekuni alumni di sektor industri, layanan kesehatan, pemerintahan, maupun wirausaha.
- **Jalur Kelas yang Tersedia**: Informasi ketersediaan kelas Reguler SMA, Kelas Karyawan, maupun program RPL.
- **Ringkasan Biaya Pendidikan Prodi Terkait**: Menampilkan rincian biaya trimester untuk prodi ini dengan tombol simulasi.
- **Call-to-Action Pendaftaran**: Tombol `Daftar Program Studi Ini` yang langsung mengarahkan ke formulir SPMB online dengan pilihan prodi terkait.

#### 2.4 Rute `/akreditasi` (Status Mutu Institusi & Prodi)
Halaman transparansi mutu dan akreditasi resmi.
- **Header Akreditasi Institusi**: Status akreditasi institusi Universitas Sari Mulia beserta nomor SK penjaminan mutu.
- **Tabel Peringkat Akreditasi Program Studi**:
  - Kolom: Nomor, Nama Fakultas, Program Studi, Jenjang, Lembaga Akreditasi (BAN-PT / LAM-PTKes), Peringkat (Unggul, Baik Sekali, Baik, Terakreditasi).
  - Filter pencarian cepat nama jurusan atau fakultas.
  - Penjelasan arti peringkat akreditasi bagi calon mahasiswa dan peluang kelulusan kerja.

#### 2.5 Rute `/gelar-dan-masa-studi` (Gelar Akademik & Durasi)
Halaman panduan profil gelar lulusan dan durasi masa studi normal.
- **Tabel Matriks Gelar & Durasi**:
  - Kolom: Fakultas, Program Studi, Jenjang, Singkatan Gelar Resmi, Standar Masa Tempuh Studi.
  - Memuat rincian lengkap: S.Kep (4 Tahun), S.Keb (4 Tahun), S.Tr.Kes (4 Tahun), A.Md.Keb (3 Tahun), S.Farm (4 Tahun), S.Kom (4 Tahun), S.T (4 Tahun), S.M (4 Tahun), S.H (4 Tahun), S.Pd (4 Tahun), Profesi Ners (1 Tahun), Profesi Bidan (1 Tahun), Profesi Apoteker (1 Tahun / 2 Semester), S1 Kedokteran Hewan (4 Tahun), S1 Biologi (4 Tahun).
  - Catatan durasi khusus untuk program alih jenjang RPL dan kelas karyawan berdasarkan hasil transfer SKS.

#### 2.6 Rute `/alur-pendaftaran` (Panduan Langkah Pendaftaran)
Panduan alur calon mahasiswa baru dari awal pengisian formulir hingga resmi diterima sebagai mahasiswa UNISM.
- **Stepper Alur Pendaftaran Interaktif (7 Tahapan)**:
  1. *Langkah 1: Pengisian Formulir Online*: Mengakses situs PMB UNISM dan memilih kategori pendaftar (lulusan baru SMA/SMK atau alih jenjang/karyawan).
  2. *Langkah 2: Pemilihan Jalur & Program Studi*: Menentukan prodi pilihan pertama dan kedua serta kategori jalur seleksi.
  3. *Langkah 3: Notifikasi & Pembayaran Biaya Pendaftaran*: Menerima instruksi pembayaran dengan kode referensi ke rekening bank resmi UNISM.
  4. *Langkah 4: Unggah Berkas Persyaratan*: Mengunggah scan dokumen wajib (KTP, KK, Ijazah/SKL, Rapor, Surat Keterangan Sehat/Bebas Buta Warna).
  5. *Langkah 5: Tahapan Seleksi*: Mengikuti seleksi administrasi berkas, tes potensi akademik online (bagi yang tidak bebas TPA), dan tes kesehatan/wawancara prodi tertentu.
  6. *Langkah 6: Pengumuman Kelulusan*: Notifikasi hasil seleksi penerimaan resmi melalui dashboard SPMB dan pesan WhatsApp resmi.
  7. *Langkah 7: Registrasi Ulang & Pembayaran Trimester 1*: Penyelesaian administrasi daftar ulang dan persiapan masa PKKMB perkuliahan.
- **Kotak Peringatan Keamanan Rekening Resmi**: Informasi nomor rekening resmi institusi (atas nama Universitas Sari Mulia) dan himbauan waspada penipuan pihak ketiga.

#### 2.7 Rute `/biaya-pendaftaran` (Struktur Tarif Formulir Masuk & Registrasi Ulang)
Halaman rincian dua tahapan pembiayaan admisi PMB:
- **1. Biaya Pendaftaran Seleksi (Tes & Wawancara)**:
  - Ditentukan oleh Jalur Pendaftaran yang dipilih oleh calon mahasiswa untuk dapat mengikuti tahapan tes potensi akademik (TPA), tes kesehatan, dan wawancara:
  - *Jalur Umum*: Fakultas Kesehatan Rp 500.000,- | Sains & Teknologi Rp 350.000,- | Humaniora Rp 350.000,-.
  - *Jalur Undangan*: Mendapatkan potongan biaya administrasi sebesar Rp 150.000,-.
  - *Jalur Prestasi Akademik & Non-Akademik*: Mendapatkan potongan biaya pendaftaran Rp 150.000,- atau gratis biaya formulir.
  - *Jalur Beasiswa & Prestasi Khusus (UNISM Cerdas, KIP Kuliah, Yayasan Indah, Tahfiz Qur'an)*: Biaya pendaftaran Rp 0,- (Gratis biaya formulir seleksi).
  - *Program Alih Jenjang RPL & Profesi*: Penyesuaian tarif formulir seleksi berkas dan uji kompetensi klinis/wawancara prodi (Apoteker, Ners, Bidan).
- **2. Biaya Registrasi Ulang (Daftar Ulang Kelulusan)**:
  - Dibayarkan setelah calon mahasiswa dinyatakan resmi lulus seleksi.
  - Penjelasan potongan biaya registrasi ulang / DPP bagi pemegang jalur prestasi akademik dan non-akademik (potongan sebesar Rp 750.000,- saat daftar ulang).
  - Skema bebas biaya registrasi ulang bagi penerima beasiswa KIP Kuliah dan Yayasan Indah.

#### 2.8 Rute `/jalur-seleksi` (Pusat Jalur Masuk & Kategori Program Perkuliahan)
Halaman gerbang pemilihan jalur penerimaan yang memayungi 3 program perkuliahan utama di UNISM:
- **Tiga Pilar Program Perkuliahan Utama**:
  1. *Program Reguler*: Perkuliahan reguler tatap muka bagi lulusan baru SMA/SMK/MA sederajat di seluruh program studi jenjang D3, D4, dan S1.
  2. *Program RPL (Rekognisi Pembelajaran Lampau)*: Jalur alih jenjang transfer SKS dan perolehan SKS berbasis pengalaman kerja klinis/teknis (D3 ke S1 pada Keperawatan, Kebidanan, serta Fakultas Sains & Teknologi).
  3. *Program KIP (Kartu Indonesia Pintar Kuliah)*: Program bantuan pendidikan terpusat bebas biaya kuliah 100% dari Kemendiktisaintek bagi calon mahasiswa berprestasi dengan keterbatasan ekonomi.
- **Dinamika Jalur Pendaftaran**:
  - Menjelaskan bahwa jalur pendaftaran dapat bertambah atau berkurang setiap periode akademik, dan menjadi penentu besaran biaya pendaftaran seleksi serta potongan biaya registrasi ulang.
  - Menyediakan filter interaktif untuk memilah jalur berdasarkan program perkuliahan (Reguler, RPL, KIP) dan kategori kelulusan.

#### 2.9 Rute `/jalur-seleksi/reguler` (Detail Syarat Jalur SMA/SMK/MA)
Halaman spesifikasi persyaratan dan benefit bagi lulusan SMA/SMK sederajat.
- **Tab Jalur Reguler**:
  - *Jalur Umum*: Syarat berkas lengkap, seleksi penuh (TPA, tes kesehatan, wawancara).
  - *Jalur Undangan*: Siswa kelas XII dengan surat undangan sosialisasi UNISM. Benefit: Prioritas diterima 60%, potongan pendaftaran Rp 150.000.
  - *Jalur Prestasi Akademik*: Ranking 10 besar semester 1 s.d 5 atau rata-rata rapor minimal 80. Benefit: Bebas tes TPA, prioritas diterima 80%, potongan pendaftaran Rp 150.000, potongan biaya registrasi ulang Rp 750.000.
  - *Jalur Prestasi Non-Akademik*: Juara minimal Harapan I tingkat Kabupaten/Kota hingga Internasional. Benefit: Bebas tes TPA, prioritas diterima 80%, gratis biaya administrasi pendaftaran, potongan biaya DPP Rp 750.000 saat registrasi ulang.
- **Rincian Dokumen Persyaratan Umum**:
  - Scan Ijazah / Surat Keterangan Lulus (SKL).
  - Scan KTP dan Kartu Keluarga.
  - Scan Surat Keterangan Sehat (pemeriksaan fisik, berat/tinggi badan, visus mata, laporan bebas buta warna untuk prodi kesehatan dan sains teknologi).
  - Pas foto formal rapi latar belakang polos.

#### 2.10 Rute `/jalur-seleksi/non-reguler` (Detail Syarat Jalur RPL, Profesi, & Kelas Karyawan)
Halaman persyaratan bagi calon mahasiswa lanjutan dan profesional.
- **Persyaratan Khusus Alih Jenjang RPL (D3 ke S1)**:
  - S1 Keperawatan & S1 Kebidanan RPL (Transfer SKS & Perolehan SKS Pengalaman Kerja): Scan ijazah D3 dan transkrip nilai, sertifikat pelatihan/workshop klinis, surat keterangan pengalaman kerja dari fasyankes.
  - S1 Sains & Teknologi RPL (Teknik Sipil, Teknologi Informasi, Sistem Informasi): Scan ijazah D3/D2/D1, daftar riwayat hidup/portofolio kerja teknis, surat rekomendasi tempat kerja.
- **Persyaratan Program Pendidikan Profesi**:
  - Profesi Apoteker: Ijazah & transkrip S1 Farmasi dengan IPK minimal 3.00, surat keterangan sehat bebas buta warna, sertifikat akreditasi prodi asal.
  - Profesi Ners & Profesi Bidan: Ijazah S1 Keperawatan / Kebidanan, transkrip nilai, ketentuan khusus alumni UNISM vs non-alumni.
- **Ketentuan Kelas Karyawan**:
  - Fleksibilitas jadwal perkuliahan bagi pekerja, surat izin atau keterangan kerja dari instansi pemberi kerja.

#### 2.11 Rute `/biaya-pendidikan` (Tabel Trimester & Kalkulator Interaktif Biaya)
Halaman pusat transparansi biaya perkuliahan tahun akademik acuan 2027/2028 dengan skema pembayaran trimester.
- **Penjelasan Skema Pembayaran Per-Trimester**:
  - Edukasi skema pembayaran setiap 3 (tiga) bulan sekali, membantu perencanaan keuangan orang tua tanpa beban pembayaran besar sekaligus di awal semester.
- **Fitur Kalkulator Biaya Trimester (Interactive Calculator)**:
  - Form interaktif: Pilihan Fakultas -> Pilihan Program Studi -> Pilihan Kategori Kelas (Reguler / Karyawan).
  - Hasil kalkulasi instan:
    - Nominal pembayaran per trimester tahap awal (Semester 1 s.d 4).
    - Nominal pembayaran per trimester tahap akhir (Semester 5 s.d 8).
    - Rincian komparasi total biaya per tahun akademik (4 kali pembayaran trimester dalam setahun).
- **Tabel Induk Biaya Pendidikan Reguler (Per Trimester)**:
  - *Fakultas Kesehatan*:
    - Diploma Tiga Kebidanan: Rp 5.950.000 (Smt 1-4) | Rp 4.850.000 (Smt 5-8).
    - Sarjana Kebidanan: Rp 6.750.000 (Smt 1-4) | Rp 5.500.000 (Smt 7-10).
    - Sarjana Keperawatan: Rp 6.250.000 (Smt 1-4) | Rp 5.250.000 (Smt 5-8).
    - Sarjana Farmasi: Rp 6.500.000 (Smt 1-4) | Rp 5.450.000 (Smt 5-8).
    - Sarjana Terapan Promosi Kesehatan: Rp 3.450.000 (Smt 1-4) | Rp 2.800.000 (Smt 5-8).
    - Profesi Ners: Rp 6.400.000 (Reguler) | Rp 6.750.000 (Non Reguler).
    - Pendidikan Profesi Bidan: Rp 7.750.000 (Reguler) | Rp 9.750.000 (Non Alumni).
    - Profesi Apoteker: Rp 39.000.000 (Semester 1) | Rp 29.000.000 (Semester 2).
  - *Fakultas Kedokteran Hewan & Biosains*:
    - Sarjana Kedokteran Hewan: Rp 8.000.000 (Smt 1-4) | Rp 8.000.000 (Smt 5-8).
    - Sarjana Biologi: Rp 2.200.000 (Smt 1-4) | Rp 1.850.000 (Smt 5-8).
  - *Fakultas Sains & Teknologi*:
    - Sarjana Teknologi Informasi: Rp 2.200.000 (Smt 1-4) | Rp 1.850.000 (Smt 5-8).
    - Sarjana Teknik Industri: Rp 2.200.000 (Smt 1-4) | Rp 1.850.000 (Smt 5-8).
    - Sarjana Sistem Informasi: Rp 2.200.000 (Smt 1-4) | Rp 1.850.000 (Smt 5-8).
  - *Fakultas Humaniora*:
    - Sarjana Akuntansi: Rp 2.100.000 (Smt 1-4) | Rp 1.750.000 (Smt 5-8).
    - Sarjana Hukum: Rp 2.100.000 (Smt 1-4) | Rp 1.750.000 (Smt 5-8).
    - Sarjana Manajemen: Rp 2.100.000 (Smt 1-4) | Rp 1.750.000 (Smt 5-8).
    - Sarjana Pendidikan Bahasa Inggris: Rp 1.000.000 (Smt 1-4) | Rp 850.000 (Smt 5-8).
- **Tabel Biaya Kelas Karyawan (Per Trimester)**:
  - FST (Teknologi Informasi, Teknik Industri, Sistem Informasi): Rp 2.000.000 / Trimester.
  - FH (Akuntansi, Hukum, Manajemen): Rp 2.000.000 / Trimester.
  - FH (Pendidikan Bahasa Inggris): Rp 1.000.000 / Trimester.
- Tombol aksi `Lihat Rincian Lengkap & Simulasi Angsuran` di setiap baris tabel yang mengarah ke `/biaya-pendidikan/[slug]`.

#### 2.12 Rute `/biaya-pendidikan/[slug]` (Simulasi Biaya & Angsuran per Program Studi)
Halaman khusus per prodi untuk simulasi rincian angsuran pembiayaan (mengadopsi rincian detail seperti halaman biaya prodi UMBJM).
- **Header Program Studi Terkait**: Nama jurusan, jenjang, dan skema pembiayaan terpilih.
- **Matriks Pembagian Angsuran per Semester**:
  - Penjelasan opsi pembayaran: Dapat dibayarkan penuh per semester atau diangsur 2 kali tiap semester (skema trimester).
  - Jadwal waktu jatuh tempo pembayaran (bulan pembayaran ganjil: Agustus & November, bulan pembayaran genap: Februari & Mei).
- **Komponen Biaya yang Sudah Termasuk**: Keterangan cakupan biaya (SPP, praktikum, infaq/fasilitas, ujian).
- **Call-to-Action Pendaftaran Langsung**: Tombol `Daftar Prodi Ini` dan `Konsultasi Angsuran via WhatsApp`.

#### 2.13 Rute `/beasiswa` (Skema Bantuan Finansial & Beasiswa)
Halaman komprehensif seluruh program beasiswa dan bantuan biaya kuliah di Universitas Sari Mulia.
- **Katalog Kartu Skema Beasiswa**:
  1. *Kartu Indonesia Pintar (KIP Kuliah)*: Bantuan Kemendiktisaintek 100% bebas biaya kuliah Semester 1 s.d 8 + uang saku bulanan. Syarat penghasilan keluarga maksimal Rp 750.000 per jiwa, bukan anak ASN/TNI/Polri.
  2. *Beasiswa UNISM Cerdas*: Bantuan internal UNISM 50% biaya perkuliahan bagi calon mahasiswa berprestasi dengan keterbatasan ekonomi atau pendaftar tidak lolos KIP.
  3. *Beasiswa UNISM Sejahtera*: Subsidi 50% biaya perkuliahan khusus bagi putra-putri pegawai tetap Universitas Sari Mulia.
  4. *Beasiswa Yayasan Indah*: Beasiswa penuh 100% seluruh biaya pendidikan selama masa studi bagi mahasiswa tidak mampu dengan penghasilan keluarga maksimal Rp 500.000 per jiwa.
  5. *Beasiswa Tahfiz Qur'an*: Subsidi biaya kuliah 50% bagi penghafal Al-Qur'an bersertifikat resmi.
  6. *Beasiswa Pemerintah Daerah (PEMDA)*: Beasiswa penuh 100% hasil kerjasama antara UNISM dengan Pemerintah Daerah mitra (contoh: beasiswa kabupaten/kota di Kalimantan Selatan).
  7. *Beasiswa Prestasi Akademik*: Potongan biaya pendaftaran Rp 150.000 dan potongan biaya registrasi ulang Rp 750.000 bagi ranking 10 besar atau nilai rapor rata-rata minimal 80.
  8. *Beasiswa Prestasi Non-Akademik*: Gratis biaya pendaftaran dan potongan DPP Rp 750.000 bagi peraih juara kompetisi minimal tingkat Kabupaten/Kota.
- **Panduan Berkas Administratif Beasiswa**: Daftar dokumen yang wajib disiapkan (SKTM dari kelurahan, slip gaji/penghasilan orang tua, sertifikat kejuaraan/tahfiz, KTP & KK).
- **FAQ Beasiswa**: Pertanyaan umum mengenai seleksi, masa berlaku beasiswa, dan syarat mempertahankan IPK.

#### 2.14 Rute `/fasilitas-dan-kampus` (Dokumentasi Sarana & Prasarana)
Halaman dokumentasi visual dan sarana pendukung akademik UNISM.
- **Galeri Foto Kampus & Laboratorium Terpadu**:
  - Foto Gedung Utama & Beranda Depan UNISM.
  - Laboratorium Keperawatan, Kebidanan, dan Farmasi berstandar klinik.
  - Laboratorium Komputer, Jaringan, dan Rekayasa Perangkat Lunak.
  - Perpustakaan terakreditasi dengan koleksi literatur fisik dan e-library.
  - Auditorium serbaguna dan sarana kegiatan kemahasiswaan.
- **Ulasan Lingkungan Kampus & Kehidupan Mahasiswa**:
  - Sekilas lingkungan kampus yang asri dan representatif di Kota Banjarmasin.
  - Aksesibilitas transportasi, asrama/tempat tinggal mahasiswa, dan fasilitas publik penunjang.

#### 2.15 Rute `/kontak-dan-lokasi` (Pusat Layanan, Rekening Resmi, & Navigasi Kampus)
Halaman informasi kontak langsung, legalitas rekening pembayaran, dan lokasi fisik universitas.
- **Informasi Kontak Helpdesk PMB**:
  - Jam operasional kantor admisi (Senin s.d Sabtu).
  - Nomor hotline telepon dan tautan WhatsApp resmi Admin PMB dengan pesan otomatis siap kirim.
  - Akun media sosial resmi (Instagram, TikTok, YouTube, Facebook).
- **Pengumuman Rekening Resmi Pembayaran SPMB**:
  - Penegasan nomor rekening resmi bank mitra atas nama `Universitas Sari Mulia`.
  - Peringatan waspada penipuan: UNISM tidak pernah menetapkan pembayaran ke nomor rekening perorangan atau atas nama pribadi.
- **Peta Lokasi & Navigasi Fisik**:
  - Alamat lengkap kampus UNISM di Banjarmasin, Kalimantan Selatan.
  - Peta interaktif tersemat (Google Maps embed) dengan tombol petunjuk arah (Get Directions).

---

### Rute Panel Pengelola (Admin Dashboard PMB)

Kelompok rute internal yang diproteksi oleh sesi NextAuth.js untuk mengelola master data katalog dan periode PMB. Seluruh tabel data wajib menggunakan **TanStack Table** (`@tanstack/react-table`) dan seluruh formulir wajib menggunakan **React Hook Form** dengan validasi **Zod** (`@hookform/resolvers/zod`) disertai pesan **invalid feedback** eksplisit pada setiap input:

#### 2.16 Rute `/admin/login` (Autentikasi Pengelola PMB)
Halaman masuk bagi staf admisi dan tim promosi:
- **Formulir Login**: Dibangun menggunakan React Hook Form dan divalidasi skema Zod `loginSchema` (validasi format email wajib dan password minimal 6 karakter).
- **Invalid Feedback Wajib**: Menampilkan pesan kesalahan tepat di bawah masing-masing kolom input saat validasi gagal (contoh: teks merah "Format email tidak valid" atau "Password minimal 6 karakter").
- Proteksi brute force sederhana dan redirect otomatis ke `/admin/dashboard` saat sesi login berhasil diverifikasi.

#### 2.17 Rute `/admin/dashboard` (Ringkasan Status & Master Data)
Halaman utama panel pengelola:
- **Kartu Indikator Periode Aktif**: Menampilkan nama tahun akademik yang sedang tayang ke publik (contoh: `TA 2027/2028`), status aktif, dan rentang tanggal pendaftaran.
- **Kartu Statistik Ringkas**: Jumlah prodi terdaftar, total fakultas aktif, jumlah jalur penerimaan, dan jumlah program beasiswa yang aktif.
- **Aksi Cepat (Quick Actions)**: Tombol pintas untuk berganti periode aktif, memperbarui tabel biaya, atau menambah prodi baru.

#### 2.18 Rute `/admin/periods` (Kelola Periode Akademik & Toggle Aktif)
Halaman manajemen tahun akademik PMB:
- **Tabel Periode (TanStack Table)**: Menampilkan kolom Tahun Akademik, Nama Periode, Tanggal Mulai, Tanggal Selesai, Status (Aktif / Nonaktif), dan Aksi dengan fitur sorting tanggal dan paginasi.
- **Formulir Tambah/Edit Periode**: Modal form berbasis React Hook Form dan Zod `periodSchema`. Seluruh input (tahun akademik, nama periode, tanggal buka, tanggal tutup) memiliki invalid feedback visual.
- **Toggle Periode Aktif (Switch Button)**: Aksi instan untuk menetapkan periode mana yang menjadi tampilan default katalog publik (mengubah flag `isActive: true` dan menonaktifkan periode lainnya).

#### 2.19 Rute `/admin/tuitions` (Kelola Biaya Trimester per Periode & Prodi)
Halaman pembaruan struktur biaya kuliah:
- **Filter Periode Akademik**: Dropdown pemilih periode aktif yang disinkronkan via Zustand store.
- **Tabel Tarif Trimester (TanStack Table)**: Menampilkan daftar prodi, fakultas, nominal tahap awal (Semester 1 s.d 4), nominal tahap lanjutan (Semester 5 s.d 8), dilengkapi fitur pencarian instan nama prodi dan sorting biaya.
- **Formulir Sunting Biaya**: Modal form berbasis React Hook Form dan Zod `tuitionFeeSchema` dengan format angka mata uang otomatis. Invalid feedback wajib muncul jika nilai nominal negatif atau kosong.

#### 2.20 Rute `/admin/programs` (Kelola Program Studi & Akreditasi)
Halaman pemeliharaan direktori prodi:
- **Tabel Program Studi (TanStack Table)**: Kolom Nama Prodi, Fakultas, Jenjang, Gelar, Akreditasi, dan Status Kelas (Reguler, Karyawan, RPL) dengan filter fakultas terintegrasi.
- **Formulir Sunting Prodi**: Form dialog berbasis React Hook Form dan Zod `studyProgramSchema` untuk memperbarui deskripsi perkuliahan, array prospek kerja, dan peringkat akreditasi. Setiap field memiliki invalid feedback jika tidak memenuhi kriteria validasi.

#### 2.21 Rute `/admin/tracks` (Kelola Jalur Pendaftaran & Persyaratan)
Halaman pengaturan jalur penerimaan mahasiswa baru:
- **Tabel Jalur Seleksi (TanStack Table)**: Menampilkan nama jalur, tarif formulir (Kesehatan vs Non-Kesehatan), persentase potongan pendaftaran, potongan registrasi ulang, dan status pembebasan TPA.
- **Formulir Kelola Jalur & Syarat**: Form berbasis React Hook Form dan Zod `admissionTrackSchema` untuk menambah atau menyunting daftar berkas persyaratan wajib dan kriteria kelulusan, lengkap dengan pesan invalid feedback pada setiap kolom input.

---

### 3. Kebutuhan Non-Fungsional (Non-Functional Requirements)

#### 3.1 Performa & Mobile-First Loading
- **Skor Kinerja Lighthouse**: Target nilai minimal > 90 untuk kategori Performance, Accessibility, dan Best Practices pada audit Lighthouse versi mobile.
- **Metrik Web Vitals**:
  - First Contentful Paint (FCP) < 1.5 detik pada koneksi seluler 4G standar.
  - Largest Contentful Paint (LCP) < 2.5 detik.
  - Cumulative Layout Shift (CLS) < 0.1 untuk mencegah pergeseran layout saat gambar dimuat.
- **Responsivitas Perangkat**: Tata letak diuji presisi dari ukuran layar smartphone terkecil (360px), tablet (768px), laptop (1024px), hingga layar desktop lebar (1440px+).

#### 3.2 Aksesibilitas (A11y) & Standar Desain Antislop
- **Kontras Warna WCAG 2.1 Level AA**: Seluruh teks judul dan bodi wajib memiliki rasio kontras minimal 4.5:1 terhadap latar belakang (dan 3:1 untuk teks berukuran 18px ke atas). Dilarang menggunakan teks abu-abu pudar di atas latar abu-abu muda.
- **Navigasi Keyboard Penuh**: Seluruh tombol, tautan, tab filter, dan dialog modal dapat dioperasikan penuh menggunakan tombol `Tab`, `Shift+Tab`, `Enter`, `Space`, dan `Escape`.
- **Indikator Fokus Terlihat**: Tidak menghilangkan outline fokus tanpa pengganti indikator fokus kustom yang jelas.
- **Kelengkapan State Komponen**: Setiap komponen penampil data wajib memiliki 3 status terdefinisi:
  - *Loading State*: Kerangka animasi pemuatan data yang rapi (Skeleton loader).
  - *Empty State*: Tampilan informatif ketika filter pencarian tidak menemukan hasil.
  - *Error State*: Pesan kendala yang jelas dengan tombol muat ulang data.
- **Integritas Penulisan & Tipografi**: Menghindari karakter em dash (`—`) dalam seluruh naskah antarmuka, menghindari istilah klise pemasaran AI generik, serta menggunakan bahasa Indonesia yang lugas dan komunikatif.

#### 3.3 Penanganan Format Gambar & Aset Visual
- **Pipeline Konversi Aset**: Seluruh foto program studi berformat `.heif` pada folder referensi dikonversi menjadi format `.webp` berkualitas tinggi dan terkompresi sebelum ditempatkan di direktori publik.
- **Komponen Gambar Next.js**: Seluruh gambar dimuat melalui komponen `next/image` dengan penentuan dimensi eksplisit (`width`, `height`), properti `alt` deskriptif untuk aksesibilitas, dan atribut `priority` khusus untuk elemen gambar hero LCP.

#### 3.4 Keamanan Data & Peringatan Rekening Resmi
- **Transparansi Transaksi & Anti-Penipuan**: Penempatan peringatan rekening resmi SPMB institusi (bank resmi atas nama `Universitas Sari Mulia`) di tempat strategis untuk melindungi calon mahasiswa dari modus penipuan rekening pribadi.
- **Proteksi Akses Data**: Operasi database via Prisma Client berjalan eksklusif pada runtime server (RSC / Server Actions) tanpa mengekspos kredensial koneksi database MySQL ke sisi klien browser.

---

### 4. Integrasi Eksternal & Tautan Resmi

#### 4.1 Portal Pendaftaran SPMB Online
- Tautan tombol pendaftaran utama diatur secara dinamis melalui Environment Variable `NEXT_PUBLIC_SPMB_URL`.
- Membuka halaman pendaftaran resmi SPMB UNISM pada tab baru (`target="_blank"` dengan rel `noopener noreferrer`).

#### 4.2 Direct-Link Konsultasi WhatsApp PMB
- Tautan WhatsApp dikelola melalui Environment Variable `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Dilengkapi parameter teks pesan awal otomatis (pre-filled text) yang ramah dan relevan, seperti: *"Halo Admin PMB UNISM, saya ingin berkonsultasi mengenai pendaftaran mahasiswa baru."*

#### 4.3 Integrasi Peta Lokasi Kampus
- Integrasi peta lokasi kampus Universitas Sari Mulia di Banjarmasin melalui sematan Google Maps responsif yang aman dan ringan.
- Menyediakan tombol pintas eksternal untuk membuka aplikasi Google Maps navigasi langsung di perangkat pengguna.

---

### 5. Metrik Keberhasilan & Kriteria Penerimaan (Acceptance Criteria)

#### 5.1 Kriteria Penerimaan Teknis (Definition of Done)
1. **Build & Type Checking**: Perintah `npm run build` berhasil dijalankan tanpa galat TypeScript (`tsc`), linting ESLint, maupun peringatan bundle fatal.
2. **Database Migration & Seeding**: Skema Prisma termigrasi sukses ke database MySQL, dan script seeding berhasil mengisi data lengkap 4 fakultas, 15+ program studi, tabel biaya per-trimester TA 2027/2028, 10 jalur pendaftaran, dan skema beasiswa.
3. **Ketersediaan Seluruh Rute**: Seluruh 15 rute katalog publik dan 6 rute admin dashboard yang didefinisikan dapat diakses secara langsung melalui URL dan navigasi menu tanpa menghasilkan halaman 404.
4. **Proteksi & Autentikasi Admin**: Middleware memverifikasi sesi login secara ketat; akses ke `/admin/*` tanpa sesi otomatis diarahkan ke `/admin/login`, dan pengubahan flag periode aktif langsung berdampak real-time pada tampilan katalog publik.
5. **Fungsionalitas Komponen Penuh (Zero Dead Controls)**: Setiap tombol, tab filter, dropdown prodi, form admin, dan kartu navigasi berfungsi semestinya. Tidak ada tombol mati yang tidak melakukan aksi apa pun.
6. **Kalkulator Biaya Interaktif**: Berfungsi menghitung simulasi biaya per-trimester dan total tahunan secara presisi sesuai data nominal resmi periode aktif.
7. **Standar Tabel Admin (TanStack Table)**: Seluruh tabel data di modul admin dibangun menggunakan `@tanstack/react-table` dengan fungsi sorting kolom, filtering pencarian, dan pagination yang berjalan mulus.
8. **Validasi Formulir & State (React Hook Form, Zod, & Zustand)**: Seluruh input pada form admin dan autentikasi dikelola oleh React Hook Form dengan validasi skema Zod, wajib memunculkan teks invalid feedback berwarna merah saat input tidak valid, serta memanfaatkan Zustand untuk sinkronisasi state antarmuka klien.

#### 5.2 Key Performance Indicators (KPI)
1. **Akurasi Data 100%**: Tidak ada kesalahan pencantuman nominal biaya per-trimester, nama prodi, maupun persyaratan berkas dibandingkan dokumen referensi resmi TA 2027/2028.
2. **Kenyamanan Akses Mobile**: Pengguna ponsel dapat menemukan rincian prodi, simulasi biaya, dan nomor kontak PMB dalam waktu kurang dari 30 detik sejak halaman pertama dimuat.
3. **Konversi Informasi**: Memudahkan akses calon pendaftar langsung menuju formulir online dan kontak WhatsApp resmi.
