'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/site';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <div ref={headerRef} className="w-full max-w-fit flex flex-col items-center">
        {/* Floating Segmented Capsule Bar */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.12),0_1px_3px_rgb(0,0,0,0.06)] flex items-center divide-x divide-neutral-200 transition-all select-none">
          {/* Segment 1: Logo (Light Gray Background + Black Mark) + Brand */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 hover:opacity-85 transition-opacity focus:outline-none"
            aria-label="ENTS Home"
          >
            <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center p-1.5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
              <Image
                src="/ents.svg"
                alt="ENTS Logo"
                width={22}
                height={22}
                className="w-full h-full object-contain"
                priority
                unoptimized
              />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-neutral-900">
              ENTS
            </span>
          </Link>

          {/* Segment 2: Two-Line Menu Trigger (=) */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-5 sm:px-6 py-3 flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-50 transition-colors focus:outline-none cursor-pointer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="3" y1="13" x2="13" y2="3" />
              </svg>
            ) : (
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="1" y1="3" x2="17" y2="3" />
                <line x1="1" y1="9" x2="17" y2="9" />
              </svg>
            )}
          </button>

          {/* Segment 3: Get Started Button */}
          <div className="px-3 sm:px-3.5 py-2 flex items-center">
            <Link
              href="/join"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-xl bg-neutral-950 text-white text-xs sm:text-sm font-medium shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-neutral-800 transition-all active:scale-[0.98] cursor-pointer"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Dropdown Navigation Menu */}
        {menuOpen && (
          <div className="pointer-events-auto mt-2.5 w-72 sm:w-80 bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18)] p-2.5 animate-in fade-in slide-in-from-top-2 duration-150 select-none">
            <nav className="flex flex-col space-y-1">
              {siteConfig.navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                        : 'text-neutral-700 hover:text-black hover:bg-neutral-100/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between px-2.5 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              <span>Rwanda Coding Academy</span>
              <span>EST. 2026</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
