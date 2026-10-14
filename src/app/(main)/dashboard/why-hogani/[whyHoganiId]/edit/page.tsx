import { redirect } from 'next/navigation';

import WhyHoganiPageEdit from '@/module/dashboard/pages/why-hogani/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ whyHoganiId: string }> }) {
  const { whyHoganiId } = await params;

  if (!whyHoganiId) {
    redirect(PAGE_ROUTE.dashboard.whyHogani.list);
  }

  return <WhyHoganiPageEdit whyHoganiId={whyHoganiId} />;
}
