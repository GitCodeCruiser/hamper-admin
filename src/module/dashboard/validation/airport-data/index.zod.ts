import zod from 'zod';

const numberFieldSchema = (label: string) =>
  zod.preprocess(
    (value) => {
      if (value === '' || value === null || value === undefined) {
        return undefined;
      }

      if (typeof value === 'string') {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? value : parsed;
      }

      return value;
    },
    zod
      .number({
        required_error: `${label} is required`,
        invalid_type_error: `${label} must be a number`,
      })
      .min(0.01, { message: `${label} must be greater than 0` }),
  );

export const airportDataAddSchema = () => {
  return zod.object({
    icao: zod.string().trim().min(1, { message: 'ICAO code is required' }),
    iata: zod.string().trim().min(1, { message: 'IATA code is required' }),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    country: zod.string().trim().min(1, { message: 'Country is required' }),
    countryId: zod.string().trim().optional(),
    countrySlug: zod.string().trim().optional(),
    state: zod.string().trim().optional(),
    stateId: zod.string().trim().optional(),
    stateSlug: zod.string().trim().optional(),
    city: zod.string().trim().optional(),
    cityId: zod.string().trim().optional(),
    citySlug: zod.string().trim().optional(),
    latitude: zod.string().trim().min(1, { message: 'Latitude is required' }),
    longitude: zod.string().trim().min(1, { message: 'Longitude is required' }),
    elevation: numberFieldSchema('Elevation'),
    timezone: zod.string().trim().min(1, { message: 'Timezone is required' }),
  });
};

export const airportDataEditSchema = () => {
  return zod.object({
    icao: zod.string().trim().min(1, { message: 'ICAO code is required' }),
    iata: zod.string().trim().min(1, { message: 'IATA code is required' }),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    country: zod.string().trim().min(1, { message: 'Country is required' }),
    countryId: zod.string().trim().optional(),
    countrySlug: zod.string().trim().optional(),
    state: zod.string().trim().optional(),
    stateId: zod.string().trim().optional(),
    stateSlug: zod.string().trim().optional(),
    city: zod.string().trim().optional(),
    cityId: zod.string().trim().optional(),
    citySlug: zod.string().trim().optional(),
    latitude: zod.string().trim().min(1, { message: 'Latitude is required' }),
    longitude: zod.string().trim().min(1, { message: 'Longitude is required' }),
    elevation: numberFieldSchema('Elevation'),
    timezone: zod.string().trim().min(1, { message: 'Timezone is required' }),
  });
};

export type TAirportDataAddSchemaType = zod.input<ReturnType<typeof airportDataAddSchema>>;
export type TAirportDataEditSchemaType = zod.input<ReturnType<typeof airportDataEditSchema>>;
