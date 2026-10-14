import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

const imageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      invalid_type_error: `${label} must be a string or a File`,
    })
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

const requiredImageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine((value) => value !== null && value !== undefined, { message: `${label} is required` })
    .refine(
      (value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

export const countryListAddSchema = () => {
  return zod.object({
    name: zod.string().trim().min(1, { message: 'Country is required' }),
    isCaribbean: zod.boolean().optional(),
    image: imageFieldSchema('Thumbnail image'),
    imageTag: zod.string().trim().optional(),
    bannerImage: requiredImageFieldSchema('Banner image'),
    bannerImageTag: zod.string().trim().optional(),
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
    openGraphImage: requiredImageFieldSchema('OG image'),
    structuredData: zod.string().trim().min(1, { message: 'Schema is required' }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),
    isShowUpdatedAt: zod.boolean().optional(),
  });
};

export const countryListEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    name: zod.string().trim().min(1, { message: 'Country is required' }),
    isCaribbean: zod.boolean().optional(),
    image: imageFieldSchema('Thumbnail image'),
    imageTag: zod.string().trim().optional(),
    bannerImage: requiredImageFieldSchema('Banner image'),
    bannerImageTag: zod.string().trim().optional(),
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
    openGraphImage: requiredImageFieldSchema('OG image'),
    structuredData: zod.string().trim().min(1, { message: 'Schema is required' }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),
    isShowUpdatedAt: zod.boolean().optional(),
  });
};

export type TCountryListAddSchemaType = zod.output<ReturnType<typeof countryListAddSchema>>;
export type TCountryListEditSchemaType = zod.output<ReturnType<typeof countryListEditSchema>>;
