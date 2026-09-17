'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { loginAction } from '@/actions/adminActions';
import { ArrowRight, Shield } from '@/components/ui/Icons';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-neutral-100/60 relative select-none">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Main Skeuomorphic Terminal Card */}
        <div className="card-skeuo-static bg-white border border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.12),inset_0_1.5px_0_rgba(255,255,255,1)] relative overflow-hidden">
          {/* Top Hardware Accent with Corner Rivets */}
          <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-neutral-200/80 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="skeuo-rivet" />
              <span className="uppercase tracking-widest text-neutral-500 font-semibold">
                SECURE AUTH · GATEWAY 01
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-bold tracking-wider text-neutral-700 uppercase">STANDBY</span>
              <span className="skeuo-rivet ml-1.5" />
            </div>
          </div>

          {/* Brand & Terminal Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center p-2 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9)]">
              <Image
                src="/ents.svg"
                alt="ENTS Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                priority
                unoptimized
              />
            </div>
            <div>
              <h1 className="font-bold text-xl text-neutral-900 tracking-tight">
                ENTS Command Center
              </h1>
              <p className="text-xs text-neutral-500 font-mono">
                Rwanda Coding Academy · CMS Terminal
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
            Enter authorized society passkey to modify live curriculum, news dispatches, SIFS leaderboard, and venture projects.
          </p>

          {/* Form */}
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>{state.error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="passcode"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-2"
              >
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  id="passcode"
                  name="passcode"
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 font-mono text-sm shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-500 transition-all placeholder:text-neutral-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full btn-skeuo-dark font-bold text-sm font-mono py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Shield size={16} />
              <span>{isPending ? 'Verifying Credentials...' : 'Authenticate & Unlock CMS'}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Machined Footer Groove */}
          <div className="skeuo-groove px-2 pt-4 mt-6 border-t border-neutral-200/80 text-[11px] font-mono text-neutral-500 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span>SECURITY LEVEL:</span>
              <span className="font-bold text-neutral-800">LEVEL 3 ENCRYPTED</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span>DEFAULT LOCAL KEY:</span>
              <code className="bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-600">ents2026</code>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-mono text-neutral-500 hover:text-neutral-900 hover:underline transition-colors"
          >
            &larr; Return to ENTS Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

