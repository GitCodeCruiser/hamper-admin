import { redirect } from 'next/navigation';

import AircraftOptionsFaq from '@/module/dashboard/pages/aircraft-options/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ aircraftOptionsId: string }> }) {
  const { aircraftOptionsId } = await params;

  if (!aircraftOptionsId) {
    redirect(PAGE_ROUTE.dashboard.aircraftOptions.list);
  }

  return <AircraftOptionsFaq aircraftOptionsId={aircraftOptionsId} />;
}
