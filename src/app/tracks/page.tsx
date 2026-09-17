'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Briefcase, TrendingUp } from '@/components/ui/Icons';
import { tracksData } from '@/data/tracks';
import { PageHero } from '@/components/layout/PageHero';

export default function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'business-handlers' | 'traders'>('all');

  const businessTrack = tracksData.find((t) => t.id === 'business-handlers')!;
  const tradersTrack = tracksData.find((t) => t.id === 'traders')!;

  return (
    <div className="flex flex-col">
      {/* Hero Banner with Cinematic Image */}
      <PageHero
        kicker="Curriculum & Operating Cadence"
        title="Two Disciplines. One Shared Rigor."
        description="Whether engineering commercial business models or executing statistical paper trades, ENTS provides a structured framework for measurable outcomes."
      />

      {/* Track Filter Toggle */}
      <div className="border-b border-neutral-200 bg-white sticky top-20 z-30 py-3.5 backdrop-blur-md bg-white/95">
        <Container size="wide">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200 text-xs font-mono">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTrack === 'all'
                    ? 'bg-neutral-900 text-white font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                All Tracks
              </button>
              <button
                onClick={() => setSelectedTrack('business-handlers')}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTrack === 'business-handlers'
                    ? 'bg-neutral-900 text-white font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Business Handlers
              </button>
              <button
                onClick={() => setSelectedTrack('traders')}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTrack === 'traders'
                    ? 'bg-neutral-900 text-white font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Traders
              </button>
            </div>

            <Link
              href="/join"
              className="text-xs font-mono font-bold text-neutral-900 hover:underline underline-offset-4 hidden sm:inline-flex items-center gap-1"
            >
              <span>Apply for Cohort 2026</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </div>

      {/* Track 1: Business Handlers */}
      {(selectedTrack === 'all' || selectedTrack === 'business-handlers') && (
        <section id="business-handlers" className="border-b border-neutral-200 py-16 sm:py-24 bg-white scroll-mt-24">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-neutral-900 text-white rounded-xl shadow-sm">
                    <Briefcase size={22} />
                  </div>
                  <Badge variant="dark">{businessTrack.shortTag}</Badge>
                </div>

                <h2 className="font-bold text-3xl sm:text-4xl tracking-tight text-neutral-900">
                  {businessTrack.title}
                </h2>

                <p className="text-base text-neutral-600 leading-relaxed">
                  Focuses on commercial incubation. We turn software code into viable products with clear unit economics, user retention, and monetization structures.
                </p>

                <div className="border-t border-neutral-100 pt-5 space-y-2.5">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-semibold">
                    Tools &amp; Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {businessTrack.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-mono bg-neutral-100 border border-neutral-200/80 px-2.5 py-1 rounded-md text-neutral-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button href="/join?track=business-handlers" variant="primary" size="md" className="w-full rounded-xl">
                    Apply for Business Handlers
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Weekly Operating Stages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {businessTrack.weeklyCadence.map((cadence, idx) => (
                    <div
                      key={cadence.phase}
                      className="card-hover p-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-2">
                          STAGE 0{idx + 1}
                        </div>
                        <h4 className="font-bold text-neutral-900 text-lg mb-2">
                          {cadence.phase}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {cadence.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Track 2: Traders */}
      {(selectedTrack === 'all' || selectedTrack === 'traders') && (
        <section id="traders" className="border-b border-neutral-200 py-16 sm:py-24 bg-neutral-50/30 scroll-mt-24">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-neutral-900 text-white rounded-xl shadow-sm">
                    <TrendingUp size={22} />
                  </div>
                  <Badge variant="dark">{tradersTrack.shortTag}</Badge>
                </div>

                <h2 className="font-bold text-3xl sm:text-4xl tracking-tight text-neutral-900">
                  {tradersTrack.title}
                </h2>

                <p className="text-base text-neutral-600 leading-relaxed">
                  Focuses on quantitative market discipline. We simulate real FX, commodities, and index liquidity with mathematical risk boundaries and execution tracking.
                </p>

                <div className="border-t border-neutral-100 pt-5 space-y-2.5">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-semibold">
                    Tools &amp; Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tradersTrack.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-mono bg-neutral-100 border border-neutral-200/80 px-2.5 py-1 rounded-md text-neutral-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button href="/join?track=traders" variant="primary" size="md" className="w-full rounded-xl">
                    Apply for Quantitative Traders
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Weekly Operating Stages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tradersTrack.weeklyCadence.map((cadence, idx) => (
                    <div
                      key={cadence.phase}
                      className="card-hover p-6 rounded-2xl border border-neutral-200/90 bg-white flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-2">
                          STAGE 0{idx + 1}
                        </div>
                        <h4 className="font-bold text-neutral-900 text-lg mb-2">
                          {cadence.phase}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {cadence.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
