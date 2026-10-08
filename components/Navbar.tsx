/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Wrench, 
  Truck, 
  Search, 
  LayoutDashboard, 
  Phone, 
  Menu, 
  X, 
  MapPin,
  Clock,
  ShieldCheck,
  Lock,
  LogOut
} from 'lucide-react';
import { WORKSHOP_INFO } from '../data/solcreftData';
import { AdminUser } from '../types';
import { SolemanLogo } from './SolemanLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  ordersCount: number;
  adminUser: AdminUser | null;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
  pendingOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenTracker,
  ordersCount,
  adminUser,
  onOpenAdminLogin,
  onAdminLogout,
  pendingOrdersCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'layanan', label: 'Jenis Kerusakan', icon: Wrench },
    { id: 'antar-jemput', label: 'Antar-Jemput Cirebon', icon: Truck },
    { 
      id: 'dashboard', 
      label: adminUser ? 'Admin Dashboard' : 'Dashboard Kurir', 
      icon: adminUser ? ShieldCheck : LayoutDashboard, 
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : (ordersCount > 0 ? ordersCount : undefined),
      badgeHighlight: pendingOrdersCount > 0
    },
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
        {/* Top bar info */}
        <div className="bg-gradient-to-r from-amber-600/90 via-amber-500/90 to-amber-600/90 text-slate-950 text-xs py-1.5 px-4 font-semibold">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950 text-amber-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Promo Cirebon</span>
              <span>Antar-Jemput <strong className="underline">GRATIS</strong> untuk Servis 2 Pasang Sepatu ke Atas!</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Buka Setiap Hari: 09.00 - 21.00 WIB
              </span>
              <a 
                href={`https://wa.me/${WORKSHOP_INFO.phone}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 font-bold"
              >
                <Phone className="w-3.5 h-3.5" /> WA: {WORKSHOP_INFO.phoneFormatted}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Cool Soleman Brand Logo */}
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer group"
          >
            <SolemanLogo size="md" />
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`ml-1 px-1.5 py-0.2 text-white text-[10px] rounded-full font-bold ${
                      item.badgeHighlight ? 'bg-red-500 animate-pulse' : 'bg-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Admin status or Admin Login button */}
            {adminUser ? (
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 pl-2.5 pr-1 py-1 rounded-xl text-xs">
                <span className="flex items-center gap-1 text-amber-300 font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Aktif</span>
                </span>
                <button
                  onClick={onAdminLogout}
                  className="p-1 hover:text-red-400 text-slate-400 rounded-lg hover:bg-slate-800 transition-colors ml-1"
                  title="Logout Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-amber-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all"
                title="Masuk sebagai Administrator Soleman"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login Admin</span>
              </button>
            )}

            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all hover:text-amber-400"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Lacak</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Truck className="w-4 h-4 stroke-[2.5]" />
              <span>Pesan Jemput</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-950 bg-amber-400"
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
        <div className="fixed inset-0 top-[110px] z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 p-6 flex flex-col justify-between lg:hidden overflow-y-auto">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold px-2">Menu Navigasi</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900/80 text-slate-200 border border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
              {adminUser ? (
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin: {adminUser.email}</span>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onAdminLogout(); }}
                    className="px-2.5 py-1 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 flex items-center gap-1 text-[11px] font-bold"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdminLogin(); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-amber-400 border border-slate-700/80"
                >
                  <Lock className="w-4 h-4" />
                  <span>Login Khusus Admin (50zarwtn50@gmail.com)</span>
                </button>
              )}

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTracker(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-slate-900 text-slate-200 border border-slate-700"
              >
                <Search className="w-4 h-4" />
                <span>Cek Status / Lacak Sepatu Anda</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
              >
                <Truck className="w-4 h-4" />
                <span>Form Booking Antar-Jemput</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <p>Workshop Soleman Cirebon - Jl. Dr. Cipto No. 42</p>
            <p className="mt-1 font-semibold text-amber-400">WhatsApp: {WORKSHOP_INFO.phoneFormatted}</p>
          </div>
        </div>
      )}
    </>
  );
};
