'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface ProfileAvatarProps {
  src?: string | null;
  name: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Deterministic hash for selecting consistent executive palettes and styles
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < (str || '').length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Professional Executive Avatar (Zero cartoonish elements)
 * Designed for institutional, quant, and venture society standards:
 * - Sophisticated executive gradients (obsidian slate, deep titanium, executive navy, emerald graphite)
 * - Sculpted professional silhouette contour
 * - Crisp, high-contrast typography monogram
 * - Precision inset rim lighting and subtle tactile depth
 */
function ProfessionalExecutiveAvatar({
  name,
  initials,
}: {
  name: string;
  initials?: string;
}) {
  const hash = hashString(name || 'ENTS');

  // Executive palette selection (Institutional & Sleek)
  const executivePalettes = [
    {
      id: 'obsidian-slate',
      bgTop: '#1e293b',
      bgBottom: '#0f172a',
      glow: '#38bdf8',
      silhouette: '#334155',
      collar: '#475569',
      text: '#f8fafc',
    },
    {
      id: 'charcoal-titanium',
      bgTop: '#27272a',
      bgBottom: '#18181b',
      glow: '#a1a1aa',
      silhouette: '#3f3f46',
      collar: '#52525b',
      text: '#fafafa',
    },
    {
      id: 'executive-navy',
      bgTop: '#1e3a8a',
      bgBottom: '#0f172a',
      glow: '#60a5fa',
      silhouette: '#1e40af',
      collar: '#2563eb',
      text: '#ffffff',
    },
    {
      id: 'deep-emerald',
      bgTop: '#064e3b',
      bgBottom: '#022c22',
      glow: '#34d399',
      silhouette: '#065f46',
      collar: '#047857',
      text: '#ecfdf5',
    },
    {
      id: 'onyx-bronze',
      bgTop: '#451a03',
      bgBottom: '#1c1917',
      glow: '#f59e0b',
      silhouette: '#78350f',
      collar: '#92400e',
      text: '#fef3c7',
    },
    {
      id: 'regal-indigo',
      bgTop: '#312e81',
      bgBottom: '#0f172a',
      glow: '#818cf8',
      silhouette: '#3730a3',
      collar: '#4338ca',
      text: '#e0e7ff',
    },
  ];

  const palette = executivePalettes[hash % executivePalettes.length];

  // Derive 1 or 2 uppercase initials
  const displayInitials = (() => {
    if (initials && initials.trim()) return initials.trim().slice(0, 2).toUpperCase();
    const parts = (name || 'Member').trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return (parts[0] || 'M').slice(0, 2).toUpperCase();
  })();

  const gradId = `exec-grad-${hash % 1000}`;
  const glowId = `exec-glow-${hash % 1000}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full select-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${name} executive avatar`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.bgTop} />
          <stop offset="100%" stopColor={palette.bgBottom} />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.28" />
          <stop offset="60%" stopColor={palette.glow} stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Deep Executive Background */}
      <rect width="100" height="100" fill={`url(#${gradId})`} />

      {/* Subtle Studio Keylight */}
      <rect width="100" height="100" fill={`url(#${glowId})`} />

      {/* Precision Micro Grid (Institutional Subtlety) */}
      <g stroke="white" strokeWidth="0.5" opacity="0.05">
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="50" y1="0" x2="50" y2="100" />
      </g>

      {/* Sculpted Professional Silhouette Bust */}
      <g opacity="0.4">
        {/* Shoulders & Suit contour */}
        <path
          d="M 12 100 C 14 74, 30 68, 50 68 C 70 68, 86 74, 88 100 Z"
          fill={palette.silhouette}
        />
        {/* Collar line */}
        <path
          d="M 40 68 L 50 80 L 60 68"
          stroke={palette.collar}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Neck */}
        <rect x="44" y="52" width="12" height="18" rx="2" fill={palette.silhouette} />
        {/* Head Contour */}
        <ellipse cx="50" cy="42" rx="16" ry="20" fill={palette.silhouette} />
      </g>

      {/* Central Monogram Crest Shield */}
      <circle
        cx="50"
        cy="45"
        r="22"
        fill="#0b0f19"
        fillOpacity="0.82"
        stroke="white"
        strokeWidth="1.2"
        strokeOpacity="0.25"
      />
      <circle
        cx="50"
        cy="45"
        r="19.5"
        fill="none"
        stroke={palette.glow}
        strokeWidth="0.75"
        strokeOpacity="0.4"
      />

      {/* Initials in crisp geometric monospaced typeface */}
      <text
        x="50"
        y="45"
        textAnchor="middle"
        dominantBaseline="central"
        fill={palette.text}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontWeight="700"
        fontSize={displayInitials.length > 1 ? '16' : '19'}
        letterSpacing="0.08em"
      >
        {displayInitials}
      </text>

      {/* Hairline Outer Inset Ring */}
      <rect
        x="0.75"
        y="0.75"
        width="98.5"
        height="98.5"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.12"
      />
    </svg>
  );
}

export function ProfileAvatar({
  src,
  name,
  initials,
  size = 'md',
  className = '',
}: ProfileAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const pixelSizes = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const hasCustomImage =
    Boolean(src && src.trim()) &&
    !src?.includes('dicebear') &&
    !src?.includes('placeholder') &&
    !imageError;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-sm ${sizeClasses[size]} ${className}`}
    >
      {hasCustomImage ? (
        /* Real Photo (when uploaded or configured) */
        <Image
          src={src!}
          alt={name}
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="w-full h-full object-cover object-center"
          onError={() => setImageError(true)}
          unoptimized={src?.startsWith('http://') || src?.startsWith('https://')}
        />
      ) : (
        /* Institutional Executive Avatar */
        <ProfessionalExecutiveAvatar name={name} initials={initials} />
      )}
    </div>
  );
}
