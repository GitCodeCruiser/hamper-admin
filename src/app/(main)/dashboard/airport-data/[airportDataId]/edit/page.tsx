import { redirect } from 'next/navigation';

import AirportDataPageEdit from '@/module/dashboard/pages/airport-data/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ airportDataId: string }> }) {
  const { airportDataId } = await params;

  if (!airportDataId) {
    redirect(PAGE_ROUTE.dashboard.airportData.list);
  }

  return <AirportDataPageEdit airportDataId={airportDataId} />;
}
