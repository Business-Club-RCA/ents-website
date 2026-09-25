import { UpdateType } from '@/types';

export interface ContentTypeMeta {
  type: UpdateType;
  label: string;
  badgeLabel: string;
  description: string;
}

export const CONTENT_TYPES: ContentTypeMeta[] = [
  {
    type: 'announcement',
    label: 'Announcement',
    badgeLabel: 'ANNOUNCEMENT',
    description: 'Official announcements from our organization.',
  },
  {
    type: 'event',
    label: 'Scheduled Event',
    badgeLabel: 'SCHEDULED EVENT',
    description: 'Upcoming or scheduled activities, sessions, and events.',
  },
  {
    type: 'article',
    label: 'Article',
    badgeLabel: 'ARTICLE',
    description: 'Original articles written and published by our organization.',
  },
  {
    type: 'external',
    label: 'External Reference',
    badgeLabel: 'EXTERNAL REFERENCE',
    description: 'External news coverage, partner mentions, press releases, or external publications.',
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
      return type;
  }
}

export function getUpdateTypeBadge(type: UpdateType | string): string {
  switch (type) {
    case 'announcement':
      return 'ANNOUNCEMENT';
    case 'event':
      return 'SCHEDULED EVENT';
    case 'article':
      return 'ARTICLE';
    case 'external':
      return 'EXTERNAL REFERENCE';
    default:
      return typeof type === 'string' ? type.toUpperCase() : 'UPDATE';
  }
}
