/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Search, 
  MessageSquare,
  Layers,
  Palette,
  Droplets,
  Scissors,
  Award,
  AlertCircle
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/solcreftData';
import { DamageCategory, ServiceItem } from '../types';
import { buildConsultationWhatsAppUrl } from '../services/whatsappHelper';

interface DamageCatalogProps {
  onSelectServiceForPickup: (service: ServiceItem) => void;
}

export const DamageCatalog: React.FC<DamageCatalogProps> = ({
  onSelectServiceForPickup
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DamageCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDetailId, setExpandedDetailId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Kerusakan' },
    { id: 'sol', label: 'Sol & Lem Lepas' },
    { id: 'jahit', label: 'Jahit & Sulam Sol' },
    { id: 'warna', label: 'Warna & Unyellowing' },
    { id: 'kebersihan', label: 'Cuci & Deep Clean' },
    { id: 'busa', label: 'Busa Tumit & Insole' },
    { id: 'kulit_upper', label: 'Upper Robek & Kulit' },
  ];

  const filteredServices = SERVICES_CATALOG.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(query) ||
      item.damageTitle.toLowerCase().includes(query) ||
      item.solution.toLowerCase().includes(query) ||
      item.symptoms.some(s => s.toLowerCase().includes(query)) ||
      item.suitableShoes.some(shoe => shoe.toLowerCase().includes(query));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="layanan" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5" />
          <span>Katalog Lengkap Reparasi & Kerusakan Sepatu</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Kenali Kerusakan Sepatu Anda, <br />
          <span className="text-amber-400">Kami Tuntaskan Sampai Tuntas</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Setiap kerusakan ditangani dengan material industri pilihan, lem polyurethane standar pabrik, dan keahlian craftsman berpengalaman di Cirebon. Dilengkapi garansi pengerjaan 30 hingga 90 hari!
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-10 space-y-4">
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kerusakan: sol mangap, jahit, unyellowing, tumit robek..."
            className="w-full bg-slate-900 border border-slate-800 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as DamageCategory)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service) => {
          const isExpanded = expandedDetailId === service.id;

          return (
            <div
              key={service.id}
              className="group relative rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Image banner with overlay */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-950">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Badges on top of image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    Garansi {service.warrantyDays} Hari
                  </span>
                  {service.popular && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-md uppercase tracking-wider">
                      Terpopuler
                    </span>
                  )}
                </div>

                {/* Price tag on bottom right of image */}
                <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Mulai Dari</span>
                  <span className="text-sm font-extrabold text-amber-400">{service.priceFormatted}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Estimasi: {service.durationEst}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs font-semibold text-amber-400/90 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                    <span>Masalah: {service.damageTitle}</span>
                  </p>

                  {/* Symptoms Checklist */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Ciri-Ciri Gejala Kerusakan:
                    </p>
                    <ul className="space-y-1.5">
                      {service.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Solution Detail */}
                  <div className="pt-2">
                    <button
                      onClick={() => setExpandedDetailId(isExpanded ? null : service.id)}
                      className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 underline underline-offset-2"
                    >
                      {isExpanded ? 'Tutup Solusi Pengerjaan' : 'Lihat Metode Pengerjaan Solcreft'}
                    </button>
                    {isExpanded && (
                      <div className="mt-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-amber-400 block mb-1">Metode Presisi:</strong>
                        {service.solution}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <button
                    onClick={() => onSelectServiceForPickup(service)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Pilih untuk Antar-Jemput</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildConsultationWhatsAppUrl(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Konsultasi WA untuk Layanan Ini</span>
                  </a>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 mt-6">
          <p className="text-slate-400 text-sm">Tidak ditemukan kerusakan sesuai kata kunci "{searchQuery}".</p>
          <p className="text-xs text-slate-500 mt-1">Punya kerusakan unik atau langka? Silakan konsultasikan langsung ke CS kami.</p>
          <a
            href={buildConsultationWhatsAppUrl(searchQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tanya Kerusakan Ini via WhatsApp</span>
          </a>
        </div>
      )}

    </section>
  );
};
