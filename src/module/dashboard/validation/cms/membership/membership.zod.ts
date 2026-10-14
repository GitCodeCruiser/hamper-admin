import zod from 'zod';

import { imageFieldSchema } from '@/module/seo/validation/seo.zod';

const planSubItemSchema = zod.object({
  _id: zod.string().optional(),
  title: zod.string().trim().min(1, { message: 'Plan title is required' }),
  subTitle: zod.string().trim().min(1, { message: 'Plan subtitle is required' }),
  redirectUrl: zod.string().trim().min(1, { message: 'Redirect URL is required' }),
  price: zod.coerce.number().min(0, { message: 'Plan price must be a positive number' }),
  // billingCycle: zod.string().trim().min(1, { message: 'Billing cycle is required' }),
  // trialDays: zod.coerce.number().min(0, { message: 'Trial days must be a positive number' }),
  imageUrl: imageFieldSchema('Image'),
  imageSize: zod.union([zod.string(), zod.number()]).optional().nullable(),
  features: zod
    .array(
      zod.object({
        title: zod.string().trim().min(1, { message: 'Feature is required' }),
      }),
    )
    .min(1, { message: 'At least one feature is required' }),
});

export const cmsMembershipUpdateSchema = () => {
  return zod.object({
    title: zod.string().trim().optional(),
    subTitle: zod.string().trim().optional(),
    plans: zod.array(planSubItemSchema).optional(),
  });
};

export type TCmsMembershipUpdateSchemaType = zod.output<
  ReturnType<typeof cmsMembershipUpdateSchema>
>;
