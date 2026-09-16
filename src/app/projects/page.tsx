import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight, ArrowUpRight, TerminalIcon } from '@/components/ui/Icons';
import { projectsData } from '@/data/projects';

import { PageHero } from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Ventures & Projects',
  description:
    'Explore software products, fintech platforms, and student ventures engineered by ENTS at Rwanda Coding Academy.',
};

export default function ProjectsPage() {
  const featured = projectsData.find((p) => p.featured) || projectsData[0];
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Banner with Cinematic Image */}
      <PageHero
        kicker="Portfolio &amp; Technology"
        kicker="Portfolio & Technology"
        title="What We Build"
        description="We do not just formulate pitch slides. ENTS members build and deploy working software platforms, campus micro-enterprises, and algorithmic trading infrastructure."
      />

      {/* Featured Flagship Project: SIFS */}
      <section className="border-t border-b border-neutral-200 bg-neutral-50/50 py-16 sm:py-20 mb-20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                  Featured Platform
                </span>
                <Badge variant={featured.status}>{featured.status}</Badge>
                <Badge variant="outline">{featured.category}</Badge>
              </div>

              <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-black">
                {featured.title}
              </h2>

              <p className="text-lg text-neutral-800 font-medium leading-relaxed">
                {featured.tagline}
              </p>

              <p className="text-base text-neutral-600 leading-relaxed">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono bg-white border border-neutral-200 px-2.5 py-1 text-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button href="/leaderboard" variant="primary" size="md">
                  <span>View Live Leaderboard Integration</span>
                  <ArrowRight size={16} />
                </Button>
                {featured.links?.github && (
                  <Button
                    href={featured.links.github}
                    external
                    variant="outline"
                    size="md"
                  >
                    <span>View Repository</span>
                    <ArrowUpRight size={16} />
                  </Button>
                )}
              </div>
            </div>

            {/* Metrics Breakdown Box */}
            <div className="lg:col-span-5">
              <div className="border border-neutral-300 bg-white p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <div className="flex items-center gap-2">
                    <TerminalIcon size={16} className="text-black" />
                    <span className="text-xs font-mono font-bold text-black uppercase">
                      SIFS Platform Telemetry
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5">
                    RCA PROD
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {featured.metrics?.map((metric) => (
                    <div key={metric.label} className="border border-neutral-200 bg-neutral-50 p-4">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        {metric.label}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-black mt-1 font-mono">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs font-mono text-neutral-500 pt-2 border-t border-neutral-200">
                  SIFS provides real-time state synchronization for our weekly trading league,
                  automatically enforcing risk limits without manual tallying.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid of Other Club Products & Ventures */}
      <Container size="wide">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-500">
            All Club Products &amp; Ventures ({projectsData.length})
            All Club Products & Ventures ({projectsData.length})
          </h3>
          <span className="text-xs font-mono text-neutral-400">
            UPDATED SEPTEMBER 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project) => (
            <Card key={project.id} hoverable className="flex flex-col justify-between p-7">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={project.status}>{project.status}</Badge>
                  <span className="text-xs font-mono text-neutral-400">{project.category}</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold tracking-tight text-black">{project.title}</h4>
                  <p className="text-xs font-mono text-neutral-500 mt-1">{project.tagline}</p>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed">{project.description}</p>

                {/* Metrics */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 font-mono">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="bg-neutral-50 p-2 border border-neutral-200">
                        <div className="text-[9px] text-neutral-500 uppercase">{m.label}</div>
                        <div className="text-xs font-bold text-black">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Project Submission CTA */}
      <section className="mt-20 border-t border-neutral-200 bg-neutral-50/50 py-16">
        <Container size="wide" className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-black">
              Have an idea for a software venture on campus?
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Pitch your prototype at the next Wednesday ENTS Venture Teardown session.
            </p>
          </div>
          <Button href="/join" variant="primary" size="md">
            <span>Pitch Your Venture</span>
            <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </div>
  );
}

