/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, CirebonArea, Order } from '../types';

export const WORKSHOP_INFO = {
  name: 'Soleman Workshop & Shoes Repair',
  tagline: 'Perbaikan & Perawatan Sepatu Terlengkap di Cirebon',
  phone: '628814519955',
  phoneFormatted: '0881-4519-955',
  address: 'Jl. Dr. Cipto Mangunkusumo No. 42 (Dekat CSB Mall), Kesambi, Kota Cirebon, Jawa Barat 45131',
  lat: -6.7248,
  lng: 108.5521,
  googleMapsUrl: 'https://maps.google.com/?q=-6.7248,108.5521',
  operatingHours: 'Setiap Hari: 09.00 - 21.00 WIB',
  instagram: '@soleman.cirebon',
  coverage: 'Melayani Antar-Jemput Seluruh Kota Cirebon & Kabupaten Cirebon',
};

export const CIREBON_AREAS: CirebonArea[] = [
  { name: 'Kesambi (Cipto, Sudarsono, Sunyaragi)', type: 'Kota', deliveryFee: 10000, estimatedPickupHours: '30-45 menit' },
  { name: 'Kedawung / Tuparev (Kalikoa, Sutawinangun)', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '30-45 menit' },
  { name: 'Kejaksan (Siliwangi, Kartini, Sukapura)', type: 'Kota', deliveryFee: 10000, estimatedPickupHours: '30-50 menit' },
  { name: 'Pekalipan (Pulasaren, Jagasatru)', type: 'Kota', deliveryFee: 10000, estimatedPickupHours: '35-50 menit' },
  { name: 'Lemahwungkuk (Kasepuhan, Pegambiran)', type: 'Kota', deliveryFee: 10000, estimatedPickupHours: '40-60 menit' },
  { name: 'Harjamukti (Kalijaga, Larangan, Argasunya)', type: 'Kota', deliveryFee: 12000, estimatedPickupHours: '45-60 menit' },
  { name: 'Weru / Plered (Kawasan Batik Trusmi)', type: 'Kabupaten', deliveryFee: 15000, estimatedPickupHours: '45-60 menit' },
  { name: 'Tengah Tani / Dawuan', type: 'Kabupaten', deliveryFee: 12000, estimatedPickupHours: '40-60 menit' },
  { name: 'Sumber (Pusat Pemkab Cirebon)', type: 'Kabupaten', deliveryFee: 15000, estimatedPickupHours: '60-90 menit' },
  { name: 'Gunungjati (Klayan, Jatimerta)', type: 'Kabupaten', deliveryFee: 15000, estimatedPickupHours: '60-90 menit' },
  { name: 'Plumbon / Marikangen', type: 'Kabupaten', deliveryFee: 15000, estimatedPickupHours: '60-90 menit' },
  { name: 'Mundu / Suci', type: 'Kabupaten', deliveryFee: 15000, estimatedPickupHours: '60-90 menit' },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'reglue-total',
    name: 'Reglue Total & Press Pabrik',
    category: 'sol',
    damageTitle: 'Sol Lepas, Menganga & Lem Mati',
    symptoms: [
      'Sol depan/belakang copot terlepas',
      'Lem lama berkerak dan tidak mau rekat lagi',
      'Sepatu mangap setelah kehujanan atau disimpan lama'
    ],
    solution: 'Pembersihan 100% kerak lem lama, aplikasi bonding primer asam industri, lem polyurethane khusus pabrik, lalu di-press mesin panas (thermo-press).',
    price: 50000,
    priceFormatted: 'Rp 50.000',
    durationEst: '1 - 2 Hari',
    warrantyDays: 60,
    popular: true,
    suitableShoes: ['Sneakers', 'Running / Sport', 'Canvas / Casual', 'Boots / Safety'],
    iconName: 'Wrench',
    beforeAfterDescription: 'Sol yang menganga 100% kembali merekat kuat tahan banting seperti baru keluar toko.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'jahit-sol',
    name: 'Jahit Sol Keliling (Sol Sulam Presisi)',
    category: 'jahit',
    damageTitle: 'Sol Sering Copot Saat Dipakai Gerak Ekstrem',
    symptoms: [
      'Sepatu futsal / bola sering jebol di lapangan',
      'Safety boots / Docmart butuh kekuatan ekstra',
      'Ingin sol terkunci permanen seumur hidup'
    ],
    solution: 'Penjahitan tembus outsole dengan benang nilon berlapis wax anti-air. Dilengkapi coakan alur agar benang tidak tergesek aspal.',
    price: 35000,
    priceFormatted: 'Rp 35.000',
    durationEst: '1 Hari',
    warrantyDays: 90,
    popular: true,
    suitableShoes: ['Running / Sport', 'Boots / Safety', 'Sneakers', 'Pantofel / Formal'],
    iconName: 'ShieldCheck',
    beforeAfterDescription: 'Jahitan rata, simetris, dan menyatu rapi tanpa membuat bagian dalam mengganjal di telapak.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'resoling-total',
    name: 'Resoling / Ganti Tapak Sol Baru (Full Outsole)',
    category: 'sol',
    damageTitle: 'Sol Aus, Botak, Patah, atau Terhidrolisis Hancur',
    symptoms: [
      'Tapak sol bawah licin tidak ada grip',
      'Karet sol pecah-pecah terbelah dua',
      'Sol PU hancur berbubuk karena kelamaan di lemari'
    ],
    solution: 'Bongkar sol lama, ganti sol baru berkualitas tinggi (Vibram look, Cupsole karet sneakers, Sol tapak pantofel, atau Sol docmart). Termasuk penyesuaian bentuk & pengeleman vulcanize.',
    price: 130000,
    priceFormatted: 'Rp 130.000',
    durationEst: '3 - 4 Hari',
    warrantyDays: 90,
    popular: true,
    suitableShoes: ['Sneakers', 'Boots / Safety', 'Pantofel / Formal', 'Running / Sport'],
    iconName: 'Layers',
    beforeAfterDescription: 'Sol baru tebal, grip tajam anti licin, dan siap dipakai petualangan bertahun-tahun lagi.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'unyellowing',
    name: 'Unyellowing & Midsole Detox',
    category: 'warna',
    damageTitle: 'Midsole Menguning & Kusam Akibat Oksidasi',
    symptoms: [
      'Sol putih berubah jadi kuning kecokelatan',
      'Midsole Adidas Boost atau Nike Air kusam',
      'Dicuci deterjen biasa tetap tidak hilang'
    ],
    solution: 'Treatment de-oksidasi dengan formula hidrogen peroksida khusus sepatu, diaktifkan di dalam chamber sinar UV terkontrol tanpa merusak karet.',
    price: 45000,
    priceFormatted: 'Rp 45.000',
    durationEst: '1 - 2 Hari',
    warrantyDays: 30,
    popular: true,
    suitableShoes: ['Sneakers', 'Running / Sport', 'Canvas / Casual'],
    iconName: 'Sparkles',
    beforeAfterDescription: 'Karet sol yang kuning butek kembali putih cerah alami seperti waktu beli pertama kali.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'recolor-repaint',
    name: 'Recolor & Repaint Leather/Canvas',
    category: 'warna',
    damageTitle: 'Warna Pudar, Kena Noda Kimia, Baret Dalam',
    symptoms: [
      'Warna kain atau kulit luntur akibat sinar matahari',
      'Baret di bagian toe cap atau samping',
      'Ingin ubah warna sepatu (custom color style)'
    ],
    solution: 'Pembersihan pori material, pemberian pigmen fleksibel anti-retak khusus sepatu, dan top coat matte/glossy tahan air & goresan.',
    price: 80000,
    priceFormatted: 'Rp 80.000',
    durationEst: '2 - 3 Hari',
    warrantyDays: 45,
    popular: false,
    suitableShoes: ['Sneakers', 'Pantofel / Formal', 'Boots / Safety', 'Canvas / Casual'],
    iconName: 'Palette',
    beforeAfterDescription: 'Warna kembali pekat merata, tidak kaku saat ditekuk, dan tidak luntur terkena air hujan.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'deep-clean',
    name: 'Deep Clean & Sterilisasi Antibakteri',
    category: 'kebersihan',
    damageTitle: 'Sepatu Dekil, Jamuran, Noda Lumpur & Bau Apek',
    symptoms: [
      'Noda lumpur dan debu menempel di serat kain',
      'Timbul bintik jamur putih/hijau di sepatu kulit atau suede',
      'Bagian insole dalam mengeluarkan aroma tak sedap'
    ],
    solution: 'Cuci menyeluruh luar & dalam memakai formula biodegradable aman material, drying di suhu stabil (anti susut), treatment UV chamber anti-bakteri, plus parfum antibau premium.',
    price: 35000,
    priceFormatted: 'Rp 35.000',
    durationEst: '1 Hari',
    warrantyDays: 14,
    popular: true,
    suitableShoes: ['Sneakers', 'Running / Sport', 'Canvas / Casual', 'Boots / Safety', 'Pantofel / Formal', 'Heels / Flat Shoes'],
    iconName: 'Droplets',
    beforeAfterDescription: 'Bersih menyeluruh sampai sudut terdalam, bebas jamur, dan harum wangi siap dipakai ngantor/nongkrong.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'heel-repair',
    name: 'Reparasi Busa & Kain Tumit (Heel Collar / Lining)',
    category: 'busa',
    damageTitle: 'Kain Busa Tumit Robek & Bikin Kaki Lecet',
    symptoms: [
      'Bagian tumit dalam berlubang karena gesekan kaki',
      'Busa penyangga tumit hancur / miring',
      'Kaki sakit dan lecet tiap kali melangkah'
    ],
    solution: 'Bongkar lapisan yang sobek, pasang busa ortopedik baru, dilapisi kain mesh berpori atau kulit sintetis lembut dengan jahitan bordir presisi.',
    price: 50000,
    priceFormatted: 'Rp 50.000',
    durationEst: '2 Hari',
    warrantyDays: 60,
    popular: false,
    suitableShoes: ['Sneakers', 'Running / Sport', 'Pantofel / Formal'],
    iconName: 'Footprints',
    beforeAfterDescription: 'Tumit kembali empuk terlapisi rapi, pas di kaki tanpa rasa sakit atau gesekan kasar.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'insole-replacement',
    name: 'Ganti Insole Memory Foam Orthopedic',
    category: 'busa',
    damageTitle: 'Insole Bawaan Kempes, Hancur, atau Keras',
    symptoms: [
      'Telapak kaki cepat pegal dan capek saat jalan',
      'Insole bawaan hancur atau copot bergerigi',
      'Bantalan tidak lagi empuk meredam benturan'
    ],
    solution: 'Pemasangan insole ergonomis berbusa memory foam tebal dengan lengkungan arch support penopang telapak kaki yang sejuk menyerap keringat.',
    price: 40000,
    priceFormatted: 'Rp 40.000',
    durationEst: '1 Hari',
    warrantyDays: 30,
    popular: false,
    suitableShoes: ['Sneakers', 'Running / Sport', 'Boots / Safety', 'Canvas / Casual'],
    iconName: 'Activity',
    beforeAfterDescription: 'Sensasi melangkah empuk seperti menginjak karpet awan, nyaman dipakai seharian.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'patch-upper',
    name: 'Patching Upper Robek (Tambal Kanvas / Kulit)',
    category: 'kulit_upper',
    damageTitle: 'Kain Upper Robek Kena Gesekan / Kawat / Kuku Jempol',
    symptoms: [
      'Lubang di bagian jempol sepatu kanvas (Vans / Converse / Ventela)',
      'Kulit samping tergores sobek',
      'Jahitan sambungan bodi atas terburai'
    ],
    solution: 'Penguatan backing kain serat baja mini dari sisi dalam, penambalan rapi dengan teknik sulam micro-stitch yang menyatu dengan motif asli.',
    price: 45000,
    priceFormatted: 'Rp 45.000',
    durationEst: '2 Hari',
    warrantyDays: 60,
    popular: false,
    suitableShoes: ['Canvas / Casual', 'Sneakers', 'Running / Sport'],
    iconName: 'Scissors',
    beforeAfterDescription: 'Lubang tertutup kuat tanpa kelihatan kembung atau tambalan murahan dari luar.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'leather-treatment',
    name: 'Leather Nourishing & Crease Reduction',
    category: 'kulit_upper',
    damageTitle: 'Kulit Sepatu Formal Kaku, Kerut & Pecah-Pecah',
    symptoms: [
      'Pantofel atau Boots kulit retak-retak kering',
      'Lipatan tajam (deep creases) membuat sepatu tampak tua',
      'Warna kulit kusam kehilangan kilau mewahnya'
    ],
    solution: 'Treatment pemanasan thermo-tree untuk merilekskan kerutan, hidrasi minyak mink oil & lilin carnauba alami, diakhiri mirror-shine buffing.',
    price: 45000,
    priceFormatted: 'Rp 45.000',
    durationEst: '1 - 2 Hari',
    warrantyDays: 45,
    popular: false,
    suitableShoes: ['Pantofel / Formal', 'Boots / Safety', 'Heels / Flat Shoes'],
    iconName: 'Award',
    beforeAfterDescription: 'Kulit lentur kembali elastis, lipatan tersamarkan, dan kilap cermin elegan siap meeting.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
  }
];

export interface CourierDriver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  coverageAreas: string[];
}

export const SHOE_MATERIALS: { id: ShoeMaterial; label: string; desc: string; priceFactor: number }[] = [
  { id: 'Canvas / Kain', label: 'Canvas / Kain Tekstil', desc: 'Vans, Converse, Ventela, Compass', priceFactor: 1.0 },
  { id: 'Kulit Asli (Leather)', label: 'Kulit Asli (Genuine Leather)', desc: 'Pantofel kulit, Boots Docmart, Sneaker leather', priceFactor: 1.15 },
  { id: 'Suede / Nubuck', label: 'Suede / Nubuck', desc: 'Bahan berbulu halus butuh formula pelembab khusus', priceFactor: 1.25 },
  { id: 'Kulit Sintetis (Faux)', label: 'Kulit Sintetis (Faux/PU)', desc: 'Butuh perekat fleksibel suhu rendah agar tidak mengelupas', priceFactor: 1.05 },
  { id: 'Mesh / Rajut / Flyknit', label: 'Mesh / Rajut / Flyknit', desc: 'Sepatu running ringan Nike/Adidas sport', priceFactor: 1.0 },
  { id: 'Karet / EVA / Foam', label: 'Karet / EVA / Foam', desc: 'Slip on, sandal, midsole boost foam', priceFactor: 1.0 }
];

export const DAMAGE_SEVERITIES: { id: DamageSeverity; label: string; badge: string; desc: string; priceFactor: number; colorClass: string }[] = [
  { id: 'kecil', label: 'Kecil / Ringan', badge: 'Minor', desc: 'Mangap ujung tipis (<3cm), baret tipis, kotor debu', priceFactor: 0.85, colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'normal', label: 'Normal / Sedang', badge: 'Standard', desc: 'Sol menganga separuh, kotor tanah/lumpur, midsole kuning', priceFactor: 1.0, colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'hard', label: 'Hard / Parah', badge: 'Extreme', desc: 'Sol copot total dua sisi, tapak patah, robek lebar, kerak tebal', priceFactor: 1.35, colorClass: 'text-red-400 bg-red-500/10 border-red-500/30' }
];

export function calculateServicePrice(
  basePrice: number,
  material: ShoeMaterial = 'Canvas / Kain',
  severity: DamageSeverity = 'normal'
): number {
  const mat = SHOE_MATERIALS.find(m => m.id === material);
  const sev = DAMAGE_SEVERITIES.find(s => s.id === severity);
  const matFactor = mat ? mat.priceFactor : 1.0;
  const sevFactor = sev ? sev.priceFactor : 1.0;
  
  // Bulatkan ke kelipatan 5.000 Rupiah terdekat
  const raw = basePrice * matFactor * sevFactor;
  return Math.round(raw / 5000) * 5000;
}

export const COURIER_DRIVERS: CourierDriver[] = [
  { id: 'c1', name: 'Herdi (Kurir Soleman Cirebon)', phone: '08814519955', vehicle: 'Honda Vario Hitam (E 4521 AA)', coverageAreas: ['Kesambi', 'Kedawung / Tuparev', 'Pekalipan', 'Kejaksan', 'Harjamukti'] },
  { id: 'c2', name: 'Herdi (Area Sumber & Weru)', phone: '08814519955', vehicle: 'Yamaha NMAX Abu-abu (E 3189 BC)', coverageAreas: ['Kejaksan', 'Lemahwungkuk', 'Gunungjati', 'Sumber', 'Weru'] },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SLC-3891',
    customerName: 'Dimas Prasetyo',
    customerPhone: '081234567891',
    shoeBrand: 'Nike Air Jordan 1 Low',
    shoeType: 'Sneakers',
    material: 'Kulit Asli (Leather)',
    severity: 'normal',
    pairsCount: 1,
    selectedServices: [
      SERVICES_CATALOG[0], // Reglue
      SERVICES_CATALOG[3], // Unyellowing
    ],
    shoes: [
      {
        id: 's1',
        pairNumber: 1,
        shoeBrand: 'Nike Air Jordan 1 Low',
        shoeType: 'Sneakers',
        material: 'Kulit Asli (Leather)',
        severity: 'normal',
        selectedServices: [SERVICES_CATALOG[0], SERVICES_CATALOG[3]],
        photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Sol kiri depan mangap kena hujan pas motoran di Tuparev.',
        price: 95000
      }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    photos: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    customNotes: 'Sol kiri depan mangap kena hujan pas motoran di Tuparev. Tolong unyellowing midsole sekalian.',
    pickupType: 'antar_jemput',
    preferredTimeSlot: 'pagi',
    location: {
      areaName: 'Kedawung / Tuparev (Kalikoa, Sutawinangun)',
      fullAddress: 'Jl. Tuparev No. 128 (Depan RM Simpang Raya), Kedawung, Cirebon',
      landmark: 'Pagar abu-abu, ada motor Vario hitam di teras',
      lat: -6.7124,
      lng: 108.5398,
      accuracy: 12,
      mapsUrl: 'https://maps.google.com/?q=-6.7124,108.5398',
      detectedViaGps: true,
    },
    totalServicesPrice: 95000,
    deliveryFee: 10000,
    totalAmount: 105000,
    status: 'pengerjaan',
    isAcceptedByAdmin: true,
    acceptedAt: '06 Okt, 10:25 WIB',
    assignedCourier: 'Herdi',
    assignedCourierPhone: '08814519955',
    createdAt: '2026-10-06 10:15 WIB',
    estimatedFinishedAt: '2026-10-08 16:00 WIB',
    technicianName: 'Master Teknisi Soleman',
    timeline: [
      { status: 'menunggu_jemput', label: 'Order Dibuat', timestamp: '06 Okt, 10:15', description: 'Permintaan antar-jemput diterima sistem.' },
      { status: 'perjalanan_workshop', label: 'Dijemput Kurir', timestamp: '06 Okt, 11:30', description: 'Kurir Herdi menjemput sepatu di Jl. Tuparev No. 128.' },
      { status: 'pengerjaan', label: 'Proses di Workshop', timestamp: '06 Okt, 13:45', description: 'Pembersihan kerak lem & tahap de-oksidasi UV chamber.' },
    ]
  },
  {
    id: 'SLC-3892',
    customerName: 'Siti Rahmawati',
    customerPhone: '085789123456',
    shoeBrand: 'Vans Old Skool & Adidas UltraBoost',
    shoeType: 'Canvas / Casual',
    material: 'Canvas / Kain',
    severity: 'kecil',
    pairsCount: 2,
    selectedServices: [
      SERVICES_CATALOG[1], // Jahit Sol
      SERVICES_CATALOG[5], // Deep Clean
    ],
    shoes: [
      {
        id: 's2-1',
        pairNumber: 1,
        shoeBrand: 'Vans Old Skool Black White',
        shoeType: 'Canvas / Casual',
        material: 'Canvas / Kain',
        severity: 'kecil',
        selectedServices: [SERVICES_CATALOG[1]], // Jahit Sol
        photoUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Benang sol samping lepas sedikit dekat jempol',
        price: 35000
      },
      {
        id: 's2-2',
        pairNumber: 2,
        shoeBrand: 'Adidas UltraBoost White',
        shoeType: 'Running / Sport',
        material: 'Mesh / Rajut / Flyknit',
        severity: 'normal',
        selectedServices: [SERVICES_CATALOG[5], SERVICES_CATALOG[3]], // Deep Clean + Unyellowing
        photoUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Kotor lumpur joging di stadion Bima & sol kuning',
        price: 80000
      }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80'
    ],
    customNotes: 'Sepatu Vans kuliah adek & sepatu running saya. Sekalian deep clean dua-duanya.',
    pickupType: 'antar_jemput',
    preferredTimeSlot: 'siang',
    location: {
      areaName: 'Kesambi (Cipto, Sudarsono, Sunyaragi)',
      fullAddress: 'Perumahan Sunyaragi Regency Blok B-14, Kesambi, Kota Cirebon',
      landmark: 'Sebelah minimarket, rumah cat krem nomor B-14',
      lat: -6.7321,
      lng: 108.5442,
      accuracy: 8,
      mapsUrl: 'https://maps.google.com/?q=-6.7321,108.5442',
      detectedViaGps: true,
    },
    totalServicesPrice: 115000,
    deliveryFee: 0, // Promo >= 2 pasang GRATIS
    totalAmount: 115000,
    status: 'siap_antar',
    isAcceptedByAdmin: true,
    acceptedAt: '05 Okt, 14:10 WIB',
    assignedCourier: 'Herdi',
    assignedCourierPhone: '08814519955',
    createdAt: '2026-10-05 14:00 WIB',
    estimatedFinishedAt: '2026-10-07 17:00 WIB',
    technicianName: 'Master Teknisi Soleman',
    timeline: [
      { status: 'menunggu_jemput', label: 'Order Diterima', timestamp: '05 Okt, 14:00', description: 'Order 2 pasang (Gratis Ongkir Cirebon).' },
      { status: 'perjalanan_workshop', label: 'Sampai di Workshop', timestamp: '05 Okt, 15:30', description: 'Sepatu tiba di Jl. Dr. Cipto No. 42 Cirebon.' },
      { status: 'pengerjaan', label: 'Selesai Servis', timestamp: '06 Okt, 16:00', description: 'Jahit keliling presisi & deep clean kering wangi.' },
      { status: 'quality_check', label: 'Quality Check Lolos', timestamp: '07 Okt, 10:00', description: 'Pemeriksaan jahitan & packing steril Soleman.' },
      { status: 'siap_antar', label: 'Siap Diantar Kurir', timestamp: '07 Okt, 13:00', description: 'Kurir Herdi menjadwalkan pengantaran sore ini ke Kesambi.' },
    ]
  },
  {
    id: 'SLC-3893',
    customerName: 'Budi Santoso',
    customerPhone: '081987654321',
    shoeBrand: 'Dr. Martens 1461 3-Eye',
    shoeType: 'Boots / Safety',
    material: 'Kulit Asli (Leather)',
    severity: 'hard',
    pairsCount: 1,
    selectedServices: [
      SERVICES_CATALOG[2], // Resoling Total
      SERVICES_CATALOG[9], // Leather Treatment
    ],
    shoes: [
      {
        id: 's3',
        pairNumber: 1,
        shoeBrand: 'Dr. Martens 1461 3-Eye',
        shoeType: 'Boots / Safety',
        material: 'Kulit Asli (Leather)',
        severity: 'hard',
        selectedServices: [SERVICES_CATALOG[2], SERVICES_CATALOG[9]],
        photoUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Sol bawah botak licin parah dan retak terbelah dua. Kulit kering kaku.',
        price: 185000
      }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    photos: ['https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80'],
    customNotes: 'Tapak bawah sudah habis licin dan kulit samping agak kaku. Mohon ganti sol tapak karet tebal.',
    pickupType: 'antar_jemput',
    preferredTimeSlot: 'sore',
    location: {
      areaName: 'Kejaksan (Siliwangi, Kartini, Sukapura)',
      fullAddress: 'Jl. Siliwangi No. 74 (Dekat Balai Kota Cirebon), Kejaksan',
      landmark: 'Gedung kantor lantai 2, titip di resepsionis Pak Budi',
      lat: -6.7119,
      lng: 108.5615,
      accuracy: 15,
      mapsUrl: 'https://maps.google.com/?q=-6.7119,108.5615',
      detectedViaGps: true,
    },
    totalServicesPrice: 175000,
    deliveryFee: 10000,
    totalAmount: 185000,
    status: 'menunggu_jemput',
    isAcceptedByAdmin: false, // Menunggu diterima oleh Admin!
    createdAt: '2026-10-07 09:20 WIB',
    estimatedFinishedAt: '2026-10-10 18:00 WIB',
    technicianName: 'Kang Indra (Master Cobbler Leathercraft)',
    timeline: [
      { status: 'menunggu_jemput', label: 'Menunggu Konfirmasi Admin', timestamp: '07 Okt, 09:20', description: 'Permintaan antar-jemput baru masuk, menunggu admin menerima pesanan.' }
    ]
  }
];

export const STATUS_LABELS: Record<Order['status'], { label: string; color: string; badgeBg: string }> = {
  menunggu_jemput: { label: 'Menunggu Penjemputan', color: 'text-amber-400', badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  perjalanan_workshop: { label: 'Kurir Membawa ke Workshop', color: 'text-sky-400', badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20' },
  pengerjaan: { label: 'Dalam Pengerjaan Teknisi', color: 'text-indigo-400', badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' },
  quality_check: { label: 'Pengecekan Kualitas (QC)', color: 'text-purple-400', badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  siap_antar: { label: 'Siap Diantar Kembali', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  selesai: { label: 'Selesai & Diterima Pelanggan', color: 'text-emerald-500', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
};
