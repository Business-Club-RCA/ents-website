import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Briefcase, TrendingUp } from '@/components/ui/Icons';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { FlagshipSimulator } from '@/components/sections/FlagshipSimulator';
import { HeroVisual } from '@/components/sections/HeroVisual';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { getTracks, getStats } from '@/lib/db';
import {
  PillarVenturesIllustration,
  PillarDisciplineIllustration,
  PillarNetworkIllustration,
  BusinessTrackIllustration,
  TradersTrackIllustration,
} from '@/components/ui/CardIllustrations';

export default async function HomePage() {
  const [tracks, stats] = await Promise.all([getTracks(), getStats()]);
  const businessTrack = tracks.find((t) => t.id === 'business-handlers') || tracks[0];
  const tradersTrack = tracks.find((t) => t.id === 'traders') || tracks[1];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <HeroVisual />

      {/* 2. WHO WE ARE: 3 Punchy Architecture Columns */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-white">
        <Container size="wide">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-2.5">
              01 · The Society Thesis
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
              Where world-class code meets capital discipline.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              At Rwanda Coding Academy, writing software is only half the equation. ENTS bridges technical engineering with commercial unit economics and quantitative risk control.
            </p>
          </div>

          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white shadow-sm grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 divide-neutral-200 md:divide-x">
            {/* Column 1 */}
            <div className="group relative overflow-hidden p-7 sm:p-8 lg:p-9 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors duration-200">
              <div className="relative z-10">
                <div className="text-xs font-mono uppercase text-neutral-400 font-semibold mb-3">
                  PILLAR 01
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Zero Theoretical Fluff
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  No 20-year-old case studies. We build live software tools, launch campus micro-ventures, and audit real cash flows.
                </p>
              </div>
              <div className="relative z-10 mt-8 pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                <span>Production Ventures</span>
              </div>
              {/* Background Illustration */}
              <div className="absolute -right-3 -bottom-3 pointer-events-none select-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                <PillarVenturesIllustration className="text-neutral-900/[0.14] group-hover:text-neutral-900/30 transition-colors duration-500" size={165} />
              </div>
            </div>

            {/* Column 2 */}
            <div className="group relative overflow-hidden p-7 sm:p-8 lg:p-9 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors duration-200">
              <div className="relative z-10">
                <div className="text-xs font-mono uppercase text-neutral-400 font-semibold mb-3">
                  PILLAR 02
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Engineered Discipline
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Every trade and business model is mathematically backed. We enforce strict 1% risk guardrails and algorithmic backtesting.
                </p>
              </div>
              <div className="relative z-10 mt-8 pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                <span>Quantitative Rigor</span>
              </div>
              {/* Background Illustration */}
              <div className="absolute -right-3 -bottom-3 pointer-events-none select-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                <PillarDisciplineIllustration className="text-neutral-900/[0.14] group-hover:text-neutral-900/30 transition-colors duration-500" size={165} />
              </div>
            </div>

            {/* Column 3 */}
            <div className="group relative overflow-hidden p-7 sm:p-8 lg:p-9 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors duration-200">
              <div className="relative z-10">
                <div className="text-xs font-mono uppercase text-neutral-400 font-semibold mb-3">
                  PILLAR 03
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  The RCA Advantage
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Leveraging Nyabihu&apos;s densest concentration of student software engineers to build financial infrastructure that scales.
                </p>
              </div>
              <div className="relative z-10 mt-8 pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                <span>Nyabihu · Est. 2026</span>
              </div>
              {/* Background Illustration */}
              <div className="absolute -right-3 -bottom-3 pointer-events-none select-none transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                <PillarNetworkIllustration className="text-neutral-900/[0.14] group-hover:text-neutral-900/30 transition-colors duration-500" size={165} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. TWO TRACKS: Elevated cards with concise deliverables */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-neutral-50/40">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                02 · Specialization
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
                Two Dedicated Disciplines
              </h2>
              <p className="text-base text-neutral-600 max-w-xl mt-2">
                Choose your track or cross-train. Both cohorts collaborate weekly on products and simulated liquidity.
              </p>
            </div>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:underline underline-offset-4"
            >
              <span>Explore curriculum</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white shadow-sm grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-neutral-200 lg:divide-x">
            {/* Card 1: Business Handlers */}
            <div className="group relative overflow-hidden p-8 sm:p-10 lg:p-12 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors duration-200">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-neutral-900 text-white rounded-xl shadow-sm">
                    <Briefcase size={22} />
                  </div>
                  <Badge variant="neutral">Ventures &amp; Operations</Badge>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                    {businessTrack.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Build and scale real ventures inside school. Validate product-market fit, model unit economics, and coordinate development with RCA engineers.
                  </p>
                </div>

                <div className="border border-neutral-200/90 rounded-xl overflow-hidden bg-white divide-y divide-neutral-200/80 text-xs font-mono text-neutral-700 shadow-xs">
                  <div className="px-3.5 py-2.5 flex items-center gap-2.5 bg-neutral-50/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Lean Canvas Validation &amp; Investor Pitch Decks</span>
                  </div>
                  <div className="px-3.5 py-2.5 flex items-center gap-2.5 bg-neutral-50/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Campus Micro-Enterprises &amp; Mobile Money Logistics</span>
                  </div>
                  <div className="px-3.5 py-2.5 flex items-center gap-2.5 bg-neutral-50/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>12-Month Pro-Forma Cash Flow Forecasting</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">MEETS MON &amp; WED</span>
                <Link
                  href="/tracks#business-handlers"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:underline underline-offset-4"
                >
                  <span>Track Details</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Background Illustration */}
              <div className="absolute right-0 bottom-0 pointer-events-none select-none transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                <BusinessTrackIllustration className="text-neutral-900/[0.13] group-hover:text-neutral-900/28 transition-colors duration-500" size={270} />
              </div>
            </div>

            {/* Card 2: Traders */}
            <div className="group relative overflow-hidden p-8 sm:p-10 lg:p-12 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors duration-200">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-neutral-900 text-white rounded-xl shadow-sm">
                    <TrendingUp size={22} />
                  </div>
                  <Badge variant="neutral">Markets &amp; Quant</Badge>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                    {tradersTrack.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Compete in the ENTS simulated trading league across foreign exchange, commodities, and global indices. Master risk-to-reward ratios and statistical backtesting.
                  </p>
                </div>

                <div className="border border-neutral-200/90 rounded-xl overflow-hidden bg-white divide-y divide-neutral-200/80 text-xs font-mono text-neutral-700 shadow-xs">
                  <div className="px-3.5 py-2.5 flex items-center gap-2.5 bg-neutral-50/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Market Structure, Liquidity Sweeps &amp; Order Blocks</span>
                  </div>
                  <div className="px-3.5 py-2.5 flex items-center gap-2.5 bg-neutral-50/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Strict 1% Risk Guardrails &amp; Execution Journals</span>
                  </div>
                  <div className="px-3.5 py-2.5 flex items-center gap-2.5 bg-neutral-50/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Weekly Simulated SIFS League Battles</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">MEETS TUE &amp; FRI</span>
                <Link
                  href="/tracks#traders"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:underline underline-offset-4"
                >
                  <span>Track Details</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Background Illustration */}
              <div className="absolute right-0 bottom-0 pointer-events-none select-none transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                <TradersTrackIllustration className="text-neutral-900/[0.13] group-hover:text-neutral-900/28 transition-colors duration-500" size={270} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. WHAT WE'RE BUILDING: Flagship SIFS Spotlight */}
      <FlagshipSimulator />

      {/* 5. STATS STRIP: Big Shoulders numbers, tactile cards */}
      <StatsStrip stats={stats} />

      {/* 6. TESTIMONIALS: Social proof matching reference card layout */}
      <TestimonialsSection />

      {/* 7. FINAL CTA BAND: Clean high-contrast typography */}
      <section className="bg-white text-neutral-900 py-24 sm:py-32 relative overflow-hidden border-t border-neutral-200">
        <Container size="wide" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Rwanda Coding Academy · Society Active</span>
            </div>

            <h2 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-neutral-900 leading-[1.04]">
              Ready to build ventures and master markets?
            </h2>

            <p className="text-lg sm:text-xl text-neutral-500 max-w-xl sm:max-w-2xl leading-relaxed font-normal">
              Discover the society of founders, operators, and quantitative analysts at Rwanda Coding Academy.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                href="/about"
                variant="primary"
                size="lg"
                className="btn-skeuo-dark font-bold rounded-xl px-5 sm:px-8"
              >
                <span>Get to Know ENTS</span>
                <ArrowRight size={18} />
              </Button>
              <Button
                href="/projects"
                variant="secondary"
                size="lg"
                className="btn-skeuo-light font-semibold rounded-xl px-5 sm:px-8"
              >
                Explore Ventures
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
