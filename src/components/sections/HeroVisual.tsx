'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Icons';

export function HeroVisual() {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white select-none">
      {/* 1. Clean Atmospheric Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-computer-clean.jpg"
          alt="Vintage computer terminal in a grassy hillside landscape"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Top Vignette for Nav Contrast */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/35 to-transparent pointer-events-none" />

        {/* Bottom Deep Vignette for Text & Button Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

        {/* Subtle overall depth */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/30 pointer-events-none" />
      </div>

      {/* Spacer for Top Floating Navigation */}
      <div className="relative z-10 pt-28 sm:pt-32" />

      {/* 2. Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          {/* Institution Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>ENTS · Rwanda Coding Academy</span>
          </div>

          {/* Bold Punchy Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.04]">
            Make ideas move.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-200/95 max-w-xl leading-relaxed font-normal">
            A focused society for student builders and quantitative analysts at Rwanda Coding
            Academy to incubate software ventures, master global markets, and get things done.
          </p>

          {/* Dual Pill Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            {/* Pill Button 1: Frosted Glass / Translucent */}
            <Link
              href="/join"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25 transition-all duration-150 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Join the Club</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>

            {/* Pill Button 2: Dark Glass */}
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all duration-150 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
