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
