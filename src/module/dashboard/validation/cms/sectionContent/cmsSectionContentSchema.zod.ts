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

const contentSubItemSchema = zod.object({
  title: zod.string().trim().min(1, { message: 'Content title is required' }),
  description: zod.string().trim().min(1, { message: 'Content description is required' }),
  // imageUrl: imageFieldSchema('Content image').optional(),
  imageUrl: zod.string().trim().min(1, { message: 'Image is required' }),
  imageUrlSize: zod.number().optional().nullable(),
});

export const cmsSectionContentUpdate = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    subTitle: zod.string().trim().optional(),
    contents: zod.array(contentSubItemSchema).optional(),
  });
};

export type TCmsSectionContentUpdateSchemaType = zod.output<
  ReturnType<typeof cmsSectionContentUpdate>
>;
