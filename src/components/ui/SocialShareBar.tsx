'use client';

import React, { useState, useEffect } from 'react';
import { XIcon, LinkedInIcon, WhatsAppIcon, CopyIcon, Check, ShareIcon } from '@/components/ui/Icons';

interface SocialShareBarProps {
  title: string;
  url?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

function normalizeOfficialUrl(raw?: string): string {
  if (!raw) return 'https://www.entsclub.online';
  // Strip any old domain
  let clean = raw.replace(/https?:\/\/ents\.rca\.ac\.rw/gi, 'https://www.entsclub.online');
  clean = clean.replace(/ents\.rca\.ac\.rw/gi, 'www.entsclub.online');
  // If localhost was used in browser window.location, convert to official domain for sharing
  if (clean.includes('localhost') || clean.includes('127.0.0.1')) {
    try {
      const parsed = new URL(clean);
      return `https://www.entsclub.online${parsed.pathname}${parsed.search}`;
    } catch {
      return 'https://www.entsclub.online';
    }
  }
  if (clean.startsWith('/')) {
    return `https://www.entsclub.online${clean}`;
  }
  return clean;
}

export function SocialShareBar({
  title,
  url,
  description,
  className = '',
  compact = false,
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(() => normalizeOfficialUrl(url));

  useEffect(() => {
    if (!url && typeof window !== 'undefined') {
      setCurrentUrl(normalizeOfficialUrl(window.location.href));
    } else if (url) {
      setCurrentUrl(normalizeOfficialUrl(url));
    }
  }, [url]);

  const shareText = `${title} — Insights from ENTS at Rwanda Coding Academy`;

  const handleCopyLink = async () => {
    try {
      const linkToCopy = normalizeOfficialUrl(
        currentUrl || (typeof window !== 'undefined' ? window.location.href : '')
      );
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(linkToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || shareText,
          url: normalizeOfficialUrl(currentUrl),
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopyLink();
    }
  };

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(currentUrl)}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl
  )}`;

  const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n${currentUrl}`
  )}`;

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {/* X */}
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X"
          className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-900 text-neutral-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <XIcon size={13} />
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
          className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-[#0A66C2] text-neutral-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <LinkedInIcon size={13} />
        </a>

        {/* WhatsApp */}
        <a
          href={whatsAppShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on WhatsApp"
          className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-[#25D366] text-neutral-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <WhatsAppIcon size={13} />
        </a>

        {/* Copy Link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleCopyLink();
          }}
          title={copied ? 'Link Copied!' : 'Copy Article Link'}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shadow-xs cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-100 hover:bg-neutral-900 text-neutral-600 hover:text-white'
          }`}
        >
          {copied ? <Check size={13} /> : <CopyIcon size={13} />}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-sm">
          <ShareIcon size={15} />
        </div>
        <div>
          <div className="text-xs font-bold text-neutral-900">Share This Business Dispatch</div>
          <div className="text-[11px] font-mono text-neutral-500">
            Disseminate research with founders, analysts &amp; investors
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* X */}
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-xs font-mono font-medium text-neutral-800 transition-all shadow-xs"
        >
          <XIcon size={14} />
          <span>Post on X</span>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white text-xs font-mono font-medium text-neutral-800 transition-all shadow-xs"
        >
          <LinkedInIcon size={14} />
          <span>LinkedIn</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsAppShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-mono font-medium text-neutral-800 transition-all shadow-xs"
        >
          <WhatsAppIcon size={14} />
          <span>WhatsApp</span>
        </a>

        {/* Copy Link button */}
        <button
          onClick={handleCopyLink}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all shadow-xs cursor-pointer ${
            copied
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'bg-white border-neutral-200 hover:border-neutral-900 text-neutral-800 hover:bg-neutral-900 hover:text-white'
          }`}
        >
          {copied ? <Check size={14} /> : <CopyIcon size={14} />}
          <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}

