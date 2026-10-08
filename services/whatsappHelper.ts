/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order, OrderStatus } from '../types';
import { WORKSHOP_INFO, STATUS_LABELS } from '../data/solcreftData';

/**
 * Membuat link WhatsApp untuk pemesanan servis & antar jemput baru
 */
export function buildNewOrderWhatsAppUrl(order: Order): string {
  let shoesDetailText = '';
  if (order.shoes && order.shoes.length > 0) {
    shoesDetailText = order.shoes.map((sh, idx) => {
      const sevLabel = sh.severity === 'kecil' ? '🟢 Kecil / Ringan' : sh.severity === 'hard' ? '🔴 Hard / Parah' : '🟡 Normal / Sedang';
      const sList = sh.selectedServices.map(s => s.name).join(', ');
      return `👟 *SEPATU #${idx + 1}:* ${sh.shoeBrand}
  • Kategori: ${sh.shoeType}
  • Bahan Material: *${sh.material}*
  • Tingkat Kerusakan: *${sevLabel}*
  • Layanan Reparasi: ${sList}
  ${sh.damageNotes ? `• Keluhan Khusus: _"${sh.damageNotes}"_` : ''}
  • Biaya Sepatu Ini: Rp ${sh.price.toLocaleString('id-ID')}`;
    }).join('\n\n');
  } else {
    const serviceList = order.selectedServices
      .map((s, idx) => `   ${idx + 1}. *${s.name}* (${s.priceFormatted})`)
      .join('\n');
    shoesDetailText = `👟 *DATA SEPATU:*
- Merk/Model: *${order.shoeBrand}*
- Kategori: ${order.shoeType}
${order.material ? `- Bahan Material: ${order.material}` : ''}
${order.severity ? `- Tingkat Kerusakan: ${order.severity.toUpperCase()}` : ''}
- Jumlah: ${order.pairsCount} Pasang
${order.customNotes ? `- Keluhan/Catatan: _"${order.customNotes}"_` : ''}

🛠️ *JENIS KERUSAKAN & LAYANAN DIPILIH:*
${serviceList}`;
  }

  const locationText = order.pickupType === 'drop_off'
    ? `🏢 *Metode:* Drop-off Langsung ke Workshop Soleman (Jl. Dr. Cipto No. 42 Cirebon)`
    : `🛵 *Metode:* Antar-Jemput Kurir Soleman (Herdi)
📍 *Wilayah Cirebon:* ${order.location.areaName}
🏠 *Alamat Lengkap:* ${order.location.fullAddress}
🚩 *Patokan:* ${order.location.landmark || '-'}
${order.location.mapsUrl ? `🗺️ *Titik Google Maps Kurir:* ${order.location.mapsUrl}` : ''}
${order.location.coords ? `🌐 *Koordinat GPS:* ${order.location.coords.lat.toFixed(5)}, ${order.location.coords.lng.toFixed(5)}` : ''}
⏰ *Jadwal Jemput:* Sesi ${order.preferredTimeSlot.toUpperCase()}`;

  const photoNote = (order.photos && order.photos.length > 0) || order.photoUrl
    ? `📸 *FOTO SEPATU RUSAK:* Sudah terunggah di sistem & saya siap kirim foto tambahan ke chat ini agar admin mudah cek kondisinya.`
    : `📸 *FOTO SEPATU RUSAK:* Saya akan kirim foto fisiknya ke chat ini untuk dicek admin Soleman.`;

  const message = `*HALO SOLEMAN CIREBON!* 👟✨
Saya ingin konfirmasi booking perbaikan sepatu & layanan antar-jemput.

📋 *NO. ORDER:* #${order.id}
👤 *Nama Pelanggan:* ${order.customerName}
📱 *No. WhatsApp:* ${order.customerPhone}
🔢 *Total Jumlah:* *${order.pairsCount} Pasang*

${shoesDetailText}

${photoNote}

${locationText}

💰 *ESTIMASI BIAYA:*
- Subtotal Servis (${order.pairsCount} psg): Rp ${order.totalServicesPrice.toLocaleString('id-ID')}
- Ongkir Kurir Cirebon: ${order.deliveryFee === 0 ? 'GRATIS (Promo 2+ pasang)' : `Rp ${order.deliveryFee.toLocaleString('id-ID')}`}
- *TOTAL ESTIMASI:* *Rp ${order.totalAmount.toLocaleString('id-ID')}*

Pesanan & foto sudah saya kirimkan ke dashboard admin. Terima kasih Soleman! 🙏`;

  return `https://wa.me/${WORKSHOP_INFO.phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Membuat link notifikasi update status servis untuk dikirim ke WhatsApp pelanggan
 */
export function buildStatusNotificationWhatsAppUrl(
  order: Order, 
  targetStatus: OrderStatus,
  customDriverNote?: string
): string {
  const statusInfo = STATUS_LABELS[targetStatus];
  // Bersihkan nomor WhatsApp pelanggan (ganti 08xx jadi 628xx)
  let cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }

  let statusDescription = '';
  switch (targetStatus) {
    case 'menunggu_jemput':
      statusDescription = `Permintaan antar-jemput Kakak telah kami jadwalkan. Tim kurir kami akan segera menuju lokasi Anda di ${order.location.areaName}.`;
      break;
    case 'perjalanan_workshop':
      statusDescription = `🛵 *Kurir Meluncur!* Sepatu Kakak sedang dalam penjemputan oleh kurir Herdi menuju Workshop Soleman (Jl. Dr. Cipto No. 42 Cirebon).`;
      break;
    case 'pengerjaan':
      statusDescription = `🛠️ *Sedang Dikerjakan Teknisi:* Sepatu Kakak sudah berada di meja workshop dan sedang ditangani oleh ${order.technicianName} dengan standar lem & jahitan terbaik Soleman.`;
      break;
    case 'quality_check':
      statusDescription = `🔍 *Quality Control:* Pengerjaan telah selesai! Tim Soleman sedang memastikan daya rekat sol, kerapian jahitan, dan proses steril finishing sebelum dikemas.`;
      break;
    case 'siap_antar':
      statusDescription = `🎉 *Sepatu Sudah Jadi & Siap Diantar!* Sepatu kesayangan Kakak sudah kembali prima dan kurir Herdi siap mengantarkan kembali ke lokasi Kakak.`;
      break;
    case 'selesai':
      statusDescription = `✅ *Servis Selesai:* Sepatu telah diterima dengan baik. Nikmati garansi servis resmi Soleman. Terima kasih telah mempercayakan sepatu Anda pada Soleman Cirebon!`;
      break;
  }

  const message = `*UPDATE STATUS SERVIS SOLEMAN CIREBON* 👟✨

Halo Kak *${order.customerName}*!
Berikut kabar terbaru mengenai sepatu Anda:

📌 *No. Order:* #${order.id}
👟 *Sepatu:* ${order.shoeBrand} (${order.pairsCount} pasang)
⚡ *Status Terkini:* *${statusInfo.label.toUpperCase()}*

📢 *Keterangan Progres:*
${statusDescription}
${customDriverNote ? `\n📝 *Catatan Kurir/Teknisi:* "${customDriverNote}"` : ''}

📍 *Alamat Anda:* ${order.location.fullAddress}
${order.location.mapsUrl ? `🗺️ *Titik Antar-Jemput:* ${order.location.mapsUrl}` : ''}
💰 *Total Biaya:* Rp ${order.totalAmount.toLocaleString('id-ID')}

Jika ada pertanyaan, langsung balas pesan ini ya Kak.
*Soleman Cirebon* - _Perbaikan Sepatu Terlengkap & Presisi_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Link WhatsApp untuk konsultasi foto kerusakan langsung ke CS
 */
export function buildConsultationWhatsAppUrl(prefillIssue?: string): string {
  const text = `Halo Soleman Cirebon! 👋
Saya ingin konsultasi kondisi sepatu saya yang rusak:
${prefillIssue ? `Jenis Kerusakan: *${prefillIssue}*\n` : ''}
Saya mau kirim foto sepatunya ke sini untuk estimasi biaya dan penjemputan kurir Herdi di wilayah Cirebon.`;

  return `https://wa.me/${WORKSHOP_INFO.phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Link WhatsApp untuk konfirmasi penerimaan pesanan oleh Admin ke pelanggan
 */
export function buildOrderAcceptedWhatsAppUrl(order: Order, courierName: string = 'Herdi'): string {
  let cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }

  const message = `*PESANAN DITERIMA ADMIN SOLEMAN CIREBON* ✅👟

Halo Kak *${order.customerName}*!
Permintaan servis & antar-jemput sepatu Kakak telah *DITERIMA & DIKONFIRMASI* oleh Admin Workshop Soleman.

📋 *No. Order:* #${order.id}
👟 *Sepatu:* ${order.shoeBrand} (${order.pairsCount} pasang)
🛠️ *Layanan:* ${order.selectedServices.map(s => s.name).join(', ')}
🛵 *Kurir Ditugaskan:* ${courierName} (No. WA: 0881-4519-955)
⏰ *Sesi Jemput:* ${order.preferredTimeSlot.toUpperCase()}

📍 *Alamat Penjemputan:*
${order.location.fullAddress}
${order.location.landmark ? `🚩 Patokan: ${order.location.landmark}` : ''}
${order.location.mapsUrl ? `🗺️ Titik Maps: ${order.location.mapsUrl}` : ''}
💰 *Total Biaya:* Rp ${order.totalAmount.toLocaleString('id-ID')}

Mohon pastikan sepatu sudah siap saat kurir Herdi tiba ya Kak. Terima kasih banyak telah memilih Soleman Cirebon! 🙏`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Link WhatsApp untuk Admin membagikan tugas penjemputan ke Kurir Herdi
 */
export function buildNotifyCourierWhatsAppUrl(order: Order, courierPhone: string = '08814519955', courierName: string = 'Herdi'): string {
  let cleanPhone = courierPhone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }

  const message = `*SURAT TUGAS PENJEMPUTAN KURIR SOLEMAN* 🛵📋
Halo ${courierName}, ada penjemputan order baru dari Admin Soleman:

📌 *No. Order:* #${order.id}
👤 *Pelanggan:* ${order.customerName}
📱 *No. HP Pelanggan:* ${order.customerPhone}
👟 *Sepatu:* ${order.shoeBrand} (${order.pairsCount} pasang)
🛠️ *Kerusakan:* ${order.selectedServices.map(s => s.name).join(', ')}
${order.customNotes ? `📝 *Catatan:* "${order.customNotes}"` : ''}

📍 *WILAYAH & ALAMAT:*
- Area: *${order.location.areaName}*
- Alamat: ${order.location.fullAddress}
- Patokan: *${order.location.landmark || '-'}*
${order.location.coords ? `- GPS: ${order.location.coords.lat.toFixed(5)}, ${order.location.coords.lng.toFixed(5)}` : ''}
${order.location.mapsUrl ? `🗺️ *LINK MAPS NAVIGASI:* ${order.location.mapsUrl}` : ''}

⏰ *Jadwal Jemput:* Sesi ${order.preferredTimeSlot.toUpperCase()}
💰 *Ongkir:* ${order.deliveryFee === 0 ? 'GRATIS (Promo)' : `Rp ${order.deliveryFee.toLocaleString('id-ID')}`}

Harap segera meluncur dan konfirmasi jika sepatu sudah diambil. Semangat di jalan kurir Herdi! 🚀`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Link navigasi Google Maps untuk Kurir
 */
export function buildGoogleMapsRouteUrl(lat?: number, lng?: number, addressQuery?: string): string {
  if (lat && lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  if (addressQuery) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery + ', Cirebon')}`;
  }
  return WORKSHOP_INFO.googleMapsUrl;
}
