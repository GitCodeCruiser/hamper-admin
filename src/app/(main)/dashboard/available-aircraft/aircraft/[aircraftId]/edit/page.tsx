import { redirect } from 'next/navigation';

import AircraftPageEdit from '@/module/dashboard/pages/aircraft/main/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ aircraftId: string }> }) {
  const { aircraftId } = await params;

  if (!aircraftId) {
    redirect(PAGE_ROUTE.dashboard.availableAircraft.list);
  }

  return <AircraftPageEdit aircraftId={aircraftId} />;
}
