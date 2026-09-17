import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface TestimonialCard {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  badgeBg: string;
  badgeIcon: React.ReactNode;
}

const SIDE_TESTIMONIALS: TestimonialCard[] = [
  {
    quote:
      '"From campus prototypes to live order routing 🚀, ENTS is a must-have. I can\'t ❤️ imagine analyzing markets without SIFS!"',
    author: 'Aline Umutoni',
    role: 'VP & Quantitative Trader',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    badgeBg: 'bg-orange-500 text-white',
    badgeIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    quote:
      '"Strict 1% risk guardrails 🌐, automated backtesting, and top-notch 🎯 peer audits. ENTS has it all."',
    author: 'David Nshimiyimana',
    role: 'Treasury Lead at KuraPay',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    badgeBg: 'bg-indigo-600 text-white',
    badgeIcon: (
      <span className="font-bold text-xs font-mono">S</span>
    ),
  },
  {
    quote:
      '"The weekly pitch teardowns and pro-forma forecasting ⚡ prepared our team directly for institutional venture capital."',
    author: 'Grace Mukamana',
    role: 'Full-Stack Venture Engineer',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    badgeBg: 'bg-emerald-600 text-white',
    badgeIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50/40 border-b border-neutral-200 relative overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Story Copy */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>03 · Member Validation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-neutral-900 leading-[1.06]">
              Trusted by Over <br className="hidden sm:inline" />
              15k+ Satisfied <br className="hidden sm:inline" />
              Builders
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed max-w-sm font-normal">
              ENTS has helped student founders and quantitative analysts across Rwanda Coding Academy turn raw code into validated ventures, disciplined trading strategies, and career-defining portfolios.
            </p>
          </div>

          {/* Middle Column: Large Feature Portrait Card with Bottom Overlay */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-md h-[460px] sm:h-[500px] lg:h-[520px] rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-neutral-200/80 group">
              {/* Feature Portrait Image */}
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85"
                alt="Cedric Mugisha, ENTS President"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                priority={false}
              />

              {/* Bottom Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent flex flex-col justify-end p-6 sm:p-7 text-white select-none">
                <blockquote className="text-base sm:text-lg font-medium leading-snug mb-3 drop-shadow-sm text-white/95">
                  &ldquo;ENTS has completely transformed our engineering workflow into production ventures!&rdquo;
                </blockquote>
                <div>
                  <div className="font-bold text-sm sm:text-base text-white tracking-tight">
                    Cedric Mugisha
                  </div>
                  <div className="text-xs text-neutral-300 font-mono mt-0.5">
                    President at ENTS &middot; Founder at KuraPay
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stack of Floating White Testimonial Cards */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-4">
            {SIDE_TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] card-hover flex flex-col justify-between space-y-3.5"
              >
                {/* Quote with Emoji */}
                <p className="text-xs sm:text-[13px] text-neutral-700 font-medium leading-relaxed">
                  {item.quote}
                </p>

                {/* 5 Orange Stars */}
                <div className="flex items-center gap-1 text-orange-500 text-sm leading-none" aria-label="5 out of 5 stars">
                  {'★★★★★'}
                </div>

                {/* Author row with Avatar + Info + Company Icon Badge */}
                <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                      <Image
                        src={item.avatarUrl}
                        alt={item.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                        {item.author}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono leading-tight mt-0.5">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  {/* Brand Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 ${item.badgeBg}`}
                  >
                    {item.badgeIcon}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

