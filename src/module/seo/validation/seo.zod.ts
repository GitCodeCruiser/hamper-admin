import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

export const imageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine(
      (value) =>
        value !== null &&
        value !== undefined &&
        (typeof value !== 'string' || value.trim().length > 0),
      { message: `${label} is required` },
    )
    .refine(
      (value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

export const seoSchema = () => {
  return zod.object({
    seoMetaTitle: zod.string().trim().min(1, { message: 'Meta title is required' }),
    seoMetaDescription: zod.string().trim().min(1, { message: 'Meta description is required' }),
    seoMetaKeywords: zod.string().trim().min(1, { message: 'Meta keywords is required' }),
    seoSlug: zod.string().trim().optional(),
    seoCanonicalUrl: zod
      .string()
      .trim()
      .url({ message: 'Please enter a valid URL' })
      .min(1, { message: 'Canonical URL is required' }),
    seoOgTitle: zod.string().trim().min(1, { message: 'OG title is required' }),
    seoOgDescription: zod.string().trim().min(1, { message: 'OG description is required' }),
    seoOgImage: imageFieldSchema('OG image'),
    seoSchema: zod.string().trim().min(1, { message: 'Schema is required' }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),
  });
};

export type TSeoSchemaType = zod.output<ReturnType<typeof seoSchema>>;
