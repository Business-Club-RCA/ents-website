'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Briefcase, TrendingUp } from '@/components/ui/Icons';
import { TrackInfo } from '@/types';
import { PageHero } from '@/components/layout/PageHero';
import {
  BusinessTrackIllustration,
  TradersTrackIllustration,
} from '@/components/ui/CardIllustrations';

export function TracksClient({ tracks }: { tracks: TrackInfo[] }) {
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'business-handlers' | 'traders'>('all');

  const businessTrack = tracks.find((t) => t.id === 'business-handlers') || tracks[0];
  const tradersTrack = tracks.find((t) => t.id === 'traders') || tracks[1];

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
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-200/50 rounded-xl border border-neutral-300/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] text-xs font-mono">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTrack === 'all' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
                }`}
              >
                All Tracks (Split View)
              </button>
              <button
                onClick={() => setSelectedTrack('business-handlers')}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTrack === 'business-handlers' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
                }`}
              >
                Business Handlers
              </button>
              <button
                onClick={() => setSelectedTrack('traders')}
                className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTrack === 'traders' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
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

      {/* MAIN TRACKS CONTENT CONTAINER WITH UNIFIED SEPARATING LINES */}
      <section className="py-12 sm:py-16 bg-neutral-50/30">
        <Container size="wide">
          {selectedTrack === 'all' ? (
            /* ALL TRACKS: Unified 2-column container separated by 1px hairline line */
            <div className="border border-neutral-200/90 rounded-3xl overflow-hidden bg-white shadow-sm grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-neutral-200 lg:divide-x">
              {/* Left Column: Business Handlers */}
              <div className="p-7 sm:p-9 lg:p-11 flex flex-col justify-between relative group hover:bg-neutral-50/30 transition-colors">
                <div className="space-y-8 relative z-10">
                  {/* Track Badge & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-neutral-900 text-white rounded-xl shadow-sm">
                        <Briefcase size={22} />
                      </div>
                      <div>
                        <Badge variant="neutral">{businessTrack.shortTag}</Badge>
                        <div className="text-[10px] font-mono text-neutral-400 mt-1">TRACK 01 · INCUBATION</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 font-medium">MEETS MON &amp; WED</span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-neutral-900 leading-snug">
                      {businessTrack.title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                      {businessTrack.longDescription}
                    </p>
                  </div>

                  {/* 1. Weekly Operating Cadence (Separated Grid Matrix) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                        Weekly Operating Stages
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400">4-STAGE CADENCE</span>
                    </div>

                    <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 sm:grid-cols-2 shadow-xs">
                      {businessTrack.weeklyCadence.map((cadence, idx) => (
                        <div
                          key={cadence.phase}
                          className="bg-white p-4 sm:p-5 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors group/stage"
                        >
                          <div>
                            <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-1 group-hover/stage:text-neutral-900 transition-colors">
                              STAGE 0{idx + 1}
                            </div>
                            <h5 className="font-bold text-neutral-900 text-sm mb-1">
                              {cadence.phase}
                            </h5>
                            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                              {cadence.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Key Deliverables (Separated Divided Rows) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                      Term Deliverables &amp; Outcomes
                    </h4>
                    <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white divide-y divide-neutral-200/80 text-xs font-mono shadow-xs">
                      {businessTrack.keyDeliverables.map((deliverable) => (
                        <div
                          key={deliverable}
                          className="px-4 py-3 flex items-start gap-3 bg-neutral-50/40 hover:bg-neutral-50/70 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                          <span className="text-neutral-700 leading-relaxed font-normal">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Core Competencies & Skills Gained (Separated Matrix) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                      Skills &amp; Methodologies
                    </h4>
                    <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 sm:grid-cols-2 shadow-xs">
                      {businessTrack.skillsGained.map((skill) => (
                        <div
                          key={skill}
                          className="bg-white px-3.5 py-2.5 flex items-center gap-2 text-xs font-mono text-neutral-800 hover:bg-neutral-50 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                          <span className="leading-snug">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Tools & Stack */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-semibold">
                      Tools &amp; Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {businessTrack.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs font-mono bg-neutral-100 border border-neutral-200/90 px-2.5 py-1 rounded-lg text-neutral-800 shadow-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-8 mt-8 border-t border-neutral-200/80 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <span className="text-xs font-mono text-neutral-500">
                    Incubating RCA Ventures · Est. 2026
                  </span>
                  <Button
                    href="/join?track=business-handlers"
                    variant="primary"
                    size="md"
                    className="btn-skeuo-dark font-bold rounded-xl px-6"
                  >
                    <span>Apply for Business Handlers</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>

                {/* Bespoke Background Illustration */}
                <div className="absolute right-0 bottom-0 pointer-events-none select-none transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                  <BusinessTrackIllustration className="text-neutral-900/[0.08] group-hover:text-neutral-900/[0.18] transition-colors duration-500" size={320} />
                </div>
              </div>

              {/* Right Column: Traders */}
              <div className="p-7 sm:p-9 lg:p-11 flex flex-col justify-between relative group hover:bg-neutral-50/30 transition-colors">
                <div className="space-y-8 relative z-10">
                  {/* Track Badge & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-neutral-900 text-white rounded-xl shadow-sm">
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <Badge variant="neutral">{tradersTrack.shortTag}</Badge>
                        <div className="text-[10px] font-mono text-neutral-400 mt-1">TRACK 02 · QUANTITATIVE</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 font-medium">MEETS TUE &amp; FRI</span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-neutral-900 leading-snug">
                      {tradersTrack.title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                      {tradersTrack.longDescription}
                    </p>
                  </div>

                  {/* 1. Weekly Operating Cadence (Separated Grid Matrix) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                        Weekly Operating Stages
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400">4-STAGE CADENCE</span>
                    </div>

                    <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 sm:grid-cols-2 shadow-xs">
                      {tradersTrack.weeklyCadence.map((cadence, idx) => (
                        <div
                          key={cadence.phase}
                          className="bg-white p-4 sm:p-5 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors group/stage"
                        >
                          <div>
                            <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-1 group-hover/stage:text-neutral-900 transition-colors">
                              STAGE 0{idx + 1}
                            </div>
                            <h5 className="font-bold text-neutral-900 text-sm mb-1">
                              {cadence.phase}
                            </h5>
                            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                              {cadence.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Key Deliverables (Separated Divided Rows) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                      Term Deliverables &amp; Outcomes
                    </h4>
                    <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white divide-y divide-neutral-200/80 text-xs font-mono shadow-xs">
                      {tradersTrack.keyDeliverables.map((deliverable) => (
                        <div
                          key={deliverable}
                          className="px-4 py-3 flex items-start gap-3 bg-neutral-50/40 hover:bg-neutral-50/70 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                          <span className="text-neutral-700 leading-relaxed font-normal">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Core Competencies & Skills Gained (Separated Matrix) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                      Skills &amp; Methodologies
                    </h4>
                    <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 sm:grid-cols-2 shadow-xs">
                      {tradersTrack.skillsGained.map((skill) => (
                        <div
                          key={skill}
                          className="bg-white px-3.5 py-2.5 flex items-center gap-2 text-xs font-mono text-neutral-800 hover:bg-neutral-50 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                          <span className="leading-snug">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Tools & Stack */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-semibold">
                      Tools &amp; Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {tradersTrack.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs font-mono bg-neutral-100 border border-neutral-200/90 px-2.5 py-1 rounded-lg text-neutral-800 shadow-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-8 mt-8 border-t border-neutral-200/80 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <span className="text-xs font-mono text-neutral-500">
                    SIFS League Simulated Execution
                  </span>
                  <Button
                    href="/join?track=traders"
                    variant="primary"
                    size="md"
                    className="btn-skeuo-dark font-bold rounded-xl px-6"
                  >
                    <span>Apply for Quantitative Traders</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>

                {/* Bespoke Background Illustration */}
                <div className="absolute right-0 bottom-0 pointer-events-none select-none transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                  <TradersTrackIllustration className="text-neutral-900/[0.08] group-hover:text-neutral-900/[0.18] transition-colors duration-500" size={320} />
                </div>
              </div>
            </div>
          ) : (
            /* SINGLE TRACK VIEW: Unified divided chassis with split lines */
            (() => {
              const activeTrack = selectedTrack === 'business-handlers' ? businessTrack : tradersTrack;
              const isBusiness = selectedTrack === 'business-handlers';

              return (
                <div className="border border-neutral-200/90 rounded-3xl overflow-hidden bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 divide-neutral-200 lg:divide-x">
                  {/* Left Column: Track Identity & Stack */}
                  <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 space-y-8 bg-white flex flex-col justify-between relative overflow-hidden group">
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-neutral-900 text-white rounded-xl shadow-sm">
                          {isBusiness ? <Briefcase size={24} /> : <TrendingUp size={24} />}
                        </div>
                        <div>
                          <Badge variant="neutral">{activeTrack.shortTag}</Badge>
                          <div className="text-[10px] font-mono text-neutral-400 mt-1">
                            {isBusiness ? 'TRACK 01 · INCUBATION' : 'TRACK 02 · QUANTITATIVE'}
                          </div>
                        </div>
                      </div>

                      <h2 className="font-bold text-3xl sm:text-4xl tracking-tight text-neutral-900 leading-snug">
                        {activeTrack.title}
                      </h2>

                      <p className="text-base text-neutral-600 leading-relaxed font-normal">
                        {activeTrack.longDescription}
                      </p>

                      <div className="border-t border-neutral-100 pt-5 space-y-3">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-semibold">
                          Target Candidates
                        </h4>
                        <p className="text-xs sm:text-sm font-mono text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                          {activeTrack.targetAudience}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-semibold">
                          Production Stack &amp; Software
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeTrack.toolsUsed.map((tool) => (
                            <span
                              key={tool}
                              className="text-xs font-mono bg-neutral-100 border border-neutral-200/80 px-2.5 py-1 rounded-lg text-neutral-800"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-neutral-100 relative z-10">
                      <Button
                        href={`/join?track=${activeTrack.id}`}
                        variant="primary"
                        size="lg"
                        className="btn-skeuo-dark font-bold w-full rounded-xl"
                      >
                        Apply for {activeTrack.title}
                      </Button>
                    </div>

                    {/* Illustration */}
                    <div className="absolute right-0 bottom-0 pointer-events-none select-none transition-all duration-700 ease-out group-hover:scale-105">
                      {isBusiness ? (
                        <BusinessTrackIllustration className="text-neutral-900/[0.08]" size={280} />
                      ) : (
                        <TradersTrackIllustration className="text-neutral-900/[0.08]" size={280} />
                      )}
                    </div>
                  </div>

                  {/* Right Column: Weekly Stages, Deliverables & Skills (Divided Matrices) */}
                  <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-8 bg-neutral-50/40">
                    {/* Operating Stages */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                          Weekly Operating Stages
                        </h3>
                        <span className="text-[11px] font-mono text-neutral-400 font-semibold">4-STAGE CADENCE</span>
                      </div>

                      <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 sm:grid-cols-2 shadow-xs">
                        {activeTrack.weeklyCadence.map((cadence, idx) => (
                          <div
                            key={cadence.phase}
                            className="bg-white p-5 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors group/item"
                          >
                            <div>
                              <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-1 group-hover/item:text-neutral-900 transition-colors">
                                STAGE 0{idx + 1}
                              </div>
                              <h4 className="font-bold text-neutral-900 text-sm mb-1">
                                {cadence.phase}
                              </h4>
                              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                                {cadence.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Deliverables */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                        Key Term Deliverables
                      </h3>
                      <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white divide-y divide-neutral-200/80 text-xs font-mono shadow-xs">
                        {activeTrack.keyDeliverables.map((deliverable) => (
                          <div
                            key={deliverable}
                            className="px-4 py-3 flex items-start gap-3 bg-white hover:bg-neutral-50/60 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                            <span className="text-neutral-700 leading-relaxed font-normal">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Gained */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                        Skills &amp; Competencies Acquired
                      </h3>
                      <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 sm:grid-cols-2 shadow-xs">
                        {activeTrack.skillsGained.map((skill) => (
                          <div
                            key={skill}
                            className="bg-white px-4 py-3 flex items-center gap-2 text-xs font-mono text-neutral-800 hover:bg-neutral-50 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </Container>
      </section>

      {/* 4-PILLAR CROSS-TRAINING STRIP WITH HAIRLINE SEPARATING LINES */}
      <section className="py-16 sm:py-20 border-t border-neutral-200 bg-white">
        <Container size="wide">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
              03 · Synergy &amp; Cross-Discipline
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 mt-1.5">
              How Both Cohorts Collaborate
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Students at Rwanda Coding Academy do not operate in silos. Business builders and quantitative traders interface every week.
            </p>
          </div>

          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-sm">
            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors">
              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-2">
                  SYNERGY 01
                </div>
                <h4 className="font-bold text-neutral-900 text-base mb-2">
                  Shared Terminal SIFS
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Traders stress-test the SIFS simulation engine, while Business Handlers model unit economics and monetization features.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>Simulated Order Books</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors">
              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-2">
                  SYNERGY 02
                </div>
                <h4 className="font-bold text-neutral-900 text-base mb-2">
                  Asymmetric Risk Rules
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  The strict 1% risk discipline from traders is applied by venture handlers to prevent cash burn on campus enterprise pilots.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>Zero Insolvency Rule</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors">
              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-2">
                  SYNERGY 03
                </div>
                <h4 className="font-bold text-neutral-900 text-base mb-2">
                  Unified Pitch &amp; Audit
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Bi-weekly joint auditor meetings where traders review venture cash projections and founders review trading journals.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>Cross-Track Audits</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors">
              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold mb-2">
                  SYNERGY 04
                </div>
                <h4 className="font-bold text-neutral-900 text-base mb-2">
                  ENTS Demo Day
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Culmination of the semester where software ventures pitch live and top traders present their algorithmic returns.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>Semester Finale</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

