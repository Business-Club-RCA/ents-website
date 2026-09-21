import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/db';
import { PageHero } from '@/components/layout/PageHero';
import { ProjectsPipeline } from '@/components/sections/ProjectsPipeline';

export const metadata: Metadata = {
  title: 'Ventures & Technology Pipeline',
  description:
    'Explore upcoming fintech platforms, student ventures, and quantitative trading architecture currently in active incubation at Rwanda Coding Academy.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projectsData = await getProjects();

  return (
    <div className="flex flex-col">
      {/* Hero Banner with Cinematic Background */}
      <PageHero
        kicker="Incubation Pipeline · Technology Prototypes"
        title="What We Are Building"
        description="We do not formulate passive pitch slides. ENTS members engineer proprietary fintech engines, campus micro-enterprises, and algorithmic trading architecture in active stealth incubation."
      />

      {/* Interactive Projects Pipeline */}
      <ProjectsPipeline projects={projectsData} />
    </div>
  );
}
