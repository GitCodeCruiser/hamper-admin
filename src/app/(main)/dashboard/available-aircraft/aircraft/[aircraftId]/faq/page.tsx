import { redirect } from 'next/navigation';

import AircraftFaq from '@/module/dashboard/pages/aircraft/main/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ aircraftId: string }> }) {
  const { aircraftId } = await params;

  if (!aircraftId) {
    redirect(PAGE_ROUTE.dashboard.availableAircraft.list);
  }

  return <AircraftFaq aircraftId={aircraftId} />;
}
