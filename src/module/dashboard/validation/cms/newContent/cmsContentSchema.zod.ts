import zod from 'zod';

const imageDataItemSchema = zod.object({
  image: zod.union([zod.string(), zod.instanceof(File)]).optional(),
  size: zod.number().optional(),
  tag: zod.string().optional(),
  _id: zod.string().optional(),
});

export const cmsNewContentAdd = () => {
  return zod.object({
    title: zod.string().optional(),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
    images: zod.array(zod.union([zod.string(), zod.instanceof(File)])).optional(),
    imagesData: zod.array(imageDataItemSchema).optional(),
    showCTA: zod.boolean().optional(),
  });
};

export const cmsNewContentEdit = () => {
  return zod.object({
    id: zod.string().optional(),
    title: zod.string().optional(),
    description: zod.string().trim().min(1, { message: 'Description is required' }),
    images: zod.array(zod.union([zod.string(), zod.instanceof(File)])).optional(),
    imagesData: zod.array(imageDataItemSchema).optional(),
    showCTA: zod.boolean().optional(),
  });
};

export type TCmsNewContentAddType = zod.output<ReturnType<typeof cmsNewContentAdd>>;
export type TCmsNewContentEditType = zod.output<ReturnType<typeof cmsNewContentEdit>>;
