import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 tracking-tight',
    md: 'text-sm px-5 py-2.5 gap-2 tracking-tight',
    lg: 'text-base px-7 py-3.5 gap-2.5 tracking-tight font-semibold',
  }[size];

  const variantStyles = {
    primary:
      'bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 border border-black',
    secondary:
      'bg-neutral-100 text-black hover:bg-neutral-200 active:bg-neutral-300 border border-neutral-200',
    outline:
      'bg-white text-black border border-neutral-300 hover:border-black hover:bg-neutral-50 active:bg-neutral-100',
    ghost:
      'bg-transparent text-black hover:bg-neutral-100 active:bg-neutral-200',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

