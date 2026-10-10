/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, CirebonArea, Order, ShoeMaterial, DamageSeverity } from '../types';

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

// Daftar Kecamatan Se-Cirebon (Kota & Kabupaten)
export const CIREBON_AREAS: CirebonArea[] = [
  // KOTA CIREBON (5 KECAMATAN RESMI)
  { name: 'Kesambi (Cipto, Sudarsono, Sunyaragi, Drajat)', type: 'Kota', deliveryFee: 0, estimatedPickupHours: '30-45 menit' },
  { name: 'Kejaksan (Siliwangi, Kartini, Sukapura, Kebonbaru)', type: 'Kota', deliveryFee: 0, estimatedPickupHours: '30-45 menit' },
  { name: 'Pekalipan (Pulasaren, Jagasatru, Pekalangan)', type: 'Kota', deliveryFee: 0, estimatedPickupHours: '30-50 menit' },
  { name: 'Lemahwungkuk (Kasepuhan, Pegambiran, Panjunan)', type: 'Kota', deliveryFee: 0, estimatedPickupHours: '35-50 menit' },
  { name: 'Harjamukti (Kalijaga, Larangan, Argasunya, Perumnas)', type: 'Kota', deliveryFee: 0, estimatedPickupHours: '40-60 menit' },

  // KABUPATEN CIREBON
  { name: 'Kedawung / Tuparev (Kalikoa, Sutawinangun)', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '30-45 menit' },
  { name: 'Weru / Plered (Kawasan Sentra Batik Trusmi)', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '40-60 menit' },
  { name: 'Tengah Tani / Dawuan / Kemlakagede', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '40-60 menit' },
  { name: 'Sumber (Pusat Pemerintahan Pemkab Cirebon)', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '45-75 menit' },
  { name: 'Gunung Jati (Klayan, Jatimerta, Astana)', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '45-75 menit' },
  { name: 'Plumbon / Marikangen / Kasugengan', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '45-75 menit' },
  { name: 'Mundu / Suci / Waruduwur', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '45-75 menit' },
  { name: 'Talun / Cirebon Girang / Kepongpongan', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '40-60 menit' },
  { name: 'Palimanan / Pegagan', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Klangenan / Jemaras', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Arjawinangun / Jungjang', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Astanajapura / Kanci', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Beber / Halimpu', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Dukupuntang / Cisaat', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Lemahabang / Sindanglaut', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Ciledug / Jatiseeng', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '60-90 menit' },
  { name: 'Losari / Panggangsari', type: 'Kabupaten', deliveryFee: 10000, estimatedPickupHours: '70-100 menit' },
];

export const ALL_CIREBON_KECAMATAN_SUGGESTIONS = [
  'Kesambi', 'Kejaksan', 'Pekalipan', 'Lemahwungkuk', 'Harjamukti',
  'Kedawung', 'Weru', 'Plered', 'Tengah Tani', 'Sumber', 'Gunung Jati', 'Plumbon',
  'Mundu', 'Talun', 'Palimanan', 'Klangenan', 'Arjawinangun', 'Astanajapura',
  'Beber', 'Dukupuntang', 'Depok', 'Ciwaringin', 'Gempol', 'Susukan', 'Gegesik',
  'Kaliwedi', 'Kapetakan', 'Suranenggala', 'Panguragan', 'Karangwareng', 'Karangsembung',
  'Lemahabang', 'Pabuaran', 'Ciledug', 'Waled', 'Pasaleman', 'Pabedilan', 'Losari',
  'Babakan', 'Gebang', 'Sedong', 'Greged'
];

export interface DistanceZoneOption {
  id: 'dekat_kota' | 'jauh_kabupaten' | 'luar_cirebon';
  title: string;
  badge: string;
  rangeKm: string;
  desc: string;
  partner: 'kurir_soleman' | 'grab_maxim' | 'jnt_express';
  partnerLabel: string;
  feeCalculation: string;
  defaultFee: number;
}

export const DISTANCE_ZONES: DistanceZoneOption[] = [
  {
    id: 'dekat_kota',
    title: 'Zona 1: Inti Kota Cirebon (< 6 KM)',
    badge: 'Gratis Ongkir',
    rangeKm: '< 6 KM dari Workshop Dr. Cipto',
    desc: 'Kesambi, Kejaksan, Pekalipan, Lemahwungkuk, Harjamukti. Dijemput armada Kurir Soleman.',
    partner: 'kurir_soleman',
    partnerLabel: 'Kurir Internal Soleman (Motor Workshop)',
    feeCalculation: 'GRATIS ONGKIR',
    defaultFee: 0
  },
  {
    id: 'jauh_kabupaten',
    title: 'Zona 2: Kabupaten Cirebon / Jarak Menengah-Jauh (> 6 KM)',
    badge: 'Grab / Maxim / Kurir',
    rangeKm: '6 - 25 KM Radius Cirebon',
    desc: 'Kedawung, Weru/Plered, Sumber, Gunung Jati, Mundu, Plumbon, Palimanan, dll. Kurir Soleman atau Mitra GrabExpress & Maxim.',
    partner: 'grab_maxim',
    partnerLabel: 'Kurir Soleman / GrabExpress & Maxim Delivery',
    feeCalculation: 'Gratis min. 2 pasang / Rp 10.000 (1 pasang)',
    defaultFee: 10000
  },
  {
    id: 'luar_cirebon',
    title: 'Zona 3: Luar Cirebon (Antar Kota / Se-Indonesia)',
    badge: 'J&T Express',
    rangeKm: 'Kuningan, Majalengka, Indramayu, Brebes, Jabodetabek, dll.',
    desc: 'Kirim paket sepatu ke Workshop Soleman via J&T Express / JNE / SiCepat. Resi terlacak otomatis di sistem.',
    partner: 'jnt_express',
    partnerLabel: 'Ekspedisi J&T Express / SiCepat / JNE',
    feeCalculation: 'Estimasi Ongkir J&T Rp 15.000 / Input No. Resi',
    defaultFee: 15000
  }
];

export const SERVICES_CATALOG: ServiceItem[] = [
  // --- JAHIT SOL SPESIALISASI ---
  {
    id: 'jahit-benang-tersembunyi',
    name: 'Jahit Sol Keliling Benang Gak Kelihatan (Hidden / Tanam)',
    category: 'jahit',
    damageTitle: 'Ingin Sol Kuat Permanen Tanpa Benang Tampak Mencolok',
    symptoms: [
      'Khawatir jahitan sol merusak estetika sepatu mahal/sneakers',
      'Benang jahitan biasa sering tergesek aspal dan putus',
      'Ingin finishing rapi dan mulus standar pabrik'
    ],
    solution: 'Dibuatkan parit alur khusus (grooving slot) tersembunyi di outsole karet. Benang wax nilon industri disulam di dalam celah parit sehingga tertanam rata, terlindung aus, dan 100% tidak tampak dari luar.',
    price: 45000,
    priceFormatted: 'Rp 45.000',
    durationEst: '1 Hari',
    warrantyDays: 90,
    popular: true,
    isBestMenu: true,
    suitableShoes: ['Sneakers', 'Sepatu Sekolah', 'Sepatu Kantor / Pantofel', 'Running / Sport', 'Sepatu Olah Raga / Sport', 'Canvas / Casual'],
    iconName: 'ShieldCheck',
    beforeAfterDescription: 'Jahitan tertanam sempurna di dalam sol, tampak bersih tanpa ada benang timbul dari samping.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'jahit-sol-silang',
    name: 'Jahit Sol Keliling Silang (Cross Stitch X-Pattern)',
    category: 'jahit',
    damageTitle: 'Kuncian Sol Ekstra Kuat dengan Estetika Silang Sporty',
    symptoms: [
      'Sepatu sering dipakai aktivitas berat dan tarikan kaki kencang',
      'Ingin variasi jahitan kontras pola X yang gahar & kokoh',
      'Sol samping butuh daya cengkeram benang dua arah'
    ],
    solution: 'Teknik sulam jahit silang diagonal (Cross Stitch X-Pattern) memakai benang nilon ganda. Memberikan gaya streetwear agresif sekaligus mengikat sisi atas dan bawah sepatu lebih rapat.',
    price: 40000,
    priceFormatted: 'Rp 40.000',
    durationEst: '1 Hari',
    warrantyDays: 90,
    popular: true,
    suitableShoes: ['Sneakers', 'Boots / Safety', 'Sepatu Proyek / Safety', 'Sepatu Trail', 'Sepatu Gunung / Hiking', 'Sepatu Sekolah'],
    iconName: 'Scissors',
    beforeAfterDescription: 'Pola silang X simetris presisi mengelilingi sepatu, tampil keren dan kencang maksimal.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'jahit-sol-zigzag',
    name: 'Jahit Sol Keliling Zig-Zag (Flexible Dynamic Stitch)',
    category: 'jahit',
    damageTitle: 'Jahitan Fleksibel Anti Putus Saat Sepatu Ditekuk Ekstrem',
    symptoms: [
      'Sepatu futsal / lari sering robek jahitan saat sprint dan manuver',
      'Jahitan lurus biasa gampang tegang dan lepas saat melangkah',
      'Butuh elastisitas jahitan sol mengikuti kelenturan telapak kaki'
    ],
    solution: 'Teknik sulaman pola zig-zag kontinu dengan kelenturan dinamis. Benang mampu meredam tekanan tekukan tinggi tanpa mengikis bahan upper sepatu.',
    price: 40000,
    priceFormatted: 'Rp 40.000',
    durationEst: '1 Hari',
    warrantyDays: 90,
    popular: true,
    suitableShoes: ['Sepatu Futsal', 'Sepatu Olah Raga / Sport', 'Sepatu Bola / Cleats', 'Running / Sport', 'Sneakers'],
    iconName: 'Wrench',
    beforeAfterDescription: 'Jahitan zig-zag elastis lentur, tahan banting saat dipakai lari dan nendang bola di lapangan.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'jahit-sol-standar',
    name: 'Jahit Sol Keliling Presisi Klasik',
    category: 'jahit',
    damageTitle: 'Sol Copot & Mangap Butuh Jahit Keliling Awet',
    symptoms: [
      'Sol sering jebol setelah dicuci atau kena genangan hujan',
      'Ingin sol terkunci rapat selamanya'
    ],
    solution: 'Penjahitan tembus outsole dengan benang nilon wax anti air dan kuncian lock-stitch klasik rapat berjarak 5mm rata.',
    price: 35000,
    priceFormatted: 'Rp 35.000',
    durationEst: '1 Hari',
    warrantyDays: 90,
    popular: false,
    suitableShoes: ['Sneakers', 'Sepatu Sekolah', 'Pantofel / Formal', 'Running / Sport'],
    iconName: 'ShieldCheck',
    beforeAfterDescription: 'Jahitan rata simetris mengelilingi sepatu, tidak menusuk ke dalam telapak.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  },

  // --- GANTI TAPAK / RESOLING SPESIFIK ---
  {
    id: 'ganti-tapak-sekolah',
    name: 'Ganti Tapak Sepatu Sekolah',
    category: 'sol',
    damageTitle: 'Tapak Sepatu Sekolah Botak, Licin, atau Tipis Berlubang',
    symptoms: [
      'Alas sepatu Warrior/NB/Ventela anak sekolah sudah rata licin',
      'Jari kaki tembus ke aspal karena tapak sudah bolong',
      'Ingin sol baru yang awet tahan gesekan harian'
    ],
    solution: 'Penggantian tapak bawah karet hitam pekat tebal dengan pola grip anti selip. Termasuk pengeleman press pabrik dan jahit keliling agar kuat dipakai lari upacara & olahraga.',
    price: 75000,
    priceFormatted: 'Rp 75.000',
    durationEst: '2 Hari',
    warrantyDays: 60,
    popular: true,
    isBestMenu: true,
    suitableShoes: ['Sepatu Sekolah', 'Canvas / Casual', 'Sneakers'],
    iconName: 'Layers',
    beforeAfterDescription: 'Tapak karet hitam baru tebal dengan grip tajam anti licin, siap dipakai sekolah setahun ke depan.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-kantor',
    name: 'Ganti Tapak Sepatu Kantor / Pantofel',
    category: 'sol',
    damageTitle: 'Sol Pantofel Formal Pecah, Aus Miring, Hak Berisik/Lepas',
    symptoms: [
      'Hak pantofel kulit sudah miring sebelah bikin jalan pincang',
      'Karet tapak retak hancur karena kelamaan disimpan',
      'Tapak licin di lantai keramik atau marmer kantor'
    ],
    solution: 'Pemasangan outsole formal kualitas tinggi karet cetak elegan atau kulit sintetis kompresi dengan bantalan hak empuk anti selip (silent heel non-marking).',
    price: 110000,
    priceFormatted: 'Rp 110.000',
    durationEst: '2 - 3 Hari',
    warrantyDays: 90,
    popular: true,
    suitableShoes: ['Sepatu Kantor / Pantofel', 'Pantofel / Formal'],
    iconName: 'Award',
    beforeAfterDescription: 'Sol pantofel kembali gagah seimbang, nyaman dipakai meeting dan jalan seharian di kantor.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-proyek',
    name: 'Ganti Tapak Sepatu Proyek / Safety',
    category: 'sol',
    damageTitle: 'Sol Safety Boots Hancur / Hidrolisis, Hilang Grip Lapangan',
    symptoms: [
      'Sol PU safety boots hancur jadi bubuk',
      'Grip tapak botak licin di area berminyak dan lumpur proyek',
      'Butuh perlindungan tapak tebal anti paku & benda tajam'
    ],
    solution: 'Pemasangan tapak sol karet vulkanisir gerigi tebal (Heavy-Duty Safety Sole) tahan minyak (oil & chemical resistant), anti licin, dan tahan gesekan ekstrem proyek.',
    price: 140000,
    priceFormatted: 'Rp 140.000',
    durationEst: '3 Hari',
    warrantyDays: 90,
    popular: true,
    suitableShoes: ['Sepatu Proyek / Safety', 'Boots / Safety'],
    iconName: 'ShieldCheck',
    beforeAfterDescription: 'Tapak karet tebal bergerigi kokoh standar keselamatan kerja lapangan, tahan minyak & anti licin.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-futsal',
    name: 'Ganti Tapak Sepatu Futsal (Gum Rubber Non-Marking)',
    category: 'sol',
    damageTitle: 'Sol Sepatu Futsal Botak, Terkelupas, atau Terbelah Dua',
    symptoms: [
      'Sering tergelincir di lapangan rumput sintetis atau semen',
      'Bagian depan sol futsal mangap lepas kena tendangan keras',
      'Sol karet bawaan pecah atau menipis parah'
    ],
    solution: 'Bongkar sol lama, ganti tapak karet mentah (Gum Sole) premium bertekstur honeycomb/chevron dengan daya gigit tinggi di lapangan indoor/outdoor, plus jahit keliling.',
    price: 85000,
    priceFormatted: 'Rp 85.000',
    durationEst: '2 Hari',
    warrantyDays: 60,
    popular: true,
    isBestMenu: true,
    suitableShoes: ['Sepatu Futsal', 'Sepatu Olah Raga / Sport'],
    iconName: 'Activity',
    beforeAfterDescription: 'Tapak karet mentah baru dengan cengkeraman maksimal di lapangan, tidak meninggalkan noda hitam.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-olahraga',
    name: 'Ganti Tapak Sepatu Olah Raga / Sport',
    category: 'sol',
    damageTitle: 'Bantalan Sol Lari Kempes, Karet Bawah Mengelupas',
    symptoms: [
      'Sepatu jogging terasa keras di tumit bikin lutut ngilu',
      'Karet tapak luar habis terkikis aspal joging track',
      'Sol lepas sebagian di bagian fleksur telapak'
    ],
    solution: 'Penggantian tapak sol baru berbusa EVA peredam benturan ringan dipadu karet luar berserat traksi, membuat lari dan senam kembali empuk membal.',
    price: 95000,
    priceFormatted: 'Rp 95.000',
    durationEst: '2 Hari',
    warrantyDays: 60,
    popular: false,
    suitableShoes: ['Sepatu Olah Raga / Sport', 'Running / Sport', 'Sneakers'],
    iconName: 'Footprints',
    beforeAfterDescription: 'Alas sol kembali empuk meredam benturan dengan traksi karet stabil di aspal & treadmill.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-trail',
    name: 'Ganti Tapak Sepatu Trail (Extreme Grip - Rp 200.000)',
    category: 'sol',
    damageTitle: 'Tapak Sol Trail Aus & Butuh Compound Karet Cadas',
    symptoms: [
      'Gigi tapak sepatu trail run / motocross sudah gundul licin',
      'Butuh compound karet keras heavy-duty anti slip di tanah gembur & cadas',
      'Ingin cek & konfirmasi foto bahan sol ke WhatsApp sebelum mulai dipasang'
    ],
    solution: 'Penggantian tapak sol karet compound trail extreme grip spesialis adventure/trail running Rp 200.000. WAJIB konfirmasi kirim foto sampel bahan tapak ke WhatsApp pelanggan terlebih dahulu agar 100% cocok dan disetujui sebelum pengeleman press pabrik!',
    price: 200000,
    priceFormatted: 'Rp 200.000',
    durationEst: '3 Hari',
    warrantyDays: 90,
    popular: true,
    isBestMenu: true,
    requiresPhotoConfirmation: true,
    suitableShoes: ['Sepatu Trail'],
    iconName: 'Layers',
    beforeAfterDescription: 'Tapak karet trail baru terpasang gagah dengan konfirmasi foto bahan disetujui pelanggan via WA.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-gunung',
    name: 'Ganti Tapak Sepatu Gunung / Hiking (Vibram Style Lugged)',
    category: 'sol',
    damageTitle: 'Tapak Sepatu Hiking Aus, Tak Berdaya di Lumpur & Karang Ciremai',
    symptoms: [
      'Gigi tapak sol gunung sudah terkikis habis licin',
      'Midsole hancur termakan usia saat pendakian',
      'Butuh grip ekstrem lugged pemecah lumpur untuk naik gunung Ciremai'
    ],
    solution: 'Pemasangan outsole hiking adventure model Vibram lugged dengan alur gerigi dalam pemecah lumpur, karet padat tahan abrasi batuan tajam, dan pengeleman thermo-curing. Termasuk konfirmasi foto bahan ke WA pelanggan.',
    price: 150000,
    priceFormatted: 'Rp 150.000',
    durationEst: '3 Hari',
    warrantyDays: 90,
    popular: true,
    isBestMenu: true,
    requiresPhotoConfirmation: true,
    suitableShoes: ['Sepatu Gunung / Hiking', 'Boots / Safety'],
    iconName: 'Layers',
    beforeAfterDescription: 'Tapak gerigi dalam tajam mencengkeram medan tanah basah & bebatuan gunung dengan aman.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-bola',
    name: 'Ganti Tapak Sepatu Bola (Cleats / Pul Studs)',
    category: 'sol',
    damageTitle: 'Pul Sol Sepatu Bola Patah, Lepas, atau Aus Gundul',
    symptoms: [
      'Pul stud patah sebelah bikin terpeleset saat manuver bola',
      'Plat bawah sepatu bola retak terbelah dua',
      'Upper sepatu masih bagus tapi pul bawaan sudah habis'
    ],
    solution: 'Penggantian tapak sol pul stud cetak pabrik lengkap (pilihan FG untuk rumput alami atau AG untuk sintetis). Dipasang presisi dengan lem struktural tahan tendangan keras.',
    price: 95000,
    priceFormatted: 'Rp 95.000',
    durationEst: '2 Hari',
    warrantyDays: 60,
    popular: false,
    suitableShoes: ['Sepatu Bola / Cleats'],
    iconName: 'ShieldCheck',
    beforeAfterDescription: 'Tapak pul stud baru kokoh menancap di rumput, siap sprint dan tendangan bebas bertenaga.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-sendal-biasa',
    name: 'Ganti Tapak Sendal Biasa (Casual / Jepit / Gunung)',
    category: 'sol',
    damageTitle: 'Alas Bawah Sendal Tipis, Licin, atau Copot Terbelah',
    symptoms: [
      'Alas sandal karet favorit sudah botak licin di kamar mandi/lantai',
      'Sol sandal gunung menganga terlepas dari tali webbing',
      'Busa spon sandal sudah kempes mengeras'
    ],
    solution: 'Penggantian tapak bawah sandal memakai karet EVA rubber tebal bertekstur anti licin, dilem panas dan dipress rata dengan jaminan awet bertahun-tahun.',
    price: 45000,
    priceFormatted: 'Rp 45.000',
    durationEst: '1 Hari',
    warrantyDays: 45,
    popular: false,
    suitableShoes: ['Sendal Biasa'],
    iconName: 'Layers',
    beforeAfterDescription: 'Tapak sandal kembali tebal anti licin, empuk melangkah tanpa takut tergelincir.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ganti-tapak-sendal-kulit',
    name: 'Ganti Tapak Sendal Kulit (Pria / Wanita)',
    category: 'sol',
    damageTitle: 'Tapak Sandal Kulit Rusak, Aus Miring, Lem Lepas',
    symptoms: [
      'Bodi kulit sandal masih mulus tapi sol bawah karetnya copot/hancur',
      'Hak sandal selop kulit sudah terkikis miring',
      'Ingin sol baru yang rapi sesuai warna kulit asli'
    ],
    solution: 'Pemasangan sol tapak karet profil rapi khusus sandal selop/kulit casual, dilem vulcanizing primer dan disulam jahit keliling agar tidak lepas saat terkena air.',
    price: 65000,
    priceFormatted: 'Rp 65.000',
    durationEst: '2 Hari',
    warrantyDays: 60,
    popular: true,
    suitableShoes: ['Sendal Kulit'],
    iconName: 'Award',
    beforeAfterDescription: 'Sandal kulit kesayangan kembali mewah dengan sol karet baru yang tahan banting dan rapi.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
  },

  // --- REGLUE & LAINNYA ---
  {
    id: 'reglue-total',
    name: 'Reglue Total & Thermo-Press Pabrik',
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
    suitableShoes: ['Sneakers', 'Sepatu Sekolah', 'Sepatu Futsal', 'Sepatu Olah Raga / Sport', 'Sepatu Kantor / Pantofel', 'Boots / Safety'],
    iconName: 'Wrench',
    beforeAfterDescription: 'Sol yang menganga 100% kembali merekat kuat tahan banting seperti baru keluar toko.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
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
    suitableShoes: ['Sneakers', 'Sepatu Sekolah', 'Running / Sport', 'Canvas / Casual'],
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
    suitableShoes: ['Sneakers', 'Sepatu Kantor / Pantofel', 'Boots / Safety', 'Sendal Kulit'],
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
    suitableShoes: ['Sneakers', 'Sepatu Sekolah', 'Sepatu Kantor / Pantofel', 'Sepatu Olah Raga / Sport', 'Sendal Kulit', 'Sendal Biasa'],
    iconName: 'Droplets',
    beforeAfterDescription: 'Bersih menyeluruh sampai sudut terdalam, bebas jamur, dan harum wangi siap dipakai.',
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
    suitableShoes: ['Sneakers', 'Sepatu Sekolah', 'Sepatu Kantor / Pantofel', 'Running / Sport'],
    iconName: 'Footprints',
    beforeAfterDescription: 'Tumit kembali empuk terlapisi rapi, pas di kaki tanpa rasa sakit atau gesekan kasar.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
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
    suitableShoes: ['Canvas / Casual', 'Sepatu Sekolah', 'Sneakers', 'Sepatu Futsal'],
    iconName: 'Scissors',
    beforeAfterDescription: 'Lubang tertutup kuat tanpa kelihatan kembung atau tambalan murahan dari luar.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
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
  { id: 'Canvas / Kain', label: 'Canvas / Kain Tekstil', desc: 'Vans, Converse, Ventela, Sepatu Sekolah', priceFactor: 1.0 },
  { id: 'Kulit Asli (Leather)', label: 'Kulit Asli (Genuine Leather)', desc: 'Pantofel kantor, Sendal kulit, Boots', priceFactor: 1.15 },
  { id: 'Suede / Nubuck', label: 'Suede / Nubuck', desc: 'Bahan berbulu halus butuh formula khusus', priceFactor: 1.25 },
  { id: 'Kulit Sintetis (Faux)', label: 'Kulit Sintetis (Faux/PU)', desc: 'Sepatu futsal, formal sintetis, sneakers', priceFactor: 1.05 },
  { id: 'Mesh / Rajut / Flyknit', label: 'Mesh / Rajut / Flyknit', desc: 'Sepatu olahraga, running sport', priceFactor: 1.0 },
  { id: 'Karet / EVA / Foam', label: 'Karet / EVA / Foam', desc: 'Sendal biasa, slip on, tapak karet', priceFactor: 1.0 }
];

export const DAMAGE_SEVERITIES: { id: DamageSeverity; label: string; badge: string; desc: string; priceFactor: number; colorClass: string }[] = [
  { id: 'kecil', label: 'Kecil / Ringan', badge: 'Minor', desc: 'Mangap ujung tipis (<3cm), baret tipis, kotor debu', priceFactor: 0.85, colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'normal', label: 'Normal / Sedang', badge: 'Standard', desc: 'Sol menganga separuh, kotor tanah, tapak aus biasa', priceFactor: 1.0, colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'hard', label: 'Hard / Parah', badge: 'Extreme', desc: 'Sol copot total dua sisi, tapak patah, robek lebar, botak licin', priceFactor: 1.35, colorClass: 'text-red-400 bg-red-500/10 border-red-500/30' }
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
  
  const raw = basePrice * matFactor * sevFactor;
  return Math.round(raw / 5000) * 5000;
}

export const COURIER_DRIVERS: CourierDriver[] = [
  { id: 'c1', name: 'Kurir Soleman (Armada Cirebon Kota)', phone: '08814519955', vehicle: 'Honda Vario Hitam (E 4521 AA)', coverageAreas: ['Kesambi', 'Kedawung', 'Pekalipan', 'Kejaksan', 'Harjamukti', 'Lemahwungkuk'] },
  { id: 'c2', name: 'Kurir Soleman (Armada Kabupaten Cirebon)', phone: '08814519955', vehicle: 'Yamaha NMAX Abu-abu (E 3189 BC)', coverageAreas: ['Sumber', 'Weru', 'Plered', 'Tengah Tani', 'Gunung Jati', 'Plumbon', 'Mundu'] },
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
      SERVICES_CATALOG[0], // Jahit Sol Benang Gak Kelihatan
      SERVICES_CATALOG[9], // Reglue
    ],
    shoes: [
      {
        id: 's1',
        pairNumber: 1,
        shoeBrand: 'Nike Air Jordan 1 Low',
        shoeType: 'Sneakers',
        material: 'Kulit Asli (Leather)',
        severity: 'normal',
        selectedServices: [SERVICES_CATALOG[0], SERVICES_CATALOG[9]],
        photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Sol kiri depan mangap kena hujan pas motoran di Tuparev. Jahit sol benang gak kelihatan sekalian.',
        price: 95000
      }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    photos: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    customNotes: 'Sol kiri depan mangap. Minta jahit sol benang tanam gak kelihatan biar tetap rapi.',
    pickupType: 'antar_jemput',
    preferredTimeSlot: 'pagi',
    location: {
      areaName: 'Kedawung / Tuparev (Kalikoa, Sutawinangun)',
      areaType: 'Kabupaten',
      shareLocViaWhatsApp: true,
      fullAddress: 'Share Loc langsung via WhatsApp Kurir Soleman',
      landmark: 'Kedawung Cirebon',
      mapsUrl: 'https://maps.google.com/?q=-6.7124,108.5398',
    },
    paymentMethod: 'cod',
    paymentStatus: 'cod_pending',
    totalServicesPrice: 95000,
    deliveryFee: 10000,
    totalAmount: 105000,
    status: 'pengerjaan',
    isAcceptedByAdmin: true,
    acceptedAt: '06 Okt, 10:25 WIB',
    assignedCourier: 'Kurir Soleman',
    assignedCourierPhone: '08814519955',
    createdAt: '2026-10-06 10:15 WIB',
    estimatedFinishedAt: '2026-10-08 16:00 WIB',
    technicianName: 'Master Teknisi Soleman',
    timeline: [
      { status: 'menunggu_jemput', label: 'Order Dibuat', timestamp: '06 Okt, 10:15', description: 'Permintaan antar-jemput diterima sistem.' },
      { status: 'perjalanan_workshop', label: 'Dijemput Kurir', timestamp: '06 Okt, 11:30', description: 'Kurir Soleman menjemput sepatu via Share Loc WhatsApp.' },
      { status: 'pengerjaan', label: 'Proses di Workshop', timestamp: '06 Okt, 13:45', description: 'Pembersihan kerak lem & proses jahit sol tanam tak kelihatan.' },
    ]
  },
  {
    id: 'SLC-3892',
    customerName: 'Siti Rahmawati',
    customerPhone: '085789123456',
    shoeBrand: 'Sepatu Sekolah & Sepatu Futsal',
    shoeType: 'Sepatu Sekolah',
    material: 'Canvas / Kain',
    severity: 'kecil',
    pairsCount: 2,
    selectedServices: [
      SERVICES_CATALOG[4], // Ganti Tapak Sepatu Sekolah
      SERVICES_CATALOG[7], // Ganti Tapak Futsal
    ],
    shoes: [
      {
        id: 's2-1',
        pairNumber: 1,
        shoeBrand: 'Warrior Sepatu Sekolah Anak',
        shoeType: 'Sepatu Sekolah',
        material: 'Canvas / Kain',
        severity: 'normal',
        selectedServices: [SERVICES_CATALOG[4]],
        photoUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Tapak bawah botak licin dipakai lari di lapangan sekolah',
        price: 75000
      },
      {
        id: 's2-2',
        pairNumber: 2,
        shoeBrand: 'Specs Futsal Sol Karet',
        shoeType: 'Sepatu Futsal',
        material: 'Kulit Sintetis (Faux)',
        severity: 'normal',
        selectedServices: [SERVICES_CATALOG[7]],
        photoUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Ganti tapak karet mentah gum sole baru anti licin',
        price: 85000
      }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
    ],
    customNotes: 'Sepatu sekolah anak & sepatu futsal suami. Ganti tapak dua-duanya.',
    pickupType: 'antar_jemput',
    preferredTimeSlot: 'siang',
    location: {
      areaName: 'Kesambi (Cipto, Sudarsono, Sunyaragi, Drajat)',
      areaType: 'Kota',
      shareLocViaWhatsApp: true,
      fullAddress: 'Share Loc langsung via WhatsApp Kurir Soleman',
      landmark: 'Kesambi Cirebon',
      mapsUrl: 'https://maps.google.com/?q=-6.7321,108.5442',
    },
    paymentMethod: 'qris',
    paymentStatus: 'lunas',
    totalServicesPrice: 160000,
    deliveryFee: 0,
    totalAmount: 160000,
    status: 'siap_antar',
    isAcceptedByAdmin: true,
    acceptedAt: '05 Okt, 14:10 WIB',
    assignedCourier: 'Kurir Soleman',
    assignedCourierPhone: '08814519955',
    createdAt: '2026-10-05 14:00 WIB',
    estimatedFinishedAt: '2026-10-07 17:00 WIB',
    technicianName: 'Master Teknisi Soleman',
    timeline: [
      { status: 'menunggu_jemput', label: 'Order Diterima', timestamp: '05 Okt, 14:00', description: 'Order 2 pasang (Gratis Ongkir Kota Cirebon).' },
      { status: 'perjalanan_workshop', label: 'Sampai di Workshop', timestamp: '05 Okt, 15:30', description: 'Sepatu tiba di Jl. Dr. Cipto No. 42 Cirebon.' },
      { status: 'pengerjaan', label: 'Ganti Tapak Selesai', timestamp: '06 Okt, 16:00', description: 'Tapak sekolah hitam tebal & tapak futsal gum sole terpasang presisi.' },
      { status: 'quality_check', label: 'Quality Check Lolos', timestamp: '07 Okt, 10:00', description: 'Pemeriksaan daya rekat & jahit kuncian Soleman.' },
      { status: 'siap_antar', label: 'Siap Diantar Kurir', timestamp: '07 Okt, 13:00', description: 'Kurir Soleman menjadwalkan pengantaran sore ini ke Kesambi.' },
    ]
  },
  {
    id: 'SLC-3893',
    customerName: 'Budi Santoso',
    customerPhone: '081987654321',
    shoeBrand: 'Sepatu Kantor Pantofel & Sendal Kulit',
    shoeType: 'Sepatu Kantor / Pantofel',
    material: 'Kulit Asli (Leather)',
    severity: 'hard',
    pairsCount: 1,
    selectedServices: [
      SERVICES_CATALOG[5], // Ganti Tapak Sepatu Kantor / Pantofel
    ],
    shoes: [
      {
        id: 's3',
        pairNumber: 1,
        shoeBrand: 'Pantofel Kulit Hitam Formal',
        shoeType: 'Sepatu Kantor / Pantofel',
        material: 'Kulit Asli (Leather)',
        severity: 'hard',
        selectedServices: [SERVICES_CATALOG[5]],
        photoUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
        damageNotes: 'Sol bawah retak terbelah dua dan hak miring licin.',
        price: 110000
      }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    photos: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'],
    customNotes: 'Hak pantofel sudah aus miring. Tolong ganti sol formal senyap.',
    pickupType: 'antar_jemput',
    preferredTimeSlot: 'sore',
    location: {
      areaName: 'Kejaksan (Siliwangi, Kartini, Sukapura, Kebonbaru)',
      areaType: 'Kota',
      shareLocViaWhatsApp: true,
      fullAddress: 'Share Loc langsung via WhatsApp Kurir Soleman',
      landmark: 'Kejaksan Cirebon',
      mapsUrl: 'https://maps.google.com/?q=-6.7119,108.5615',
    },
    paymentMethod: 'cod',
    paymentStatus: 'cod_pending',
    totalServicesPrice: 110000,
    deliveryFee: 0,
    totalAmount: 110000,
    status: 'menunggu_jemput',
    isAcceptedByAdmin: false,
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
