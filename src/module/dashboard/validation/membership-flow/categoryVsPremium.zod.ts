import zod from 'zod';

// ─── Feature Schema ─────────────────────────────────────────────────────────
const cardFeatureSchema = zod.object({
  title: zod.string().trim().min(1, { message: 'Feature title is required' }),
  smallDescription: zod.string().trim().min(1, { message: 'Feature description is required' }),
});

// ─── Card Type Item Schema ──────────────────────────────────────────────────
const cardTypeItemSchema = zod.object({
  headerTitle: zod.string().trim().min(1, { message: 'Header title is required' }),
  title: zod.string().trim().min(1, { message: 'Title is required' }),
  isPopular: zod.boolean().default(false),
  cardFeatures: zod
    .array(cardFeatureSchema)
    .min(1, { message: 'At least one feature is required' }),
});

// ─── Category Vs Premium Form Schema ────────────────────────────────────────
export const categoryVsPremiumSchema = () => {
  return zod.object({
    pageName: zod.string().optional(),
    pageSlug: zod.string().optional(),
    headerTitle: zod.string().trim().min(1, { message: 'Header title is required' }),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    smallDescription: zod.string().trim().optional(),
    cardType: zod
      .array(cardTypeItemSchema)
      .min(1, { message: 'At least one card type is required' }),
    redirectUrl: zod.string().trim().min(1, { message: 'Redirect URL is required' }),
    redirectUrlText: zod.string().trim().min(1, { message: 'Redirect URL text is required' }),
    purpose: zod.string().optional(),
  });
};

export type TCategoryVsPremiumSchemaType = zod.input<ReturnType<typeof categoryVsPremiumSchema>>;
