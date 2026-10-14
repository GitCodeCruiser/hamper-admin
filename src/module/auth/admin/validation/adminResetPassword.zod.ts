import zod from 'zod';

import validationText from '../../../../../json/messages/validationText';

import regex from '@/lib/regex';

export const adminResetPasswordSchema = () => {
  return zod
    .object({
      new_password: zod
        .string({
          required_error: 'New password is required',
          invalid_type_error: 'New password is required',
        })
        .min(8, {
          message: validationText?.error?.passwordLength,
        })
        .max(15, {
          message: validationText?.error?.passwordLength,
        })
        .regex(regex.password, {
          message: validationText?.error?.passwordFormat,
        }),

      confirm_password: zod.string({
        required_error: 'Confirm password is required',
        invalid_type_error: 'Confirm password is required',
      }),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      path: ['confirm_password'],
      message: validationText?.error?.passwordConfirmMatch,
    });
};

export type TAdminResetPasswordSchemaType = zod.infer<ReturnType<typeof adminResetPasswordSchema>>;
