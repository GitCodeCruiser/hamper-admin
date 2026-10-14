import zod from 'zod';

export const contactUsReplySchema = () => {
  return zod.object({
    contactId: zod.string().optional(),
    message: zod.string().trim().min(1, { message: 'Message is required' }),
  });
};

export type TContactUsReplySchemaType = zod.output<ReturnType<typeof contactUsReplySchema>>;
