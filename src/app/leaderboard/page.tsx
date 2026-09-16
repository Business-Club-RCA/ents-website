import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LeaderboardTable } from '@/components/sections/LeaderboardTable';
import { getLeaderboardData } from '@/data/leaderboard';
import { ShieldCheck, TrendingUp } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Trading League Leaderboard',
  description:
    'Live simulated performance rankings and portfolio returns for the ENTS Trading League at Rwanda Coding Academy.',
};

export default async function LeaderboardPage() {
  const standings = await getLeaderboardData();

  const totalCapital = standings.reduce((acc, curr) => acc + curr.portfolioValue, 0);
  const totalTrades = standings.reduce((acc, curr) => acc + curr.tradesCount, 0);
  const topTrader = standings.reduce((prev, current) =>
    prev.pnlPercent > current.pnlPercent ? prev : current
  );

  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <Container size="wide" className="mb-12 sm:mb-16">
        <SectionHeading
          kicker="Simulated League Standings"
          title="ENTS Trading League"
          description="Real-time rankings from the Student Investment Fund Simulator. All participants trade with identical $10,000 demo accounts and adhere to institutional 1% risk rules."
          size="large"
        />

        {/* Snapshot Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          <div className="border border-neutral-200 bg-white p-5 font-mono">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Top Performer</div>
            <div className="text-xl sm:text-2xl font-bold text-black mt-1 font-sans">
              {topTrader.name}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              +{topTrader.pnlPercent.toFixed(2)}% net return
            </div>
          </div>

          <div className="border border-neutral-200 bg-white p-5 font-mono">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Total Paper Capital</div>
            <div className="text-xl sm:text-2xl font-bold text-black mt-1">
              ${totalCapital.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              across {standings.length} tracked accounts
            </div>
          </div>

          <div className="border border-neutral-200 bg-white p-5 font-mono">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Orders Executed</div>
            <div className="text-xl sm:text-2xl font-bold text-black mt-1">
              {totalTrades}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              logged in SIFS order book
            </div>
          </div>

          <div className="border border-neutral-200 bg-white p-5 font-mono">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Risk Constraint</div>
            <div className="text-xl sm:text-2xl font-bold text-black mt-1">
              1.00% / Trade
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              max stop-loss violation
            </div>
          </div>
        </div>
      </Container>

      {/* Main Hairline Table */}
      <section className="border-t border-b border-neutral-200 bg-neutral-50/30 py-12">
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
              <h3 className="text-2xl font-bold tracking-tight text-black mt-2">
                League Rules &amp; Integrity
              </h3>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                ENTS strictly opposes reckless gambling or lottery trading. Our league is evaluated
                on risk-adjusted consistency, maximum drawdown discipline, and trade journaling.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-neutral-200 p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
                  <ShieldCheck size={16} />
                  <span>RULE 01 · STRICT 1% RISK CAP</span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  No individual position may risk more than 1% ($100 on standard accounts) of total
                  account equity. SIFS automatically audits lot sizing before order execution.
                </p>
              </div>

              <div className="border border-neutral-200 p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
                  <TrendingUp size={16} />
                  <span>RULE 02 · TRADE JOURNAL REVIEW</span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  To qualify for the semester awards, traders must log entry rationale, stop-loss
                  placement, and post-trade reflections in their verified Notion trade journal.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

