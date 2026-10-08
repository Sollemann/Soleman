/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Navigation, 
  MessageSquare, 
  Truck, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  User, 
  Phone, 
  Share2, 
  Send, 
  ChevronRight,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { STATUS_LABELS, WORKSHOP_INFO } from '../data/solcreftData';
import { 
  buildStatusNotificationWhatsAppUrl, 
  buildGoogleMapsRouteUrl 
} from '../services/whatsappHelper';

interface DashboardViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  onOpenBooking: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  onUpdateOrderStatus,
  onOpenBooking
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalOrder, setActiveModalOrder] = useState<Order | null>(null);
  const [customNoteModal, setCustomNoteModal] = useState('');
  const [selectedTargetStatus, setSelectedTargetStatus] = useState<OrderStatus>('perjalanan_workshop');

  // Copy link maps to clipboard
  const handleCopyMapsUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.includes(query) ||
      order.shoeBrand.toLowerCase().includes(query) ||
      order.location.areaName.toLowerCase().includes(query) ||
      order.location.fullAddress.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

  // Counters
  const countNeedPickup = orders.filter(o => o.status === 'menunggu_jemput').length;
  const countInWorkshop = orders.filter(o => o.status === 'pengerjaan' || o.status === 'perjalanan_workshop').length;
  const countReadyDeliver = orders.filter(o => o.status === 'siap_antar' || o.status === 'quality_check').length;

  const openWhatsAppModal = (order: Order, defaultTargetStatus: OrderStatus) => {
    setActiveModalOrder(order);
    setSelectedTargetStatus(defaultTargetStatus);
    setCustomNoteModal('');
  };

  const handleSendNotification = () => {
    if (!activeModalOrder) return;
    
    // Update status in system
    onUpdateOrderStatus(
      activeModalOrder.id, 
      selectedTargetStatus, 
      customNoteModal.trim() || undefined
    );

    // Open WhatsApp
    const waUrl = buildStatusNotificationWhatsAppUrl(
      activeModalOrder, 
      selectedTargetStatus, 
      customNoteModal.trim() || undefined
    );
    window.open(waUrl, '_blank');
    setActiveModalOrder(null);
  };

  return (
    <section id="dashboard" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Kurir & Notifikasi WhatsApp</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-display">
            Manajemen Antar-Jemput & Update Status via WA
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pantau titik koordinat lokasi penjemputan se-Cirebon dan kirim notifikasi WhatsApp ke pelanggan dengan 1 klik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/15"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Order Servis Baru</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-medium text-slate-400">Total Pesanan Servis</span>
          <div className="text-2xl font-black text-white mt-1 font-mono">{orders.length}</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Semua riwayat aktif</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <span className="text-xs font-medium text-amber-400">Menunggu Penjemputan</span>
          <div className="text-2xl font-black text-amber-300 mt-1 font-mono">{countNeedPickup}</div>
          <span className="text-[11px] text-amber-400/80 mt-0.5 block">Kurir siap meluncur ke lokasi</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-sky-950/20 border border-sky-500/30">
          <span className="text-xs font-medium text-sky-400">Di Workshop Soleman</span>
          <div className="text-2xl font-black text-sky-300 mt-1 font-mono">{countInWorkshop}</div>
          <span className="text-[11px] text-sky-400/80 mt-0.5 block">Jl. Dr. Cipto No. 42 Cirebon</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-xs font-medium text-emerald-400">Siap Diantar Kembali</span>
          <div className="text-2xl font-black text-emerald-300 mt-1 font-mono">{countReadyDeliver}</div>
          <span className="text-[11px] text-emerald-400/80 mt-0.5 block">Quality Check lolos & rapi</span>
        </div>
      </div>

      {/* Filters and search */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { id: 'all', label: 'Semua Order' },
            { id: 'menunggu_jemput', label: 'Menunggu Jemput' },
            { id: 'pengerjaan', label: 'Di Workshop' },
            { id: 'siap_antar', label: 'Siap Diantar' },
            { id: 'selesai', label: 'Selesai' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ID, Nama, No WA, atau Jalan..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

      </div>

      {/* Orders List with Location Features and WhatsApp Action */}
      <div className="mt-6 space-y-6">
        {filteredOrders.map((order) => {
          const statusConfig = STATUS_LABELS[order.status];
          const hasCoords = !!order.location.lat && !!order.location.lng;
          const navigationUrl = buildGoogleMapsRouteUrl(
            order.location.lat, 
            order.location.lng, 
            order.location.fullAddress
          );

          return (
            <div
              key={order.id}
              className="rounded-3xl bg-slate-900/95 border border-slate-800 hover:border-slate-700 p-6 sm:p-7 shadow-xl space-y-6 transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs rounded-xl">
                    #{order.id}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{order.customerName}</span>
                      <span className="text-xs text-slate-400 font-normal">({order.customerPhone})</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Dipesan: {order.createdAt} • Sesi: {order.preferredTimeSlot.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.badgeBg}`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              {/* Order Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Col 1: Shoe & Repair Info (4 cols) */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sepatu & Kerusakan
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{order.shoeBrand}</span>
                      <span className="text-xs text-amber-400 font-semibold">{order.pairsCount} Pasang</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">{order.shoeType}</span>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-500">Layanan Dikerjakan:</p>
                      {order.selectedServices.map((s) => (
                        <div key={s.id} className="text-xs text-slate-300 flex items-center justify-between">
                          <span className="truncate pr-1">• {s.name}</span>
                          <span className="text-amber-400/90 font-mono shrink-0 text-[11px]">{s.priceFormatted}</span>
                        </div>
                      ))}
                    </div>

                    {order.customNotes && (
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
                        "{order.customNotes}"
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Total Biaya:</span>
                      <span className="text-amber-400 font-mono">Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                {/* Col 2: FITUR LOKASI ANTAR-JEMPUT (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5 text-sky-400">
                      <MapPin className="w-3.5 h-3.5" />
                      Fitur Titik Lokasi Antar-Jemput
                    </span>
                    {hasCoords && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                        GPS Terkunci (±{order.location.accuracy || 10}m)
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Area: {order.location.areaName}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          🔒 Lokasi Privat
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 italic">
                        Alamat detail & titik navigasi GPS terproteksi otomatis dan dikirim langsung ke WhatsApp kurir saat penjemputan.
                      </p>
                    </div>

                    {/* ACTION BUTTONS FOR LOCATION: DIRECT PRIVATE WHATSAPP OR MAPS */}
                    <div className="pt-1 flex flex-wrap gap-2">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`*RUTE PENJEMPUTAN SOLCREFT* 🛵\nOrder: #${order.id}\nPelanggan: ${order.customerName}\nArea: ${order.location.areaName}\nLink Rute Maps: ${navigationUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all text-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Kirim Rute Privat ke WhatsApp</span>
                      </a>

                      <a
                        href={navigationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                        title="Buka Navigasi Rute Maps"
                      >
                        <Navigation className="w-3.5 h-3.5 text-sky-400" />
                        <span>Buka Maps</span>
                      </a>
                    </div>

                  </div>
                </div>

                {/* Col 3: FITUR NOTIFIKASI PEMBERITAHUAN LEWAT WHATSAPP (3 cols) */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Notif Pemberitahuan WA</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Kirim pemberitahuan resmi Solcreft langsung ke WhatsApp pelanggan:
                    </p>

                    {/* Quick WhatsApp Notification Buttons */}
                    <button
                      onClick={() => openWhatsAppModal(order, 'perjalanan_workshop')}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Kurir Meluncur Jemput</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openWhatsAppModal(order, 'pengerjaan')}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-sky-400" />
                        <span>Sepatu Sedang Dikerjakan</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openWhatsAppModal(order, 'siap_antar')}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Selesai & Siap Diantar</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openWhatsAppModal(order, 'selesai')}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Servis Selesai & Garansi</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </div>

              </div>

              {/* Status Update Quick Select */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="font-semibold text-slate-300">Ubah Status Cepat:</span>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="menunggu_jemput">Menunggu Penjemputan</option>
                    <option value="perjalanan_workshop">Kurir Membawa ke Workshop</option>
                    <option value="pengerjaan">Dalam Pengerjaan Teknisi</option>
                    <option value="quality_check">Quality Control (QC)</option>
                    <option value="siap_antar">Siap Diantar Kembali</option>
                    <option value="selesai">Selesai Diterima</option>
                  </select>
                </div>

                <div className="text-[11px] text-slate-500">
                  Teknisi: <strong className="text-slate-300">{order.technicianName}</strong>
                </div>
              </div>

            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
            <LayoutDashboard className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-bold text-sm">Tidak ada pesanan ditemukan.</p>
            <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau ubah tab filter status.</p>
          </div>
        )}
      </div>

      {/* WHATSAPP NOTIFICATION MODAL */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Kirim Pemberitahuan WhatsApp
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Order #{activeModalOrder.id} - {activeModalOrder.customerName}
                </h3>
                <p className="text-xs text-slate-400">Penerima: {activeModalOrder.customerPhone}</p>
              </div>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Target status selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Pilih Jenis Notifikasi Progres:
              </label>
              <select
                value={selectedTargetStatus}
                onChange={(e) => setSelectedTargetStatus(e.target.value as OrderStatus)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="perjalanan_workshop">🛵 Driver Menuju Lokasi Jemput ({activeModalOrder.location.areaName})</option>
                <option value="pengerjaan">🛠️ Sepatu Sedang Dikerjakan Teknisi di Workshop</option>
                <option value="quality_check">🔍 Pemeriksaan Kualitas & Finishing Steril</option>
                <option value="siap_antar">🎉 Sepatu Beres & Kurir Siap Mengantar Kembali</option>
                <option value="selesai">✅ Servis Selesai & Garansi Aktif</option>
              </select>
            </div>

            {/* Custom message note */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Catatan Tambahan untuk Pelanggan (Opsional):
              </label>
              <textarea
                value={customNoteModal}
                onChange={(e) => setCustomNoteModal(e.target.value)}
                rows={2}
                placeholder="Contoh: Kurir kami Herdi (motor Vario hitam) perkiraan sampai 15 menit lagi ya Kak."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Location reminder */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Titik Lokasi yang Disertakan ke Chat:
              </span>
              <p className="text-[11px] text-slate-400">{activeModalOrder.location.fullAddress}</p>
              {activeModalOrder.location.mapsUrl && (
                <p className="text-[10px] text-sky-400 truncate">Maps: {activeModalOrder.location.mapsUrl}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalOrder(null)}
                className="flex-1 py-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSendNotification}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Buka & Kirim di WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
