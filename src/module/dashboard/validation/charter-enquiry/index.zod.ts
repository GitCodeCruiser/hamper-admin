import zod from 'zod';

export const charterEnquiryAddSchema = () => {
  return zod.object({
    pageName: zod.string().trim().min(1, { message: 'Page name is required' }),
    pageSlug: zod.string().trim().min(1, { message: 'Page slug is required' }),
    title: zod.string().trim().min(1, { message: 'Name is required' }),
    description: zod.string().trim().min(1, { message: 'Comment is required' }),
    company: zod.string().trim().min(1, { message: 'Company is required' }),
  });
};

export const charterEnquiryEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    title: zod.string().trim().min(1, { message: 'Name is required' }),
    description: zod.string().trim().min(1, { message: 'Comment is required' }),
    company: zod.string().trim().min(1, { message: 'Company is required' }),
  });
};

export type TCharterEnquiryAddSchemaType = zod.output<ReturnType<typeof charterEnquiryAddSchema>>;
export type TCharterEnquiryEditSchemaType = zod.output<ReturnType<typeof charterEnquiryEditSchema>>;
