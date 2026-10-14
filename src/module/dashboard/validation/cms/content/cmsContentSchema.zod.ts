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

export const cmsContentAdd = () => {
  return zod.object({
    title: zod.string().optional(),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
    url: zod
      .union([zod.string().trim().url({ message: 'Please enter a valid URL' }), zod.literal('')])
      .optional(),
    image: imageFieldSchema('Image'),
    imageTag: zod.string().trim().optional(),
  });
};

export const cmsContentEdit = () => {
  return zod.object({
    title: zod.string().optional(),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
    url: zod
      .union([zod.string().trim().url({ message: 'Please enter a valid URL' }), zod.literal('')])
      .optional(),
    image: imageFieldSchema('Image'),
    imageTag: zod.string().trim().optional(),
  });
};

export type TCmsContentAddType = zod.output<ReturnType<typeof cmsContentAdd>>;
export type TCmsContentEditType = zod.output<ReturnType<typeof cmsContentEdit>>;
