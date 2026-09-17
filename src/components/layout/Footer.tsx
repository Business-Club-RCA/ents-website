'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/site';

export function Footer() {
  const pathname = usePathname();

  // Do not render footer on admin CMS routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden border-t border-neutral-300/70 bg-[#dedede] text-neutral-900 select-none">
      {/* 1. Atmospheric Sky & Deep Space Horizon Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/footer-twilight-bg.jpg"
          alt="ENTS Space Landscape"
          fill
          priority={false}
          className="object-cover object-bottom pointer-events-none select-none"
          quality={95}
        />
        {/* Soft top atmospheric mist for seamless section transitions */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#dedede]/90 via-[#dedede]/50 to-transparent pointer-events-none" />
        {/* Dark overlay to ensure text legibility over the photo */}
        <div className="absolute inset-0 bg-neutral-950/55 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-0">
        {/* 2. Top Navigation Grid: Real ENTS Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 sm:gap-14 lg:gap-16">
          {/* Categorized Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {/* Column 1: PRODUCTS / VENTURES */}
            <div className="space-y-3 sm:space-y-3.5">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50 font-semibold">
                Ventures &amp; Labs
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-mono tracking-wide">
                <li>
                  <Link href="/projects#sifs" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    SIFS Simulator
                  </Link>
                </li>
                <li>
                  <Link href="/projects#kurapay" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    KuraPay
                  </Link>
                </li>
                <li>
                  <Link href="/projects#tradeforge" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    TradeForge
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    Campus Ventures
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: MISSION AREAS / DISCIPLINES */}
            <div className="space-y-3 sm:space-y-3.5">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50 font-semibold">
                Disciplines
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-mono tracking-wide">
                <li>
                  <Link href="/tracks#business-handlers" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    Business Handlers
                  </Link>
                </li>
                <li>
                  <Link href="/tracks#traders" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    Quantitative Traders
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    1% Risk Protocol
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    SIFS League
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: COMPANY / SOCIETY */}
            <div className="space-y-3 sm:space-y-3.5 col-span-2 sm:col-span-1">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50 font-semibold">
                Society
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-mono tracking-wide">
                <li>
                  <Link href="/about" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    About ENTS
                  </Link>
                </li>
                <li>
                  <Link href="/about#team" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    Executive Board
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.institution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white font-semibold transition-colors uppercase block"
                  >
                    Rwanda Coding Academy
                  </a>
                </li>
                <li>
                  <Link href="/updates" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    Dispatches &amp; Events
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="text-white/90 hover:text-white font-semibold transition-colors uppercase block">
                    Apply for 2026
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Quadrant: Social Icons — LinkedIn, X, Instagram */}
          <div className="flex items-center gap-3 pt-2 lg:pt-0">
            {/* LinkedIn */}
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-white/30 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-white/30 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-white/30 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 3. Middle Legal / Rights Row */}
        <div className="mt-20 sm:mt-28 md:mt-36 lg:mt-40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-wider">
          <div>
            &copy; {new Date().getFullYear()} ENTS &middot; RWANDA CODING ACADEMY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <Link href="/about" className="hover:text-white/70 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/about" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/leaderboard" className="hover:text-white/70 transition-colors">
              Risk Disclosure
            </Link>
          </div>
        </div>
      </div>

      {/* 4. THE MONUMENTAL "ENTS" BIG TEXT AT THE BOTTOM (FLUSH WITH BASELINE) */}
      <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none mt-2 sm:mt-4">
        {/* Floating Satellite — desktop (lg+) only */}
        <div
          className="absolute top-[32%] sm:top-[28%] left-[32%] sm:left-[35%] z-20 animate-float-slow hidden lg:block drop-shadow-2xl"
          style={{ width: '84px', height: '54px' }}
        >
          <svg viewBox="0 0 120 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="2" y="16" width="38" height="42" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <rect x="5" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="22" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="5" y="38" width="15" height="17" fill="#1e3a8a" />
            <rect x="22" y="38" width="15" height="17" fill="#1e3a8a" />
            <line x1="2" y1="36.5" x2="40" y2="36.5" stroke="#60a5fa" strokeWidth="0.75" />
            <line x1="20" y1="16" x2="20" y2="58" stroke="#60a5fa" strokeWidth="0.75" />
            <line x1="40" y1="37" x2="48" y2="37" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="48" y="18" width="26" height="38" rx="3" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
            <rect x="50" y="20" width="22" height="34" rx="2" fill="#d97706" />
            <circle cx="61" cy="37" r="7" fill="#09090b" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="61" cy="37" r="3.5" fill="#38bdf8" />
            <path d="M57 18 L61 10 L65 18 Z" fill="#94a3b8" />
            <line x1="61" y1="10" x2="61" y2="5" stroke="#f8fafc" strokeWidth="1.5" />
            <circle cx="61" cy="4" r="1.5" fill="#ef4444" />
            <line x1="74" y1="37" x2="82" y2="37" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="80" y="16" width="38" height="42" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <rect x="83" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="100" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="83" y="38" width="15" height="17" fill="#1e3a8a" />
            <rect x="100" y="38" width="15" height="17" fill="#1e3a8a" />
            <line x1="80" y1="36.5" x2="118" y2="36.5" stroke="#60a5fa" strokeWidth="0.75" />
            <line x1="98" y1="16" x2="98" y2="58" stroke="#60a5fa" strokeWidth="0.75" />
          </svg>
        </div>

        {/* Floating Rock — desktop (lg+) only */}
        <div
          className="absolute top-[22%] sm:top-[20%] right-[18%] sm:right-[22%] z-20 animate-float-reverse hidden lg:block drop-shadow-2xl"
          style={{ width: '56px', height: '56px' }}
        >
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <polygon points="32,4 52,14 60,36 44,58 18,56 4,34 12,12" fill="#18151e" stroke="#4c425c" strokeWidth="1" />
            <polygon points="32,4 28,26 12,12" fill="#2b2436" />
            <polygon points="32,4 52,14 42,28 28,26" fill="#221c2c" />
            <polygon points="52,14 60,36 42,28" fill="#1a1522" />
            <polygon points="28,26 42,28 36,46 18,36" fill="#120e18" />
            <polygon points="12,12 28,26 18,36 4,34" fill="#1e1826" />
            <polygon points="18,36 36,46 32,60 18,56" fill="#16121d" />
            <polygon points="42,28 60,36 50,54 36,46" fill="#0d0a12" />
            <polygon points="36,46 50,54 44,58 32,60" fill="#1c1624" />
          </svg>
        </div>

        {/* Foreground Mountain Silhouette (Bottom-Left) */}
        <div className="absolute bottom-0 left-0 z-20 pointer-events-none w-36 sm:w-56 md:w-72 lg:w-96 h-auto">
          <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 240 L0 80 L35 120 L70 100 L110 160 L160 140 L210 200 L260 190 L320 240 Z" fill="#18141f" />
            <path d="M0 130 L45 155 L90 145 L140 185 L180 170 L240 220 L300 240 L0 240 Z" fill="#0f0c14" />
            <path d="M0 80 L35 120 L70 100 L110 160 L160 140 L210 200 L260 190 L320 240" stroke="#584d6b" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Foreground Mountain Silhouette (Bottom-Right) */}
        <div className="absolute bottom-0 right-0 z-20 pointer-events-none w-40 sm:w-60 md:w-80 lg:w-[420px] h-auto">
          <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M360 260 L360 90 L320 135 L280 115 L230 175 L180 155 L130 215 L70 205 L0 260 Z" fill="#18141f" />
            <path d="M360 145 L315 170 L270 160 L215 205 L170 190 L110 240 L50 260 L360 260 Z" fill="#0f0c14" />
            <path d="M360 90 L320 135 L280 115 L230 175 L180 155 L130 215 L70 205 L0 260" stroke="#584d6b" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Massive full-bleed "ENTS" typography */}
        <div className="w-full flex justify-center items-end relative z-10">
          <h2
            className="text-[34vw] sm:text-[32vw] md:text-[30vw] lg:text-[28vw] font-black tracking-[-0.04em] text-white/10 leading-[0.72] translate-y-[3%] sm:translate-y-[4%] whitespace-nowrap block select-none"
            style={{ fontFamily: "var(--font-heading), 'Power Grotesk', -apple-system, sans-serif" }}
          >
            ENTS
          </h2>
        </div>
      </div>
    </footer>
  );
}
