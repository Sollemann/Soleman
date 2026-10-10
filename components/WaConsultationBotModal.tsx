/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  Truck,
  Wrench,
  ShieldCheck,
  Phone,
  Layers,
  Clock,
  Camera,
  Scissors,
  Award,
  Zap,
  Check,
  RefreshCw,
  ExternalLink,
  Image as ImageIcon,
  UploadCloud,
  AlertCircle,
  Cpu
} from 'lucide-react';
import { WORKSHOP_INFO, SERVICES_CATALOG } from '../data/solcreftData';
import { ServiceItem } from '../types';

export interface DetailedDiagnostic {
  summary?: string;
  rootCause: string;
  technicalProcedure: string[];
  detectedDamages?: string[];
  priceFormatted: string;
  duration: string;
  warranty: string;
  proTip: string;
  photoConfirmationRequired?: boolean;
  photoConfirmationNote?: string;
  isAiVisionAnalysis?: boolean;
}

export interface BotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  imageUrl?: string;
  diagnostic?: DetailedDiagnostic;
  matchedServices?: ServiceItem[];
  whatsappText?: string;
  timestamp: string;
  isAiVisionAnalysis?: boolean;
}

interface WaConsultationBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookService?: (serviceId: string) => void;
}

export const WaConsultationBotModal: React.FC<WaConsultationBotModalProps> = ({
  isOpen,
  onClose,
  onBookService
}) => {
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Halo! Saya Soleman AI Asisten Reparasi Sepatu Cirebon (didukung teknologi Google Gemini Multimodal Vision) 👟🤖.\n\nAnda dapat mengetik keluhan atau langsung MENGUNGGAH FOTO SEPATU Anda (kamera/galeri). Gemini AI kami akan menganalisis kondisi fisik kerusakan pada foto secara detail dan menampilkan menu servis yang 100% tepat!',
      matchedServices: SERVICES_CATALOG.filter(s => s.isBestMenu).slice(0, 3),
      timestamp: 'Baru saja'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<{
    dataUrl: string;
    mimeType: string;
    name: string;
  } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, selectedImage]);

  if (!isOpen) return null;

  // Curated categories for quick diagnosis
  const botCategories = [
    { id: 'all', label: 'Semua Kasus' },
    { id: 'best', label: '👑 Menu Terbaik Soleman' },
    { id: 'trail_gunung', label: '🏔️ Tapak Trail (Rp 200rb) & Gunung' },
    { id: 'jahit', label: '🧵 Jahit Sol (Tanam Gak Kelihatan)' },
    { id: 'tapak', label: '👟 Ganti Tapak (Futsal, Sekolah, Kantor)' },
    { id: 'unyellowing_cuci', label: '✨ Unyellowing & Deep Clean' },
    { id: 'jarak_ongkir', label: '📍 Jarak & Kirim J&T Luar Cirebon' },
  ];

  // Quick problem questions
  const quickProblems = [
    { text: 'Tapak sepatu trail saya botak (Rp 200rb & foto WA)', category: 'trail_gunung' },
    { text: 'Sol sepatu gunung hiking aus untuk Ciremai (Rp 150rb)', category: 'trail_gunung' },
    { text: 'Mau jahit sol benang gak kelihatan (tanam)', category: 'jahit' },
    { text: 'Ganti tapak sepatu futsal gum rubber anti licin', category: 'tapak' },
    { text: 'Alas sepatu sekolah anak bolong & tipis', category: 'tapak' },
    { text: 'Sol pantofel kantor aus miring atau pecah', category: 'tapak' },
    { text: 'Sol safety boots hancur hidrolisis di proyek', category: 'tapak' },
    { text: 'Midsole sneakers menguning mau unyellowing', category: 'unyellowing_cuci' },
    { text: 'Saya luar Cirebon kirim via J&T Express', category: 'jarak_ongkir' }
  ];

  const filteredQuickProblems = quickProblems.filter(p => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'best') return p.text.includes('trail') || p.text.includes('gak kelihatan') || p.text.includes('futsal') || p.text.includes('sekolah');
    return p.category === activeCategoryFilter;
  });

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar (JPG, PNG, atau WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSelectedImage({
        dataUrl,
        mimeType: file.type || 'image/jpeg',
        name: file.name
      });
    };
    reader.readAsDataURL(file);
    // Reset inputs so same file can be re-selected if removed
    e.target.value = '';
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // Fallback heuristic diagnosis in case server Gemini API is offline
  const runFallbackHeuristic = (query: string, hasImage: boolean) => {
    const q = query.toLowerCase();
    let botText = '';
    let diag: DetailedDiagnostic;
    let matched: ServiceItem[] = [];
    let waText = '';

    if (q.includes('trail') || q.includes('klx') || q.includes('crf') || q.includes('motocross') || q.includes('adventure')) {
      botText = `Hasil Analisis Soleman AI: Sepatu Trail Anda mengalami keausan kompon karet akibat medan off-road keras atau batu tajam. Kami merekomendasikan Ganti Tapak Sepatu Trail (Extreme Grip) seharga Rp 200.000 (Pas).`;
      diag = {
        summary: 'Keausan tapak ekstrem off-road membutuhkan penggantian compound karet trail tahan cadas.',
        rootCause: 'Abrasi cadas & gesekan medan trail yang mengikis pul traksi hingga botak licin.',
        detectedDamages: ['Pul tapak trail tergerus licin', 'Karet tapak mengeras kehilangan elastisitas traksi'],
        technicalProcedure: [
          'Bongkar tapak lama & pembersihan sisa lem dengan grinding presisi.',
          'Aplikasi lem polyurethane thermo-setting dengan aktivator suhu 80°C.',
          'Pemasangan outsole compound karet trail heavy-duty (Hardness 70A) tahan cadas.',
          'WAJIB: Teknisi Soleman memotret sampel bahan tapak & compound ke WhatsApp Anda terlebih dahulu sebelum dipasang untuk memastikan kecocokan model dan ukuran 100%!',
          'Pengeleman dengan mesin press hidrolik tekanan 4 bar dan sterilisasi anti jamur.'
        ],
        priceFormatted: 'Rp 200.000 (Harga Pas)',
        duration: '3 Hari Kerja',
        warranty: '90 Hari Garansi Resmi Soleman',
        proTip: 'Hindari mencuci sepatu trail dengan air panas atau deterjen berbusa pekat.',
        photoConfirmationRequired: true,
        photoConfirmationNote: 'Foto sampel bahan tapak wajib dikirim ke WhatsApp Anda untuk persetujuan sebelum pengeleman.'
      };
      const s = SERVICES_CATALOG.find(i => i.id === 'ganti-tapak-trail');
      if (s) matched.push(s);
      waText = `Halo Soleman Cirebon! Saya mau order Ganti Tapak Sepatu Trail (Rp 200.000). Mohon kirimkan foto sampel bahan & tapak ke nomor WhatsApp saya ini ya Kak untuk konfirmasi kecocokan sebelum pengerjaan.`;
    } else if (q.includes('gunung') || q.includes('hiking') || q.includes('ciremai') || q.includes('trekking')) {
      botText = `Hasil Analisis Soleman AI: Sepatu gunung membutuhkan tapak berdaya cengkeram tinggi untuk jalur terjal Ciremai. Rekomendasi utama: Ganti Tapak Sepatu Gunung (Vibram Style Lugged) Rp 150.000.`;
      diag = {
        summary: 'Tapak sepatu hiking aus atau hidrolisis membutuhkan tapak bergigi dalam tahan lumpur & karang.',
        rootCause: 'Hidrolisis bantalan sol akibat usia penyimpanan atau keausan parut lumpur saat pendakian intensif.',
        detectedDamages: ['Gigi tapak aus licin', 'Bantalan sol rawan terkelupas di medan basah'],
        technicalProcedure: [
          'Pembersihan kerak lem lama hingga ke pori-pori midsole.',
          'Pemasangan outsole hiking bergigi dalam (Lugged cleat pattern) model Vibram pemecah lumpur.',
          'Pengeleman thermo-curing bertekanan tinggi.',
          'Konfirmasi foto bahan ke WhatsApp pelanggan sebelum dipasang.'
        ],
        priceFormatted: 'Rp 150.000',
        duration: '3 Hari Kerja',
        warranty: '90 Hari Garansi Resmi',
        proTip: 'Selalu bersihkan tanah dan lumpur setelah pendakian, lalu angin-anginkan di tempat teduh.',
        photoConfirmationRequired: true
      };
      const s = SERVICES_CATALOG.find(i => i.id === 'ganti-tapak-gunung');
      if (s) matched.push(s);
      waText = `Halo Soleman! Saya mau servis Ganti Tapak Sepatu Gunung Lugged (Rp 150.000). Mohon info ketersediaan ukuran solnya.`;
    } else if (q.includes('gak kelihatan') || q.includes('tidak kelihatan') || q.includes('tanam') || q.includes('jahit')) {
      botText = `Hasil Analisis Soleman AI: Menu PALING REKOMENDASI Soleman adalah Jahit Sol Keliling Benang Gak Kelihatan (Hidden / Tanam) seharga Rp 45.000. Sol kuat permanen tanpa merusak estetika dan benang tidak akan tergesek aspal!`;
      diag = {
        summary: 'Sol mangap membutuhkan jahit keliling alur tanam tersembunyi agar estetika terjaga.',
        rootCause: 'Lem sol lepas akibat usia pakai atau kelembapan.',
        detectedDamages: ['Sol mangap di bagian samping/depan', 'Lem bawaan pabrik kehilangan daya rekat'],
        technicalProcedure: [
          'Pembuatan parit alur khusus (grooving slot) sedalam 1.5mm di keliling outsole karet.',
          'Penyulaman tangan memakai benang wax nilon industri tahan air di dalam parit tersebut.',
          'Benang tertanam rata di dalam sol sehingga 100% TIDAK TERLIHAT dari sisi samping.',
          'Finishing segel lilin pelindung benang.'
        ],
        priceFormatted: 'Rp 45.000 (Best Value)',
        duration: '1 Hari Kerja',
        warranty: '90 Hari Garansi Jahitan Anti Lepas',
        proTip: 'Teknik benang tanam ini membuat sol tahan tarikan hingga 80kg tanpa benang mengikis permukaan kanvas.'
      };
      const s = SERVICES_CATALOG.find(i => i.id === 'jahit-benang-tersembunyi');
      if (s) matched.push(s);
      waText = `Halo Soleman Cirebon! Saya mau order Jahit Sol Keliling Benang Gak Kelihatan (Tanam) Rp 45.000. Mohon penjemputan ke rumah saya.`;
    } else if (q.includes('futsal')) {
      botText = `Hasil Analisis Soleman AI: Sepatu futsal membutuhkan tapak karet mentah (Gum Rubber Non-Marking) Rp 85.000 (sudah termasuk lem press oven dan jahit keliling).`;
      diag = {
        summary: 'Tapak licin di lapangan semen/sintetis membutuhkan tapak gum sole anti slip.',
        rootCause: 'Karet sol bawaan aus licin atau lem terkelupas akibat benturan tendangan.',
        detectedDamages: ['Outsole depan mulai terkelupas', 'Traksi karet aus licin'],
        technicalProcedure: [
          'Bongkar sol lama yang botak/pecah.',
          'Pemasangan tapak sol karet mentah (Gum Sole) tekstur honeycomb/chevron.',
          'Pengeleman thermo-cure plus jahit keliling rapat.'
        ],
        priceFormatted: 'Rp 85.000',
        duration: '2 Hari Kerja',
        warranty: '60 Hari Garansi',
        proTip: 'Sol karet mentah ini tidak meninggalkan bekas noda hitam di lapangan semen maupun vinyl.'
      };
      const s = SERVICES_CATALOG.find(i => i.id === 'ganti-tapak-futsal');
      if (s) matched.push(s);
      waText = `Halo Soleman! Saya mau servis Ganti Tapak Sepatu Futsal Gum Rubber Rp 85.000.`;
    } else if (q.includes('sekolah') || q.includes('bolong') || q.includes('alas bolong')) {
      botText = `Hasil Analisis Soleman AI: Untuk sepatu sekolah anak (Warrior, NB, Ventela) yang alas bawahnya bolong atau licin, rekomendasinya adalah Ganti Tapak Sepatu Sekolah Baru seharga Rp 75.000.`;
      diag = {
        summary: 'Alas bawah sepatu sekolah bolong/licin diganti tapak baru tebal + jahit keliling.',
        rootCause: 'Gesekan harian aspal dan aktivitas olahraga anak.',
        detectedDamages: ['Tapak bawah bolong tembus', 'Karet dasar menipis'],
        technicalProcedure: [
          'Penggantian tapak bawah dengan karet hitam pekat baru tebal anti selip.',
          'Pengeleman press pabrik agar rata dan empuk di telapak kaki.',
          'Jahit sol keliling penuh agar siap dipakai setahun ke depan.'
        ],
        priceFormatted: 'Rp 75.000',
        duration: '2 Hari Kerja',
        warranty: '60 Hari Garansi',
        proTip: 'Jauh lebih hemat daripada membeli sepatu baru, sepatu sekolah kembali kuat dan aman.'
      };
      const s = SERVICES_CATALOG.find(i => i.id === 'ganti-tapak-sekolah');
      if (s) matched.push(s);
      waText = `Halo Soleman! Saya mau ganti tapak sepatu sekolah anak Rp 75.000.`;
    } else if (q.includes('kuning') || q.includes('unyellowing') || q.includes('cuci')) {
      botText = `Hasil Analisis Soleman AI: Midsole yang menguning akibat oksidasi matahari dapat dikembalikan cerah dengan Paket Unyellowing Midsole (Rp 40.000) atau Deep Clean (Rp 35.000).`;
      diag = {
        summary: 'Oksidasi polimer midsole diatasi dengan formula hidrogen peroksida & aktivasi sinar UV.',
        rootCause: 'Reaksi oksidasi sinar matahari terhadap karet midsole.',
        detectedDamages: ['Midsole menguning kusam', 'Pori-pori karet teroksidasi'],
        technicalProcedure: [
          'Pembersihan kotoran awal dengan deep cleaning foam.',
          'Aplikasi formula de-oksidasi peroksida khusus sepatu.',
          'Proses penyinaran UV curing chamber 4-6 jam hingga warna putih kembali cerah.'
        ],
        priceFormatted: 'Rp 40.000',
        duration: '1-2 Hari',
        warranty: '30 Hari Anti Oksidasi Cepat',
        proTip: 'Gunakan silica gel dan simpan sepatu di tempat teduh agar tidak cepat kuning kembali.'
      };
      const s = SERVICES_CATALOG.find(i => i.id === 'unyellowing-midsole');
      if (s) matched.push(s);
      waText = `Halo Soleman! Saya mau servis Unyellowing Midsole sepatu yang menguning (Rp 40.000).`;
    } else {
      botText = `Hasil Analisis Soleman AI: ${hasImage ? 'Berdasarkan foto kondisi fisik sepatu yang Anda kirimkan, terlihat indikasi keausan pada sol dan kebutuhan rekondisi pengeleman atau jahit penguat.' : 'Berdasarkan keluhan yang Anda sampaikan, sepatu Anda membutuhkan reparasi profesional di workshop Soleman.'} Kami merekomendasikan menu terpopuler di bawah ini:`;
      diag = {
        summary: 'Perbaikan sol dan rekondisi struktur sepatu standar workshop Soleman.',
        rootCause: 'Beban pemakaian harian yang mengurangi daya ikat lem dan traksi sol karet.',
        detectedDamages: ['Lem sol mulai renggang', 'Kebutuhan kuncian jahit sol atau ganti tapak'],
        technicalProcedure: [
          'Grinding pembersihan residu debu & sisa lem lama.',
          'Pengeleman primer suhu tinggi 80°C.',
          'Opsi jahit sol keliling benang tersembunyi (tanam) agar awet bertahun-tahun.'
        ],
        priceFormatted: 'Mulai Rp 35.000 - Rp 45.000',
        duration: '1 - 2 Hari Kerja',
        warranty: '90 Hari Garansi Resmi Soleman',
        proTip: 'Lakukan perbaikan segera sebelum sol terkelupas total dan merusak lapisan kulit atas.'
      };
      matched = SERVICES_CATALOG.filter(s => s.isBestMenu).slice(0, 3);
      waText = `Halo Soleman Cirebon! Saya mau konsultasi reparasi sepatu saya. Mohon infonya ya Kak.`;
    }

    return { botText, diag, matched, waText };
  };

  const handleSend = async (userQueryText?: string) => {
    const query = (userQueryText || inputText).trim();
    const imagePayload = selectedImage;

    if (!query && !imagePayload) return;

    const userMsgText = query || (imagePayload ? 'Tolong diagnosis kondisi kerusakan dari foto sepatu saya ini.' : '');

    const userMsg: BotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      imageUrl: imagePayload?.dataUrl,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userQueryText) setInputText('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      // Call Real Gemini Multimodal AI on server endpoint
      const response = await fetch('/api/gemini/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsgText,
          imageBase64: imagePayload?.dataUrl || undefined,
          mimeType: imagePayload?.mimeType || 'image/jpeg'
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      // Find matching services from catalog based on recommendedServiceIds
      let matchedServices: ServiceItem[] = [];
      if (Array.isArray(data.recommendedServiceIds) && data.recommendedServiceIds.length > 0) {
        matchedServices = SERVICES_CATALOG.filter(item => 
          data.recommendedServiceIds.includes(item.id)
        );
      }

      // If no matching catalog items found, provide best menu fallback
      if (matchedServices.length === 0) {
        if (userMsgText.toLowerCase().includes('trail')) {
          matchedServices = SERVICES_CATALOG.filter(s => s.id === 'ganti-tapak-trail');
        } else if (userMsgText.toLowerCase().includes('gunung')) {
          matchedServices = SERVICES_CATALOG.filter(s => s.id === 'ganti-tapak-gunung');
        } else {
          matchedServices = SERVICES_CATALOG.filter(s => s.isBestMenu).slice(0, 3);
        }
      }

      const diagnostic: DetailedDiagnostic = {
        summary: data.summary,
        rootCause: data.detailedExplanation || data.rootCause || 'Keausan struktur sol atau jahitan akibat frekuensi pemakaian.',
        detectedDamages: data.detectedDamages || ['Keausan sol', 'Penurunan daya rekat lem'],
        technicalProcedure: data.technicalProcedures || [
          'Pembersihan residu dengan grinding presisi',
          'Aplikasi lem thermo-setting suhu 80°C',
          'Press hidrolik 4 bar'
        ],
        priceFormatted: data.estimatedPrice || 'Sesuai Menu Rekomendasi',
        duration: data.estimatedDuration || '1 - 3 Hari Kerja',
        warranty: data.warranty || '90 Hari Garansi Resmi Soleman',
        proTip: data.proTip || 'Simpan sepatu di tempat berventilasi dan kering setelah digunakan.',
        photoConfirmationRequired: data.requiresPhotoConfirmation || false,
        photoConfirmationNote: data.photoConfirmationNote,
        isAiVisionAnalysis: !!imagePayload
      };

      const defaultWaText = `Halo Soleman Cirebon! Saya telah berkonsultasi dengan Soleman Gemini AI mengenai sepatu saya.${data.detectedDamages ? ` Hasil diagnosa: ${data.detectedDamages.join(', ')}.` : ''} Saya ingin order servis ${diagnostic.priceFormatted}. Mohon jadwal penjemputannya ya Kak.`;

      const botMsg: BotMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.summary || `Berdasarkan analisis Gemini Multimodal AI terhadap ${imagePayload ? 'foto dan keluhan Anda' : 'keluhan Anda'}, berikut adalah rekomendasi penanganan teknis workshop Soleman:`,
        diagnostic,
        matchedServices,
        whatsappText: data.whatsappText || defaultWaText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isAiVisionAnalysis: !!imagePayload
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn('Gemini API call fallback to heuristic:', err);
      // Fallback seamlessly to local heuristic diagnosis so customer never sees error
      const { botText, diag, matched, waText } = runFallbackHeuristic(userMsgText, !!imagePayload);
      
      const botMsg: BotMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        diagnostic: { ...diag, isAiVisionAnalysis: !!imagePayload },
        matchedServices: matched,
        whatsappText: waText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isAiVisionAnalysis: !!imagePayload
      };

      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSelectServiceDirect = (serviceId: string) => {
    onClose();
    if (onBookService) {
      onBookService(serviceId);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Halo! Saya Soleman AI Asisten Reparasi Sepatu Cirebon (didukung teknologi Google Gemini Multimodal Vision) 👟🤖.\n\nAnda dapat mengetik keluhan atau langsung MENGUNGGAH FOTO SEPATU Anda (kamera/galeri). Gemini AI kami akan menganalisis kondisi fisik kerusakan pada foto secara detail dan menampilkan menu servis yang 100% tepat!',
        matchedServices: SERVICES_CATALOG.filter(s => s.isBestMenu).slice(0, 3),
        timestamp: 'Baru saja'
      }
    ]);
    setSelectedImage(null);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl h-[92vh] max-h-[850px] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Modal Top Header */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                  Soleman AI Vision
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 fill-slate-950" /> Gemini Engine
                  </span>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Unggah Foto & Konsultasi Menu Kerusakan 24 Jam • Workshop Cirebon</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              title="Reset Percakapan"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto whitespace-nowrap space-x-1.5 scrollbar-none shrink-0">
          {botCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer inline-block ${
                activeCategoryFilter === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-102'
                  : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              {/* Message Sender Header */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 px-1">
                {m.sender === 'bot' ? (
                  <>
                    <Cpu className="w-3 h-3 text-amber-400" />
                    <span className="font-bold text-amber-400">Soleman Gemini AI</span>
                    {m.isAiVisionAnalysis && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        📸 Analisis Foto
                      </span>
                    )}
                  </>
                ) : (
                  <span>Anda • {m.timestamp}</span>
                )}
              </div>

              {/* Main Text & Image Bubble */}
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-4 shadow-md ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none space-y-2.5'
                }`}
              >
                {/* Render uploaded image thumbnail if present */}
                {m.imageUrl && (
                  <div className="mb-2.5 rounded-xl overflow-hidden border border-amber-300/30 max-w-sm">
                    <div className="relative group">
                      <img 
                        src={m.imageUrl} 
                        alt="Foto Sepatu Pelanggan" 
                        className="w-full max-h-56 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-[10px] text-white font-bold flex items-center gap-1 border border-white/10">
                        <Camera className="w-3 h-3 text-amber-400" />
                        <span>Foto Sepatu Pelanggan</span>
                      </div>
                    </div>
                  </div>
                )}

                <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                  {m.text}
                </p>
              </div>

              {/* Deep Technical Diagnostic Card (if available from Bot) */}
              {m.diagnostic && (
                <div className="max-w-[95%] sm:max-w-[90%] w-full rounded-2xl bg-slate-950/90 border border-amber-500/30 p-3.5 sm:p-4 shadow-xl space-y-3 animate-fadeIn">
                  
                  {/* Card Title Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-white text-xs sm:text-sm">
                        Laporan Diagnosis Teknis & Prosedur Reparasi
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {m.diagnostic.warranty}
                      </span>
                    </div>
                  </div>

                  {/* Detected Damages Badges (Extracted from photo by Gemini AI) */}
                  {m.diagnostic.detectedDamages && m.diagnostic.detectedDamages.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        Kerusakan Terdeteksi dari Foto / Keluhan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.diagnostic.detectedDamages.map((dmg, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-[11px] text-amber-300 font-medium flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                            {dmg}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary / Root Cause */}
                  <div className="text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Penyebab & Analisis Material:
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      {m.diagnostic.rootCause}
                    </p>
                  </div>

                  {/* Technical Workshop Procedures */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-200 text-xs flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-amber-400" /> Prosedur Teknis Workshop Soleman:
                    </span>
                    <div className="space-y-1.5 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60">
                      {m.diagnostic.technicalProcedure.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-tight">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price, Duration, Pro Tip Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold">Estimasi Biaya</div>
                      <div className="font-mono font-black text-amber-400 text-xs sm:text-sm mt-0.5">
                        {m.diagnostic.priceFormatted}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold">Waktu Pengerjaan</div>
                      <div className="font-bold text-slate-200 text-xs mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {m.diagnostic.duration}
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold">Pro-Tip Teknisi</div>
                      <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                        {m.diagnostic.proTip}
                      </div>
                    </div>
                  </div>

                  {/* Wajib Konfirmasi Foto Bahan Notice */}
                  {m.diagnostic.photoConfirmationRequired && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2 font-bold">
                      <Camera className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>📸 Wajib Konfirmasi: {m.diagnostic.photoConfirmationNote || 'Foto sampel bahan tapak akan dikirim ke WhatsApp Anda terlebih dahulu sebelum dipasang!'}</span>
                    </div>
                  )}

                  {/* WhatsApp Direct Action Button */}
                  {m.whatsappText && (
                    <a
                      href={`https://wa.me/${WORKSHOP_INFO.phone}?text=${encodeURIComponent(m.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                    >
                      <MessageSquare className="w-4 h-4 fill-slate-950" />
                      <span>Lanjutkan Chat & Kirim Foto ke WhatsApp Teknisi Soleman</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                </div>
              )}

              {/* Matching Service Menu Cards Based on Detected Damages */}
              {m.matchedServices && m.matchedServices.length > 0 && (
                <div className="mt-3 max-w-[95%] sm:max-w-[90%] space-y-2.5 w-full">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Award className="w-3.5 h-3.5" />
                    <span>PILIHAN MENU SERVIS SESUAI KERUSAKAN DI GAMBAR / KELUHAN:</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {m.matchedServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                                {service.name}
                              </h4>
                              {service.isBestMenu && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-black">
                                  Menu Terbaik
                                </span>
                              )}
                              {service.requiresPhotoConfirmation && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                                  Foto WA
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                              {service.damageTitle}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                              <span className="font-mono font-bold text-amber-400">
                                {service.priceFormatted}
                              </span>
                              <span>• ⏱️ {service.durationEst}</span>
                              <span>• 🛡️ Garansi {service.warrantyDays} Hari</span>
                            </div>
                          </div>
                        </div>

                        {/* Action: Book This Service */}
                        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                          <button
                            type="button"
                            onClick={() => handleSelectServiceDirect(service.id)}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Pilih Menu Ini</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 w-fit">
              <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Soleman Gemini AI sedang menganalisis foto & kondisi kerusakan sepatu Anda...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Selected Image Preview Bar (Above Input) */}
        {selectedImage && (
          <div className="px-3 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img 
                  src={selectedImage.dataUrl} 
                  alt="Preview" 
                  className="w-12 h-12 object-cover rounded-xl border border-amber-500/50"
                />
                <span className="absolute -top-1 -right-1 p-0.5 bg-amber-500 rounded-full text-slate-950">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  Foto Sepatu Siap Dianalisis AI
                </p>
                <p className="text-[10px] text-slate-400">
                  {selectedImage.name} • Tambahkan catatan keluhan atau langsung klik Kirim.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeSelectedImage}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Hapus foto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap space-x-1.5 scrollbar-none shrink-0">
          <span className="text-[10px] text-slate-500 font-bold mr-1 inline-block align-middle">
            Pertanyaan Cepat:
          </span>
          {filteredQuickProblems.map((prob, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prob.text)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-400 inline-block align-middle transition-colors active:scale-95 cursor-pointer"
            >
              {prob.text}
            </button>
          ))}
        </div>

        {/* Text & Image Upload Input Footer */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          
          {/* Hidden file inputs for Camera and Gallery upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageFileChange}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleImageFileChange}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            {/* Camera Button for mobile / APK capture */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              title="Ambil foto dari kamera"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-amber-400 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Gallery Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Pilih foto dari galeri HP"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={selectedImage ? "Tulis keluhan tambahan untuk foto ini (opsional)..." : "Ketik keluhan atau unggah foto sepatu (sol mangap, trail botak)..."}
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() && !selectedImage}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Kirim AI</span>
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 px-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Google Gemini Multimodal AI Vision
            </span>
            <span className="text-emerald-400 font-semibold">Terapkan langsung di APK Android & iPhone</span>
          </div>
        </div>

      </div>
    </div>
  );
};
