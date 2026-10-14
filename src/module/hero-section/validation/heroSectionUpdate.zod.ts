import zod from 'zod';

import { IMAGE_ACCEPT, VIDEO_ACCEPT } from '@/constant';

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

const videoFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      invalid_type_error: `${label} is invalid`,
    })
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return VIDEO_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid video format. Please upload a valid video.' },
    );

export const heroSectionUpdate = () => {
  return zod.object({
    bannerImage: imageFieldSchema('Banner image'),
    bannerVideo: videoFieldSchema('Banner video'),
    bannerTitle: zod.string().trim().min(1, { message: 'Banner title is required' }),
    bannerSubtitle: zod.string().trim().optional(),
  });
};

export type THeroSectionUpdateSchemaType = zod.output<ReturnType<typeof heroSectionUpdate>>;
