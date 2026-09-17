import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ApplicationForm } from '@/components/sections/ApplicationForm';
import { PageHero } from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Apply to Join ENTS',
  description:
    'Submit your application for the ENTS business club at Rwanda Coding Academy. Open to students passionate about building ventures and quantitative trading.',
};

export default function JoinPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner with Cinematic Image */}
      <PageHero
        kicker="Membership Intake"
        title="Join the Society"
        description="We are seeking dedicated student engineers, venture operators, and quantitative market analysts from Rwanda Coding Academy. Cohort admissions reviewed weekly."
      />

      <div className="py-16 sm:py-20 bg-white">
        <Container size="default">
          <ApplicationForm />
        </Container>
      </div>

      {/* Onboarding Timeline */}
      <section className="border-t border-neutral-200 bg-neutral-50/50 py-16 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                Timeline &amp; Process
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-2">
                What happens after you apply?
              </h3>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                We review applications weekly to ensure high-touch mentoring during venture teardowns and trading audits.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="card-hover border border-neutral-200/90 rounded-2xl bg-white p-6 space-y-2.5">
                <div className="font-mono text-xs text-neutral-400 font-semibold">STEP 01</div>
                <h4 className="font-bold text-neutral-900 text-base">Application Review</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  The executive committee reviews your motivation and technical background within 48 hours.
                </p>
              </div>

              <div className="card-hover border border-neutral-200/90 rounded-2xl bg-white p-6 space-y-2.5">
                <div className="font-mono text-xs text-neutral-400 font-semibold">STEP 02</div>
                <h4 className="font-bold text-neutral-900 text-base">Orientation Session</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Attend the Friday intro briefing to meet track leads and receive your SIFS paper trading credentials.
                </p>
              </div>

              <div className="card-hover border border-neutral-200/90 rounded-2xl bg-white p-6 space-y-2.5">
                <div className="font-mono text-xs text-neutral-400 font-semibold">STEP 03</div>
                <h4 className="font-bold text-neutral-900 text-base">Sprint Assignment</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Join a venture squad or enter the next weekly league tournament with your $10,000 demo portfolio.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
