import React from 'react';
import { statsData } from '@/data/stats';

export function StatsStrip() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
          {statsData.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-center ${
                idx > 0 ? 'pt-6 sm:pt-0 sm:pl-8 lg:pl-10' : ''
              }`}
            >
              <span className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-black tabular-nums font-number">
                {stat.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm uppercase tracking-widest font-mono text-neutral-500 font-semibold">
                {stat.label}
              </span>
              <span className="mt-1 text-xs text-neutral-400 font-normal">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
