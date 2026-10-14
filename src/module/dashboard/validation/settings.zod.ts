import zod from 'zod';

import validationText from '../../../../json/messages/validationText';

import regex from '@/lib/regex';

export const settingsSchema = () => {
  return zod.object({
    email: zod
      .string({
        required_error: 'Email address is required',
        invalid_type_error: 'Email address is required',
      })
      .trim()
      .toLowerCase()
      .min(1, { message: 'Email address is required' })
      .email({ message: validationText.error.email_format })
      .regex(regex.emailRegex, {
        message: validationText.error.email_format,
      }),
    phone: zod.string().trim().min(1, { message: 'Phone number is required' }),
    countryCode: zod.string().trim().min(1, { message: 'Country code is required' }),
    address: zod.string().trim().min(1, { message: 'Address is required' }),
    brokerDisclaimer: zod.string().trim().min(1, { message: 'Broker Disclaimer is required' }),
    contactUsEmail: zod
      .string({
        required_error: 'Contact Us Email is required',
        invalid_type_error: 'Contact Us Email is required',
      })
      .trim()
      .toLowerCase()
      .min(1, { message: 'Contact Us Email is required' })
      .email({ message: validationText.error.email_format })
      .regex(regex.emailRegex, {
        message: validationText.error.email_format,
      }),
    contactUsPhone: zod
      .string({
        required_error: 'Contact Us Phone is required',
        invalid_type_error: 'Contact Us Phone is required',
      })
      .trim()
      .min(1, { message: 'Contact Us Phone is required' }),
    contactUsCountryCode: zod
      .string({
        required_error: 'Contact Us Country Code is required',
        invalid_type_error: 'Contact Us Country Code is required',
      })
      .trim()
      .min(1, { message: 'Contact Us Country Code is required' }),
    youtube: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a Youtube valid URL',
      })
      .optional(),
    facebook: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a Facebook valid URL',
      })
      .optional(),
    instagram: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter an Instagram valid URL',
      })
      .optional(),
    linkedin: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a LinkedIn valid URL',
      })
      .optional(),
    twitter: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a Twitter valid URL',
      })
      .optional(),
    tiktok: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a TikTok valid URL',
      })
      .optional(),
    airCharterAssociation: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a valid Air Charter Association URL',
      })
      .optional(),
    betterBusinessBureau: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a valid Better Business Bureau URL',
      })
      .optional(),
    nbaa: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a valid NBAA URL',
      })
      .optional(),
    argus: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a valid ARGUS URL',
      })
      .optional(),
    wyvern: zod
      .string()
      .trim()
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a valid Wyvern URL',
      })
      .optional(),
    aboutUsTitle: zod
      .string({
        required_error: 'About Us Title is required',
        invalid_type_error: 'About Us Title is required',
      })
      .trim()
      .min(1, { message: 'About Us Title is required' }),
    aboutUsDescription: zod
      .string({
        required_error: 'About Us Description is required',
        invalid_type_error: 'About Us Description is required',
      })
      .trim()
      .min(1, { message: 'About Us Description is required' }),
    aboutUsUrl: zod
      .string({
        required_error: 'About Us URL is required',
        invalid_type_error: 'About Us URL is required',
      })
      .trim()
      .min(1, { message: 'About Us URL is required' })
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a valid URL',
      }),
    compareAircraftTitle: zod
      .string({
        required_error: 'Compare Aircraft Title is required',
        invalid_type_error: 'Compare Aircraft Title is required',
      })
      .trim()
      .min(1, { message: 'Compare Aircraft Title is required' }),
    compareAircraftDescription: zod
      .string({
        required_error: 'Compare Aircraft Description is required',
        invalid_type_error: 'Compare Aircraft Description is required',
      })
      .trim()
      .min(1, { message: 'Compare Aircraft Description is required' }),
    compareAircraftUrl: zod
      .string({
        required_error: 'Compare Aircraft URL is required',
        invalid_type_error: 'Compare Aircraft URL is required',
      })
      .trim()
      .min(1, { message: 'Compare Aircraft URL is required' })
      .refine((val) => !val || zod.string().url().safeParse(val).success, {
        message: 'Please enter a valid URL',
      }),
  });
};

export type TSettingsSchemaType = zod.output<ReturnType<typeof settingsSchema>>;
