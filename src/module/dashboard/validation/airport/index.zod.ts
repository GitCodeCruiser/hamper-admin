import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

const imageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine((value) => value !== null, { message: `${label} is required` })
    .refine(
      (value) => {
        if (value === null) return false;
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

const numberFieldSchema = (label: string) =>
  zod.preprocess(
    (value) => {
      if (value === '' || value === null || value === undefined) {
        return undefined;
      }

      if (typeof value === 'string') {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? value : parsed;
      }

      return value;
    },
    zod
      .number({
        required_error: `${label} is required`,
        invalid_type_error: `${label} must be a number`,
      })
      .min(0.01, { message: `${label} must be greater than 0` }),
  );

export const airportAddSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().optional(),
    country: zod.string().trim().min(1, { message: 'Country is required' }),
    countryId: zod.string().trim().optional(),
    state: zod.string().trim().optional(),
    stateId: zod.string().trim().optional(),
    city: zod.string().trim().optional(),
    cityId: zod.string().trim().optional(),
    countrySlug: zod.string().trim().optional(),
    stateSlug: zod.string().trim().optional(),
    citySlug: zod.string().trim().optional(),
    slug: zod
      .string()
      .trim()
      .min(1, { message: 'Slug is required' })
      .regex(/^[a-z0-9-]+$/, {
        message: 'Slug must contain only lowercase letters, numbers, and hyphens (slug-example)',
      })
      .transform((val) =>
        val
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      ),
    bannerImage: imageFieldSchema('Banner image'),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImageTag: zod.string().trim().optional(),

    ratio: zod.string().trim().min(1, { message: 'Ratio is required' }),
    airportTypeId: zod.string().trim().min(1, { message: 'Airport Type is required' }),
    icaoCode: zod.string().trim().min(1, { message: 'ICAO code is required' }),
    iataCode: zod.string().trim().min(1, { message: 'IATA code is required' }),
    elevation: numberFieldSchema('Elevation'),
    latitude: zod.string().trim().min(1, { message: 'Latitude is required' }),
    longitude: zod.string().trim().min(1, { message: 'Longitude is required' }),

    metaTitle: zod.string().trim().min(1, { message: 'Meta title is required' }),
    metaDescription: zod.string().trim().min(1, { message: 'Meta description is required' }),
    metaKeywords: zod.string().trim().min(1, { message: 'Meta keywords is required' }),
    canonicalTag: zod
      .string()
      .trim()
      .url({ message: 'Please enter a valid URL' })
      .min(1, { message: 'Canonical URL is required' }),
    openGraphTitle: zod.string().trim().min(1, { message: 'OG title is required' }),
    openGraphDescription: zod.string().trim().min(1, { message: 'OG description is required' }),
    openGraphImage: imageFieldSchema('OG image'),
    structuredData: zod.string().trim().min(1, { message: 'Schema is required' }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),
    redirectUrl: zod.string().trim().optional(),
    isShowUpdatedAt: zod.boolean().optional(),
  });
};

export const airportEditSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().optional(),
    country: zod.string().trim().min(1, { message: 'Country is required' }),
    countryId: zod.string().trim().optional(),
    state: zod.string().trim().optional(),
    stateId: zod.string().trim().optional(),
    city: zod.string().trim().optional(),
    cityId: zod.string().trim().optional(),
    countrySlug: zod.string().trim().optional(),
    stateSlug: zod.string().trim().optional(),
    citySlug: zod.string().trim().optional(),
    slug: zod
      .string()
      .trim()
      .min(1, { message: 'Slug is required' })
      .regex(/^[a-z0-9-]+$/, {
        message: 'Slug must contain only lowercase letters, numbers, and hyphens (slug-example)',
      })
      .transform((val) =>
        val
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      ),
    bannerImage: imageFieldSchema('Banner image'),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImageTag: zod.string().trim().optional(),

    ratio: zod.string().trim().min(1, { message: 'Ratio is required' }),
    airportTypeId: zod.string().trim().min(1, { message: 'Airport Type is required' }),
    icaoCode: zod.string().trim().min(1, { message: 'ICAO code is required' }),
    iataCode: zod.string().trim().min(1, { message: 'IATA code is required' }),
    elevation: numberFieldSchema('Elevation'),
    latitude: zod.string().trim().min(1, { message: 'Latitude is required' }),
    longitude: zod.string().trim().min(1, { message: 'Longitude is required' }),

    metaTitle: zod.string().trim().min(1, { message: 'Meta title is required' }),
    metaDescription: zod.string().trim().min(1, { message: 'Meta description is required' }),
    metaKeywords: zod.string().trim().min(1, { message: 'Meta keywords is required' }),
    canonicalTag: zod
      .string()
      .trim()
      .url({ message: 'Please enter a valid URL' })
      .min(1, { message: 'Canonical URL is required' }),
    openGraphTitle: zod.string().trim().min(1, { message: 'OG title is required' }),
    openGraphDescription: zod.string().trim().min(1, { message: 'OG description is required' }),
    openGraphImage: imageFieldSchema('OG image'),
    structuredData: zod.string().trim().min(1, { message: 'Schema is required' }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),
    redirectUrl: zod.string().trim().optional(),
    isShowUpdatedAt: zod.boolean().optional(),
  });
};

export type TAirportAddSchemaType = zod.input<ReturnType<typeof airportAddSchema>>;
export type TAirportEditSchemaType = zod.input<ReturnType<typeof airportEditSchema>>;
