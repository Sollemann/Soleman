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
      comment: 'Gokil hasilnya! Sol yang udah mangap parah gara-gara kena hujan di Tuparev sekarang nempel kenceng kayak baru. Midsole-nya juga kinclong lagi. Kurir Soleman tepat waktu jemput ke rumah dan bisa bayar COD santai.',
      rating: 5,
    },
    {
      name: 'Dinda Lestari',
      area: 'Kesambi (Sunyaragi), Cirebon',
      shoe: 'Vans Old Skool & Docmart (Jahit Sol & Deep Clean)',
      comment: 'Fitur antar jemputnya ngebantu banget pas lagi sibuk kerja. Tinggal share lokasi GPS lewat WA, Kurir Soleman langsung datang. Jahitannya rapi banget dan gratis ongkir karena di Kota Cirebon.',
      rating: 5,
    },
    {
      name: 'Bambang Suryo',
      area: 'Kejaksan (Kartini), Cirebon',
      shoe: 'Pantofel Kulit Formal (Resoling & Leather Care)',
      comment: 'Sepatu andalan ngantor solnya udah aus licin. Diganti sol baru di Soleman jadi gagah lagi. Pembayaran QRIS instan dan notifikasi di tiap tahap pengerjaannya bikin tenang, gak perlu bolak-balik nanya.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: 'Bagaimana cara kerja layanan antar-jemput sepatu di Soleman Cirebon?',
      a: 'Sangat mudah! Anda cukup mengisi form di web ini, pilih bahan sepatu & upload foto, lalu kunci titik lokasi GPS rumah Anda di Cirebon. Pesanan langsung masuk ke sistem. Kurir Soleman akan meluncur sesuai titik maps tersebut untuk mengambil sepatu Anda, dan mengantarkannya kembali setelah selesai diperbaiki.'
    },
    {
      q: 'Apakah lem sol di Soleman tahan air dan tidak mudah lepas lagi?',
      a: 'Ya, 100%! Kami tidak menggunakan lem kuning sembarangan. Soleman menggunakan lem Polyurethane (PU) grade industri pabrik sepatu, dilengkapi cairan primer pengikis kotoran mikroskopis dan diproses menggunakan mesin Thermo-Press bertekanan tinggi. Kami memberikan garansi servis hingga 60 - 90 hari.'
    },
    {
      q: 'Bagaimana aturan promo Gratis Ongkir antar-jemput di Cirebon?',
      a: 'Khusus wilayah Kota Cirebon (Kesambi, Kejaksan, Pekalipan, Lemahwungkuk, Harjamukti), layanan antar-jemput 100% GRATIS ONGKIR tanpa syarat jumlah pasang! Untuk wilayah Kabupaten Cirebon, GRATIS ONGKIR berlaku untuk pemesanan minimal 2 pasang sepatu (jika 1 pasang dikenakan ongkir standar Rp 10.000).'
    },
    {
      q: 'Bagaimana saya mengetahui progres pengerjaan sepatu saya?',
      a: 'Anda bisa mengecek status kapan saja di kolom "Lacak Status Sepatu" dengan memasukkan nomor kode seri pesanan Anda (misal: SLC-3891). Anda juga akan menerima update WhatsApp saat Kurir Soleman menjemput, saat tiba di workshop Cipto, hingga saat sepatu siap diantar kembali.'
    },
    {
      q: 'Berapa lama estimasi pengerjaan servis sepatu?',
      a: 'Tergantung jenis kerusakan: Reglue sol butuh 1-2 hari (perlu waktu curing lem yang matang), Jahit sol 1 hari, Deep Clean 1 hari, Unyellowing 1-2 hari, dan Resoling ganti sol baru 3-4 hari kerja.'
    },
    {
      q: 'Bagaimana metode pembayarannya?',
      a: 'Soleman menyediakan metode pembayaran yang sangat praktis: bisa COD (Bayar Tunai ke Kurir Soleman saat sepatu diantar kembali tanpa DP) atau scan QRIS instan resmi (bisa pakai BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay).'
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
                <Quote className="w-6 h-6 text-slate-700" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.area}</p>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                  {item.shoe}
                </span>
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
            <span>Paling Sering Ditanyakan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Pertanyaan Seputar Servis & Antar-Jemput
          </h2>
        </div>

        <div className="mt-8 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
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

        <div className="mt-8 text-center">
          <a
            href={buildConsultationWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Masih Ada Pertanyaan? Chat Admin WhatsApp</span>
          </a>
        </div>
      </div>

    </section>
  );
};
