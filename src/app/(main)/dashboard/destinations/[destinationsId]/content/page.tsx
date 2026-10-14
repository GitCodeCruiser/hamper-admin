import { redirect } from 'next/navigation';

import CityContent from '@/module/dashboard/pages/destinations/content';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ destinationsId: string }> }) {
  const { destinationsId } = await params;

  if (!destinationsId) {
    redirect(PAGE_ROUTE.dashboard.destinations.list);
  }

  return <CityContent destinationsId={destinationsId} />;
}
