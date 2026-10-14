import zod from 'zod';

import validationText from '../../../../../json/messages/validationText';

import regex from '@/lib/regex';

export const adminForgotPasswordSchema = () => {
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
  });
};

export type TAdminForgotPasswordSchemaType = zod.infer<
  ReturnType<typeof adminForgotPasswordSchema>
>;
