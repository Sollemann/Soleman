/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DamageCategory = 
  | 'all'
  | 'sol' 
  | 'jahit' 
  | 'warna' 
  | 'kebersihan' 
  | 'busa' 
  | 'kulit_upper';

export type ShoeType = 
  | 'Sneakers'
  | 'Pantofel / Formal'
  | 'Boots / Safety'
  | 'Running / Sport'
  | 'Heels / Flat Shoes'
  | 'Canvas / Casual';

export type ShoeMaterial =
  | 'Canvas / Kain'
  | 'Kulit Asli (Leather)'
  | 'Suede / Nubuck'
  | 'Kulit Sintetis (Faux)'
  | 'Mesh / Rajut / Flyknit'
  | 'Karet / EVA / Foam';

export type DamageSeverity = 
  | 'kecil'    // Kerusakan ringan / minor (ujung lepas tipis, baret halus)
  | 'normal'   // Kerusakan sedang / standard (mangap separuh, kotor menempel, midsole kuning)
  | 'hard';    // Kerusakan parah / berat (sol lepas total, patah terbelah, kanvas robek lebar)

export interface ServiceItem {
  id: string;
  name: string;
  category: DamageCategory;
  damageTitle: string;
  symptoms: string[];
  solution: string;
  price: number;
  priceFormatted: string;
  durationEst: string;
  warrantyDays: number;
  popular?: boolean;
  suitableShoes: ShoeType[];
  iconName: string;
  beforeAfterDescription: string;
  image: string;
}

export type OrderStatus = 
  | 'menunggu_jemput'
  | 'perjalanan_workshop'
  | 'pengerjaan'
  | 'quality_check'
  | 'siap_antar'
  | 'selesai';

export interface PickupLocation {
  areaName: string; // Kecamatan di Cirebon
  fullAddress: string;
  landmark: string; // Patokan rumah/toko
  lat?: number;
  lng?: number;
  accuracy?: number;
  mapsUrl?: string;
  detectedViaGps?: boolean;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
}

export interface ShoeItemDetail {
  id: string;
  pairNumber: number;
  shoeBrand: string;
  shoeType: ShoeType;
  material: ShoeMaterial;
  severity: DamageSeverity;
  selectedServices: ServiceItem[];
  photoUrl?: string;
  damageNotes?: string;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  shoeBrand: string;
  shoeType: ShoeType;
  material?: ShoeMaterial;
  severity?: DamageSeverity;
  pairsCount: number;
  selectedServices: ServiceItem[];
  shoes?: ShoeItemDetail[];
  customNotes?: string;
  photoUrl?: string;
  photos?: string[];
  pickupType: 'antar_jemput' | 'hanya_jemput' | 'drop_off';
  preferredTimeSlot: 'pagi' | 'siang' | 'sore';
  location: PickupLocation;
  totalServicesPrice: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  estimatedFinishedAt: string;
  technicianName: string;
  timeline: OrderTimelineStep[];
  isAcceptedByAdmin?: boolean;
  acceptedAt?: string;
  assignedCourier?: string;
  assignedCourierPhone?: string;
  internalAdminNotes?: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  loggedAt?: string;
}

export interface CirebonArea {
  name: string;
  type: 'Kota' | 'Kabupaten';
  deliveryFee: number;
  estimatedPickupHours: string;
}
