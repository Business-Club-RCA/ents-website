import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { UpdatesHub } from '@/components/sections/UpdatesHub';

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'Real-time dispatches from our incubation floor, curated industry news, and upcoming society events at Rwanda Coding Academy.',
};

export default function UpdatesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner with Cinematic Background */}
      <PageHero
        kicker="News · Dispatches · Agenda"
        title="News, Updates & Events"
        description="Real-time dispatches from our incubation floor, curated industry news, and upcoming society events across Rwanda Coding Academy."
      />

      {/* Main Updates, Articles & Events Hub */}
      <UpdatesHub />
    </div>
  );
}

