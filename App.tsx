/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DamageCatalog } from './components/DamageCatalog';
import { PickupOrderSection } from './components/PickupOrderSection';
import { DashboardView } from './components/DashboardView';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { WorkshopLocationSection } from './components/WorkshopLocationSection';
import { TestimonialsAndFaq } from './components/TestimonialsAndFaq';
import { CustomerTrackerModal } from './components/CustomerTrackerModal';
import { Footer } from './components/Footer';
import { INITIAL_ORDERS, WORKSHOP_INFO } from './data/solcreftData';
import { Order, OrderStatus, ServiceItem, ShoeType, AdminUser } from './types';
import { adminAuthService } from './services/adminAuthService';
import { MessageSquare, Phone, Truck, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'solcreft_orders_cirebon_v1';

export const App: React.FC = () => {
  // Orders State (loaded from localStorage or initialized with realistic Cirebon sample orders)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load orders from localStorage', e);
    }
    return INITIAL_ORDERS;
  });

  // Admin Authentication State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    return adminAuthService.getCurrentUser();
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Navigation & Modal State
  const [activeTab, setActiveTab] = useState<string>('layanan');
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerQuery, setTrackerQuery] = useState('');

  // Preselected data for Pickup Section
  const [preselectedServices, setPreselectedServices] = useState<ServiceItem[]>([]);
  const [preselectedShoeType, setPreselectedShoeType] = useState<ShoeType>('Sneakers');
  const [preselectedPairsCount, setPreselectedPairsCount] = useState<number>(1);
  const [preselectedArea, setPreselectedArea] = useState<string>('');

  // Count pending unaccepted orders
  const pendingOrdersCount = orders.filter(o => !o.isAcceptedByAdmin).length;

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Handle adding new order
  const handleOrderCreated = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  // Handle accepting order by Admin
  const handleAcceptOrder = (orderId: string, courierName: string, courierPhone: string) => {
    const timeStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const acceptTimeline = {
        status: 'perjalanan_workshop' as OrderStatus,
        label: 'Pesanan Diterima Admin',
        timestamp: timeStr,
        description: `Pesanan diterima & dikonfirmasi oleh Admin. Kurir ${courierName} ditugaskan untuk penjemputan.`
      };

      return {
        ...order,
        isAcceptedByAdmin: true,
        acceptedAt: timeStr + ' WIB',
        assignedCourier: courierName,
        assignedCourierPhone: courierPhone,
        status: 'perjalanan_workshop' as OrderStatus,
        timeline: [acceptTimeline, ...order.timeline]
      };
    }));
  };

  // Handle rejecting order by Admin
  const handleRejectOrder = (orderId: string, reason: string) => {
    const timeStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const rejectTimeline = {
        status: 'menunggu_jemput' as OrderStatus,
        label: 'Pesanan Dibatalkan',
        timestamp: timeStr,
        description: `Pesanan dibatalkan/ditolak admin: ${reason}`
      };

      return {
        ...order,
        isAcceptedByAdmin: false,
        customNotes: (order.customNotes ? order.customNotes + ' • ' : '') + `[Admin: ${reason}]`,
        timeline: [rejectTimeline, ...order.timeline]
      };
    }));
  };

  // Handle updating order status (from Dashboard)
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus, customNote?: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const newTimelineItem = {
        status: newStatus,
        label: getStatusShortLabel(newStatus),
        timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
        description: customNote || getDefaultStatusDescription(newStatus, order)
      };

      return {
        ...order,
        status: newStatus,
        timeline: [newTimelineItem, ...order.timeline]
      };
    }));
  };

  const getStatusShortLabel = (status: OrderStatus): string => {
    switch (status) {
      case 'menunggu_jemput': return 'Jadwal Penjemputan';
      case 'perjalanan_workshop': return 'Kurir Membawa ke Workshop';
      case 'pengerjaan': return 'Pengerjaan Servis';
      case 'quality_check': return 'Quality Control Lolos';
      case 'siap_antar': return 'Siap Diantar Kurir';
      case 'selesai': return 'Selesai & Diterima Pelanggan';
      default: return 'Update Progres';
    }
  };

  const getDefaultStatusDescription = (status: OrderStatus, order: Order): string => {
    switch (status) {
      case 'menunggu_jemput':
        return `Penjemputan dijadwalkan di ${order.location.areaName}.`;
      case 'perjalanan_workshop':
        return `Kurir Herdi (Soleman) sedang mengambil sepatu di ${order.location.fullAddress}.`;
      case 'pengerjaan':
        return `Sepatu ${order.shoeBrand} sedang ditangani teknisi dengan lem/jahit standar pabrik.`;
      case 'quality_check':
        return `Pemeriksaan kerapian dan sterilisasi anti-jamur selesai.`;
      case 'siap_antar':
        return `Sepatu selesai direparasi dan dijadwalkan pengantaran kembali oleh kurir Herdi.`;
      case 'selesai':
        return `Sepatu telah diserahterimakan kepada ${order.customerName}. Garansi servis Soleman aktif.`;
      default:
        return 'Status diperbarui oleh sistem.';
    }
  };

  // Flow handlers
  const handleSelectServiceForPickup = (service: ServiceItem) => {
    setPreselectedServices([service]);
    handleScrollToSection('antar-jemput');
  };

  const handleSearchOrder = (query: string) => {
    setTrackerQuery(query);
    setIsTrackerOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    handleScrollToSection('dashboard');
  };

  const handleAdminLogout = () => {
    adminAuthService.logout();
    setAdminUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleScrollToSection}
        onOpenBooking={() => handleScrollToSection('antar-jemput')}
        onOpenTracker={() => { setTrackerQuery(''); setIsTrackerOpen(true); }}
        ordersCount={orders.length}
        adminUser={adminUser}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Quick Tracker & CTAs */}
        <Hero
          onOpenBooking={() => handleScrollToSection('antar-jemput')}
          onSearchOrder={handleSearchOrder}
          onExploreServices={() => handleScrollToSection('layanan')}
          onOpenDashboard={() => handleScrollToSection('dashboard')}
        />

        {/* 2. Full Damage Catalog & Repair Services */}
        <DamageCatalog
          onSelectServiceForPickup={handleSelectServiceForPickup}
        />

        {/* 3. Pickup & Delivery Booking with GPS Location & Kirim Order Langsung ke Dashboard Admin */}
        <PickupOrderSection
          initialServices={preselectedServices}
          initialShoeType={preselectedShoeType}
          initialPairsCount={preselectedPairsCount}
          initialArea={preselectedArea}
          onOrderCreated={handleOrderCreated}
          onOpenDashboard={() => handleScrollToSection('dashboard')}
        />

        {/* 4. DASHBOARD AREA: Special Admin Dashboard when authenticated, otherwise Courier view + Admin Login Access */}
        {adminUser ? (
          <AdminDashboard
            adminUser={adminUser}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAcceptOrder={handleAcceptOrder}
            onRejectOrder={handleRejectOrder}
            onLogout={handleAdminLogout}
            onOpenCreateOrder={() => handleScrollToSection('antar-jemput')}
            onOrderCreated={handleOrderCreated}
          />
        ) : (
          <div className="relative">
            {/* Admin Login Callout Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-sky-500/15 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>Area Khusus Admin Soleman</span>
                      {pendingOrdersCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold animate-pulse">
                          {pendingOrdersCount} Pesanan Baru Perlu Diterima
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Masuk untuk menerima pesanan, menugaskan kurir Herdi, dan kirim konfirmasi WhatsApp resmi.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all shrink-0"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Login Dashboard Admin</span>
                </button>
              </div>
            </div>

            <DashboardView
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenBooking={() => handleScrollToSection('antar-jemput')}
            />
          </div>
        )}

        {/* 5. Physical Workshop & Coverage Section */}
        <WorkshopLocationSection />

        {/* 6. Testimonials & FAQs */}
        <TestimonialsAndFaq />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleScrollToSection} />

      {/* Customer Tracking Modal */}
      <CustomerTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orders={orders}
        initialQuery={trackerQuery}
      />

      {/* Admin Login Modal (Masked Password & Secure Verification) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Quick WhatsApp Action Button */}
      <a
        href={`https://wa.me/${WORKSHOP_INFO.phone}?text=${encodeURIComponent('Halo Soleman Cirebon! Mau tanya servis sepatu dan antar-jemput kurir Herdi.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
        title="Chat WhatsApp Soleman Cirebon: 0881-4519-955"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <MessageSquare className="w-4 h-4 fill-slate-950" />
        <span className="hidden sm:inline">WA Soleman: 0881-4519-955</span>
      </a>

    </div>
  );
};

export default App;
