import zod from 'zod';

import validationText from '../../../../../json/messages/validationText';

import { IMAGE_ACCEPT } from '@/constant';
import regex from '@/lib/regex';

export const userAddSchema = () => {
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
      .optional()
      .refine(
        (val) => {
          if (!val || val.length === 0) return true;
          return val.length >= 10 && val.length <= 15 && regex.phone.test(val);
        },
        {
          message: 'Phone number must be 10-15 digits',
        },
      ),
    password: zod
      .string()
      .trim()
      .optional()
      .refine(
        (val) => {
          if (!val || val.length === 0) return true;
          return val.length >= 6;
        },
        {
          message: 'Password must be at least 6 characters long',
        },
      ),
    imageFile: zod
      .union([zod.string(), zod.instanceof(File), zod.null()])
      .optional()
      .refine(
        (value) => {
          if (!value || typeof value === 'string') return true;
          return IMAGE_ACCEPT.split(',').includes(value.type);
        },
        {
          message: validationText?.error?.invalidImageFileFormat,
        },
      ),
  });
};

export const userEditSchema = () => {
  return zod.object({
    id: zod.string().trim().min(1, { message: 'User ID is required' }),
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
      .optional()
      .refine(
        (val) => {
          if (!val || val.length === 0) return true;
          return val.length >= 10 && val.length <= 15 && regex.phone.test(val);
        },
        {
          message: 'Phone number must be 10-15 digits',
        },
      ),
    password: zod
      .string()
      .trim()
      .optional()
      .refine(
        (val) => {
          if (!val || val.length === 0) return true;
          return val.length >= 6;
        },
        {
          message: 'Password must be at least 6 characters long',
        },
      ),
    imageFile: zod
      .union([zod.string(), zod.instanceof(File), zod.null()])
      .optional()
      .refine(
        (value) => {
          if (!value || typeof value === 'string') return true;
          return IMAGE_ACCEPT.split(',').includes(value.type);
        },
        {
          message: validationText?.error?.invalidImageFileFormat,
        },
      ),
  });
};

export type TUserAddSchemaType = zod.infer<ReturnType<typeof userAddSchema>>;
export type TUserEditSchemaType = zod.infer<ReturnType<typeof userEditSchema>>;
