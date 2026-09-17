import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
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
        kicker="Portfolio & Technology"
        title="What We Build"
        description="We do not formulate passive pitch slides. ENTS members build and deploy working software platforms, campus micro-enterprises, and quantitative trading infrastructure."
      />

      {/* Featured Flagship Project: SIFS */}
      <section className="border-t border-b border-neutral-200 bg-neutral-50/50 py-16 sm:py-20 mb-16">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                  Featured Platform
                </span>
                <Badge variant={featured.status}>{featured.status}</Badge>
                <Badge variant="neutral">{featured.category}</Badge>
              </div>

              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900">
                {featured.title}
              </h2>

              <p className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed">
                {featured.tagline}
              </p>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono bg-white border border-neutral-200/90 rounded-lg px-2.5 py-1 text-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <Button href="/leaderboard" variant="primary" size="md" className="rounded-xl">
                  <span>Live Leaderboard</span>
                  <ArrowRight size={16} />
                </Button>
                {featured.links?.github && (
                  <Button
                    href={featured.links.github}
                    external
                    variant="outline"
                    size="md"
                    className="rounded-xl"
                  >
                    <span>Source Code</span>
                    <ArrowUpRight size={16} />
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="card-hover border border-neutral-200/90 bg-white rounded-2xl p-6 sm:p-7 space-y-5 shadow-sm">
                {/* Real SIFS Dashboard Screen */}
                <div className="skeuo-recessed rounded-xl overflow-hidden relative w-full h-48 sm:h-56">
                  <Image
                    src={featured.imageUrl || '/projects/sifs-dashboard.jpg'}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute top-3 left-3">
                    <span className="skeuo-badge px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold text-neutral-900">
                      LIVE SIFS TERMINAL
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <TerminalIcon size={16} className="text-neutral-900" />
                    <span className="text-xs font-mono font-bold text-neutral-900 uppercase">
                      Telemetry Overview
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-lg px-2.5 py-0.5 font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    RCA PROD
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {featured.metrics?.map((metric) => (
                    <div key={metric.label} className="card-skeuo-sm rounded-xl p-3.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        {metric.label}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1 tabular-nums font-number">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs font-mono text-neutral-500 pt-2 border-t border-neutral-100">
                  SIFS provides real-time state synchronization for our weekly trading league, automatically enforcing risk limits without manual tallying.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid of Other Club Products & Ventures with Separating Lines */}
      <Container size="wide">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-500 font-semibold">
            All Products &amp; Ventures ({projectsData.length})
          </h3>
          <span className="text-xs font-mono text-neutral-400">
            COHORT 2026 - 2027
          </span>
        </div>

        <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-sm">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 sm:p-7 flex flex-col justify-between group hover:bg-neutral-50/70 transition-colors"
            >
              <div>
                {/* Real Dashboard Image in Recessed Bezel */}
                {project.imageUrl && (
                  <div className="skeuo-recessed rounded-xl overflow-hidden relative w-full h-44 sm:h-48 mb-4">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="skeuo-badge px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-neutral-900">
                        DASHBOARD
                      </span>
                    </div>
                  </div>
                )}

                {/* Separating hairline under dashboard image */}
                <div className="w-full h-px bg-neutral-200/70 my-3" />

                <div className="flex items-center justify-between mb-3">
                  <Badge variant={project.status}>{project.status}</Badge>
                  <span className="text-xs font-mono text-neutral-500 font-semibold">{project.category}</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-950 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-500 mt-1">{project.tagline}</p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-3">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-100 font-mono">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="skeuo-chip p-2.5 rounded-lg">
                        <div className="text-[9px] text-neutral-500 uppercase">{m.label}</div>
                        <div className="text-xs font-bold text-neutral-900 font-number">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-neutral-100 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-200/80 px-2 py-0.5 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Project Submission CTA */}
      <section className="mt-20 border-t border-neutral-200 bg-neutral-50/50 py-16">
        <Container size="wide" className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Have an idea for a software venture on campus?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Pitch your prototype at the next Wednesday ENTS Venture Teardown session.
            </p>
          </div>
          <Button href="/join" variant="primary" size="md" className="rounded-xl">
            <span>Pitch Your Venture</span>
            <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </div>
  );
}
