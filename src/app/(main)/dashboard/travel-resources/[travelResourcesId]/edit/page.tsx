import { redirect } from 'next/navigation';

import TravelResourcesPageEdit from '@/module/dashboard/pages/travel-resources/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ travelResourcesId: string }> }) {
  const { travelResourcesId } = await params;

  if (!travelResourcesId) {
    redirect(PAGE_ROUTE.dashboard.travelResources.list);
  }

  return <TravelResourcesPageEdit travelResourcesId={travelResourcesId} />;
}
