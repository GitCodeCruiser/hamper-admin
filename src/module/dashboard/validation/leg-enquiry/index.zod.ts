import zod from 'zod';

export const legEnquiryReplySchema = () => {
  return zod.object({
    id: zod.string().optional(),
    legEnquireId: zod.string().optional(),
    legEnquiryId: zod.string().optional(),
    contactId: zod.string().optional(),
    message: zod.string().trim().min(1, { message: 'Message is required' }),
  });
};

export type TLegEnquiryReplySchemaType = zod.output<ReturnType<typeof legEnquiryReplySchema>>;
