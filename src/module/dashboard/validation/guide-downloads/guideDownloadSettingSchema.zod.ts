import zod from 'zod';

import { DOCUMENT_ACCEPT, IMAGE_ACCEPT } from '@/constant';

const imageFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine((value) => value !== null && value !== '', { message: `${label} is required` })
    .refine(
      (value) => {
        if (!value) return false;
        if (typeof value === 'string') return true;
        return IMAGE_ACCEPT.split(',').includes((value as File).type);
      },
      { message: 'Invalid image format. Please upload a valid image.' },
    );

const documentFieldSchema = (label: string) =>
  zod
    .union([zod.string(), zod.instanceof(File)], {
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .refine((value) => value !== null && value !== '', { message: `${label} is required` })
    .refine(
      (value) => {
        if (!value) return false;
        if (typeof value === 'string') return true;
        // On some systems/browsers CSV or standard documents might have slightly different or empty MIME types.
        // But checking against the predefined array guarantees it restricts common invalid uploads.
        const fileType = (value as File).type;
        const validTypes = DOCUMENT_ACCEPT.split(',');
        return validTypes.includes(fileType);
      },
      {
        message:
          'Invalid document format. Please upload a valid PDF, Word, Excel, CSV, or PPT document.',
      },
    );

export const guideDownloadSettingSchema = () => {
  return zod.object({
    image: imageFieldSchema('Thumbnail Image'),
    heroImage: imageFieldSchema('Hero Image'),
    downloadFile: documentFieldSchema('Download File'),
    downloadButtonText: zod.string().trim().min(1, { message: 'Download button text is required' }),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
  });
};

export type TGuideDownloadSettingType = zod.output<ReturnType<typeof guideDownloadSettingSchema>>;
