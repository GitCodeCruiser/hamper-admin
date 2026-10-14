import { redirect } from 'next/navigation';

import TestimonialPageEdit from '@/module/dashboard/pages/testimonial/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ testimonialId: string }> }) {
  const { testimonialId } = await params;

  if (!testimonialId) {
    redirect(PAGE_ROUTE.dashboard.lifestyle.testimonial.list);
  }

  return <TestimonialPageEdit testimonialId={testimonialId} />;
}
