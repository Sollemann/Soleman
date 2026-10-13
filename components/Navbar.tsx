/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Wrench, 
  Truck, 
  Search, 
  Phone, 
  Menu, 
  X, 
  MapPin,
  Clock,
  ShieldCheck,
  LogOut,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  QrCode,
  Wallet
} from 'lucide-react';
import { WORKSHOP_INFO } from '../data/solcreftData';
import { AdminUser, CourierUser, CustomerUser } from '../types';
import { SolemanLogo } from './SolemanLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  ordersCount: number;
  adminUser: AdminUser | null;
  courierUser: CourierUser | null;
  customerUser: CustomerUser | null;
  onAdminLogout: () => void;
  onCourierLogout: () => void;
  onOpenStaffPortal: () => void;
  onOpenCustomerAuth: () => void;
  onOpenCustomerProfile: () => void;
  onOpenInstallModal?: () => void;
  onOpenQrModal?: () => void;
  onOpenWaBot: () => void;
  pendingOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenTracker,
  ordersCount,
  adminUser,
  courierUser,
  customerUser,
  onAdminLogout,
  onCourierLogout,
  onOpenStaffPortal,
  onOpenCustomerAuth,
  onOpenCustomerProfile,
  onOpenQrModal,
  onOpenWaBot,
  pendingOrdersCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'layanan', label: 'Menu Servis & Terbaik', icon: Wrench },
    { id: 'antar-jemput', label: 'Antar-Jemput & Jarak', icon: Truck },
    { id: 'dashboard', label: 'Lacak Sepatu', icon: Search },
    { id: 'workshop', label: 'Lokasi Workshop', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
        {/* Top bar promo & logistics info */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs py-1.5 px-4 font-semibold">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950 text-amber-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-black">
                Logistik Jarak
              </span>
              <span>
                Kota Cirebon <strong className="underline">GRATIS ONGKIR</strong> • Jauh via Grab/Maxim • Luar Kota J&T Express
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-medium">
              {onOpenQrModal && (
                <button
                  type="button"
                  onClick={onOpenQrModal}
                  className="flex items-center gap-1 bg-slate-950/90 hover:bg-slate-950 text-sky-300 px-2 py-0.5 rounded-md font-bold transition-colors shadow-sm border border-sky-400/40 cursor-pointer"
                  title="Buka Kode QR DANA & Transfer Workshop Soleman"
                >
                  <QrCode className="w-3.5 h-3.5 text-sky-400" />
                  <span>Kode QR DANA</span>
                </button>
              )}
              <a 
                href={`https://wa.me/${WORKSHOP_INFO.phone}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex hover:underline items-center gap-1 font-bold"
              >
                <Phone className="w-3.5 h-3.5" /> WA: {WORKSHOP_INFO.phoneFormatted}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Soleman Brand Logo with Hidden Staff Portal Trigger on Emblem */}
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer group"
          >
            <SolemanLogo size="md" onStaffAccess={onOpenStaffPortal} />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Customer Auth + Bot WA + Booking */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Gemini AI Bot Vision Button */}
            <button
              onClick={onOpenWaBot}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition-all shadow-sm"
              title="Konsultasi Kerusakan Sepatu & Unggah Foto via Gemini AI 24 Jam"
            >
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>Gemini AI Vision</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-black">
                FOTO
              </span>
            </button>

            {/* Customer Account Button (Login / Profile) */}
            {customerUser ? (
              <button
                onClick={onOpenCustomerProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {customerUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[80px] truncate">{customerUser.name}</span>
              </button>
            ) : (
              <button
                onClick={onOpenCustomerAuth}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Masuk Akun</span>
              </button>
            )}

            {/* Booking Jemput */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Truck className="w-4 h-4 stroke-[2.5]" />
              <span>Pesan Jemput</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenWaBot}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30"
              title="Foto Kerusakan Sepatu via Gemini AI"
            >
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>Foto AI</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 shadow-md shadow-amber-500/20"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Jemput</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[102px] sm:top-[112px] bottom-0 z-40 bg-slate-950/98 backdrop-blur-2xl border-t border-slate-800 p-4 sm:p-6 flex flex-col justify-between lg:hidden overflow-y-auto pb-32">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Menu Layanan Soleman</p>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900/80 text-slate-200 border border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              {/* Gemini AI Bot Vision Button */}
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenWaBot(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>📸 Gemini AI Vision: Unggah Foto & Cek Menu</span>
              </button>

              {/* QR DANA / Transfer Button */}
              {onOpenQrModal && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenQrModal(); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-sky-950/40 text-sky-300 border border-sky-500/30 hover:bg-sky-950/60 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-sky-400" />
                  <span>📱 Kode QR DANA Workshop (0881-4519-955)</span>
                </button>
              )}

              {/* Customer Account Button */}
              {customerUser ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenCustomerProfile(); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 font-bold"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Akun: {customerUser.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Aktif</span>
                </button>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenCustomerAuth(); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white border border-slate-700"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Masuk / Daftar Akun Pelanggan (Keamanan FB)</span>
                </button>
              )}

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
              >
                <Truck className="w-4 h-4" />
                <span>Pesan Antar-Jemput Sepatu</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400">
            <p>Workshop Soleman Cirebon - Jl. Sukalila Selatan</p>
            <p className="mt-0.5 font-semibold text-amber-400">WhatsApp: {WORKSHOP_INFO.phoneFormatted}</p>
          </div>
        </div>
      )}
    </>
  );
};
