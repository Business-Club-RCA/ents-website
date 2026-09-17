import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://ents.rca.ac.rw'),
  title: {
    default: 'ENTS · Rwanda Coding Academy Business & Trading Society',
    template: '%s | ENTS · Rwanda Coding Academy',
  },
  description:
    'The premier student business & trading society at Rwanda Coding Academy (RCA). Incubating software ventures, mastering financial markets, and building the Student Investment Fund Simulator.',
  keywords: [
    'Rwanda Coding Academy',
    'RCA Nyabihu',
    'ENTS',
    'Student Business Club',
    'Quantitative Trading League',
    'Paper Trading',
    'Fintech',
    'Venture Incubation',
    'Rwanda Tech',
  ],
  authors: [{ name: 'ENTS Leadership Team' }],
  creator: 'Rwanda Coding Academy Students',
  openGraph: {
    title: 'ENTS · Rwanda Coding Academy Business & Trading Society',
    description:
      'Where Code Meets Capital: Student venture incubation and quantitative paper trading league at Rwanda Coding Academy.',
    url: 'https://ents.rca.ac.rw',
    siteName: 'ENTS Rwanda Coding Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENTS · Rwanda Coding Academy',
    description:
      'Student venture incubation and quantitative paper trading league at Rwanda Coding Academy.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/ents-tab.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/ents-tab.svg',
    apple: '/ents-tab.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
