import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SocialShareBar } from '@/components/ui/SocialShareBar';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { getUpdates, getUpdate } from '@/lib/db';
import { slugify } from '@/lib/slug';

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const updates = await getUpdates();
  const params: { id: string }[] = [];
  for (const item of updates) {
    params.push({ id: item.id });
    const slug = slugify(item.title);
    if (slug && slug !== item.id) {
      params.push({ id: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getUpdate(id);

  if (!item) {
    return {
      title: 'Article Not Found · ENTS',
    };
  }

  const slug = slugify(item.title);
  const articleUrl = `https://ents.rca.ac.rw/updates/${slug || item.id}`;
  const ogImageUrl = item.imageUrl
    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `https://ents.rca.ac.rw${item.imageUrl}`)
    : 'https://ents.rca.ac.rw/ents-og.png';

  return {
    title: `${item.title} · ENTS`,
    description: item.excerpt,
    openGraph: {
      title: `${item.title} · ENTS`,
      description: item.excerpt,
      url: articleUrl,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.title} · ENTS`,
      description: item.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getUpdate(id);

  if (!item) {
    notFound();
  }

  const canonicalSlug = slugify(item.title) || item.id;
  const canonicalUrl = `https://ents.rca.ac.rw/updates/${canonicalSlug}`;

  // Related articles (excluding current item)
  const allUpdates = await getUpdates();
  const relatedItems = allUpdates
    .filter((i) => i.id !== item.id && i.type !== 'event')
    .slice(0, 2);

  return (
    <article className="py-12 sm:py-16 bg-white min-h-screen">
      <Container size="default">
        {/* 1. Back to Updates Nav */}
        <div className="mb-8">
          <Link
            href="/updates"
            className="text-xs font-mono font-medium text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr;</span>
            <span>Back to Updates</span>
          </Link>
        </div>

        {/* 2. Article Header */}
        <header className="space-y-4 mb-8 sm:mb-10 max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-800 font-semibold uppercase tracking-wider text-[10px]">
              {item.type === 'event' ? 'Event' : 'News'}
            </span>
            <span>&middot;</span>
            <span>{item.date}</span>
            <span>&middot;</span>
            <span>{item.readTime || '3 min read'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
            {item.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-xs font-mono text-neutral-600">
            <span>
              Written by <strong className="text-neutral-900">{item.author}</strong>
            </span>
          </div>

          {/* Social Share Bar Top */}
          <div className="pt-2">
            <SocialShareBar
              title={item.title}
              description={item.excerpt}
              url={canonicalUrl}
              compact={false}
            />
          </div>
        </header>

        {/* 3. Hero Feature Cover Image */}
        {item.imageUrl && (
          <div className="relative w-full h-70 sm:h-100 md:h-120 rounded-3xl overflow-hidden mb-10 border border-neutral-200 bg-neutral-100 shadow-sm">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* 4. Article Excerpt Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 mb-10">
          <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed italic">
            &ldquo;{item.excerpt}&rdquo;
          </p>
        </div>

        {/* 5. Main Body Content (Rendered via MarkdownRenderer) */}
        <div className="max-w-none text-neutral-800 text-base sm:text-lg leading-relaxed font-normal">
          <MarkdownRenderer content={item.content || item.excerpt} />
        </div>

        {/* 6. External Link Callout if applicable */}
        {item.sourceUrl && (
          <div className="mt-10 p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-neutral-500 font-semibold mb-1">
                External Publication
              </div>
              <p className="text-sm font-semibold text-neutral-900">
                Read the original article on {item.sourceName || 'external press'}
              </p>
            </div>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-skeuo-dark font-bold text-xs font-mono px-5 py-2.5 rounded-xl self-start sm:self-auto cursor-pointer"
            >
              Open External Source
            </a>
          </div>
        )}

        {/* 7. Tags */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono text-neutral-400 mr-2">Topics:</span>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md text-neutral-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Bottom Social Share */}
        <div className="mt-6">
          <SocialShareBar
            title={item.title}
            description={item.excerpt}
            url={canonicalUrl}
            compact={false}
          />
        </div>

        {/* 8. Society Publisher Bio Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="text-[11px] font-mono uppercase text-neutral-400 font-semibold tracking-wider">
              ENTS Editorial Desk
            </div>
            <h4 className="text-lg font-bold text-white">
              Entrepreneurs &amp; Traders Society
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
              Dispatches and research formulated by student founders and quantitative analysts at Rwanda Coding Academy.
            </p>
          </div>

          <Link
            href="/about"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-semibold transition-all shrink-0"
          >
            About Society
          </Link>
        </div>

        {/* 9. Related Articles Section */}
        {relatedItems.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-10 border-t border-neutral-200">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
              More From the Dispatch Feed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedItems.map((rel) => {
                const relSlug = slugify(rel.title) || rel.id;
                return (
                  <Link
                    key={rel.id}
                    href={`/updates/${relSlug}`}
                    className="group bg-white border border-neutral-200 rounded-2xl p-5 card-hover flex flex-col justify-between"
                  >
                    <div>
                      {rel.imageUrl && (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-neutral-100">
                          <Image
                            src={rel.imageUrl}
                            alt={rel.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="text-[11px] font-mono text-neutral-400 mb-1.5">
                        {rel.date}
                      </div>
                      <h4 className="font-bold text-base text-neutral-900 group-hover:text-neutral-950 line-clamp-2 mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-100 text-xs font-mono font-bold text-neutral-900">
                      Read Article &rarr;
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
