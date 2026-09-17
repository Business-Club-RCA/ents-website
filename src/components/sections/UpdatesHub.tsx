'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { initialFeedItems } from '@/data/updates';
import { FeedItem, UpdateType } from '@/types';

const STORAGE_KEY = 'ents_feed_items_v2';
const STORAGE_KEY = 'ents_feed_items_v3';
const ATTENDANCE_STORAGE_KEY = 'ents_event_attendees_v1';

export function UpdatesHub() {
  const [items, setItems] = useState<FeedItem[]>(initialFeedItems);
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'event'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);

  // Form State for Site Owner Publisher Modal
  const [formType, setFormType] = useState<UpdateType>('article');
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
  // Event specific
  const [formEventDate, setFormEventDate] = useState('');
  const [formEventTime, setFormEventTime] = useState('');
  const [formEventLocation, setFormEventLocation] = useState('');
  const [formRsvpLink, setFormRsvpLink] = useState('');

  // Load custom persisted posts from localStorage on mount
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
      // fallback to initial
      // fallback
    }
  }, []);

  const handlePublish = (e: React.FormEvent) => {
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
      author: formAuthor.trim() || (formType === 'event' ? 'ENTS Committee' : 'News Desk'),
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
            rsvpLink: formRsvpLink.trim() || '/join',
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

    // Reset
    // Reset Form
    setFormTitle('');
    setFormExcerpt('');
    setFormAuthor('');
    setFormTags('');
    setFormImageUrl('');
    setFormSourceUrl('');
    setFormEventDate('');
    setFormEventTime('');
    setFormEventLocation('');
    setFormRsvpLink('');
    setIsModalOpen(false);
    setIsAdminModalOpen(false);

    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 3000);
    setPublishedToast('Item successfully published by Admin');
    setTimeout(() => setPublishedToast(''), 3500);
  };

  // Handle User Attendance Registration
  const handleRegisterAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendanceModalEvent || !attendeeName.trim() || !attendeeEmail.trim()) return;

    const updated = [...registeredEvents, attendanceModalEvent.id];
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

  // Filter items
  const upcomingEvents = items.filter((item) => item.type === 'event');
  const currentFeaturedEvent = upcomingEvents[featuredEventIndex % (upcomingEvents.length || 1)];

  // Filter items for the main grid
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

  const upcomingEvents = items.filter((item) => item.type === 'event');

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <Container size="wide">
        {/* Simple Notification Toast */}
        {publishedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-mono">
            Post published successfully
          <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-xl shadow-2xl text-xs font-mono">
            {publishedToast}
          </div>
        )}

        {/* 1. UPCOMING EVENTS SECTION (WITH IMAGES & SHORT DESCRIPTIONS, NO ICONS) */}
        <section className="mb-14 sm:mb-18 border border-neutral-200 bg-neutral-50/50 rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-1">
                Schedule
        {/* 1. FEATURED EVENT SECTION (SINGLE FEATURED EVENT INSTEAD OF THREE) */}
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
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Upcoming Events
              </h2>

              {/* Admin Post Event Key & Event Cycler */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                {upcomingEvents.length > 1 && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mr-2">
                    <button
                      onClick={() =>
                        setFeaturedEventIndex(
                          (prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length
                        )
                      }
                      className="px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-neutral-900 bg-white cursor-pointer"
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
                      className="px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-neutral-900 bg-white cursor-pointer"
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
                  className="text-xs font-mono font-semibold px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white border border-neutral-300 transition-colors text-neutral-800 cursor-pointer"
                >
                  Admin: Post Event
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setFormType('event');
                setIsModalOpen(true);
              }}
              className="text-xs font-mono font-semibold px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-neutral-900 transition-colors text-neutral-900 cursor-pointer self-start sm:self-auto"
            >
              Post Event
            </button>
          </div>
            {/* The Single Featured Event Card */}
            <div className="border border-neutral-200 rounded-3xl overflow-hidden bg-neutral-50/50 card-hover grid grid-cols-1 md:grid-cols-12 shadow-sm">
              {/* Event Image Banner */}
              <div className="md:col-span-6 relative min-h-[260px] sm:min-h-[340px] md:min-h-[380px] bg-neutral-100">
                {currentFeaturedEvent.imageUrl && (
                  <Image
                    src={currentFeaturedEvent.imageUrl}
                    alt={currentFeaturedEvent.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority={false}
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-lg text-xs font-mono font-bold text-neutral-900 shadow-sm">
                    Featured Event
                  </span>
                </div>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden card-hover flex flex-col justify-between"
              >
              {/* Event Details & Attendance Action */}
              <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Event Image */}
                  {evt.imageUrl && (
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-neutral-100">
                      <Image
                        src={evt.imageUrl}
                        alt={evt.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 mb-3">
                    <span className="font-semibold text-neutral-900">
                      {currentFeaturedEvent.eventDate}
                    </span>
                    <span>&middot;</span>
                    <span>{currentFeaturedEvent.eventTime}</span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2.5">
                      <span>{evt.eventDate}</span>
                      <span>{evt.eventTime}</span>
                    </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 leading-snug mb-3">
                    {currentFeaturedEvent.title}
                  </h3>

                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight leading-snug mb-2">
                      {evt.title}
                    </h3>
                  {/* Little / Short Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                    {currentFeaturedEvent.excerpt}
                  </p>

                    {/* Short, concise description */}
                    <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                      {evt.excerpt}
                    </p>

                    <div className="text-xs font-mono text-neutral-500 pt-2.5 border-t border-neutral-100">
                      Location: {evt.eventLocation}
                    </div>
                  <div className="space-y-1.5 text-xs font-mono text-neutral-600 pt-4 border-t border-neutral-200">
                    <div>Venue: {currentFeaturedEvent.eventLocation}</div>
                    {currentFeaturedEvent.speakers && (
                      <div>Hosts: {currentFeaturedEvent.speakers.join(', ')}</div>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex items-center justify-between border-t border-neutral-100">
                  <span className="text-[11px] font-mono text-neutral-400">
                    {evt.author}
                <div className="pt-6 mt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-neutral-400">
                    Organized by {currentFeaturedEvent.author}
                  </span>
                  <Link
                    href={evt.rsvpLink || '/join'}
                    className="text-xs font-mono font-bold text-neutral-900 hover:underline"
                  >
                    RSVP
                  </Link>

                  {registeredEvents.includes(currentFeaturedEvent.id) ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 font-mono text-xs font-semibold">
                      Attendance Confirmed
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
            ))}
          </div>
        </section>
            </div>
          </section>
        )}

        {/* 2. CONTROL STRIP: Typographic Filters, Search & Post Action */}
        {/* 2. CONTROL STRIP: Typographic Filters, Search & Admin Post Update Key */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
          {/* Search Box (No icons) */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search news & updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-900"
            />
          </div>

          {/* Clean Typographic Filter Pills */}
          <div className="flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                activeTab === 'all'
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                activeTab === 'news'
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                activeTab === 'event'
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Events
            </button>
          </div>

          {/* Post Action */}
          {/* Admin Post Update Action */}
          <button
            onClick={() => {
              setFormType('article');
              setIsModalOpen(true);
              setIsAdminModalOpen(true);
            }}
            className="btn-skeuo-dark font-bold rounded-xl px-5 py-2 text-xs font-mono cursor-pointer"
          >
            Post Update
            Admin: Post Update
          </button>
        </div>

        {/* 3. NEWS & BLOGS GRID WITH IMAGES (NO ICONS) */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-neutral-500 border border-neutral-200 rounded-xl bg-neutral-50">
            No entries found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isEvent = item.type === 'event';

              return (
                <article
                  key={item.id}
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden card-hover flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image for Blogs & News */}
                    {item.imageUrl && (
                      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Category Label + Date */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                        <span className="uppercase font-semibold tracking-wider text-neutral-800">
                          {isEvent ? 'Event' : 'News'}
                        </span>
                        <span>{item.date}</span>
                      </div>

                      {/* Headline */}
                      <h3 className="font-bold text-lg text-neutral-900 tracking-tight leading-snug mb-2">
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                        {item.excerpt}
                      </p>

                      {/* Event info line if event */}
                      {isEvent && item.eventDate && (
                        <div className="text-xs font-mono text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/70 mb-3">
                          <div>{item.eventDate} &middot; {item.eventTime}</div>
                          <div>
                            {item.eventDate} &middot; {item.eventTime}
                          </div>
                          <div className="text-neutral-500">{item.eventLocation}</div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded text-neutral-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs font-mono border-t border-neutral-100">
                    <span className="text-neutral-400">{item.author}</span>

                    <div className="flex items-center gap-3">
                      {item.isCustom && (
                        <button
                          onClick={() => handleDeleteCustomItem(item.id)}
                          className="text-neutral-500 hover:text-neutral-900 cursor-pointer underline text-[11px]"
                        >
                          Delete
                        </button>
                      )}

                      {item.sourceUrl ? (
                      {isEvent ? (
                        registeredEvents.includes(item.id) ? (
                          <span className="text-emerald-700 font-semibold text-[11px]">
                            Registered
                          </span>
                        ) : (
                          <button
                            onClick={() => setAttendanceModalEvent(item)}
                            className="font-semibold text-neutral-900 hover:underline cursor-pointer"
                          >
                            RSVP
                          </button>
                        )
                      ) : item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-neutral-900 hover:underline"
                        >
                          Read
                        </a>
                      ) : (
                        <span className="text-neutral-400">{item.readTime}</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>

      {/* 4. SITE OWNER PUBLISHER MODAL (CLEAN TYPOGRAPHY, NO ICONS) */}
      {isModalOpen && (
      {/* 4. EVENT ATTENDANCE REGISTRATION FORM MODAL */}
      {attendanceModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm select-none">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
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
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 mb-4 text-xs font-mono">
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
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
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
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Cohort / Class</label>
                  <select
                    value={attendeeCohort}
                    onChange={(e) => setAttendeeCohort(e.target.value)}
                    className="w-full px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
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
                    className="w-full px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
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
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-900 cursor-pointer"
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

      {/* 5. ADMIN PUBLISHER MODAL (ADMIN ONLY) */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm select-none">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">Post New Content</h3>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Admin Management
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Post New Content</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                onClick={() => setIsAdminModalOpen(false)}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 cursor-pointer px-2 py-1"
              >
                Close
              </button>
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-xl mb-5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setFormType('article')}
                onClick={() => setFormType('event')}
                className={`py-2 rounded-lg cursor-pointer transition-all ${
                  formType === 'article'
                  formType === 'event'
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                News
                Event
              </button>
              <button
                type="button"
                onClick={() => setFormType('event')}
                onClick={() => setFormType('article')}
                className={`py-2 rounded-lg cursor-pointer transition-all ${
                  formType === 'event'
                  formType === 'article'
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Event
                News
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-3.5 text-xs font-mono">
            <form onSubmit={handleAdminPublish} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder={formType === 'event' ? 'Event Name' : 'News Headline'}
                  placeholder={formType === 'event' ? 'Event Title' : 'News Headline'}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
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
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Author / Org</label>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Author / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="ENTS Desk"
                    placeholder="ENTS Executive Board"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Image URL (optional)</label>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    type="text"
                    placeholder={formType === 'event' ? '/events/demo-day.jpg' : '/news/coding-lab.jpg'}
                    placeholder={
                      formType === 'event' ? '/events/demo-day.jpg' : '/news/coding-lab.jpg'
                    }
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              {formType === 'article' && (
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">External Link (optional)</label>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    External Link (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formSourceUrl}
                    onChange={(e) => setFormSourceUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900"
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
                      className="w-full px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Time</label>
                    <input
                      type="text"
                      placeholder="16:00 CAT"
                      value={formEventTime}
                      onChange={(e) => setFormEventTime(e.target.value)}
                      className="w-full px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="RCA Lab"
                      value={formEventLocation}
                      onChange={(e) => setFormEventLocation(e.target.value)}
                      className="w-full px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-skeuo-dark font-bold px-5 py-2 rounded-xl cursor-pointer"
                >
                  Publish
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
