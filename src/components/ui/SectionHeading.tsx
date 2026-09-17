import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  size?: 'default' | 'large';
}

export function SectionHeading({
  kicker,
  title,
  description,
  centered = false,
  className = '',
  size = 'default',
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 sm:mb-14 ${centered ? 'text-center' : ''} ${className}`}>
      {kicker && (
        <div className="text-xs uppercase tracking-widest font-mono text-neutral-500 mb-3 select-none">
          {kicker}
        </div>
      )}
      <h2
        className={`font-bold tracking-tighter text-neutral-900 ${
          size === 'large'
            ? 'text-3xl sm:text-5xl lg:text-6xl leading-[1.08]'
            : 'text-2xl sm:text-4xl lg:text-5xl leading-[1.12]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed ${
            centered ? 'mx-auto' : ''
          } max-w-3xl`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

