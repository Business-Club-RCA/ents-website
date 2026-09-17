'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { initialFeedItems } from '@/data/updates';
import { FeedItem, UpdateType } from '@/types';
import { saveUpdateAction, registerAttendanceAction } from '@/actions/adminActions';

const STORAGE_KEY = 'ents_feed_items_v4';
const ATTENDANCE_STORAGE_KEY = 'ents_event_attendees_v2';

export function UpdatesHub({ initialItems = initialFeedItems }: { initialItems?: FeedItem[] }) {
  const [items, setItems] = useState<FeedItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'event'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Featured Event Index (Shows 1 event at a time)
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0);

  // Admin Publisher Modal
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [publishedToast, setPublishedToast] = useState('');

  // Attendance Form Modal
  const [attendanceModalEvent, setAttendanceModalEvent] = useState<FeedItem | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeeCohort, setAttendeeCohort] = useState('Cohort 6 (Year 2)');
  const [attendeeTrack, setAttendeeTrack] = useState('Traders');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  // Admin Post Form State
  const [formType, setFormType] = useState<UpdateType>('event');
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formSourceUrl, setFormSourceUrl] = useState('');
  const [formEventDate, setFormEventDate] = useState('');
  const [formEventTime, setFormEventTime] = useState('');
  const [formEventLocation, setFormEventLocation] = useState('');

  // Load custom items and registrations from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: FeedItem[] = JSON.parse(saved);
        const customItems = parsed.filter((p) => p.isCustom);
        if (customItems.length > 0) {
          setItems([...customItems, ...initialFeedItems]);
        }
      }

      const savedAttendance = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
      if (savedAttendance) {
        setRegisteredEvents(JSON.parse(savedAttendance));
      }
    } catch {
      // fallback
    }
  }, []);

  // Handle Admin Publishing
  const handleAdminPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim()) return;

    const parsedTags = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const defaultImg =
      formType === 'event' ? '/events/demo-day.jpg' : '/news/coding-lab.jpg';

    const newItem: FeedItem = {
      id: `custom-${Date.now()}`,
      type: formType,
      title: formTitle.trim(),
      excerpt: formExcerpt.trim(),
      author: formAuthor.trim() || (formType === 'event' ? 'ENTS Executive Board' : 'News Desk'),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      readTime: formType === 'event' ? '2 hours' : '3 min read',
      tags: parsedTags.length > 0 ? parsedTags : [formType === 'event' ? 'Event' : 'News'],
      imageUrl: formImageUrl.trim() || defaultImg,
      sourceName: 'News',
      sourceUrl: formSourceUrl.trim() || undefined,
      isCustom: true,
      ...(formType === 'event'
        ? {
            eventDate: formEventDate.trim() || 'Upcoming Session',
            eventTime: formEventTime.trim() || '16:00 CAT',
            eventLocation: formEventLocation.trim() || 'RCA Campus',
            rsvpLink: '/join',
          }
        : {}),
    };

    const updated = [newItem, ...items];
    setItems(updated);

    try {
      const customOnly = updated.filter((item) => item.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    setFormTitle('');
    setFormExcerpt('');
    setFormAuthor('');
    setFormTags('');
    setFormImageUrl('');
    setFormSourceUrl('');
    setFormEventDate('');
    setFormEventTime('');
    setFormEventLocation('');
    setIsAdminModalOpen(false);

    setPublishedToast('Item successfully published by Admin');
    setTimeout(() => setPublishedToast(''), 3500);
  };

  // Handle User Attendance Registration
  const handleRegisterAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendanceModalEvent || !attendeeName.trim() || !attendeeEmail.trim()) return;

    const eventId = attendanceModalEvent.id;
    const name = attendeeName.trim();
    const email = attendeeEmail.trim();
    const cohort = attendeeCohort;

    // Trigger server action to record attendance in dynamic CMS database
    registerAttendanceAction(eventId, {
      fullName: name,
      email: email,
      classYear: cohort,
    }).catch(() => {});

    const updated = [...registeredEvents, eventId];
    setRegisteredEvents(updated);

    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setPublishedToast(`Attendance confirmed for ${attendeeName.trim()}!`);
    setTimeout(() => setPublishedToast(''), 4000);

    setAttendeeName('');
    setAttendeeEmail('');
    setAttendanceModalEvent(null);
  };

  const handleDeleteCustomItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    try {
      const customOnly = updated.filter((item) => item.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // ignore
    }
  };

  const upcomingEvents = items.filter((item) => item.type === 'event');
  const currentFeaturedEvent = upcomingEvents[featuredEventIndex % (upcomingEvents.length || 1)];

  // Filter items for main grid
  const filteredItems = items.filter((item) => {
    if (activeTab === 'news' && item.type === 'event') return false;
    if (activeTab === 'event' && item.type !== 'event') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <Container size="wide">
        {/* Simple Notification Toast */}
        {publishedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-mono border border-neutral-700">
            {publishedToast}
          </div>
        )}

        {/* 1. FEATURED EVENT SECTION (SKEUOMORPHIC CARD) */}
        {currentFeaturedEvent && (
          <section className="mb-14 sm:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-neutral-200 mb-6">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-1">
                  Schedule
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                  Upcoming Event
                </h2>
              </div>

              {/* Admin Post Event & Event Cycler */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                {upcomingEvents.length > 1 && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mr-2">
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

                <button
                  onClick={() => {
                    setFormType('event');
                    setIsAdminModalOpen(true);
                  }}
                  className="btn-skeuo-dark font-bold text-xs font-mono px-4 py-2 rounded-xl cursor-pointer"
                >
                  Admin: Post Event
                </button>
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
                  <span className="text-neutral-700 font-bold uppercase tracking-wider text-[10px]">ACTIVE ENROLLMENT</span>
                  <span className="skeuo-rivet ml-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                {/* Event Image Banner in Recessed Photographic Bezel */}
                <div className="md:col-span-6 skeuo-recessed rounded-2xl overflow-hidden relative min-h-[260px] sm:min-h-[340px] md:min-h-[380px]">
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
                      <span className="font-semibold text-neutral-700">{currentFeaturedEvent.eventTime}</span>
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
                        <span className="font-semibold text-neutral-900">{currentFeaturedEvent.eventLocation}</span>
                      </div>
                      {currentFeaturedEvent.speakers && (
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500">HOSTS:</span>
                          <span className="font-semibold text-neutral-900">{currentFeaturedEvent.speakers.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="skeuo-groove pt-6 mt-6 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono text-neutral-500">
                      Organized by <strong className="text-neutral-900">{currentFeaturedEvent.author}</strong>
                    </span>

                    {registeredEvents.includes(currentFeaturedEvent.id) ? (
                      <span className="skeuo-badge px-5 py-2.5 rounded-xl text-emerald-800 font-mono text-xs font-bold border-emerald-300">
                        ✓ Attendance Confirmed
                      </span>
                    ) : (
                      <button
                        onClick={() => setAttendanceModalEvent(currentFeaturedEvent)}
                        className="btn-skeuo-dark font-bold px-6 py-2.5 rounded-xl text-xs font-mono cursor-pointer"
                      >
                        Register Attendance
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. CONTROL STRIP: Typographic Filters, Search & Admin Post Key */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
          {/* Skeuomorphic Search Box */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search news & updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-xs font-mono bg-white border border-neutral-300/90 rounded-xl focus:outline-none focus:border-neutral-900 transition-all text-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* Skeuomorphic Filter Tray */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 rounded-2xl border border-neutral-300/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.07)] text-xs font-mono">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'all' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'news' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              News ({items.filter((i) => i.type !== 'event').length})
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`px-4 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'event' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }`}
            >
              Events ({upcomingEvents.length})
            </button>
          </div>

          {/* Admin Post Update Action */}
          <button
            onClick={() => {
              setFormType('article');
              setIsAdminModalOpen(true);
            }}
            className="btn-skeuo-dark font-bold rounded-xl px-5 py-2.5 text-xs font-mono cursor-pointer"
          >
            Admin: Post Update
          </button>
        </div>

        {/* 3. SKEUOMORPHIC NEWS & BLOGS GRID */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-neutral-500 border border-neutral-200 rounded-2xl bg-neutral-50">
            No entries found.
          </div>
        ) : (
          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-[1px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-sm">
            {filteredItems.map((item) => {
              const isEvent = item.type === 'event';

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
                        <span className="uppercase tracking-wider font-semibold text-neutral-600">
                          {isEvent ? 'EVENT DISPATCH' : 'NEWS ARTICLE'}
                        </span>
                      </div>
                      <span className="skeuo-rivet" />
                    </div>

                    {/* Recessed Photographic Bezel */}
                    {item.imageUrl && (
                      <Link
                        href={isEvent ? '#' : `/updates/${item.id}`}
                        className="skeuo-recessed block rounded-xl overflow-hidden relative w-full h-44 sm:h-48 group-hover:border-neutral-400 transition-colors"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </Link>
                    )}

                    <div className="pt-4 px-1">
                      {/* Category Label + Date */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2.5">
                        <span className="skeuo-badge uppercase font-bold tracking-wider text-neutral-800 text-[10px] px-2.5 py-0.5 rounded-md">
                          {isEvent ? 'Event' : 'News'}
                        </span>
                        <span className="text-neutral-500">{item.date}</span>
                      </div>

                      {/* Headline linked to detail page */}
                      <h3 className="font-bold text-lg text-neutral-900 tracking-tight leading-snug mb-2">
                        {isEvent ? (
                          <span>{item.title}</span>
                        ) : (
                          <Link href={`/updates/${item.id}`} className="hover:underline">
                            {item.title}
                          </Link>
                        )}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3 font-normal">
                        {item.excerpt}
                      </p>

                      {/* Event info line if event */}
                      {isEvent && item.eventDate && (
                        <div className="skeuo-chip p-3 rounded-xl text-xs font-mono text-neutral-700 mb-3 space-y-1">
                          <div className="font-bold text-neutral-900">
                            {item.eventDate} &middot; {item.eventTime}
                          </div>
                          <div className="text-neutral-500">{item.eventLocation}</div>
                        </div>
                      )}

                      {/* Tactile Debossed Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="skeuo-chip text-[10px] font-mono px-2 py-0.5 rounded-md text-neutral-700 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Machined Footer */}
                  <div className="skeuo-groove px-1 pb-1 pt-3.5 mt-4 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500 font-medium">{item.author}</span>

                    <div className="flex items-center gap-3">
                      {item.isCustom && (
                        <button
                          onClick={() => handleDeleteCustomItem(item.id)}
                          className="text-neutral-500 hover:text-red-600 cursor-pointer underline text-[11px]"
                        >
                          Delete
                        </button>
                      )}

                      {isEvent ? (
                        registeredEvents.includes(item.id) ? (
                          <span className="text-emerald-700 font-bold text-[11px]">
                            Registered
                          </span>
                        ) : (
                          <button
                            onClick={() => setAttendanceModalEvent(item)}
                            className="btn-skeuo-dark font-bold px-3.5 py-1.5 rounded-xl text-xs cursor-pointer"
                          >
                            RSVP
                          </button>
                        )
                      ) : (
                        <Link
                          href={`/updates/${item.id}`}
                          className="btn-skeuo-light font-bold px-4 py-1.5 rounded-xl text-xs cursor-pointer"
                        >
                          Read Article
                        </Link>
                      )}
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
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm select-none">
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

            {/* Target Event Snippet */}
            <div className="p-3 bg-white rounded-xl border border-neutral-200/90 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)] mb-4 text-xs font-mono">
              <div className="font-bold text-neutral-900 mb-0.5">
                {attendanceModalEvent.title}
              </div>
              <div className="text-neutral-500 text-[11px]">
                {attendanceModalEvent.eventDate} &middot; {attendanceModalEvent.eventTime}
              </div>
              <div className="text-neutral-500 text-[11px]">
                Venue: {attendanceModalEvent.eventLocation}
              </div>
            </div>

            <form onSubmit={handleRegisterAttendance} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marie Uwase"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. marie@rca.ac.rw"
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Cohort / Class</label>
                  <select
                    value={attendeeCohort}
                    onChange={(e) => setAttendeeCohort(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                  >
                    <option value="Cohort 5 (Year 3)">Cohort 5 (Year 3)</option>
                    <option value="Cohort 6 (Year 2)">Cohort 6 (Year 2)</option>
                    <option value="Cohort 7 (Year 1)">Cohort 7 (Year 1)</option>
                    <option value="RCA Alumni">RCA Alumni</option>
                    <option value="Faculty / Guest">Faculty / Guest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Affiliation</label>
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

      {/* 5. ADMIN PUBLISHER SKEUOMORPHIC MODAL (ADMIN ONLY) */}
      {isAdminModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm select-none">
          <div className="card-skeuo-static bg-white border border-neutral-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.25),inset_0_1.5px_0_rgba(255,255,255,1)] relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Admin Management
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Post New Content</h3>
              </div>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 cursor-pointer px-2 py-1"
              >
                Close
              </button>
            </div>

            {/* Type selector tray */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-200/60 p-1.5 rounded-2xl mb-5 text-xs font-mono border border-neutral-300/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.07)]">
              <button
                type="button"
                onClick={() => setFormType('event')}
                className={`py-2 rounded-xl cursor-pointer transition-all ${
                  formType === 'event' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
                }`}
              >
                Event
              </button>
              <button
                type="button"
                onClick={() => setFormType('article')}
                className={`py-2 rounded-xl cursor-pointer transition-all ${
                  formType === 'article' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
                }`}
              >
                News
              </button>
            </div>

            <form onSubmit={handleAdminPublish} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder={formType === 'event' ? 'Event Title' : 'News Headline'}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Description * {formType === 'event' && '(short/brief)'}
                </label>
                <textarea
                  required
                  rows={formType === 'event' ? 2 : 3}
                  placeholder="Provide a concise description..."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Author / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="ENTS Executive Board"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    type="text"
                    placeholder={
                      formType === 'event' ? '/events/demo-day.jpg' : '/news/coding-lab.jpg'
                    }
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>
              </div>

              {formType === 'article' && (
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    External Link (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formSourceUrl}
                    onChange={(e) => setFormSourceUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>
              )}

              {formType === 'event' && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Date *</label>
                    <input
                      type="text"
                      placeholder="April 15, 2026"
                      value={formEventDate}
                      onChange={(e) => setFormEventDate(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Time</label>
                    <input
                      type="text"
                      placeholder="16:00 CAT"
                      value={formEventTime}
                      onChange={(e) => setFormEventTime(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="RCA Lab"
                      value={formEventLocation}
                      onChange={(e) => setFormEventLocation(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03)]"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="btn-skeuo-light px-4 py-2 rounded-xl text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-skeuo-dark font-bold px-5 py-2 rounded-xl cursor-pointer"
                >
                  Publish as Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
