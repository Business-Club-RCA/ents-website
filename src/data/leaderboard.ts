import { LeaderboardEntry } from '@/types';

export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Aline Umutoni',
    classYear: 'Year 3',
    track: 'Traders',
    assetClass: 'EUR/USD & Gold (XAU)',
    portfolioValue: 13425.8,
    initialValue: 10000.0,
    pnlPercent: 34.26,
    tradesCount: 42,
    winRate: 66.7,
    status: 'Active',
  },
  {
    rank: 2,
    name: 'Kevine Ishimwe',
    classYear: 'Year 2',
    track: 'Traders',
    assetClass: 'GBP/JPY & US100',
    portfolioValue: 12890.45,
    initialValue: 10000.0,
    pnlPercent: 28.9,
    tradesCount: 38,
    winRate: 63.2,
    status: 'Active',
  },
  {
    rank: 3,
    name: 'Cedric Mugisha',
    classYear: 'Year 3',
    track: 'Business Handlers',
    assetClass: 'US30 & USD/CAD',
    portfolioValue: 12150.0,
    initialValue: 10000.0,
    pnlPercent: 21.5,
    tradesCount: 29,
    winRate: 58.6,
    status: 'Active',
  },
  {
    rank: 4,
    name: 'Patrick Byiringiro',
    classYear: 'Year 1',
    track: 'Traders',
    assetClass: 'XAU/USD & EUR/JPY',
    portfolioValue: 11720.15,
    initialValue: 10000.0,
    pnlPercent: 17.2,
    tradesCount: 51,
    winRate: 54.9,
    status: 'Active',
  },
  {
    rank: 5,
    name: 'Divine Uwase',
    classYear: 'Year 3',
    track: 'Traders',
    assetClass: 'Algorithmic FX Pairs',
    portfolioValue: 11480.9,
    initialValue: 10000.0,
    pnlPercent: 14.81,
    tradesCount: 88,
    winRate: 52.3,
    status: 'Active',
  },
  {
    rank: 6,
    name: 'Jean-Paul Habimana',
    classYear: 'Year 2',
    track: 'Business Handlers',
    assetClass: 'S&P 500 & Oil',
    portfolioValue: 10940.3,
    initialValue: 10000.0,
    pnlPercent: 9.4,
    tradesCount: 22,
    winRate: 59.1,
    status: 'Active',
  },
  {
    rank: 7,
    name: 'Grace Mutoniwase',
    classYear: 'Year 1',
    track: 'Traders',
    assetClass: 'GBP/USD & AUD/USD',
    portfolioValue: 10450.0,
    initialValue: 10000.0,
    pnlPercent: 4.5,
    tradesCount: 31,
    winRate: 51.6,
    status: 'Active',
  },
  {
    rank: 8,
    name: 'David Nshimiyimana',
    classYear: 'Year 2',
    track: 'Business Handlers',
    assetClass: 'EUR/GBP & NZD/USD',
    portfolioValue: 10120.6,
    initialValue: 10000.0,
    pnlPercent: 1.21,
    tradesCount: 19,
    winRate: 47.4,
    status: 'Active',
  },
  {
    rank: 9,
    name: 'Emmanuel Kwizera',
    classYear: 'Year 2',
    track: 'Traders',
    assetClass: 'Forex Majors',
    portfolioValue: 9810.0,
    initialValue: 10000.0,
    pnlPercent: -1.9,
    tradesCount: 35,
    winRate: 42.8,
    status: 'Active',
  },
  {
    rank: 10,
    name: 'Sandrine Irakoze',
    classYear: 'Year 1',
    track: 'Traders',
    assetClass: 'Gold & Indices',
    portfolioValue: 9450.2,
    initialValue: 10000.0,
    pnlPercent: -5.5,
    tradesCount: 44,
    winRate: 40.9,
    status: 'Active',
  },
];

/**
 * Fetcher helper designed to allow effortless replacement with
 * a live Google Sheets CSV endpoint or an internal Next.js API route.
 *
 * Example Google Sheet CSV URL:
 * `https://docs.google.com/spreadsheets/d/<ID>/export?format=csv`
 */
export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  // To connect a live Google Sheet in production:
  // if (process.env.LEADERBOARD_SHEET_CSV_URL) {
  //   const res = await fetch(process.env.LEADERBOARD_SHEET_CSV_URL, { next: { revalidate: 300 } });
  //   const csvText = await res.text();
  //   return parseLeaderboardCsv(csvText);
  // }

  return Promise.resolve(mockLeaderboardData);
}

/**
 * Utility to parse CSV rows if connected to Google Sheets in future iterations.
 */
export function parseLeaderboardCsv(csv: string): LeaderboardEntry[] {
  const lines = csv.trim().split('\n').slice(1); // skip header
  return lines.map((line, index) => {
    const [name, classYear, track, assetClass, portfolioValue, pnlPercent, tradesCount, winRate] =
      line.split(',').map((val) => val.trim().replace(/^"|"$/g, ''));

    const valNum = parseFloat(portfolioValue) || 10000;
    const pnlNum = parseFloat(pnlPercent) || 0;

    return {
      rank: index + 1,
      name: name || `Trader ${index + 1}`,
      classYear: classYear || 'Year 1',
      track: (track === 'Business Handlers' ? 'Business Handlers' : 'Traders') as 'Traders' | 'Business Handlers',
      assetClass: assetClass || 'Global FX',
      portfolioValue: valNum,
      initialValue: 10000,
      pnlPercent: pnlNum,
      tradesCount: parseInt(tradesCount, 10) || 0,
      winRate: parseFloat(winRate) || 50.0,
      status: 'Active',
    };
  });
}

