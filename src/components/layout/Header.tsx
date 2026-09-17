'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { MenuIcon, CloseIcon } from '@/components/ui/Icons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // On every page when at the top, header floats over the hero image
  const isDarkOverHero = !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkOverHero
          ? 'bg-transparent border-b border-transparent py-5'
          : 'bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ENTS Wordmark + Geometric Icon */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus:outline-none select-none"
          aria-label="ENTS Home"
        >
          <div
            className={`w-7 h-7 rounded-sm flex items-center justify-center transition-colors ${
              isDarkOverHero ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            <span className="font-black text-xs font-mono">E</span>
          </div>
          <span
            className={`font-black text-2xl tracking-tighter transition-colors ${
              isDarkOverHero ? 'text-white' : 'text-black'
            }`}
          >
            ENTS
          </span>
          <span
            className={`hidden sm:inline-block text-[10px] tracking-widest uppercase font-mono pl-2 border-l transition-colors ${
              isDarkOverHero
                ? 'text-neutral-400 border-white/20'
                : 'text-neutral-400 border-neutral-200'
            }`}
          >
            RCA
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors ${
                  isDarkOverHero
                    ? isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-300 hover:text-white'
                    : isActive
                    ? 'text-black font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                      isDarkOverHero ? 'bg-white' : 'bg-black'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          {isDarkOverHero ? (
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                href="/join"
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 transition-all shadow-sm"
              >
                Start for free
              </Link>
              <Link
                href="/projects"
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/15 transition-all shadow-sm"
              >
                Explore SIFS
              </Link>
            </div>
          ) : (
            <Button href="/join" size="sm" variant="primary" className="hidden sm:inline-flex">
              Join the Club
            </Button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 md:hidden focus:outline-none transition-colors ${
              isDarkOverHero
                ? 'text-white hover:bg-white/10'
                : 'text-black hover:bg-neutral-100'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150 text-black">
          <nav className="flex flex-col space-y-3 pt-2">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base py-2 px-2 transition-colors ${
                    isActive
                      ? 'font-semibold text-black bg-neutral-100'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-neutral-100">
              <div onClick={() => setMobileMenuOpen(false)}>
                <Button href="/join" size="md" variant="primary" className="w-full">
                  Join the Club
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
