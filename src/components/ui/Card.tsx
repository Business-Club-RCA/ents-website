import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padded?: boolean;
}

export function Card({
  children,
  className = '',
  hoverable = false,
  padded = true,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 transition-all duration-200 ${
        padded ? 'p-6 sm:p-8' : ''
      } ${
        hoverable
          ? 'hover:border-black hover:bg-neutral-50/40 cursor-default'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

