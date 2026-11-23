import zod from 'zod';

/**
 * Validates the Canonical URL input in Admin forms:
 * - Accepts empty string (leave blank for self-canonical)
 * - If filled, accepts a full URL (https://hoganijets.com/...) or path (/private-jet-charter/...)
 * - Rejects domains other than hoganijets.com (and local/staging domains for dev)
 */
export const canonicalUrlSchema = () =>
  zod
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        if (val.startsWith('/')) return true;

        try {
          const url = new URL(val);
          return (
            url.hostname === 'hoganijets.com' ||
            url.hostname.endsWith('.hoganijets.com') ||
            url.hostname.includes('dedicateddevelopers.us') ||
            url.hostname === 'localhost' ||
            url.hostname === '127.0.0.1'
          );
        } catch {
          return false;
        }
      },
      {
        message:
          'Canonical URL must be a valid path (e.g. /routes/...) or a full https://hoganijets.com/... URL. Other domains are not permitted.',
      },
    );
