'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CopyIcon, Check } from '@/components/ui/Icons';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-md">
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 text-xs font-mono text-neutral-400">
        <span className="uppercase tracking-wider font-semibold text-[10px]">
          {language || 'CODE'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors text-[11px] cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed selection:bg-neutral-800">
        <pre className="m-0 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function parseInline(text: string): React.ReactNode {
  if (!text) return null;

  // Single regex for inline tokens (no recursion, linear pass)
  const pattern = /(!\[(.*?)\]\((.*?)\))|(\[(.*?)\]\((.*?)\))|(\x60([^\x60]+)\x60)|(\b_([^_]+)_\b|\*\*([^*]+)\*\*)|(~~([^~]+)~~)|(\b_([^_]+)_\b|\*([^*]+)\*)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const start = match.index;
    if (start > lastIndex) {
      parts.push(text.substring(lastIndex, start));
    }

    if (match[1]) {
      // Image: ![alt](url)
      parts.push(
        <img
          key={`img-${start}`}
          src={match[3]}
          alt={match[2]}
          className="inline-block max-h-96 rounded-xl my-2 border border-neutral-200"
        />
      );
    } else if (match[4]) {
      // Link: [text](url)
      const linkText = match[5];
      const linkUrl = match[6];
      const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');
      if (isExternal) {
        parts.push(
          <a
            key={`link-${start}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={`link-${start}`}
            href={linkUrl}
            className="font-semibold text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
          >
            {linkText}
          </Link>
        );
      }
    } else if (match[7]) {
      // Code: `code`
      parts.push(
        <code
          key={`code-${start}`}
          className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 font-mono text-xs text-neutral-900 font-semibold"
        >
          {match[8]}
        </code>
      );
    } else if (match[9] || match[10]) {
      // Bold: **bold**
      parts.push(
        <strong key={`bold-${start}`} className="font-bold text-neutral-900">
          {match[10] || match[9]}
        </strong>
      );
    } else if (match[11]) {
      // Strikethrough: ~~strike~~
      parts.push(
        <del key={`strike-${start}`} className="line-through text-neutral-400">
          {match[12]}
        </del>
      );
    } else if (match[13] || match[14]) {
      // Italic: *italic*
      parts.push(
        <em key={`italic-${start}`} className="italic text-neutral-800">
          {match[14] || match[13]}
        </em>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) return null;

  const normalized = content.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');

  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced Code Block
    if (line.trim().startsWith('\x60\x60\x60')) {
      const language = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('\x60\x60\x60')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      nodes.push(
        <CodeBlock
          key={`code-block-${nodes.length}`}
          code={codeLines.join('\n')}
          language={language}
        />
      );
      continue;
    }

    // Horizontal Rule
    if (/^(\s*[-*_]\s*){3,}$/.test(line)) {
      nodes.push(
        <hr
          key={`hr-${nodes.length}`}
          className="my-8 border-t border-neutral-200"
        />
      );
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();

      if (level === 1) {
        nodes.push(
          <h1
            key={`h1-${nodes.length}`}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-8 mb-4 border-b border-neutral-100 pb-2.5"
          >
            {parseInline(headingText)}
          </h1>
        );
      } else if (level === 2) {
        nodes.push(
          <h2
            key={`h2-${nodes.length}`}
            className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-7 mb-3"
          >
            {parseInline(headingText)}
          </h2>
        );
      } else if (level === 3) {
        nodes.push(
          <h3
            key={`h3-${nodes.length}`}
            className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 mt-6 mb-2"
          >
            {parseInline(headingText)}
          </h3>
        );
      } else {
        nodes.push(
          <h4
            key={`h4-${nodes.length}`}
            className="text-base sm:text-lg font-bold text-neutral-900 mt-5 mb-2"
          >
            {parseInline(headingText)}
          </h4>
        );
      }
      i++;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      nodes.push(
        <blockquote
          key={`quote-${nodes.length}`}
          className="p-4 sm:p-5 my-5 border-l-2 border-neutral-900 bg-neutral-50/80 rounded-r-2xl italic text-neutral-700 text-base sm:text-lg leading-relaxed shadow-xs"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className={qIdx > 0 ? 'mt-2' : ''}>
              {parseInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered List
    if (/^\s*[-*+]\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*[-*+]\s+/, ''));
        i++;
      }
      nodes.push(
        <ul key={`ul-${nodes.length}`} className="my-4 space-y-2 list-none pl-1">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-neutral-800 leading-relaxed text-base sm:text-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 shrink-0 mt-2.5" />
              <div className="flex-1">{parseInline(item)}</div>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems: { num: string; text: string }[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const m = lines[i].match(/^\s*(\d+)\.\s+(.+)$/);
        if (m) {
          listItems.push({ num: m[1], text: m[2] });
        }
        i++;
      }
      nodes.push(
        <ol key={`ol-${nodes.length}`} className="my-4 space-y-2 list-none pl-1">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-neutral-800 leading-relaxed text-base sm:text-lg">
              <span className="font-mono text-xs font-bold text-neutral-500 bg-neutral-100 border border-neutral-200/90 rounded-md w-5 h-5 flex items-center justify-center shrink-0 mt-1">
                {item.num}
              </span>
              <div className="flex-1">{parseInline(item.text)}</div>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim().startsWith('|') &&
        lines[i].trim().endsWith('|')
      ) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCols = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const bodyLines = tableLines.slice(2);

        nodes.push(
          <div
            key={`table-${nodes.length}`}
            className="my-6 overflow-x-auto rounded-xl border border-neutral-200 shadow-xs"
          >
            <table className="w-full text-left text-sm font-normal">
              <thead className="bg-neutral-100 border-b border-neutral-200 font-mono text-xs uppercase text-neutral-700">
                <tr>
                  {headerCols.map((hc, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 font-semibold">
                      {parseInline(hc)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {bodyLines.map((rowStr, rIdx) => {
                  const cells = rowStr
                    .split('|')
                    .slice(1, -1)
                    .map((c) => c.trim());
                  return (
                    <tr key={rIdx} className="hover:bg-neutral-50/60 transition-colors">
                      {cells.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3 text-neutral-800">
                          {parseInline(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('\x60\x60\x60') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) &&
      !/^(\s*[-*_]\s*){3,}$/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      nodes.push(
        <p
          key={`p-${nodes.length}`}
          className="text-base sm:text-lg leading-relaxed text-neutral-800 my-4"
        >
          {parseInline(paraLines.join(' '))}
        </p>
      );
    }
  }

  return <div className={`space-y-1 ${className}`}>{nodes}</div>;
}
