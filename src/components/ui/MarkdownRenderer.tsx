'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    if (!content) return '';
    try {
      return marked.parse(content, {
        async: false,
        breaks: true,
        gfm: true,
      }) as string;
    } catch {
      return content;
    }
  }, [content]);

  // Enhance code blocks with copy button on client
  useEffect(() => {
    if (!containerRef.current) return;
    const preBlocks = containerRef.current.querySelectorAll('pre');

    preBlocks.forEach((pre) => {
      if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

      const code = pre.querySelector('code');
      const textToCopy = code?.textContent || pre.textContent || '';
      
      const langClass = Array.from(code?.classList || []).find((c) => c.startsWith('language-'));
      const language = langClass ? langClass.replace('language-', '').toUpperCase() : 'CODE';

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper my-6 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-md';

      const header = document.createElement('div');
      header.className = 'flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs font-mono text-neutral-400';
      header.innerHTML = `
        <span class="uppercase tracking-wider font-semibold text-[10px] text-neutral-300">${language}</span>
        <button class="copy-btn flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors text-[11px] cursor-pointer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span class="copy-label">Copy</span>
        </button>
      `;

      const copyBtn = header.querySelector('.copy-btn');
      const copyLabel = header.querySelector('.copy-label');

      copyBtn?.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(textToCopy);
          if (copyLabel) copyLabel.textContent = 'Copied!';
          copyBtn.classList.add('text-emerald-400');
          setTimeout(() => {
            if (copyLabel) copyLabel.textContent = 'Copy';
            copyBtn.classList.remove('text-emerald-400');
          }, 2000);
        } catch {
          // ignore
        }
      });

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
      pre.classList.add('m-0', 'border-0', 'bg-transparent', 'shadow-none');
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={`ents-markdown ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
