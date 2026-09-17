import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Briefcase, TrendingUp } from '@/components/ui/Icons';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { FlagshipSimulator } from '@/components/sections/FlagshipSimulator';
import { HeroVisual } from '@/components/sections/HeroVisual';
import { tracksData } from '@/data/tracks';

export default function HomePage() {
  const businessTrack = tracksData.find((t) => t.id === 'business-handlers') || tracksData[0];
  const tradersTrack = tracksData.find((t) => t.id === 'traders') || tracksData[1];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <HeroVisual />

      {/* 2. WHO WE ARE: 3 Punchy Architecture Columns */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-white">
        <Container size="wide">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-2.5">
              01 / The Society Thesis
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
              Where world-class code meets capital discipline.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              At Rwanda Coding Academy, writing software is only half the equation. ENTS bridges technical engineering with commercial unit economics and quantitative risk control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Column 1 */}
            <div className="card-hover bg-neutral-50/50 border border-neutral-200/90 rounded-2xl p-7 flex flex-col justify-between">
              <div>
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
              <div className="mt-6 pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                <span>Production Ventures</span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="card-hover bg-neutral-50/50 border border-neutral-200/90 rounded-2xl p-7 flex flex-col justify-between">
              <div>
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
              <div className="mt-6 pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                <span>Quantitative Rigor</span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="card-hover bg-neutral-50/50 border border-neutral-200/90 rounded-2xl p-7 flex flex-col justify-between">
              <div>
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
              <div className="mt-6 pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                <span>Nyabihu · Est. 2026</span>
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
                02 / Specialization
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Business Handlers */}
            <div className="card-hover bg-white border border-neutral-200/90 rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
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

                <div className="space-y-2.5 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Lean Canvas Validation &amp; Investor Pitch Decks</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Campus Micro-Enterprises &amp; Mobile Money Logistics</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>12-Month Pro-Forma Cash Flow Forecasting</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">MEETS MON &amp; WED</span>
                <Link
                  href="/tracks#business-handlers"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:underline underline-offset-4"
                >
                  <span>Track Details</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Card 2: Traders */}
            <div className="card-hover bg-white border border-neutral-200/90 rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
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

                <div className="space-y-2.5 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Market Structure, Liquidity Sweeps &amp; Order Blocks</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Strict 1% Risk Guardrails &amp; Execution Journals</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <span>Weekly Simulated SIFS League Battles</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">MEETS TUE &amp; FRI</span>
                <Link
                  href="/tracks#traders"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:underline underline-offset-4"
                >
                  <span>Track Details</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. WHAT WE'RE BUILDING: Flagship SIFS Spotlight */}
      <FlagshipSimulator />

      {/* 5. STATS STRIP: Big Shoulders numbers, tactile cards */}
      <StatsStrip />

      {/* 6. FINAL CTA BAND: Clean high-contrast typography */}
      <section className="bg-neutral-950 text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-neutral-900/40 via-transparent to-transparent pointer-events-none" />
        <Container size="wide" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Applications Open · Cohorts 5, 6 &amp; 7</span>
            </div>

            <h2 className="font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.04]">
              Ready to build ventures and master markets?
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal">
              Join the society of founders, operators, and quantitative analysts at Rwanda Coding Academy. Rolling admissions reviewed weekly.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                href="/join"
                variant="outline"
                size="lg"
                className="bg-white text-black hover:bg-neutral-100 border-white font-bold rounded-full px-8"
              >
                <span>Apply to Join ENTS</span>
                <ArrowRight size={18} />
              </Button>
              <Button
                href="/about"
                variant="ghost"
                size="lg"
                className="text-white hover:bg-neutral-900 border border-neutral-800 rounded-full px-8"
              >
                Read Our Story
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
