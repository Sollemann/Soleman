/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Phone, 
  Compass, 
  FileCheck, 
  Camera, 
  Upload, 
  X, 
  Layers, 
  Info,
  Sparkles
} from 'lucide-react';
import { 
  SERVICES_CATALOG, 
  CIREBON_AREAS, 
  WORKSHOP_INFO, 
  SHOE_MATERIALS, 
  DAMAGE_SEVERITIES, 
  calculateServicePrice 
} from '../data/solcreftData';
import { ServiceItem, ShoeType, ShoeMaterial, DamageSeverity, Order, ShoeItemDetail } from '../types';
import { buildNewOrderWhatsAppUrl, buildGoogleMapsRouteUrl } from '../services/whatsappHelper';

interface PairFormItem {
  id: string;
  pairNumber: number;
  shoeBrand: string;
  shoeType: ShoeType;
  material: ShoeMaterial;
  severity: DamageSeverity;
  serviceIds: string[];
  customNotes: string;
  photoPreview?: string;
}

interface PickupOrderSectionProps {
  initialServices?: ServiceItem[];
  initialShoeType?: ShoeType;
  initialPairsCount?: number;
  initialArea?: string;
  onOrderCreated: (order: Order) => void;
  onOpenDashboard: () => void;
}

export const PickupOrderSection: React.FC<PickupOrderSectionProps> = ({
  initialServices,
  initialShoeType,
  initialPairsCount,
  initialArea,
  onOrderCreated,
  onOpenDashboard
}) => {
  // Customer Info State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pairsCount, setPairsCount] = useState<number>(initialPairsCount || 1);
  const [activePairIndex, setActivePairIndex] = useState<number>(0);

  // Shoes Data State (Supports 1, 2, 3, 4, 5+ pairs)
  const [shoesList, setShoesList] = useState<PairFormItem[]>([
    {
      id: 'pair-1',
      pairNumber: 1,
      shoeBrand: '',
      shoeType: initialShoeType || 'Sneakers',
      material: 'Canvas / Kain',
      severity: 'normal',
      serviceIds: initialServices && initialServices.length > 0 ? initialServices.map(s => s.id) : ['reglue-total'],
      customNotes: '',
      photoPreview: undefined
    }
  ]);

  // Delivery & Location State
  const [pickupType, setPickupType] = useState<'antar_jemput' | 'hanya_jemput' | 'drop_off'>('antar_jemput');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<'pagi' | 'siang' | 'sore'>('siang');
  const [areaName, setAreaName] = useState<string>(initialArea || CIREBON_AREAS[0].name);
  const [fullAddress, setFullAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'locating' | 'success' | 'error'>('idle');
  const [gpsErrorMessage, setGpsErrorMessage] = useState('');

  // UI state
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [validationError, setValidationError] = useState('');

  // Synchronize shoesList when pairsCount changes
  useEffect(() => {
    setShoesList(prev => {
      const current = [...prev];
      if (pairsCount > current.length) {
        for (let i = current.length + 1; i <= pairsCount; i++) {
          current.push({
            id: `pair-${i}`,
            pairNumber: i,
            shoeBrand: '',
            shoeType: 'Sneakers',
            material: 'Canvas / Kain',
            severity: 'normal',
            serviceIds: ['reglue-total'],
            customNotes: '',
            photoPreview: undefined
          });
        }
      } else if (pairsCount < current.length) {
        return current.slice(0, pairsCount);
      }
      return current;
    });

    if (activePairIndex >= pairsCount) {
      setActivePairIndex(pairsCount - 1);
    }
  }, [pairsCount]);

  // Handle GPS detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('error');
      setGpsErrorMessage('Browser tidak mendukung pendeteksian lokasi GPS.');
      return;
    }

    setGpsStatus('locating');
    setGpsErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setGpsCoords({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy)
        });
        setGpsStatus('success');
      },
      (error) => {
        setGpsStatus('error');
        setGpsErrorMessage('Izin lokasi tidak aktif atau koneksi satelit lemah.');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  // Active shoe item helper functions
  const activeShoe = shoesList[activePairIndex] || shoesList[0];

  const updateActiveShoe = (updates: Partial<PairFormItem>) => {
    setShoesList(prev => prev.map((item, idx) => {
      if (idx === activePairIndex) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  const toggleServiceForActiveShoe = (serviceId: string) => {
    const currentServices = activeShoe.serviceIds;
    let nextServices: string[];
    if (currentServices.includes(serviceId)) {
      if (currentServices.length > 1) {
        nextServices = currentServices.filter(id => id !== serviceId);
      } else {
        nextServices = currentServices;
      }
    } else {
      nextServices = [...currentServices, serviceId];
    }
    updateActiveShoe({ serviceIds: nextServices });
  };

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setValidationError('Ukuran foto maksimal 8 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      updateActiveShoe({ photoPreview: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateActiveShoe({ photoPreview: undefined });
  };

  // Calculate pricing per shoe & total
  const shoeDetailsWithPrices: ShoeItemDetail[] = shoesList.map((shoe, idx) => {
    const selectedServiceObjs = SERVICES_CATALOG.filter(s => shoe.serviceIds.includes(s.id));
    const pairPrice = selectedServiceObjs.reduce((sum, s) => {
      return sum + calculateServicePrice(s.price, shoe.material, shoe.severity);
    }, 0);

    return {
      id: shoe.id,
      pairNumber: idx + 1,
      shoeBrand: shoe.shoeBrand || `Sepatu #${idx + 1}`,
      shoeType: shoe.shoeType,
      material: shoe.material,
      severity: shoe.severity,
      selectedServices: selectedServiceObjs,
      photoUrl: shoe.photoPreview,
      damageNotes: shoe.customNotes,
      price: pairPrice
    };
  });

  const totalServicesPrice = shoeDetailsWithPrices.reduce((sum, s) => sum + s.price, 0);
  const activeAreaObj = CIREBON_AREAS.find(a => a.name === areaName) || CIREBON_AREAS[0];
  const deliveryFee = (pickupType === 'drop_off' || pairsCount >= 2) ? 0 : activeAreaObj.deliveryFee;
  const grandTotal = totalServicesPrice + deliveryFee;

  // Handle Order Submit
  const handleCreateOrder = (sendToWhatsApp: boolean = false) => {
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError('Silakan masukkan nama lengkap Anda.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 9) {
      setValidationError('Silakan masukkan nomor WhatsApp aktif Anda.');
      return;
    }

    // Check if any shoe brand is empty
    const emptyBrandIndex = shoesList.findIndex(s => !s.shoeBrand.trim());
    if (emptyBrandIndex !== -1) {
      setValidationError(`Silakan isi Merk & Tipe untuk Sepatu #${emptyBrandIndex + 1}.`);
      setActivePairIndex(emptyBrandIndex);
      return;
    }

    if (pickupType !== 'drop_off' && !fullAddress.trim()) {
      setValidationError('Silakan masukkan alamat penjemputan di Cirebon.');
      return;
    }

    const mapsUrl = gpsCoords 
      ? `https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress + ', ' + areaName + ', Cirebon')}`;

    // Collect all photos
    const allPhotos = shoeDetailsWithPrices
      .map(s => s.photoUrl)
      .filter((url): url is string => Boolean(url));

    const allServicesFlattened = Array.from(
      new Set(shoeDetailsWithPrices.flatMap(s => s.selectedServices))
    );

    const summaryBrand = pairsCount === 1 
      ? shoesList[0].shoeBrand 
      : `${shoesList[0].shoeBrand} (+${pairsCount - 1} pasang)`;

    const newOrder: Order = {
      id: `SLC-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      shoeBrand: summaryBrand,
      shoeType: shoesList[0].shoeType,
      material: shoesList[0].material,
      severity: shoesList[0].severity,
      pairsCount,
      selectedServices: allServicesFlattened,
      shoes: shoeDetailsWithPrices,
      customNotes: shoesList.map(s => s.customNotes).filter(Boolean).join(' | ') || undefined,
      photoUrl: allPhotos[0],
      photos: allPhotos,
      pickupType,
      preferredTimeSlot,
      location: {
        areaName,
        fullAddress: pickupType === 'drop_off' ? WORKSHOP_INFO.address : fullAddress.trim(),
        landmark: landmark.trim(),
        lat: gpsCoords?.lat,
        lng: gpsCoords?.lng,
        accuracy: gpsCoords?.accuracy,
        mapsUrl,
        detectedViaGps: gpsStatus === 'success',
      },
      totalServicesPrice,
      deliveryFee,
      totalAmount: grandTotal,
      status: 'menunggu_jemput',
      isAcceptedByAdmin: false,
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      estimatedFinishedAt: '2 - 3 Hari Kerja',
      technicianName: 'Master Teknisi Soleman',
      timeline: [
        {
          status: 'menunggu_jemput',
          label: 'Order Booking Dibuat',
          timestamp: 'Baru saja',
          description: `Booking ${pairsCount} pasang sepatu & foto kerusakan diterima di dashboard admin. Menunggu konfirmasi admin & kurir Herdi.`
        }
      ]
    };

    setCreatedOrder(newOrder);
    onOrderCreated(newOrder);

    if (sendToWhatsApp) {
      const waUrl = buildNewOrderWhatsAppUrl(newOrder);
      window.open(waUrl, '_blank');
    }
  };

  return (
    <section id="antar-jemput" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5" />
          <span>Antar-Jemput Sepatu Se-Cirebon • Kurir Herdi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Booking Servis Sepatu & Antar-Jemput <br />
          <span className="text-amber-400">Pilihan Bahan, Tingkat Kerusakan & Kirim Foto ke Admin</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
          Bisa pilih reparasi untuk 1 pasang, 2 pasang, hingga banyak sepatu sekaligus. Setiap pasang dapat disesuaikan jenis bahan, keparahan (Kecil/Normal/Hard), dan upload foto fisiknya langsung ke dashboard admin Soleman!
        </p>
      </div>

      {/* Success Banner if order created */}
      {createdOrder && (
        <div className="mt-8 p-6 rounded-3xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 shadow-2xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-lg shadow-emerald-500/25">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Order & Foto Berhasil Dikirim ke Dashboard Admin</span>
              <h3 className="text-xl font-extrabold text-white">Order #{createdOrder.id} Siap Dijemput Kurir Herdi!</h3>
              <p className="text-xs text-emerald-300 leading-relaxed">
                Rincian {createdOrder.pairsCount} pasang sepatu dan foto kerusakan telah masuk langsung ke Dashboard Admin Soleman. Admin & kurir Herdi akan segera memverifikasi dan menjadwalkan penjemputan ke alamat Anda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all"
            >
              <span>Pantau Status di Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href={buildNewOrderWhatsAppUrl(createdOrder)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat Admin WA (0881-4519-955) [Opsional]</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Booking Form Grid */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Data Pelanggan + Pengaturan Sepatu Per Pasang (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Data Kontak & Jumlah Pasang */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="text-sm font-bold text-white">Data Kontak & Jumlah Pasang Sepatu</h3>
              </div>
              {pairsCount >= 2 && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  🎉 Promo Gratis Ongkir Cirebon Aktif
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Nama Pelanggan *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Dimas Prasetyo"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Pilihan Jumlah Pasang Sepatu: 1, 2, 3, 4, 5+ */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Pilih Berapa Pasang Sepatu yang Mau Diservis?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPairsCount(num)}
                    className={`py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                      pairsCount === num
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num} {num >= 5 ? 'Pasang+' : 'Pasang'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                * Minimal 2 pasang sepatu otomatis mendapatkan <strong className="text-amber-400">Gratis Antar-Jemput</strong> se-Cirebon!
              </p>
            </div>
          </div>

          {/* Card 2: Pengaturan Rinci Sepatu Per Pasang (Tabs Sepatu #1, Sepatu #2, dst.) */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="text-sm font-bold text-white">
                  Rincian Kerusakan: Sepatu #{activePairIndex + 1}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                Subtotal: Rp {shoeDetailsWithPrices[activePairIndex]?.price.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Tabs Pilihan Sepatu (Jika 2 pasang atau lebih) */}
            {pairsCount > 1 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Pilih Sepatu yang Sedang Dikonfigurasi:
                </span>
                <div className="flex flex-wrap gap-2">
                  {shoesList.map((shoe, idx) => {
                    const isConfigured = Boolean(shoe.shoeBrand.trim());
                    return (
                      <button
                        key={shoe.id}
                        type="button"
                        onClick={() => setActivePairIndex(idx)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          activePairIndex === idx
                            ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>Sepatu #{idx + 1}</span>
                        {isConfigured && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Merk & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Merk & Model Sepatu #{activePairIndex + 1} *
                </label>
                <input
                  type="text"
                  value={activeShoe.shoeBrand}
                  onChange={(e) => updateActiveShoe({ shoeBrand: e.target.value })}
                  placeholder="Contoh: Nike Air Jordan 1 / Vans Old Skool"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Jenis Sepatu
                </label>
                <select
                  value={activeShoe.shoeType}
                  onChange={(e) => updateActiveShoe({ shoeType: e.target.value as ShoeType })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="Sneakers">Sneakers (Nike, Adidas, Converse, dsb)</option>
                  <option value="Pantofel / Formal">Pantofel / Formal Kulit Kantor</option>
                  <option value="Boots / Safety">Boots / Safety Shoes / Docmart</option>
                  <option value="Running / Sport">Running / Sport / Futsal</option>
                  <option value="Heels / Flat Shoes">Heels / Flat Shoes</option>
                  <option value="Canvas / Casual">Canvas / Casual</option>
                </select>
              </div>
            </div>

            {/* BAHAN MATERIAL SEPATU */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Bahan Material Sepatu #{activePairIndex + 1}:</span>
                <span className="text-[11px] font-normal text-amber-400">Treatment Khusus per Bahan</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHOE_MATERIALS.map(mat => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => updateActiveShoe({ material: mat.id })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      activeShoe.material === mat.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{mat.label}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{mat.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* TINGKAT KEPARAHAN KERUSAKAN: KECIL, NORMAL, HARD */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Tingkat Keparahan Kerusakan Sepatu #{activePairIndex + 1}:</span>
                <span className="text-[11px] font-normal text-slate-400">Harga Menyesuaikan Tingkat Kesulitan</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DAMAGE_SEVERITIES.map(sev => (
                  <button
                    key={sev.id}
                    type="button"
                    onClick={() => updateActiveShoe({ severity: sev.id })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      activeShoe.severity === sev.id
                        ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white">{sev.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border ${sev.colorClass}`}>
                        {sev.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">{sev.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* PILIHAN LAYANAN KERUSAKAN UNTUK SEPATU INI */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Pilih Layanan Reparasi Sepatu #{activePairIndex + 1}:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES_CATALOG.map(serv => {
                  const isChecked = activeShoe.serviceIds.includes(serv.id);
                  const adjustedPrice = calculateServicePrice(serv.price, activeShoe.material, activeShoe.severity);

                  return (
                    <div
                      key={serv.id}
                      onClick={() => toggleServiceForActiveShoe(serv.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span>{serv.name}</span>
                      </div>
                      <span className="text-amber-400 font-bold shrink-0 font-mono">
                        Rp {adjustedPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* UPLOAD FOTO SEPATU RUSAK */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-sky-400" />
                    Kirim Gambar Sepatu #{activePairIndex + 1} ke Admin
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Upload foto kondisi sepatu yang rusak agar mempermudah teknisi mengecek sebelum dijemput.
                  </p>
                </div>
              </div>

              {activeShoe.photoPreview ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 max-w-xs">
                  <img
                    src={activeShoe.photoPreview}
                    alt={`Preview Sepatu #${activePairIndex + 1}`}
                    className="w-full h-36 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-md"
                    title="Hapus Foto"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="p-1.5 bg-slate-950/80 text-[10px] text-emerald-400 font-bold text-center">
                    ✓ Foto siap dicek admin & teknisi
                  </div>
                </div>
              ) : (
                <div>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-300">Ambil Foto / Pilih dari Galeri</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Format JPG, PNG (Maks 8MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Catatan Tambahan Khusus Sepatu Ini */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Catatan Khusus untuk Sepatu #{activePairIndex + 1} (Opsional)
              </label>
              <input
                type="text"
                value={activeShoe.customNotes}
                onChange={(e) => updateActiveShoe({ customNotes: e.target.value })}
                placeholder="Contoh: Sol mangap depan kiri & ada noda kecap di samping kanvas"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>

          </div>

          {/* Card 3: Lokasi & Antar-Jemput */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="text-sm font-bold text-white">Titik Lokasi Antar-Jemput di Cirebon</h3>
            </div>

            {/* Metode Layanan */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'antar_jemput', title: 'Antar-Jemput', desc: 'Kurir jemput & antar balik' },
                { id: 'hanya_jemput', title: 'Jemput Saja', desc: 'Ambil di workshop Cipto' },
                { id: 'drop_off', title: 'Drop-Off Mandiri', desc: 'Antar sendiri ke workshop' },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPickupType(m.id as any)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    pickupType === m.id
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{m.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>

            {pickupType !== 'drop_off' && (
              <>
                {/* Auto GPS Detection Button */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      Kunci Titik GPS Rumah Anda
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Otomatis membuat tautan navigasi kurir ke WhatsApp.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={gpsStatus === 'locating'}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 shadow transition-all shrink-0"
                  >
                    {gpsStatus === 'locating' ? 'Mencari...' : '📍 Gunakan Lokasi GPS Saya'}
                  </button>
                </div>

                {gpsStatus === 'success' && gpsCoords && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-mono text-[11px]">
                    ✓ GPS Terkunci: {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)} (Akurasi ±{gpsCoords.accuracy}m)
                  </div>
                )}

                {/* Kecamatan di Cirebon */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Wilayah Kecamatan di Cirebon *
                  </label>
                  <select
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {CIREBON_AREAS.map(a => (
                      <option key={a.name} value={a.name}>
                        {a.name} ({a.type} Cirebon) — Estimasi kurir tiba: {a.estimatedPickupHours}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Alamat Lengkap */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Alamat Lengkap (Jalan, No Rumah, RT/RW, Perumahan) *
                  </label>
                  <textarea
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    rows={2}
                    placeholder="Contoh: Jl. Tuparev No. 128, RT 02/RW 04, Sutawinangun, Kedawung, Cirebon"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Patokan Rumah */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Patokan Rumah (Sangat Mempermudah Kurir)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Contoh: Pagar hitam depan Indomaret Tuparev, rumah cat hijau"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Jam Jemput */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Preferensi Jam Jemput Kurir
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pagi', label: 'Pagi (09:00 - 12:00)' },
                      { id: 'siang', label: 'Siang (13:00 - 16:00)' },
                      { id: 'sore', label: 'Sore (16:00 - 19:00)' },
                    ].map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setPreferredTimeSlot(slot.id as any)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all ${
                          preferredTimeSlot === slot.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Right Summary Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-5">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl">
            
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Rincian Order Lengkap</span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                Total {pairsCount} Pasang Sepatu
              </h3>
            </div>

            {/* Validation alert */}
            {validationError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{validationError}</span>
              </div>
            )}

            {/* List per pair with materials and severities */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {shoeDetailsWithPrices.map((sh, idx) => (
                <div key={sh.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-white">Sepatu #{idx + 1}: {sh.shoeBrand || 'Belum diisi'}</span>
                    <span className="text-amber-400 font-mono">Rp {sh.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">{sh.shoeType}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">{sh.material}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-300">
                      Kerusakan: {sh.severity.toUpperCase()}
                    </span>
                    {sh.photoUrl && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                        📷 Foto Terlampir
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    Layanan: {sh.selectedServices.map(s => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal Layanan ({pairsCount} psg)</span>
                <span className="font-mono text-white">Rp {totalServicesPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Ongkir Antar-Jemput Cirebon</span>
                <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'font-mono text-white'}>
                  {deliveryFee === 0 ? 'GRATIS (Promo 2+ Psg)' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline font-bold">
                <span className="text-sm text-slate-200">Total Estimasi</span>
                <span className="text-2xl text-amber-400 font-mono font-black">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleCreateOrder(false)}
                className="w-full py-4 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShieldCheck className="w-4 h-4 stroke-[2.4]" />
                <span>Kirim Order & Foto ke Dashboard Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleCreateOrder(true)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Kirim juga via WhatsApp (0881-4519-955)</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>✓ Foto sepatu Anda langsung terkirim ke dashboard admin Soleman untuk diperiksa kondisinya.</p>
              <p>✓ Kurir Herdi akan segera ditugaskan menjemput ke alamat Anda se-Cirebon.</p>
              <p>✓ Garansi resmi 30 hingga 90 hari untuk setiap pasang sepatu.</p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
