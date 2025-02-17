import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unslugify(slug: string) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');
  return initials;
}

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatDate(date: Date | string | number, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat('en-US', {
    month: opts.month ?? 'long',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    ...opts,
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string | number, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat('en-US', {
    month: opts.month ?? 'long',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    hour: opts.hour ?? '2-digit',
    minute: opts.minute ?? '2-digit',
    hour12: opts.hour12 ?? true,
    ...opts,
  }).format(new Date(date));
}
