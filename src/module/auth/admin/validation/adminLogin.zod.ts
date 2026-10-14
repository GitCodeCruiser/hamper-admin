import zod from 'zod';

import validationText from '../../../../../json/messages/validationText';

import regex from '@/lib/regex';

export const adminLoginSchema = () => {
  return zod.object({
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

    password: zod
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password is required',
      })
      .min(1, { message: 'Password is required' }),
  });
};

export type TAdminLoginSchemaType = zod.infer<ReturnType<typeof adminLoginSchema>>;
