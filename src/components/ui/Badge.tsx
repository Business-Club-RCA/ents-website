import React from 'react';
import { ProjectStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: ProjectStatus | 'neutral' | 'outline' | 'dark';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const variantClasses = {
    Live: 'bg-neutral-950 text-white border-neutral-800 font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
    'In Development': 'bg-amber-50 text-amber-900 border-amber-200/90 font-medium',
    Planned: 'bg-white text-neutral-600 border-neutral-200 font-normal shadow-[inset_0_1px_0_rgba(255,255,255,1)]',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] font-medium',
    outline: 'bg-white text-neutral-900 border-neutral-200 shadow-[inset_0_1px_0_rgba(255,255,255,1)] font-medium',
    dark: 'bg-neutral-950 text-white border-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] font-semibold',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs tracking-tight rounded-lg border ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

