'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FeedItem } from '@/types';
import { registerAttendanceAction } from '@/actions/adminActions';
import { SocialShareBar } from '@/components/ui/SocialShareBar';
import { slugify } from '@/lib/slug';
import { isEventPassed } from '@/lib/dateUtils';
import { getUpdateTypeBadge, getUpdateTypeLabel } from '@/lib/contentTypes';

const ATTENDANCE_STORAGE_KEY = 'ents_event_attendees_v2';

export function UpdatesHub({ initialItems = [] }: { initialItems?: FeedItem[] }) {
  const [items, setItems] = useState<FeedItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<'all' | 'announcement' | 'event' | 'article' | 'external'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Keep items in sync when initialItems changes
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Featured Event Index (Shows 1 event at a time)
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0);

  // Attendance Form Modal
  const [attendanceModalEvent, setAttendanceModalEvent] = useState<FeedItem | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeeCohort, setAttendeeCohort] = useState('Cohort 6 (Year 2)');
  const [attendeeTrack, setAttendeeTrack] = useState('Traders');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [notificationToast, setNotificationToast] = useState('');

  // Load registered attendance from localStorage
  useEffect(() => {
    try {
      const savedAttendance = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
      if (savedAttendance) {
        setRegisteredEvents(JSON.parse(savedAttendance));
      }
    } catch {
      // fallback
    }
  }, []);

  // Handle Event Attendance Submission
  const handleAttendanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendanceModalEvent || !attendeeName.trim() || !attendeeEmail.trim()) return;

    const eventId = attendanceModalEvent.id;

    // Save locally
    const updated = [...registeredEvents, eventId];
    setRegisteredEvents(updated);
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Persist via Server Action
    try {
      await registerAttendanceAction(eventId, {
        fullName: attendeeName.trim(),
        email: attendeeEmail.trim(),
        classYear: attendeeCohort,
      });
    } catch {
      // Local attendance preserved
    }

    setNotificationToast(`✓ Attendance confirmed for ${attendanceModalEvent.title}!`);
    setTimeout(() => setNotificationToast(''), 4000);

    // Reset modal
    setAttendanceModalEvent(null);
    setAttendeeName('');
    setAttendeeEmail('');
  };

  // Active upcoming events only (passed events automatically excluded from public site)
  const upcomingEvents = items.filter(
    (item) => item.type === 'event' && !isEventPassed(item.eventDate, item.eventTime)
  );
  const currentFeaturedEvent =
    upcomingEvents.length > 0
      ? upcomingEvents[featuredEventIndex % upcomingEvents.length]
      : null;

  // Active public items (all non-events, plus only upcoming events)
  const activePublicItems = items.filter(
    (item) => item.type !== 'event' || !isEventPassed(item.eventDate, item.eventTime)
  );

  // Filter items for main grid
  const filteredItems = activePublicItems.filter((item) => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        (item.sourceName && item.sourceName.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <Container size="wide">
        {/* Simple Notification Toast */}
        {notificationToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-mono border border-neutral-700 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {notificationToast}
          </div>
        )}

        {/* 1. FEATURED EVENT SECTION (SKEUOMORPHIC CARD) */}
        {currentFeaturedEvent && (
          <section className="mb-14 sm:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-neutral-200 mb-6">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-1">
                  Society Agenda
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                  Upcoming Event
                </h2>
              </div>

              {/* Event Cycler */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                {upcomingEvents.length > 1 && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                    <button
                      onClick={() =>
                        setFeaturedEventIndex(
                          (prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length
                        )
                      }
                      className="btn-skeuo-light px-3 py-1 rounded-xl cursor-pointer"
                      aria-label="Previous event"
                    >
                      Prev
                    </button>
                    <span className="px-1 text-neutral-400">
                      {featuredEventIndex + 1} / {upcomingEvents.length}
                    </span>
                    <button
                      onClick={() =>
                        setFeaturedEventIndex((prev) => (prev + 1) % upcomingEvents.length)
                      }
                      className="btn-skeuo-light px-3 py-1 rounded-xl cursor-pointer"
                      aria-label="Next event"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* The Single Featured Event Skeuomorphic Chassis */}
            <div className="skeuo-card rounded-3xl p-4 sm:p-6 lg:p-7 relative group overflow-hidden">
              {/* Top hardware bar with corner rivets */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-neutral-200/90 text-[11px] font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="skeuo-rivet" />
                  <span className="uppercase tracking-widest text-neutral-500 font-semibold">
                    FEATURED EVENT · CHASSIS SIFS-01
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  <span className="text-neutral-700 font-bold uppercase tracking-wider text-[10px]">
                    ACTIVE ENROLLMENT
                  </span>
                  <span className="skeuo-rivet ml-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                {/* Event Image Banner in Recessed Photographic Bezel */}
                <div className="md:col-span-6 skeuo-recessed rounded-2xl overflow-hidden relative min-h-65 sm:min-h-85 md:min-h-95">
                  {currentFeaturedEvent.imageUrl && (
                    <Image
                      src={currentFeaturedEvent.imageUrl}
                      alt={currentFeaturedEvent.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                      priority={false}
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="skeuo-badge px-3 py-1 rounded-xl text-xs font-mono font-bold text-neutral-900">
                      Featured Event
                    </span>
                  </div>
                </div>

                {/* Event Details & Attendance Action */}
                <div className="md:col-span-6 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-neutral-500 mb-3">
                      <span className="skeuo-badge px-3 py-1 rounded-lg font-bold text-neutral-900">
                        {currentFeaturedEvent.eventDate}
                      </span>
                      <span>&middot;</span>
                      <span className="font-semibold text-neutral-700">
                        {currentFeaturedEvent.eventTime}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 leading-snug mb-3">
                      {currentFeaturedEvent.title}
                    </h3>

                    {/* Little Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                      {currentFeaturedEvent.excerpt}
                    </p>

                    <div className="skeuo-chip p-4 rounded-xl space-y-2 text-xs font-mono text-neutral-700">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500">VENUE:</span>
                        <span className="font-semibold text-neutral-900">
                          {currentFeaturedEvent.eventLocation}
                        </span>
                      </div>
                      {currentFeaturedEvent.speakers && (
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500">HOSTS:</span>
                          <span className="font-semibold text-neutral-900">
                            {currentFeaturedEvent.speakers.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="skeuo-groove pt-6 mt-6 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono text-neutral-500">
                      Organized by <strong className="text-neutral-900">{currentFeaturedEvent.author}</strong>
                    </span>

                    <div className="flex items-center gap-2.5">
                      {/* Quick Share for Event */}
                      <SocialShareBar
                        title={currentFeaturedEvent.title}
                        description={currentFeaturedEvent.excerpt}
                        compact={true}
                      />

                      {registeredEvents.includes(currentFeaturedEvent.id) ? (
                        <span className="skeuo-badge px-5 py-2 rounded-xl text-emerald-800 font-mono text-xs font-bold border-emerald-300">
                          ✓ Attendance Confirmed
                        </span>
                      ) : (
                        <button
                          onClick={() => setAttendanceModalEvent(currentFeaturedEvent)}
                          className="btn-skeuo-dark font-bold px-5 py-2.5 rounded-xl text-xs font-mono cursor-pointer"
                        >
                          Register Attendance
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. CONTROL STRIP: Typographic Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
          {/* Search Box */}
          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search business articles, topics, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-xs font-mono bg-white border border-neutral-300/90 rounded-xl focus:outline-none focus:border-neutral-900 transition-all text-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* Filter Tray */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 rounded-2xl border border-neutral-300/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.07)] text-xs font-mono overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'all' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              All ({activePublicItems.length})
            </button>
            <button
              onClick={() => setActiveTab('announcement')}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'announcement' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              Announcements ({items.filter((i) => i.type === 'announcement').length})
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'event' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              Scheduled Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('article')}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'article' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              Articles ({items.filter((i) => i.type === 'article').length})
            </button>
            <button
              onClick={() => setActiveTab('external')}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                activeTab === 'external' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              External References ({items.filter((i) => i.type === 'external').length})
            </button>
          </div>
        </div>

        {/* 3. NEWS & ARTICLES GRID WITH SOCIAL SHARE BAR */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-neutral-500 border border-neutral-200 rounded-2xl bg-neutral-50">
            {activeTab === 'event'
              ? 'No upcoming events scheduled at this moment. Stay tuned for future demo days and masterclasses!'
              : activeTab === 'announcement'
              ? 'No announcements found matching your search.'
              : activeTab === 'external'
              ? 'No external references found matching your search.'
              : 'No articles or dispatches found matching your search.'}
          </div>
        ) : (
          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-sm">
            {filteredItems.map((item) => {
              const isEvent = item.type === 'event';
              const isExternal = item.type === 'external';
              const slug = slugify(item.title) || item.id;
              const articleHref = isEvent ? '#' : isExternal && item.sourceUrl ? item.sourceUrl : `/updates/${slug}`;
              const shareUrl =
                typeof window !== 'undefined'
                  ? `${window.location.origin}/updates/${slug}`
                  : `https://www.entsclub.online/updates/${slug}`;

              return (
                <article
                  key={item.id}
                  className="bg-white p-4 sm:p-5 flex flex-col justify-between relative group hover:bg-neutral-50/70 transition-colors overflow-hidden"
                >
                  <div>
                    {/* Top Hardware Accent with Corner Rivets */}
                    <div className="flex items-center justify-between px-1 pb-2.5 mb-2.5 border-b border-neutral-200/70">
                      <span className="skeuo-rivet" />
                      <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                        <span className="uppercase tracking-wider font-semibold text-neutral-700">
                          {getUpdateTypeLabel(item.type)}
                        </span>
                        {isExternal && item.sourceName && (
                          <span className="text-neutral-400 font-normal">
                            &middot; {item.sourceName}
                          </span>
                        )}
                      </div>
                      <span className="skeuo-rivet" />
                    </div>

                    {/* Recessed Photographic Bezel */}
                    {item.imageUrl && (
                      <Link
                        href={articleHref}
                        className="skeuo-recessed block rounded-xl overflow-hidden relative w-full h-44 sm:h-48 group-hover:border-neutral-400 transition-colors"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="skeuo-badge px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-neutral-900">
                            {getUpdateTypeLabel(item.type)}
                          </span>
                        </div>
                      </Link>
                    )}

                    {/* Headline and Metadata */}
                    <div className="mt-3.5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>{item.date}</span>
                        <span>{item.readTime || '4 min read'}</span>
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-neutral-900 leading-snug group-hover:text-neutral-950">
                        <Link href={articleHref} className="hover:underline">
                          {item.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono bg-neutral-100 border border-neutral-200/80 px-2 py-0.5 rounded-md text-neutral-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Machined Footer with Social Share Bar */}
                  <div className="skeuo-groove px-1 pb-1 pt-3.5 mt-4 flex flex-col gap-3 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 font-medium text-[11px] truncate max-w-35">
                        {item.author}
                      </span>

                      <div className="flex items-center gap-2">
                        {isEvent ? (
                          registeredEvents.includes(item.id) ? (
                            <span className="text-emerald-700 font-bold text-[11px]">
                              ✓ Registered
                            </span>
                          ) : (
                            <button
                              onClick={() => setAttendanceModalEvent(item)}
                              className="btn-skeuo-dark font-bold px-3 py-1 rounded-xl text-[11px] cursor-pointer"
                            >
                              RSVP
                            </button>
                          )
                        ) : isExternal && item.sourceUrl ? (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-skeuo-dark font-bold px-3.5 py-1.5 rounded-xl text-[11px] cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Source</span>
                            <span className="text-[10px]">↗</span>
                          </a>
                        ) : (
                          <Link
                            href={articleHref}
                            className="btn-skeuo-light font-bold px-3.5 py-1.5 rounded-xl text-[11px] cursor-pointer hover:border-neutral-900"
                          >
                            Read &rarr;
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Social Share Bar on card for effortless sharing */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
                      <span>Share:</span>
                      <SocialShareBar
                        title={item.title}
                        description={item.excerpt}
                        url={shareUrl}
                        compact={true}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>

      {/* 4. EVENT ATTENDANCE REGISTRATION SKEUOMORPHIC MODAL */}
      {attendanceModalEvent && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm select-none"
        >
          <div className="card-skeuo-static bg-white border border-neutral-300 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_24px_50px_rgba(0,0,0,0.25),inset_0_1.5px_0_rgba(255,255,255,1)] relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Attendance Form
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                  Register for Event
                </h3>
              </div>
              <button
                onClick={() => setAttendanceModalEvent(null)}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 cursor-pointer px-2 py-1"
              >
                Close
              </button>
            </div>

            <p className="text-xs font-mono text-neutral-600 mb-4 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80">
              <strong className="text-neutral-900">{attendanceModalEvent.title}</strong>
              <br />
              {attendanceModalEvent.eventDate} &middot; {attendanceModalEvent.eventTime}
            </p>

            <form onSubmit={handleAttendanceSubmit} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cedric Mugisha"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@rca.ac.rw"
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Cohort</label>
                  <select
                    value={attendeeCohort}
                    onChange={(e) => setAttendeeCohort(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                  >
                    <option value="Cohort 7 (Year 1)">Cohort 7 (Year 1)</option>
                    <option value="Cohort 6 (Year 2)">Cohort 6 (Year 2)</option>
                    <option value="Cohort 5 (Year 3)">Cohort 5 (Year 3)</option>
                    <option value="Alumni">Alumni / Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Track</label>
                  <select
                    value={attendeeTrack}
                    onChange={(e) => setAttendeeTrack(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                  >
                    <option value="Traders">Traders Track</option>
                    <option value="Business Handlers">Business Handlers</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Guest">External Guest</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setAttendanceModalEvent(null)}
                  className="btn-skeuo-light px-4 py-2 rounded-xl text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-skeuo-dark font-bold px-5 py-2 rounded-xl cursor-pointer"
                >
                  Confirm Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
