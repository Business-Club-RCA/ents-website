'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, TerminalIcon, ShieldCheck } from '@/components/ui/Icons';

type SimulatorTab = 'terminal' | 'orderbook' | 'risk';

export function FlagshipSimulator() {
  const [activeTab, setActiveTab] = useState<SimulatorTab>('terminal');
  const [eurUsd, setEurUsd] = useState(1.0842);
  const [btcUsd, setBtcUsd] = useState(91420);
  const [tickCount, setTickCount] = useState(14829);
  const [lastDelta, setLastDelta] = useState<'up' | 'down'>('up');

  // Simulated live market price ticks
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.0004;
      setEurUsd((prev) => {
        const next = +(prev + delta).toFixed(4);
        setLastDelta(next >= prev ? 'up' : 'down');
        return next;
      });
      setBtcUsd((prev) => Math.round(prev + (Math.random() - 0.48) * 18));
      setTickCount((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Product Story & Architectural Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                Flagship Project
              </span>
              <Badge variant="Live">Live on Campus</Badge>
            </div>

            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-[1.08]">
              Student Investment Fund Simulator
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              While ordinary business clubs write theoretical papers, ENTS engineers full-stack financial systems. SIFS is our proprietary simulated matching engine and live order routing terminal.
            </p>

            {/* Concise Feature Cards */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/60 card-hover">
                <div className="mt-0.5 p-2 rounded-lg bg-neutral-900 text-white shadow-sm">
                  <TerminalIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">
                    Sub-50ms Market Tick Ingestion
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Websocket connections streaming real-time FX, equities, and commodities depth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/60 card-hover">
                <div className="mt-0.5 p-2 rounded-lg bg-neutral-900 text-white shadow-sm">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">
                    Institutional 1% Risk Guardrails
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Hard-coded maximum drawdown locks that automatically freeze impulsive trading behavior.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <Button href="/projects" variant="primary" size="md" className="rounded-xl">
                <span>Inspect Architecture</span>
                <ArrowRight size={16} />
              </Button>
              <Button href="/leaderboard" variant="outline" size="md" className="rounded-xl">
                View Live League Standings
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive SIFS Terminal */}
          <div className="lg:col-span-6">
            <div className="card-skeuo-dark text-white rounded-2xl overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,0.45)]">
              {/* Terminal Titlebar with Interactive Tabs */}
              <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 px-4 py-3 text-xs font-mono bg-neutral-900/90 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-neutral-200 font-semibold">SIFS · v2.4</span>
                </div>

                {/* Tab Switchers */}
                <div className="flex items-center gap-1 bg-black/90 p-1 rounded-xl border border-neutral-800/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.8)] text-[11px]">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'terminal' ? 'btn-skeuo-pill-active' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Console
                  </button>
                  <button
                    onClick={() => setActiveTab('orderbook')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'orderbook' ? 'btn-skeuo-pill-active' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Order Book
                  </button>
                  <button
                    onClick={() => setActiveTab('risk')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'risk' ? 'btn-skeuo-pill-active' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Risk Matrix
                  </button>
                </div>
              </div>

              {/* Dynamic Live Ticker Bar */}
              <div className="grid grid-cols-3 gap-2 px-5 py-3 border-b border-neutral-800/80 bg-black/40 font-mono text-xs">
                <div>
                  <div className="text-neutral-500 text-[10px]">EUR - USD</div>
                  <div className={`font-bold transition-colors ${lastDelta === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {eurUsd.toFixed(4)}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">BTC - USD</div>
                  <div className="text-neutral-200 font-bold font-number">
                    ${btcUsd.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">STREAM TICKS</div>
                  <div className="text-neutral-400 font-number">
                    {tickCount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Tab Content 1: Terminal Console */}
              {activeTab === 'terminal' && (
                <div className="p-5 font-mono text-xs space-y-3 min-h-[260px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-neutral-400 text-[11px]">
                      {'[INGESTION ENGINE] Nyabihu Node 01 · 14ms latency'}
                    </div>
                    <div className="p-3 bg-black/80 rounded-xl border border-neutral-800/80 space-y-1.5 text-[11px]">
                      <div className="text-emerald-400 flex items-center justify-between">
                        <span>[EXEC 09:42:01] EUR - USD BUY LIMIT 2.0 LOTS @ {eurUsd.toFixed(4)}</span>
                        <span className="text-[10px] text-neutral-500 font-number">#ORD-8492</span>
                      </div>
                      <div className="text-neutral-400 flex items-center justify-between">
                        <span>[MATCH] Counterparty: SIFS_LIQ_POOL_RCA (Filled 100%)</span>
                        <span className="text-emerald-500 text-[10px]">FILLED</span>
                      </div>
                      <div className="text-neutral-500">
                        [RISK AUDIT] Portfolio VaR 0.84% &lt; 1.00% Limit &#10003; Approved
                      </div>
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      &gt; sifs.feed.subscribe(&quot;XAU/USD&quot;, &quot;US500&quot;) ... Connected
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Matching Engine: ACTIVE</span>
                    </span>
                    <span className="font-number text-neutral-400">RCA SIMULATOR v2.4</span>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Order Book & Depth */}
              {activeTab === 'orderbook' && (
                <div className="p-5 font-mono text-xs space-y-3 min-h-[260px]">
                  <div className="text-neutral-400 text-[11px] mb-2">
                    {'[REAL-TIME ORDER DEPTH] EUR - USD'}
                  </div>
                  {/* Ask rows */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-rose-400 text-[11px] relative">
                      <div className="absolute right-0 h-full bg-rose-500/10 rounded-lg" style={{ width: '65%' }} />
                      <span className="relative z-10">1.0846</span>
                      <span className="relative z-10 text-neutral-400">14.2 Lots</span>
                    </div>
                    <div className="flex items-center justify-between text-rose-400 text-[11px] relative">
                      <div className="absolute right-0 h-full bg-rose-500/10 rounded-lg" style={{ width: '40%' }} />
                      <span className="relative z-10">1.0844</span>
                      <span className="relative z-10 text-neutral-400">8.5 Lots</span>
                    </div>
                  </div>
                  {/* Spread indicator */}
                  <div className="py-1 px-2.5 bg-neutral-900 border-y border-neutral-800 text-center text-[10px] text-neutral-400">
                    SPREAD: 0.2 PIPS · LIQUIDITY POOL ACTIVE
                  </div>
                  {/* Bid rows */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-emerald-400 text-[11px] relative">
                      <div className="absolute right-0 h-full bg-emerald-500/10 rounded-lg" style={{ width: '85%' }} />
                      <span className="relative z-10">{eurUsd.toFixed(4)}</span>
                      <span className="relative z-10 text-neutral-400">22.0 Lots</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-400 text-[11px] relative">
                      <div className="absolute right-0 h-full bg-emerald-500/10 rounded-lg" style={{ width: '50%' }} />
                      <span className="relative z-10">1.0840</span>
                      <span className="relative z-10 text-neutral-400">11.4 Lots</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Risk Matrix */}
              {activeTab === 'risk' && (
                <div className="p-5 font-mono text-xs space-y-4 min-h-[260px]">
                  <div className="text-neutral-400 text-[11px]">
                    {'[PROGRAMMATIC RISK GUARDRAILS]'}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-neutral-300">Max Portfolio VaR (Value at Risk)</span>
                        <span className="text-emerald-400 font-bold">0.84% of 1.00% MAX</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-neutral-300">Margin Utilization</span>
                        <span className="text-neutral-200 font-bold">32.4%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <div className="h-full bg-neutral-400 rounded-full" style={{ width: '32%' }} />
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-xl text-[11px] text-neutral-400 leading-relaxed">
                      &#9888; Automatic Circuit Breaker: Accounts encountering &gt; 1.0% single-trade stop violation are frozen for 24h review.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
