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

  // Do not render public header on admin CMS routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <div ref={headerRef} className="w-full max-w-fit flex flex-col items-center">
        {/* Floating Segmented Capsule Bar */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] flex items-center divide-x divide-neutral-200 transition-all select-none">
          {/* Segment 1: Logo + Brand */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 hover:opacity-85 transition-opacity focus:outline-none"
            aria-label="ENTS Home"
          >
            <div className="w-8 h-8 rounded-xl bg-neutral-100/90 border border-neutral-200 flex items-center justify-center p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
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

          {/* Segment 2: Smooth Deliberate Menu Trigger (= to X) */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-5 sm:px-6 py-3 flex items-center justify-center text-neutral-800 hover:text-neutral-950 hover:bg-neutral-50 transition-colors focus:outline-none cursor-pointer group"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="relative w-4 h-3 flex flex-col justify-between items-center">
              <span
                className={`h-0.5 bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  menuOpen
                    ? 'w-4 translate-y-1.25 rotate-45'
                    : 'w-4 translate-y-0 rotate-0'
                }`}
              />
              <span
                className={`h-0.5 bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  menuOpen
                    ? 'w-4 -translate-y-1.25 -rotate-45'
                    : 'w-4 translate-y-0 rotate-0'
                }`}
              />
            </div>
          </button>

          {/* Segment 3: Get Started Button */}
          <div className="px-3 sm:px-3.5 py-2 flex items-center">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="btn-skeuo-dark inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
            >
              Get to Know ENTS
            </Link>
          </div>
        </div>

        {/* Dropdown Navigation Menu with Slower, Graceful Staggered Items */}
        {menuOpen && (
          <div className="pointer-events-auto mt-2.5 w-[calc(100vw-2rem)] max-w-xs sm:w-80 bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.06)] p-2.5 animate-menu-panel-slow select-none">
            <nav className="flex flex-col space-y-1">
              {siteConfig.navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 85 + 90}ms`,
                    }}
                    className={`animate-menu-item-slow group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:translate-x-1 ${
                      isActive
                        ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                        : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-numbers text-xs tracking-wider transition-colors ${
                          isActive
                            ? 'text-neutral-400'
                            : 'text-neutral-400 group-hover/item:text-neutral-900'
                        }`}
                      >
                        {`0${index + 1}`}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <svg
                          className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-250 text-neutral-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div
              style={{ animationDelay: `${siteConfig.navItems.length * 85 + 120}ms` }}
              className="animate-menu-item-slow mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between px-2.5 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-wider"
            >
              <span>Rwanda Coding Academy</span>
              <span className="font-numbers">EST. 2026</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
