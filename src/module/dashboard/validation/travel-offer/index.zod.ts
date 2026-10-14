import dayjs from 'dayjs';
import zod from 'zod';

const travelOfferBaseSchema = {
  sourceId: zod.string().trim().min(1, { message: 'Source location is required' }),
  destinationId: zod.string().trim().min(1, { message: 'Destination location is required' }),
  aircraftId: zod.string().trim().min(1, { message: 'Aircraft selection is required' }),
  price: zod.coerce.number().positive({ message: 'Price must be greater than 0' }),
  postedDate: zod
    .string()
    .trim()
    .min(1, { message: 'Posted date is required' })
    .refine(
      (val) => {
        if (!val) return false;
        const date = dayjs(val);
        if (!date.isValid()) return false;
        const today = dayjs().startOf('day');
        return !date.startOf('day').isBefore(today);
      },
      { message: 'Posted date cannot be in the past' },
    ),
  // type: zod.enum(['one-way', 'two-way', 'empty-leg'], {
  //   errorMap: () => ({ message: 'Please select a valid travel type' })
  // }),
};

export const travelOfferAddSchema = () => {
  return zod.object(travelOfferBaseSchema).refine((data) => data.sourceId !== data.destinationId, {
    message: 'Source and destination cannot be the same',
    path: ['destinationId'],
  });
};

export const travelOfferEditSchema = () => {
  return zod
    .object({
      id: zod.string().min(1, { message: 'Travel offer ID is required' }),
      ...travelOfferBaseSchema,
    })
    .refine((data) => data.sourceId !== data.destinationId, {
      message: 'Source and destination cannot be the same',
      path: ['destinationId'],
    });
};

export type TTravelOfferAddSchemaType = zod.output<ReturnType<typeof travelOfferAddSchema>>;
export type TTravelOfferEditSchemaType = zod.output<ReturnType<typeof travelOfferEditSchema>>;
