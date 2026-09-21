'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Project } from '@/types';
import { TerminalIcon, Check } from '@/components/ui/Icons';

interface ProjectsPipelineProps {
  projects: Project[];
}

export function ProjectsPipeline({ projects }: ProjectsPipelineProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'fintech' | 'venture' | 'quant'>('all');
  const [watchedProjects, setWatchedProjects] = useState<string[]>([]);
  const [notifyModalProject, setNotifyModalProject] = useState<Project | null>(null);
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const featured = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featured?.id);

  const filteredProjects = otherProjects.filter((p) => {
    if (activeTab === 'fintech') return p.category === 'Fintech';
    if (activeTab === 'venture') return p.category === 'Venture' || p.category === 'Platform';
    if (activeTab === 'quant') return p.category === 'Quantitative';
    return true;
  });

  const handleToggleWatch = (projectId: string, projectTitle: string) => {
    if (watchedProjects.includes(projectId)) {
      setWatchedProjects(watchedProjects.filter((id) => id !== projectId));
      setToastMessage(`Unsubscribed from ${projectTitle} updates.`);
    } else {
      setWatchedProjects([...watchedProjects, projectId]);
      setToastMessage(`✓ You are now subscribed to early access for ${projectTitle}!`);
    }
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyModalProject || !email.trim()) return;

    if (!watchedProjects.includes(notifyModalProject.id)) {
      setWatchedProjects([...watchedProjects, notifyModalProject.id]);
    }

    setToastMessage(`✓ ${email} registered for ${notifyModalProject.title} Alpha Release!`);
    setTimeout(() => setToastMessage(''), 4000);
    setNotifyModalProject(null);
    setEmail('');
  };

  return (
    <div className="py-12 bg-white">
      {/* Interactive Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-mono border border-neutral-700 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {toastMessage}
        </div>
      )}

      {/* 1. FEATURED FLAGSHIP INCUBATION CHASSIS (SIFS) */}
      {featured && (
        <section className="mb-16 sm:mb-20">
          <Container size="wide">
            {/* Telemetry Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-neutral-800">
                  FLAGSHIP INCUBATION PIPELINE · STEALTH PROTOCOL
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-600">
                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200 font-bold">
                  COMING SOON · COHORT 2026 ALPHA
                </span>
              </div>
            </div>

            {/* Featured Hardware Chassis */}
            <div className="skeuo-card rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-neutral-200/90 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Specs & Roadmap */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="skeuo-badge px-3 py-1 rounded-xl text-xs font-mono font-bold text-neutral-900">
                      Venture Incubation
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-mono border border-neutral-200 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      Stage 02 · Core Engine Build
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-mono border border-neutral-200">
                      {featured.category}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
                      {featured.title}
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed mt-3">
                      {featured.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {featured.description}
                  </p>

                  {/* Clean Monochrome Incubation Progress Meter */}
                  <div className="skeuo-chip p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-neutral-900 uppercase tracking-wide">Incubation Progress</span>
                      <span className="font-bold text-neutral-900 font-number">72% COMPLETE</span>
                    </div>

                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 rounded-full transition-all duration-1000"
                        style={{ width: '72%' }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-[11px] font-mono pt-1 text-neutral-600">
                      <div className="font-semibold text-neutral-900">
                        Phase 1: Thesis (Complete)
                      </div>
                      <div className="font-semibold text-neutral-800">
                        Phase 2: Engine Build (Active)
                      </div>
                      <div className="text-neutral-400">
                        Phase 3: Campus Alpha
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono bg-white border border-neutral-200/90 rounded-lg px-2.5 py-1 text-neutral-800 shadow-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Clean CTA: Notify on Launch + Private Repo Badge */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setNotifyModalProject(featured)}
                      className="btn-skeuo-dark font-bold text-xs font-mono px-5 py-2.5 rounded-xl cursor-pointer shadow-sm hover:scale-[1.01] transition-transform"
                    >
                      {watchedProjects.includes(featured.id) ? (
                        <span className="flex items-center gap-1.5 text-white">
                          <Check size={14} /> Subscribed to Alpha
                        </span>
                      ) : (
                        'Request Early Access · Notify on Launch'
                      )}
                    </button>

                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600">
                      <svg className="w-3.5 h-3.5 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Private R&amp;D Monorepo</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual Chassis Preview */}
                <div className="lg:col-span-5">
                  <div className="card-hover border border-neutral-200/90 bg-white rounded-2xl p-6 sm:p-7 space-y-5 shadow-sm">
                    {/* Visual Prototype Preview */}
                    <div className="skeuo-recessed rounded-xl overflow-hidden relative w-full h-48 sm:h-56">
                      <Image
                        src={featured.imageUrl || '/projects/sifs-dashboard.jpg'}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        priority
                      />

                      {/* Clean Monochrome Coming Soon Overlay */}
                      <div className="absolute inset-0 bg-neutral-950/40 flex flex-col items-center justify-center p-4 text-center select-none">
                        <div className="px-4 py-2 rounded-xl bg-neutral-900/90 border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                          COMING SOON · IN ACTIVE R&amp;D
                        </div>
                        <div className="text-[10px] font-mono text-neutral-300 mt-2">
                          Scheduled for Rwanda Coding Academy Release
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <div className="flex items-center gap-2">
                        <TerminalIcon size={16} className="text-neutral-900" />
                        <span className="text-xs font-mono font-bold text-neutral-900 uppercase">
                          System Specifications
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-lg px-2.5 py-0.5 font-semibold">
                        RCA LAB
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {featured.metrics?.map((metric) => (
                        <div key={metric.label} className="card-skeuo-sm rounded-xl p-3">
                          <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">
                            {metric.label}
                          </div>
                          <div className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5 tabular-nums font-number">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs font-mono text-neutral-500 pt-2 border-t border-neutral-100">
                      SIFS architecture enforces hard-coded 1% stop-loss guardrails and tick streaming for the upcoming student paper trading season.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 2. ALL VENTURES & PRODUCTS IN INCUBATION */}
      <Container size="wide">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-1">
              Student Pipeline
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Venture Prototypes in Incubation ({projects.length})
            </h3>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 rounded-xl border border-neutral-300/80 text-xs font-mono self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                activeTab === 'all' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              All ({otherProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('fintech')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                activeTab === 'fintech' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              Fintech
            </button>
            <button
              onClick={() => setActiveTab('venture')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                activeTab === 'venture' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              Ventures
            </button>
            <button
              onClick={() => setActiveTab('quant')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                activeTab === 'quant' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              Quants
            </button>
          </div>
        </div>

        {/* The Grid of Coming Soon Projects */}
        <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-sm">
          {filteredProjects.map((project) => {
            const isWatched = watchedProjects.includes(project.id);

            return (
              <div
                key={project.id}
                className="bg-white p-5 sm:p-6 flex flex-col justify-between group hover:bg-neutral-50/70 transition-colors"
              >
                <div>
                  {/* Top Rivet Accent */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-200/70 text-[10px] font-mono">
                    <span className="skeuo-rivet" />
                    <div className="flex items-center gap-2 text-neutral-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span className="font-semibold uppercase tracking-wider text-neutral-700">
                        COMING SOON · IN STEALTH
                      </span>
                    </div>
                    <span className="skeuo-rivet" />
                  </div>

                  {/* Recessed Dashboard Image with Clean Monochrome Overlay */}
                  {project.imageUrl && (
                    <div className="skeuo-recessed rounded-xl overflow-hidden relative w-full h-44 sm:h-48 mb-4">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Clean Overlay */}
                      <div className="absolute inset-0 bg-neutral-950/40 flex flex-col items-center justify-center p-3 select-none">
                        <span className="px-3 py-1 rounded-xl bg-neutral-900/90 border border-white/20 text-[10px] font-mono font-bold text-white shadow-md">
                          COMING SOON
                        </span>
                        <span className="text-[9px] font-mono text-neutral-300 mt-1 uppercase tracking-wider">
                          Incubation Phase
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Badges row */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-[10px] font-mono font-bold text-neutral-800 uppercase">
                      In Development
                    </span>
                    <span className="text-xs font-mono text-neutral-500 font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-950 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-mono text-neutral-500 mt-1">{project.tagline}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-3">
                    {project.description}
                  </p>

                  {/* Metrics preview */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-100 font-mono">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="skeuo-chip p-2 rounded-lg">
                          <div className="text-[9px] text-neutral-500 uppercase">{m.label}</div>
                          <div className="text-xs font-bold text-neutral-900 font-number">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer with Private Repository info and Early Access trigger */}
                <div className="pt-4 mt-4 border-t border-neutral-100 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-200/80 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <svg className="w-3 h-3 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Private Repo</span>
                    </div>

                    <button
                      onClick={() => handleToggleWatch(project.id, project.title)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] cursor-pointer transition-all ${
                        isWatched
                          ? 'bg-neutral-900 text-white'
                          : 'btn-skeuo-light text-neutral-800 hover:border-neutral-900'
                      }`}
                    >
                      {isWatched ? '✓ Watching' : 'Notify on Launch'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* 3. EARLY ACCESS MODAL */}
      {notifyModalProject && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm select-none"
        >
          <div className="card-skeuo-static bg-white border border-neutral-300 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_24px_50px_rgba(0,0,0,0.25),inset_0_1.5px_0_rgba(255,255,255,1)] relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Early Access Watchlist
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                  {notifyModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setNotifyModalProject(null)}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 cursor-pointer px-2 py-1"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-neutral-600 font-mono mb-4 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              This venture is currently under active private development within the ENTS incubator at Rwanda Coding Academy. Enter your email to be dispatched private alpha credentials upon release.
            </p>

            <form onSubmit={handleNotifySubmit} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@rca.ac.rw"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setNotifyModalProject(null)}
                  className="btn-skeuo-light px-4 py-2 rounded-xl text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-skeuo-dark font-bold px-5 py-2 rounded-xl cursor-pointer"
                >
                  Join Alpha Watchlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. CALL TO ACTION */}
      <section className="mt-20 border-t border-neutral-200 bg-neutral-50/50 py-16">
        <Container size="wide" className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Have an idea for a software venture on campus?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Pitch your prototype at the next Wednesday ENTS Venture Teardown session.
            </p>
          </div>
          <Link
            href="/about"
            className="btn-skeuo-dark font-bold text-xs font-mono px-6 py-3 rounded-xl cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <span>Get to Know ENTS</span>
            <span>&rarr;</span>
          </Link>
        </Container>
      </section>
    </div>
  );
}
