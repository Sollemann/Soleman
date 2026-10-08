/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Star, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle, 
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Quote
} from 'lucide-react';
import { buildConsultationWhatsAppUrl } from '../services/whatsappHelper';

export const TestimonialsAndFaq: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Rian Hidayat',
      area: 'Kedawung / Tuparev, Cirebon',
      shoe: 'Nike Air Jordan 1 High (Reglue & Unyellowing)',
      comment: 'Gokil hasilnya! Sol yang udah mangap parah gara-gara kena hujan di Tuparev sekarang nempel kenceng kayak baru. Midsole-nya juga kinclong lagi. Kurirnya tepat waktu jemput ke rumah.',
      rating: 5,
    },
    {
      name: 'Dinda Lestari',
      area: 'Kesambi (Sunyaragi), Cirebon',
      shoe: 'Vans Old Skool & Docmart (Jahit Sol & Deep Clean)',
      comment: 'Fitur antar jemputnya ngebantu banget pas lagi sibuk kerja. Tinggal share lokasi GPS lewat WA, kurir langsung datang. Jahitannya rapi banget dan benangnya gak keliatan kasar.',
      rating: 5,
    },
    {
      name: 'Bambang Suryo',
      area: 'Kejaksan (Kartini), Cirebon',
      shoe: 'Pantofel Kulit Formal (Resoling & Leather Care)',
      comment: 'Sepatu andalan ngantor solnya udah aus licin. Diganti sol baru di Soleman jadi gagah lagi. Notifikasi WA di tiap tahap pengerjaannya bikin tenang, gak perlu bolak-balik nanya progres.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: 'Bagaimana cara kerja layanan antar-jemput sepatu di Soleman Cirebon?',
      a: 'Sangat mudah! Anda cukup mengisi form di web ini dan upload foto sepatu, lalu klik "📍 Gunakan Lokasi Saya" untuk mengunci titik GPS rumah Anda. Pesanan langsung masuk ke dashboard admin Soleman. Kurir Herdi akan meluncur sesuai titik maps tersebut untuk mengambil sepatu Anda, dan mengantarkannya kembali setelah selesai diperbaiki.'
    },
    {
      q: 'Apakah lem sol di Soleman tahan air dan tidak mudah lepas lagi?',
      a: 'Ya, 100%! Kami tidak menggunakan lem kuning sembarangan. Soleman menggunakan lem Polyurethane (PU) grade industri pabrik sepatu, dilengkapi cairan primer asam pengikis kotoran mikroskopis dan diproses menggunakan mesin Thermo-Press bertekanan tinggi. Kami memberikan garansi servis hingga 60 - 90 hari.'
    },
    {
      q: 'Apakah benar ada promo Gratis Ongkir antar-jemput di Cirebon?',
      a: 'Benar sekali! Untuk pemesanan servis minimal 2 pasang sepatu (bisa gabungan sepatu sendiri, teman, atau keluarga), layanan antar-jemput kurir Herdi se-Kota dan Kab. Cirebon 100% GRATIS tanpa biaya tambahan.'
    },
    {
      q: 'Bagaimana saya mengetahui progres pengerjaan sepatu saya?',
      a: 'Sistem kami terhubung dengan WhatsApp. Anda akan menerima notifikasi berkala via WA saat kurir Herdi menjemput, saat sepatu tiba di workshop Cipto, saat teknisi mulai mengerjakan, hingga saat sepatu lolos Quality Control dan siap diantar. Anda juga bisa mengecek status kapan saja di menu "Lacak Sepatu".'
    },
    {
      q: 'Berapa lama estimasi pengerjaan servis sepatu?',
      a: 'Tergantung jenis kerusakan: Reglue sol butuh 1-2 hari (perlu waktu curing lem yang matang), Jahit sol 1 hari, Deep Clean 1 hari, Unyellowing 1-2 hari, dan Resoling ganti sol baru 3-4 hari kerja.'
    },
    {
      q: 'Bagaimana metode pembayarannya?',
      a: 'Pembayaran sangat fleksibel: bisa Cash COD ke kurir Herdi saat sepatu diantar kembali, transfer Bank (BCA, Mandiri, BRI), atau melalui QRIS saat menerima invoice lewat WhatsApp.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      
      {/* Testimonials Section */}
      <div>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Kepuasan Pelanggan Cirebon</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Apa Kata Mereka Tentang Soleman Cirebon?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Ribuan pasang sepatu warga Cirebon telah dipercayakan dan kembali tampil percaya diri.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <strong className="text-sm font-bold text-white block">{item.name}</strong>
                <span className="text-[11px] text-amber-400 block mt-0.5">{item.area}</span>
                <span className="text-[10px] text-slate-500 block">{item.shoe}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            FAQ Seputar Servis & Antar-Jemput Sepatu
          </h2>
        </div>

        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-emerald-500/15 border border-slate-800 text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Masih Ragu atau Punya Kerusakan Sepatu yang Belum Tercantum?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Kirimkan foto sepatu Anda ke WhatsApp kami untuk konsultasi gratis dan diagnosa langsung oleh master teknisi Solcreft Cirebon.
          </p>
          <div>
            <a
              href={buildConsultationWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat CS & Konsultasi Foto via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};
