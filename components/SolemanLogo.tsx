/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SolemanLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const SolemanLogo: React.FC<SolemanLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl sm:text-2xl';
  const badgeSize = size === 'sm' ? 'text-[9px] px-1.5 py-0.2' : 'text-[10px] px-2 py-0.5';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Cool Geometric Crest & Shoe Sole Emblem */}
      <div className={`relative ${iconSize} rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-[1.5px] shadow-lg shadow-amber-500/25 shrink-0 group`}>
        <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
          
          {/* Subtle interior glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-amber-600/30" />
          
          {/* Custom Stylized Sneaker Sole + Crown Vector */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 relative z-10 text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
          >
            {/* Sneaker Outsole Profile */}
            <path
              d="M7 26.5C8 28 11.5 29 18 29C25 29 28.5 28 29.5 25.5C30.2 23.5 28.5 22 25 21C20.5 19.8 22 17.5 26.5 17C29 16.7 30 15 28 13.5C25.5 11.8 19 11 13 13C8.5 14.5 6 18 6.5 21.5C6.8 23.5 6.2 25.2 7 26.5Z"
              fill="url(#goldGrad)"
              opacity="0.95"
            />
            {/* Grip Treads (Texture Lines) */}
            <path
              d="M10 23L13 25M15 22.5L18 24.5M20 22L23 24M25 21.5L27 23"
              stroke="#0f172a"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Iconic Crown / Wings Sparkle on Top */}
            <path
              d="M18 5L20.2 9.5L25 10.2L21.5 13.5L22.4 18.2L18 15.8L13.6 18.2L14.5 13.5L11 10.2L15.8 9.5L18 5Z"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="0.8"
            />
            {/* High-voltage Craft Stitch Lightning Accent */}
            <path
              d="M17 19L19.5 22.5L18 23.5L20.5 27"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="goldGrad" x1="6" y1="11" x2="30" y2="29" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="0.5" stopColor="#f59e0b" />
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
          <span className={`${badgeSize} font-bold tracking-widest uppercase rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30`}>
            Cirebon
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[11px] text-slate-400 font-semibold tracking-wide">
            Master Shoe Repair & Workshop
          </p>
        )}
      </div>
    </div>
  );
};
