'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Icons';

const ROTATING_WORDS = ['move.', 'scale.', 'build.', 'trade.', 'ship.'];

export function HeroVisual() {
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
          {/* Institution Kicker Badge */}
          <div className="animate-hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#121215]/60 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SIFS LEAGUE 2026</span>
          </div>

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
              href="/join"
              className="btn-skeuo-glass inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
            >
              <span>Join the Club</span>
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
      </div>
    </section>
  );
}
