/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Apple, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SolemanLogo } from './SolemanLogo';

interface AppInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
}

export const AppInstallModal: React.FC<AppInstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt
}) => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios'>('android');
  const [installStatus, setInstallStatus] = useState<string>('');

  useEffect(() => {
    // Detect device automatically
    const ua = navigator.userAgent || '';
    if (/iPad|iPhone|iPod/.test(ua)) {
      setActivePlatform('ios');
    } else {
      setActivePlatform('android');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallAndroid = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setInstallStatus('Aplikasi Soleman berhasil dipasang di layar utama Anda!');
        }
      } catch (e) {
        console.warn('Install prompt error', e);
      }
    } else {
      setInstallStatus('Ikuti 2 langkah mudah di bawah untuk memasang ke HP Anda!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative lighting */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-4">
          <div className="inline-flex justify-center mb-1">
            <SolemanLogo size="sm" showSubtitle={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Aplikasi Resmi Soleman (PWA Web APK)</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Pasang Aplikasi di Android & iPhone
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Akses instan di homescreen HP: Dilengkapi Bot WA Konsultasi Kerusakan 24 Jam, Menu Terbaik, dan Antar-Jemput otomatis!
          </p>
        </div>

        {/* APK Built-in Features Highlight Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/30 mb-5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FITUR UNGGULAN BAWAAN APK SOLEMAN:</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              📸 Gemini AI Vision
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">✓</span>
              <span><strong>Gemini AI Unggah Foto:</strong> Jepret kamera langsung diagnosis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">✓</span>
              <span><strong>Menu Sesuai Kerusakan Foto:</strong> Rekomendasi 100% akurat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">✓</span>
              <span><strong>Menu Terbaik:</strong> Trail Rp 200rb, Sol Tanam Rp 45rb</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">✓</span>
              <span><strong>Logistik Jarak & J&T:</strong> Dalam kota & luar Cirebon</span>
            </div>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setActivePlatform('android')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activePlatform === 'android'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Untuk Android</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform('ios')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activePlatform === 'ios'
                ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>Untuk iPhone (iOS)</span>
          </button>
        </div>

        {/* Android Guide */}
        {activePlatform === 'android' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  Pemasangan Instan Android (WebAPK)
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/20">
                  Resmi & Ringan
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Tekan tombol di bawah untuk memasang aplikasi Soleman langsung ke layar utama Android Anda.
              </p>

              <button
                type="button"
                onClick={handleInstallAndroid}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Pasang Aplikasi Soleman (Android)</span>
              </button>

              {installStatus && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{installStatus}</span>
                </div>
              )}
            </div>

            {/* Manual Android steps if browser prompt doesn't show */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-300 text-[11px] block">
                Jika Tombol Otomatis Tidak Muncul di Browser Anda:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                <li>Buka website ini di Google Chrome / Samsung Internet.</li>
                <li>Tekan tombol **titik tiga (⋮)** di sudut kanan atas browser.</li>
                <li>Pilih **"Instal Aplikasi"** atau **"Tambahkan ke Layar Utama"**.</li>
              </ol>
            </div>
          </div>
        )}

        {/* iPhone / iOS Guide */}
        {activePlatform === 'ios' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-sky-400" />
                  Panduan Pasang di iPhone (Safari)
                </span>
                <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded font-bold border border-sky-500/20">
                  Layar Utama iOS
                </span>
              </div>

              <div className="space-y-2.5 text-slate-300">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                  <span>Buka web Soleman di browser resmi iPhone: <strong>Safari</strong>.</span>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                  <span className="flex items-center gap-1.5 flex-wrap">
                    Tekan tombol <strong>Bagikan (Share)</strong>
                    <Share2 className="w-3.5 h-3.5 text-sky-400 inline" />
                    di bagian bawah layar Safari.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                  <span className="flex items-center gap-1.5 flex-wrap">
                    Gulir ke bawah, pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>
                    <PlusSquare className="w-3.5 h-3.5 text-sky-400 inline" />.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                  <span>Tekan tombol <strong>"Tambah"</strong> di kanan atas. Selesai! Ikon Soleman langsung ada di homescreen iPhone Anda.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security & Benefits */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Bebas Virus & Ringan
          </span>
          <span>Notifikasi Servis WA Aktif</span>
        </div>
      </div>
    </div>
  );
};
