'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Icons';
import { FeedItem } from '@/types';
import { slugify } from '@/lib/slug';

const ROTATING_WORDS = ['move.', 'scale.', 'build.', 'trade.', 'ship.'];

interface HeroVisualProps {
  announcement?: FeedItem | null;
}

export function HeroVisual({ announcement }: HeroVisualProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const announcementSlug = announcement
    ? slugify(announcement.title) || announcement.id
    : null;

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
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0e0e11]/90 via-[#0e0e11]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0e0e11]/10 to-[#0e0e11]/35 pointer-events-none" />
      </div>

      {/* Spacer for top nav */}
      <div className="relative z-10 pt-28 sm:pt-32 flex-shrink-0" />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-3xl space-y-5 sm:space-y-6">

          {/* Kicker Badge */}
          <div className="animate-hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-xs font-mono text-white tracking-wider uppercase shadow-md backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>Rwanda Coding Academy · SIFS League 2026</span>
          </div>

          {/* ── ANNOUNCEMENT PANEL — above the headline ── */}
          {announcement && announcementSlug && (
            <div className="animate-hero-badge relative border-b border-white/[0.12] pb-5">
              {/* Left accent rule */}
              <div className="absolute left-0 top-0 bottom-5 w-px bg-gradient-to-b from-emerald-400/70 via-emerald-400/25 to-transparent" />

              <div className="pl-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
                {/* Left: status + title + excerpt */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-white/60">
                      Official Announcement
                    </span>
                    <span className="text-[10px] font-mono text-white/30 hidden sm:inline">·</span>
                    <span className="text-[10px] font-mono text-white/40 hidden sm:inline">{announcement.date}</span>
                  </div>

                  <Link href={`/updates/${announcementSlug}`} className="block group/title">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-1 group-hover/title:text-neutral-200 transition-colors">
                      {announcement.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-neutral-400 line-clamp-1 leading-relaxed font-normal">
                      {announcement.excerpt}
                    </p>
                  </Link>
                </div>

                {/* Right: author + CTA */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden md:block text-xs font-mono text-neutral-500">
                    By <span className="text-neutral-300 font-semibold">{announcement.author}</span>
                  </span>
                  <Link
                    href={`/updates/${announcementSlug}`}
                    className="group/cta inline-flex items-center gap-2 bg-white text-[#0e0e11] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-all shadow-lg shadow-black/30"
                  >
                    <span>Read Announcement</span>
                    <ArrowRight size={14} className="group-hover/cta:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}

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
    </section>
  );
}
