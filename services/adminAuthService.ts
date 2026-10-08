/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminUser } from '../types';

const ADMIN_STORAGE_KEY = 'solcreft_admin_session_auth';

// Kredensial Admin Resmi Solcreft Cirebon
const VALID_ADMIN_EMAIL = '50zarwtn50@gmail.com';
const VALID_ADMIN_PASS = 'Hafidahcantik87';

export const adminAuthService = {
  /**
   * Verifikasi kredensial login admin secara aman
   */
  login(emailInput: string, passwordInput: string): { success: boolean; message?: string; user?: AdminUser } {
    const cleanEmail = emailInput.trim().toLowerCase();
    
    if (!cleanEmail || !passwordInput) {
      return { success: false, message: 'Silakan isi email dan kata sandi admin.' };
    }

    if (cleanEmail === VALID_ADMIN_EMAIL && passwordInput === VALID_ADMIN_PASS) {
      const adminUser: AdminUser = {
        email: VALID_ADMIN_EMAIL,
        name: 'Manager Workshop Soleman',
        role: 'Super Admin',
        loggedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      } catch (e) {
        console.warn('Storage error', e);
      }

      return { success: true, user: adminUser };
    }

    return { 
      success: false, 
      message: 'Email atau kata sandi admin salah. Akses ditolak.' 
    };
  },

  /**
   * Cek sesi admin tersimpan
   */
  getCurrentUser(): AdminUser | null {
    try {
      const data = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as AdminUser;
      }
    } catch (e) {
      console.warn('Storage error', e);
    }
    return null;
  },

  /**
   * Cek apakah admin sedang login
   */
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },

  /**
   * Logout dan hapus sesi admin
   */
  logout(): void {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {
      console.warn('Storage error', e);
    }
  }
};
