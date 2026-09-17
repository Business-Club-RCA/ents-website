'use client';

import React, { useState } from 'react';
import { LeaderboardEntry } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface LeaderboardTableProps {
  initialData: LeaderboardEntry[];
}

export function LeaderboardTable({ initialData }: LeaderboardTableProps) {
  const [filter, setFilter] = useState<'All' | 'Traders' | 'Business Handlers'>('All');
  const [sortBy, setSortBy] = useState<'rank' | 'pnl' | 'trades'>('rank');

  const filteredData = initialData
    .filter((entry) => (filter === 'All' ? true : entry.track === filter))
    .sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank;
      if (sortBy === 'pnl') return b.pnlPercent - a.pnlPercent;
      if (sortBy === 'trades') return b.tradesCount - a.tradesCount;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-1.5 border border-neutral-200 p-1 bg-neutral-50 text-xs font-mono">
          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1 cursor-pointer transition-colors ${
              filter === 'All' ? 'bg-black text-white font-bold' : 'text-neutral-600 hover:text-black'
            }`}
          >
            All Participants ({initialData.length})
          </button>
          <button
            onClick={() => setFilter('Traders')}
            className={`px-3 py-1 cursor-pointer transition-colors ${
              filter === 'Traders'
                ? 'bg-black text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Traders Track
          </button>
          <button
            onClick={() => setFilter('Business Handlers')}
            className={`px-3 py-1 cursor-pointer transition-colors ${
              filter === 'Business Handlers'
                ? 'bg-black text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Business Handlers
          </button>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rank' | 'pnl' | 'trades')}
            className="bg-white border border-neutral-200 px-2 py-1 text-black focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="rank">Leaderboard Rank</option>
            <option value="pnl">% Net Return</option>
            <option value="trades">Trades Count</option>
          </select>
        </div>
      </div>

      {/* Standings Table with Hairline Dividers */}
      <div className="overflow-x-auto border border-neutral-200 bg-white">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 font-mono text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4 font-semibold w-16 text-center">Rank</th>
              <th className="py-3.5 px-4 font-semibold">Participant</th>
              <th className="py-3.5 px-4 font-semibold">Track</th>
              <th className="py-3.5 px-4 font-semibold">Primary Focus</th>
              <th className="py-3.5 px-4 font-semibold text-right">Portfolio Value</th>
              <th className="py-3.5 px-4 font-semibold text-right">% Change</th>
              <th className="py-3.5 px-4 font-semibold text-right hidden md:table-cell">Trades</th>
              <th className="py-3.5 px-4 font-semibold text-center hidden sm:table-cell">Win Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 text-xs sm:text-sm tabular-nums">
            {filteredData.map((item) => {
              const isPositive = item.pnlPercent >= 0;
              return (
                <tr
                  key={item.name}
                  className="hover:bg-neutral-50/80 transition-colors group"
                >
                  <td className="py-4 px-4 text-center font-bold text-black">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 ${
                        item.rank === 1
                          ? 'bg-black text-white font-black'
                          : item.rank === 2
                          ? 'border border-black font-bold'
                          : item.rank === 3
                          ? 'border border-neutral-400 font-semibold'
                          : 'text-neutral-500'
                      }`}
                    >
                      {String(item.rank).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-black text-sm">{item.name}</div>
                    <div className="text-xs text-neutral-400 font-mono">{item.classYear}</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={item.track === 'Traders' ? 'dark' : 'neutral'}>
                      {item.track}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-neutral-600 font-mono text-xs">
                    {item.assetClass}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-black">
                    ${item.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-4 text-right font-bold">
                    <span
                      className={`inline-block px-2 py-0.5 border ${
                        isPositive
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      {isPositive ? `+${item.pnlPercent.toFixed(2)}%` : `${item.pnlPercent.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-neutral-500 hidden md:table-cell">
                    {item.tradesCount}
                  </td>
                  <td className="py-4 px-4 text-center text-neutral-600 hidden sm:table-cell">
                    {item.winRate.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Notes */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-500 pt-2 gap-2">
        <span>* Standings updated real-time through the SIFS Execution API.</span>
        <span className="font-mono">SIMULATION LEAGUE // RWANDA CODING ACADEMY</span>
      </div>
    </div>
  );
}
