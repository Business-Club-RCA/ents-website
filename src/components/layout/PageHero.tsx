import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface PageHeroProps {
  kicker?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHero({ kicker, title, description, children }: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[48vh] sm:min-h-[55vh] flex flex-col justify-end overflow-hidden bg-black text-white select-none border-b border-neutral-800">
      {/* 1. Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-computer-clean.jpg"
          alt="Atmospheric landscape banner"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center brightness-75 sm:brightness-85"
        />

        {/* Top Vignette for Nav Contrast */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom Deep Vignette for Text Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      </div>

      {/* 2. Hero Content with Smooth Staggered Animations */}
      <div className="relative z-10 w-full pt-32 pb-14 sm:pb-18">
        <Container size="wide">
          <div className="max-w-3xl space-y-4">
            {kicker && (
              <div className="animate-hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{kicker}</span>
              </div>
            )}

            <h1 className="animate-hero-word-1 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              {title}
            </h1>

            <p className="animate-hero-desc text-base sm:text-lg text-neutral-200/90 leading-relaxed font-normal max-w-2xl">
              {description}
            </p>

            {children && <div className="animate-hero-cta pt-3">{children}</div>}
          </div>
        </Container>
      </div>
    </section>
  );
}
