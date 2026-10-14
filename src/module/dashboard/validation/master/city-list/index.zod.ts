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

export const cityListAddSchema = () => {
  return zod.object({
    name: zod.string().trim().min(1, { message: 'City is required' }),
    countryId: zod.string().trim().min(1, { message: 'Country is required' }),
    country: zod.string().trim().min(1, { message: 'Country is required' }),
    state: zod.string().optional(),
    stateId: zod.string().optional(),
    image: imageFieldSchema('Thumbnail image'),
  });
};

export const cityListEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    name: zod.string().trim().min(1, { message: 'City is required' }),
    countryId: zod.string().trim().min(1, { message: 'Country is required' }),
    country: zod.string().trim().min(1, { message: 'Country is required' }),
    state: zod.string().optional(),
    stateId: zod.string().optional(),
    image: imageFieldSchema('Thumbnail image'),
  });
};

export type TCityListAddSchemaType = zod.output<ReturnType<typeof cityListAddSchema>>;
export type TCityListEditSchemaType = zod.output<ReturnType<typeof cityListEditSchema>>;
