'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface TestimonialCard {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  badgeBg: string;
  badgeIcon: React.ReactNode;
}

const TESTIMONIALS: TestimonialCard[] = [
  {
    id: 'aline',
    quote:
      '"From campus prototypes to live order routing 🚀, ENTS is a must-have society. I can\'t ❤️ imagine analyzing markets without SIFS!"',
    author: 'Aline Umutoni',
    role: 'VP & Lead Quantitative Trader',
    avatarUrl: '/testimonials/aline.jpg',
    badgeBg: 'bg-orange-500 text-white',
    badgeIcon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'david',
    quote:
      '"Strict 1% risk guardrails 🌐, automated backtesting, and top-notch 🎯 peer audits. ENTS has it all."',
    author: 'David Nshimiyimana',
    role: 'Treasury Lead at KuraPay',
    avatarUrl: '/testimonials/david.jpg',
    badgeBg: 'bg-indigo-600 text-white',
    badgeIcon: <span className="font-bold text-xs font-mono">S</span>,
  },
  {
    id: 'grace',
    quote:
      '"The weekly pitch teardowns and pro-forma forecasting ⚡ prepared our squad directly for institutional venture capital."',
    author: 'Grace Mukamana',
    role: 'Full-Stack Venture Engineer',
    avatarUrl: '/testimonials/grace.jpg',
    badgeBg: 'bg-emerald-600 text-white',
    badgeIcon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    id: 'kevine',
    quote:
      '"Trading simulated FX depth with real execution journals 📈 eliminated emotional bias from our algorithms entirely."',
    author: 'Kevine Ishimwe',
    role: 'Derivatives Analyst · Year 3',
    avatarUrl: '/testimonials/kevine.jpg',
    badgeBg: 'bg-purple-600 text-white',
    badgeIcon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: 'patrick',
    quote:
      '"Campus micro-enterprises backed by student software 🤝 proved that RCA engineers can monetize while in school."',
    author: 'Patrick Cyusa',
    role: 'Market Depth & Arbitrage Lead',
    avatarUrl: '/testimonials/patrick.jpg',
    badgeBg: 'bg-amber-500 text-white',
    badgeIcon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('up');

  // Automatic slide up and down interval: items slide and transition smoothly
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSlideDirection('up');
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setSlideDirection('up');
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setSlideDirection('down');
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Visible items window (shows 3 items, sliding gracefully)
  const visibleCards = [
    TESTIMONIALS[currentIndex % TESTIMONIALS.length],
    TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(currentIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="py-20 sm:py-28 bg-neutral-50/40 border-b border-neutral-200 relative overflow-hidden select-none">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Numbers in Power Grotesk & Narrative */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>03 · Member Validation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-neutral-900 leading-[1.06]">
              Trusted by Over <br className="hidden sm:inline" />
              <span className="font-number tabular-nums">15k+</span> Satisfied <br className="hidden sm:inline" />
              Builders
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed max-w-sm font-normal">
              ENTS has helped student founders and quantitative analysts across Rwanda Coding Academy turn raw code into validated ventures, disciplined trading strategies, and career-defining portfolios.
            </p>

            {/* Quick Metrics Strip in Power Grotesk Numbers */}
            <div className="pt-2 flex items-center gap-6 text-neutral-900 border-t border-neutral-200/80">
              <div>
                <div className="font-number text-2xl font-bold tracking-tight">45+</div>
                <div className="text-[11px] text-neutral-500 font-mono uppercase mt-0.5">Active Fellows</div>
              </div>
              <div className="w-px h-8 bg-neutral-200" />
              <div>
                <div className="font-number text-2xl font-bold tracking-tight">98.4%</div>
                <div className="text-[11px] text-neutral-500 font-mono uppercase mt-0.5">Risk Compliance</div>
              </div>
              <div className="w-px h-8 bg-neutral-200" />
              <div>
                <div className="font-number text-2xl font-bold tracking-tight">3</div>
                <div className="text-[11px] text-neutral-500 font-mono uppercase mt-0.5">RCA Cohorts</div>
              </div>
            </div>
          </div>

          {/* Middle Column: Large Feature Portrait Card with Bottom Overlay */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-md h-[470px] sm:h-[510px] lg:h-[540px] rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-neutral-200/80 group">
              {/* Feature Portrait Image with smooth zoom on hover */}
              <Image
                src="/testimonials/cedric.jpg"
                alt="Cedric Mugisha, ENTS President"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority={false}
              />

              {/* Bottom Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent flex flex-col justify-end p-6 sm:p-7 text-white select-none">
                <blockquote className="text-base sm:text-lg font-medium leading-snug mb-3 drop-shadow-sm text-white/95">
                  &ldquo;ENTS has completely transformed our engineering workflow into production ventures!&rdquo;
                </blockquote>
                <div>
                  <div className="font-bold text-sm sm:text-base text-white tracking-tight">
                    Cedric Mugisha
                  </div>
                  <div className="text-xs text-neutral-300 font-mono mt-0.5">
                    President at ENTS &middot; Founder at KuraPay
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Vertically Sliding Testimonial Cards (Slide Up/Down, Appear & Disappear) */}
          <div
            className="lg:col-span-4 relative h-[470px] sm:h-[510px] lg:h-[540px] flex flex-col justify-between"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Sliding Container with Top & Bottom Fade Masks (Disappear on Top/Bottom edges) */}
            <div className="relative w-full h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]">
              <div
                key={currentIndex}
                className="space-y-4 py-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  animation:
                    slideDirection === 'up'
                      ? 'testimonialCardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                      : 'testimonialCardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              >
                {visibleCards.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] card-hover flex flex-col justify-between space-y-3 transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {/* Quote with Emoji */}
                    <p className="text-xs sm:text-[13px] text-neutral-700 font-medium leading-relaxed">
                      {item.quote}
                    </p>

                    {/* 5 Orange Stars */}
                    <div className="flex items-center gap-1 text-orange-500 text-sm leading-none" aria-label="5 out of 5 stars">
                      {'★★★★★'}
                    </div>

                    {/* Author Row with Avatar + Info + Company Icon Badge */}
                    <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                          <Image
                            src={item.avatarUrl}
                            alt={item.author}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                            {item.author}
                          </div>
                          <div className="text-[11px] text-neutral-500 font-mono leading-tight mt-0.5">
                            {item.role}
                          </div>
                        </div>
                      </div>

                      {/* Brand Badge */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 ${item.badgeBg}`}
                      >
                        {item.badgeIcon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle Controls at Bottom: Up/Down Slide Arrows & Active Indicators */}
            <div className="pt-2 flex items-center justify-between text-neutral-500 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSlideDirection(i > currentIndex ? 'up' : 'down');
                      setCurrentIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'w-6 bg-neutral-900' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 flex items-center justify-center transition-all cursor-pointer shadow-sm text-neutral-700"
                  aria-label="Previous testimony (slide down)"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 flex items-center justify-center transition-all cursor-pointer shadow-sm text-neutral-700"
                  aria-label="Next testimony (slide up)"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
