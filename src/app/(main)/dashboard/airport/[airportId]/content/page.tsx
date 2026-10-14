import { redirect } from 'next/navigation';

import AirportContent from '@/module/dashboard/pages/airport/content';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ airportId: string }> }) {
  const { airportId } = await params;

  if (!airportId) {
    redirect(PAGE_ROUTE.dashboard.airport.list);
  }

  return <AirportContent airportId={airportId} />;
}
