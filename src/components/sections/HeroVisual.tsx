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
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0e0e11] text-white select-none">
      {/* 1. Atmospheric Background Image */}
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
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0e0e11]/80 via-[#0e0e11]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0e0e11]/10 to-[#0e0e11]/30 pointer-events-none" />
      </div>

      {/* Spacer for top nav */}
      <div className="relative z-10 pt-28 sm:pt-32" />

      {/* 2. Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 lg:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">

          {/* LEFT: Headline + Subtitle + CTAs */}
          <div className="flex-1 max-w-2xl space-y-5">
            {/* Institutional Kicker Badge */}
            <div className="animate-hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider uppercase">Rwanda Coding Academy · SIFS League</span>
            </div>

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
            <p className="animate-hero-desc text-base sm:text-lg md:text-xl text-neutral-200/95 max-w-xl leading-relaxed font-normal">
              A focused society for student builders and quantitative analysts at Rwanda Coding
              Academy to incubate software ventures, master global markets, and get things done.
            </p>

            {/* CTA Buttons */}
            <div className="animate-hero-cta pt-1 flex flex-wrap items-center gap-3.5">
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

          {/* RIGHT: Single Announcement Card */}
          {announcement && announcementSlug && (
            <div className="animate-hero-cta w-full lg:w-[400px] xl:w-[440px] shrink-0">
              <div className="relative group rounded-3xl overflow-hidden border border-white/20 hover:border-white/35 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#0a0a0d]/90 backdrop-blur-2xl">
                {/* Top specular chamfer */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

                <div className="p-6 sm:p-7">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      {/* Green live beacon */}
                      <span className="flex h-2.5 w-2.5 relative shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-300 bg-white/[0.08] border border-white/15 px-2.5 py-1 rounded-md">
                        Official Announcement
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                      {announcement.date}
                    </span>
                  </div>

                  {/* Card Body */}
                  <Link href={`/updates/${announcementSlug}`} className="block group/inner">
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover/inner:text-neutral-200 transition-colors">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed font-normal">
                      {announcement.excerpt}
                    </p>
                  </Link>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono">
                    <span className="text-neutral-500 truncate">
                      By <span className="text-neutral-300 font-semibold">{announcement.author}</span>
                    </span>
                    <Link
                      href={`/updates/${announcementSlug}`}
                      className="btn-skeuo-light shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-neutral-900 inline-flex items-center gap-2 hover:bg-white transition-all"
                    >
                      <span>Read Details</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
