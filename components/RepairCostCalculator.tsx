/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Sparkles, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { ShoeType, ServiceItem } from '../types';
import { SERVICES_CATALOG, CIREBON_AREAS } from '../data/solcreftData';
import { soundFx } from '../services/soundEffects';

interface RepairCostCalculatorProps {
  onApplyEstimate: (data: {
    services: ServiceItem[];
    shoeType: ShoeType;
    pairsCount: number;
    areaName: string;
  }) => void;
}

export const RepairCostCalculator: React.FC<RepairCostCalculatorProps> = ({ onApplyEstimate }) => {
  const [shoeType, setShoeType] = useState<ShoeType>('Sneakers');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['reglue-total-press']);
  const [pairsCount, setPairsCount] = useState<number>(1);
  const [selectedAreaName, setSelectedAreaName] = useState<string>('Kesambi (Cipto, Sudarsono, Sunyaragi, Drajat)');

  const shoeTypeOptions: { type: ShoeType; label: string; icon: string }[] = [
    { type: 'Sneakers', label: 'Sneakers / Canvas', icon: '👟' },
    { type: 'Sepatu Kantor / Pantofel', label: 'Kulit / Pantofel', icon: '👞' },
    { type: 'Sepatu Gunung / Hiking', label: 'Gunung / Hiking', icon: '🥾' },
    { type: 'Sepatu Futsal', label: 'Sepatu Futsal', icon: '⚽' },
    { type: 'Boots / Safety', label: 'Boots / Safety', icon: '🥾' },
    { type: 'Heels / Flat Shoes', label: 'Flat Shoes / Casual', icon: '👡' }
  ];

  const popularServices = useMemo(() => {
    return SERVICES_CATALOG.slice(0, 8);
  }, []);

  const handleToggleService = (id: string) => {
    soundFx.playClick();
    setSelectedServiceIds(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedServices = useMemo(() => {
    return SERVICES_CATALOG.filter(s => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  const selectedAreaObj = useMemo(() => {
    return CIREBON_AREAS.find(a => a.name === selectedAreaName) || CIREBON_AREAS[0];
  }, [selectedAreaName]);

  // Calculations
  const calculation = useMemo(() => {
    const baseServicePrice = selectedServices.reduce((sum, item) => sum + item.price, 0);
    const subtotalServices = baseServicePrice * pairsCount;

    // Free delivery rule: Kota = 0, Kabupaten = free if pairs >= 2
    let deliveryFee = 0;
    let isFreeDelivery = false;
    let deliveryNote = '';

    if (selectedAreaObj.type === 'Kota') {
      deliveryFee = 0;
      isFreeDelivery = true;
      deliveryNote = 'Gratis Ongkir se-Kota Cirebon (Dijemput Kurir Soleman)';
    } else {
      if (pairsCount >= 2) {
        deliveryFee = 0;
        isFreeDelivery = true;
        deliveryNote = 'Promo Gratis Ongkir Kab. Cirebon (Min. 2 Pasang)';
      } else {
        deliveryFee = 10000;
        isFreeDelivery = false;
        deliveryNote = 'Ongkir Kurir Kab. Cirebon (Rp 10.000 / Gratis jika 2 pasang)';
      }
    }

    const totalEstimate = subtotalServices + deliveryFee;

    // Longest duration
    let maxDays = 2;
    if (selectedServices.some(s => s.category === 'sol' || s.id.includes('resoling'))) {
      maxDays = 3;
    }

    // Warranty: 60-90 days for reglue/resoling, 30 days for others
    let warrantyDays = 30;
    if (selectedServices.some(s => s.warrantyDays && s.warrantyDays > 30)) {
      warrantyDays = Math.max(...selectedServices.map(s => s.warrantyDays || 30));
    }

    return {
      baseServicePrice,
      subtotalServices,
      deliveryFee,
      isFreeDelivery,
      deliveryNote,
      totalEstimate,
      maxDays,
      warrantyDays
    };
  }, [selectedServices, pairsCount, selectedAreaObj]);

  const handleApply = () => {
    soundFx.playSuccess();
    onApplyEstimate({
      services: selectedServices,
      shoeType,
      pairsCount,
      areaName: selectedAreaName
    });
  };

  const handleReset = () => {
    soundFx.playClick();
    setSelectedServiceIds(['reglue-total-press']);
    setPairsCount(1);
    setShoeType('Sneakers');
    setSelectedAreaName(CIREBON_AREAS[0].name);
  };

  return (
    <section id="kalkulator" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Transparan & Akurat</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Kalkulator Estimasi Biaya & Waktu <br />
          <span className="text-amber-400">Reparasi Sepatu di Cirebon</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Hitung estimasi pengeluaran secara instan sebelum memesan. Tidak ada biaya siluman; harga transparan dan bergaransi resmi.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
          
          {/* Step 1: Jenis Sepatu */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>1. Jenis Sepatu Anda:</span>
              </label>
              <span className="text-[11px] text-slate-400">{shoeType}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {shoeTypeOptions.map(opt => {
                const isSelected = shoeType === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setShoeType(opt.type);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    <span className="text-xs font-bold leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Pilih Kerusakan / Layanan */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                2. Kerusakan & Servis yang Dibutuhkan:
              </label>
              <span className="text-[11px] text-amber-300 font-semibold">
                {selectedServiceIds.length} Layanan Dipilih
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {popularServices.map(srv => {
                const isChecked = selectedServiceIds.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleToggleService(srv.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-start gap-2.5 cursor-pointer ${
                      isChecked
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800/90 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                      isChecked ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold leading-tight text-white line-clamp-1">{srv.name}</div>
                      <div className="text-[11px] text-amber-400/90 font-mono font-semibold mt-0.5">
                        Rp {srv.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Jumlah Pasang & Lokasi Kecamatan Cirebon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Jumlah Pasang */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                3. Jumlah Sepatu:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setPairsCount(num);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                      pairsCount === num
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {num} Pasang
                  </button>
                ))}
              </div>
            </div>

            {/* Wilayah Kecamatan */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                4. Wilayah Anda di Cirebon:
              </label>
              <select
                value={selectedAreaName}
                onChange={(e) => {
                  soundFx.playClick();
                  setSelectedAreaName(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {CIREBON_AREAS.map(area => (
                  <option key={area.name} value={area.name}>
                    {area.type === 'Kota' ? '🏙️' : '📍'} {area.name} ({area.type})
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Estimasi ini dihitung berdasarkan standar teknisi Soleman Cirebon.</span>
            <button
              type="button"
              onClick={handleReset}
              className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Right Output Summary Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
              Hasil Kalkulasi Instan
            </span>
            <h3 className="text-xl font-bold text-white">Ringkasan Estimasi Biaya</h3>
            <p className="text-xs text-slate-400">
              Untuk {pairsCount} pasang sepatu {shoeType} di wilayah {selectedAreaObj.type} Cirebon.
            </p>
          </div>

          {/* Selected Breakdown List */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-400 font-semibold mb-1">Rincian Layanan ({selectedServices.length}):</div>
            {selectedServices.map(srv => (
              <div key={srv.id} className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-300 truncate max-w-[200px]">{srv.name}</span>
                <span className="text-slate-200 font-mono font-medium">Rp {srv.price.toLocaleString('id-ID')}</span>
              </div>
            ))}

            {pairsCount > 1 && (
              <div className="flex items-center justify-between py-1 text-slate-400">
                <span>Pengali Pasang:</span>
                <span className="font-bold text-white">× {pairsCount} Pasang</span>
              </div>
            )}

            <div className="flex items-center justify-between py-1 text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-sky-400" />
                <span>Ongkos Kirim Kurir:</span>
              </span>
              <span className={`font-bold font-mono ${calculation.isFreeDelivery ? 'text-emerald-400' : 'text-slate-200'}`}>
                {calculation.isFreeDelivery ? 'GRATIS (Rp 0)' : `Rp ${calculation.deliveryFee.toLocaleString('id-ID')}`}
              </span>
            </div>

            <div className="text-[10px] text-slate-400 italic">
              * {calculation.deliveryNote}
            </div>
          </div>

          {/* Big Total Price */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-center space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
              Total Estimasi Biaya
            </span>
            <div className="text-3xl font-black text-amber-400 font-mono tracking-tight">
              Rp {calculation.totalEstimate.toLocaleString('id-ID')}
            </div>
            <span className="text-[10px] text-slate-400 block">
              Bisa Bayar COD (Saat Sepatu Jadi) atau QRIS DANA
            </span>
          </div>

          {/* Duration & Warranty Badges */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Waktu Selesai:</span>
                <strong className="text-white text-xs">{calculation.maxDays} Hari Kerja</strong>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Garansi Servis:</span>
                <strong className="text-emerald-400 text-xs">{calculation.warrantyDays} Hari Resmi</strong>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 cursor-pointer active:scale-98"
          >
            <span>Pesan Jemput Dengan Estimasi Ini</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>

      </div>

    </section>
  );
};
