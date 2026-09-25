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
        <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5">
          {/* Institution Kicker Badge / Announcement Banner */}
          {announcement ? (
            <Link
              href={`/updates/${slugify(announcement.title) || announcement.id}`}
              className="animate-hero-badge group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border border-white/20 hover:border-white/40 text-xs font-mono text-neutral-200 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.5)] max-w-full"
            >
              {/* Pure Monochrome Radar Beacon */}
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 shrink-0">
                Announcement
              </span>
              <span className="truncate max-w-[200px] sm:max-w-md font-medium text-white/90 group-hover:text-white">
                {announcement.title}
              </span>
              <ArrowRight size={13} className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          ) : (
            <div className="animate-hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span>SIFS LEAGUE 2026</span>
            </div>
          )}

          {/* Bold Headline with Kinetic Word Roller Animation */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.04]">
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

          {/* Featured Announcement Highlight Card (Innovative Monochrome Chassis) */}
          {announcement && (
            <div className="animate-hero-cta mt-6 sm:mt-7 pt-4 border-t border-white/10 max-w-xl">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0e12]/85 backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.7)] group relative overflow-hidden">
                {/* Subtle Top Edge Specular Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider uppercase bg-white/10 text-white border border-white/20">
                      Featured Announcement
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">{announcement.date}</span>
                </div>
                <Link href={`/updates/${slugify(announcement.title) || announcement.id}`}>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-neutral-200 transition-colors leading-snug mb-1.5 line-clamp-1">
                    {announcement.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300/90 line-clamp-2 leading-relaxed font-normal">
                    {announcement.excerpt}
                  </p>
                </Link>
                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 text-[11px]">By {announcement.author}</span>
                  <Link
                    href={`/updates/${slugify(announcement.title) || announcement.id}`}
                    className="btn-skeuo-light px-3.5 py-1.5 rounded-lg text-xs font-bold text-neutral-900 inline-flex items-center gap-1.5 hover:bg-white transition-all shadow-xs"
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
