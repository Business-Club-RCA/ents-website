'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { executiveTeam, clubMembers } from '@/data/team';
import { PageHero } from '@/components/layout/PageHero';
import {
  LinkedInIcon,
  XIcon,
  GlobeIcon,
  TargetIcon,
  CompassIcon,
} from '@/components/ui/Icons';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner */}
      <PageHero
        kicker="About The Society"
        title="Building Software, Not Just Discussing Business."
        description="ENTS was founded at Rwanda Coding Academy on a singular premise: world-class founders and quantitative analysts do not merely theorize — they build, experiment, and execute with technical conviction."
      />

      {/* 2. VISION & MISSION (High-End Architectural Design) */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-semibold">
              Strategic Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
              Vision &amp; Mission
            </h2>
            <p className="text-base text-neutral-600 mt-2">
              Guided by a dual charter of commercial venture incubation and institutional quantitative discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {/* The Mission Card */}
            <div className="card-hover bg-neutral-50/50 border border-neutral-200/90 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-neutral-900" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-mono">
                    <TargetIcon size={14} />
                    <span>01 · OUR MISSION</span>
                  </div>
                  <Badge variant="neutral">Purpose &amp; Execution</Badge>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-snug">
                    Transform student software engineers into high-leverage venture founders and disciplined quantitative traders.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    We bridge the gap between writing algorithms in the classroom and commanding capital in global markets. We believe software code without commercial discipline leaves immense leverage on the table.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-200/80 text-xs sm:text-sm text-neutral-700">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <div>
                      <strong className="text-neutral-900">Live Campus Ventures:</strong> Launch and iterate functional student software products with verified unit economics.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <div>
                      <strong className="text-neutral-900">Mathematical Risk Limits:</strong> Enforce non-negotiable 1% stop-loss guardrails through automated SIFS auditing.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <div>
                      <strong className="text-neutral-900">Practical Conviction:</strong> Cultivate builder autonomy through peer teardowns and empirical trading journals.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>EXECUTION CHARTER</span>
                <span className="font-semibold text-neutral-900">ACTIVE COHORTS 5, 6 &amp; 7</span>
              </div>
            </div>

            {/* The Vision Card */}
            <div className="card-hover bg-neutral-950 text-white border border-neutral-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-neutral-400" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-200 border border-white/15 text-xs font-mono">
                    <CompassIcon size={14} />
                    <span>02 · OUR VISION</span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Long-Term Horizon
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                    Establish Rwanda Coding Academy as Africa&apos;s benchmark student sandbox for technology entrepreneurship and algorithmic finance.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                    We envision an ecosystem where Nyabihu engineers build platforms that capture real continental market share and generate institutional-grade quantitative alpha before graduation.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Pan-African Scale:</strong> Export student-built fintech and B2B SaaS tools solving African commerce bottlenecks.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">World-Class Quant Operators:</strong> Graduate engineers who operate with the risk precision of elite trading firms.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Evergreen Student Endowment:</strong> Seed a self-sustaining student investment fund backed by verifiable performance.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>ESTABLISHED AT RCA</span>
                <span className="font-semibold text-white">NYABIHU · HORIZON 2030</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CORE PRINCIPLES */}
      <section className="border-b border-neutral-200 bg-neutral-50/40 py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-semibold">
              The RCA Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-2">
              Three Guiding Tenets
            </h2>
            <p className="text-base text-neutral-600 mt-2 leading-relaxed">
              Rooted in the unique technical environment of Rwanda Coding Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hover p-7 rounded-2xl border border-neutral-200/90 bg-white space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                TENET 01
              </div>
              <h3 className="font-bold text-neutral-900 text-xl">
                Code as Capital
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Software is the ultimate modern leverage. We transform student code into monetizable campus micro-services and automated trading algorithms.
              </p>
            </div>

            <div className="card-hover p-7 rounded-2xl border border-neutral-200/90 bg-white space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                TENET 02
              </div>
              <h3 className="font-bold text-neutral-900 text-xl">
                1% Risk Boundary
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Discipline over hype. We teach institutional statistical edge, emotional control, and mathematical guardrails across all trading operations.
              </p>
            </div>

            <div className="card-hover p-7 rounded-2xl border border-neutral-200/90 bg-white space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                TENET 03
              </div>
              <h3 className="font-bold text-neutral-900 text-xl">
                Peer Governance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                100% student-led. Senior RCA engineers mentor incoming cohorts, review venture pitch decks, and audit trading league performance weekly.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. EXECUTIVE COMMITTEE (Exact 4 Profiles: Mentor, President, Vice President, Secretary) */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-neutral-200 pb-6">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-1 font-semibold">
                Governance &amp; Leadership
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Executive Committee
              </h2>
              <p className="mt-1 text-sm sm:text-base text-neutral-600">
                The 4 governing officers overseeing society curriculum, venture pipelines, and trading audits.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              COHORT 2026 - 2027
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {executiveTeam.map((member) => (
              <div
                key={member.id}
                className="card-hover bg-white border border-neutral-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group text-center"
              >
                <div className="flex flex-col items-center">
                  {/* Real Unsplash Round Profile Picture Display */}
                  <div className="relative mb-3.5">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-neutral-100 border-2 border-neutral-200/90 overflow-hidden shadow-md group-hover:border-neutral-900 group-hover:shadow-lg transition-all duration-300 ring-4 ring-neutral-50">
                      {member.avatarUrl ? (
                        <Image
                          src={member.avatarUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 128px, 144px"
                          className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xl text-neutral-900">
                          {member.initials}
                        </div>
                      )}
                    </div>

                    {/* Role Pill Badge Overlay */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-neutral-950 text-white shadow-sm border border-white/20">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="mt-1">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-black transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-mono text-neutral-500 mt-0.5">
                      {member.specialization}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed mt-3 text-center">
                    {member.bio}
                  </p>
                </div>

                {/* Real-World Branded Social & Portfolio Icons */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-center gap-3">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 active:scale-95 transition-transform cursor-pointer drop-shadow-sm"
                      aria-label={`${member.name} LinkedIn`}
                      title="LinkedIn"
                    >
                      <LinkedInIcon size={24} />
                    </a>
                  )}
                  {member.socials?.x && (
                    <a
                      href={member.socials.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 active:scale-95 transition-transform cursor-pointer drop-shadow-sm"
                      aria-label={`${member.name} X`}
                      title="X"
                    >
                      <XIcon size={24} />
                    </a>
                  )}
                  {member.socials?.portfolio && (
                    <a
                      href={member.socials.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 active:scale-95 transition-transform cursor-pointer drop-shadow-sm"
                      aria-label={`${member.name} Portfolio`}
                      title="Portfolio Website"
                    >
                      <GlobeIcon size={24} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. CLUB MEMBERS (25 Compact Micro-Profiles with Real Unsplash Photos & Brand Icons) */}
      <section className="py-20 sm:py-28 bg-neutral-50/40">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-neutral-200 pb-6">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-1 font-semibold">
                Active Society Roster
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Club Members ({clubMembers.length})
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Student engineers, financial analysts, and venture builders across RCA Cohorts 5, 6, and 7.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              ACADEMIC YEAR 2026 - 2027
            </div>
          </div>

          {/* Compact Responsive Micro-Grid: 5 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {clubMembers.map((member) => (
              <div
                key={member.id}
                className="card-hover bg-white border border-neutral-200/90 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Round Photo Thumbnail + Cohort Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-200/80 shrink-0 group-hover:border-neutral-900 transition-colors shadow-sm ring-2 ring-neutral-50">
                      {member.avatarUrl ? (
                        <Image
                          src={member.avatarUrl}
                          alt={member.name}
                          fill
                          sizes="48px"
                          className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xs text-neutral-900 rounded-full">
                          {member.initials}
                        </div>
                      )}
                    </div>

                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 bg-neutral-100/80 border border-neutral-200/60 px-2 py-0.5 rounded-full">
                      {member.classYear?.replace(' (', ' · ').replace(')', '') || 'RCA'}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate group-hover:text-black">
                    {member.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-mono text-neutral-500 truncate mt-0.5">
                    {member.role}
                  </p>
                </div>

                {/* Real-World Brand Social Links Row */}
                <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center gap-2">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-115 active:scale-95 transition-transform cursor-pointer"
                      aria-label={`${member.name} LinkedIn`}
                      title="LinkedIn"
                    >
                      <LinkedInIcon size={18} />
                    </a>
                  )}
                  {member.socials?.x && (
                    <a
                      href={member.socials.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-115 active:scale-95 transition-transform cursor-pointer"
                      aria-label={`${member.name} X`}
                      title="X"
                    >
                      <XIcon size={18} />
                    </a>
                  )}
                  {member.socials?.portfolio && (
                    <a
                      href={member.socials.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-115 active:scale-95 transition-transform cursor-pointer"
                      aria-label={`${member.name} Portfolio`}
                      title="Portfolio"
                    >
                      <GlobeIcon size={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
