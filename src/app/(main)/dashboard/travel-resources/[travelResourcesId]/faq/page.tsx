import { redirect } from 'next/navigation';

import TravelResourcesFaq from '@/module/dashboard/pages/travel-resources/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ travelResourcesId: string }> }) {
  const { travelResourcesId } = await params;

  if (!travelResourcesId) {
    redirect(PAGE_ROUTE.dashboard.travelResources.list);
  }

  return <TravelResourcesFaq travelResourcesId={travelResourcesId} />;
}
