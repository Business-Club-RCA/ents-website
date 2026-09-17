'use client';

import React from 'react';
import { statsData } from '@/data/stats';

const METRIC_BADGES = [
  'Live Ticks',
  'RCA Cohorts 5-7',
  'Ventures & Quant',
  '1% Stop-Loss Bound',
];

export function StatsStrip() {
  return (
    <section className="border-y border-neutral-200/90 bg-neutral-50/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={stat.label}
              className="card-hover bg-white border border-neutral-200/90 p-6 sm:p-7 rounded-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-neutral-100 group-hover:bg-neutral-900 transition-colors" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                    {stat.label}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200/80 font-medium">
                    {METRIC_BADGES[idx] || 'Live'}
                  </span>
                </div>

                <div className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 tabular-nums font-number group-hover:text-black transition-colors">
                  {stat.value}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-normal">
                <span>{stat.detail}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-glow-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
