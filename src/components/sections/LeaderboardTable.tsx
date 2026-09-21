'use client';

import React, { useState } from 'react';
import { LeaderboardEntry } from '@/types';
import { Check } from '@/components/ui/Icons';

interface LeaderboardTableProps {
  initialData: LeaderboardEntry[];
}

type FilterOption = 'All' | 'Traders' | 'Business Handlers' | 'Top3' | 'HighWinRate';

export function LeaderboardTable({ initialData }: LeaderboardTableProps) {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'pnl' | 'trades'>('rank');
  const [isNotified, setIsNotified] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filteredData = initialData
    .filter((entry) => {
      if (filter === 'Traders' && entry.track !== 'Traders') return false;
      if (filter === 'Business Handlers' && entry.track !== 'Business Handlers') return false;
      if (filter === 'Top3' && entry.rank > 3) return false;
      if (filter === 'HighWinRate' && entry.winRate < 60) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          entry.name.toLowerCase().includes(query) ||
          entry.assetClass.toLowerCase().includes(query) ||
          entry.classYear.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank;
      if (sortBy === 'pnl') return b.pnlPercent - a.pnlPercent;
      if (sortBy === 'trades') return b.tradesCount - a.tradesCount;
      return 0;
    });

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail.trim()) return;
    setIsNotified(true);
    setIsModalOpen(false);
    setToastMessage(`✓ ${notifyEmail} registered for SIFS Season 01 launch alert!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="relative space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-mono border border-neutral-700 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {toastMessage}
        </div>
      )}

      {/* Control Strip (Blurred slightly for depth) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 opacity-60 pointer-events-none select-none">
        {/* Search Bar */}
        <div className="relative w-full sm:w-64 lg:w-72">
          <input
            type="text"
            disabled
            placeholder="Search trader or asset..."
            value={searchQuery}
            className="w-full pl-9 pr-3.5 py-2 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900"
          />
          <svg
            className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-200/50 rounded-xl border border-neutral-300/70 text-xs font-mono">
          <button className="px-3 py-1.5 rounded-lg btn-skeuo-pill-active">
            All ({initialData.length})
          </button>
          <button className="px-3 py-1.5 rounded-lg btn-skeuo-pill-inactive">
            Podium (Top 3)
          </button>
          <button className="px-3 py-1.5 rounded-lg btn-skeuo-pill-inactive">
            Win Rate &gt; 60%
          </button>
          <button className="px-3 py-1.5 rounded-lg btn-skeuo-pill-inactive">
            Traders
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <span>Sort:</span>
          <span className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-900">
            Rank (#1 first)
          </span>
        </div>
      </div>

      {/* Main Container with Frosted Glass Blur Overlay */}
      <div className="relative card-skeuo-static rounded-2xl overflow-hidden shadow-sm">
        {/* The Underlying Blurred Table */}
        <div className="overflow-x-auto filter blur-[7px] opacity-40 select-none pointer-events-none transition-all">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/75 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Rank</th>
                <th className="py-3.5 px-4 font-semibold">Participant</th>
                <th className="py-3.5 px-4 font-semibold hidden sm:table-cell">Focus</th>
                <th className="py-3.5 px-4 font-semibold text-right">Balance</th>
                <th className="py-3.5 px-4 font-semibold text-right">Net Return</th>
                <th className="py-3.5 px-4 font-semibold text-right hidden md:table-cell">Win Rate</th>
                <th className="py-3.5 px-4 font-semibold text-right hidden md:table-cell">Trades</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredData.slice(0, 10).map((entry) => {
                const isTop1 = entry.rank === 1;
                const isTop2 = entry.rank === 2;
                const isTop3 = entry.rank === 3;

                return (
                  <tr key={entry.name} className="hover:bg-neutral-50/70 transition-colors">
                    {/* Rank */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center justify-center font-bold text-xs rounded-lg px-2 py-0.5 font-number ${
                          isTop1
                            ? 'bg-neutral-900 text-white font-extrabold shadow-sm'
                            : isTop2
                            ? 'bg-neutral-200 text-neutral-800 border border-neutral-300 font-bold'
                            : isTop3
                            ? 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                            : 'text-neutral-500 font-mono'
                        }`}
                      >
                        {entry.rank < 10 ? `#0${entry.rank}` : `#${entry.rank}`}
                      </span>
                    </td>

                    {/* Participant */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-900">
                        {entry.name}
                      </div>
                      <div className="text-xs text-neutral-500 font-mono">
                        {entry.classYear}
                      </div>
                    </td>

                    {/* Track / Asset */}
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-neutral-100 border border-neutral-200/80 text-neutral-700">
                        {entry.assetClass}
                      </span>
                    </td>

                    {/* Portfolio Value */}
                    <td className="py-3.5 px-4 text-right font-bold text-neutral-900 tabular-nums font-number">
                      ${entry.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* PnL % */}
                    <td className="py-3.5 px-4 text-right tabular-nums font-number font-bold">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold ${
                          entry.pnlPercent >= 0
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {entry.pnlPercent >= 0 ? `+${entry.pnlPercent.toFixed(2)}%` : `${entry.pnlPercent.toFixed(2)}%`}
                      </span>
                    </td>

                    {/* Win Rate */}
                    <td className="py-3.5 px-4 text-right font-mono text-xs tabular-nums text-neutral-700 hidden md:table-cell">
                      {entry.winRate}%
                    </td>

                    {/* Trades */}
                    <td className="py-3.5 px-4 text-right font-mono text-xs tabular-nums text-neutral-500 hidden md:table-cell">
                      {entry.tradesCount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Clean Neutral Frosted Glass Center Announcement: "TO BE RELEASED SOON" */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 bg-white/40 backdrop-blur-md">
          <div className="max-w-lg w-full bg-white/95 border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.14)] text-center relative overflow-hidden group">
            {/* Top decorative rivet line */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 text-[10px] font-mono">
              <span className="skeuo-rivet" />
              <div className="flex items-center gap-2 text-neutral-600 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
                <span>SIFS PAPER TRADING ENGINE · CALIBRATION</span>
              </div>
              <span className="skeuo-rivet" />
            </div>

            {/* Lock Crest */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md mb-4">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            {/* Title & Narrative */}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight mb-2">
              Leaderboard To Be Released Soon
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto mb-6 font-normal">
              The SIFS matching engine and campus order books are undergoing final risk latency calibration. Official real-time rankings and simulated portfolio returns will unlock upon the start of the Season 01 tournament.
            </p>

            {/* Telemetry Constraints Grid */}
            <div className="grid grid-cols-2 gap-2 text-left mb-6 font-mono text-xs">
              <div className="skeuo-chip p-2.5 rounded-xl">
                <div className="text-[10px] uppercase text-neutral-500">STARTING CAPITAL</div>
                <div className="text-sm font-bold text-neutral-900 font-number">$10,000 Demo</div>
              </div>
              <div className="skeuo-chip p-2.5 rounded-xl">
                <div className="text-[10px] uppercase text-neutral-500">MAX DRAWDOWN</div>
                <div className="text-sm font-bold text-neutral-900 font-number">1.00% Hard-Stop</div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {isNotified ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-900 border border-neutral-300 text-xs font-mono font-bold">
                  <Check size={16} />
                  <span>Launch Notification Active</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto btn-skeuo-dark font-bold text-xs font-mono px-6 py-3 rounded-xl cursor-pointer shadow-sm hover:scale-[1.01] transition-transform"
                >
                  Notify When Leaderboard Releases &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Signup Modal */}
      {isModalOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm select-none"
        >
          <div className="card-skeuo-static bg-white border border-neutral-300 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_24px_50px_rgba(0,0,0,0.25),inset_0_1.5px_0_rgba(255,255,255,1)] relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Tournament Alerts
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                  SIFS Season 01 Release Alert
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 cursor-pointer px-2 py-1"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-neutral-600 font-mono mb-4 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              Be the first to receive credentials and see live tick rankings when the ENTS paper trading engine opens for Season 01.
            </p>

            <form onSubmit={handleNotifySubmit} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@rca.ac.rw"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-skeuo-light px-4 py-2 rounded-xl text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-skeuo-dark font-bold px-5 py-2 rounded-xl cursor-pointer"
                >
                  Notify Me on Release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
