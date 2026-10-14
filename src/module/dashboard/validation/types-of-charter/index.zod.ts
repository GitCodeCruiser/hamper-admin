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

export const typesOfCharterAddSchema = () => {
  return zod.object({
    typesOfCharterCategoryId: zod.string().optional(),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    smallDescription: zod.string().trim().min(1, { message: 'Description is required' }),
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
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    thumbnailImageTag: zod.string().trim().optional(),

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
    isShowUpdatedAt: zod.boolean().optional(),
  });
};

export const typesOfCharterEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    typesOfCharterCategoryId: zod.string().optional(),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    smallDescription: zod.string().trim().min(1, { message: 'Description is required' }),
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
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    thumbnailImageTag: zod.string().trim().optional(),

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
    isShowUpdatedAt: zod.boolean().optional(),
  });
};

export const typesOfCharterCatAddSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
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
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    thumbnailImageTag: zod.string().trim().optional(),

    // ---------- SEO ----------
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
  });
};

export const typesOfCharterCatEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
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
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    thumbnailImageTag: zod.string().trim().optional(),

    // ---------- SEO ----------
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
  });
};

export type TTypesOfCharterAddSchemaType = zod.input<ReturnType<typeof typesOfCharterAddSchema>>;
export type TTypesOfCharterEditSchemaType = zod.input<ReturnType<typeof typesOfCharterEditSchema>>;
export type TTypesOfCharterCatAddSchemaType = zod.input<
  ReturnType<typeof typesOfCharterCatAddSchema>
>;
export type TTypesOfCharterCatEditSchemaType = zod.input<
  ReturnType<typeof typesOfCharterCatEditSchema>
>;
