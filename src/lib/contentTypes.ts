import { UpdateType } from '@/types';

export interface ContentTypeDefinition {
  type: UpdateType;
  label: string;
  badgeLabel: string;
  description: string;
}

export const CONTENT_TYPES: ContentTypeDefinition[] = [
  {
    type: 'announcement',
    label: 'Announcement',
    badgeLabel: 'Announcement',
    description: 'Official announcements from our organization',
  },
  {
    type: 'event',
    label: 'Scheduled Event',
    badgeLabel: 'Scheduled Event',
    description: 'Upcoming or scheduled activities and events',
  },
  {
    type: 'article',
    label: 'Article',
    badgeLabel: 'Article',
    description: 'Original articles written and published by our organization',
  },
  {
    type: 'external',
    label: 'External Reference',
    badgeLabel: 'External Reference',
    description: 'External news, articles, reports, or references linking to an outside source',
  },
];

export function getUpdateTypeLabel(type?: string): string {
  switch (type) {
    case 'announcement':
      return 'Announcement';
    case 'event':
      return 'Scheduled Event';
    case 'external':
      return 'External Reference';
    case 'article':
    default:
      return 'Article';
  }
}
