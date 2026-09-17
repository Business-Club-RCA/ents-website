import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { teamData } from '@/data/team';
import { PageHero } from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'About ENTS',
  description:
    'Discover the mission of ENTS at Rwanda Coding Academy: bridging high-level software engineering with commercial venture creation and quantitative trading discipline.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner with Cinematic Image */}
      <PageHero
        kicker="01 / About The Society"
        title="Building Software, Not Just Discussing Business."
        description="ENTS was founded at Rwanda Coding Academy on a singular premise: world-class founders and quantitative analysts do not merely theorize — they build, experiment, and execute with technical conviction."
      />

      {/* 3 Core Principles */}
      <section className="border-b border-neutral-200 bg-white py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
              Founding Thesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-2">
              The Rwanda Coding Academy Distinction
            </h2>
            <p className="text-base text-neutral-600 mt-2 leading-relaxed">
              Nyabihu trains elite software engineers and system programmers. ENTS harnesses this technical firepower into financial independence and scalable venture creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hover p-7 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                PRINCIPLE 01
              </div>
              <h3 className="font-bold text-neutral-900 text-xl">
                Code as Capital
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Software is the ultimate modern leverage. We transform student code into monetizable campus micro-services and automated trading algorithms.
              </p>
            </div>

            <div className="card-hover p-7 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                PRINCIPLE 02
              </div>
              <h3 className="font-bold text-neutral-900 text-xl">
                1% Risk Boundary
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Discipline over hype. We teach institutional statistical edge, emotional control, and mathematical guardrails across all trading operations.
              </p>
            </div>

            <div className="card-hover p-7 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                PRINCIPLE 03
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

      {/* Leadership Team Grid */}
      <section className="py-20 sm:py-28 bg-neutral-50/40">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-neutral-200 pb-6">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-1">
                02 / Governance
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Executive Committee
              </h2>
              <p className="mt-1 text-sm sm:text-base text-neutral-600">
                Elected student leaders managing curriculum, hackathons, and trading league audits.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              ACADEMIC YEAR 2026/2027
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="card-hover bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold font-mono text-sm flex items-center justify-center shadow-sm">
                      {member.initials}
                    </div>
                    <Badge variant="neutral">{member.track}</Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{member.name}</h3>
                    <div className="text-xs font-mono text-neutral-500 mt-0.5">{member.role}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{member.classYear}</span>
                  <span className="text-neutral-700 font-semibold">{member.specialization}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
