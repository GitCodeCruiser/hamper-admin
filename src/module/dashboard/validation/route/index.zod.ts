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

export const routeAddSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().optional(),
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

    departureCountry: zod.string().trim().min(1, { message: 'Departure Country is required' }),
    departureCountryId: zod.string().trim().optional(),
    departureCountrySlug: zod.string().trim().optional(),
    departureState: zod.string().trim().optional(),
    departureStateId: zod.string().trim().optional(),
    departureStateSlug: zod.string().trim().optional(),
    departureCity: zod.string().trim().optional(),
    departureCityId: zod.string().trim().optional(),
    departureCitySlug: zod.string().trim().optional(),

    arrivalCountry: zod.string().trim().min(1, { message: 'Arrival Country is required' }),
    arrivalCountryId: zod.string().trim().optional(),
    arrivalCountrySlug: zod.string().trim().optional(),
    arrivalState: zod.string().trim().optional(),
    arrivalStateId: zod.string().trim().optional(),
    arrivalStateSlug: zod.string().trim().optional(),
    arrivalCity: zod.string().trim().optional(),
    arrivalCityId: zod.string().trim().optional(),
    arrivalCitySlug: zod.string().trim().optional(),

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

export const routeEditSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().optional(),
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

    // sourceAirport: zod.string().min(1, { message: 'Source airport is required' }),
    // destinationAirport: zod.string().min(1, { message: 'Destination airport is required' }),

    departureCountry: zod.string().trim().min(1, { message: 'Departure Country is required' }),
    departureCountryId: zod.string().trim().optional(),
    departureCountrySlug: zod.string().trim().optional(),
    departureState: zod.string().trim().optional(),
    departureStateId: zod.string().trim().optional(),
    departureStateSlug: zod.string().trim().optional(),
    departureCity: zod.string().trim().optional(),
    departureCityId: zod.string().trim().optional(),
    departureCitySlug: zod.string().trim().optional(),

    arrivalCountry: zod.string().trim().min(1, { message: 'Arrival Country is required' }),
    arrivalCountryId: zod.string().trim().optional(),
    arrivalCountrySlug: zod.string().trim().optional(),
    arrivalState: zod.string().trim().optional(),
    arrivalStateId: zod.string().trim().optional(),
    arrivalStateSlug: zod.string().trim().optional(),
    arrivalCity: zod.string().trim().optional(),
    arrivalCityId: zod.string().trim().optional(),
    arrivalCitySlug: zod.string().trim().optional(),

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

export type TRouteAddSchemaType = zod.output<ReturnType<typeof routeAddSchema>>;
export type TRouteEditSchemaType = zod.output<ReturnType<typeof routeEditSchema>>;
