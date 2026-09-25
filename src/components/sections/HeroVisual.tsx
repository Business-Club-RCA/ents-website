'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Icons';
import { FeedItem } from '@/types';
import { slugify } from '@/lib/slug';

const ROTATING_WORDS = ['move.', 'scale.', 'build.', 'trade.', 'ship.'];
const ANNOUNCE_INTERVAL = 5000; // rotate every 5s

interface HeroVisualProps {
  announcements?: FeedItem[];
}

export function HeroVisual({ announcements = [] }: HeroVisualProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [announceIndex, setAnnounceIndex] = useState(0);
  const [announceVisible, setAnnounceVisible] = useState(true);

  // Word roller
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Announcement rotation with fade
  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setAnnounceVisible(false);
      setTimeout(() => {
        setAnnounceIndex((prev) => (prev + 1) % announcements.length);
        setAnnounceVisible(true);
      }, 400);
    }, ANNOUNCE_INTERVAL);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const current = announcements[announceIndex] ?? null;
  const currentSlug = current ? (slugify(current.title) || current.id) : null;

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col overflow-hidden bg-[#0e0e11] text-white select-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer-twilight-bg.jpg"
          alt="Atmospheric space landscape"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0e0e11]/80 via-[#0e0e11]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0e0e11]/90 via-[#0e0e11]/50 to-transparent pointer-events-none" />
      </div>

      {/* Spacer for top nav */}
      <div className="relative z-10 pt-28 sm:pt-32 flex-shrink-0" />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 w-full flex flex-col justify-end">

        {/* ── ANNOUNCEMENT PANEL — transparent, full-width, text-shadow for readability ── */}
        {current && currentSlug && (
          <div
            className="w-full border-y border-white/15 transition-opacity duration-400"
            style={{ opacity: announceVisible ? 1 : 0 }}
          >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">

                {/* Left: status + title + excerpt */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-white"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                    >
                      Official Announcement
                    </span>
                    {announcements.length > 1 && (
                      <span className="text-[10px] font-mono text-white/50 hidden sm:inline">
                        {announceIndex + 1} / {announcements.length}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-white/40 hidden sm:inline">· {current.date}</span>
                  </div>

                  <Link href={`/updates/${currentSlug}`} className="block group/title">
                    <h3
                      className="text-base sm:text-lg lg:text-xl font-bold text-white leading-snug line-clamp-1 group-hover/title:text-neutral-200 transition-colors"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.7)' }}
                    >
                      {current.title}
                    </h3>
                    <p
                      className="mt-0.5 text-sm text-neutral-200 line-clamp-1 leading-relaxed"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                    >
                      {current.excerpt}
                    </p>
                  </Link>
                </div>

                {/* Right: author + dot indicators + CTA */}
                <div className="flex items-center gap-4 shrink-0">
                  {/* Dot indicators when multiple announcements */}
                  {announcements.length > 1 && (
                    <div className="hidden sm:flex items-center gap-1.5">
                      {announcements.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setAnnounceVisible(false); setTimeout(() => { setAnnounceIndex(i); setAnnounceVisible(true); }, 200); }}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === announceIndex ? 'bg-white scale-125' : 'bg-white/35 hover:bg-white/60'}`}
                          aria-label={`Announcement ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  <span
                    className="hidden lg:block text-xs font-mono text-white/60"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                  >
                    By <span className="text-white font-semibold">{current.author}</span>
                  </span>
                  <Link
                    href={`/updates/${currentSlug}`}
                    className="group/cta inline-flex items-center gap-2 bg-white text-[#0e0e11] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-all shadow-lg shadow-black/50 whitespace-nowrap"
                  >
                    <span>Read Announcement</span>
                    <ArrowRight size={14} className="group-hover/cta:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Headline + Subtitle + CTAs */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 pt-7 sm:pt-9">
          <div className="max-w-3xl space-y-5 sm:space-y-6">

            {/* Bold Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.04]">
              <span className="block">
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="inline-block animate-hero-word-1">Make</span>
                </span>{' '}
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="inline-block animate-hero-word-2">ideas</span>
                </span>
              </span>
              <span className="block">
                <span className="inline-flex overflow-hidden align-bottom h-[1.14em] relative">
                  <span
                    key={wordIndex}
                    className="inline-block animate-word-roller text-white underline decoration-white/30 underline-offset-8"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-hero-desc text-base sm:text-lg md:text-xl text-neutral-200/90 max-w-xl leading-relaxed font-normal">
              A focused society for student builders and quantitative analysts at Rwanda Coding
              Academy to incubate software ventures, master global markets, and get things done.
            </p>

            {/* CTA Buttons */}
            <div className="animate-hero-cta flex flex-wrap items-center gap-3.5">
              <Link
                href="/about"
                className="btn-skeuo-glass inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
              >
                <span>Get To Know ENTS</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link
                href="/projects"
                className="btn-skeuo-dark inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer border-neutral-700/80"
              >
                See how it works
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
