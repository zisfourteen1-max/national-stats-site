// NusaData — data.js
// Satu-satunya tempat angka-angka situs ini disimpan.
// Setiap angka di bawah ini terverifikasi dari sumber yang tertulis
// (Bank Dunia / WDI dan BPS, lewat laporan media atas rilis BPS),
// dicek 26 November 2026. Jangan tambah angka baru tanpa sumber + tahun.

export const SOURCES = {
  wdi2025: 'Bank Dunia (WDI), 2025',
  wdi2024: 'Bank Dunia (WDI), 2024',
  bps2025: 'BPS, 2025',
  bpsNov2025: 'BPS, November 2025',
  bpsSep2025: 'BPS, September 2025',
  bpsMar2025: 'BPS, Maret 2025',
  bpsQ42025: 'BPS, Triwulan IV 2025',
  pemprov2026: 'Pemprov DKI / PP 49/2025, UMP 2026',
  bpsSpending2025: 'BPS 2025 (via GoodStats)',
  bpsSusenasSep2025: 'BPS Susenas, September 2025',
};

export const INDICATORS = [
  {
    id: 'penduduk', label: 'Jumlah penduduk', value: '285,72 jt',
    unit: 'jiwa', year: 2025, source: SOURCES.wdi2025,
    note: 'Peringkat 4 dari 217 negara.',
    section: 'penduduk',
  },
  {
    id: 'pertumbuhan-penduduk', label: 'Pertumbuhan penduduk', value: '0,78%',
    unit: 'per tahun', year: 2025, source: SOURCES.wdi2025,
    note: 'Laju tumbuh penduduk setahun terakhir.',
    section: 'penduduk',
  },
  {
    id: 'kepadatan', label: 'Kepadatan penduduk', value: '149,8',
    unit: 'jiwa/km²', year: 2024, source: SOURCES.wdi2024,
    note: 'Rata-rata jiwa per kilometer persegi.',
    section: 'penduduk',
  },
  {
    id: 'harapan-hidup', label: 'Harapan hidup saat lahir', value: '71,3',
    unit: 'tahun', year: 2024, source: SOURCES.wdi2024,
    note: 'Rata-rata usia yang diharapkan dicapai bayi baru lahir.',
    section: 'penduduk',
  },
  {
    id: 'fertilitas', label: 'Angka fertilitas total', value: '2,1',
    unit: 'anak/wanita', year: 2024, source: SOURCES.wdi2024,
    note: 'Rata-rata anak yang dilahirkan seorang wanita.',
    section: 'penduduk',
  },
  {
    id: 'kelahiran', label: 'Angka kelahiran kasar', value: '15,8',
    unit: 'per 1.000 penduduk', year: 2024, source: SOURCES.wdi2024,
    note: 'Kelahiran per 1.000 penduduk dalam setahun.',
    section: 'penduduk',
  },
  {
    id: 'kematian', label: 'Angka kematian kasar', value: '7,6',
    unit: 'per 1.000 penduduk', year: 2024, source: SOURCES.wdi2024,
    note: 'Kematian per 1.000 penduduk dalam setahun.',
    section: 'penduduk',
  },
  {
    id: 'pdb', label: 'PDB (harga berlaku)', value: 'US$1.445,6 M',
    unit: 'miliar dolar AS', year: 2025, source: SOURCES.wdi2025,
    note: 'Nilai seluruh barang dan jasa yang dihasilkan setahun.',
    section: 'ekonomi',
  },
  {
    id: 'pdb-kapita', label: 'PDB per kapita', value: 'US$5.060',
    unit: 'dolar AS', year: 2025, source: SOURCES.wdi2025,
    note: 'PDB dibagi jumlah penduduk.',
    section: 'ekonomi',
  },
  {
    id: 'pdb-ppp', label: 'PDB per kapita (PPP)', value: 'US$17.660',
    unit: 'dolar AS PPP', year: 2025, source: SOURCES.wdi2025,
    note: 'Disesuaikan dengan daya beli (paritas daya beli).',
    section: 'ekonomi',
  },
  {
    id: 'tumbuh-pdb', label: 'Pertumbuhan ekonomi', value: '5,1%',
    unit: 'y-on-y', year: 2025, source: SOURCES.bps2025,
    note: 'Triwulan IV 2025 tumbuh 5,39% y-on-y; 2024 tumbuh 5,03%.',
    section: 'ekonomi',
  },
  {
    id: 'inflasi', label: 'Inflasi (harga konsumen)', value: '1,9%',
    unit: 'per tahun', year: 2025, source: SOURCES.wdi2025,
    note: 'Kenaikan harga barang dan jasa konsumen setahun.',
    section: 'ekonomi',
  },
  {
    id: 'gini', label: 'Indeks Gini', value: '34,4',
    unit: 'skala 0–100', year: 2025, source: SOURCES.wdi2025,
    note: '0 berarti semua merata, 100 berarti satu orang menguasai semua.',
    section: 'ekonomi',
  },
  {
    id: 'angkatan-kerja', label: 'Angkatan kerja', value: '155,27 jt',
    unit: 'jiwa', year: 2025, source: SOURCES.bpsNov2025,
    note: 'Penduduk usia kerja yang bekerja atau mencari kerja.',
    section: 'pekerjaan',
  },
  {
    id: 'bekerja', label: 'Penduduk bekerja', value: '147,91 jt',
    unit: 'jiwa', year: 2025, source: SOURCES.bpsNov2025,
    note: 'Dari angkatan kerja 155,27 juta jiwa.',
    section: 'pekerjaan',
  },
  {
    id: 'tpt', label: 'Tingkat Pengangguran Terbuka', value: '4,74%',
    unit: 'dari angkatan kerja', year: 2025, source: SOURCES.bpsNov2025,
    note: '7,35 juta jiwa menganggur (BPS, Nov 2025). Definisi BPS; estimasi model ILO 3,2% (2025) memakai definisi berbeda.',
    section: 'pekerjaan',
  },
  {
    id: 'kemiskinan', label: 'Tingkat kemiskinan', value: '8,25%',
    unit: 'penduduk', year: 2025, source: SOURCES.bpsSep2025,
    note: 'Penduduk dengan pengeluaran di bawah garis kemiskinan.',
    section: 'pekerjaan',
  },
  {
    id: 'garis-kemiskinan', label: 'Garis kemiskinan', value: 'Rp609.160',
    unit: 'per kapita/bulan', year: 2025, source: SOURCES.bpsMar2025,
    note: 'Makanan Rp454.299 + non-makanan Rp154.861 per kapita/bulan.',
    section: 'pekerjaan',
  },
];

// Pertumbuhan ekonomi tahunan (BPS) — untuk grafik garis/batang.
export const GROWTH_SERIES = [
  { year: 2024, value: 5.03, label: '2024: 5,03%' },
  { year: 2025, value: 5.10, label: '2025: 5,1%' },
];

// PDB menurut lapangan usaha, Triwulan IV 2025 (BPS).
// "Sektor lain" adalah sisa dari lima sektor yang dirinci.
export const SECTOR_SHARES = [
  { name: 'Industri pengolahan', value: 19.20 },
  { name: 'Perdagangan', value: 13.24 },
  { name: 'Pertanian', value: 11.56 },
  { name: 'Konstruksi', value: 10.16 },
  { name: 'Pertambangan', value: 8.93 },
  { name: 'Sektor lain', value: 36.91 },
];

// Garis kemiskinan per kapita per bulan, Maret 2025 (BPS).
export const POVERTY_LINE = [
  { name: 'Makanan', value: 454299 },
  { name: 'Non-makanan', value: 154861 },
];

// UMP 2026 (Pemprov DKI / PP 49/2025). Hanya tiga provinsi yang terverifikasi.
export const UMP_2026 = [
  { province: 'DKI Jakarta', ump: 5729876, prev: 5396761, change: 6.17, note: 'Tertinggi' },
  { province: 'Bali', ump: 3207459, prev: null, change: null, note: '' },
  { province: 'Jawa Barat', ump: 2317601, prev: null, change: null, note: 'Terendah' },
];

// Pengeluaran per kapita per bulan, 2025 (BPS via GoodStats).
export const SPENDING = [
  { place: 'Jakarta Selatan', value: 3640000 },
  { place: 'Depok', value: 3370000 },
  { place: 'Jakarta Utara', value: 3320000 },
  { place: 'Bekasi', value: 2830000 },
  { place: 'Nasional', value: 1570000 },
];

// Rincian pengeluaran nasional (BPS 2025): makanan Rp776 ribu + non-makanan Rp794 ribu.
// Susenas Sep 2025: Rp1.584.473 (makanan Rp804.430, non-makanan Rp780.042).
export const SPENDING_NATIONAL = {
  total: 1570000, food: 776000, nonFood: 794000,
  susenasTotal: 1584473, susenasFood: 804430, susenasNonFood: 780042,
};
