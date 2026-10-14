import zod from 'zod';

export const salesSupportReplySchema = () => {
  return zod.object({
    id: zod.string().optional(),
    message: zod.string().trim().min(1, { message: 'Message is required' }),
  });
};

export type TSalesSupportReplySchemaType = zod.output<ReturnType<typeof salesSupportReplySchema>>;
