import zod from 'zod';

export const redirectionAddSchema = () => {
  return zod.object({
    source: zod.string().trim().min(1, { message: 'Source URL / path is required' }),
    destination: zod.string().trim().min(1, { message: 'Destination URL / path is required' }),
    statusCode: zod
      .number()
      .min(100, { message: 'Invalid HTTP status code' })
      .max(599, { message: 'Invalid HTTP status code' }),
  });
};

export const redirectionEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    source: zod.string().trim().min(1, { message: 'Source URL / path is required' }),
    destination: zod.string().trim().min(1, { message: 'Destination URL / path is required' }),
    statusCode: zod
      .number()
      .min(100, { message: 'Invalid HTTP status code' })
      .max(599, { message: 'Invalid HTTP status code' }),
  });
};

export type TRedirectionAddSchemaType = zod.infer<ReturnType<typeof redirectionAddSchema>>;
export type TRedirectionEditSchemaType = zod.infer<ReturnType<typeof redirectionEditSchema>>;
