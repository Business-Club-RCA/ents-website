'use client';

import React, { useEffect, useRef, useState } from 'react';
import { StatItem } from '@/types';

const DEFAULT_STATS: StatItem[] = [
  {
    value: '$250K+',
    label: 'simulated capital tracked',
    detail: 'Active portfolio capital in SIFS',
  },
  {
    value: '1,420+',
    label: 'trades logged',
    detail: 'Real-time paper trading journal entries',
  },
  {
    value: '48+',
    label: 'active members',
    detail: 'Across Years 1, 2, and 3 at RCA',
  },
  {
    value: '100%',
    label: 'risk discipline enforced',
    detail: 'Strict 1% maximum stop loss limits',
  },
];

interface ParsedStat {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  hasCommas: boolean;
}

function parseStatValue(raw: string): ParsedStat {
  const match = raw.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);
  if (!match) {
    return { prefix: '', target: 0, suffix: raw, decimals: 0, hasCommas: false };
  }

  const prefix = match[1] || '';
  const numStr = match[2];
  const suffix = match[3] || '';

  const hasCommas = numStr.includes(',');
  const cleanNumStr = numStr.replace(/,/g, '');
  const target = parseFloat(cleanNumStr) || 0;
  const decimals = cleanNumStr.includes('.') ? cleanNumStr.split('.')[1].length : 0;

  return { prefix, target, suffix, decimals, hasCommas };
}

function AnimatedStatValue({ value, startAnimation }: { value: string; startAnimation: boolean }) {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const parsedRef = useRef<ParsedStat>(parseStatValue(value));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    parsedRef.current = parseStatValue(value);
  }, [value]);

  useEffect(() => {
    if (!startAnimation || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const { prefix, target, suffix, decimals, hasCommas } = parsedRef.current;
    if (target === 0) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2000; // 2 seconds of graceful easing

    // Exponential ease-out for ultra smooth mechanical deceleration
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentNum = easedProgress * target;

      let formattedNumber: string;
      if (decimals > 0) {
        formattedNumber = currentNum.toFixed(decimals);
        if (hasCommas) {
          const parts = formattedNumber.split('.');
          parts[0] = parseInt(parts[0], 10).toLocaleString('en-US');
          formattedNumber = parts.join('.');
        }
      } else {
        const rounded = Math.round(currentNum);
        formattedNumber = hasCommas ? rounded.toLocaleString('en-US') : rounded.toString();
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Guarantee exact original string at completion
        setDisplayValue(value);
      }
    };

    setDisplayValue(`${prefix}0${suffix}`);
    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [startAnimation, value]);

  return <span>{displayValue}</span>;
}

export function StatsStrip({ stats = DEFAULT_STATS }: { stats?: StatItem[] }) {
  const displayStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setInView(true);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-y border-neutral-200 bg-white py-14 sm:py-20 select-none relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-neutral-200 md:divide-x divide-neutral-200">
          {displayStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-6 md:py-2"
            >
              <div className="font-number font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight text-neutral-900 leading-none tabular-nums">
                <AnimatedStatValue value={stat.value} startAnimation={inView} />
              </div>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-600 font-normal tracking-normal lowercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
