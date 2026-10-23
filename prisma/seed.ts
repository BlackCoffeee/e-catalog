/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding database PMB UNISM...');

  // 1. Bersihkan data lama jika ada
  await prisma.tuitionFee.deleteMany();
  await prisma.admissionTrack.deleteMany();
  await prisma.studyProgram.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.lectureProgram.deleteMany();
  await prisma.academicPeriod.deleteMany();
  await prisma.campusFacility.deleteMany();
  await prisma.scholarship.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Buat Periode Akademik Utama
  const period = await prisma.academicPeriod.create({
    data: {
      academicYear: '2027/2028',
      name: 'Penerimaan Mahasiswa Baru TA 2027/2028',
      isActive: true,
      startDate: new Date('2026-11-01'),
      endDate: new Date('2027-08-31'),
      notes: 'Periode pendaftaran mahasiswa baru tahun akademik 2027/2028 dengan skema pembiayaan per-trimester.',
    },
  });

  // 3. Buat 3 Pilar Program Perkuliahan (LectureProgram)
  const reguler = await prisma.lectureProgram.create({
    data: {
      slug: 'reguler',
      name: 'Reguler',
      description: 'Program perkuliahan tatap muka penuh waktu bagi lulusan SMA/SMK/MA sederajat.',
    },
  });

  const rpl = await prisma.lectureProgram.create({
    data: {
      slug: 'rpl',
      name: 'RPL (Rekognisi Pembelajaran Lampau)',
      description: 'Program pengakuan capaian pembelajaran atau alih jenjang (D3 ke S1) bagi praktisi dan tenaga kerja berpengalaman.',
    },
  });

  const kip = await prisma.lectureProgram.create({
    data: {
      slug: 'kip',
      name: 'KIP Kuliah',
      description: 'Program bantuan biaya pendidikan penuh dari pemerintah untuk mahasiswa berprestasi dengan keterbatasan ekonomi.',
    },
  });

  // 4. Buat 4 Fakultas Resmi UNISM
  const fst = await prisma.faculty.create({
    data: {
      slug: 'sains-dan-teknologi',
      name: 'Fakultas Sains & Teknologi',
      code: 'FST',
      description: 'Fakultas unggulan yang mencetak profesional di bidang teknologi informasi, rekayasa industri, dan sistem komputasi modern.',
      colorTheme: '#0284C7',
    },
  });

  const fk = await prisma.faculty.create({
    data: {
      slug: 'kesehatan',
      name: 'Fakultas Kesehatan',
      code: 'FK',
      description: 'Fakultas pelopor tenaga kesehatan profesional di bidang farmasi, keperawatan, kebidanan, dan promosi kesehatan.',
      colorTheme: '#059669',
    },
  });

  const fh = await prisma.faculty.create({
    data: {
      slug: 'humaniora',
      name: 'Fakultas Humaniora',
      code: 'FH',
      description: 'Fakultas yang mengembangkan ilmu manajemen, akuntansi, hukum, dan pendidikan bahasa berdaya saing global.',
      colorTheme: '#D97706',
    },
  });

  const fkhb = await prisma.faculty.create({
    data: {
      slug: 'kedokteran-hewan-dan-biosains',
      name: 'Fakultas Kedokteran Hewan & Biosains',
      code: 'FKHB',
      description: 'Fakultas yang berfokus pada biosains medis, kesehatan satwa, dan bioteknologi tropis berkelanjutan.',
      colorTheme: '#7C3AED',
    },
  });

  // 5. Buat 15 Program Studi & Biaya Per-Trimester Resmi
  const prodis = [
    // FST
    {
      facultyId: fst.id,
      name: 'Sarjana Teknologi Informasi',
      slug: 'sarjana-teknologi-informasi',
      degreeLevel: 'S1',
      degreeTitle: 'S.Kom',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Program studi yang mendidik mahasiswa menguasai rekayasa perangkat lunak, sistem komputasi awan, kecerdasan buatan, dan keamanan siber.',
      careerProspects: ['Software Engineer', 'Full Stack Developer', 'Cloud Architect', 'Cyber Security Analyst', 'IT Consultant'],
      imageCover: '/assets/programs/sarjana-teknologi-informasi.png',
      tuitions: [
        { track: 'REGULAR', early: 2200000, late: 2400000, notes: 'Kelas Reguler Pagi' },
        { track: 'EMPLOYEE', early: 2500000, late: 2700000, notes: 'Kelas Karyawan / Malam' },
        { track: 'RPL', early: 2200000, late: 2200000, notes: 'Alih Jenjang D3 ke S1' },
      ],
    },
    {
      facultyId: fst.id,
      name: 'Sarjana Sistem Informasi',
      slug: 'sarjana-sistem-informasi',
      degreeLevel: 'S1',
      degreeTitle: 'S.Kom',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Fokus pada tata kelola sistem informasi perusahaan, analisis data bisnis cerdas (business intelligence), dan transformasi digital organisasi.',
      careerProspects: ['Business Analyst', 'Data Analyst', 'ERP Specialist', 'Product Manager', 'IS Auditor'],
      imageCover: '/assets/programs/sarjana-sistem-informasi.png',
      tuitions: [
        { track: 'REGULAR', early: 2200000, late: 2400000, notes: 'Kelas Reguler Pagi' },
        { track: 'EMPLOYEE', early: 2500000, late: 2700000, notes: 'Kelas Karyawan / Malam' },
      ],
    },
    {
      facultyId: fst.id,
      name: 'Sarjana Teknik Industri',
      slug: 'sarjana-teknik-industri',
      degreeLevel: 'S1',
      degreeTitle: 'S.T',
      studyDurationYears: 4.0,
      accreditation: 'Baik',
      description: 'Mempersiapkan sarjana teknik yang mahir mengoptimalkan sistem manufaktur, rantai pasok (supply chain), ergonomi kerja, dan manajemen mutu.',
      careerProspects: ['Production Planner', 'Quality Assurance Engineer', 'Supply Chain Analyst', 'Plant Manager', 'Ergonomics Consultant'],
      imageCover: '/assets/programs/sarjana-teknik-industri.png',
      tuitions: [
        { track: 'REGULAR', early: 2300000, late: 2500000, notes: 'Kelas Reguler Pagi' },
        { track: 'EMPLOYEE', early: 2600000, late: 2800000, notes: 'Kelas Karyawan / Malam' },
      ],
    },

    // FK (Kesehatan)
    {
      facultyId: fk.id,
      name: 'Sarjana Farmasi',
      slug: 'sarjana-farmasi',
      degreeLevel: 'S1',
      degreeTitle: 'S.Farm',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Pendidikan kefarmasian komprehensif mencakup farmasi klinis, formulasi obat herbal & kimia, manajemen instalasi farmasi rumah sakit, dan regulasi industri farmasi.',
      careerProspects: ['Apoteker Rumah Sakit', 'Formulator Industri Farmasi', 'Quality Control Specialist', 'Peneliti Bahan Alam', 'Regulatory Affairs Officer'],
      imageCover: '/assets/programs/sarjana-farmasi.png',
      tuitions: [
        { track: 'REGULAR', early: 3200000, late: 3500000, notes: 'Biaya per-trimester sudah mencakup laboratorium terpadu' },
      ],
    },
    {
      facultyId: fk.id,
      name: 'Sarjana Keperawatan',
      slug: 'sarjana-keperawatan',
      degreeLevel: 'S1',
      degreeTitle: 'S.Kep',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Mencetak perawat profesional berstandar internasional dengan keunggulan keperawatan gawat darurat, gerontik, dan layanan holistik klinis.',
      careerProspects: ['Perawat Rumah Sakit', 'Clinical Nurse Specialist', 'Perawat Kesehatan Kerja', 'Dosen Keperawatan', 'Healthcare Manager'],
      imageCover: '/assets/programs/sarjana-keperawatan.png',
      tuitions: [
        { track: 'REGULAR', early: 2800000, late: 3000000, notes: 'Kelas Reguler Terakreditasi LAM-PTKes' },
        { track: 'RPL', early: 2800000, late: 2800000, notes: 'Jalur Alih Jenjang dari D3 Keperawatan' },
      ],
    },
    {
      facultyId: fk.id,
      name: 'Sarjana Kebidanan',
      slug: 'sarjana-kebidanan',
      degreeLevel: 'S1',
      degreeTitle: 'S.Keb',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Mendidik bidan akademik dan praktisi dalam asuhan kebidanan fisiologis, deteksi dini patologis ibu & anak, konseling laktasi, dan kesehatan reproduksi komprehensif.',
      careerProspects: ['Bidan Praktisi Mandiri', 'Bidan Rumah Sakit & Puskesmas', 'Konselor ASI & Reproduksi', 'Pendidik Kebidanan'],
      imageCover: '/assets/programs/sarjana-kebidanan.png',
      tuitions: [
        { track: 'REGULAR', early: 2700000, late: 2900000, notes: 'Reguler S1 Kebidanan' },
        { track: 'RPL', early: 2700000, late: 2700000, notes: 'Alih Jenjang D3 Kebidanan ke S1 Kebidanan' },
      ],
    },
    {
      facultyId: fk.id,
      name: 'Diploma Tiga Kebidanan',
      slug: 'diploma-tiga-kebidanan',
      degreeLevel: 'D3',
      degreeTitle: 'A.Md.Keb',
      studyDurationYears: 3.0,
      accreditation: 'Unggul',
      description: 'Pendidikan vokasi kebidanan dengan jam praktik intensif di klinik bersalin, puskesmas, dan rumah sakit mitra terkemuka Kalimantan Selatan.',
      careerProspects: ['Bidan Pelaksana Rumah Sakit', 'Bidan Puskesmas', 'Asisten Pelayanan Kebidanan Mandiri'],
      imageCover: '/assets/programs/diploma-tiga-kebidanan.png',
      tuitions: [
        { track: 'REGULAR', early: 2300000, late: 2400000, notes: 'Program Vokasi 3 Tahun Siap Kerja' },
      ],
    },
    {
      facultyId: fk.id,
      name: 'Sarjana Terapan Promosi Kesehatan',
      slug: 'sarjana-terapan-promosi-kesehatan',
      degreeLevel: 'D4',
      degreeTitle: 'S.Tr.Kes',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Pendidikan sarjana terapan yang membekali keahlian advokasi kebijakan publik, komunikasi risiko kesehatan, pemberdayaan masyarakat, dan manajemen kampanye gaya hidup sehat.',
      careerProspects: ['Penyuluh Kesehatan Masyarakat', 'Health Communication Specialist', 'Sanitarian & Promotor Kesehatan', 'Program Officer LSM Kesehatan'],
      imageCover: '/assets/programs/sarjana-terapan-promosi-kesehatan.png',
      tuitions: [
        { track: 'REGULAR', early: 2100000, late: 2300000, notes: 'Kelas Reguler Vokasi Terapan' },
      ],
    },

    // FH (Humaniora)
    {
      facultyId: fh.id,
      name: 'Sarjana Manajemen',
      slug: 'sarjana-manajemen',
      degreeLevel: 'S1',
      degreeTitle: 'S.M',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Mengembangkan kompetensi kepemimpinan bisnis, manajemen pemasaran digital, keuangan korporat, dan kewirausahaan rintisan (*startup entrepreneurship*).',
      careerProspects: ['Marketing Executive', 'Financial Analyst', 'HR Generalist', 'Business Development Manager', 'Wirausahawan'],
      imageCover: '/assets/programs/sarjana-manajemen.png',
      tuitions: [
        { track: 'REGULAR', early: 2000000, late: 2200000, notes: 'Kelas Reguler Siang' },
        { track: 'EMPLOYEE', early: 2300000, late: 2500000, notes: 'Kelas Karyawan / Fleksibel' },
      ],
    },
    {
      facultyId: fh.id,
      name: 'Sarjana Akuntansi',
      slug: 'sarjana-akuntansi',
      degreeLevel: 'S1',
      degreeTitle: 'S.Ak',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Mendidik akuntan masa depan yang mahir dalam akuntansi keuangan, audit forensik, perpajakan digital, dan implementasi sistem software akuntansi modern.',
      careerProspects: ['Auditor Kantor Akuntan Publik', 'Tax Consultant', 'Corporate Accountant', 'Internal Control Specialist', 'Finance Officer'],
      imageCover: '/assets/programs/sarjana-akuntansi.png',
      tuitions: [
        { track: 'REGULAR', early: 2000000, late: 2200000, notes: 'Kelas Reguler Siang' },
        { track: 'EMPLOYEE', early: 2300000, late: 2500000, notes: 'Kelas Karyawan / Fleksibel' },
      ],
    },
    {
      facultyId: fh.id,
      name: 'Sarjana Hukum',
      slug: 'sarjana-hukum',
      degreeLevel: 'S1',
      degreeTitle: 'S.H',
      studyDurationYears: 4.0,
      accreditation: 'Baik Sekali',
      description: 'Membekali pemahaman mendalam tentang hukum bisnis, hukum pidana, tata kelola pemerintahan, hukum perdata, dan kemahiran litigasi advokasi peradilan.',
      careerProspects: ['Advokat / Konsultan Hukum', 'Legal Corporate Officer', 'Jaksa / Hakim', 'Notaris / PPAT', 'Staf Ahli Regulasi Publik'],
      imageCover: '/assets/programs/sarjana-hukum.png',
      tuitions: [
        { track: 'REGULAR', early: 2100000, late: 2300000, notes: 'Kelas Reguler Siang' },
        { track: 'EMPLOYEE', early: 2400000, late: 2600000, notes: 'Kelas Karyawan / Fleksibel' },
      ],
    },
    {
      facultyId: fh.id,
      name: 'Sarjana Pendidikan Bahasa Inggris',
      slug: 'sarjana-pendidikan-bahasa-inggris',
      degreeLevel: 'S1',
      degreeTitle: 'S.Pd',
      studyDurationYears: 4.0,
      accreditation: 'Baik',
      description: 'Mempersiapkan pendidik bahasa Inggris berwawasan global, penerjemah profesional, serta instruktur komunikasi korporat berstandar kompetensi internasional.',
      careerProspects: ['Guru / Pengajar Bahasa Inggris', 'Penerjemah & Interpreter', 'Content Writer & Editor', 'Instructional Designer'],
      imageCover: '/assets/programs/sarjana-pendidikan-bahasa-inggris.png',
      tuitions: [
        { track: 'REGULAR', early: 1900000, late: 2100000, notes: 'Kelas Reguler Pilihan' },
      ],
    },

    // FKHB
    {
      facultyId: fkhb.id,
      name: 'Sarjana Kedokteran Hewan',
      slug: 'sarjana-kedokteran-hewan',
      degreeLevel: 'S1',
      degreeTitle: 'S.K.H',
      studyDurationYears: 4.0,
      accreditation: 'Terakreditasi',
      description: 'Pendidikan medik veteriner yang berfokus pada pencegahan penyakit zoonosis, kesehatan satwa liar tropis, klinik hewan domestik, dan ketahanan pangan asal hewan.',
      careerProspects: ['Dokter Hewan Praktisi', 'Veterinary Quarantine Officer', 'Peneliti Biosains Medis', 'Konsultan Peternakan Modern'],
      imageCover: '/assets/programs/sarjana-terapan-promosi-kesehatan.png',
      tuitions: [
        { track: 'REGULAR', early: 3500000, late: 3800000, notes: 'Tahap Sarjana Kedokteran Hewan' },
      ],
    },
    {
      facultyId: fkhb.id,
      name: 'Pendidikan Profesi Dokter Hewan',
      slug: 'pendidikan-profesi-dokter-hewan',
      degreeLevel: 'PROFESI',
      degreeTitle: 'drh',
      studyDurationYears: 1.5,
      accreditation: 'Terakreditasi',
      description: 'Program ko-asistensi profesi medik veteriner langsung di Rumah Sakit Hewan dan balai karantina kesehatan hewan nasional.',
      careerProspects: ['Dokter Hewan Berizin Praktik Mandiri', 'Kepala Rumah Sakit Hewan', 'Veteriner Industri Obat Hewan'],
      imageCover: '/assets/programs/sarjana-terapan-promosi-kesehatan.png',
      tuitions: [
        { track: 'PROFESSION_REGULAR', early: 4200000, late: 4200000, notes: 'Biaya Program Profesi per-trimester' },
      ],
    },
    {
      facultyId: fk.id,
      name: 'Pendidikan Profesi Ners',
      slug: 'pendidikan-profesi-ners',
      degreeLevel: 'PROFESI',
      degreeTitle: 'Ners',
      studyDurationYears: 1.0,
      accreditation: 'Baik Sekali',
      description: 'Program tahap profesi keperawatan komprehensif bagi lulusan S.Kep di rumah sakit tipe A dan B di Kalimantan Selatan.',
      careerProspects: ['Perawat Spesialis Rumah Sakit', 'Clinical Preceptor', 'International Healthcare Worker'],
      imageCover: '/assets/programs/sarjana-keperawatan.png',
      tuitions: [
        { track: 'PROFESSION_REGULAR', early: 3000000, late: 3000000, notes: 'Program Profesi 1 Tahun (3 Trimester)' },
      ],
    },
  ];

  for (const item of prodis) {
    const { tuitions, ...prodiData } = item;
    const studyProgram = await prisma.studyProgram.create({
      data: {
        ...prodiData,
        lecturePrograms: {
          connect: [{ id: reguler.id }, { id: rpl.id }, { id: kip.id }],
        },
      },
    });

    for (const t of tuitions) {
      await prisma.tuitionFee.create({
        data: {
          periodId: period.id,
          studyProgramId: studyProgram.id,
          trackCategory: t.track,
          earlyTrimesterFee: t.early,
          lateTrimesterFee: t.late,
          notes: t.notes,
        },
      });
    }
  }

  // 6. Buat Jalur Pendaftaran Aktif
  await prisma.admissionTrack.createMany({
    data: [
      {
        periodId: period.id,
        slug: 'jalur-umum',
        name: 'Jalur Reguler Umum',
        category: 'REGULAR',
        description: 'Jalur seleksi penerimaan reguler berbasis tes potensi akademik dan wawancara prodi bagi lulusan SMA/SMK sederajat.',
        requiresExam: true,
        requiresInterview: true,
        registrationFee: 500000,
        reRegistrationDiscount: 0,
        requirements: ['Scan KTP / Kartu Pelajar', 'Scan Ijazah atau Surat Keterangan Lulus (SKL)', 'Pas Foto Warna Terbaru', 'Scan Kartu Keluarga'],
        isOpen: true,
      },
      {
        periodId: period.id,
        slug: 'jalur-unism-cerdas',
        name: 'Jalur UNISM Cerdas (Prestasi)',
        category: 'NON_REGULAR',
        description: 'Jalur khusus bebas biaya tes bagi siswa berprestasi peringkat 1 sampai 10 di kelas atau peraih juara olimpiade/kejuaraan resmi.',
        requiresExam: false,
        requiresInterview: true,
        registrationFee: 0,
        reRegistrationDiscount: 750000,
        requirements: ['Sertifikat / Piagam Prestasi Minimal Tingkat Kabupaten/Kota', 'Raport Semester 1 sampai 5 Terlegalisir', 'Surat Rekomendasi Kepala Sekolah', 'Scan KTP & Kartu Keluarga'],
        isOpen: true,
      },
      {
        periodId: period.id,
        slug: 'jalur-kip-kuliah',
        name: 'Jalur KIP Kuliah (Pemerintah)',
        category: 'NON_REGULAR',
        description: 'Jalur bantuan kuliah gratis penuh dari Kemendikbudristek untuk calon mahasiswa berprestasi dari keluarga prasejahtera.',
        requiresExam: true,
        requiresInterview: true,
        registrationFee: 0,
        reRegistrationDiscount: 0,
        requirements: ['Kartu Indonesia Pintar (KIP) atau Terdata di DTKS Kemensos', 'Surat Keterangan Penghasilan Orang Tua', 'Foto Rumah Tampak Depan dan Ruang Keluarga', 'Kartu Peserta KIP Kuliah Kemendikbud'],
        isOpen: true,
      },
      {
        periodId: period.id,
        slug: 'jalur-undangan-mitra',
        name: 'Jalur Undangan Sekolah Mitra',
        category: 'NON_REGULAR',
        description: 'Jalur khusus bagi siswa sekolah mitra binaan Universitas Sari Mulia dengan potongan biaya formulir dan pendaftaran instan.',
        requiresExam: false,
        requiresInterview: true,
        registrationFee: 250000,
        reRegistrationDiscount: 500000,
        requirements: ['Surat Undangan Sosialisasi PMB UNISM', 'Salinan Raport Semester 1 sampai 4', 'Scan KTP / Kartu Identitas Pelajar'],
        isOpen: true,
      },
    ],
  });

  // 7. Buat Data Fasilitas Kampus
  await prisma.campusFacility.createMany({
    data: [
      {
        name: 'Gedung Rektorat & Layanan PMB Terpadu',
        category: 'CAMPUS_BUILDING',
        description: 'Pusat administrasi kampus dan loket pelayanan terpadu bagi orang tua dan calon mahasiswa baru.',
        imageUrl: '/assets/hero-campus.png',
      },
      {
        name: 'Laboratorium Komputer & Komputasi Awan FST',
        category: 'LABORATORY',
        description: 'Fasilitas komputasi berkecepatan tinggi untuk praktikum rekayasa perangkat lunak, sistem basis data, dan kecerdasan buatan.',
        imageUrl: '/assets/programs/sarjana-teknologi-informasi.png',
      },
      {
        name: 'Laboratorium Farmasi & Formulasi Bahan Alam',
        category: 'LABORATORY',
        description: 'Laboratorium steril dan analisis instrumen kimia untuk riset sediaan farmasi modern dan pengembangan obat tropis.',
        imageUrl: '/assets/programs/sarjana-farmasi.png',
      },
      {
        name: 'Mini Hospital & Laboratorium Keperawatan Kritis',
        category: 'LABORATORY',
        description: 'Simulasi ruang rawat inap dan unit gawat darurat rumah sakit dengan manikin medis terkomputerisasi.',
        imageUrl: '/assets/programs/sarjana-keperawatan.png',
      },
    ],
  });

  // 8. Buat Data Program Beasiswa
  await prisma.scholarship.createMany({
    data: [
      {
        slug: 'beasiswa-kip-kuliah',
        name: 'Beasiswa KIP Kuliah Merdeka',
        providerType: 'PEMERINTAH_KIP',
        coverage: 'Bebas Biaya Kuliah Penuh 8 Semester & Uang Saku Bulanan',
        description: 'Program bantuan biaya pendidikan tinggi dari Pemerintah Republik Indonesia melalui Kemendikbudristek.',
        requirements: ['Terdaftar di sistem KIP Kuliah Kemendikbud', 'Lulus seleksi berkas dan wawancara admisi', 'Memiliki potensi akademik baik'],
        isOpen: true,
      },
      {
        slug: 'beasiswa-yayasan-sari-mulia',
        name: 'Beasiswa Yayasan Indah Banjarmasin',
        providerType: 'YAYASAN',
        coverage: 'Potongan Biaya Kuliah dan Dana Pengembangan Pendidikan (DPP) Hingga 50%',
        description: 'Bantuan biaya pendidikan dari Yayasan Indah bagi putra-putri berprestasi di wilayah Kalimantan Selatan dan Tengah.',
        requirements: ['Rata-rata nilai rapor minimal 82.00', 'Surat keterangan kelakuan baik dari sekolah asal', 'Aktif dalam organisasi kepemudaan'],
        isOpen: true,
      },
      {
        slug: 'beasiswa-tahfiz-quran',
        name: 'Beasiswa Hafiz / Penghafal Al-Quran',
        providerType: 'PRESTASI',
        coverage: 'Bebas Biaya Pendidikan Penuh dan Jalur Bebas Tes Masuk',
        description: 'Apresiasi universitas bagi generasi muda penghafal Al-Quran minimal 10 Juz.',
        requirements: ['Sertifikat / Ijazah Tahfiz resmi dari lembaga berwenang', 'Lulus uji hafalan tasmi oleh tim verifikasi UNISM'],
        isOpen: true,
      },
    ],
  });

  // 9. Buat Akun Admin Awal
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      name: 'Administrator PMB UNISM',
      email: 'admin@unism.ac.id',
      password: passwordHash,
      role: 'SUPERADMIN',
    },
  });

  console.log('Seeding database PMB UNISM selesai dengan sukses!');
}

main()
  .catch((e) => {
    console.error('Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
