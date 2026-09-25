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

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0e0e11] text-white select-none">
      {/* 1. Clean Atmospheric Background Image */}
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

        {/* Top Vignette for Nav Contrast */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0e0e11]/80 via-[#0e0e11]/40 to-transparent pointer-events-none" />

        {/* Bottom Deep Vignette for Text & Button Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/70 to-transparent pointer-events-none" />

        {/* Subtle overall depth vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0e0e11]/10 to-[#0e0e11]/30 pointer-events-none" />
      </div>

      {/* Spacer for Top Floating Navigation */}
      <div className="relative z-10 pt-28 sm:pt-32" />

      {/* 2. Hero Content with Staged Animations */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className={`grid grid-cols-1 ${announcement ? 'lg:grid-cols-12 gap-8 lg:gap-12 items-center' : 'max-w-2xl lg:max-w-3xl'}`}>
          {/* Main Hero Column */}
          <div className={`${announcement ? 'lg:col-span-7 xl:col-span-7' : ''} space-y-4 sm:space-y-5`}>
            {/* Clean Institutional Badge */}
            <div className="animate-hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span className="tracking-wider">RWANDA CODING ACADEMY &middot; SIFS LEAGUE</span>
            </div>

            {/* Bold Headline with Kinetic Word Roller Animation */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-bold tracking-tight text-white leading-[1.04]">
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

            {/* Subtitle with Blur-Slide Entrance */}
            <p className="animate-hero-desc text-base sm:text-lg md:text-xl text-neutral-200/95 max-w-xl leading-relaxed font-normal">
              A focused society for student builders and quantitative analysts at Rwanda Coding
              Academy to incubate software ventures, master global markets, and get things done.
            </p>

            {/* Dual Pill CTA Buttons with Floating Stagger */}
            <div className="animate-hero-cta pt-2 flex flex-wrap items-center gap-3.5">
              {/* Tactile Skeuomorphic Button 1: Frosted Glass Key */}
              <Link
                href="/about"
                className="btn-skeuo-glass inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
              >
                <span>Get To Know ENTS</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>

              {/* Tactile Skeuomorphic Button 2: Obsidian Key */}
              <Link
                href="/projects"
                className="btn-skeuo-dark inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer border-neutral-700/80"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* ONE Dedicated Announcement Card (Easily Visible, Innovative & Monochrome) */}
          {announcement && (
            <div className="lg:col-span-5 xl:col-span-5 mt-6 lg:mt-0 w-full animate-hero-cta">
              <div className="relative group rounded-3xl p-6 sm:p-7 bg-[#0b0b0e]/85 backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-[0_16px_50px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Top Edge Specular Reflection */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* Card Header: Live Beacon + Monochrome Badge + Date */}
                <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono tracking-widest uppercase bg-white/10 text-white border border-white/20">
                      Official Announcement
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {announcement.date}
                  </span>
                </div>

                {/* Card Body: Headline & Excerpt */}
                <Link
                  href={`/updates/${slugify(announcement.title) || announcement.id}`}
                  className="block group/link"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover/link:text-neutral-200 transition-colors leading-snug mb-2 line-clamp-2">
                    {announcement.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300/90 line-clamp-3 leading-relaxed font-normal mb-5">
                    {announcement.excerpt}
                  </p>
                </Link>

                {/* Card Machined Footer: Author & Read Details Action */}
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 text-[11px] truncate max-w-[170px]">
                    By {announcement.author}
                  </span>
                  <Link
                    href={`/updates/${slugify(announcement.title) || announcement.id}`}
                    className="btn-skeuo-light px-4 py-2 rounded-xl text-xs font-bold text-neutral-900 inline-flex items-center gap-2 hover:bg-white transition-all shadow-[0_4px_16px_rgba(255,255,255,0.12)] shrink-0"
                  >
                    <span>Read Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
