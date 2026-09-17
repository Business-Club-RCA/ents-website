import { StatItem } from '@/types';

const DEFAULT_STATS: StatItem[] = [
  {
    value: '$250K+',
    label: 'simulated capital tracked',
    detail: 'Active portfolio capital in SIFS',
  },
  {
    value: '1,420+',
    label: 'trades logged',
    detail: 'Real-time paper trading journal entries',
  },
  {
    value: '48+',
    label: 'active members',
    detail: 'Across Years 1, 2, and 3 at RCA',
  },
  {
    value: '100%',
    label: 'risk discipline enforced',
    detail: 'Strict 1% maximum stop loss limits',
  },
];

export function StatsStrip({ stats = DEFAULT_STATS }: { stats?: StatItem[] }) {
  const displayStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <section className="border-y border-neutral-200 bg-white py-14 sm:py-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-neutral-200 md:divide-x divide-neutral-200">
          {displayStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-6 md:py-2"
            >
              <div className="font-number font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight text-neutral-900 leading-none">
                {stat.value}
              </div>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-600 font-normal tracking-normal lowercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
