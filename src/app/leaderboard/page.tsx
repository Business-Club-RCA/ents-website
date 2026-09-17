import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { LeaderboardTable } from '@/components/sections/LeaderboardTable';
import { getLeaderboard } from '@/lib/db';
import { ShieldCheck, TrendingUp } from '@/components/ui/Icons';
import { PageHero } from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Trading League Leaderboard',
  description:
    'Live simulated performance rankings and portfolio returns for the ENTS Trading League at Rwanda Coding Academy.',
};

export default async function LeaderboardPage() {
  const standings = await getLeaderboard();

  const totalCapital = standings.reduce((acc, curr) => acc + curr.portfolioValue, 0);
  const totalTrades = standings.reduce((acc, curr) => acc + curr.tradesCount, 0);
  const topTrader = standings.reduce((prev, current) =>
    prev.pnlPercent > current.pnlPercent ? prev : current
  );

  return (
    <div className="flex flex-col">
      {/* Hero Banner with Cinematic Image */}
      <PageHero
        kicker="Simulated League Standings"
        title="ENTS Trading League"
        description="Real-time rankings from the Student Investment Fund Simulator. All participants trade with identical $10,000 demo accounts and adhere to institutional 1% risk rules."
      />

      {/* Snapshot Metric Cards */}
      <div className="py-12 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="card-hover card-skeuo-light p-6 rounded-2xl border border-neutral-200/90">
              <div className="text-[11px] font-mono text-neutral-600 uppercase tracking-wider font-semibold">
                Top Performer
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1.5">
                {topTrader.name}
              </div>
              <div className="text-xs text-emerald-600 font-bold font-number mt-1 flex items-center gap-1">
                <span>+{topTrader.pnlPercent.toFixed(2)}% net return</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="card-hover border border-neutral-200/90 bg-white p-6 rounded-2xl">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                Total Paper Capital
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1.5 tabular-nums font-number">
                ${totalCapital.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-neutral-500 font-mono mt-1">
                across {standings.length} tracked accounts
              </div>
            </div>

            <div className="card-hover border border-neutral-200/90 bg-white p-6 rounded-2xl">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                Orders Executed
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1.5 tabular-nums font-number">
                {totalTrades}
              </div>
              <div className="text-xs text-neutral-500 font-mono mt-1">
                logged in SIFS order book
              </div>
            </div>

            <div className="card-hover border border-neutral-200/90 bg-white p-6 rounded-2xl">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                Risk Constraint
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1.5 tabular-nums font-number">
                1.00% per Trade
              </div>
              <div className="text-xs text-neutral-500 font-mono mt-1">
                hard circuit-breaker limit
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Interactive Table */}
      <section className="border-t border-b border-neutral-200 bg-neutral-50/40 py-12">
        <Container size="wide">
          <LeaderboardTable initialData={standings} />
        </Container>
      </section>

      {/* Rules & Transparency Section */}
      <section className="py-16 sm:py-24 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                Governance
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-2">
                League Rules &amp; Integrity
              </h3>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                ENTS strictly opposes reckless gambling. Rankings evaluate risk-adjusted consistency, maximum drawdown discipline, and verified journal audits.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="card-hover border border-neutral-200/90 rounded-2xl p-6 sm:p-7 space-y-3 bg-neutral-50/50">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900">
                  <ShieldCheck size={16} />
                  <span>RULE 01 · STRICT 1% RISK CAP</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  No single trade may risk &gt; 1% ($100 on standard demo accounts) of equity. SIFS automatically audits lot sizing before order execution.
                </p>
              </div>

              <div className="card-hover border border-neutral-200/90 rounded-2xl p-6 sm:p-7 space-y-3 bg-neutral-50/50">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900">
                  <TrendingUp size={16} />
                  <span>RULE 02 · TRADE JOURNAL REVIEW</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  To qualify for semester honors, traders must document entry thesis, stop placement, and post-execution reflections in their verified journal.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
