import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

const optionalImageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)])
    .nullable()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

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

export const partnershipAddSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().trim().optional(),
    url: zod
      .union([zod.string().trim().url({ message: 'Please enter a valid URL' }), zod.literal('')])
      .optional(),
    backgroundImage: optionalImageFieldSchema('Background image'),
    companyLogo: optionalImageFieldSchema('Company logo'),
    postedDate: zod.string().trim().optional(),
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

export const partnershipEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().trim().optional(),
    url: zod
      .union([zod.string().trim().url({ message: 'Please enter a valid URL' }), zod.literal('')])
      .optional(),
    backgroundImage: optionalImageFieldSchema('Background image'),
    companyLogo: optionalImageFieldSchema('Company logo'),
    postedDate: zod.string().trim().optional(),
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

export type TPartnershipAddSchemaType = zod.output<ReturnType<typeof partnershipAddSchema>>;
export type TPartnershipEditSchemaType = zod.output<ReturnType<typeof partnershipEditSchema>>;
