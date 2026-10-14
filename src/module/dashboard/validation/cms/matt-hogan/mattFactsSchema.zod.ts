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
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

const featureItemSchema = zod.object({
  label: zod.string().trim().min(1, { message: 'Label is required' }),
  value: zod.string().trim().min(1, { message: 'Value is required' }),
});

export const mattFactsSchema = () => {
  return zod.object({
    pageName: zod.string().optional(),
    pageSlug: zod.string().optional(),
    purpose: zod.string().optional(),
    quoteTitle: zod.string().trim().min(1, { message: 'Quote title is required' }),
    headerTitle: zod.string().trim().min(1, { message: 'Header title is required' }),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    features: zod.array(featureItemSchema).min(1, { message: 'At least one feature is required' }),
    redirectUrl: zod.string().trim().min(1, { message: 'Redirect URL is required' }),
    image: imageFieldSchema('Image'),
  });
};

export type TMattFactsSchemaType = zod.input<ReturnType<typeof mattFactsSchema>>;
