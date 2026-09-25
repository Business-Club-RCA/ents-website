const fs = require('fs');
const { execSync } = require('child_process');

console.log('--- Applying 4 Content Types Update ---');

// ============================================================
// 1. Update src/types/index.ts
// ============================================================
let typesContent = fs.readFileSync('src/types/index.ts', 'utf8');
typesContent = typesContent.replace(
  "export type UpdateType = 'announcement' | 'article' | 'event';",
  "export type UpdateType = 'announcement' | 'event' | 'article' | 'external';"
);
fs.writeFileSync('src/types/index.ts', typesContent, 'utf8');
console.log('✓ Updated src/types/index.ts');

// ============================================================
// 2. Write src/lib/contentTypes.ts
// ============================================================
const contentTypesContent = `import { UpdateType } from '@/types';

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
`;
fs.writeFileSync('src/lib/contentTypes.ts', contentTypesContent, 'utf8');
console.log('✓ Written src/lib/contentTypes.ts');

// ============================================================
// 3. Update src/components/sections/UpdatesHub.tsx
// ============================================================
let hubContent = fs.readFileSync('src/components/sections/UpdatesHub.tsx', 'utf8');

// Add import if not present
if (!hubContent.includes('getUpdateTypeBadge')) {
  hubContent = hubContent.replace(
    "import { isEventPassed } from '@/lib/dateUtils';",
    "import { isEventPassed } from '@/lib/dateUtils';\nimport { getUpdateTypeBadge, getUpdateTypeLabel } from '@/lib/contentTypes';"
  );
}

// Update activeTab definition
hubContent = hubContent.replace(
  "const [activeTab, setActiveTab] = useState<'all' | 'news' | 'event'>('all');",
  "const [activeTab, setActiveTab] = useState<'all' | 'announcement' | 'event' | 'article' | 'external'>('all');"
);

// Update filteredItems logic
const oldFilter = `  // Filter items for main grid
  const filteredItems = activePublicItems.filter((item) => {
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
  });`;

const newFilter = `  // Filter items for main grid
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
  });`;

if (hubContent.includes(oldFilter)) {
  hubContent = hubContent.replace(oldFilter, newFilter);
}

// Update filter tray buttons
const oldTray = `          {/* Filter Tray */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 rounded-2xl border border-neutral-300/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.07)] text-xs font-mono">
            <button
              onClick={() => setActiveTab('all')}
              className={\`px-4 py-1.5 rounded-xl cursor-pointer transition-all \${
                activeTab === 'all' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              All Dispatches ({activePublicItems.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={\`px-4 py-1.5 rounded-xl cursor-pointer transition-all \${
                activeTab === 'news' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              Business Articles ({items.filter((i) => i.type !== 'event').length})
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={\`px-4 py-1.5 rounded-xl cursor-pointer transition-all \${
                activeTab === 'event' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              Events ({upcomingEvents.length})
            </button>
          </div>`;

const newTray = `          {/* Filter Tray */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 rounded-2xl border border-neutral-300/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.07)] text-xs font-mono overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={\`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap \${
                activeTab === 'all' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              All ({activePublicItems.length})
            </button>
            <button
              onClick={() => setActiveTab('announcement')}
              className={\`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap \${
                activeTab === 'announcement' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              Announcements ({items.filter((i) => i.type === 'announcement').length})
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={\`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap \${
                activeTab === 'event' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              Scheduled Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('article')}
              className={\`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap \${
                activeTab === 'article' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              Articles ({items.filter((i) => i.type === 'article').length})
            </button>
            <button
              onClick={() => setActiveTab('external')}
              className={\`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap \${
                activeTab === 'external' ? 'btn-skeuo-pill-active' : 'btn-skeuo-pill-inactive'
              }\`}
            >
              External References ({items.filter((i) => i.type === 'external').length})
            </button>
          </div>`;

if (hubContent.includes(oldTray)) {
  hubContent = hubContent.replace(oldTray, newTray);
}

// Update empty state
hubContent = hubContent.replace(
  `            {activeTab === 'event'
              ? 'No upcoming events scheduled at this moment. Stay tuned for future demo days and masterclasses!'
              : 'No articles or dispatches found matching your search.'}`,
  `            {activeTab === 'event'
              ? 'No upcoming events scheduled at this moment. Stay tuned for future demo days and masterclasses!'
              : activeTab === 'announcement'
              ? 'No announcements found matching your search.'
              : activeTab === 'external'
              ? 'No external references found matching your search.'
              : 'No articles or dispatches found matching your search.'}`
);

// Update card rendering in grid
hubContent = hubContent.replace(
  "const isEvent = item.type === 'event';",
  "const isEvent = item.type === 'event';\n              const isExternal = item.type === 'external';"
);

hubContent = hubContent.replace(
  "const articleHref = isEvent ? '#' : `/updates/${slug}`;",
  "const articleHref = isEvent ? '#' : isExternal && item.sourceUrl ? item.sourceUrl : `/updates/${slug}`;"
);

hubContent = hubContent.replace(
  `<span className="uppercase tracking-wider font-semibold text-neutral-600">
                          {isEvent ? 'EVENT DISPATCH' : 'BUSINESS DISPATCH'}
                        </span>`,
  `<span className="uppercase tracking-wider font-semibold text-neutral-700">
                          {getUpdateTypeLabel(item.type)}
                        </span>
                        {isExternal && item.sourceName && (
                          <span className="text-neutral-400 font-normal">
                            &middot; {item.sourceName}
                          </span>
                        )}`
);

hubContent = hubContent.replace(
  `<span className="skeuo-badge px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-neutral-900">
                            {isEvent ? 'EVENT' : 'ARTICLE'}
                          </span>`,
  `<span className="skeuo-badge px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-neutral-900">
                            {getUpdateTypeLabel(item.type)}
                          </span>`
);

// Footer CTA update
const oldFooterBtn = `                        {isEvent ? (
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
                        ) : (
                          <Link
                            href={articleHref}
                            className="btn-skeuo-light font-bold px-3.5 py-1.5 rounded-xl text-[11px] cursor-pointer hover:border-neutral-900"
                          >
                            Read &rarr;
                          </Link>
                        )}`;

const newFooterBtn = `                        {isEvent ? (
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
                        )}`;

if (hubContent.includes(oldFooterBtn)) {
  hubContent = hubContent.replace(oldFooterBtn, newFooterBtn);
}

fs.writeFileSync('src/components/sections/UpdatesHub.tsx', hubContent, 'utf8');
console.log('✓ Updated src/components/sections/UpdatesHub.tsx');

// ============================================================
// 4. Update src/app/updates/[id]/page.tsx
// ============================================================
let detailContent = fs.readFileSync('src/app/updates/[id]/page.tsx', 'utf8');
if (!detailContent.includes('getUpdateTypeBadge')) {
  detailContent = detailContent.replace(
    "import { slugify } from '@/lib/slug';",
    "import { slugify } from '@/lib/slug';\nimport { getUpdateTypeBadge, getUpdateTypeLabel } from '@/lib/contentTypes';"
  );
  detailContent = detailContent.replace(
    `<span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-800 font-semibold uppercase tracking-wider text-[10px]">
              {item.type === 'event' ? 'Event' : 'News'}
            </span>`,
    `<span className={\`px-2.5 py-0.5 rounded-md font-semibold uppercase tracking-wider text-[10px] border \${getUpdateTypeBadge(item.type).className}\`}>
              {getUpdateTypeLabel(item.type)}
            </span>`
  );
  fs.writeFileSync('src/app/updates/[id]/page.tsx', detailContent, 'utf8');
  console.log('✓ Updated src/app/updates/[id]/page.tsx');
}

// ============================================================
// 5. Update src/components/admin/AdminDashboard.tsx
// ============================================================
let adminContent = fs.readFileSync('src/components/admin/AdminDashboard.tsx', 'utf8');

// Import
if (!adminContent.includes('getUpdateTypeBadge')) {
  adminContent = adminContent.replace(
    "import { isEventPassed } from '@/lib/dateUtils';",
    "import { isEventPassed } from '@/lib/dateUtils';\nimport { getUpdateTypeBadge, getUpdateTypeLabel } from '@/lib/contentTypes';"
  );
}

// Modal state
if (!adminContent.includes('modalUpdateType')) {
  adminContent = adminContent.replace(
    "const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);",
    "const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);\n  const [modalUpdateType, setModalUpdateType] = useState<FeedItem['type']>('announcement');"
  );
}

// "+ Post New Dispatch" button handler
adminContent = adminContent.replace(
  `            <button
              onClick={() => {
                setEditingUpdate(null);
                setUpdateImageUrl('');
                setIsUpdateModalOpen(true);
              }}`,
  `            <button
              onClick={() => {
                setEditingUpdate(null);
                setModalUpdateType('announcement');
                setUpdateImageUrl('');
                setIsUpdateModalOpen(true);
              }}`
);

// Edit button handler
adminContent = adminContent.replace(
  `                      <button
                        onClick={() => {
                          setEditingUpdate(item);
                          setUpdateImageUrl(item.imageUrl || '');
                          setIsUpdateModalOpen(true);
                        }}`,
  `                      <button
                        onClick={() => {
                          setEditingUpdate(item);
                          setModalUpdateType(item.type || 'article');
                          setUpdateImageUrl(item.imageUrl || '');
                          setIsUpdateModalOpen(true);
                        }}`
);

// List badge
adminContent = adminContent.replace(
  `<span className="uppercase font-bold px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-800">
                          {item.type}
                        </span>`,
  `<span className={\`uppercase font-bold px-2 py-0.5 rounded text-[10px] border \${getUpdateTypeBadge(item.type).className}\`}>
                          {getUpdateTypeLabel(item.type)}
                        </span>`
);

// List featured badge (monochrome)
adminContent = adminContent.replace(
  `<span className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold">
                            ★ Hero Featured
                          </span>`,
  `<span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-white text-[10px] font-bold">
                            ★ Hero Featured
                          </span>`
);

adminContent = adminContent.replace(
  `item.featured ? 'text-amber-700' : 'text-neutral-500 hover:text-neutral-900'`,
  `item.featured ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-900'`
);

// handleSaveUpdate function
const oldSave = `    const isEvent = type === 'event';
    const featured = formData.get('featured') === 'on' || formData.get('featured') === 'true';

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
      featured,
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
    };`;

const newSave = `    const isEvent = type === 'event';
    const isExternal = type === 'external';
    const featured = formData.get('featured') === 'on' || formData.get('featured') === 'true';

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
      featured,
      sourceUrl: isExternal ? ((formData.get('sourceUrl') as string) || undefined) : undefined,
      sourceName: isExternal ? ((formData.get('sourceName') as string) || undefined) : undefined,
      rsvpLink: isEvent ? ((formData.get('rsvpLink') as string) || undefined) : undefined,
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
    };`;

if (adminContent.includes(oldSave)) {
  adminContent = adminContent.replace(oldSave, newSave);
}

// Replace the select and fields in update modal
const oldSelectBlock = `              <div className="grid grid-cols-2 gap-4">
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
              </div>`;

const newSelectBlock = `              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Content Type</label>
                <select
                  name="type"
                  value={modalUpdateType}
                  onChange={(e) => setModalUpdateType(e.target.value as FeedItem['type'])}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
                >
                  <option value="announcement">1. Announcement</option>
                  <option value="event">2. Scheduled Event</option>
                  <option value="article">3. Article</option>
                  <option value="external">4. External Reference</option>
                </select>
                <p className="text-[10px] text-neutral-400 mt-1">
                  {modalUpdateType === 'announcement' && 'Official announcements from our organization.'}
                  {modalUpdateType === 'event' && 'Upcoming or scheduled activities, demo days, and workshops.'}
                  {modalUpdateType === 'article' && 'Original articles written and published by our organization.'}
                  {modalUpdateType === 'external' && 'External publications, media coverage, partner announcements, or research papers.'}
                </p>
              </div>

              {/* EXTERNAL REFERENCE LOGISTICS */}
              {modalUpdateType === 'external' && (
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="font-bold text-neutral-800 uppercase text-[10px]">
                    External Publication Logistics
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-600 font-semibold mb-1">Source / Publisher Name</label>
                      <input
                        name="sourceName"
                        defaultValue={editingUpdate?.sourceName || ''}
                        required
                        placeholder="e.g. The New Times, TechCrunch"
                        className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-semibold mb-1">External URL / Link</label>
                      <input
                        name="sourceUrl"
                        type="url"
                        defaultValue={editingUpdate?.sourceUrl || ''}
                        required
                        placeholder="https://..."
                        className="w-full px-3.5 py-2 bg-white border border-neutral-300 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">
                    {modalUpdateType === 'external' ? 'Original Publication Date' : 'Publication Date'}
                  </label>
                  <input
                    name="date"
                    defaultValue={editingUpdate?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    required
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">
                    {modalUpdateType === 'event'
                      ? 'Organizer / Committee'
                      : modalUpdateType === 'external'
                      ? 'Author / Curator'
                      : 'Author / Committee'}
                  </label>
                  <input
                    name="author"
                    defaultValue={editingUpdate?.author || 'ENTS Editorial'}
                    required
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>`;

if (adminContent.includes(oldSelectBlock)) {
  adminContent = adminContent.replace(oldSelectBlock, newSelectBlock);
}

// Replace featured checkbox in update modal to be monochrome
adminContent = adminContent.replace(
  `<div className="flex items-center gap-3 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  defaultChecked={editingUpdate?.featured ?? false}
                  className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="featured" className="text-neutral-800 font-bold cursor-pointer text-xs">
                  Feature on Hero Section (Announcement banner &amp; highlight card)
                </label>
              </div>`,
  `<div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  defaultChecked={editingUpdate?.featured ?? false}
                  className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                />
                <label htmlFor="featured" className="text-neutral-800 font-bold cursor-pointer text-xs">
                  Feature on Hero Section (Rotates in top hero announcement strip)
                </label>
              </div>`
);

fs.writeFileSync('src/components/admin/AdminDashboard.tsx', adminContent, 'utf8');
console.log('✓ Updated src/components/admin/AdminDashboard.tsx');

// Check tsc
console.log('Running tsc verification...');
execSync('pnpm tsc --noEmit', { stdio: 'inherit' });
console.log('✓ TSC passed with 0 errors');

// Immediately commit to Git so VS Code cannot overwrite!
console.log('Committing to git...');
execSync('git add -A', { stdio: 'inherit' });
execSync('git commit -m "feat: complete support for exactly 4 content types in Admin CMS and public site"', { stdio: 'inherit' });
console.log('✓ Successfully committed to git!');
