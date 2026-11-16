import zod from 'zod';

import { IMAGE_ACCEPT } from '@/constant';

const imageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine((value) => value !== null, { message: `${label} is required` })
    .refine(
      (value) => {
        if (value === null) return false;
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

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

const optionalNumberFieldSchema = (label: string) =>
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
        invalid_type_error: `${label} must be a number`,
      })
      .min(0.01, { message: `${label} must be greater than 0` })
      .optional(),
  );

/** Optional distance (ft): blank or 0 is allowed (means "not set"), negatives are not. */
const distanceFieldSchema = (label: string) =>
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
      .number({ invalid_type_error: `${label} must be a number` })
      .min(0, { message: `${label} cannot be negative` })
      .optional(),
  );

const tailPageImageSchema = zod
  .union([zod.string(), zod.instanceof(File)])
  .optional()
  .nullable()
  .refine(
    (value) => {
      if (value === null || value === undefined || typeof value === 'string') return true;
      return IMAGE_ACCEPT.split(',').includes(value.type);
    },
    { message: 'Invalid image format. Please upload a valid image.' },
  );

/** Model-level fields used by the public tail number pages */
const tailPageFields = {
  typeCertificateHolder: zod.string().trim().optional(),
  minFlightCrew: zod
    .string()
    .trim()
    .refine((v) => v === '' || /^[1-9]\d?$/.test(v), {
      message: 'Minimum flight crew must be a whole number',
    })
    .optional(),
  tcdsNumber: zod.string().trim().optional(),
  tailPageImage: tailPageImageSchema,
  tailPageImageTag: zod.string().trim().optional(),
  similarModelIds: zod.array(zod.string()).max(4, 'You can pick up to 4 similar models').optional(),
};

export const aircraftAddSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    aircraftName: zod.string().trim().min(1, { message: 'Aircraft name is required' }),
    pageHeading: zod.string().trim().optional(),
    description: zod.string().optional(),
    ...tailPageFields,

    slug: zod
      .string()
      .trim()
      .min(1, { message: 'Slug is required' })
      .regex(/^[a-z0-9-]+$/, {
        message: 'Slug must contain only lowercase letters, numbers, and hyphens (slug-example)',
      })
      .transform((val) =>
        val
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      ),

    bannerImage: imageFieldSchema('Banner image'),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    featureImage: imageFieldSchema('Feature image'),
    salesFeatureImage: imageFieldSchema('Sales feature image'),
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImageTag: zod.string().trim().optional(),

    categoryId: zod.string().trim().min(1, { message: 'Aircraft Category is required' }),

    manufacturer: zod.string().trim().min(1, { message: 'Manufacturer is required' }),
    yomRangeStartDate: zod.string().trim().min(1, { message: 'YOM start date is required' }),
    yomRangeEndDate: zod.string().trim().min(1, { message: 'YOM end date is required' }),

    // ---------- FLOAT SUPPORT ----------
    range: numberFieldSchema('Range'),
    cruiseSpeed: numberFieldSchema('Cruise speed'),
    maxPassengers: zod.string().trim().min(1, { message: 'Max passengers is required' }),

    cabinDimensionsLength: numberFieldSchema('Cabin dimensions length'),
    cabinDimensionsWidth: numberFieldSchema('Cabin dimensions width'),
    cabinDimensionsHeight: numberFieldSchema('Cabin dimensions height'),

    // cabinPressureMin: numberFieldSchema('Cabin pressure min'),
    // cabinPressureMax: numberFieldSchema('Cabin pressure max'),
    cabinPressureAltitude: zod
      .string()
      .trim()
      .min(1, { message: 'Cabin pressure altitude is required' }),

    baggageCapacity: numberFieldSchema('Baggage capacity'),
    cabinNoise: numberFieldSchema('Cabin noise'),
    mtow: numberFieldSchema('Max take off weight'),
    takeoffDistance: distanceFieldSchema('Takeoff distance'),
    landingDistance: distanceFieldSchema('Landing distance'),
    serviceCeiling: numberFieldSchema('Service ceiling'),
    climbRate: numberFieldSchema('Climb rate'),

    charterRatePerHrMin: numberFieldSchema('Charter rate per hr min'),
    charterRatePerHrMax: numberFieldSchema('Charter rate per hr max'),

    // ---------- SEO ----------
    metaTitle: zod.string().trim().min(1, { message: 'Meta title is required' }),
    metaDescription: zod.string().trim().min(1, { message: 'Meta description is required' }),
    metaKeywords: zod.string().trim().min(1, { message: 'Meta keywords is required' }),
    canonicalTag: zod
      .string()
      .trim()
      .url({ message: 'Please enter a valid URL' })
      .min(1, { message: 'Canonical URL is required' }),

    openGraphTitle: zod.string().trim().min(1, { message: 'OG title is required' }),
    openGraphDescription: zod.string().trim().min(1, { message: 'OG description is required' }),
    openGraphImage: imageFieldSchema('OG image'),

    structuredData: zod.string().trim().min(1, { message: 'Schema is required' }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),
    slidingImages: zod.array(zod.union([zod.string(), zod.instanceof(File)])).optional(),
    slidingImagesData: zod
      .array(
        zod.object({
          image: zod.union([zod.string(), zod.instanceof(File)]).optional(),
          size: zod.number().optional(),
          tag: zod.string().trim().optional(),
          _id: zod.string().optional(),
        }),
      )
      .optional(),
    redirectUrl: zod.string().trim().optional(),
    isShowUpdatedAt: zod.boolean().optional(),
    lastUpdatedAt: zod.string().optional(),
  });
};

export const aircraftEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),

    title: zod.string().trim().min(1, { message: 'Title is required' }),
    aircraftName: zod.string().trim().min(1, { message: 'Aircraft name is required' }),
    pageHeading: zod.string().trim().optional(),
    description: zod.string().optional(),
    ...tailPageFields,

    slug: zod
      .string()
      .trim()
      .min(1, { message: 'Slug is required' })
      .regex(/^[a-z0-9-]+$/, {
        message: 'Slug must contain only lowercase letters, numbers, and hyphens (slug-example)',
      })
      .transform((val) =>
        val
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      ),

    bannerImage: imageFieldSchema('Banner image'),
    thumbnailImage: imageFieldSchema('Thumbnail image'),
    featureImage: imageFieldSchema('Feature image'),
    salesFeatureImage: imageFieldSchema('Sales feature image'),
    bannerImageTag: zod.string().trim().optional(),
    thumbnailImageTag: zod.string().trim().optional(),

    categoryId: zod.string().trim().min(1, { message: 'Aircraft Category is required' }),

    manufacturer: zod.string().trim().min(1, { message: 'Manufacturer is required' }),
    yomRangeStartDate: zod.string().trim().min(1, { message: 'YOM start date is required' }),
    yomRangeEndDate: zod.string().trim().min(1, { message: 'YOM end date is required' }),

    // ---------- FLOAT SUPPORT ----------
    range: numberFieldSchema('Range'),
    cruiseSpeed: numberFieldSchema('Cruise speed'),
    maxPassengers: zod.string().trim().min(1, { message: 'Max passengers is required' }),

    cabinDimensionsLength: numberFieldSchema('Cabin dimensions length'),
    cabinDimensionsWidth: numberFieldSchema('Cabin dimensions width'),
    cabinDimensionsHeight: numberFieldSchema('Cabin dimensions height'),

    // cabinPressureMin: numberFieldSchema('Cabin pressure min'),
    // cabinPressureMax: numberFieldSchema('Cabin pressure max'),
    cabinPressureAltitude: zod
      .string()
      .trim()
      .min(1, { message: 'Cabin pressure altitude is required' }),

    baggageCapacity: numberFieldSchema('Baggage capacity'),
    cabinNoise: numberFieldSchema('Cabin noise'),
    mtow: distanceFieldSchema('Max take off weight'),
    takeoffDistance: distanceFieldSchema('Takeoff distance'),
    landingDistance: distanceFieldSchema('Landing distance'),
    serviceCeiling: numberFieldSchema('Service ceiling'),
    climbRate: numberFieldSchema('Climb rate'),

    charterRatePerHrMin: numberFieldSchema('Charter rate per hr min'),
    charterRatePerHrMax: numberFieldSchema('Charter rate per hr max'),

    metaTitle: zod.string().trim().min(1, { message: 'Meta title is required' }),
    metaDescription: zod.string().trim().min(1, { message: 'Meta description is required' }),
    metaKeywords: zod.string().trim().min(1, { message: 'Meta keywords is required' }),
    canonicalTag: zod
      .string()
      .trim()
      .url({ message: 'Please enter a valid URL' })
      .min(1, { message: 'Canonical URL is required' }),

    openGraphTitle: zod.string().trim().min(1, { message: 'OG title is required' }),
    openGraphDescription: zod.string().trim().min(1, { message: 'OG description is required' }),
    openGraphImage: imageFieldSchema('OG image'),

    structuredData: zod.string().trim().min(1, { message: 'Schema is required' }),
    metaRobotsIndex: zod.enum(['noindex', 'index']),
    metaRobotsFollow: zod.enum(['nofollow', 'follow']),
    slidingImages: zod.array(zod.union([zod.string(), zod.instanceof(File)])).optional(),
    slidingImagesData: zod
      .array(
        zod.object({
          image: zod.union([zod.string(), zod.instanceof(File)]).optional(),
          size: zod.number().optional(),
          tag: zod.string().trim().optional(),
          _id: zod.string().optional(),
        }),
      )
      .optional(),
    redirectUrl: zod.string().trim().optional(),
    isShowUpdatedAt: zod.boolean().optional(),
    lastUpdatedAt: zod.string().optional(),
  });
};

export const aircraftCatAddSchema = () => {
  return zod.object({
    title: zod.string().trim().min(1, { message: 'Aircraft category is required' }),
    description: zod.string().optional(),

    // Pricing tiers
    tierOne: numberFieldSchema('Tier one'),
    tierTwo: numberFieldSchema('Tier two'),
    tierThree: numberFieldSchema('Tier three'),

    // Specifications
    typicalSpeed: numberFieldSchema('Typical speed'),
    runningSpeed: numberFieldSchema('Running speed').optional(),
    seat: zod.string().trim().min(1, { message: 'Seat is required' }),
    maximumSeatingCapacity: numberFieldSchema('Max seat'),
    minimumFlightHour: numberFieldSchema('Min flight hours'),
    range: zod.string().trim().min(1, { message: 'Range is required' }),
    baggageCapacity: zod.string().trim().min(1, { message: 'Baggage capacity is required' }),
    maxRange: numberFieldSchema('Max range'),
    routeRatio: numberFieldSchema('Route ratio'),
    pricingGrafShow: zod.boolean().optional(),
    optionGrafText: zod.string().trim().optional(),
    oneWayCustomPriceShow: zod
      .object({
        show: zod.boolean().default(true),
        value: zod.string().trim().optional(),
      })
      .optional(),
    roundTripCustomPriceShow: zod
      .object({
        show: zod.boolean().default(true),
        value: zod.string().trim().optional(),
      })
      .optional(),
    multiLegCustomPriceShow: zod
      .object({
        show: zod.boolean().default(true),
        value: zod.string().trim().optional(),
      })
      .optional(),

    // Hourly running speed tiers
    hourlyRunningSpeed: zod
      .object({
        zeroToThree: optionalNumberFieldSchema('0–3 Hours'),
        threeToSix: optionalNumberFieldSchema('3–6 Hours'),
        sixToNine: optionalNumberFieldSchema('6–9 Hours'),
        ninePlus: optionalNumberFieldSchema('9+ Hours'),
      })
      .optional(),

    // Speed breakdown as distance
    speedBreakDownAsDistance: zod.object({
      oneBreak: optionalNumberFieldSchema('0 - 300nm (ktas)'),
      twoBreak: numberFieldSchema('300 - 600 nm (ktas)'),
      threeBreak: numberFieldSchema('600 - 900 nm (ktas)'),
      fourBreak: numberFieldSchema('900–1200 nm (ktas)'),
      fiveBreak: numberFieldSchema('1200–2400 nm (ktas)'),
      sixBreak: numberFieldSchema('2400 – 3600 nm (ktas)'),
      sevenBreak: numberFieldSchema('3600 - 5200 nm (ktas)'),
      otherBreak: optionalNumberFieldSchema('5,200+'),
    }),

    featureImage: imageFieldSchema('Feature image'),
    genericHeroImage: tailPageImageSchema,
    genericHeroImageTag: zod.string().trim().optional(),
  });
};

export const aircraftCatEditSchema = () => {
  return zod.object({
    id: zod.string().optional(),
    title: zod.string().trim().min(1, { message: 'Aircraft category is required' }),
    description: zod.string().optional(),

    // Pricing tiers
    tierOne: numberFieldSchema('Tier one'),
    tierTwo: numberFieldSchema('Tier two'),
    tierThree: numberFieldSchema('Tier three'),

    // Specifications
    typicalSpeed: numberFieldSchema('Typical speed'),
    runningSpeed: numberFieldSchema('Running speed').optional(),
    seat: zod.string().trim().min(1, { message: 'Seat is required' }),
    maximumSeatingCapacity: numberFieldSchema('Max seat'),
    minimumFlightHour: numberFieldSchema('Min flight hours'),
    range: zod.string().trim().min(1, { message: 'Range is required' }),
    baggageCapacity: zod.string().trim().min(1, { message: 'Baggage capacity is required' }),
    maxRange: numberFieldSchema('Max range'),
    routeRatio: numberFieldSchema('Route ratio'),
    pricingGrafShow: zod.boolean().optional(),
    optionGrafText: zod.string().trim().optional(),
    oneWayCustomPriceShow: zod
      .object({
        show: zod.boolean().default(true),
        value: zod.string().trim().optional(),
      })
      .optional(),
    roundTripCustomPriceShow: zod
      .object({
        show: zod.boolean().default(true),
        value: zod.string().trim().optional(),
      })
      .optional(),
    multiLegCustomPriceShow: zod
      .object({
        show: zod.boolean().default(true),
        value: zod.string().trim().optional(),
      })
      .optional(),

    // Hourly running speed tiers
    hourlyRunningSpeed: zod
      .object({
        zeroToThree: optionalNumberFieldSchema('0 - 3 Hours'),
        threeToSix: optionalNumberFieldSchema('3 - 6 Hours'),
        sixToNine: optionalNumberFieldSchema('6 - 9 Hours'),
        ninePlus: optionalNumberFieldSchema('9+ Hours'),
      })
      .optional(),

    // Speed breakdown as distance
    speedBreakDownAsDistance: zod.object({
      oneBreak: optionalNumberFieldSchema('0 - 300nm (ktas)'),
      twoBreak: numberFieldSchema('300 - 600 nm (ktas)'),
      threeBreak: numberFieldSchema('600 - 900 nm (ktas)'),
      fourBreak: numberFieldSchema('900 - 1200 nm (ktas)'),
      fiveBreak: numberFieldSchema('2400 - 3600 nm (ktas)'),
      sixBreak: numberFieldSchema('3600 - 5200 nm (ktas)'),
      sevenBreak: numberFieldSchema('5200+ nm (ktas)'),
      otherBreak: optionalNumberFieldSchema('5,200+'),
    }),

    featureImage: imageFieldSchema('Feature image'),
    genericHeroImage: tailPageImageSchema,
    genericHeroImageTag: zod.string().trim().optional(),
  });
};

export type TAircraftAddSchemaType = zod.input<ReturnType<typeof aircraftAddSchema>>;
export type TAircraftEditSchemaType = zod.input<ReturnType<typeof aircraftEditSchema>>;
export type TAircraftCatAddSchemaType = zod.input<ReturnType<typeof aircraftCatAddSchema>>;
export type TAircraftCatEditSchemaType = zod.input<ReturnType<typeof aircraftCatEditSchema>>;
