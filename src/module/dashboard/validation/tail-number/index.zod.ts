import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

export const TAIL_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "N169TC" → "n169tc", "N-169 TC" → "n-169-tc" (same rule as the backend) */
export const toTailSlug = (value: string) =>
  (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const optionalImageFieldSchema = zod
  .union([zod.string(), zod.instanceof(File)])
  .optional()
  .nullable()
  .refine(
    (value) => {
      if (value === null || value === undefined || typeof value === 'string') return true;
      return IMAGE_ACCEPT.split(',').includes(value.type);
    },
    { message: 'Invalid image format. Please upload a valid image.' },
  );

/** Optional whole-number input kept as a string in the form ("" = not filled in). */
const optionalYear = (label: string) =>
  zod
    .string()
    .trim()
    .refine((v) => v === '' || (/^\d{4}$/.test(v) && +v >= 1900 && +v <= 2100), {
      message: `${label} must be a 4-digit year`,
    });

export const tailNumberSchema = () =>
  zod.object({
    aircraftId: zod.string().min(1, 'Aircraft is required'),
    tailNumber: zod
      .string()
      .trim()
      .min(1, 'Tail number is required')
      .max(20, 'Tail number is too long'),
    slug: zod
      .string()
      .trim()
      .min(1, 'Slug is required')
      .regex(TAIL_SLUG_REGEX, 'Slug must be lowercase letters, numbers and hyphens only'),

    serialNumber: zod.string().trim().optional(),
    yearOfManufacture: optionalYear('Year of manufacture'),
    seats: zod
      .string()
      .trim()
      .refine((v) => v === '' || /^\d{1,3}$/.test(v), { message: 'Seats must be a whole number' }),
    homeBase: zod.string().trim().optional(),
    avionics: zod.string().trim().optional(),
    airframeTotalTime: zod.string().trim().optional(),
    exteriorRefurbYear: optionalYear('Exterior refurb year'),
    interiorRefurbYear: optionalYear('Interior refurb year'),
    wifi: zod.enum(['', 'true', 'false']),
    notes: zod.string().optional(),
    engines: zod.string().trim().optional(),    registrationValidThrough: zod
      .string()
      .trim()
      .refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), {
        message: 'Registration valid through must be a date',
      }),

    heroImage: optionalImageFieldSchema,
    heroImageTag: zod.string().trim().optional(),

    pageHeading: zod.string().trim().optional(),
    content: zod.string().optional(),

    metaTitle: zod.string().trim().optional(),
    metaDescription: zod.string().trim().optional(),
    canonicalTag: zod
      .string()
      .trim()
      .refine((v) => v === '' || /^https?:\/\/\S+$/.test(v), {
        message: 'Canonical must be a full URL (https://...) or left blank',
      }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),

    status: zod.enum(['Draft', 'Published']),
    order: zod
      .string()
      .trim()
      .refine((v) => v === '' || /^\d+$/.test(v), { message: 'Sort order must be a number' }),
    isShowUpdatedAt: zod.boolean().optional(),
  });

export type TTailNumberSchemaType = zod.infer<ReturnType<typeof tailNumberSchema>>;
