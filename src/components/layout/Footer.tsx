import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-300/70 bg-[#ded6e6] text-neutral-900 select-none">
      {/* 1. Atmospheric Twilight Sky & Deep Space Horizon Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/footer-twilight-bg.jpg"
          alt="ENTS Twilight Space Landscape"
          fill
          priority={false}
          className="object-cover object-bottom pointer-events-none select-none"
          quality={95}
        />
        {/* Soft top atmospheric mist for seamless section transitions */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#e3dbe7]/90 via-[#ded5e6]/50 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-0">
        {/* 2. Top Navigation Grid: Real ENTS Content organized exactly like reference photo */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 sm:gap-14 lg:gap-16">
          {/* Categorized Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {/* Column 1: PRODUCTS / VENTURES */}
            <div className="space-y-3 sm:space-y-3.5">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Ventures &amp; Labs
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-mono tracking-wide">
                <li>
                  <Link
                    href="/projects#sifs"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    SIFS Simulator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects#kurapay"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    KuraPay
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects#tradeforge"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    TradeForge
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    Campus Ventures
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: MISSION AREAS / DISCIPLINES */}
            <div className="space-y-3 sm:space-y-3.5">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Disciplines
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-mono tracking-wide">
                <li>
                  <Link
                    href="/tracks#business-handlers"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    Business Handlers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tracks#traders"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    Quantitative Traders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    1% Risk Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    SIFS League
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: COMPANY / SOCIETY */}
            <div className="space-y-3 sm:space-y-3.5 col-span-2 sm:col-span-1">
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Society
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-mono tracking-wide">
                <li>
                  <Link
                    href="/about"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    About ENTS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#team"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    Executive Board
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.institution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    Rwanda Coding Academy
                  </a>
                </li>
                <li>
                  <Link
                    href="/join"
                    className="text-neutral-900 hover:text-black font-semibold transition-colors uppercase block"
                  >
                    Apply for 2026
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Quadrant: Social Ecosystem (Matches horizontal placement in reference photo) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12 pt-2 lg:pt-0">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-[13px] font-mono tracking-widest uppercase font-bold text-neutral-900 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-[13px] font-mono tracking-widest uppercase font-bold text-neutral-900 hover:text-black transition-colors"
            >
              X
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-[13px] font-mono tracking-widest uppercase font-bold text-neutral-900 hover:text-black transition-colors"
            >
              Instagram
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-[13px] font-mono tracking-widest uppercase font-bold text-neutral-900 hover:text-black transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* 3. Middle Legal / Rights Row (Aligned exactly like reference photo) */}
        <div className="mt-20 sm:mt-28 md:mt-36 lg:mt-40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] sm:text-xs font-mono text-neutral-600 uppercase tracking-wider">
          <div>
            &copy; {new Date().getFullYear()} ENTS &middot; RWANDA CODING ACADEMY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <Link href="/about" className="hover:text-black transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/about" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="/leaderboard" className="hover:text-black transition-colors">
              Risk Disclosure
            </Link>
          </div>
        </div>
      </div>

      {/* 4. THE MONUMENTAL "ENTS" BIG TEXT AT THE BOTTOM (FLUSH WITH BASELINE) */}
      <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none mt-2 sm:mt-4">
        {/* Interactive Floating Satellite (Layered over the letters like reference photo) */}
        <div
          className="absolute top-[32%] sm:top-[28%] left-[32%] sm:left-[35%] z-20 animate-float-slow hidden sm:block drop-shadow-2xl"
          style={{ width: '84px', height: '54px' }}
        >
          <svg
            viewBox="0 0 120 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Left Solar Array */}
            <rect x="2" y="16" width="38" height="42" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <rect x="5" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="22" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="5" y="38" width="15" height="17" fill="#1e3a8a" />
            <rect x="22" y="38" width="15" height="17" fill="#1e3a8a" />
            <line x1="2" y1="36.5" x2="40" y2="36.5" stroke="#60a5fa" strokeWidth="0.75" />
            <line x1="20" y1="16" x2="20" y2="58" stroke="#60a5fa" strokeWidth="0.75" />
            {/* Left Boom Arm */}
            <line x1="40" y1="37" x2="48" y2="37" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

            {/* Satellite Core Body (Gold Foil Multi-Layer Insulation) */}
            <rect x="48" y="18" width="26" height="38" rx="3" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
            <rect x="50" y="20" width="22" height="34" rx="2" fill="#d97706" />
            {/* Optical Sensor Aperture */}
            <circle cx="61" cy="37" r="7" fill="#09090b" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="61" cy="37" r="3.5" fill="#38bdf8" />
            {/* High-Gain Antenna Dish */}
            <path d="M57 18 L61 10 L65 18 Z" fill="#94a3b8" />
            <line x1="61" y1="10" x2="61" y2="5" stroke="#f8fafc" strokeWidth="1.5" />
            <circle cx="61" cy="4" r="1.5" fill="#ef4444" />

            {/* Right Boom Arm */}
            <line x1="74" y1="37" x2="82" y2="37" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right Solar Array */}
            <rect x="80" y="16" width="38" height="42" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <rect x="83" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="100" y="19" width="15" height="17" fill="#1e3a8a" />
            <rect x="83" y="38" width="15" height="17" fill="#1e3a8a" />
            <rect x="100" y="38" width="15" height="17" fill="#1e3a8a" />
            <line x1="80" y1="36.5" x2="118" y2="36.5" stroke="#60a5fa" strokeWidth="0.75" />
            <line x1="98" y1="16" x2="98" y2="58" stroke="#60a5fa" strokeWidth="0.75" />
          </svg>
        </div>

        {/* Floating Asteroid / Space Rock */}
        <div
          className="absolute top-[22%] sm:top-[20%] right-[18%] sm:right-[22%] z-20 animate-float-reverse hidden sm:block drop-shadow-2xl"
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

        {/* Foreground Mountain Silhouette (Bottom-Left Corner) */}
        <div className="absolute bottom-0 left-0 z-20 pointer-events-none w-36 sm:w-56 md:w-72 lg:w-96 h-auto">
          <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path
              d="M0 240 L0 80 L35 120 L70 100 L110 160 L160 140 L210 200 L260 190 L320 240 Z"
              fill="#18141f"
            />
            <path
              d="M0 130 L45 155 L90 145 L140 185 L180 170 L240 220 L300 240 L0 240 Z"
              fill="#0f0c14"
            />
            {/* Rim specular highlight on cliff edge */}
            <path
              d="M0 80 L35 120 L70 100 L110 160 L160 140 L210 200 L260 190 L320 240"
              stroke="#584d6b"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Foreground Mountain Silhouette (Bottom-Right Corner) */}
        <div className="absolute bottom-0 right-0 z-20 pointer-events-none w-40 sm:w-60 md:w-80 lg:w-[420px] h-auto">
          <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path
              d="M360 260 L360 90 L320 135 L280 115 L230 175 L180 155 L130 215 L70 205 L0 260 Z"
              fill="#18141f"
            />
            <path
              d="M360 145 L315 170 L270 160 L215 205 L170 190 L110 240 L50 260 L360 260 Z"
              fill="#0f0c14"
            />
            {/* Rim specular highlight on cliff edge */}
            <path
              d="M360 90 L320 135 L280 115 L230 175 L180 155 L130 215 L70 205 L0 260"
              stroke="#584d6b"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Massive full-bleed "ENTS" typography spanning edge-to-edge */}
        <div className="w-full flex justify-center items-end relative z-10">
          <h2
            className="text-[34vw] sm:text-[32vw] md:text-[30vw] lg:text-[28vw] font-black tracking-[-0.04em] text-neutral-950 leading-[0.72] translate-y-[3%] sm:translate-y-[4%] whitespace-nowrap block select-none"
            style={{
              fontFamily: "var(--font-heading), 'Power Grotesk', -apple-system, sans-serif",
            }}
          >
            ENTS
          </h2>
        </div>
      </div>
    </footer>
  );
}
