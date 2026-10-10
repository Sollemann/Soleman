/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SolemanLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  onStaffAccess?: () => void;
}

export const SolemanLogo: React.FC<SolemanLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  onStaffAccess
}) => {
  const iconSize = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl sm:text-2xl';
  const badgeSize = size === 'sm' ? 'text-[9px] px-1.5 py-0.2' : 'text-[10px] px-2 py-0.5';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Clear Sneaker / Shoe Emblem Icon (Discreet hidden trigger for staff) */}
      <div 
        onClick={(e) => {
          if (onStaffAccess) {
            e.stopPropagation();
            onStaffAccess();
          }
        }}
        title={onStaffAccess ? "Akses Masuk Petugas Soleman" : undefined}
        className={`relative ${iconSize} rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-[2px] shadow-lg shadow-amber-500/25 shrink-0 group ${onStaffAccess ? 'cursor-pointer hover:scale-105 active:scale-95' : ''} transition-transform`}
      >
        <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden p-1.5">
          
          {/* Subtle interior gold aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 via-amber-500/5 to-transparent" />
          
          {/* Clear, recognizable sneaker vector illustration */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-[0_2px_6px_rgba(245,158,11,0.6)]"
          >
            {/* Sneaker Outsole Base (Bottom tread) */}
            <path
              d="M8 47C10 49 14 50 24 50C36 50 48 49 54 46C56 45 57 43 57 41L56 38L9 38L8 42C7.5 44 7 46 8 47Z"
              fill="url(#soleGradient)"
            />
            {/* Outsole Grip Treads */}
            <path
              d="M14 49L17 40M22 49L25 40M30 49L33 40M38 49L41 40M46 48L49 40M52 46L54 40"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Midsole Layer */}
            <path
              d="M9 38L56 38C57.5 38 58 36.5 57 35.5L54 34L11 34L8 36C7.5 37 8 38 9 38Z"
              fill="#fef08a"
            />
            
            {/* Shoe Upper Silhouette */}
            <path
              d="M11 34C10 27 12 21 17 17C19.5 15 23 14 26 15C27 15.5 28 17 28 19L27 22L36 24L48 30C52 32 55 33.5 55 34L11 34Z"
              fill="url(#upperGradient)"
            />

            {/* Sneaker Collar & Tongue */}
            <path
              d="M17 17C17 14 20 12 23 12C26 12 28 14 28 18L26 23L17 21V17Z"
              fill="#fbbf24"
            />

            {/* Shoelace Eyelets & Zig-Zag Laces */}
            <circle cx="28" cy="22" r="1.5" fill="#ffffff" />
            <circle cx="32" cy="24" r="1.5" fill="#ffffff" />
            <circle cx="37" cy="26" r="1.5" fill="#ffffff" />
            <circle cx="42" cy="28" r="1.5" fill="#ffffff" />
            
            <path
              d="M26 20L31 23M29 22L35 25M33 24L40 27M38 26L45 29"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Dynamic Swoosh / Speed Wave Accent */}
            <path
              d="M13 32C19 32 28 30 35 26C27 28 20 28 14 30"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Master Repair Needle & Sparkle on Top-Right */}
            <path
              d="M48 10L50 15L55 17L50 19L48 24L46 19L41 17L46 15L48 10Z"
              fill="#fef08a"
              stroke="#f59e0b"
              strokeWidth="0.8"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="soleGradient" x1="8" y1="38" x2="57" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f59e0b" />
                <stop offset="0.5" stopColor="#d97706" />
                <stop offset="1" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="upperGradient" x1="11" y1="14" x2="55" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="0.7" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className={`${titleSize} font-black tracking-tight text-white font-display uppercase`}>
            SOLE<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">MAN</span>
          </span>
          <span 
            onClick={(e) => {
              if (onStaffAccess) {
                e.stopPropagation();
                onStaffAccess();
              }
            }}
            className={`${badgeSize} font-bold tracking-widest uppercase rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 ${onStaffAccess ? 'cursor-pointer hover:bg-amber-500/40' : ''}`}
          >
            Cirebon
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[11px] text-slate-400 font-semibold tracking-wide flex items-center gap-1">
            <span>👟</span>
            <span>Master Shoe Repair & Workshop</span>
          </p>
        )}
      </div>
    </div>
  );
};
