'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Briefcase, TrendingUp, Check } from '@/components/ui/Icons';
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
      errs.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.reason.trim()) {
      errs.reason = 'Please share your motivation for joining.';
    } else if (formData.reason.trim().length < 20) {
      errs.reason = 'Please write at least 20 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
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
      <div className="card-hover max-w-xl mx-auto p-8 sm:p-10 rounded-2xl border border-neutral-200 bg-white text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 bg-neutral-900 text-white rounded-2xl mx-auto flex items-center justify-center shadow-sm">
          <Check size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900">
            Application Confirmed
          </h3>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
            Thank you, <strong className="text-neutral-900">{formData.fullName}</strong>. Your intake submission for the{' '}
            <strong className="text-neutral-900">
              {formData.preferredTrack === 'business-handlers' ? 'Business Handlers' : 'Traders'}
            </strong>{' '}
            cohort is received. SIFS credentials and orientation details will be sent to{' '}
            <span className="font-mono text-xs text-neutral-800">{formData.email}</span>.
          </p>
        </div>
        <div className="pt-2">
          <Button
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
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {/* 1. Track Selection Cards */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-3 font-semibold">
          Select Preferred Specialization Track *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Business Handlers */}
          <div
            onClick={() => setFormData((prev) => ({ ...prev, preferredTrack: 'business-handlers' }))}
            className={`card-hover p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
              formData.preferredTrack === 'business-handlers'
                ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-neutral-900 text-white">
                <Briefcase size={18} />
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.preferredTrack === 'business-handlers'
                    ? 'border-neutral-900 bg-neutral-900'
                    : 'border-neutral-300'
                }`}
              >
                {formData.preferredTrack === 'business-handlers' && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-base">Business Handlers</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Ventures, unit economics, campus micro-enterprises, and pitch decks.
              </p>
            </div>
          </div>

          {/* Card 2: Traders */}
          <div
            onClick={() => setFormData((prev) => ({ ...prev, preferredTrack: 'traders' }))}
            className={`card-hover p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
              formData.preferredTrack === 'traders'
                ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-neutral-900 text-white">
                <TrendingUp size={18} />
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.preferredTrack === 'traders'
                    ? 'border-neutral-900 bg-neutral-900'
                    : 'border-neutral-300'
                }`}
              >
                {formData.preferredTrack === 'traders' && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-base">Quantitative Traders</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                SIFS paper trading league, statistical edges, and 1% risk discipline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Personal Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g. Jean-Luc Habimana"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-all ${
              errors.fullName
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-neutral-200 focus:border-neutral-900'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
            RCA Student Email *
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@student.rca.ac.rw"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-all ${
              errors.email
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-neutral-200 focus:border-neutral-900'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* 3. Class Year / Cohort Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2 font-semibold">
          RCA Intake · Cohort *
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Year 1 (Intake 7)', 'Year 2 (Intake 6)', 'Year 3 (Intake 5)'].map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, classYear: year }))}
              className={`px-3 py-2.5 text-xs font-mono rounded-xl text-center transition-all cursor-pointer ${
                formData.classYear === year
                  ? 'btn-skeuo-pill-active'
                  : 'btn-skeuo-light'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Motivation & Skills */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
            Why do you want to join ENTS? *
          </label>
          <textarea
            name="reason"
            rows={3}
            placeholder="What project or trading strategy are you most excited to build?"
            value={formData.reason}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-all ${
              errors.reason
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-neutral-200 focus:border-neutral-900'
            }`}
          />
          {errors.reason && (
            <p className="text-xs text-rose-500 mt-1">{errors.reason}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
            Technical Background or Software Skills (Optional)
          </label>
          <input
            type="text"
            name="experienceOrSkills"
            placeholder="e.g. Next.js, Python, financial modeling, Pine Script"
            value={formData.experienceOrSkills}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-white focus:outline-none focus:border-neutral-900 transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full rounded-xl cursor-pointer"
      >
        {isSubmitting ? 'Submitting Application...' : 'Submit Application to ENTS'}
      </Button>
    </form>
  );
}
