'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Icons';

export function HeroVisual() {
  const [imageMode, setImageMode] = useState<'color' | 'bw'>('color');

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white select-none">
      {/* 1. Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageMode === 'color' ? '/hero-computer-color.jpg' : '/hero-computer-bw.jpg'}
          alt="Retro computer in hillside landscape representing ENTS at Rwanda Coding Academy"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center transition-all duration-700"
        />

        {/* Top Vignette for Nav Contrast */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom Deep Vignette for Text & Button Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none" />

        {/* Subtle overall film grain / vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/40 pointer-events-none" />
      </div>

      {/* Spacer for Top Floating Navigation */}
      <div className="relative z-10 pt-28 sm:pt-32" />

      {/* 2. Hero Content (Bottom-Left Aligned exactly like the reference) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Bottom Left Column */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            {/* Institution Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>ENTS · Rwanda Coding Academy</span>
            </div>

            {/* Massive Bold Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.04]">
              Make ideas move.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-200/90 max-w-xl leading-relaxed font-normal">
              A focused society for student builders and quantitative analysts at Rwanda Coding
              Academy to incubate software ventures, master global markets, and get things done.
            </p>

            {/* Two Pill CTA Buttons */}
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

          {/* Bottom Right Column: Trusted / Ecosystem Strip */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end pt-6 lg:pt-0">
            <div className="space-y-2 text-left lg:text-right">
              <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                Forged at RCA
              </div>
              <div className="flex flex-wrap lg:justify-end items-center gap-4 text-xs sm:text-sm font-mono text-neutral-300">
                <span className="hover:text-white transition-colors">Intake 5</span>
                <span>·</span>
                <span className="hover:text-white transition-colors">Intake 6</span>
                <span>·</span>
                <span className="hover:text-white transition-colors">Intake 7</span>
                <span>·</span>
                <span className="hover:text-white transition-colors">SIFS Engine</span>
              </div>
            </div>

            {/* Subtle B&W / Color Switcher */}
            <div className="mt-6 inline-flex items-center p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setImageMode('color')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  imageMode === 'color'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Atmospheric
              </button>
              <button
                type="button"
                onClick={() => setImageMode('bw')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  imageMode === 'bw'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Monochrome
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

