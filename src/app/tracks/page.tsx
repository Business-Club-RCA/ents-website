import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Check, Briefcase, TrendingUp } from '@/components/ui/Icons';
import { tracksData } from '@/data/tracks';

export const metadata: Metadata = {
  title: 'Tracks & Curriculum',
  description:
    'Comprehensive overview of the two tracks at ENTS: Business Handlers (Venture Building) and Traders (Quantitative Paper Trading).',
};

export default function TracksPage() {
  const businessTrack = tracksData.find((t) => t.id === 'business-handlers')!;
  const tradersTrack = tracksData.find((t) => t.id === 'traders')!;

  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <Container size="wide" className="mb-16 sm:mb-20">
        <SectionHeading
          kicker="Curriculum &amp; Weekly Schedules"
          title="Two Disciplines. One Shared Rigor."
          description="Whether you are building sustainable business models around software or learning how to trade global macro liquidity, ENTS provides a structured framework that turns theoretical concepts into tangible outcomes."
          size="large"
        />
      </Container>

      {/* Track 1: Business Handlers */}
      <section id="business-handlers" className="border-t border-neutral-200 py-16 sm:py-24 bg-white scroll-mt-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Track Info Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-black text-white">
                  <Briefcase size={22} />
                </div>
                <Badge variant="dark">{businessTrack.shortTag}</Badge>
              </div>

              <h2 className="font-black text-3xl sm:text-4xl tracking-tighter text-black">
                {businessTrack.title}
              </h2>

              <p className="text-base text-neutral-600 leading-relaxed">
                {businessTrack.longDescription}
              </p>

              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500">
                  Target Audience
                </h4>
                <p className="text-sm text-neutral-700">{businessTrack.targetAudience}</p>
              </div>

              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500">
                  Tools &amp; Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {businessTrack.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono bg-neutral-100 border border-neutral-200 px-2.5 py-1 text-black"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button href="/join?track=business-handlers" variant="primary" size="md" className="w-full">
                  Apply for Business Handlers
                </Button>
              </div>
            </div>

            {/* Track Breakdown Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Weekly Cadence */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                  Weekly Operating Cadence
                </h3>
                <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
                  {businessTrack.weeklyCadence.map((cadence, idx) => (
                    <div key={cadence.phase} className="p-6 sm:p-7 hover:bg-neutral-50/50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-neutral-400">
                          STAGE 0{idx + 1}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-black">
                          {cadence.phase}
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed pl-8">
                        {cadence.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Gained & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <Card className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-black font-bold">
                    Skills Developed
                  </h4>
                  <ul className="space-y-2.5 text-sm text-neutral-600">
                    {businessTrack.skillsGained.map((skill) => (
                      <li key={skill} className="flex items-start gap-2.5">
                        <span className="text-black mt-0.5"><Check size={16} /></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-black font-bold">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2.5 text-sm text-neutral-600">
                    {businessTrack.keyDeliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-black mt-0.5"><Check size={16} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Track 2: Traders */}
      <section id="traders" className="border-t border-neutral-200 py-16 sm:py-24 bg-neutral-50/40 scroll-mt-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Track Info Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-black text-white">
                  <TrendingUp size={22} />
                </div>
                <Badge variant="dark">{tradersTrack.shortTag}</Badge>
              </div>

              <h2 className="font-black text-3xl sm:text-4xl tracking-tighter text-black">
                {tradersTrack.title}
              </h2>

              <p className="text-base text-neutral-600 leading-relaxed">
                {tradersTrack.longDescription}
              </p>

              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500">
                  Target Audience
                </h4>
                <p className="text-sm text-neutral-700">{tradersTrack.targetAudience}</p>
              </div>

              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500">
                  Tools &amp; Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {tradersTrack.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono bg-white border border-neutral-200 px-2.5 py-1 text-black"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button href="/join?track=traders" variant="primary" size="md" className="w-full">
                  Apply for Traders Track
                </Button>
              </div>
            </div>

            {/* Track Breakdown Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Weekly Cadence */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                  Weekly Operating Cadence
                </h3>
                <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
                  {tradersTrack.weeklyCadence.map((cadence, idx) => (
                    <div key={cadence.phase} className="p-6 sm:p-7 hover:bg-neutral-50/50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-neutral-400">
                          STAGE 0{idx + 1}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-black">
                          {cadence.phase}
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed pl-8">
                        {cadence.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Gained & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <Card className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-black font-bold">
                    Skills Developed
                  </h4>
                  <ul className="space-y-2.5 text-sm text-neutral-600">
                    {tradersTrack.skillsGained.map((skill) => (
                      <li key={skill} className="flex items-start gap-2.5">
                        <span className="text-black mt-0.5"><Check size={16} /></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-black font-bold">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2.5 text-sm text-neutral-600">
                    {tradersTrack.keyDeliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-black mt-0.5"><Check size={16} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-track Collaboration Band */}
      <section className="border-t border-neutral-200 py-16 bg-white">
        <Container size="wide">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
              Synergy
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
              Can members participate in both tracks?
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed">
              Yes. Many of our strongest student founders apply quantitative risk models from the
              traders track to their software pricing models, while traders leverage full-stack web
              development skills to automate paper trading order routing.
            </p>
            <div className="pt-2">
              <Button href="/join" variant="outline" size="md">
                <span>Start Application</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

