import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
      {/* 1. HERO SECTION: Exact match to reference design */}
      <HeroVisual />

      {/* 2. WHO WE ARE */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-2">
                01 / Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-black">
                Who We Are
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="text-xl sm:text-2xl font-normal text-neutral-900 leading-relaxed">
                We are student engineers, founders, and market analysts based at{' '}
                <strong className="font-bold text-black">Rwanda Coding Academy</strong>. We believe
                that writing world-class code is only half the battle — true leverage comes from
                understanding commercial unit economics and financial liquidity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-neutral-200 text-sm leading-relaxed text-neutral-600">
                <div>
                  <h3 className="font-bold text-black text-base mb-2">Beyond Traditional Clubs</h3>
                  <p>
                    Rather than passively reading case studies, ENTS operates as an incubator and a
                    trading pit. We build software tools, validate campus commerce micro-services, and
                    stress-test quantitative trading algorithms.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-black text-base mb-2">Engineering-Driven Economics</h3>
                  <p>
                    Every venture model and trading strategy is backed by data. Our members leverage
                    TypeScript, Python, and modern APIs to automate backtests, manage order flow, and
                    evaluate financial risk with mathematical precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. TWO TRACKS: Side-by-side cards */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-neutral-50/40">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <SectionHeading
              kicker="02 / Specialization"
              title="Two Dedicated Tracks"
              description="Choose your discipline or cross-train. Both tracks meet weekly to collaborate on products, strategies, and portfolio management."
              className="mb-0"
            />
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline underline-offset-4"
            >
              <span>Explore full curriculum</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Business Handlers */}
            <Card hoverable className="flex flex-col justify-between p-8 sm:p-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-black text-white">
                    <Briefcase size={22} />
                  </div>
                  <Badge variant="neutral">Ventures &amp; Operations</Badge>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                    {businessTrack.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Pitch and run real ventures inside school. Validate product-market fit, model
                    unit economics, and coordinate development with RCA student engineers.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200 text-xs font-mono text-neutral-700">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span>Pitch Decks &amp; Lean Canvas Validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span>Campus Micro-Enterprises &amp; Payment Logistics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span>12-Month Pro-Forma Financial Forecasting</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">MEETS MON &amp; WED</span>
                <Link
                  href="/tracks#business-handlers"
                  className="inline-flex items-center gap-1 text-sm font-bold text-black hover:underline underline-offset-4"
                >
                  <span>Track Details</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Card>

            {/* Card 2: Traders */}
            <Card hoverable className="flex flex-col justify-between p-8 sm:p-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-black text-white">
                    <TrendingUp size={22} />
                  </div>
                  <Badge variant="neutral">Markets &amp; Quant</Badge>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                    {tradersTrack.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Compete in our paper trading league across foreign exchange, commodities, and
                    global indices. Master risk-to-reward ratios and algorithmic strategy backtesting.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200 text-xs font-mono text-neutral-700">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span>Technical Market Structure &amp; Order Blocks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span>Disciplined 1% Risk Guardrails &amp; Journaling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span>Weekly Trading League Leaderboard Battles</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">MEETS TUE &amp; FRI</span>
                <Link
                  href="/tracks#traders"
                  className="inline-flex items-center gap-1 text-sm font-bold text-black hover:underline underline-offset-4"
                >
                  <span>Track Details</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 4. WHAT WE'RE BUILDING: Flagship SIFS Spotlight */}
      <FlagshipSimulator />

      {/* 5. STATS STRIP: Big numbers, gray labels */}
      <StatsStrip />

      {/* 6. FINAL CTA BAND: Black background, white text */}
      <section className="bg-black text-white py-24 sm:py-32">
        <Container size="wide">
          <div className="max-w-4xl space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 bg-neutral-900 px-3 py-1 border border-neutral-800">
              Applications Open · Cohorts 5, 6 &amp; 7
            </span>
            <h2 className="font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-white leading-[1.05]">
              Ready to build ventures and trade the markets?
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
              Join the society of builders, operators, and quantitative analysts at Rwanda Coding
              Academy. Applications are reviewed on a rolling basis.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button
                href="/join"
                variant="outline"
                size="lg"
                className="bg-white text-black hover:bg-neutral-100 border-white font-bold"
              >
                <span>Apply to Join ENTS</span>
                <ArrowRight size={18} />
              </Button>
              <Button
                href="/about"
                variant="ghost"
                size="lg"
                className="text-white hover:bg-neutral-900 border border-neutral-800"
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
