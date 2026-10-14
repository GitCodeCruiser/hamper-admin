import zod from 'zod';

export const cmsNewFaqAdd = () => {
  return zod.object({
    question: zod.string().trim().min(1, { message: 'Question is required' }),
    answer: zod.string().trim().min(1, { message: 'Answer is required' }),
  });
};

export const cmsNewFaqEdit = () => {
  return zod.object({
    id: zod.string().optional(),
    question: zod.string().trim().min(1, { message: 'Question is required' }),
    answer: zod.string().trim().min(1, { message: 'Answer is required' }),
  });
};

export type TCmsNewFaqAddType = zod.output<ReturnType<typeof cmsNewFaqAdd>>;
export type TCmsNewFaqEditType = zod.output<ReturnType<typeof cmsNewFaqEdit>>;
