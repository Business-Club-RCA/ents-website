'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Parameters<Lenis['scrollTo']>[1]) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Initialize Lenis with slower, silky-smooth inertial scrolling physics
    const lenis = new Lenis({
      // duration: 2.2s provides a slower, more deliberate and luxurious momentum glide (default is 1.2s)
      duration: 2.2,
      // Exponential deceleration curve for natural deceleration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Lower wheelMultiplier makes each mousewheel tick advance slower and smoother
      wheelMultiplier: 0.75,
      touchMultiplier: 1.1,
      infinite: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // 2. High-performance RAF animation loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 3. Smooth handling of internal anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, { offset: -80, duration: 2.4 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 4. Scroll Reveal Observer for slower, graceful scroll-in animations
    document.documentElement.classList.add('js-scroll-reveal');

    const revealElements = document.querySelectorAll(
      '[data-reveal], .reveal-on-scroll, section > div.max-w-7xl, section > div.max-w-6xl'
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
      revealObserver.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      revealObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll smoothly on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: Parameters<Lenis['scrollTo']>[1]
  ) => {
    lenisRef.current?.scrollTo(target, {
      duration: 2.2,
      ...options,
    });
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

