/**
 * Date and time parsing utilities for event scheduling and automatic expiration
 */

export function parseEventEndDateTime(
  eventDate?: string,
  eventTime?: string
): Date | null {
  if (!eventDate || !eventDate.trim()) return null;

  try {
    let cleanDateStr = eventDate
      .replace(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),\s*/i, '')
      .trim();

    const isoMatch = cleanDateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10) - 1;
      const day = parseInt(isoMatch[3], 10);
      cleanDateStr = new Date(year, month, day).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }

    let hours = 23;
    let minutes = 59;
    let seconds = 59;

    if (eventTime && eventTime.trim()) {
      const parts = eventTime.split(/[-–—]|(\bto\b)/i);
      const endPart = parts[parts.length - 1].trim();

      const match12 = endPart.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
      if (match12) {
        let h = parseInt(match12[1], 10);
        const m = match12[2] ? parseInt(match12[2], 10) : 0;
        const meridian = match12[3].toLowerCase();
        if (meridian === 'pm' && h < 12) h += 12;
        if (meridian === 'am' && h === 12) h = 0;
        hours = h;
        minutes = m;
        seconds = 0;
      } else {
        const match24 = endPart.match(/(\d{1,2}):(\d{2})/);
        if (match24) {
          hours = parseInt(match24[1], 10);
          minutes = parseInt(match24[2], 10);
          seconds = 0;
        }
      }
    }

    const parsedDate = new Date(cleanDateStr);
    if (isNaN(parsedDate.getTime())) {
      return null;
    }

    parsedDate.setHours(hours, minutes, seconds, 999);
    return parsedDate;
  } catch {
    return null;
  }
}

export function isEventPassed(eventDate?: string, eventTime?: string): boolean {
  const endDate = parseEventEndDateTime(eventDate, eventTime);
  if (!endDate) return false;
  return endDate.getTime() < Date.now();
}
