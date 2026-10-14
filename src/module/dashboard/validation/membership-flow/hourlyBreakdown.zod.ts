import zod from 'zod';

// ─── Feature Schema ─────────────────────────────────────────────────────────
const hourlyFeatureSchema = zod.object({
  text: zod.string().trim().min(1, { message: 'Feature text is required' }),
  icon: zod.string().trim().min(1, { message: 'Icon is required' }),
});

// ─── Hourly Rate Item Schema ────────────────────────────────────────────────
const hourlyRateItemSchema = zod.object({
  headerTitle: zod.string().trim().min(1, { message: 'Header title is required' }),
  title: zod.string().trim().min(1, { message: 'Title is required' }),
  isPopular: zod.boolean().default(false),
  features: zod.array(hourlyFeatureSchema).min(1, { message: 'At least one feature is required' }),
});

// ─── Hourly Breakdown Form Schema ───────────────────────────────────────────
export const hourlyBreakdownSchema = () => {
  return zod.object({
    pageName: zod.string().optional(),
    pageSlug: zod.string().optional(),
    headerTitle: zod.string().trim().min(1, { message: 'Header title is required' }),
    title: zod.string().trim().min(1, { message: 'Title is required' }),
    smallDescription: zod.string().trim().min(1, { message: 'Small description is required' }),
    hourlyRate: zod
      .array(hourlyRateItemSchema)
      .min(1, { message: 'At least one hourly rate card is required' }),
    redirectUrl: zod.string().trim().min(1, { message: 'Redirect URL is required' }),
    redirectUrlText: zod.string().trim().min(1, { message: 'Redirect URL text is required' }),
    purpose: zod.string().optional(),
  });
};

export type THourlyBreakdownSchemaType = zod.input<ReturnType<typeof hourlyBreakdownSchema>>;
