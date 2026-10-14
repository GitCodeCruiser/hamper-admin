import zod from 'zod';

import validationText from '../../../../../json/messages/validationText';

import { IMAGE_ACCEPT } from '@/constant';
import regex from '@/lib/regex';

export const salesPersonAddSchema = () => {
  return zod.object({
    fullName: zod.string().trim().min(1, { message: 'Full name is required' }),
    email: zod
      .string({
        required_error: 'Email address is required',
        invalid_type_error: 'Email address is required',
      })
      .trim()
      .toLowerCase()
      .min(1, { message: 'Email address is required' })
      .email({ message: validationText.error.email_format })
      .regex(regex.emailRegex, {
        message: validationText.error.email_format,
      }),
    phone: zod
      .string()
      .trim()
      .min(10, validationText?.error?.phoneLength)
      .max(15, validationText?.error?.phoneLength)
      .regex(regex.phone, validationText?.error?.phone),
    imageFile: zod
      .union([zod.string(), zod.instanceof(File)], {
        required_error: 'Profile image is required',
        invalid_type_error: 'Profile image is required',
      })

      // .preprocess(
      //   (value) => value ?? null,
      //   // ✅ allow null TEMPORARILY
      //   zod.union([zod.string(), zod.instanceof(File), zod.null()]),
      // )
      // ✅ REQUIRED MESSAGE
      .refine((value) => value !== null, {
        message: 'Profile image is required',
      })
      // ✅ FILE TYPE VALIDATION
      .refine(
        (value) => {
          if (value === null) return false;

          if (typeof value === 'string') return true;

          return IMAGE_ACCEPT.split(',').includes(value.type);
        },
        {
          message: validationText?.error?.invalidImageFileFormat,
        },
      ),
  });
};

export const salesPersonEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    fullName: zod.string().trim().min(1, { message: 'Full name is required' }),
    email: zod
      .string({
        required_error: 'Email address is required',
        invalid_type_error: 'Email address is required',
      })
      .trim()
      .toLowerCase()
      .min(1, { message: 'Email address is required' })
      .email({ message: validationText.error.email_format })
      .regex(regex.emailRegex, {
        message: validationText.error.email_format,
      }),
    phone: zod
      .string()
      .trim()
      .min(10, validationText?.error?.phoneLength)
      .max(15, validationText?.error?.phoneLength)
      .regex(regex.phone, validationText?.error?.phone),

    imageFile: zod
      .union([zod.string(), zod.instanceof(File)], {
        required_error: 'Profile image is required',
        invalid_type_error: 'Profile image is required',
      })

      // .preprocess(
      //   (value) => value ?? null,
      //   // ✅ allow null TEMPORARILY
      //   zod.union([zod.string(), zod.instanceof(File), zod.null()]),
      // )
      // ✅ REQUIRED MESSAGE
      .refine((value) => value !== null, {
        message: 'Profile image is required',
      })
      // ✅ FILE TYPE VALIDATION
      .refine(
        (value) => {
          if (value === null) return false;

          if (typeof value === 'string') return true;

          return IMAGE_ACCEPT.split(',').includes(value.type);
        },
        {
          message: validationText?.error?.invalidImageFileFormat,
        },
      ),
  });
};

export type TSalesPersonAddSchemaType = zod.output<ReturnType<typeof salesPersonAddSchema>>;
export type TSalesPersonEditSchemaType = zod.output<ReturnType<typeof salesPersonEditSchema>>;
