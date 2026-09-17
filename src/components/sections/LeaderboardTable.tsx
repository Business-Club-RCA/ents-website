'use client';

import React, { useState } from 'react';
import { LeaderboardEntry } from '@/types';

interface LeaderboardTableProps {
  initialData: LeaderboardEntry[];
}

type FilterOption = 'All' | 'Traders' | 'Business Handlers' | 'Top3' | 'HighWinRate';

export function LeaderboardTable({ initialData }: LeaderboardTableProps) {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'pnl' | 'trades'>('rank');

  const filteredData = initialData
    .filter((entry) => {
      // Filter tab logic
      if (filter === 'Traders' && entry.track !== 'Traders') return false;
      if (filter === 'Business Handlers' && entry.track !== 'Business Handlers') return false;
      if (filter === 'Top3' && entry.rank > 3) return false;
      if (filter === 'HighWinRate' && entry.winRate < 60) return false;

      // Search query logic
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

  return (
    <div className="space-y-6">
      {/* Control Strip: Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        {/* Search Bar */}
        <div className="relative w-full sm:w-64 lg:w-72">
          <input
            type="text"
            placeholder="Search trader or asset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-900"
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
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-200/50 rounded-xl border border-neutral-300/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] text-xs font-mono">
          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              filter === 'All' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            All ({initialData.length})
          </button>
          <button
            onClick={() => setFilter('Top3')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              filter === 'Top3' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Podium (Top 3)
          </button>
          <button
            onClick={() => setFilter('HighWinRate')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              filter === 'HighWinRate' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Win Rate &gt; 60%
          </button>
          <button
            onClick={() => setFilter('Traders')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              filter === 'Traders' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Traders
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 self-start sm:self-auto">
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rank' | 'pnl' | 'trades')}
            className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
          >
            <option value="rank">Rank (#1 first)</option>
            <option value="pnl">% Net Return</option>
            <option value="trades">Trade Count</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="card-skeuo-static rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-mono text-neutral-500">
                    No participants match this query.
                  </td>
                </tr>
              ) : (
                filteredData.map((entry) => {
                  const isTop1 = entry.rank === 1;
                  const isTop2 = entry.rank === 2;
                  const isTop3 = entry.rank === 3;

                  return (
                    <tr
                      key={entry.name}
                      className="hover:bg-neutral-50/70 transition-colors group"
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center justify-center font-bold text-xs rounded-lg px-2 py-0.5 font-number ${
                            isTop1
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold shadow-sm'
                              : isTop2
                              ? 'bg-neutral-200 text-neutral-800 border border-neutral-300 font-bold'
                              : isTop3
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'text-neutral-500 font-mono'
                          }`}
                        >
                          {entry.rank < 10 ? `#0${entry.rank}` : `#${entry.rank}`}
                        </span>
                      </td>

                      {/* Participant */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-900 group-hover:text-neutral-950">
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
