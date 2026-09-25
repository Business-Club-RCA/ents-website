'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import {
  Project,
  FeedItem,
  TrackInfo,
  TeamMember,
  ClubMember,
  LeaderboardEntry,
  StatItem,
  CohortApplication,
  Testimonial,
} from '@/types';
import {
  saveProjectAction,
  deleteProjectAction,
  saveUpdateAction,
  deleteUpdateAction,
  saveTrackAction,
  saveTeamMemberAction,
  deleteTeamMemberAction,
  saveClubMemberAction,
  deleteClubMemberAction,
  saveLeaderboardAction,
  deleteLeaderboardAction,
  saveTestimonialAction,
  deleteTestimonialAction,
  setFeaturedTestimonialAction,
  saveStatsAction,
  saveSiteConfigAction,
  updateApplicationStatusAction,
} from '@/actions/adminActions';
import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  Shield,
  Check,
  CloseIcon,
  GithubIcon,
  LinkedInIcon,
  XIcon,
  GlobeIcon,
  UserIcon,
} from '@/components/ui/Icons';
import { ProfileAvatar } from '@/components/ui/ProfileAvatar';
import { isEventPassed } from '@/lib/dateUtils';
import { slugify } from '@/lib/slug';

interface AdminDashboardProps {
  initialData: {
    siteConfig: any;
    stats: StatItem[];
    projects: Project[];
    updates: FeedItem[];
    tracks: TrackInfo[];
    team: TeamMember[];
    clubMembers: ClubMember[];
    leaderboard: LeaderboardEntry[];
    testimonials: Testimonial[];
    applications: CohortApplication[];
  };
}

type TabType =
  | 'overview'
  | 'projects'
  | 'updates'
  | 'stats'
  | 'tracks'
  | 'leaderboard'
  | 'team'
  | 'members'
  | 'testimonials'
  | 'applications';

export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Project Modal State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Update Modal State
  const [editingUpdate, setEditingUpdate] = useState<FeedItem | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Event Attendees Viewer Modal
  const [viewingAttendeesEvent, setViewingAttendeesEvent] = useState<FeedItem | null>(null);

  // Leaderboard Modal State
  const [editingLeaderboard, setEditingLeaderboard] = useState<LeaderboardEntry | null>(null);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);

  // Team Member Modal State
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // Club Member Modal State
  const [editingClubMember, setEditingClubMember] = useState<ClubMember | null>(null);
  const [isClubMemberModalOpen, setIsClubMemberModalOpen] = useState(false);

  // Testimonial Modal State
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  // Dynamic Image States for Cloudinary Uploads
  const [teamAvatarUrl, setTeamAvatarUrl] = useState('');
  const [memberAvatarUrl, setMemberAvatarUrl] = useState('');
  const [testimonialAvatarUrl, setTestimonialAvatarUrl] = useState('');
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [updateImageUrl, setUpdateImageUrl] = useState('');

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // -------------------------------------------------------------
  // PROJECT HANDLERS
  // -------------------------------------------------------------
  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = (formData.get('id') as string) || `proj-${Date.now()}`;
    const title = formData.get('title') as string;
    const tagline = formData.get('tagline') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as Project['status'];
    const category = formData.get('category') as Project['category'];
    const featured = formData.get('featured') === 'on';
    const imageUrl = projectImageUrl || (formData.get('imageUrl') as string) || '';
    const tags = (formData.get('tags') as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const project: Project = {
      id,
      title,
      tagline,
      description,
      status,
      category,
      featured,
      imageUrl: imageUrl || undefined,
      tags,
      metrics: editingProject?.metrics || [
        { label: 'Active Users', value: '100+' },
        { label: 'Status', value: status },
      ],
      links: {
        demo: (formData.get('demo') as string) || undefined,
        github: (formData.get('github') as string) || undefined,
      },
    };

    startTransition(async () => {
      try {
        await saveProjectAction(project);
        setData((prev) => {
          const exists = prev.projects.some((p) => p.id === project.id);
          return {
            ...prev,
            projects: exists
              ? prev.projects.map((p) => (p.id === project.id ? project : p))
              : [...prev.projects, project],
          };
        });
        setIsProjectModalOpen(false);
        setEditingProject(null);
        showStatus(`Project "${title}" saved successfully.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to save project', 'error');
      }
    });
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    startTransition(async () => {
      try {
        await deleteProjectAction(id);
        setData((prev) => ({
          ...prev,
          projects: prev.projects.filter((p) => p.id !== id),
        }));
        showStatus(`Project "${title}" deleted.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to delete project', 'error');
      }
    });
  };

  // -------------------------------------------------------------
  // UPDATE / DISPATCH HANDLERS
  // -------------------------------------------------------------
  const handleSaveUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = (formData.get('id') as string) || `item-${Date.now()}`;
    const title = formData.get('title') as string;
    const type = formData.get('type') as FeedItem['type'];
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const date = formData.get('date') as string;
    const imageUrl = updateImageUrl || (formData.get('imageUrl') as string) || '';
    const tags = (formData.get('tags') as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const isEvent = type === 'event';

    const item: FeedItem = {
      id,
      title,
      type,
      excerpt,
      content,
      author,
      date,
      tags,
      imageUrl: imageUrl || undefined,
      isCustom: true,
      eventDate: isEvent ? (formData.get('eventDate') as string) : undefined,
      eventTime: isEvent ? (formData.get('eventTime') as string) : undefined,
      eventLocation: isEvent ? (formData.get('eventLocation') as string) : undefined,
      speakers: isEvent
        ? (formData.get('speakers') as string)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
      attendees: editingUpdate?.attendees || [],
    };

    startTransition(async () => {
      try {
        await saveUpdateAction(item);
        setData((prev) => {
          const exists = prev.updates.some((u) => u.id === item.id);
          return {
            ...prev,
            updates: exists
              ? prev.updates.map((u) => (u.id === item.id ? item : u))
              : [item, ...prev.updates],
          };
        });
        setIsUpdateModalOpen(false);
        setEditingUpdate(null);
        showStatus(`Update "${title}" published.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to save update', 'error');
      }
    });
  };

  const handleDeleteUpdate = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    startTransition(async () => {
      try {
        await deleteUpdateAction(id);
        setData((prev) => ({
          ...prev,
          updates: prev.updates.filter((u) => u.id !== id),
        }));
        showStatus(`Update "${title}" deleted.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to delete update', 'error');
      }
    });
  };

  // CSV Export for Event RSVPs
  const exportAttendeesCSV = (event: FeedItem) => {
    if (!event.attendees || event.attendees.length === 0) {
      alert('No attendees registered for this event yet.');
      return;
    }
    const headers = ['Full Name', 'Email', 'Class Year', 'Registration Date'];
    const rows = event.attendees.map((a) => [
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.classYear}"`,
      `"${a.registeredAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `attendees-${event.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // STATS STRIP HANDLER
  // -------------------------------------------------------------
  const handleSaveStats = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedStats: StatItem[] = [0, 1, 2, 3].map((idx) => ({
      value: formData.get(`value_${idx}`) as string,
      label: formData.get(`label_${idx}`) as string,
      detail: formData.get(`detail_${idx}`) as string,
    }));

    startTransition(async () => {
      try {
        await saveStatsAction(updatedStats);
        setData((prev) => ({ ...prev, stats: updatedStats }));
        showStatus('Homepage Stats Strip telemetry updated successfully.');
      } catch (err: any) {
        showStatus(err?.message || 'Failed to update stats', 'error');
      }
    });
  };

  // -------------------------------------------------------------
  // LEADERBOARD HANDLERS
  // -------------------------------------------------------------
  const handleSaveLeaderboard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rank = parseInt(formData.get('rank') as string, 10) || data.leaderboard.length + 1;
    const name = formData.get('name') as string;
    const classYear = formData.get('classYear') as string;
    const track = formData.get('track') as LeaderboardEntry['track'];
    const assetClass = formData.get('assetClass') as string;
    const portfolioValue = parseFloat(formData.get('portfolioValue') as string) || 10000;
    const initialValue = 10000;
    const pnlPercent = parseFloat(formData.get('pnlPercent') as string) || 0;
    const tradesCount = parseInt(formData.get('tradesCount') as string, 10) || 0;
    const winRate = parseFloat(formData.get('winRate') as string) || 50;
    const status = formData.get('status') as LeaderboardEntry['status'];

    const entry: LeaderboardEntry = {
      rank,
      name,
      classYear,
      track,
      assetClass,
      portfolioValue,
      initialValue,
      pnlPercent,
      tradesCount,
      winRate,
      status,
    };

    startTransition(async () => {
      try {
        await saveLeaderboardAction(entry);
        setData((prev) => {
          const filtered = prev.leaderboard.filter((item) => item.name.toLowerCase() !== entry.name.toLowerCase());
          const next = [...filtered, entry].sort((a, b) => a.rank - b.rank);
          return { ...prev, leaderboard: next };
        });
        setIsLeaderboardModalOpen(false);
        setEditingLeaderboard(null);
        showStatus(`Trader "${name}" leaderboard entry updated.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to save leaderboard entry', 'error');
      }
    });
  };

  const handleDeleteLeaderboard = (name: string) => {
    if (!confirm(`Delete trader "${name}" from leaderboard?`)) return;
    startTransition(async () => {
      try {
        await deleteLeaderboardAction(name);
        setData((prev) => ({
          ...prev,
          leaderboard: prev.leaderboard.filter((e) => e.name.toLowerCase() !== name.toLowerCase()),
        }));
        showStatus(`Trader "${name}" removed from leaderboard.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to delete entry', 'error');
      }
    });
  };

  // -------------------------------------------------------------
  // TEAM MEMBER HANDLERS
  // -------------------------------------------------------------
  const handleSaveTeamMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = (formData.get('id') as string) || `exec-${Date.now()}`;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const track = formData.get('track') as TeamMember['track'];
    const classYear = formData.get('classYear') as string;
    const specialization = formData.get('specialization') as string;
    const bio = formData.get('bio') as string;
    const avatarUrl = formData.get('avatarUrl') as string;
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const member: TeamMember = {
      id,
      name,
      role,
      track,
      classYear,
      specialization,
      bio,
      avatarUrl: avatarUrl || undefined,
      initials,
      socials: {
        x: (formData.get('x') as string)?.trim() || undefined,
        linkedin: (formData.get('linkedin') as string)?.trim() || undefined,
        github: (formData.get('github') as string)?.trim() || undefined,
        portfolio: (formData.get('portfolio') as string)?.trim() || undefined,
      },
    };

    startTransition(async () => {
      try {
        await saveTeamMemberAction(member);
        setData((prev) => {
          const exists = prev.team.some((m) => m.id === member.id);
          return {
            ...prev,
            team: exists ? prev.team.map((m) => (m.id === member.id ? member : m)) : [...prev.team, member],
          };
        });
        setIsTeamModalOpen(false);
        setEditingTeamMember(null);
        showStatus(`Executive member "${name}" saved.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to save member', 'error');
      }
    });
  };

  const handleDeleteTeamMember = (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from executive leadership?`)) return;
    startTransition(async () => {
      try {
        await deleteTeamMemberAction(id);
        setData((prev) => ({
          ...prev,
          team: prev.team.filter((m) => m.id !== id),
        }));
        showStatus(`Executive member "${name}" removed.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to delete member', 'error');
      }
    });
  };

  // -------------------------------------------------------------
  // CLUB MEMBER HANDLERS
  // -------------------------------------------------------------
  const handleSaveClubMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = (formData.get('id') as string) || `member-${Date.now()}`;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const track = formData.get('track') as string;
    const classYear = formData.get('classYear') as string;
    const specialization = (formData.get('specialization') as string) || undefined;
    const bio = (formData.get('bio') as string) || undefined;
    const avatarUrl = (formData.get('avatarUrl') as string) || undefined;
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const member: ClubMember = {
      id,
      name,
      role,
      track,
      classYear,
      specialization,
      bio,
      avatarUrl,
      initials,
      socials: {
        x: (formData.get('x') as string)?.trim() || undefined,
        linkedin: (formData.get('linkedin') as string)?.trim() || undefined,
        github: (formData.get('github') as string)?.trim() || undefined,
        portfolio: (formData.get('portfolio') as string)?.trim() || undefined,
      },
    };

    startTransition(async () => {
      try {
        await saveClubMemberAction(member);
        setData((prev) => {
          const list = prev.clubMembers || [];
          const exists = list.some((m) => m.id === member.id);
          return {
            ...prev,
            clubMembers: exists ? list.map((m) => (m.id === member.id ? member : m)) : [...list, member],
          };
        });
        setIsClubMemberModalOpen(false);
        setEditingClubMember(null);
        showStatus(`Club member "${name}" saved.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to save club member', 'error');
      }
    });
  };

  const handleDeleteClubMember = (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from club members roster?`)) return;
    startTransition(async () => {
      try {
        await deleteClubMemberAction(id);
        setData((prev) => ({
          ...prev,
          clubMembers: (prev.clubMembers || []).filter((m) => m.id !== id),
        }));
        showStatus(`Club member "${name}" removed.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to delete club member', 'error');
      }
    });
  };

  // -------------------------------------------------------------
  // TESTIMONIAL HANDLERS
  // -------------------------------------------------------------
  const handleSaveTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = (formData.get('id') as string) || `test-${Date.now()}`;
    const author = formData.get('author') as string;
    const role = formData.get('role') as string;
    const quote = formData.get('quote') as string;
    const rating = Number(formData.get('rating') || 5);
    const avatarUrl = testimonialAvatarUrl || (formData.get('avatarUrl') as string) || '';
    const featured = formData.get('featured') === 'on';
    const badgeBg = (formData.get('badgeBg') as string) || 'bg-neutral-900 text-white';

    const newTestimonial: Testimonial = {
      id,
      author,
      role,
      quote,
      rating,
      avatarUrl,
      featured,
      badgeBg,
    };

    startTransition(async () => {
      try {
        await saveTestimonialAction(newTestimonial);
        setData((prev) => {
          const currentList = prev.testimonials || [];
          let updatedList = currentList.map((t) => {
            if (t.id === id) return newTestimonial;
            // If new one is featured, unfeature others
            if (featured) return { ...t, featured: false };
            return t;
          });
          if (!updatedList.some((t) => t.id === id)) {
            if (featured) {
              updatedList = updatedList.map((t) => ({ ...t, featured: false }));
            }
            updatedList.push(newTestimonial);
          }
          return {
            ...prev,
            testimonials: updatedList,
          };
        });
        setIsTestimonialModalOpen(false);
        setEditingTestimonial(null);
        showStatus(`Testimonial from "${author}" saved successfully.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to save testimonial', 'error');
      }
    });
  };

  const handleDeleteTestimonial = (id: string, name: string) => {
    if (!confirm(`Remove testimonial from "${name}"?`)) return;
    startTransition(async () => {
      try {
        await deleteTestimonialAction(id);
        setData((prev) => {
          const remaining = (prev.testimonials || []).filter((t) => t.id !== id);
          if (remaining.length > 0 && !remaining.some((t) => t.featured)) {
            remaining[0].featured = true;
          }
          return {
            ...prev,
            testimonials: remaining,
          };
        });
        showStatus(`Testimonial from "${name}" deleted.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to delete testimonial', 'error');
      }
    });
  };

  const handleSetFeaturedTestimonial = (id: string, name: string) => {
    startTransition(async () => {
      try {
        await setFeaturedTestimonialAction(id);
        setData((prev) => ({
          ...prev,
          testimonials: (prev.testimonials || []).map((t) => ({
            ...t,
            featured: t.id === id,
          })),
        }));
        showStatus(`"${name}" is now the featured showcase testimonial on the homepage.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to set featured testimonial', 'error');
      }
    });
  };

  // -------------------------------------------------------------
  // COHORT APPLICATION STATUS
  // -------------------------------------------------------------
  const handleUpdateAppStatus = (id: string, status: CohortApplication['status']) => {
    startTransition(async () => {
      try {
        await updateApplicationStatusAction(id, status);
        setData((prev) => ({
          ...prev,
          applications: prev.applications.map((a) => (a.id === id ? { ...a, status } : a)),
        }));
        showStatus(`Application marked as ${status}.`);
      } catch (err: any) {
        showStatus(err?.message || 'Failed to update application', 'error');
      }
    });
  };

  // Preset Dashboard Images
  const dashboardPresets = [
    { label: 'SIFS Quantitative Terminal', value: '/projects/sifs-dashboard.jpg' },
    { label: 'RCA Campus Commerce Grid', value: '/projects/rca-mart.jpg' },
    { label: 'AlphaStream Research Terminal', value: '/projects/alphastream.jpg' },
    { label: 'Student Ledger Treasury', value: '/projects/ledger.jpg' },
    { label: 'MacroPulse Radar', value: '/projects/macropulse.jpg' },
    { label: 'Studio Ventures Portal', value: '/projects/agency.jpg' },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Status Toast Notification */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-mono flex items-center justify-between shadow-lg transition-all animate-fadeIn ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full ${
                statusMessage.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
            <span className="font-semibold">{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-neutral-500 hover:text-neutral-900 cursor-pointer font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {/* Top Telemetry Header & Navigation Pills */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-1">
            SOCIETY CONTENT MANAGEMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Control Center Dashboard
          </h1>
        </div>

        {/* Tactile Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-200/50 rounded-2xl border border-neutral-300/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'overview' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'projects' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Projects ({data.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'updates' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Updates &amp; Events ({data.updates.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'stats' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Stats Strip
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'leaderboard' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Leaderboard ({data.leaderboard.length})
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'team' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Team ({data.team.length})
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'members' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Club Members ({data.clubMembers?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'testimonials' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Testimonials ({data.testimonials?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === 'applications' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
            }`}
          >
            Applications ({data.applications.length})
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          TAB 1: OVERVIEW & TELEMETRY
          ------------------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics Divided Strip */}
          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-px grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 shadow-sm">
            <div className="bg-white p-6 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Active Ventures</span>
              <div className="text-3xl font-bold font-mono text-neutral-900 mt-2">{data.projects.length}</div>
              <span className="text-xs text-neutral-500 font-mono mt-2">Projects in production</span>
            </div>
            <div className="bg-white p-6 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Dispatches &amp; Events</span>
              <div className="text-3xl font-bold font-mono text-neutral-900 mt-2">{data.updates.length}</div>
              <span className="text-xs text-neutral-500 font-mono mt-2">Published posts</span>
            </div>
            <div className="bg-white p-6 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Club Members</span>
              <div className="text-3xl font-bold font-mono text-neutral-900 mt-2">{data.clubMembers?.length || 0}</div>
              <span className="text-xs text-neutral-500 font-mono mt-2">Active student profiles</span>
            </div>
            <div className="bg-white p-6 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Ranked Traders</span>
              <div className="text-3xl font-bold font-mono text-neutral-900 mt-2">{data.leaderboard.length}</div>
              <span className="text-xs text-neutral-500 font-mono mt-2">Active portfolios</span>
            </div>
            <div className="bg-white p-6 flex flex-col justify-between col-span-2 md:col-span-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Applications</span>
              <div className="text-3xl font-bold font-mono text-neutral-900 mt-2">{data.applications.length}</div>
              <span className="text-xs text-neutral-500 font-mono mt-2">Pending reviews</span>
            </div>
          </div>

          {/* Quick Action Matrix with Separating Lines */}
          <div className="border border-neutral-200/90 rounded-3xl overflow-hidden bg-white shadow-sm p-7 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="skeuo-rivet" />
                <span className="font-bold text-neutral-800 uppercase tracking-wider">
                  QUICK CMS ACTION LAUNCHER
                </span>
              </div>
              <span className="skeuo-rivet" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  setEditingProject(null);
                  setProjectImageUrl('');
                  setIsProjectModalOpen(true);
                }}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <Briefcase size={18} />
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1 group-hover:underline">Add New Project</h4>
                <p className="text-xs text-neutral-500 font-normal">Publish software venture or dashboard</p>
              </button>

              <button
                onClick={() => {
                  setEditingUpdate(null);
                  setUpdateImageUrl('');
                  setIsUpdateModalOpen(true);
                }}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <span className="font-mono text-sm font-bold">+</span>
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1 group-hover:underline">Post News or Event</h4>
                <p className="text-xs text-neutral-500 font-normal">Schedule tournament or article</p>
              </button>

              <button
                onClick={() => {
                  setEditingLeaderboard(null);
                  setIsLeaderboardModalOpen(true);
                }}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <TrendingUp size={18} />
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1 group-hover:underline">Update Leaderboard</h4>
                <p className="text-xs text-neutral-500 font-normal">Add or edit trader PnL performance</p>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <Shield size={18} />
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1 group-hover:underline">Configure Stats Strip</h4>
                <p className="text-xs text-neutral-500 font-normal">Modify homepage headline numbers</p>
              </button>

              <button
                onClick={() => {
                  setEditingClubMember(null);
                  setMemberAvatarUrl('');
                  setIsClubMemberModalOpen(true);
                }}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <Shield size={18} />
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1 group-hover:underline">Add Club Member</h4>
                <p className="text-xs text-neutral-500 font-normal">Create profile with Cloudinary photo</p>
              </button>

              <button
                onClick={() => {
                  setEditingTestimonial(null);
                  setTestimonialAvatarUrl('');
                  setIsTestimonialModalOpen(true);
                }}
                className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <span className="text-amber-400 text-base leading-none">★</span>
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1 group-hover:underline">Add Testimonial</h4>
                <p className="text-xs text-neutral-500 font-normal">Add quote, rating, and set featured</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: PROJECTS CMS
          ------------------------------------------------------------- */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">All Software Ventures &amp; Products</h2>
              <p className="text-xs text-neutral-500 font-mono">Manage live cards, metrics, and real dashboard mockups</p>
            </div>
            <button
              onClick={() => {
                setEditingProject(null);
                setProjectImageUrl('');
                setIsProjectModalOpen(true);
              }}
              className="btn-skeuo-dark font-bold text-xs font-mono px-4 py-2 rounded-xl cursor-pointer"
            >
              + Create New Project
            </button>
          </div>

          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-sm">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-white p-5 flex flex-col justify-between relative group">
                <div>
                  {project.imageUrl && (
                    <div className="skeuo-recessed rounded-xl overflow-hidden relative w-full h-36 mb-4">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                    <span className="font-bold px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-800">
                      {project.category}
                    </span>
                    <span className={project.status === 'Live' ? 'text-emerald-700 font-bold' : 'text-neutral-500'}>
                      ● {project.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-neutral-900 mb-1 leading-snug">{project.title}</h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mb-3">{project.tagline}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setProjectImageUrl(project.imageUrl || '');
                      setIsProjectModalOpen(true);
                    }}
                    className="font-bold text-neutral-800 hover:underline cursor-pointer"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id, project.title)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: UPDATES & EVENTS CMS
          ------------------------------------------------------------- */}
      {activeTab === 'updates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">News, Announcements &amp; Events</h2>
              <p className="text-xs text-neutral-500 font-mono">Schedule tournaments, publish dispatches, view RSVPs</p>
            </div>
            <button
              onClick={() => {
                setEditingUpdate(null);
                setUpdateImageUrl('');
                setIsUpdateModalOpen(true);
              }}
              className="btn-skeuo-dark font-bold text-xs font-mono px-4 py-2 rounded-xl cursor-pointer"
            >
              + Post New Dispatch
            </button>
          </div>

          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-sm">
            {data.updates.map((item) => {
              const isEvent = item.type === 'event';
              const attendeeCount = item.attendees?.length || 0;

              return (
                <div key={item.id} className="bg-white p-5 flex flex-col justify-between relative group">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="uppercase font-bold px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-800">
                          {item.type}
                        </span>
                        {isEvent && (
                          isEventPassed(item.eventDate, item.eventTime) ? (
                            <span className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-500 text-[9px] font-semibold">
                              Concluded (Publicly Hidden)
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-[9px] font-semibold">
                              Live / Upcoming
                            </span>
                          )
                        )}
                      </div>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="font-bold text-base text-neutral-900 mb-1 leading-snug">{item.title}</h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 mb-3">{item.excerpt}</p>

                    {isEvent && (
                      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs font-mono space-y-1 mb-4">
                        <div className="font-bold text-neutral-900">{item.eventDate} &middot; {item.eventTime}</div>
                        <div className="text-neutral-500">{item.eventLocation}</div>
                        <div className="text-emerald-700 font-bold pt-1">
                          ✓ {attendeeCount} Confirmed Attendees
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditingUpdate(item);
                          setUpdateImageUrl(item.imageUrl || '');
                          setIsUpdateModalOpen(true);
                        }}
                        className="font-bold text-neutral-800 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      {isEvent && (
                        <button
                          onClick={() => setViewingAttendeesEvent(item)}
                          className="font-bold text-emerald-700 hover:underline cursor-pointer"
                        >
                          Roster ({attendeeCount})
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteUpdate(item.id, item.title)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 4: STATS STRIP CMS
          ------------------------------------------------------------- */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Homepage Stats Strip Telemetry</h2>
            <p className="text-xs text-neutral-500 font-mono">
              Update the 4 prominent numbers displayed across the homepage strip
            </p>
          </div>

          <form onSubmit={handleSaveStats} className="bg-white p-7 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                    METRIC 0{idx + 1}
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">Value (Large Number)</label>
                    <input
                      name={`value_${idx}`}
                      defaultValue={stat.value}
                      required
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl font-mono text-sm font-bold text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">Label</label>
                    <input
                      name={`label_${idx}`}
                      defaultValue={stat.label}
                      required
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-bold text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">Subtitle Detail</label>
                    <input
                      name={`detail_${idx}`}
                      defaultValue={stat.detail}
                      required
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-700"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="btn-skeuo-dark font-bold font-mono text-xs px-6 py-2.5 rounded-xl cursor-pointer"
              >
                {isPending ? 'Saving Stats...' : 'Save & Publish Stats Strip'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 5: LEADERBOARD CMS
          ------------------------------------------------------------- */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">SIFS Paper Trading League Standings</h2>
              <p className="text-xs text-neutral-500 font-mono">Manage live trader returns, ranks, and asset classes</p>
            </div>
            <button
              onClick={() => {
                setEditingLeaderboard(null);
                setIsLeaderboardModalOpen(true);
              }}
              className="btn-skeuo-dark font-bold text-xs font-mono px-4 py-2 rounded-xl cursor-pointer"
            >
              + Add Ranked Trader
            </button>
          </div>

          <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs font-mono divide-y divide-neutral-200">
              <thead className="bg-neutral-50 text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Trader Name</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Track</th>
                  <th className="px-4 py-3">Asset Focus</th>
                  <th className="px-4 py-3">Portfolio ($)</th>
                  <th className="px-4 py-3">PnL (%)</th>
                  <th className="px-4 py-3">Win Rate</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {data.leaderboard.map((entry) => (
                  <tr key={entry.name} className="hover:bg-neutral-50/70">
                    <td className="px-4 py-3 font-bold text-neutral-900">#{entry.rank}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{entry.name}</td>
                    <td className="px-4 py-3 text-neutral-500">{entry.classYear}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px]">
                        {entry.track}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{entry.assetClass}</td>
                    <td className="px-4 py-3 font-bold text-neutral-900">
                      ${entry.portfolioValue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700">+{entry.pnlPercent}%</td>
                    <td className="px-4 py-3 text-neutral-700">{entry.winRate}%</td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <button
                        onClick={() => {
                          setEditingLeaderboard(entry);
                          setIsLeaderboardModalOpen(true);
                        }}
                        className="text-neutral-800 hover:underline cursor-pointer font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLeaderboard(entry.name)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 6: TEAM CMS
          ------------------------------------------------------------- */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Executive Committee &amp; Leadership</h2>
              <p className="text-xs text-neutral-500 font-mono">Manage mentors, founders, bios, and portraits</p>
            </div>
            <button
              onClick={() => {
                setEditingTeamMember(null);
                setTeamAvatarUrl('');
                setIsTeamModalOpen(true);
              }}
              className="btn-skeuo-dark font-bold text-xs font-mono px-4 py-2 rounded-xl cursor-pointer"
            >
              + Add Executive Member
            </button>
          </div>

          <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-sm">
            {data.team.map((member) => (
              <div key={member.id} className="bg-white p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="avatar-skeuo-bezel relative w-24 h-24 rounded-full overflow-hidden bg-neutral-100">
                      <ProfileAvatar
                        src={member.avatarUrl}
                        name={member.name}
                        initials={member.initials}
                        size="lg"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                    {member.role}
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 mt-1">{member.name}</h3>
                  <p className="text-xs text-neutral-500 font-mono">{member.classYear}</p>
                  <p className="text-xs text-neutral-600 mt-2 line-clamp-3 font-normal">{member.bio}</p>

                  {/* Social Profile Badges in CMS Card */}
                  {Boolean(
                    member.socials &&
                      (member.socials.x ||
                        member.socials.linkedin ||
                        member.socials.github ||
                        member.socials.portfolio)
                  ) && (
                    <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-neutral-100">
                      {member.socials?.x && (
                        <a
                          href={member.socials.x}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-neutral-900 text-white hover:opacity-80"
                          title="X Profile"
                        >
                          <XIcon size={12} />
                        </a>
                      )}
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-[#0A66C2] text-white hover:opacity-80"
                          title="LinkedIn"
                        >
                          <LinkedInIcon size={12} />
                        </a>
                      )}
                      {member.socials?.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-[#18181b] text-white hover:opacity-80"
                          title="GitHub"
                        >
                          <GithubIcon size={12} />
                        </a>
                      )}
                      {member.socials?.portfolio && (
                        <a
                          href={member.socials.portfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-[#0284C7] text-white hover:opacity-80"
                          title="Portfolio"
                        >
                          <GlobeIcon size={12} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => {
                      setEditingTeamMember(member);
                      setTeamAvatarUrl(member.avatarUrl || '');
                      setIsTeamModalOpen(true);
                    }}
                    className="font-bold text-neutral-800 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeamMember(member.id, member.name)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 6b: CLUB MEMBERS CMS
          ------------------------------------------------------------- */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Active Club Members &amp; Profiles</h2>
              <p className="text-xs text-neutral-500 font-mono">Manage student member profiles, avatars, specialties, and tracks</p>
            </div>
            <button
              onClick={() => {
                setEditingClubMember(null);
                setMemberAvatarUrl('');
                setIsClubMemberModalOpen(true);
              }}
              className="btn-skeuo-dark font-bold text-xs font-mono px-4 py-2 rounded-xl cursor-pointer self-start sm:self-auto"
            >
              + Add Club Member
            </button>
          </div>

          {(data.clubMembers || []).length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-neutral-500 border border-neutral-200 rounded-2xl bg-white">
              No club members registered yet. Click &quot;+ Add Club Member&quot; to create the first profile.
            </div>
          ) : (
            <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-200/80 gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 shadow-sm">
              {(data.clubMembers || []).map((member) => (
                <div key={member.id} className="bg-white p-4 sm:p-5 flex flex-col justify-between group hover:bg-neutral-50/50 transition-colors">
                  <div>
                    {/* Round Avatar with Skeuomorphic Bezel & Profile Icon fallback */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="avatar-skeuo-bezel relative w-14 h-14 rounded-full overflow-hidden bg-neutral-100 shrink-0">
                        <ProfileAvatar
                          src={member.avatarUrl}
                          name={member.name}
                          initials={member.initials}
                          size="md"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm text-neutral-900 truncate">{member.name}</h3>
                        <p className="text-[11px] font-mono text-neutral-500 truncate">{member.role}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="btn-skeuo-light text-[9px] font-mono px-2 py-0.5 rounded font-semibold">
                            {member.classYear || 'RCA'}
                          </span>
                          <span className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-700 text-[9px] font-mono rounded">
                            {member.track || 'General'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-neutral-600 line-clamp-2 mt-2 font-normal">
                        {member.bio}
                      </p>
                    )}

                    {member.specialization && (
                      <div className="text-[10px] font-mono text-neutral-400 mt-1.5">
                        Focus: {member.specialization}
                      </div>
                    )}
                  </div>

                  {/* Actions & Real-World Social Links */}
                  <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      {member.socials?.x && (
                        <a
                          href={member.socials.x}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-neutral-900 text-white hover:opacity-80 transition-opacity"
                          title="X Profile"
                        >
                          <XIcon size={12} />
                        </a>
                      )}
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-[#0A66C2] text-white hover:opacity-80 transition-opacity"
                          title="LinkedIn"
                        >
                          <LinkedInIcon size={12} />
                        </a>
                      )}
                      {member.socials?.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-[#18181b] text-white hover:opacity-80 transition-opacity"
                          title="GitHub"
                        >
                          <GithubIcon size={12} />
                        </a>
                      )}
                      {member.socials?.portfolio && (
                        <a
                          href={member.socials.portfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="w-5 h-5 rounded flex items-center justify-center bg-[#0284C7] text-white hover:opacity-80 transition-opacity"
                          title="Portfolio"
                        >
                          <GlobeIcon size={12} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditingClubMember(member);
                          setMemberAvatarUrl(member.avatarUrl || '');
                          setIsClubMemberModalOpen(true);
                        }}
                        className="font-bold text-neutral-800 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClubMember(member.id, member.name)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB: TESTIMONIALS CMS
          ------------------------------------------------------------- */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Member Testimonials &amp; Social Proof</h2>
              <p className="text-xs text-neutral-500 font-mono">
                Manage student quotes, star ratings, portrait photos, and select which testimonial is featured on the homepage
              </p>
            </div>
            <button
              onClick={() => {
                setEditingTestimonial(null);
                setTestimonialAvatarUrl('');
                setIsTestimonialModalOpen(true);
              }}
              className="btn-skeuo-dark font-bold text-xs font-mono px-4 py-2 rounded-xl cursor-pointer self-start sm:self-auto"
            >
              + Add Testimonial
            </button>
          </div>

          {(data.testimonials || []).length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-neutral-500 border border-neutral-200 rounded-2xl bg-white">
              No testimonials published yet. Click &quot;+ Add Testimonial&quot; to add your first member quote.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(data.testimonials || []).map((t) => (
                <div
                  key={t.id}
                  className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                    t.featured
                      ? 'border-neutral-900 ring-2 ring-neutral-900/10 shadow-md'
                      : 'border-neutral-200/90 hover:border-neutral-300'
                  }`}
                >
                  <div>
                    {/* Header with Featured Indicator & Stars */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {t.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          ★ Featured Showcase
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Standard Card
                        </span>
                      )}

                      {/* Star Rating Display */}
                      <div className="flex items-center gap-1 text-orange-500 text-sm leading-none" title={`${t.rating || 5} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < (t.rating || 5) ? 'text-orange-500' : 'text-neutral-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Feedback / Quote */}
                    <blockquote className="text-xs sm:text-[13px] text-neutral-700 italic font-medium leading-relaxed mb-4 line-clamp-4">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author & Photo Details */}
                    <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
                      <div className="avatar-skeuo-bezel relative w-11 h-11 rounded-full overflow-hidden bg-neutral-100 shrink-0">
                        <ProfileAvatar
                          src={t.avatarUrl}
                          name={t.author}
                          size="sm"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900 truncate">
                          {t.author}
                        </h4>
                        <p className="text-[11px] font-mono text-neutral-500 truncate">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                    <div>
                      {!t.featured ? (
                        <button
                          type="button"
                          onClick={() => handleSetFeaturedTestimonial(t.id, t.author)}
                          className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold underline cursor-pointer"
                        >
                          Feature on Homepage
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          Active Homepage Hero
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTestimonial(t);
                          setTestimonialAvatarUrl(t.avatarUrl || '');
                          setIsTestimonialModalOpen(true);
                        }}
                        className="text-neutral-800 hover:underline cursor-pointer font-bold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(t.id, t.author)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 7: APPLICATIONS CMS
          ------------------------------------------------------------- */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div>
            
            <h2 className="text-xl font-bold text-neutral-900">Admissions &amp; Applications Archive</h2>
            <p className="text-xs text-neutral-500 font-mono">Society membership submissions and historical candidates</p>
          </div>

          {data.applications.length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-neutral-500 border border-neutral-200 rounded-2xl bg-white">
              No cohort applications submitted yet.
            </div>
          ) : (
            <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs font-mono divide-y divide-neutral-200">
                <thead className="bg-neutral-50 text-neutral-500">
                  <tr>
                    <th className="px-4 py-3">Applicant</th>
                    <th className="px-4 py-3">Class</th>
                    <th className="px-4 py-3">Preferred Track</th>
                    <th className="px-4 py-3">Motivation / Statement</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {data.applications.map((app) => (
                    <tr key={app.id} className="hover:bg-neutral-50/70">
                      <td className="px-4 py-3 font-bold text-neutral-900">
                        <div>{app.fullName}</div>
                        <div className="text-[11px] font-normal text-neutral-500">{app.email}</div>
                      </td>
                      <td className="px-4 py-3 text-neutral-600">{app.classYear}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px]">
                          {app.preferredTrack}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-xs truncate text-neutral-700">{app.reason}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            app.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'accepted')}
                          className="text-emerald-700 font-bold hover:underline cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                          className="text-red-600 font-bold hover:underline cursor-pointer"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          PROJECT MODAL
          ------------------------------------------------------------- */}
      {isProjectModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
          <div className="bg-white border border-neutral-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingProject ? 'Edit Venture Project' : 'Create New Venture Project'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setEditingProject(null);
                }}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Close modal"
                aria-label="Close modal"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
              <input type="hidden" name="id" defaultValue={editingProject?.id || ''} />

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Project Title</label>
                <input
                  name="title"
                  defaultValue={editingProject?.title || ''}
                  required
                  placeholder="e.g. Student Investment Fund Simulator"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Tagline</label>
                <input
                  name="tagline"
                  defaultValue={editingProject?.tagline || ''}
                  required
                  placeholder="Brief one-line summary"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingProject?.description || ''}
                  rows={3}
                  required
                  placeholder="Full description of software venture..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingProject?.status || 'Live'}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value="Live">Live</option>
                    <option value="In Development">In Development</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingProject?.category || 'Fintech'}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value="Fintech">Fintech</option>
                    <option value="Venture">Venture</option>
                    <option value="Platform">Platform</option>
                    <option value="Quantitative">Quantitative</option>
                  </select>
                </div>
              </div>

              <div>
                <CloudinaryImageInput
                  label="Project Cover / Dashboard Photo"
                  value={projectImageUrl}
                  onChange={setProjectImageUrl}
                  folder="ents/projects"
                />
                <input type="hidden" name="imageUrl" value={projectImageUrl} />
                <div className="mt-2 text-[11px] text-neutral-500 flex items-center gap-2">
                  <span>Or select a preset:</span>
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) setProjectImageUrl(e.target.value);
                    }}
                    className="px-2 py-1 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-700 text-xs"
                  >
                    <option value="">-- Choose Dashboard Preset --</option>
                    {dashboardPresets.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Tags (Comma-separated)</label>
                <input
                  name="tags"
                  defaultValue={editingProject?.tags.join(', ') || 'Next.js, Tailwind, Fintech'}
                  placeholder="Next.js, WebSockets, APIs"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Demo / Public URL</label>
                  <input
                    name="demo"
                    defaultValue={editingProject?.links?.demo || ''}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">GitHub URL</label>
                  <input
                    name="github"
                    defaultValue={editingProject?.links?.github || ''}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  defaultChecked={editingProject?.featured}
                  className="rounded border-neutral-300 text-neutral-900"
                />
                <label htmlFor="featured" className="text-neutral-700 font-semibold cursor-pointer">
                  Feature prominently on homepage &amp; projects hero
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsProjectModalOpen(false);
                    setEditingProject(null);
                  }}
                  className="btn-skeuo-light px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-skeuo-dark px-5 py-2 rounded-xl font-bold"
                >
                  {isPending ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          UPDATE / EVENT MODAL
          ------------------------------------------------------------- */}
      {isUpdateModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
          <div className="bg-white border border-neutral-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingUpdate ? 'Edit Dispatch / Event' : 'Publish New Dispatch / Event'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsUpdateModalOpen(false);
                  setEditingUpdate(null);
                }}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Close modal"
                aria-label="Close modal"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-4 text-xs font-mono">
              <input type="hidden" name="id" defaultValue={editingUpdate?.id || ''} />

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Headline / Title</label>
                <input
                  name="title"
                  defaultValue={editingUpdate?.title || ''}
                  required
                  placeholder="e.g. SIFS League Tournament: Round 04"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Type</label>
                  <select
                    name="type"
                    defaultValue={editingUpdate?.type || 'article'}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value="article">News Article</option>
                    <option value="event">Scheduled Event</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Publication Date</label>
                  <input
                    name="date"
                    defaultValue={editingUpdate?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    required
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Author / Committee</label>
                <input
                  name="author"
                  defaultValue={editingUpdate?.author || 'ENTS Editorial'}
                  required
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Short Excerpt (Summary)</label>
                <textarea
                  name="excerpt"
                  defaultValue={editingUpdate?.excerpt || ''}
                  rows={2}
                  required
                  placeholder="1-2 sentences summarizing the update..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Full Article / Details Content</label>
                <textarea
                  name="content"
                  defaultValue={editingUpdate?.content || ''}
                  rows={5}
                  placeholder="Full text / Markdown content for detail page..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                <div>
                  <div className="font-bold text-neutral-800 uppercase text-[10px]">
                    Event Logistics (Only required if type is &quot;Scheduled Event&quot;)
                  </div>
                  <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                    Live events appear on the public site while upcoming. Once the event date &amp; time concludes, it is automatically archived from the public feed.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-500 mb-1">Event Date</label>
                    <input
                      name="eventDate"
                      defaultValue={editingUpdate?.eventDate || ''}
                      placeholder="e.g. Saturday, March 28, 2026"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 mb-1">Event Time</label>
                    <input
                      name="eventTime"
                      defaultValue={editingUpdate?.eventTime || ''}
                      placeholder="e.g. 15:00 - 17:30 CAT"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Event Venue / Location</label>
                  <input
                    name="eventLocation"
                    defaultValue={editingUpdate?.eventLocation || ''}
                    placeholder="e.g. RCA Innovation Lab"
                    className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Speakers / Hosts (Comma-separated)</label>
                  <input
                    name="speakers"
                    defaultValue={editingUpdate?.speakers?.join(', ') || ''}
                    placeholder="Aline Umutoni, David Nshimiyimana"
                    className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <CloudinaryImageInput
                  label="Header / Event Cover Photo"
                  value={updateImageUrl}
                  onChange={setUpdateImageUrl}
                  folder="ents/updates"
                />
                <input type="hidden" name="imageUrl" value={updateImageUrl} />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Tags (Comma-separated)</label>
                <input
                  name="tags"
                  defaultValue={editingUpdate?.tags.join(', ') || 'RCA, Ventures, Fintech'}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsUpdateModalOpen(false);
                    setEditingUpdate(null);
                  }}
                  className="btn-skeuo-light px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-skeuo-dark px-5 py-2 rounded-xl font-bold"
                >
                  {isPending ? 'Publishing...' : 'Publish Dispatch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          EVENT ATTENDEES ROSTER MODAL
          ------------------------------------------------------------- */}
      {viewingAttendeesEvent && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
          <div className="bg-white border border-neutral-300 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                  CONFIRMED RSVP ROSTER
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{viewingAttendeesEvent.title}</h3>
              </div>
              <button
                onClick={() => setViewingAttendeesEvent(null)}
                className="text-neutral-500 hover:text-neutral-900 cursor-pointer font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">
                  Total Confirmed: <strong>{viewingAttendeesEvent.attendees?.length || 0} students</strong>
                </span>
                <button
                  onClick={() => exportAttendeesCSV(viewingAttendeesEvent)}
                  className="btn-skeuo-light font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  Export Roster (CSV)
                </button>
              </div>

              {!viewingAttendeesEvent.attendees || viewingAttendeesEvent.attendees.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200">
                  No attendees have registered for this event yet.
                </div>
              ) : (
                <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs divide-y divide-neutral-200">
                    <thead className="bg-neutral-50 text-neutral-500">
                      <tr>
                        <th className="px-4 py-2.5">Name</th>
                        <th className="px-4 py-2.5">Email</th>
                        <th className="px-4 py-2.5">Class Year</th>
                        <th className="px-4 py-2.5">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {viewingAttendeesEvent.attendees.map((att) => (
                        <tr key={att.id} className="hover:bg-neutral-50">
                          <td className="px-4 py-2.5 font-bold text-neutral-900">{att.fullName}</td>
                          <td className="px-4 py-2.5 text-neutral-600">{att.email}</td>
                          <td className="px-4 py-2.5 text-neutral-500">{att.classYear}</td>
                          <td className="px-4 py-2.5 text-neutral-400 text-[10px]">
                            {new Date(att.registeredAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          LEADERBOARD ENTRY MODAL
          ------------------------------------------------------------- */}
      {isLeaderboardModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
          <div className="bg-white border border-neutral-300 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingLeaderboard ? 'Edit Trader Standings' : 'Add Ranked Trader'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsLeaderboardModalOpen(false);
                  setEditingLeaderboard(null);
                }}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Close modal"
                aria-label="Close modal"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveLeaderboard} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Rank #</label>
                  <input
                    name="rank"
                    type="number"
                    defaultValue={editingLeaderboard?.rank || data.leaderboard.length + 1}
                    required
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Class Year</label>
                  <input
                    name="classYear"
                    defaultValue={editingLeaderboard?.classYear || 'Year 3'}
                    required
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Trader Full Name</label>
                <input
                  name="name"
                  defaultValue={editingLeaderboard?.name || ''}
                  required
                  placeholder="e.g. Aline Umutoni"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Track</label>
                  <select
                    name="track"
                    defaultValue={editingLeaderboard?.track || 'Traders'}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value="Traders">Traders</option>
                    <option value="Business Handlers">Business Handlers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Status</label>
                  <select
                    name="status"
                    defaultValue={editingLeaderboard?.status || 'Active'}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Asset Class Specialization</label>
                <input
                  name="assetClass"
                  defaultValue={editingLeaderboard?.assetClass || 'EUR-USD & Gold (XAU)'}
                  required
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Portfolio Value ($)</label>
                  <input
                    name="portfolioValue"
                    type="number"
                    step="0.01"
                    defaultValue={editingLeaderboard?.portfolioValue || 12500}
                    required
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Return PnL (%)</label>
                  <input
                    name="pnlPercent"
                    type="number"
                    step="0.01"
                    defaultValue={editingLeaderboard?.pnlPercent || 25.0}
                    required
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Total Trades Count</label>
                  <input
                    name="tradesCount"
                    type="number"
                    defaultValue={editingLeaderboard?.tradesCount || 40}
                    required
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Win Rate (%)</label>
                  <input
                    name="winRate"
                    type="number"
                    step="0.1"
                    defaultValue={editingLeaderboard?.winRate || 65.0}
                    required
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsLeaderboardModalOpen(false);
                    setEditingLeaderboard(null);
                  }}
                  className="btn-skeuo-light px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-skeuo-dark px-5 py-2 rounded-xl font-bold"
                >
                  {isPending ? 'Saving...' : 'Save Standings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TEAM MEMBER MODAL
          ------------------------------------------------------------- */}
      {isTeamModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
          <div className="bg-white border border-neutral-300 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingTeamMember ? 'Edit Executive Member' : 'Add Executive Member'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsTeamModalOpen(false);
                  setEditingTeamMember(null);
                }}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Close modal"
                aria-label="Close modal"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-4 text-xs font-mono">
              <input type="hidden" name="id" defaultValue={editingTeamMember?.id || ''} />

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Full Name</label>
                <input
                  name="name"
                  defaultValue={editingTeamMember?.name || ''}
                  required
                  placeholder="e.g. Cedric Mugisha"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Role Title</label>
                  <input
                    name="role"
                    defaultValue={editingTeamMember?.role || 'President'}
                    required
                    placeholder="e.g. President"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Class / Academic Year</label>
                  <input
                    name="classYear"
                    defaultValue={editingTeamMember?.classYear || 'Year 3'}
                    required
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Specialization Focus</label>
                <input
                  name="specialization"
                  defaultValue={editingTeamMember?.specialization || 'Software Ventures & Ecosystems'}
                  required
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Biography</label>
                <textarea
                  name="bio"
                  defaultValue={editingTeamMember?.bio || ''}
                  rows={3}
                  required
                  placeholder="Brief summary of leadership duties..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div>
                <CloudinaryImageInput
                  label="Avatar Portrait Photo"
                  value={teamAvatarUrl}
                  onChange={setTeamAvatarUrl}
                  folder="ents/team"
                />
                <input type="hidden" name="avatarUrl" value={teamAvatarUrl} />
              </div>

              {/* Social Profiles Section */}
              <div className="border-t border-neutral-200 pt-3">
                <span className="block text-neutral-700 mb-1.5 font-semibold">Social Profiles (Optional)</span>
                <p className="text-[11px] text-neutral-500 mb-2.5 font-normal">
                  Add links for the profiles you want to display. If left blank, the icon will not appear on the profile.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs" title="X">
                      <XIcon size={14} />
                    </span>
                    <input
                      name="x"
                      defaultValue={editingTeamMember?.socials?.x || ''}
                      placeholder="X (Twitter) URL (e.g. https://x.com/username)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-xs" title="LinkedIn">
                      <LinkedInIcon size={14} />
                    </span>
                    <input
                      name="linkedin"
                      defaultValue={editingTeamMember?.socials?.linkedin || ''}
                      placeholder="LinkedIn URL (e.g. https://linkedin.com/in/username)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#18181b] text-white flex items-center justify-center shrink-0 shadow-xs" title="GitHub">
                      <GithubIcon size={14} />
                    </span>
                    <input
                      name="github"
                      defaultValue={editingTeamMember?.socials?.github || ''}
                      placeholder="GitHub URL (e.g. https://github.com/username)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-xs" title="Portfolio">
                      <GlobeIcon size={14} />
                    </span>
                    <input
                      name="portfolio"
                      defaultValue={editingTeamMember?.socials?.portfolio || ''}
                      placeholder="Portfolio / Website URL (e.g. https://portfolio.com)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsTeamModalOpen(false);
                    setEditingTeamMember(null);
                  }}
                  className="btn-skeuo-light px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-skeuo-dark px-5 py-2 rounded-xl font-bold"
                >
                  {isPending ? 'Saving...' : 'Save Executive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          CLUB MEMBER MODAL
          ------------------------------------------------------------- */}
      {isClubMemberModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
          <div className="bg-white border border-neutral-300 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingClubMember ? 'Edit Club Member Profile' : 'Add Club Member Profile'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsClubMemberModalOpen(false);
                  setEditingClubMember(null);
                }}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Close modal"
                aria-label="Close modal"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveClubMember} className="space-y-4 text-xs font-mono">
              <input type="hidden" name="id" defaultValue={editingClubMember?.id || ''} />

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Full Name *</label>
                <input
                  name="name"
                  defaultValue={editingClubMember?.name || ''}
                  required
                  placeholder="e.g. Kevine Ishimwe"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Role / Specialty *</label>
                  <input
                    name="role"
                    defaultValue={editingClubMember?.role || 'Quant Derivatives Analyst'}
                    required
                    placeholder="e.g. Quant Derivatives Analyst"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Track</label>
                  <select
                    name="track"
                    defaultValue={editingClubMember?.track || 'Traders'}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value="Traders">Traders</option>
                    <option value="Business Handlers">Business Handlers</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Executive">Executive</option>
                    <option value="Advisory">Advisory</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Academic Year</label>
                  <select
                    name="classYear"
                    defaultValue={editingClubMember?.classYear || 'Year 2'}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Specialization Focus</label>
                  <input
                    name="specialization"
                    defaultValue={editingClubMember?.specialization || ''}
                    placeholder="e.g. Python Backtesting"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Brief Bio</label>
                <textarea
                  name="bio"
                  defaultValue={editingClubMember?.bio || ''}
                  rows={2}
                  placeholder="Short member background or society focus..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              {/* Cloudinary Profile Photo Uploader */}
              <CloudinaryImageInput
                label="Profile Avatar Photo"
                value={memberAvatarUrl}
                onChange={setMemberAvatarUrl}
                folder="ents/members"
              />
              <input type="hidden" name="avatarUrl" value={memberAvatarUrl} />

              {/* Social Profiles Section */}
              <div className="border-t border-neutral-200 pt-3">
                <span className="block text-neutral-700 mb-1.5 font-semibold">Social Profiles (Optional)</span>
                <p className="text-[11px] text-neutral-500 mb-2.5 font-normal">
                  Add links for the profiles you want to display. If left blank, the icon will not appear on the profile.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs" title="X">
                      <XIcon size={14} />
                    </span>
                    <input
                      name="x"
                      defaultValue={editingClubMember?.socials?.x || ''}
                      placeholder="X (Twitter) URL (e.g. https://x.com/username)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-xs" title="LinkedIn">
                      <LinkedInIcon size={14} />
                    </span>
                    <input
                      name="linkedin"
                      defaultValue={editingClubMember?.socials?.linkedin || ''}
                      placeholder="LinkedIn URL (e.g. https://linkedin.com/in/username)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#18181b] text-white flex items-center justify-center shrink-0 shadow-xs" title="GitHub">
                      <GithubIcon size={14} />
                    </span>
                    <input
                      name="github"
                      defaultValue={editingClubMember?.socials?.github || ''}
                      placeholder="GitHub URL (e.g. https://github.com/username)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-xs" title="Portfolio">
                      <GlobeIcon size={14} />
                    </span>
                    <input
                      name="portfolio"
                      defaultValue={editingClubMember?.socials?.portfolio || ''}
                      placeholder="Portfolio / Website URL (e.g. https://portfolio.com)"
                      className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsClubMemberModalOpen(false);
                    setEditingClubMember(null);
                  }}
                  className="btn-skeuo-light px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-skeuo-dark px-5 py-2 rounded-xl font-bold"
                >
                  {isPending ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TESTIMONIAL MODAL
          ------------------------------------------------------------- */}
      {isTestimonialModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
          <div className="bg-white border border-neutral-300 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsTestimonialModalOpen(false);
                  setEditingTestimonial(null);
                }}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Close modal"
                aria-label="Close modal"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs font-mono">
              <input type="hidden" name="id" defaultValue={editingTestimonial?.id || ''} />

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Author Name *</label>
                <input
                  name="author"
                  defaultValue={editingTestimonial?.author || ''}
                  required
                  placeholder="e.g. Cedric Mugisha"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Role / Affiliation *</label>
                  <input
                    name="role"
                    defaultValue={editingTestimonial?.role || ''}
                    required
                    placeholder="e.g. VP & Lead Trader"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Star Rating (1-5) *</label>
                  <select
                    name="rating"
                    defaultValue={editingTestimonial?.rating ?? 5}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Feedback / Quote *</label>
                <textarea
                  name="quote"
                  defaultValue={editingTestimonial?.quote || ''}
                  rows={4}
                  required
                  placeholder="What did this member say about ENTS, SIFS, or club ventures? Emojis supported..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              {/* Cloudinary Profile Photo Uploader */}
              <CloudinaryImageInput
                label="Portrait Photo"
                value={testimonialAvatarUrl}
                onChange={setTestimonialAvatarUrl}
                folder="ents/testimonials"
              />
              <input type="hidden" name="avatarUrl" value={testimonialAvatarUrl} />

              {/* Featured Showcase Checkbox */}
              <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="featured-testimonial-check"
                  name="featured"
                  defaultChecked={Boolean(editingTestimonial?.featured)}
                  className="mt-0.5 rounded border-amber-300 text-neutral-900 focus:ring-amber-500 cursor-pointer w-4 h-4"
                />
                <label htmlFor="featured-testimonial-check" className="cursor-pointer">
                  <span className="block font-bold text-amber-950 text-xs">
                    Feature as Primary Homepage Showcase
                  </span>
                  <span className="block text-[11px] text-amber-800 font-normal mt-0.5 leading-snug">
                    Displays this testimonial prominently in the large portrait card in the center of the homepage.
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-semibold">Card Accent Style</label>
                <select
                  name="badgeBg"
                  defaultValue={editingTestimonial?.badgeBg || 'bg-neutral-900 text-white'}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-[11px]"
                >
                  <option value="bg-neutral-900 text-white">Classic Dark (Neutral 900)</option>
                  <option value="bg-orange-500 text-white">Vibrant Orange</option>
                  <option value="bg-indigo-600 text-white">Royal Indigo</option>
                  <option value="bg-emerald-600 text-white">Emerald Green</option>
                  <option value="bg-purple-600 text-white">Deep Purple</option>
                  <option value="bg-amber-500 text-white">Amber Gold</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsTestimonialModalOpen(false);
                    setEditingTestimonial(null);
                  }}
                  className="btn-skeuo-light px-4 py-2 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-skeuo-dark px-5 py-2 rounded-xl font-bold cursor-pointer"
                >
                  {isPending ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// CLIENT-SIDE IMAGE COMPRESSION HELPER
// Always compresses to WebP at max 1200px on longest side and
// quality 0.75 so uploads stay well under server payload limits.
// -------------------------------------------------------------
async function compressImageClient(file: File): Promise<File> {
  const MAX_DIM = 1200;
  const QUALITY = 0.75;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(file);
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
          },
          'image/webp',
          QUALITY
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

// -------------------------------------------------------------
// CLOUDINARY IMAGE INPUT WITH LIVE UPLOAD & PREVIEW
// -------------------------------------------------------------
function CloudinaryImageInput({
  label = 'Image / Photo',
  value,
  onChange,
  folder = 'ents',
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // 1. Client-side size limit validation (15MB)
      if (rawFile.size > 15 * 1024 * 1024) {
        throw new Error('Image exceeds 15MB limit. Please choose a smaller image.');
      }

      // 2. Client-side compression: always compress raster images to WebP
      let uploadFile = rawFile;
      if (
        rawFile.type.startsWith('image/') &&
        !rawFile.type.includes('svg') &&
        !rawFile.type.includes('gif')
      ) {
        try {
          uploadFile = await compressImageClient(rawFile);
        } catch {
          uploadFile = rawFile;
        }
      }

      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const responseText = await res.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch {
        if (res.status === 413) {
          throw new Error('Image is too large for upload. Please choose an image under 10MB.');
        }
        throw new Error(`Upload server error (${res.status}): ${responseText.slice(0, 100)}`);
      }

      if (!res.ok || !data.success) {
        setUploadError(data.error || 'Upload to Cloudinary failed.');
      } else {
        onChange(data.url);
      }
    } catch (err: any) {
      setUploadError(err?.message || 'Network error during upload.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-mono">
        <label className="font-semibold text-neutral-700">{label}</label>
        <span className="text-[10px] text-neutral-400">Cloudinary CDN</span>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or choose local file"
          className="flex-1 px-3 py-2 text-xs font-mono bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900"
        />
        <label className={`btn-skeuo-light px-3 py-2 text-xs font-mono font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0 transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <span className="inline-block w-3 h-3 border-2 border-neutral-800 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
          <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
        </label>
      </div>

      {uploadError && (
        <p className="text-[11px] font-mono text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          {uploadError}
        </p>
      )}

      {value && (
        <div className="flex items-center gap-2.5 p-2 bg-neutral-100/70 border border-neutral-200 rounded-xl mt-1.5">
          <div className="w-10 h-10 rounded-lg overflow-hidden relative border border-neutral-300 bg-white shrink-0">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-500 truncate flex-1">
            {value}
          </span>
          <button
            type="button"
            onClick={() => onChange('')}
            className="w-6 h-6 rounded-md bg-neutral-200/80 hover:bg-red-100 hover:text-red-700 flex items-center justify-center text-neutral-500 transition-colors cursor-pointer shrink-0 ml-1"
            title="Remove photo"
            aria-label="Remove photo"
          >
            <CloseIcon size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

