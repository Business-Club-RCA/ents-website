'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, TerminalIcon, ShieldCheck } from '@/components/ui/Icons';

export function FlagshipSimulator() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Product Story & Incubation Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                03 · Flagship Venture
              </span>
              <Badge variant="neutral">Coming Soon · Cohort 2026 Alpha</Badge>
            </div>

            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-[1.08]">
              Student Investment Fund Simulator
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              While ordinary business clubs write theoretical papers, ENTS engineers full-stack financial systems. SIFS is our upcoming proprietary matching engine and campus order routing terminal, currently in active stealth development.
            </p>

            {/* Feature Cards */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 card-hover">
                <div className="mt-0.5 p-2 rounded-xl bg-neutral-900 text-white shadow-xs">
                  <TerminalIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">
                    High-Performance Ingestion Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 leading-relaxed">
                    Engineered to stream real-time price feeds with sub-50ms matching latency for simulated orders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 card-hover">
                <div className="mt-0.5 p-2 rounded-xl bg-neutral-900 text-white shadow-xs">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">
                    Hard-Coded 1% Risk Guardrails
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 leading-relaxed">
                    Automated circuit breakers that strictly enforce risk limits, eliminating impulsive over-leveraged trades.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href="/projects"
                className="btn-skeuo-dark font-bold text-xs font-mono px-5 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 shadow-sm hover:scale-[1.01] transition-transform"
              >
                <span>Inspect Venture Pipeline</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/leaderboard"
                className="btn-skeuo-light font-semibold text-xs font-mono px-5 py-2.5 rounded-xl cursor-pointer text-neutral-800 hover:border-neutral-900"
              >
                View Tournament Rules
              </Link>
            </div>
          </div>

          {/* Right Column: Sleek Hardware Chassis with Real Dashboard Photo */}
          <div className="lg:col-span-6">
            <div className="card-skeuo-static bg-white border border-neutral-300 rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden group">
              {/* Chassis Bezel Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-200 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/80" />
                  <span className="ml-2 font-bold text-neutral-800 text-[11px] tracking-wide">
                    SIFS TERMINAL · PREVIEW
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-[10px] font-bold text-neutral-800 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
                  <span>COMING SOON</span>
                </div>
              </div>

              {/* Dashboard Photo Container with Clean Coming Soon Overlay */}
              <div className="skeuo-recessed rounded-2xl overflow-hidden relative w-full h-70 sm:h-85 border border-neutral-200">
                <Image
                  src="/projects/sifs-dashboard.jpg"
                  alt="SIFS Student Investment Fund Simulator Dashboard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Coming Soon Watermark Overlay */}
                <div className="absolute inset-0 bg-neutral-950/35 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-[0.5px]">
                  <div className="px-5 py-2.5 rounded-2xl bg-neutral-900/95 border border-white/20 text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-2xl">
                    COMING SOON · IN ACTIVE R&amp;D
                  </div>
                  <p className="text-[11px] font-mono text-neutral-200 mt-2 max-w-xs drop-shadow-sm">
                    Rwanda Coding Academy · Season 01 Engine Calibration
                  </p>
                </div>
              </div>

              {/* Chassis Telemetry Spec Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-neutral-100 font-mono text-[11px]">
                <div className="skeuo-chip p-2.5 rounded-xl">
                  <div className="text-[9px] uppercase text-neutral-500">ENGINE</div>
                  <div className="font-bold text-neutral-900 truncate">Go Matching</div>
                </div>
                <div className="skeuo-chip p-2.5 rounded-xl">
                  <div className="text-[9px] uppercase text-neutral-500">PROTOCOL</div>
                  <div className="font-bold text-neutral-900 truncate">WebSockets</div>
                </div>
                <div className="skeuo-chip p-2.5 rounded-xl">
                  <div className="text-[9px] uppercase text-neutral-500">RISK CAP</div>
                  <div className="font-bold text-neutral-900 font-number truncate">1.00% Stop</div>
                </div>
                <div className="skeuo-chip p-2.5 rounded-xl">
                  <div className="text-[9px] uppercase text-neutral-500">STAGE</div>
                  <div className="font-bold text-neutral-900 truncate">Core Build</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
