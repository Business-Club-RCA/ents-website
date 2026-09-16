'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Check } from '@/components/ui/Icons';
import { JoinApplication } from '@/types';

export function ApplicationForm() {
  const [formData, setFormData] = useState<JoinApplication>({
    fullName: '',
    email: '',
    classYear: 'Year 1 (Intake 7)',
    preferredTrack: 'business-handlers',
    reason: '',
    experienceOrSkills: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JoinApplication, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof JoinApplication, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your real full name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.reason.trim()) {
      errs.reason = 'Please share why you want to join ENTS.';
    } else if (formData.reason.trim().length < 30) {
      errs.reason = 'Please write at least a couple sentences (min. 30 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate async network submission + console logging
    setTimeout(() => {
      console.log('----------------------------------------------------');
      console.log('📋 [ENTS Application Submitted]');
      console.log('Applicant Name:', formData.fullName);
      console.log('Email:', formData.email);
      console.log('Cohort/Year:', formData.classYear);
      console.log('Preferred Track:', formData.preferredTrack);
      console.log('Reason for Joining:', formData.reason);
      console.log('Skills/Background:', formData.experienceOrSkills || 'N/A');
      console.log('Submitted At:', new Date().toISOString());
      console.log('----------------------------------------------------');

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof JoinApplication]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="border border-neutral-300 bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="w-14 h-14 bg-black text-white flex items-center justify-center mx-auto">
          <Check size={28} />
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-2xl sm:text-3xl tracking-tighter text-black">
            Application Received
          </h3>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Thank you, <span className="font-semibold text-black">{formData.fullName}</span>. Your
            candidacy for the{' '}
            <span className="font-semibold text-black capitalize">
              {formData.preferredTrack.replace('-', ' ')}
            </span>{' '}
            track has been logged.
          </p>
        </div>

        <div className="border-t border-b border-neutral-200 py-4 text-xs font-mono text-neutral-500 text-left space-y-1 bg-neutral-50 p-4">
          <div>COHORT: {formData.classYear}</div>
          <div>REGISTERED EMAIL: {formData.email}</div>
          <div>STATUS: QUEUED FOR INTERVIEW SPRINT</div>
        </div>

        <p className="text-xs text-neutral-500">
          The leadership team will review applications ahead of the Friday pitch session. Check your
          inbox or reach out via <span className="font-mono text-black">ents@rca.ac.rw</span>.
        </p>

        <div className="pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                email: '',
                classYear: 'Year 1 (Intake 7)',
                preferredTrack: 'business-handlers',
                reason: '',
                experienceOrSkills: '',
              });
            }}
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-neutral-200 bg-white p-6 sm:p-10 max-w-2xl mx-auto space-y-6"
    >
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="font-bold text-xl sm:text-2xl tracking-tighter text-black">
          Club Membership Application
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Open to all current Rwanda Coding Academy students across all cohorts.
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-1.5">
        <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-black">
          Full Name <span className="text-neutral-400">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g. Cedric Mugisha"
          className={`w-full px-3.5 py-2.5 text-sm border bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
            errors.fullName ? 'border-black bg-neutral-50' : 'border-neutral-300 focus:border-black'
          }`}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-xs font-mono text-black mt-1">
            ⚠ {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-black">
          School Email or Personal Email <span className="text-neutral-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. c.mugisha@rca.ac.rw"
          className={`w-full px-3.5 py-2.5 text-sm border bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
            errors.email ? 'border-black bg-neutral-50' : 'border-neutral-300 focus:border-black'
          }`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs font-mono text-black mt-1">
            ⚠ {errors.email}
          </p>
        )}
      </div>

      {/* Class / Year at RCA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="classYear" className="block text-xs font-mono uppercase tracking-wider text-black">
            RCA Intake / Class <span className="text-neutral-400">*</span>
          </label>
          <select
            id="classYear"
            name="classYear"
            value={formData.classYear}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
          >
            <option value="Year 1 (Intake 7)">Year 1 (Intake 7)</option>
            <option value="Year 2 (Intake 6)">Year 2 (Intake 6)</option>
            <option value="Year 3 (Intake 5)">Year 3 (Intake 5)</option>
            <option value="Alumni / Faculty">Alumni / Faculty Mentor</option>
          </select>
        </div>

        {/* Preferred Track */}
        <div className="space-y-1.5">
          <label htmlFor="preferredTrack" className="block text-xs font-mono uppercase tracking-wider text-black">
            Preferred Track <span className="text-neutral-400">*</span>
          </label>
          <select
            id="preferredTrack"
            name="preferredTrack"
            value={formData.preferredTrack}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
          >
            <option value="business-handlers">Business Handlers (Ventures &amp; Operations)</option>
            <option value="traders">Traders (Forex, Markets &amp; League)</option>
            <option value="undecided">Dual / Undecided (Attend Both Orientations)</option>
          </select>
        </div>
      </div>

      {/* Why do you want to join? */}
      <div className="space-y-1.5">
        <label htmlFor="reason" className="block text-xs font-mono uppercase tracking-wider text-black">
          Why do you want to join ENTS? <span className="text-neutral-400">*</span>
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={4}
          value={formData.reason}
          onChange={handleChange}
          placeholder="Tell us what excites you about business, quantitative markets, or building ventures at RCA..."
          className={`w-full px-3.5 py-2.5 text-sm border bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
            errors.reason ? 'border-black bg-neutral-50' : 'border-neutral-300 focus:border-black'
          }`}
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? 'reason-error' : undefined}
        />
        {errors.reason && (
          <p id="reason-error" className="text-xs font-mono text-black mt-1">
            ⚠ {errors.reason}
          </p>
        )}
      </div>

      {/* Prior Experience or Code/Math Skills */}
      <div className="space-y-1.5">
        <label htmlFor="experienceOrSkills" className="block text-xs font-mono uppercase tracking-wider text-black">
          Prior Projects, Code Stack, or Interests <span className="text-neutral-400">(Optional)</span>
        </label>
        <textarea
          id="experienceOrSkills"
          name="experienceOrSkills"
          rows={2}
          value={formData.experienceOrSkills}
          onChange={handleChange}
          placeholder="e.g. Next.js, Python Pandas, pitched an idea at school hackathon, followed forex charts..."
          className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
        />
      </div>

      {/* Submission CTA */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application to ENTS'}
        </Button>
        <p className="text-[11px] font-mono text-neutral-400 text-center mt-3">
          No dues required. Review takes 48 hours. Validated on client and logged to session console.
        </p>
      </div>
    </form>
  );
}

