import zod from 'zod';

export const cmsPageCommonCompSchema = () => {
  return zod.object({
    title: zod.string().optional(),
    // content: zod.string().trim().min(1, { message: 'Content is required' }),
    content: zod.string().optional(),
  });
};

export type TCMSPageCommonCompSchemaSchemaType = zod.output<
  ReturnType<typeof cmsPageCommonCompSchema>
>;
