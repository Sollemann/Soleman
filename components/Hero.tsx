/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Truck, 
  Wrench, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Search, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { WORKSHOP_INFO } from '../data/solcreftData';
import { buildConsultationWhatsAppUrl } from '../services/whatsappHelper';

interface HeroProps {
  onOpenBooking: () => void;
  onSearchOrder: (id: string) => void;
  onExploreServices: () => void;
  onOpenDashboard: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onSearchOrder,
  onExploreServices,
  onOpenDashboard,
}) => {
  const [orderQuery, setOrderQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      onSearchOrder(orderQuery.trim());
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800/80">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Layanan Servis Sepatu Terlengkap & Presisi Cirebon</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" /> Antar-Jemput se-Cirebon
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-display">
              Sepatu Rusak & Menganga? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Soleman Kembalikan
              </span> <br />
              Kuat Seperti Baru.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Spesialis reparasi segala jenis kerusakan sepatu di Cirebon: dari <strong className="text-white">sol copot / reglue press pabrik, jahit sol keliling, ganti tapak (resoling), unyellowing, deep clean</strong>, hingga reparasi tumit. Kurir <strong className="text-amber-400">Herdi</strong> jemput langsung ke depan rumah dengan titik lokasi akurat dan <strong className="text-amber-400">update progres berkala via WhatsApp!</strong>
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-300">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Antar-Jemput ke Rumah</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garansi Resmi 30-90 Hari</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-300 col-span-2 sm:col-span-1">
                <MessageSquare className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Notifikasi WA Otomatis</span>
              </div>
            </div>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Truck className="w-5 h-5 stroke-[2.3]" />
                <span>Booking Antar-Jemput (Auto Lokasi)</span>
              </button>

              <button
                onClick={onExploreServices}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all hover:text-white"
              >
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Lihat Semua Jenis Kerusakan</span>
              </button>
            </div>

            {/* Quick Order Tracker Bar */}
            <div className="pt-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl max-w-lg">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Search className="w-3.5 h-3.5 text-amber-400" /> Lacak Status Sepatu Anda
                  </span>
                  <span className="text-[11px] text-slate-500">Contoh: SLC-3891</span>
                </div>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                    placeholder="Ketik Nomor Order (misal: SLC-3891) atau No HP..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1"
                  >
                    <span>Lacak</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Highlight Card / Visual Feature */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer decorative card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 border border-slate-800 shadow-2xl">
                
                {/* Header card */}
                <div className="flex items-start justify-between pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Workshop Soleman Cirebon</span>
                    <h3 className="text-xl font-bold text-white mt-1">Layanan Antar-Jemput Prioritas</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Area Kota & Kabupaten Cirebon • Kurir Herdi</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Truck className="w-6 h-6" />
                  </div>
                </div>

                {/* Live Process Showcase */}
                <div className="py-6 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Deteksi Lokasi GPS Otomatis</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Tinggal klik <em>"Gunakan Lokasi Saya"</em>, koordinat & link Google Maps langsung tercatat untuk panduan kurir.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Notifikasi Otomatis via WhatsApp</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Dapat pesan WA resmi saat kurir meluncur, sepatu tiba di workshop Cipto, hingga selesai direparasi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Pengerjaan Standar Pabrik & Garansi</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Teknisi bersertifikat, lem polyurethane tahan air, jahitan presisi benang wax, dan garansi sampai 90 hari.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sample Live Order Widget Preview */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      Status Penjemputan Terkini
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-mono text-[10px]">
                      LIVE GPS
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl text-xs">
                    <div>
                      <p className="font-semibold text-white">Sepatu: Nike AJ1 (Reglue + Unyellowing)</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Tuparev, Cirebon • Kurir Meluncur</p>
                    </div>
                    <button
                      onClick={onOpenDashboard}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline"
                    >
                      Buka Dashboard
                    </button>
                  </div>
                </div>

                {/* Bottom consult link */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Mau tanya biaya & kirim foto dulu?</span>
                  <a
                    href={buildConsultationWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>Konsultasi WA Gratis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
