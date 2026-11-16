import { redirect } from 'next/navigation';

import TailNumberListMain from '@/module/dashboard/pages/tail-number/list';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ aircraftId: string }> }) {
  const { aircraftId } = await params;

  if (!aircraftId) redirect(PAGE_ROUTE.dashboard.availableAircraft.list);

  return <TailNumberListMain aircraftId={aircraftId} />;
}
