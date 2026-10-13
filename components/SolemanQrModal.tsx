/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  X, 
  Copy, 
  Check, 
  Share2, 
  Download, 
  Smartphone, 
  ShieldCheck, 
  ExternalLink,
  Wallet
} from 'lucide-react';
import { WORKSHOP_INFO } from '../data/solcreftData';

interface SolemanQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  nominal?: number;
  orderSerial?: string;
}

export const SolemanQrModal: React.FC<SolemanQrModalProps> = ({
  isOpen,
  onClose,
  nominal,
  orderSerial
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'dana' | 'qris'>('dana');
  const [qrDataUrl, setQrDataUrl] = useState<string>('/soleman-dana-qr.svg');

  const danaPhoneNumber = WORKSHOP_INFO.phoneFormatted; // 0881-4519-955
  const rawDanaNumber = WORKSHOP_INFO.phone; // 628814519955
  const danaAccountName = 'SOLEMAN SHOES REPAIR CIREBON';

  useEffect(() => {
    // Generate high quality QR code data URL
    const qrPayload = activeTab === 'dana' 
      ? `https://link.dana.id/m/${rawDanaNumber}` 
      : `00020101021126580014ID.LINKAJA.WWW011893600911002200000051440014ID.DANA.WWW0215ID10243589201925204581253033605802ID5920SOLEMAN SHOE REPAIR6007CIREBON61054511862070703A016304${orderSerial || 'SLC'}`;

    QRCode.toDataURL(qrPayload, {
      width: 400,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.warn('QR generate fallback', err);
      setQrDataUrl('/soleman-dana-qr.svg');
    });
  }, [activeTab, rawDanaNumber, orderSerial]);

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('08814519955');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    const shareText = `Halo! Ini Kode QR Pembayaran Resmi DANA Workshop Soleman Shoes Repair Cirebon (0881-4519-955): https://wa.me/628814519955`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kode QR DANA Soleman Cirebon',
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled or fallback
      }
    } else {
      handleCopyNumber();
    }
  };

  const handleDownloadQr = () => {
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR-Soleman-Cirebon-${activeTab.toUpperCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-amber-500/30 p-5 sm:p-6 shadow-2xl relative text-center space-y-4 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Selector: DANA QR vs QRIS */}
        <div className="flex items-center justify-center p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('dana')}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'dana'
                ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>QR DANA Resmi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qris')}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'qris'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QRIS Semua Bank</span>
          </button>
        </div>

        {/* Authentic DANA Card UI replica */}
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-200 text-slate-900 space-y-3 relative overflow-hidden">
          
          {/* Top DANA Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-sky-500 flex items-center justify-center text-white font-black text-[11px] shadow-sm">
                D
              </div>
              <div className="text-left leading-tight">
                <span className="text-[11px] font-black tracking-wider text-sky-600 block uppercase">
                  {activeTab === 'dana' ? 'DANA QR PROFIL' : 'QRIS NASIONAL'}
                </span>
                <span className="text-[9px] text-slate-500 font-semibold block">Soleman Shoes Repair</span>
              </div>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              Terverifikasi
            </span>
          </div>

          {/* Masked / Full Phone Number Banner */}
          <div className="py-1 px-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-mono font-bold text-slate-700 tracking-wider">
              {activeTab === 'dana' ? '62-8814***9955' : 'NMID: ID1024358920192'}
            </span>
            <span className="block text-[10px] text-slate-500">
              Soleman Workshop (Sukalila Selatan)
            </span>
          </div>

          {/* High Resolution Scannable QR Matrix */}
          <div className="relative mx-auto w-48 h-48 sm:w-52 sm:h-52 bg-white p-2 rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner">
            <img
              src={qrDataUrl}
              alt="Kode QR Resmi Soleman Cirebon"
              className="w-full h-full object-contain"
            />
            {/* Center Logo Emblem */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-white shadow-md border-2 border-sky-500 flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-sky-500 flex items-center justify-center text-white font-black text-xs">
                  {activeTab === 'dana' ? 'D' : 'S'}
                </div>
              </div>
            </div>
          </div>

          {/* Text underneath like in user's image */}
          <p className="text-[10px] text-slate-500 leading-tight px-1 font-medium">
            {activeTab === 'dana'
              ? 'Ajak teman yang ada di dekat kamu memindai kode QR ini untuk memulai transaksi'
              : 'Scan memakai aplikasi BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay'
            }
          </p>

          {/* Optional Tagihan Display */}
          {nominal && nominal > 0 && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">Nominal Tagihan:</span>
              <span className="text-amber-600 font-mono text-sm">
                Rp {nominal.toLocaleString('id-ID')}
              </span>
            </div>
          )}

          {/* BAGIKAN Blue Button from user photo */}
          <button
            type="button"
            onClick={handleShare}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-black text-xs shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>BAGIKAN</span>
          </button>
        </div>

        {/* Secondary Action Controls */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyNumber}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'Tersalin: 08814519955' : 'Salin No. DANA'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700"
              title="Unduh file gambar QR"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Simpan</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Alamat: Jl. Sukalila Selatan, Kota Cirebon</span>
          </p>
        </div>

      </div>
    </div>
  );
};
