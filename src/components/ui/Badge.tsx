import React from 'react';
import { ProjectStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: ProjectStatus | 'neutral' | 'outline' | 'dark';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const variantClasses = {
    Live: 'bg-black text-white border-black font-semibold',
    'In Development': 'bg-neutral-100 text-neutral-800 border-neutral-300 font-medium',
    Planned: 'bg-white text-neutral-500 border-neutral-200 font-normal',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    outline: 'bg-white text-neutral-900 border-neutral-300',
    dark: 'bg-black text-white border-black',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs tracking-tight border ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

