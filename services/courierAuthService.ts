/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CourierUser } from '../types';

const COURIER_STORAGE_KEY = 'soleman_courier_session_auth';

// Sandi resmi Kurir Soleman Cirebon sesuai permintaan
export const VALID_COURIER_PASS = 'Herdazabuza';

export const courierAuthService = {
  /**
   * Verifikasi kredensial login kurir Soleman
   */
  login(identifierInput: string, passwordInput: string): { success: boolean; message?: string; user?: CourierUser } {
    const cleanId = identifierInput.trim();

    if (!cleanId || !passwordInput) {
      return { success: false, message: 'Silakan isi nama/ID kurir dan kata sandi.' };
    }

    if (passwordInput === VALID_COURIER_PASS) {
      const courierUser: CourierUser = {
        username: cleanId.toLowerCase(),
        name: 'Kurir Soleman (Armada Antar-Jemput Cirebon)',
        role: 'Kurir Lapangan Soleman',
        loggedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem(COURIER_STORAGE_KEY, JSON.stringify(courierUser));
      } catch (e) {
        console.warn('Storage error', e);
      }

      return { success: true, user: courierUser };
    }

    return {
      success: false,
      message: 'Kata sandi kurir salah! Silakan masukkan sandi resmi kurir Soleman.'
    };
  },

  /**
   * Cek sesi kurir tersimpan
   */
  getCurrentUser(): CourierUser | null {
    try {
      const data = localStorage.getItem(COURIER_STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as CourierUser;
      }
    } catch (e) {
      console.warn('Storage error', e);
    }
    return null;
  },

  /**
   * Cek apakah kurir sedang login
   */
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },

  /**
   * Logout kurir
   */
  logout(): void {
    try {
      localStorage.removeItem(COURIER_STORAGE_KEY);
    } catch (e) {
      console.warn('Storage error', e);
    }
  }
};
