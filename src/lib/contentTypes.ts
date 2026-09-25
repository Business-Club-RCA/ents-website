import { UpdateType } from '@/types';

export interface ContentTypeMeta {
  type: UpdateType;
  label: string;
  shortLabel: string;
  badgeText: string;
  description: string;
}

export const CONTENT_TYPES: ContentTypeMeta[] = [
  {
    type: 'announcement',
    label: 'Announcement',
    shortLabel: 'Announcement',
    badgeText: 'Announcement',
    description: 'Official announcements from our organization',
  },
  {
    type: 'event',
    label: 'Scheduled Event',
    shortLabel: 'Event',
    badgeText: 'Scheduled Event',
    description: 'Upcoming or scheduled activities and events',
  },
  {
    type: 'article',
    label: 'Article',
    shortLabel: 'Article',
    badgeText: 'Article',
    description: 'Original articles written and published by our organization',
  },
  {
    type: 'external',
    label: 'External Reference',
    shortLabel: 'External',
    badgeText: 'External Reference',
    description: 'External publications, media coverage, partner announcements, or research papers',
  },
];

export function getUpdateTypeLabel(type: UpdateType | string): string {
  switch (type) {
    case 'announcement':
      return 'Announcement';
    case 'event':
      return 'Scheduled Event';
    case 'article':
      return 'Article';
    case 'external':
      return 'External Reference';
    default:
      return 'Article';
  }
}

export function getUpdateTypeBadge(type: UpdateType | string): {
  label: string;
  className: string;
} {
  switch (type) {
    case 'announcement':
      return {
        label: 'Announcement',
        className: 'bg-neutral-900 text-white border-neutral-700',
      };
    case 'event':
      return {
        label: 'Scheduled Event',
        className: 'bg-neutral-100 text-neutral-900 border-neutral-300',
      };
    case 'article':
      return {
        label: 'Article',
        className: 'bg-neutral-800 text-white border-neutral-600',
      };
    case 'external':
      return {
        label: 'External Reference',
        className: 'bg-white text-neutral-800 border-neutral-300',
      };
    default:
      return {
        label: 'Article',
        className: 'bg-neutral-800 text-white border-neutral-600',
      };
  }
}
