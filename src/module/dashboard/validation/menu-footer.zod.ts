import zod from 'zod';

export const menuFooterSchema = () => {
  return zod.object({
    menu: zod.array(
      zod.object({
        title: zod.string().trim().min(1, { message: 'Menu Item title is required' }),
        url: zod.string().trim().min(1, { message: 'Menu Item URL is required' }),
        isSource: zod.boolean().optional(),
        children: zod.array(
          zod.object({
            title: zod.string().trim().min(1, { message: 'Child Item title is required' }),
            url: zod.string().trim().min(1, { message: 'Child Item URL is required' }),
            isSource: zod.boolean().optional(),
          }),
        ),
      }),
    ),
    footer: zod.array(
      zod.object({
        label: zod.string().trim().min(1, { message: 'Footer Section label is required' }),
        children: zod.array(
          zod.object({
            title: zod.string().trim().min(1, { message: 'Link title is required' }),
            url: zod.string().trim().min(1, { message: 'Link URL is required' }),
            isSource: zod.boolean().optional(),
          }),
        ),
      }),
    ),
  });
};

export type TMenuFooterSchemaType = zod.infer<ReturnType<typeof menuFooterSchema>>;
