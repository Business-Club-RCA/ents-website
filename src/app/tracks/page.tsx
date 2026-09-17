import React from 'react';
import type { Metadata } from 'next';
import { getTracks } from '@/lib/db';
import { TracksClient } from '@/components/sections/TracksClient';

export const metadata: Metadata = {
  title: 'Tracks & Curriculum',
  description:
    'Two dedicated disciplines at Rwanda Coding Academy: Business Handlers and Quantitative Traders.',
};

export default async function TracksPage() {
  const tracks = await getTracks();

  return <TracksClient tracks={tracks} />;
}
