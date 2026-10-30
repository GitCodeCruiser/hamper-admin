import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

const imageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine((value) => value !== null && value !== undefined && value !== '', {
      message: `${label} is required`,
    })
    .refine(
      (value) => {
        if (!value) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

export const cityAddSchema = () => {
  return zod
    .object({
      title: zod.string().trim().min(1, { message: 'Title is required' }),
      countryId: zod
        .string({ required_error: 'Country is required' })
        .trim()
        .min(1, { message: 'Please select a valid country from the dropdown' }),
      stateId: zod.string().trim().optional(),
      cityId: zod.string().trim().optional(),
      country: zod.string().trim().min(1, { message: 'Country is required' }),
      state: zod.string().trim().optional(),
      city: zod.string().trim().optional(),
      countrySlug: zod.string().trim().optional(),
      stateSlug: zod.string().trim().optional(),
      citySlug: zod.string().trim().optional(),
      description: zod.string().trim().optional(),
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
      bannerImage: imageFieldSchema('Hero image'),
      thumbnailImage: imageFieldSchema('Thumbnail image'),
      bannerImageTag: zod.string().trim().min(1, { message: 'Hero alt tag is required' }),
      thumbnailImageTag: zod.string().trim().min(1, { message: 'Thumbnail alt tag is required' }),

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
    })
    .refine((data) => !data.state || (!!data.stateId && data.stateId.length > 0), {
      message: 'Please select a valid state from the dropdown',
      path: ['state'],
    })
    .refine((data) => !data.city || (!!data.cityId && data.cityId.length > 0), {
      message: 'Please select a valid city from the dropdown',
      path: ['city'],
    });
};

export const cityEditSchema = () => {
  return zod
    .object({
      title: zod.string().trim().min(1, { message: 'Title is required' }),
      countryId: zod
        .string({ required_error: 'Country is required' })
        .trim()
        .min(1, { message: 'Please select a valid country from the dropdown' }),
      stateId: zod.string().trim().optional(),
      cityId: zod.string().trim().optional(),
      country: zod.string().trim().min(1, { message: 'Country is required' }),
      state: zod.string().trim().optional(),
      city: zod.string().trim().optional(),
      countrySlug: zod.string().trim().optional(),
      stateSlug: zod.string().trim().optional(),
      citySlug: zod.string().trim().optional(),
      description: zod.string().trim().optional(),
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
      bannerImage: imageFieldSchema('Hero image'),
      thumbnailImage: imageFieldSchema('Thumbnail image'),
      bannerImageTag: zod.string().trim().min(1, { message: 'Hero alt tag is required' }),
      thumbnailImageTag: zod.string().trim().min(1, { message: 'Thumbnail alt tag is required' }),

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
    })
    .refine((data) => !data.state || (!!data.stateId && data.stateId.length > 0), {
      message: 'Please select a valid state from the dropdown',
      path: ['state'],
    })
    .refine((data) => !data.city || (!!data.cityId && data.cityId.length > 0), {
      message: 'Please select a valid city from the dropdown',
      path: ['city'],
    });
};

export type TCityAddSchemaType = zod.infer<ReturnType<typeof cityAddSchema>>;
export type TCityEditSchemaType = zod.infer<ReturnType<typeof cityEditSchema>>;
