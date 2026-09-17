import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowUpRight } from '@/components/ui/Icons';
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
        description="ENTS was founded at Rwanda Coding Academy on a singular premise: the greatest founders and quantitative traders in the world do not merely talk about economics — they build tools, run experiments, and execute with technical conviction."
      />

      {/* Mission & Founding Story */}
      <section className="border-y border-neutral-200 bg-neutral-50/40 py-16 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                Founding Thesis
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black">
                The RCA Distinction
              </h3>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Rwanda Coding Academy in Nyabihu trains top-tier software engineers, embedded
                systems programmers, and cybersecurity specialists. ENTS harnesses this technical
                firepower to solve real commercial problems.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8 text-neutral-700 leading-relaxed text-base sm:text-lg">
              <p>
                In standard business clubs, students analyze Harvard Business School case studies
                written twenty years ago. At ENTS, we operate in the present tense. Our members write
                code, deploy micro-services on campus, calculate real cash flow, and study real-time
                tick feeds from Tokyo, London, and New York.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                <div className="border border-neutral-200 bg-white p-6">
                  <div className="text-xs font-mono uppercase text-neutral-400">Pillar 01</div>
                  <h4 className="font-bold text-black text-lg mt-1 mb-2">Venture Incubation</h4>
                  <p className="text-sm text-neutral-600">
                    Taking student software projects beyond hobby code into commercial products with
                    clear unit economics, user retention, and monetization structures.
                  </p>
                </div>

                <div className="border border-neutral-200 bg-white p-6">
                  <div className="text-xs font-mono uppercase text-neutral-400">Pillar 02</div>
                  <h4 className="font-bold text-black text-lg mt-1 mb-2">Quantitative Markets</h4>
                  <p className="text-sm text-neutral-600">
                    Instilling emotional discipline, statistical edge, and rigorous risk control
                    through simulated paper trading leagues and algorithmic backtesting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Team Grid */}
      <section className="py-20 sm:py-28 bg-white">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 border-b border-neutral-200 pb-6">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-2">
                02 / Student Leadership
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-black">
                Club Executive Committee
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
                Elected student leaders responsible for curriculum, hackathons, venture pitch sessions, and trading league audits.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-500">
              ACADEMIC YEAR 2026/2027
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <Card key={member.id} hoverable className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-black bg-neutral-100 flex items-center justify-center font-bold font-mono text-lg text-black select-none">
                      {member.initials}
                    </div>
                    <Badge variant={member.track === 'Traders' ? 'dark' : 'neutral'}>
                      {member.track}
                    </Badge>
                  </div>

                  <h4 className="text-xl font-bold tracking-tight text-black">{member.name}</h4>
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                    {member.role}
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-1">
                    {member.classYear} · {member.specialization}
                  </div>

                  <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{member.bio}</p>
                </div>

                {member.socials && (
                  <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center gap-4 text-xs font-mono">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-600 hover:text-black transition-colors"
                      >
                        <span>LinkedIn</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-600 hover:text-black transition-colors"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                    {member.socials.x && (
                      <a
                        href={member.socials.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-600 hover:text-black transition-colors"
                      >
                        <span>X</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* About CTA */}
      <section className="border-t border-neutral-200 bg-neutral-50/50 py-16">
        <Container size="wide" className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-black">
              Interested in collaborating or mentoring?
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              We welcome guest speakers, venture mentors, and financial markets professionals.
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="/join" variant="primary" size="md">
              <span>Apply as a Student</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
