import { redirect } from 'next/navigation';

import AircraftOptionsPageEdit from '@/module/dashboard/pages/aircraft-options/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ aircraftOptionsId: string }> }) {
  const { aircraftOptionsId } = await params;

  if (!aircraftOptionsId) {
    redirect(PAGE_ROUTE.dashboard.aircraftOptions.list);
  }

  return <AircraftOptionsPageEdit aircraftOptionsId={aircraftOptionsId} />;
}
