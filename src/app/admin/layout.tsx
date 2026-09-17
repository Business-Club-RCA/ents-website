import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { isAuthenticated } from '@/lib/auth';
import { logoutAction } from '@/actions/adminActions';
import { ArrowRight } from '@/components/ui/Icons';

export const metadata = {
  title: 'Admin Control Center | ENTS Rwanda Coding Academy',
  description: 'Manage ENTS dynamic curriculum, ventures, updates, leaderboard, and cohort applications.',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  // For unauthenticated views (like /admin/login), render clean container
  if (!authed) {
    return <div className="min-h-screen bg-neutral-100/60 font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-100/70 text-neutral-900 flex flex-col font-sans">
      {/* Top Administration Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 flex items-center justify-center p-1.5 shadow-sm">
                <Image
                  src="/ents.svg"
                  alt="ENTS Logo"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain invert brightness-200"
                />
              </div>
              <div>
                <span className="font-bold text-sm text-neutral-900 tracking-tight flex items-center gap-2">
                  <span>ENTS CMS</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-100 border border-neutral-200 text-neutral-600">
                    CONTROL PANEL
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* Quick External Public Site Switcher & Status */}
          <div className="hidden md:flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100/80 border border-neutral-200 text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>LIVE DATABASE: ACTIVE</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1 rounded-lg border border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
            >
              <span>View Public Site</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Admin Profile & Logout */}
          <div className="flex items-center gap-3">
            <form action={logoutAction}>
              <button
                type="submit"
                className="btn-skeuo-light text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl cursor-pointer hover:text-red-700 transition-colors"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main CMS Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* CMS Footer */}
      <footer className="border-t border-neutral-200/80 bg-white py-4 text-center text-xs font-mono text-neutral-400">
        ENTS CMS System &middot; Rwanda Coding Academy &middot; Nyabihu Western Province
      </footer>
    </div>
  );
}

