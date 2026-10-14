import { redirect } from 'next/navigation';

import AircraftCategoryPageEdit from '@/module/dashboard/pages/aircraft/category/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({
  params,
}: {
  params: Promise<{ aircraftCategoryId: string }>;
}) {
  const { aircraftCategoryId } = await params;

  if (!aircraftCategoryId) {
    redirect(PAGE_ROUTE.dashboard.availableAircraft.categoryList);
  }

  return <AircraftCategoryPageEdit aircraftCategoryId={aircraftCategoryId} />;
}
