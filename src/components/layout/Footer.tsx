import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { ArrowUpRight } from '@/components/ui/Icons';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-black text-3xl sm:text-4xl tracking-tighter text-black">
                ENTS
              </span>
            </Link>
            <p className="text-sm sm:text-base text-neutral-600 max-w-sm leading-relaxed">
              Entrepreneurs &amp; Traders Society — fostering venture operators and disciplined
              quantitative traders at Rwanda Coding Academy.
            </p>
            <div className="pt-2">
              <div className="inline-block text-xs font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 border border-neutral-200">
                Nyabihu, Rwanda · RCA
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  About ENTS
                </Link>
              </li>
              <li>
                <Link
                  href="/tracks"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  Tracks &amp; Curriculum
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  Ventures &amp; SIFS
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  Trading League
                </Link>
              </li>
              <li>
                <Link
                  href="/join"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  Apply to Join
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Institution */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400">
              Ecosystem &amp; Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.institution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors group"
                >
                  <span>Rwanda Coding Academy</span>
                  <ArrowUpRight
                    size={14}
                    className="text-neutral-400 group-hover:text-black transition-colors"
                  />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors group"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight
                    size={14}
                    className="text-neutral-400 group-hover:text-black transition-colors"
                  />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors group"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight
                    size={14}
                    className="text-neutral-400 group-hover:text-black transition-colors"
                  />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors group"
                >
                  <span>Instagram</span>
                  <ArrowUpRight
                    size={14}
                    className="text-neutral-400 group-hover:text-black transition-colors"
                  />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors group"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight
                    size={14}
                    className="text-neutral-400 group-hover:text-black transition-colors"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>
            © {new Date().getFullYear()} ENTS · Rwanda Coding Academy. Built by students, for students.
          </p>
          <p className="flex items-center gap-4">
            <span>High-Contrast Monochrome Edition</span>
            <span>·</span>
            <span>Nyabihu, Rwanda</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

