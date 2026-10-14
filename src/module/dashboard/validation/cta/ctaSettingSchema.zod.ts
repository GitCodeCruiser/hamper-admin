import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

const imageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine((value) => value !== null && value !== '', { message: `${label} is required` })
    .refine(
      (value) => {
        if (!value) return false;
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

export const ctaSettingSchema = () => {
  return zod.object({
    image: imageFieldSchema('Thumbnail Image'),
    bannerImageTag: zod.string().trim().optional(),
    heroImage: imageFieldSchema('Hero Image'),
    heroImageTag: zod.string().trim().optional(),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
    buttonText: zod.string().trim().min(1, { message: 'Button text is required' }),
    buttonUrl: zod
      .string({
        required_error: 'Button URL is required',
        invalid_type_error: 'Button URL is required',
      })
      .trim()
      .min(1, { message: 'Button URL is required' }),
  });
};

export type TCTASettingType = zod.output<ReturnType<typeof ctaSettingSchema>>;
