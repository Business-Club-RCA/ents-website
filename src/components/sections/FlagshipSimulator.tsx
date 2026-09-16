import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, TerminalIcon, ShieldCheck } from '@/components/ui/Icons';
import { projectsData } from '@/data/projects';

export function FlagshipSimulator() {
  const sifs = projectsData.find((p) => p.id === 'sifs-simulator') || projectsData[0];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Product Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                Flagship Project
              </span>
              <Badge variant="Live">Live on Campus</Badge>
            </div>

            <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-black leading-[1.1]">
              Student Investment Fund Simulator
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Most high school business clubs write theoretical papers. At Rwanda Coding Academy,
              we build full-stack financial infrastructure. SIFS is our proprietary simulated
              trading terminal and order matching engine.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-neutral-100 border border-neutral-200">
                  <TerminalIcon size={16} className="text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black">Real-Time Market Tick Ingestion</h4>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Connects directly to FX and equities websocket feeds with simulated order routing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-neutral-100 border border-neutral-200">
                  <ShieldCheck size={16} className="text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black">Institutional Risk Guardrails</h4>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Hard-coded 1% maximum stop-loss violation limits automatically lock impulsive positions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/projects" variant="primary" size="md">
                <span>Inspect Project Specs</span>
                <ArrowRight size={16} />
              </Button>
              <Button href="/leaderboard" variant="outline" size="md">
                View Live Standings
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Terminal Preview */}
          <div className="lg:col-span-6">
            <div className="border border-neutral-300 bg-black text-white p-5 sm:p-7 shadow-[0_0_0_1px_rgba(0,0,0,1)]">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 bg-neutral-600 rounded-none"></span>
                  <span className="inline-block w-2.5 h-2.5 bg-neutral-700 rounded-none"></span>
                  <span className="inline-block w-2.5 h-2.5 bg-neutral-800 rounded-none"></span>
                  <span className="ml-2 text-neutral-300 font-semibold">SIFS // TERMINAL v2.4</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-neutral-300 animate-pulse"></span>
                  <span>FEED: CONNECTED</span>
                </div>
              </div>

              {/* Ticker Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-neutral-800 font-mono text-xs">
                <div>
                  <div className="text-neutral-500 text-[10px]">PAIR</div>
                  <div className="font-bold text-white">EUR/USD</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">BID / ASK</div>
                  <div className="text-neutral-300">1.0842 / 1.0844</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">SPREAD</div>
                  <div className="text-neutral-300">0.2 PIPS</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">24H CHANGE</div>
                  <div className="text-white font-bold">+0.48%</div>
                </div>
              </div>

              {/* Simulated Execution Log */}
              <div className="py-4 space-y-2 font-mono text-xs text-neutral-400 border-b border-neutral-800">
                <div className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">
                  Recent Engine Dispatches
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-white">[BUY 0.50 LOT] XAU/USD @ 2,648.10</span>
                  <span className="text-neutral-500">TRADER #01 · FILLED</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-white">[SELL 1.00 LOT] US100 @ 19,820.50</span>
                  <span className="text-neutral-500">TRADER #02 · FILLED</span>
                </div>
                <div className="flex justify-between py-1 text-neutral-500">
                  <span>[RISK BREACH DETECTED] MAX_DD &gt; 4.0%</span>
                  <span className="text-white bg-neutral-900 px-1">BLOCKED</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                {sifs.metrics?.map((m) => (
                  <div key={m.label} className="bg-neutral-950 p-2.5 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase">{m.label}</div>
                    <div className="text-sm font-bold text-white mt-1">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-[11px] font-mono text-neutral-500 flex justify-between items-center">
                <span>RCA INTAKE 5 &amp; 6 QUANTITATIVE LABS</span>
                <Link
                  href="/projects"
                  className="text-white underline underline-offset-4 hover:text-neutral-300"
                >
                  View Architecture &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

