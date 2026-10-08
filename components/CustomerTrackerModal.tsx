/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Phone
} from 'lucide-react';
import { Order } from '../types';
import { STATUS_LABELS, WORKSHOP_INFO } from '../data/solcreftData';
import { buildConsultationWhatsAppUrl } from '../services/whatsappHelper';

interface CustomerTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialQuery?: string;
}

export const CustomerTrackerModal: React.FC<CustomerTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    if (initialQuery) {
      return orders.find(o => 
        o.id.toLowerCase() === initialQuery.toLowerCase() || 
        o.customerPhone.includes(initialQuery)
      ) || null;
    }
    return orders[0] || null;
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    const found = orders.find(o => 
      o.id.toLowerCase() === clean || 
      o.customerPhone.includes(clean) ||
      o.customerName.toLowerCase().includes(clean)
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { key: 'menunggu_jemput', label: '1. Dijadwalkan' },
    { key: 'perjalanan_workshop', label: '2. Dijemput Kurir' },
    { key: 'pengerjaan', label: '3. Diservis Teknisi' },
    { key: 'quality_check', label: '4. Quality Control' },
    { key: 'siap_antar', label: '5. Diantar Pulang' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'menunggu_jemput': return 0;
      case 'perjalanan_workshop': return 1;
      case 'pengerjaan': return 2;
      case 'quality_check': return 3;
      case 'siap_antar': return 4;
      case 'selesai': return 5;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Search className="w-3.5 h-3.5" /> Lacak Status Sepatu Anda
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">Status Progres Reparasi Soleman</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 text-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masukkan No. Order (misal: SLC-3891) atau No. WhatsApp..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shrink-0"
          >
            Cari Status
          </button>
        </form>

        {searchedOrder ? (
          <div className="space-y-6 pt-2">
            
            {/* Top Order Badge & Info */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">Order #{searchedOrder.id}</span>
                <h4 className="text-base font-bold text-white mt-0.5">{searchedOrder.shoeBrand}</h4>
                <p className="text-xs text-slate-400">
                  Pemilik: {searchedOrder.customerName} • {searchedOrder.pairsCount} Pasang
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${STATUS_LABELS[searchedOrder.status].badgeBg}`}>
                  {STATUS_LABELS[searchedOrder.status].label}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Est. Selesai: <strong className="text-slate-200">{searchedOrder.estimatedFinishedAt}</strong>
                </p>
              </div>
            </div>

            {/* Stepper Progres Visual */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tahapan Progres Pengerjaan:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {steps.map((st, index) => {
                  const currentIdx = getStepIndex(searchedOrder.status);
                  const isDone = index <= currentIdx;
                  const isCurrent = index === currentIdx;

                  return (
                    <div
                      key={st.key}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : isDone
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-600" />
                        )}
                      </div>
                      <span className="text-[10px] block leading-tight font-semibold">{st.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Multi-shoe breakdown if present */}
            {searchedOrder.shoes && searchedOrder.shoes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Rincian {searchedOrder.shoes.length} Pasang Sepatu:
                </span>
                <div className="space-y-2">
                  {searchedOrder.shoes.map((sh, idx) => (
                    <div key={sh.id || idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-white">#{idx + 1} {sh.shoeBrand}</span>
                        <span className="text-amber-400 font-mono">Rp {sh.price.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{sh.shoeType}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">{sh.material}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-300">Tingkat: {sh.severity.toUpperCase()}</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Servis: {sh.selectedServices.map(s => s.name).join(', ')}
                      </p>
                      {sh.photoUrl && (
                        <div className="pt-1">
                          <img
                            src={sh.photoUrl}
                            alt={`Foto Sepatu #${idx + 1}`}
                            className="w-16 h-16 object-cover rounded-xl border border-slate-700"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline history */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Catatan Riwayat Servis:
              </span>
              <div className="space-y-2.5 pl-2 border-l-2 border-slate-800">
                {searchedOrder.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-4 space-y-0.5">
                    <span className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-slate-900" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{item.label}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Contact Kurir */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Lokasi Antar-Jemput:
                </span>
                {searchedOrder.location.mapsUrl && (
                  <a
                    href={searchedOrder.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Cek di Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="text-slate-400">{searchedOrder.location.fullAddress}</p>
              {searchedOrder.location.landmark && (
                <p className="text-[11px] text-amber-400/90">Patokan: {searchedOrder.location.landmark}</p>
              )}
            </div>

            {/* WA Help Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={buildConsultationWhatsAppUrl(`Order #${searchedOrder.id} - ${searchedOrder.shoeBrand}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanya Status ke Admin via WA</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
              >
                Tutup
              </button>
            </div>

          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 space-y-2">
            <p className="text-sm font-semibold text-slate-300">
              Tidak ditemukan data order dengan kata kunci "{query}".
            </p>
            <p className="text-xs text-slate-500">
              Pastikan format nomor order sudah benar (contoh: SLC-3891) atau masukkan nomor WhatsApp yang terdaftar.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
