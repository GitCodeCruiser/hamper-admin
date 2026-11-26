import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';
import { canonicalUrlSchema } from '@/utils/canonicalValidation';

const optionalImageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      invalid_type_error: `${label} must be a string or a File`,
    })
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (value === null || value === undefined || typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes(value.type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

const regionListBaseSchema = {
  name: zod.string().trim().min(1, 'Region name is required'),
  slug: zod
    .string()
    .trim()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers and hyphens only'),
  pageHeading: zod.string().optional(),
  description: zod.string().optional(),
  bannerImage: optionalImageFieldSchema('Hero image'),
  bannerImageTag: zod.string().trim().optional(),
  image: optionalImageFieldSchema('Thumbnail image'),
  imageTag: zod.string().trim().optional(),
  countries: zod.array(zod.string()),
  metaTitle: zod.string().optional(),
  metaDescription: zod.string().optional(),
  metaKeywords: zod.string().optional(),
  canonicalTag: canonicalUrlSchema(),
  openGraphTitle: zod.string().optional(),
  openGraphDescription: zod.string().optional(),
  structuredData: zod.string().optional(),
  metaRobotsIndex: zod.enum(['noindex', 'index']),
  metaRobotsFollow: zod.enum(['nofollow', 'follow']),
  isShowUpdatedAt: zod.boolean().optional(),
};

export const regionListSchema = () => zod.object(regionListBaseSchema);

export type TRegionListSchemaType = zod.infer<ReturnType<typeof regionListSchema>>;
