import zod from 'zod';

import validationText from '../../../../json/messages/validationText';

import { IMAGE_ACCEPT } from '@/constant';
import regex from '@/lib/regex';

export const profileDetailsSchema = () => {
  return zod.object({
    firstName: zod.string().trim().min(1, { message: 'First name is required' }),
    lastName: zod.string().trim().min(1, { message: 'Last name is required' }),
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
      .string({
        required_error: 'Phone is required',
        invalid_type_error: 'Phone is required',
      })
      .trim()
      .min(1, { message: 'Phone is required' }),
    countryCode: zod
      .string({
        required_error: 'Country code is required',
        invalid_type_error: 'Country code is required',
      })
      .trim()
      .min(1, { message: 'Country code is required' }),

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

export type TProfileDetailsSchemaType = zod.output<ReturnType<typeof profileDetailsSchema>>;

// imageFile: zod
//   .any()
//   // ✅ REQUIRED MESSAGE
//   .refine((value) => value !== undefined && value !== null && value !== '', {
//     message: 'Profile image is required',
//   })
//   // ✅ FILE TYPE VALIDATION
//   .refine(
//     (value) => {
//       if (typeof value === 'string') return true;

//       if (value instanceof File) {
//         return IMAGE_ACCEPT.split(',').includes(value.type);
//       }

//       return false;
//     },
//     {
//       message: validationText?.error?.invalidImageFileFormat,
//     },
//   ),

// imageFile: zod
//   .union([zod.string(), zod.instanceof(File)], {
//     required_error: 'Profile image is required',
//     invalid_type_error: 'Profile image is required',
//   })
//   .refine(
//     // imageFile: zod.union([zod.string(), zod.instanceof(File), zod.null(), zod.undefined()]).refine(
//     (value) => {
//       if (!value) return true;

//       if (typeof value === 'string') return true;

//       if (value instanceof File) {
//         return IMAGE_ACCEPT.split(',').includes(value.type);
//       }

//       return false;
//     },
//     {
//       message: validationText?.error?.invalidImageFileFormat,
//     },
//   ),
