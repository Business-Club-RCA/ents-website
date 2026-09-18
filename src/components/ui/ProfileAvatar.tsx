'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserIcon } from '@/components/ui/Icons';

interface ProfileAvatarProps {
  src?: string | null;
  name: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ProfileAvatar({
  src,
  name,
  initials,
  size = 'md',
  className = '',
}: ProfileAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const fallbackInitials =
    initials ||
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  // Size configurations
  const sizeStyles = {
    sm: {
      container: 'w-11 h-11 sm:w-12 sm:h-12',
      iconSize: 22,
      textSize: 'text-[11px]',
      sizes: '48px',
    },
    md: {
      container: 'w-14 h-14 sm:w-16 sm:h-16',
      iconSize: 28,
      textSize: 'text-sm',
      sizes: '64px',
    },
    lg: {
      container: 'w-24 h-24 sm:w-28 sm:h-28',
      iconSize: 44,
      textSize: 'text-lg',
      sizes: '112px',
    },
    xl: {
      container: 'w-28 h-28 sm:w-32 sm:h-32',
      iconSize: 52,
      textSize: 'text-xl',
      sizes: '128px',
    },
  }[size];

  const hasValidImage = Boolean(src && src.trim().length > 0 && !imgError);

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 select-none ${sizeStyles.container} ${className}`}
    >
      {hasValidImage ? (
        <Image
          src={src!}
          alt={name}
          fill
          sizes={sizeStyles.sizes}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        /* Real profile icon picture fallback with tactile skeuomorphic styling */
        <div className="w-full h-full bg-gradient-to-b from-neutral-100 to-neutral-200/90 border border-neutral-300/80 flex flex-col items-center justify-center relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] group-hover:from-neutral-50 group-hover:to-neutral-150 transition-colors">
          <div className="text-neutral-400 group-hover:text-neutral-500 transition-colors">
            <UserIcon size={sizeStyles.iconSize} />
          </div>
          {fallbackInitials && (
            <span
              className={`absolute bottom-1 right-1 font-mono font-bold ${sizeStyles.textSize} px-1.5 py-0.5 rounded-full bg-neutral-900/80 text-white shadow-xs leading-none`}
            >
              {fallbackInitials}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

